# Southern Windows (working name)

Marketing site for a window and door specialist brand. The visual design, homepage motion (GSAP), and consultation page layout live in `src/`; source photography and video remain in read-only `assets/` and are not served directly from that folder in this phase.

## Requirements

- Node.js 22.x (tested with 22.17.1)
- npm 10.x

## Environment variables

Copy `.env.example` to `.env.local` and set:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key for outbound mail |
| `CONSULTATION_FROM_EMAIL` | Verified sender address in Resend |
| `CONSULTATION_TO_EMAIL` | Inbox that receives consultation submissions |

If any of these are missing at **submit** time, the consultation form returns an error and does not pretend the message was sent. The production build does not require env vars.

## Scripts (npm only)

```bash
npm install
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
```

Development uses Turbopack (`next dev --turbopack`).

## Project layout

- `src/app` — App Router pages, including `/consultation` and `/privacy`
- `src/components` — UI (`site`, `home`, `motion`)
- `src/lib` — brand config, consultation validation, email provider
- `src/styles` — design tokens and global styles
- `assets/` — **read-only** source media; do not rename, move, or overwrite without explicit approval

## Consultation form

The `/consultation` route posts via a Server Action, validates with Zod on the server, and sends plain-text email through the Resend HTTP API (no SDK). Lightweight bot checks include a honeypot (inert, off-screen), a minimum time-on-form before submit, and a best-effort in-process rate limit per IP and email before Resend is called.

See `src/lib/consultation/rate-limit.ts` for rate-limit scope. The privacy draft at `/privacy` describes how form data is used and that Resend delivers email.

## Production readiness (not complete)

Before launch, address at least:

- **Rate limiting:** replace in-memory limits with a shared platform or edge limiter (serverless instances do not share process memory).
- **Privacy / legal:** publish final controller identity, contact address, lawful basis, retention, and subject rights on `/privacy` (currently marked pre-launch draft).
- **Email authentication:** configure SPF, DKIM, and DMARC for the sending domain; use a Resend-verified `CONSULTATION_FROM_EMAIL`.

## Stack

Next.js 16 (App Router), React 19, TypeScript (strict), ESLint, GSAP (homepage), Zod (consultation validation).
