/**
 * Shared content types for the data files in `src/data`.
 *
 * Each JSON file is imported statically and asserted against one of these
 * interfaces, so a malformed data file fails `tsc` at build time.
 */

/** A single entry of the project matrix. */
export interface Project {
  /** Displayed as `PRJ_{id}` in the card header. */
  id: string;
  title: string;
  subtitle: string;
  date: string;
  /** Chip rendered top-right of the card (e.g. "SaaS Platform"). */
  tag: string;
  description: string;
  features?: string[];
  /** When present, renders the "In Progress" bar. */
  progress?: number;
  /** External link; `"#"` or omitted renders no link. */
  href?: string;
  /** Renders the REDACTED overlay treatment. */
  isRedacted?: boolean;
}

/** A single entry of the professional history. */
export interface ExperienceEntry {
  /** Displayed as `EXP_{id}` in the card header. */
  id: string;
  /** Company or organisation. */
  title: string;
  /** Role title. */
  subtitle: string;
  date: string;
  highlights: string[];
  /** Renders the pulsing "Current" badge. */
  current?: boolean;
  /** Renders the footer chips (role + mentoring detail). */
  lead?: {
    role: string;
    detail: string;
  };
}

/** A single academic credential. */
export interface EducationEntry {
  degree: string;
  institution: string;
  location: string;
  date: string;
  /** Current academic status (e.g. "In Progress", "Graduated"). */
  status: string;
}

/** An external channel shown in the contact section and/or footer. */
export interface SocialLink {
  /** One of: "email" | "github" | "linkedin" | "gitlab". */
  id: string;
  /** Uppercase platform name, used by the footer. */
  name: string;
  /** Display label, used by the contact section. */
  label: string;
  href: string;
  /** Renders the link in the footer. */
  inFooter: boolean;
  /** Ordering for the footer link list. */
  footerOrder?: number;
}

/** A top-level navigation anchor. */
export interface NavLink {
  label: string;
  href: string;
}

/** Structured body of the hero "Technical Profile" panel. */
export interface TechnicalProfile {
  environment: {
    OS: string[];
    EDITOR: string;
    SHELL: string;
  };
  core_stack: {
    FRONTEND: string[];
    BACKEND: string[];
    INFRA: string[];
  };
  experience: string;
  status: string;
  location: string;
}

/** Hero copy and technical profile. */
export interface Profile {
  badge: string;
  firstName: string;
  lastName: string;
  role: string;
  summary: string;
  basedIn: string;
  coordinates: string;
  location: string;
  status: string;
  panel: TechnicalProfile;
}
