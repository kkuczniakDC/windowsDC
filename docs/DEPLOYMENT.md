# Deployment

This app is a Next.js site. Production hosting is **Vercel**. The agent does not publish remotes, edit pipeline files, or change Vercel project settings.

## Git remotes

| Remote | URL | Role |
| --- | --- | --- |
| `github` | `https://github.com/kkuczniakDC/windowsDC.git` | GitHub copy; local `main` tracks `github/main` |
| `origin` | `https://DCWebTeam@dev.azure.com/DCWebTeam/southernwindows/_git/southernwindows` | Azure Repos |

The owner publishes (`git push`). Cursor agents commit locally only.

## Vercel

A Vercel project is already wired in-repo via Azure Pipelines:

| Field | Value in `azure-pipelines.yml` |
| --- | --- |
| Task | `vercel-deployment-task@3` |
| Project | `prj_xpnKMZgNLLkyZC6ofUmg9CcO0fgC` |
| Team | `team_xVHG2FrAdr7cw18rjohXyykm` |
| Production | `true` on `main` |
| Secret | pipeline variable `VERCEL_TOKEN` (not stored in git) |

Two connection paths exist; do not “clean up” either without an explicit owner decision:

1. **GitHub → Vercel** (owner-stated integration on the `github` remote).
2. **Azure Pipelines → Vercel** (`azure-pipelines.yml`, trigger `main`, `ubuntu-latest`).

This milestone does **not** change `azure-pipelines.yml`, `next.config.ts`, `package.json`, or Vercel dashboard config.

## Environment (consultation mail)

Production **build** does not require mail secrets. Submitting `/consultation` does.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key |
| `CONSULTATION_FROM_EMAIL` | Verified sender |
| `CONSULTATION_TO_EMAIL` | Inbox for submissions |

Set these in the Vercel project (and locally in `.env.local`). See `.env.example` and `README.md`.

Admin preview uses no extra env vars and no paid services.

## What a production deploy includes

The same Next app serves:

- Public marketing routes (`/`, category pages, `/about`, `/architects`, `/consultation`, `/privacy`).
- `/admin-preview` — unauthenticated visual prototype, `noindex`/`nofollow`. Session mock only; not a staff CMS.

Do not treat `/admin-preview` as a private admin. If it must stay off production, that is a later hosting/auth decision (Etap 3), not part of this demo.

## Local commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
```

Node 22.x, npm 10.x. Turbopack in development (`next dev --turbopack`).

## Do not

- `git push` from the agent.
- Edit `azure-pipelines.yml`, Vercel project/team IDs, or GitHub/Azure remote URLs unless the owner asks.
- Add PostgreSQL, auth providers, or other paid infra for the preview.
- Commit `.env.local`, `VERCEL_TOKEN`, or other secrets.
