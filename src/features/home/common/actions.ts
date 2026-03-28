"use server";

import { contactSchema } from "./types/contact.schemas";

export type ContactFormState = {
  success?: boolean;
  errors?: {
    email?: string[];
    subject?: string[];
    message?: string[];
    form?: string[];
  };
};

export async function executeTransmission(
  prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const validatedFields = contactSchema.safeParse({
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, subject, message } = validatedFields.data;
  // Use the renamed public key, allowing it to be read from env or passed via formData
  const accessKey =
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
    (formData.get("access_key") as string);

  // Masked log to verify key presence without exposing it
  console.log(
    `UPLINK_KEY_STATUS: ${accessKey ? `DETECTED [${accessKey.substring(0, 4)}...${accessKey.substring(accessKey.length - 4)}]` : "NOT_FOUND"}`,
  );

  if (!accessKey) {
    return {
      errors: {
        form: ["UPLINK_KEY_MISSING"],
      },
    };
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: "PORTFOLIO_UPLINK",
        from_name: "PORTFOLIO_COMMAND_CENTER",
        email: email,
        subject: `NEW_UPLINK: ${subject}`,
        message: message,
      }),
    });

    const result = await response.json();

    if (result.success) {
      console.log("UPLINK_SUCCESS:", result);
      return { success: true };
    } else {
      console.error("UPLINK_REJECTION:", result);
      return {
        errors: {
          form: [result.message || "TRANSMISSION_DENIED"],
        },
      };
    }
  } catch (error) {
    console.error("UPLINK_CRITICAL_FAILURE:", error);
    return {
      errors: {
        form: ["CONNECTION_TERMINATED"],
      },
    };
  }
}
