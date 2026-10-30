# Decision register

Format: **Confirmed** = explicitly decided; **Working assumption** = placeholder until stakeholder sign-off; **Open** = needs input.

---

## Confirmed (in code or repo)

| ID | Decision | Evidence |
| --- | --- | --- |
| D-TECH-01 | Next.js App Router, React 19, TypeScript strict | `package.json`, `src/app/` |
| D-TECH-02 | npm as package manager; scripts for dev/build/lint/typecheck | `package.json` |
| D-TECH-03 | GSAP + ScrollTrigger for homepage signature sequence; ScrollSmoother homepage-only; category pages use `CategoryMotion` without pins | `SignatureSequence.tsx`, `SiteScrollShell.tsx`, `CategoryMotion.tsx` |
| D-IA-01 | Category URLs are `/windows`, `/sliding-doors`, `/entrance-doors`, `/architectural-glazing` | `brand.ts`, App Router pages |
| D-CONTENT-02 | Descriptive family names only; no manufacturer brands as product names | `src/lib/content/categories.ts` |
| D-CONTENT-03 | No invented specs (U-values, sizes, security, acoustics, guarantees) on category pages | `docs/PRODUCT_CATEGORIES.md` |
| D-TECH-04 | Consultation via Server Action + Zod + Resend HTTP API | `actions.ts`, `lib/email/` |
| D-TECH-05 | Source photography lives in `assets/`; imported where used | Component imports |
| D-TECH-06 | Working brand name “Southern Windows” flagged temporary | `brand.ts` |
| D-CONTENT-01 | Homepage states imagery is reference, not portfolio | `HomePage.tsx`, footer |
| D-LEGAL-01 | Privacy page is pre-launch draft | `/privacy` copy |

---

## Working assumptions (not finalized)

| ID | Topic | Assumption |
| --- | --- | --- |
| W-BIZ-01 | Brand | Premium line possibly separate from existing company |
| W-BIZ-02 | Naming | Southern Windows is provisional |
| W-BIZ-03 | Products | Future named products with technical sheets |
| W-BIZ-04 | Contact | Consultation form is primary lead channel for now |
| W-VIS-01 | Art direction | Warm Editorial palette and typography as baseline |

---

## Open questions

| ID | Question | Blocks |
| --- | --- | --- |
| O-BIZ-01 | Final legal entity and brand name on site? | Launch copy, metadata, email sender |
| O-BIZ-02 | Target markets and languages? | i18n, compliance docs |
| O-BIZ-03 | Public phone/email in footer? | `brand.contact` currently null |
| O-TECH-01 | Production host (Vercel, other)? | Rate limiting, env, edge |
| O-TECH-02 | Analytics and cookie consent? | Privacy copy, implementation |
| O-TECH-03 | CRM integration for consultation leads? | Etap 4 vs. manual inbox |
| O-CONTENT-01 | When to use the 4 unused videos on homepage or elsewhere? | Performance budget, hero design |
| O-IA-01 | URL plan for remaining pages (About, For architects, product details)? Category URLs decided in D-IA-01. | Rest of Etap 2 / Etap 3 |
| O-CMS-01 | Headless CMS vs. custom admin vs. files? | Etap 3 |

---

## Future technical decisions (record outcome here when made)

| Topic | Options | Chosen |
| --- | --- | --- |
| Product content storage | MDX / CMS / DB | *TBD* |
| Admin authentication | OAuth / magic link / other | *TBD* |
| Image CDN | Next default / external | *TBD* |
| Video delivery | Self-hosted / Mux / Cloudflare Stream | *TBD* |
| Rate limiting | Upstash / edge middleware / host-native | *TBD* |

---

## Cursor rules (maintenance notes)

| Item | Status |
| --- | --- |
| `project-standard.mdc` | Present; planning-without-implementation + asset protection |
| `gsap-animation.mdc` | Present; animation approval gate + GSAP standards |
| `git-workflow.mdc` | Present locally (ensure tracked when committed) |
| `visual-design.mdc` | Present; **frontmatter has duplicate/conflicting YAML** (`alwaysApply` true and false)—recommend single frontmatter block; not auto-fixed in doc pass |

User referenced `project-standards.mdc`; actual filename is **`project-standard.mdc`**.
