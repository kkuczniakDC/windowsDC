# Current state (implementation audit)

*Audit date: 2026-11-05 (Etap 2.5 admin preview). Previous baselines 2026-11-04 (About / Architects + Etap 1 engineering close), 2026-10-30 (category pages), and 2026-10-29. Lint passed on this pass. HTTP 200 confirmed for public and `/admin-preview` routes against localhost. Interactive agent browser MCP was unavailable in this pass; visual/CWV/GSAP runtime sign-off remains with the owner.*

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js **16.4.3** (App Router) |
| UI | React **19.3.0**, TypeScript **strict** |
| Styling | CSS modules + global tokens (`src/styles/tokens.css`) |
| Bundler / dev | Turbopack (`next dev --turbopack`) |
| Package manager | **npm** (scripts in `package.json`; no lockfile audit in this doc) |
| Motion | GSAP **3.15.0**, `@gsap/react` **2.1.2**, ScrollTrigger + ScrollSmoother (homepage), `CategoryMotion` on category pages |
| Forms / mail | Zod **4.x**, Resend HTTP API via custom provider (no Resend SDK) |

Next config enables `cacheComponents` and `partialPrefetching`.

## Repository layout

```
src/app/
  layout.tsx          Root: fonts, tokens, body only
  (marketing)/        Public pages + layout (skip-link, SiteScrollShell, header/footer)
  admin-preview/      Frontend-only CMS demo (isolated workspace)
src/components/
  home/               Homepage sections (Hero, HomePage, SignatureSequence)
  categories/         Shared category page, media slots, page GSAP
  site/               Header, footer, consultation form
  motion/             SiteScrollShell, ScrollDriftFigure, homepage section speeds
  admin-preview/      Admin demo shell and views
src/lib/              brand, metadata, consultation, email, env, category content, admin-preview mocks
src/styles/           reset, tokens, global
src/content/          Placeholder (.gitkeep)
assets/               Read-only source media (imported into Next where used)
public/               Empty except .gitkeep (no static media served from here yet)
.cursor/rules/        Cursor agent rules
```

## Routes

| Route | Rendering | Purpose |
| --- | --- | --- |
| `/` | Static | Homepage |
| `/windows` | Static | Windows category presentation |
| `/sliding-doors` | Static | Sliding doors category presentation |
| `/entrance-doors` | Static | Entrance doors category presentation |
| `/architectural-glazing` | Static | Architectural glazing category presentation |
| `/about` | Static | Brand / practice editorial page |
| `/architects` | Static | For architects editorial page |
| `/consultation` | Static shell; form posts Server Action | Lead capture (also the contact channel) |
| `/privacy` | Static | Draft privacy notice |
| `/admin-preview` | Static shell; client mock state | Frontend CMS demo (overview) |
| `/admin-preview/products` | Client | Sample products |
| `/admin-preview/categories` | Client | Category index |
| `/admin-preview/media` | Client | Media library demo |
| `/admin-preview/content` | Client | About / Architects session copies |
| `/admin-preview/social` | Static copy | Coming-soon placeholder |
| `/_not-found` | Default | 404 |

No product-detail or separate `/contact` route—consultation still serves contact intent. Category IA is documented in `docs/PRODUCT_CATEGORIES.md`. About and Architects share `EditorialPage` (no GSAP). Admin preview is documented in `docs/ADMIN_PREVIEW.md` and is **not** in public nav.

Central route constants: `src/lib/brand.ts` (`routes.home`, `about`, `architects`, `windows`, `slidingDoors`, `entranceDoors`, `architecturalGlazing`, `consultation`, `privacy`). `/admin-preview` is intentionally omitted from `routes`.

## Homepage composition

Implemented in `src/components/home/HomePage.tsx` (server component) with client child for motion.

| # | Section | ID / anchor | Notes |
| --- | --- | --- | --- |
| — | Hero | — | Responsive `<picture>`, desktop vs mobile hero images |
| 01 | The opening (thesis) | — | Copy + large daylight image |
| 02 | Systems | `#systems` | Four system lines linked to category routes |
| 03 | Three movements | `#approach` | `SignatureSequence` — GSAP ScrollTrigger pin/scrub |
| 04 | Performance | — | Four pillars + technical disclaimer |
| 05 | Collaboration | `#architects` | Process list + link to consultation |
| 06 | Atmosphere studies | `#atmospheres` | Image + disclaimer about reference photography |
| 07 | Begin (final CTA) | — | Consultation CTA |

Header: Systems `/#systems`, Approach `/#approach`, For architects `/architects`, CTA `/consultation`. Footer Explore also includes About. Homepage `#architects` is retained and links onward to `/architects`.

## GSAP integration

Plugins register once in `src/lib/gsap/register-client-plugins.ts` (`ScrollTrigger`, `ScrollSmoother`).

**Homepage**

- `SiteScrollShell` — ScrollSmoother only when `pathname === "/"` and `scrollSmootherMedia` matches.
- `SignatureSequence` — `"use client"` + `useGSAP({ scope: root })`; pinned scrub timeline on the same desktop / fine-pointer / no-reduced-motion query; stacked CSS fallback otherwise.
- `ScrollDriftFigure` — modest scrubbed `yPercent` on thesis and atmosphere images.

**Category pages**

- `CategoryMotion` — `useGSAP` + `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`; hero entrance and family reveals; no pins, no ScrollSmoother, no `data-speed`. Cleanup via `matchMedia.revert()`.

**Not verified in this pass:** live screenshot QA of motion (agent browser unavailable). HTTP checks confirmed the four category routes and homepage system links. Code structure follows `@gsap/react` scoping and reduced-motion bypass.

`src/components/motion/index.ts` exports `SiteScrollShell`, `ScrollDriftFigure`, and `homeSectionEffectProps`.

