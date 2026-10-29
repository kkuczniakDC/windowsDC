import type { EmailProvider, SendEmailInput, SendEmailResult } from "./types";

const RESEND_API_URL = "https://api.resend.com/emails";
const RESEND_REQUEST_TIMEOUT_MS = 10_000;

export function createResendEmailProvider(apiKey: string): EmailProvider {
  return {
    async send(input: SendEmailInput): Promise<SendEmailResult> {
      const payload: Record<string, unknown> = {
        from: input.from,
        to: [input.to],
        subject: input.subject,
        text: input.text,
      };

      if (input.replyTo) {
        payload.reply_to = input.replyTo;
      }

      let response: Response;

      try {
        response = await fetch(RESEND_API_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(RESEND_REQUEST_TIMEOUT_MS),
        });
      } catch {
        return { ok: false, reason: "provider_error" };
      }

      if (!response.ok) {
        return { ok: false, reason: "provider_error" };
      }

      try {
        await response.json();
      } catch {
        return { ok: false, reason: "invalid_response" };
      }

      return { ok: true };
    },
  };
}
