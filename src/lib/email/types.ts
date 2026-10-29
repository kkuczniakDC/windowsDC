export type SendEmailInput = {
  from: string;
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
};

export type SendEmailResult =
  | { ok: true }
  | { ok: false; reason: "provider_error" | "invalid_response" };

export interface EmailProvider {
  send(input: SendEmailInput): Promise<SendEmailResult>;
}
