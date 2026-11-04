# Project brief

## Business context

This project is a **premium digital presence** for a manufacturer in architectural windows, doors, and glazing. It is intended to communicate quality, competence, and craft—not a generic catalog site.

Working assumptions (not final decisions):

- A **separate premium brand** may sit alongside an existing company; legal entity and naming are not finalized.
- **Southern Windows** is a temporary working name (`src/lib/brand.ts` marks it explicitly).
- Products will eventually have **their own names and technical content**; today the site speaks in systems and categories, not SKUs.
- **Photography and video** in `assets/` are a core part of the experience; many images are atmospheric references, not claimed completed projects (stated on the homepage and footer).

## Goal and audience

**Goal:** Build trust with architects and high-value residential/commercial clients, present the brand’s design language, and capture qualified project enquiries.

**Primary audience:**

- Architects and design teams coordinating envelope decisions early.
- Clients commissioning bespoke or performance-sensitive openings.

**Secondary audience:** Partners and stakeholders evaluating the premium brand direction before launch.

## Visual and experience quality

The implemented direction is **Warm Editorial**: serif/sans pairing (Newsreader + Source Sans 3), warm paper/mineral palette, generous typography, editorial grids, and restrained motion on desktop-capable viewports.

Quality bar (target, not all verified in QA):

- Distinctive art direction—not a default SaaS layout.
- Intentional responsive layouts (not only scaled desktop).
- Motion supports narrative where enabled; static fallbacks elsewhere.
- Accessible baseline: skip link, semantic landmarks, form labels, focus styles in tokens.
- Honest use of imagery (reference vs. portfolio clearly labeled where applicable).

## Current application scope

| Area | Status |
| --- | --- |
| Marketing homepage (`/`) | Implemented: hero, editorial sections, scroll-driven signature sequence (GSAP, desktop fine-pointer) |
| Site chrome | Header, footer, anchor navigation to homepage sections |
| Project consultation (`/consultation`) | Form UI + Server Action, Zod validation, Resend email (env-dependent) |
| Privacy notice (`/privacy`) | Pre-launch draft copy |
| Product catalog, CMS, admin | Not started |
| Dedicated Products / About routes | Four category pages plus `/about` and `/architects`; product details not started |

## Success criteria

**Near term (Etap 1 completion):**

- Homepage and consultation flow are production-ready after legal, email, and rate-limit hardening.
- Visual and motion behavior verified on target devices/browsers.
- Performance acceptable for first visit (especially images; videos not yet in UI).

**Medium term:**

- Coherent multi-page IA with “coming soon” or minimal stubs where needed.
- Product content model and admin approach chosen and documented before build.

**Long term:**

- Manageable product catalog, integrations, and architect-facing tools as business priorities allow.

## Assumptions and open decisions

See `docs/DECISIONS.md` for the living register. Highlights:

- Final brand name, logo, and domain.
- Markets, languages, and compliance copy.
- Whether consultation remains email-only or connects to CRM.
- Hosting platform (affects rate limiting and edge behavior).
- When and how to introduce hero/ambient **video** from `assets/`.
