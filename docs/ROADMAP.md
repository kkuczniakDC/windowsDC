# Development roadmap

Phases align with the agreed product direction. **Completion status reflects the audit in `CURRENT_STATE.md`, not wishful “done.”**

---

## Etap 1 — Premium homepage

### Scope

- Preserve and refine the existing Warm Editorial homepage (`Hero`, editorial sections, `SignatureSequence`).
- Site chrome, metadata, tokens, and anchor navigation.
- Consultation + draft privacy as part of go-to-market readiness (already implemented; needs hardening).

### Dependencies

- Final brand naming (copy swaps via `brand.ts` and content pass).
- Asset strategy before adding video to the hero or other sections.
- Legal review for privacy and form disclosures.

### Acceptance criteria (not all met today)

- [ ] Homepage visually signed off on desktop, tablet, and mobile (manual QA).
- [ ] GSAP sequence verified: pin/scrub, reduced-motion fallback, no leaked ScrollTriggers on navigation.
- [ ] Core Web Vitals acceptable on `/` with current image set (measure, don’t assume).
- [ ] Consultation sends mail in staging/production with env configured.
- [ ] Rate limiting suitable for chosen host (edge/shared store).
- [ ] Privacy notice legally approved; contact/controller details published.
- [ ] Production email authentication (SPF, DKIM, DMARC) for sender domain.

### Out of scope (Etap 1)

- Product catalog, CMS, admin panel.
- New marketing routes beyond consultation/privacy.
- Rewriting GSAP choreography without explicit approval.

### Decisions before calling Etap 1 “launch-ready”

- Hosting provider and environment strategy.
- Analytics / cookie consent (currently none in privacy draft).
- Final languages/markets.

**Status:** *Substantially implemented; launch checklist incomplete.*

---

## Etap 2 — Future pages skeleton

### Scope

- Information architecture for **Products**, **For Architects** (beyond homepage section), **About**, and **Contact** (if distinct from consultation).
- Next.js routes, shared layouts, navigation updates, SEO metadata stubs.
- Elegant **Coming soon** or minimal placeholder pages where content is not ready—no broken nav.

### Dependencies

- Etap 1 navigation patterns and design tokens.
- Content outline per page (even placeholder).
- Decision: single-page expansion vs. dedicated routes for “Systems” lines.

### Acceptance criteria

- [ ] All primary nav items resolve (page or documented coming-soon).
- [ ] Consistent header/footer; active states where applicable.
- [ ] No regression to homepage motion or layout.
- [ ] `routes` in `brand.ts` extended centrally.

### Out of scope

- Product data model, admin, dynamic CMS.
- Full copywriting and photography production.

### Decisions before start

- URL structure (`/products` vs. `/systems/windows`, etc.).
- Whether “For architects” remains anchor-only or becomes a full page.
- Coming-soon UX pattern (inline message vs. dedicated template).

**Status:** *Not started.*

---

## Etap 3 — Product catalog and admin

### Scope (future)

- Categories, product lists, detail pages with technical specs and media.
- Admin UI for products, images, and editorial content.
- Roles and permissions for staff.

### Dependencies

- Etap 2 IA and design patterns.
- Content model (fields, locales, attachments).
- Backend choice: headless CMS vs. custom DB + admin vs. hybrid.

### Acceptance criteria (high level)

- [ ] Authorized editors can CRUD products without deploys.
- [ ] Public catalog is static or ISR/SSR with acceptable performance.
- [ ] Media pipeline respects `ASSET_GUIDELINES` (originals vs. optimized delivery).

### Out of scope at planning stage

- Implementation of auth, database, or admin UI in this documentation phase.

### Decisions required before implementation

| Topic | Options to evaluate |
| --- | --- |
| Content source | File-based MDX, headless CMS, custom Postgres, etc. |
| Hosting | Same Next app vs. split admin |
| Auth | OAuth, magic link, IdP for staff |
| i18n | Single locale first vs. multi-market |
| Search / filters | Client vs. server, faceted taxonomy |
| Compliance | Technical datasheets, CE/market-specific docs |

**Status:** *Requirements only.*

---

## Etap 4 — Integrations

### Scope (open)

- Social publishing or content automation.
- Architect tools (downloads, spec packs, extranet—TBD).
- CRM/email marketing hooks from consultation submissions.
- Other operational integrations.

### Dependencies

- Etap 3 content model (for automated publishing).
- Vendor choices and API access.

### Acceptance criteria

- Defined per integration once prioritized.

### Out of scope

- Open-ended exploration without business owner.

**Status:** *Backlog / discovery.*

---

## Suggested sequencing

```mermaid
flowchart LR
  E1[Etap 1 QA and launch prep]
  E2[Etap 2 Routes and IA]
  E3[Etap 3 Catalog and admin]
  E4[Etap 4 Integrations]
  E1 --> E2
  E2 --> E3
  E3 --> E4
  E2 -.-> E4
```

Etap 4 items that only touch consultation/CRM could start after Etap 1 if prioritized.
