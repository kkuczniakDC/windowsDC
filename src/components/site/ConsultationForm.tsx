"use client";

import Link from "next/link";
import {
  Suspense,
  useActionState,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import {
  initialConsultationFormState,
  type ConsultationFormFields,
  type ConsultationFormState,
} from "@/app/consultation/form-state";
import { submitConsultationForm } from "@/app/consultation/actions";
import { routes } from "@/lib/brand";
import styles from "@/app/consultation/consultation.module.css";

const FIELD_ORDER: (keyof ConsultationFormFields)[] = [
  "name",
  "practice",
  "email",
  "location",
  "projectStage",
  "message",
  "consent",
];

function fieldErrorId(field: string, formId: string) {
  return `${formId}-${field}-error`;
}

function fieldElementId(formId: string, field: keyof ConsultationFormFields) {
  if (field === "projectStage") {
    return `${formId}-project-stage`;
  }

  return `${formId}-${field}`;
}

function firstFieldWithError(
  fieldErrors: ConsultationFormState["fieldErrors"],
): keyof ConsultationFormFields | null {
  if (!fieldErrors) {
    return null;
  }

  for (const field of FIELD_ORDER) {
    if (fieldErrors[field]) {
      return field;
    }
  }

  return null;
}

function ConsultationFormFallback() {
  return (
    <form className="stack" aria-busy="true">
      <button type="button" className="button button-primary" disabled>
        Send consultation request
      </button>
    </form>
  );
}

function ConsultationFormInner() {
  const formId = useId();
  const statusRef = useRef<HTMLParagraphElement>(null);
  const handledInstanceKey = useRef(0);
  const [formStartedAt] = useState(() => Date.now());
  const [state, formAction, pending] = useActionState<
    ConsultationFormState,
    FormData
  >(submitConsultationForm, initialConsultationFormState);

  const statusMessageId = `${formId}-status`;
  const savedFields = state.fields;
  const firstErrorField = firstFieldWithError(state.fieldErrors);

  useLayoutEffect(() => {
    if (pending || state.status === "idle") {
      return;
    }

    if (state.formInstanceKey === handledInstanceKey.current) {
      return;
    }

    handledInstanceKey.current = state.formInstanceKey;

    if (firstErrorField) {
      document.getElementById(fieldElementId(formId, firstErrorField))?.focus();
      return;
    }

    statusRef.current?.focus();
  }, [
    firstErrorField,
    formId,
    pending,
    state.formInstanceKey,
    state.status,
  ]);

  return (
    <form
      className="stack"
      action={formAction}
      noValidate
      aria-describedby={statusMessageId}
    >
      <div className={styles.honeypot} inert>
        <input
          name="website"
          type="text"
          autoComplete="off"
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>

      <input
        type="hidden"
        name="formStartedAt"
        value={formStartedAt}
        readOnly
      />

      <div key={state.formInstanceKey} className="stack">
        <div className="form-field">
          <label htmlFor={`${formId}-name`}>Name</label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            defaultValue={savedFields?.name ?? ""}
            aria-invalid={Boolean(state.fieldErrors?.name)}
            aria-describedby={
              state.fieldErrors?.name ? fieldErrorId("name", formId) : undefined
            }
          />
          {state.fieldErrors?.name ? (
            <p
              className={styles.fieldError}
              id={fieldErrorId("name", formId)}
              role="alert"
            >
              {state.fieldErrors.name}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor={`${formId}-practice`}>
            Practice / company{" "}
            <span className={styles.optional}>(optional)</span>
          </label>
          <input
            id={`${formId}-practice`}
            name="practice"
            type="text"
            autoComplete="organization"
            maxLength={160}
            defaultValue={savedFields?.practice ?? ""}
            aria-invalid={Boolean(state.fieldErrors?.practice)}
            aria-describedby={
              state.fieldErrors?.practice
                ? fieldErrorId("practice", formId)
                : undefined
            }
          />
          {state.fieldErrors?.practice ? (
            <p
              className={styles.fieldError}
              id={fieldErrorId("practice", formId)}
              role="alert"
            >
              {state.fieldErrors.practice}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor={`${formId}-email`}>Work email</label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={254}
            defaultValue={savedFields?.email ?? ""}
            aria-invalid={Boolean(state.fieldErrors?.email)}
            aria-describedby={
              state.fieldErrors?.email
                ? fieldErrorId("email", formId)
                : undefined
            }
          />
          {state.fieldErrors?.email ? (
            <p
              className={styles.fieldError}
              id={fieldErrorId("email", formId)}
              role="alert"
            >
              {state.fieldErrors.email}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor={`${formId}-location`}>Project location</label>
          <input
            id={`${formId}-location`}
            name="location"
            type="text"
            autoComplete="address-level2"
            required
            maxLength={200}
            defaultValue={savedFields?.location ?? ""}
            aria-invalid={Boolean(state.fieldErrors?.location)}
            aria-describedby={
              state.fieldErrors?.location
                ? fieldErrorId("location", formId)
                : undefined
            }
          />
          {state.fieldErrors?.location ? (
            <p
              className={styles.fieldError}
              id={fieldErrorId("location", formId)}
              role="alert"
            >
              {state.fieldErrors.location}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor={`${formId}-project-stage`}>Project stage</label>
          <input
            id={`${formId}-project-stage`}
            name="projectStage"
            type="text"
            required
            maxLength={100}
            defaultValue={savedFields?.projectStage ?? ""}
            aria-invalid={Boolean(state.fieldErrors?.projectStage)}
            aria-describedby={
              state.fieldErrors?.projectStage
                ? fieldErrorId("projectStage", formId)
                : undefined
            }
          />
          {state.fieldErrors?.projectStage ? (
            <p
              className={styles.fieldError}
              id={fieldErrorId("projectStage", formId)}
              role="alert"
            >
              {state.fieldErrors.projectStage}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor={`${formId}-message`}>Message</label>
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={6}
            required
            maxLength={5000}
            defaultValue={savedFields?.message ?? ""}
            aria-invalid={Boolean(state.fieldErrors?.message)}
            aria-describedby={
              state.fieldErrors?.message
                ? fieldErrorId("message", formId)
                : undefined
            }
          />
          {state.fieldErrors?.message ? (
            <p
              className={styles.fieldError}
              id={fieldErrorId("message", formId)}
              role="alert"
            >
              {state.fieldErrors.message}
            </p>
          ) : null}
        </div>

        <div className={`form-field ${styles.consentField}`}>
          <label htmlFor={`${formId}-consent`}>
            <input
              id={`${formId}-consent`}
              name="consent"
              type="checkbox"
              required
              defaultChecked={savedFields?.consent ?? false}
              aria-invalid={Boolean(state.fieldErrors?.consent)}
              aria-describedby={
                state.fieldErrors?.consent
                  ? fieldErrorId("consent", formId)
                  : undefined
              }
            />
            <span>
              I agree that {` `}
              Southern Windows (working name) may use my details to respond to
              this consultation request, as described in the{" "}
              <Link className="text-link" href={routes.privacy}>
                privacy notice (draft)
              </Link>
              .
            </span>
          </label>
          {state.fieldErrors?.consent ? (
            <p
              className={styles.fieldError}
              id={fieldErrorId("consent", formId)}
              role="alert"
            >
              {state.fieldErrors.consent}
            </p>
          ) : null}
        </div>
      </div>

      <p
        ref={statusRef}
        tabIndex={-1}
        className={
          state.status === "success" ? styles.statusSuccess : styles.statusMessage
        }
        id={statusMessageId}
        aria-live="polite"
        role={
          state.status !== "idle" && !firstErrorField ? "alert" : undefined
        }
      >
        {state.status !== "idle" && state.message ? state.message : null}
      </p>

      <button
        type="submit"
        className="button button-primary"
        disabled={pending || state.status === "success"}
      >
        {pending ? "Sending…" : "Send consultation request"}
      </button>
    </form>
  );
}

export function ConsultationForm() {
  return (
    <Suspense fallback={<ConsultationFormFallback />}>
      <ConsultationFormInner />
    </Suspense>
  );
}
