"use server";

import {
  buildConsultationEmailSubject,
  buildConsultationEmailText,
  formDataToConsultationValues,
  mapConsultationFieldErrors,
  toConsultationFormFields,
  toConsultationFormFieldsFromSubmission,
  validateConsultationSubmission,
} from "@/lib/consultation/schema";
import { getConsultationClientIp } from "@/lib/consultation/client-ip";
import { isAllowedConsultationOrigin } from "@/lib/consultation/origin";
import { allowConsultationSubmission } from "@/lib/consultation/rate-limit";
import { getConsultationMailConfig } from "@/lib/env/consultation-mail";
import { createResendEmailProvider } from "@/lib/email";

import {
  emptyConsultationFormFields,
  type ConsultationFormFields,
  type ConsultationFormState,
} from "./form-state";

function nextFormInstanceKey(prevState: ConsultationFormState): number {
  return prevState.formInstanceKey + 1;
}

function consultationErrorState(
  prevState: ConsultationFormState,
  fields: ConsultationFormFields,
  message: string,
  fieldErrors?: ConsultationFormState["fieldErrors"],
): ConsultationFormState {
  return {
    status: "error",
    formInstanceKey: nextFormInstanceKey(prevState),
    fields,
    message,
    fieldErrors,
  };
}

export async function submitConsultationForm(
  prevState: ConsultationFormState,
  formData: FormData,
): Promise<ConsultationFormState> {
  const values = formDataToConsultationValues(formData);
  const fields = toConsultationFormFields(values);

  if (!(await isAllowedConsultationOrigin())) {
    return consultationErrorState(
      prevState,
      fields,
      "This submission could not be verified. Please try again.",
    );
  }

  const mailConfig = getConsultationMailConfig();

  if (!mailConfig) {
    return consultationErrorState(
      prevState,
      fields,
      "Consultation submissions are unavailable right now. Please try again later.",
    );
  }

  const validated = validateConsultationSubmission(values);

  if (!validated.success) {
    const fieldErrors = mapConsultationFieldErrors(validated.error);

    if (Object.keys(fieldErrors).length === 0) {
      return consultationErrorState(
        prevState,
        fields,
        "We could not process your submission. Please try again.",
      );
    }

    return consultationErrorState(
      prevState,
      fields,
      "Please correct the highlighted fields.",
      fieldErrors,
    );
  }

  const submission = validated.data;
  const submissionFields = toConsultationFormFieldsFromSubmission(submission);
  const clientIp = await getConsultationClientIp();

  if (
    !allowConsultationSubmission(clientIp, submission.email)
  ) {
    return consultationErrorState(
      prevState,
      submissionFields,
      "Too many consultation requests in a short time. Please wait before trying again.",
    );
  }

  const provider = createResendEmailProvider(mailConfig.resendApiKey);
  const sendResult = await provider.send({
    from: mailConfig.fromEmail,
    to: mailConfig.toEmail,
    subject: buildConsultationEmailSubject(submission.name),
    text: buildConsultationEmailText(submission),
    replyTo: submission.email,
  });

  if (!sendResult.ok) {
    return consultationErrorState(
      prevState,
      submissionFields,
      "We could not send your request right now. Please try again in a few minutes.",
    );
  }

  return {
    status: "success",
    formInstanceKey: nextFormInstanceKey(prevState),
    fields: emptyConsultationFormFields,
    message:
      "Thank you. Your consultation request was sent and we will follow up using the work email you provided.",
  };
}
