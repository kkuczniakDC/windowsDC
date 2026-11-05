# Admin preview (frontend demo)

`/admin-preview` is a **visual CMS prototype** for client presentation. It is not a content management system, not a staff tool, and not Etap 3.

Open locally: [http://localhost:3000/admin-preview](http://localhost:3000/admin-preview) (`npm run dev`).

## What it is

- Six workspace screens with Warm Editorial tokens (paper / plaster / ink / oxide / moss / bronze, radius 0, Source Sans 3 with Newsreader titles).
- Seeded from existing public copy in `src/lib/content` (category families, About, Architects).
- All edits live in React state for the current browser session. A full refresh resets the workspace.
- Persistent banner:

  > DEMO PREVIEW — Visual prototype only. No live data connected. Changes are not saved.

There is no login screen, no password gate, no database, and no network write for admin actions.

## Isolation

Public marketing chrome must not wrap the workspace, and the workspace must not appear in public navigation.

| Surface | Implementation |
| --- | --- |
| Public pages | `src/app/(marketing)/` with skip-link, `SiteScrollShell`, `SiteHeader`, `SiteFooter` |
| Admin workspace | sibling `src/app/admin-preview/` with `AdminPreviewProvider` + `AdminShell` |
| Root layout | fonts, tokens, and `<body>` only — no site chrome |
| Public nav | `SiteHeader` / `SiteFooter` — no admin link |
| Route constants | `src/lib/brand.ts` `routes` does **not** include `/admin-preview` |
| Indexing | admin layout metadata sets `robots: { index: false, follow: false }` |

Do not add `/admin-preview` to header, footer, or `brand.ts`. Reach it by URL (or the “View public site” link from the workspace sidebar).

## Screens

| Route | Purpose |
| --- | --- |
| `/admin-preview` | Overview: sample counts, quick actions, recent products, activity feed |
| `/admin-preview/products` | Search / filter, detail pane, create/edit sample product, publish/draft confirm |
| `/admin-preview/categories` | Four public lines with session sample counts; links to public pages |
| `/admin-preview/media` | Flat library: select and reorder; no upload |
| `/admin-preview/content` | Session clones of About and For architects only — not homepage copy |
| `/admin-preview/social` | Coming-soon copy. No connected accounts, no fake “live” badges |

Products query params used by the demo: `?create=1`, `?selected=<id>`, `?category=<categoryId>`.

## Mock catalogue

Products are built in `src/lib/admin-preview/mock-data.ts` from `getAllCategories()`:

- Windows, sliding doors, and architectural glazing: one sample product per family.
- Entrance doors: **one** contemporary aluminium product with **six chapters** (not six SKUs).
- Statuses alternate published / draft for the demo. Every row is labelled Sample.
- No invented prices, U-values, acoustics, certifications, guarantees, or manufacturer names.

Content edits update provider state only. They do not write `src/lib/content` and they do not change the public site.

## Media library

Catalog: `src/lib/admin-preview/media-catalog.ts`.

| Kind | Count | Behaviour |
| --- | --- | --- |
| Imported JPEGs | 12 | Shown with `next/image` |
| Large still (`heng-chiu-O0-nO2ipXAg-unsplash.jpg`, ~13.4 MB) | 1 | Metadata row only — not imported |
| MP4 videos | 4 | Metadata rows only — not loaded |

Captions stay “Visual reference · demo placeholder”. Uploads, transcoding, and CDN delivery are out of scope.

## Client presentation notes

- Tell the room that Publish / Save / reorder only change this browser tab.
- Public pages stay on their current copy even while the content screen is edited.
- If this app is deployed, `/admin-preview` is reachable by URL without auth. It is noindexed, but it is not a private staff area.
- Social remains a placeholder on purpose (Etap 4), not a broken integration.

## Files

| Path | Role |
| --- | --- |
| `src/app/admin-preview/` | Routes and layout |
| `src/components/admin-preview/` | Shell, views, CSS modules |
| `src/lib/admin-preview/` | Types, mock seed, media catalog, date labels |
| `.cursor/agents/admin-preview-implementer.md` | Cursor agent for future preview-only edits |

Related: [`DEPLOYMENT.md`](DEPLOYMENT.md), [`ROADMAP.md`](ROADMAP.md) Etap 2.5 vs Etap 3, [`ARCHITECTURE.md`](ARCHITECTURE.md).
