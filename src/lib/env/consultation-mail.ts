export type ConsultationMailConfig = {
  resendApiKey: string;
  fromEmail: string;
  toEmail: string;
};

export function getConsultationMailConfig(): ConsultationMailConfig | null {
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail = process.env.CONSULTATION_FROM_EMAIL?.trim();
  const toEmail = process.env.CONSULTATION_TO_EMAIL?.trim();

  if (!resendApiKey || !fromEmail || !toEmail) {
    return null;
  }

  return { resendApiKey, fromEmail, toEmail };
}
