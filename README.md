# Southern Windows (working name)

Premium marketing site for architectural windows, doors, and glazing—Warm Editorial homepage with GSAP scroll narrative, category pages, About and For architects, project consultation, a draft privacy notice, and a frontend-only `/admin-preview` demo.

## Status

| Area | State |
| --- | --- |
| Homepage (`/`) | Implemented; owner launch QA, CWV, and production mail still open |
| Category pages | Implemented: `/windows`, `/sliding-doors`, `/entrance-doors`, `/architectural-glazing` — see [`docs/PRODUCT_CATEGORIES.md`](docs/PRODUCT_CATEGORIES.md) |
| About / Architects | Implemented: `/about`, `/architects` |
| Consultation (`/consultation`) | Implemented; needs production mail, host rate limits, legal sign-off |
| Privacy (`/privacy`) | Pre-launch draft |
| Product catalogue / admin | Live CMS not started (Etap 3). Frontend demo at `/admin-preview` — see [`docs/ADMIN_PREVIEW.md`](docs/ADMIN_PREVIEW.md) |

Full audit: [`docs/CURRENT_STATE.md`](docs/CURRENT_STATE.md).

## Requirements

- Node.js **22.x** (tested with 22.17.1)
- npm **10.x**

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Development uses Turbopack (`next dev --turbopack`).

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript (`tsc --noEmit`) |

No automated test script is configured yet.

## Environment variables

Copy `.env.example` to `.env.local` for consultation email:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key |
| `CONSULTATION_FROM_EMAIL` | Verified sender in Resend |
| `CONSULTATION_TO_EMAIL` | Inbox for submissions |

If any are missing at **submit** time, the form returns an error. Production **build** does not require these vars.

## Project layout

| Path | Role |
| --- | --- |
| `src/app` | App Router: `(marketing)` public pages, `admin-preview` demo, root fonts/tokens |
| `src/components` | UI (`home`, `categories`, `site`, `motion`, `admin-preview`) |
| `src/lib` | Brand config, consultation, email, metadata, admin-preview mocks |
| `src/styles` | Tokens and global CSS |
| `assets/` | **Read-only** source media — see [`docs/ASSET_GUIDELINES.md`](docs/ASSET_GUIDELINES.md) |
| `docs/` | Project documentation |
| `.cursor/rules/` | Cursor agent rules (standards, GSAP, git, visual design) |

## Documentation

| Document | Contents |
| --- | --- |
| [`docs/PROJECT_BRIEF.md`](docs/PROJECT_BRIEF.md) | Business context, goals, scope, success criteria |
| [`docs/PRODUCT_CATEGORIES.md`](docs/PRODUCT_CATEGORIES.md) | Four category pages, families, placeholders, open questions |
| [`docs/CURRENT_STATE.md`](docs/CURRENT_STATE.md) | Implementation audit, stack, GSAP, assets |
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | Etapy 1–4: scope, acceptance, decisions |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | App structure, data flow, extension notes |
| [`docs/WORKFLOW.md`](docs/WORKFLOW.md) | AI-assisted workflow in Cursor |
| [`docs/DECISIONS.md`](docs/DECISIONS.md) | Confirmed vs. open decisions |
| [`docs/ADMIN_PREVIEW.md`](docs/ADMIN_PREVIEW.md) | Frontend-only `/admin-preview` demo (not Etap 3) |
| [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) | Vercel, git remotes, Azure Pipelines, env |
| [`docs/ASSET_GUIDELINES.md`](docs/ASSET_GUIDELINES.md) | Media organization and performance |

## Working in Cursor and Git

- **Planning vs. implementation:** Discussing ideas does not authorize code changes—wait for an explicit build/fix request (`docs/WORKFLOW.md`, `.cursor/rules/project-standard.mdc`).
- **Motion:** Do not change GSAP sequences without prior approval (`.cursor/rules/gsap-animation.mdc`).
- **Assets:** Do not rename, move, or overwrite `assets/` without permission.
- **Git:** Conventional Commits; local commits at milestones; **do not push from the agent**—you publish remotes (`.cursor/rules/git-workflow.mdc`).

## Production readiness (incomplete)

Before launch, at minimum:

- Replace in-memory consultation rate limits with a shared/edge limiter.
- Finalize privacy/legal copy and controller details on `/privacy`.
- Configure SPF, DKIM, and DMARC for the sending domain.
- Complete homepage and form QA on target devices (including reduced motion).

Details remain in [`docs/ROADMAP.md`](docs/ROADMAP.md) (Etap 1 acceptance criteria).

## Stack

Next.js 16 (App Router), React 19, TypeScript (strict), ESLint, GSAP (homepage sequence), Zod + Resend HTTP (consultation).
