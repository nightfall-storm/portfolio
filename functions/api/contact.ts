/**
 * Cloudflare Pages Function serving `POST /api/contact`.
 *
 * Pipeline: validate payload -> verify Cloudflare Turnstile token server-side
 * -> deliver the message through the Resend API.
 *
 * Required environment variables (set them in the Cloudflare Pages dashboard,
 * or in `.dev.vars` for `bunx wrangler pages dev`):
 *   TURNSTILE_SECRET_KEY, RESEND_API_KEY, CONTACT_RECEIVER_EMAIL
 */

export interface Env {
  TURNSTILE_SECRET_KEY: string;
  RESEND_API_KEY: string;
  CONTACT_RECEIVER_EMAIL: string;
}

interface ContactContext {
  request: Request;
  env: Env;
}

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  turnstileToken?: unknown;
}

type ValidatedPayload =
  | { error: string }
  | {
      name: string;
      email: string;
      subject?: string;
      message: string;
      turnstileToken: string;
    };

const SENDER = "Portfolio Contact <contact@bilalnnasser.com>";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_SUBJECT_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 2000;

const ESCAPED: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const json = (body: Record<string, unknown>, status: number): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

/** Neutralises user input so it cannot inject markup into the email body. */
const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (char) => ESCAPED[char]);

const validate = (payload: ContactPayload): ValidatedPayload => {
  const { name, email, subject, message, turnstileToken } = payload;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    typeof turnstileToken !== "string"
  ) {
    return { error: "Name, email, message and verification token are required" };
  }

  if (subject !== undefined && subject !== null && typeof subject !== "string") {
    return { error: "Subject must be a string" };
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanSubject = typeof subject === "string" ? subject.trim() : "";
  const cleanMessage = message.trim();
  const cleanToken = turnstileToken.trim();

  if (!cleanName || !cleanEmail || !cleanMessage || !cleanToken) {
    return { error: "Name, email, message and verification token are required" };
  }
  if (cleanName.length > MAX_NAME_LENGTH) {
    return { error: "Name is too long" };
  }
  if (cleanEmail.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(cleanEmail)) {
    return { error: "Invalid email address" };
  }
  if (cleanSubject.length > MAX_SUBJECT_LENGTH) {
    return { error: "Subject is too long" };
  }
  if (cleanMessage.length > MAX_MESSAGE_LENGTH) {
    return { error: "Message is too long" };
  }

  return {
    name: cleanName,
    email: cleanEmail,
    subject: cleanSubject || undefined,
    message: cleanMessage,
    turnstileToken: cleanToken,
  };
};

/**
 * Confirms the token with Cloudflare's siteverify endpoint. Fails closed: any
 * transport or payload problem is treated as a failed verification.
 */
const verifyTurnstile = async (
  token: string,
  remoteIp: string | null,
  secret: string,
): Promise<boolean> => {
  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (remoteIp) body.append("remoteip", remoteIp);

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body },
    );

    if (!response.ok) return false;

    const verification = (await response.json()) as { success?: boolean };
    return verification.success === true;
  } catch {
    return false;
  }
};

const buildSubject = (name: string, subject?: string): string =>
  subject?.trim()
    ? `[Portfolio] ${subject.trim()} — ${name.trim()}`
    : `[Portfolio] Message from ${name.trim()}`;

const sendEmail = async (
  env: Env,
  payload: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  },
): Promise<Response> => {
  const { name, email, subject, message } = payload;

  const html = [
    `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
    subject
      ? `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>`
      : "",
    `<p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>`,
  ].join("");

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    subject ? `Subject: ${subject}` : "",
    "",
    message,
  ]
    .filter((line) => line !== "")
    .join("\n");

  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: SENDER,
      to: [env.CONTACT_RECEIVER_EMAIL],
      reply_to: email,
      subject: buildSubject(name, subject),
      html,
      text,
    }),
  });
};

export const onRequestPost = async ({
  request,
  env,
}: ContactContext): Promise<Response> => {
  if (
    !env.TURNSTILE_SECRET_KEY ||
    !env.RESEND_API_KEY ||
    !env.CONTACT_RECEIVER_EMAIL
  ) {
    return json({ error: "Server configuration error" }, 500);
  }

  let payload: ContactPayload | null = null;
  try {
    payload = (await request.json()) as ContactPayload | null;
  } catch {
    return json({ error: "Invalid JSON payload" }, 400);
  }

  if (!payload || typeof payload !== "object") {
    return json({ error: "Invalid JSON payload" }, 400);
  }

  const validated = validate(payload);
  if ("error" in validated) {
    return json({ error: validated.error }, 400);
  }

  const { name, email, subject, message, turnstileToken } = validated;

  const verified = await verifyTurnstile(
    turnstileToken,
    request.headers.get("CF-Connecting-IP"),
    env.TURNSTILE_SECRET_KEY,
  );

  if (!verified) {
    return json({ error: "Verification failed" }, 400);
  }

  try {
    const response = await sendEmail(env, { name, email, subject, message });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(`RESEND_FAILURE [${response.status}]: ${detail}`);
      return json({ error: "Failed to deliver message" }, 500);
    }

    return json({ success: true }, 200);
  } catch (error) {
    console.error("CONTACT_DELIVERY_FAILURE:", error);
    return json({ error: "Failed to deliver message" }, 500);
  }
};