## Styles, fonts, responsiveness

- **Fonts:** Google fonts via `next/font` in the root `layout.tsx` (Newsreader, Source Sans 3).
- **Tokens:** Colors, spacing scale, page gutter, focus ring in `tokens.css`; utilities (`.eyebrow`, `.button`, `.text-link`) in `global.css`.
- **Layout:** Editorial 12-column grids on homepage sections; component-level breakpoints in module CSS.
- **Accessibility (code review):** Marketing skip link to `#main-content`; admin skip link to `#admin-main-content`. `aria-labelledby` on sections, alt text on images, consultation form field errors and status region (client component).

## Assets

### Used in application (12 JPEGs on public + admin preview)

Public pages still use the ten imports below. Admin preview also shows `greyson-growth-yRcRrCIqxtw-unsplash.jpg` and `miguel-luis-r6uVcUq0I8E-unsplash.jpg` (already used on About / Architects) through the media catalog.

Imported from `assets/` through `next/image` or `getImageProps`:

| File | Used in |
| --- | --- |
| `sliding-door-dark-unsplash.jpg` | Hero (desktop) |
| `yael-yanez-Uuz7lCQWpyo-unsplash.jpg` | Hero (mobile) |
| `ej-li-afZTFY94vv0-unsplash.jpg` | Thesis section |
| `maxim-scheglov-TMauUlE9PxE-unsplash.jpg` | Atmosphere studies |
| `de-vontez-cox-obHGJUwzJsA-unsplash.jpg` | Signature sequence — Line |
| `ben-ashby-0jUEk_11na8-unsplash.jpg` | Signature sequence — Height |
| `sunset-window-unsplash.jpg` | Signature sequence — Horizon |
| `bundo-kim-MmagnTelMyo-unsplash.jpg` | Windows category inspiration |
| `zhisheng-deng-W8FPl06Q4F4-unsplash.jpg` | Sliding doors category inspiration |
| `naomi-august-a14NxeTfMXE-unsplash.jpg` | Architectural glazing inspiration |
| `greyson-growth-yRcRrCIqxtw-unsplash.jpg` | About page + admin media catalog |
| `miguel-luis-r6uVcUq0I8E-unsplash.jpg` | Architects page + admin media catalog |

Product-family slots use designed CSS/SVG placeholders (`CategoryMedia`). Entrance inspiration uses the same constructed figure. Next.js optimizes imported JPEGs at build/dev time.

Admin preview lists the ~13.4 MB `heng-chiu` still and the four MP4s as **metadata-only** rows (not imported, not decoded).

### Present but unused as rendered media

- **Additional JPEGs** in `assets/` beyond the twelve imported stills (including ~13 MB `heng-chiu-O0-nO2ipXAg-unsplash.jpg`, metadata-only in admin preview).
- **4 MP4 videos** (5–33 MB each); not played in `src/`—metadata rows in admin preview only.

See `docs/ASSET_GUIDELINES.md` for size inventory and delivery recommendations.

## Consultation flow

- **UI:** `ConsultationForm.tsx` — `useActionState`, honeypot, minimum time on form before submit, field-level errors.
- **Server:** `src/app/(marketing)/consultation/actions.ts` — origin check, env-gated Resend send, in-memory rate limit per IP/email.
- **Env:** `.env.example` — `RESEND_API_KEY`, `CONSULTATION_FROM_EMAIL`, `CONSULTATION_TO_EMAIL`.
- **Privacy:** Draft at `/privacy` references form processing and Resend.

Production gaps documented in `README.md` (shared rate limiter, legal finalization, SPF/DKIM/DMARC).

## Scripts and checks

| Script | Command | Result (2026-11-05) |
| --- | --- | --- |
| `typecheck` | `tsc --noEmit` | Pass |
| `lint` | `eslint .` | Pass |
| `build` | `next build` | Pass on prior admin implementation pass (static public + `/admin-preview` routes). Re-run before release. |
| Tests | — | **No test runner configured** |

## Git history (snapshot)

- Branch: `main` tracking `github/main`
- Latest published commit at this audit: `ea0fada` (`hub test build`). Admin preview work is the following local milestone.

## Known limitations and technical debt

1. **Consultation rate limiting** is in-process only—not safe for multi-instance serverless without replacement.
2. **Brand/contact** placeholders (`contact.email` / `phone` null in `brand.ts`).
3. **Content layer** — category copy in `src/lib/content/categories.ts`; About/Architects in `about.ts` / `architects.ts`; homepage copy remains inline in TSX. `src/content/` is still empty. `/admin-preview` is a session mock (Etap 2.5), not a CMS.
4. **Product detail routes** do not exist yet. Family blocks are in-page articles; `detailHref` is reserved and unset.
5. **Videos and most photos** unused—risk of accidental commit bloat if served without optimization strategy.
6. **Motion verification** — code audit 2026-11-04 matches Etap 1 structure (pin/scrub, reduced-motion fallback, smoother homepage-only). Runtime browser verification and Core Web Vitals were not measured (agent browser tools unavailable). Pre-existing uncommitted `SiteScrollShell` hydration/scroll-reset work was left untouched.
7. **visual-design.mdc** frontmatter appears duplicated/conflicting (`alwaysApply` true and false)—see architecture/decisions docs; rule behavior in Cursor may be ambiguous until cleaned up (recommendation only; not changed in this pass).
8. **Admin preview** is unauthenticated. If the Next app is deployed, `/admin-preview` is URL-reachable despite `noindex`. Not suitable as a staff tool (Etap 3).
9. **Hosting** — Vercel project IDs live in `azure-pipelines.yml`; GitHub remote exists for owner-stated Vercel Git integration. See `docs/DEPLOYMENT.md`. O-TECH-01 closed as Vercel.
