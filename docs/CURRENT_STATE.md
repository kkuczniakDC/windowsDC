# Current state (implementation audit)

*Audit date: 2026-10-29. Based on repository inspection, not full manual QA in all browsers.*

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js **16.4.3** (App Router) |
| UI | React **19.3.0**, TypeScript **strict** |
| Styling | CSS modules + global tokens (`src/styles/tokens.css`) |
| Bundler / dev | Turbopack (`next dev --turbopack`) |
| Package manager | **npm** (scripts in `package.json`; no lockfile audit in this doc) |
| Motion | GSAP **3.15.0**, `@gsap/react` **2.1.2**, ScrollTrigger (homepage sequence only) |
| Forms / mail | Zod **4.x**, Resend HTTP API via custom provider (no Resend SDK) |

Next config enables `cacheComponents` and `partialPrefetching`.

## Repository layout

```
src/app/              App Router pages and Server Actions
src/components/
  home/               Homepage sections (Hero, HomePage, SignatureSequence)
  site/               Header, footer, consultation form
  motion/             Placeholder barrel (no exports yet)
src/lib/              brand, metadata, consultation, email, env, content stubs
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
| `/consultation` | Static shell; form posts Server Action | Lead capture |
| `/privacy` | Static | Draft privacy notice |
| `/_not-found` | Default | 404 |

No `/products`, `/about`, or separate `/contact` route—consultation serves contact intent.

Central route constants: `src/lib/brand.ts` (`routes.home`, `consultation`, `privacy`).

## Homepage composition

Implemented in `src/components/home/HomePage.tsx` (server component) with client child for motion.

| # | Section | ID / anchor | Notes |
| --- | --- | --- | --- |
| — | Hero | — | Responsive `<picture>`, desktop vs mobile hero images |
| 01 | The opening (thesis) | — | Copy + large daylight image |
| 02 | Systems | `#systems` | Four system lines (not linked to product pages) |
| 03 | Three movements | `#approach` | `SignatureSequence` — GSAP ScrollTrigger pin/scrub |
| 04 | Performance | — | Four pillars + technical disclaimer |
| 05 | Collaboration | `#architects` | Process list + link to consultation |
| 06 | Atmosphere studies | `#atmospheres` | Image + disclaimer about reference photography |
| 07 | Begin (final CTA) | — | Consultation CTA |

Header/footer link to anchors and `/consultation`.

## GSAP integration

**Location:** `src/components/home/SignatureSequence.tsx` only.

**Pattern:**

- `"use client"` + `useGSAP({ scope: root })`.
- `gsap.registerPlugin(useGSAP, ScrollTrigger)` at module level.
- `gsap.matchMedia()` for `(min-width: 1100px) and (min-height: 700px) and (pointer: fine) and (prefers-reduced-motion: no-preference)`.
- On match: sets `data-enhanced="true"` on section root; pinned stage with scrub timeline (~280% scroll distance); progress bars; scene transitions via opacity, clip-path, and media transforms.
- Cleanup: matchMedia `revert()` on unmount; callback removes `data-enhanced` when context tears down.

**CSS pairing:** `SignatureSequence.module.css` mirrors the same media query for stacked vs. pinned layout.

**Not verified in this audit:** runtime behavior in browser (ScrollTrigger refresh on resize, Strict Mode double-mount, touch devices). Code structure follows `@gsap/react` scoping and documents reduced-motion bypass.

**Placeholder:** `src/components/motion/index.ts` is empty—no shared motion utilities yet.

## Styles, fonts, responsiveness

- **Fonts:** Google fonts via `next/font` in `layout.tsx` (Newsreader, Source Sans 3).
- **Tokens:** Colors, spacing scale, page gutter, focus ring in `tokens.css`; utilities (`.eyebrow`, `.button`, `.text-link`) in `global.css`.
- **Layout:** Editorial 12-column grids on homepage sections; component-level breakpoints in module CSS.
- **Accessibility (code review):** Skip link to `#main-content`, `aria-labelledby` on sections, alt text on images, consultation form field errors and status region (client component).

## Assets

### Used in application (7 JPEGs)

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

Next.js optimizes these at build/dev time (WebP variants observed in `.next/cache`).

### Present but unused in code

- **19 additional JPEGs** in `assets/` (including several multi-MB sources, e.g. ~13 MB `heng-chiu-O0-nO2ipXAg-unsplash.jpg`).
- **4 MP4 videos** (5–33 MB each); **not referenced** in `src/`—available for future hero or ambient sections.

See `docs/ASSET_GUIDELINES.md` for size inventory and delivery recommendations.

## Consultation flow

- **UI:** `ConsultationForm.tsx` — `useActionState`, honeypot, minimum time on form before submit, field-level errors.
- **Server:** `src/app/consultation/actions.ts` — origin check, env-gated Resend send, in-memory rate limit per IP/email.
- **Env:** `.env.example` — `RESEND_API_KEY`, `CONSULTATION_FROM_EMAIL`, `CONSULTATION_TO_EMAIL`.
- **Privacy:** Draft at `/privacy` references form processing and Resend.

Production gaps documented in `README.md` (shared rate limiter, legal finalization, SPF/DKIM/DMARC).

## Scripts and checks

| Script | Command | Result (2026-10-29) |
| --- | --- | --- |
| `typecheck` | `tsc --noEmit` | Pass |
| `lint` | `eslint .` | Pass |
| `build` | `next build` | Pass; static routes for `/`, `/consultation`, `/privacy` |
| Tests | — | **No test runner configured** |

## Git history (snapshot)

- Branch: `main`
- Latest commit: `2c4dbd2` — establishes Warm Editorial site with homepage and consultation flow.
- **Uncommitted work at audit time:** local edits to `SignatureSequence` (tsx/css) and Cursor rules (`gsap-animation`, `project-standard`); untracked `git-workflow.mdc`. Treat as in-progress user/agent work, not part of baseline commit unless separately merged.

## Known limitations and technical debt

1. **Consultation rate limiting** is in-process only—not safe for multi-instance serverless without replacement.
2. **Brand/contact** placeholders (`contact.email` / `phone` null in `brand.ts`).
3. **Content layer** stubs (`src/lib/content`, `src/content`)—copy lives inline in components.
4. **Systems list items** show ↗ affordance but have no destinations (future product routes).
5. **Videos and most photos** unused—risk of accidental commit bloat if served without optimization strategy.
6. **Motion verification** not run in browser during this documentation pass.
7. **visual-design.mdc** frontmatter appears duplicated/conflicting (`alwaysApply` true and false)—see architecture/decisions docs; rule behavior in Cursor may be ambiguous until cleaned up (recommendation only; not changed in this pass).
