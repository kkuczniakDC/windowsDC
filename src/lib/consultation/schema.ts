import { z } from "zod";

import type { ConsultationFormFields } from "@/app/consultation/form-state";

export const CONSULTATION_FIELD_LIMITS = {
  name: 120,
  practice: 160,
  email: 254,
  location: 200,
  projectStage: 100,
  message: 5000,
  honeypot: 200,
} as const;

const MIN_SUBMIT_ELAPSED_MS = 3_000;
/** Soft upper bound — avoids rejecting long drafting sessions; not a security control. */
const MAX_SUBMIT_ELAPSED_MS = 24 * 60 * 60 * 1000;

function collapseWhitespace(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

function normalizeMessage(value: string): string {
  return value.replace(/\r\n/g, "\n").trim();
}

function optionalPractice(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const normalized = collapseWhitespace(value);

  if (!normalized) {
    return undefined;
  }

  return normalized;
}

export const consultationSubmissionSchema = z.object({
  name: z
    .string()
    .transform(collapseWhitespace)
    .pipe(z.string().min(1, "Enter your name.").max(CONSULTATION_FIELD_LIMITS.name)),
  practice: z.preprocess(optionalPractice, z.string().max(CONSULTATION_FIELD_LIMITS.practice).optional()),
  email: z
    .string()
    .transform((value) => collapseWhitespace(value).toLowerCase())
    .pipe(
      z
        .string()
        .min(1, "Enter your work email.")
        .email("Enter a valid work email address.")
        .max(CONSULTATION_FIELD_LIMITS.email),
    ),
  location: z
    .string()
    .transform(collapseWhitespace)
    .pipe(
      z
        .string()
        .min(1, "Enter the project location.")
        .max(CONSULTATION_FIELD_LIMITS.location),
    ),
  projectStage: z
    .string()
    .transform(collapseWhitespace)
    .pipe(
      z
        .string()
        .min(1, "Enter the project stage.")
        .max(CONSULTATION_FIELD_LIMITS.projectStage),
    ),
  message: z
    .string()
    .transform(normalizeMessage)
    .pipe(
      z
        .string()
        .min(1, "Tell us about the project.")
        .max(CONSULTATION_FIELD_LIMITS.message),
    ),
  consent: z.literal(true, {
    message: "Consent is required to submit this form.",
  }),
  website: z
    .string()
    .max(CONSULTATION_FIELD_LIMITS.honeypot)
    .refine((value) => value.trim().length === 0, {
      message: "Invalid submission.",
    }),
  formStartedAt: z.number().finite(),
});

export type ConsultationSubmission = z.infer<typeof consultationSubmissionSchema>;

export type ConsultationFormValues = {
  name: string;
  practice: string;
  email: string;
  location: string;
  projectStage: string;
  message: string;
  consent: boolean;
  website: string;
  formStartedAt: number;
};

export function formDataToConsultationValues(
  formData: FormData,
): ConsultationFormValues {
  const startedAtRaw = formData.get("formStartedAt");

  return {
    name: String(formData.get("name") ?? ""),
    practice: String(formData.get("practice") ?? ""),
    email: String(formData.get("email") ?? ""),
    location: String(formData.get("location") ?? ""),
    projectStage: String(formData.get("projectStage") ?? ""),
    message: String(formData.get("message") ?? ""),
    consent: formData.get("consent") === "on",
    website: String(formData.get("website") ?? ""),
    formStartedAt:
      typeof startedAtRaw === "string" ? Number(startedAtRaw) : Number.NaN,
  };
}

export function validateConsultationSubmission(values: ConsultationFormValues) {
  const parsed = consultationSubmissionSchema.safeParse({
    ...values,
    consent: values.consent ? true : undefined,
  });

  if (!parsed.success) {
    return parsed;
  }

  const elapsedMs = Date.now() - parsed.data.formStartedAt;

  if (
    elapsedMs < MIN_SUBMIT_ELAPSED_MS ||
    elapsedMs > MAX_SUBMIT_ELAPSED_MS
  ) {
    return {
      success: false as const,
      error: new z.ZodError([
        {
          code: "custom",
          path: ["formStartedAt"],
          message: "Invalid submission.",
        },
      ]),
    };
  }

  return parsed;
}

export function buildConsultationEmailText(data: ConsultationSubmission): string {
  const practiceLine = data.practice?.length
    ? data.practice
    : "Not provided";

  return [
    "New consultation request",
    "",
    `Name: ${data.name}`,
    `Practice / company: ${practiceLine}`,
    `Work email: ${data.email}`,
    `Project location: ${data.location}`,
    `Project stage: ${data.projectStage}`,
    "",
    "Message:",
    data.message,
    "",
    "---",
    "Submitted via the consultation form.",
  ].join("\n");
}

export function buildConsultationEmailSubject(name: string): string {
  const safeName = name.replace(/[\r\n]+/g, " ").slice(0, 80);

  return `Consultation request — ${safeName}`;
}

export function mapConsultationFieldErrors(
  error: z.ZodError,
): Partial<Record<keyof ConsultationFormValues, string>> {
  const fieldErrors: Partial<Record<keyof ConsultationFormValues, string>> = {};

  for (const issue of error.issues) {
    const key = issue.path[0];

    if (typeof key !== "string") {
      continue;
    }

    if (key in fieldErrors) {
      continue;
    }

    if (
      key === "name" ||
      key === "practice" ||
      key === "email" ||
      key === "location" ||
      key === "projectStage" ||
      key === "message" ||
      key === "consent"
    ) {
      fieldErrors[key] = issue.message;
    }
  }

  return fieldErrors;
}

export function toConsultationFormFields(
  values: ConsultationFormValues,
): ConsultationFormFields {
  return {
    name: values.name,
    practice: values.practice,
    email: values.email,
    location: values.location,
    projectStage: values.projectStage,
    message: values.message,
    consent: values.consent,
  };
}

export function toConsultationFormFieldsFromSubmission(
  submission: ConsultationSubmission,
): ConsultationFormFields {
  return {
    name: submission.name,
    practice: submission.practice ?? "",
    email: submission.email,
    location: submission.location,
    projectStage: submission.projectStage,
    message: submission.message,
    consent: true,
  };
}
