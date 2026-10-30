# Product category pages

Milestone: premium category presentation for four system lines. This is not a product catalogue, CMS, or admin system.

Audit date: 2026-10-30.

## Routes

| Category | Path | Constant |
| --- | --- | --- |
| Windows | `/windows` | `routes.windows` |
| Sliding doors | `/sliding-doors` | `routes.slidingDoors` |
| Entrance doors | `/entrance-doors` | `routes.entranceDoors` |
| Architectural glazing | `/architectural-glazing` | `routes.architecturalGlazing` |

Homepage `#systems` rows are the only homepage change: each row links to the matching route. Header “Systems” still goes to `/#systems`. Footer is unchanged. Direct URL, refresh, and back/forward are App Router static pages.

## Naming convention (temporary)

- Use **descriptive family names** (Aluminium Casement Windows, Pocket / Galandage Systems, and so on).
- Do **not** publish manufacturer names as product brands (Schüco, Cortizo, Reynaers, Weeeze, Corvision, Adeco, and similar).
- Do **not** invent proprietary house names. Final naming remains open (`W-BIZ-03`).
- Do **not** invent thermal values, dimensions, security classes, acoustic ratings, glass build-ups, or guarantees.

Copy lives in [`src/lib/content/categories.ts`](../src/lib/content/categories.ts). Optional `detailHref` on a family is unset: family blocks are in-page articles (`id` on the article), not dead product-detail links.

## Source references

Editorial outlines are grounded in Southern Windows hub pages, used as product reference only—not copied as the new brand experience.

| Category | Primary source |
| --- | --- |
| Windows | https://southernwindows.co.uk/windows/ |
| Sliding doors | https://southernwindows.co.uk/doors/sliding-doors/ |
| Entrance doors | https://southernwindows.co.uk/doors/residential-doors/ |
| Architectural glazing | https://southernwindows.co.uk/bespoke-glazing/ (roofs: https://southernwindows.co.uk/glass-roofs/) |

## Product families

### Windows

| Family | Status |
| --- | --- |
| Aluminium Casement Windows | Confirmed |
| Timber Casement Windows | Confirmed |
| Tilt & Turn Windows | Confirmed |
| Hidden Sash Windows | Confirmed only as a tilt-and-turn that reads as a fixed light |
| Timber Sash Windows | Confirmed |

Do not state timber casement opening direction. Do not treat hidden sash as a non-tilt product.

### Sliding doors

| Family | Status |
| --- | --- |
| Slimline Sliding Doors | Confirmed as a shared description, not one catalogue line |
| Lift & Slide Systems | Confirmed for the range, not every system |
| Large Panoramic Sliding Doors | Confirmed as a description |
| Minimal Interlock Systems | Framing approach; no millimetre claims |
| Pocket / Galandage Systems | Confirmed |
| Open Corner Configurations | Confirmed |

Lift-and-slide, pocket, and open corner are configuration choices, not promises of every opening.

### Entrance doors

One aluminium entrance door, presented as chapters of a composition—not six separate models.

| Chapter | Status |
| --- | --- |
| Contemporary Aluminium Entrance Doors | Confirmed |
| Panelled Entrance Doors | Leaf option |
| Glazed Entrance Doors | Leaf option |
| Bespoke Door Designs | Design process |
| Custom Handles and Finishes | Hardware options |
| Different Colours and Surface Treatments | Surface options |

No side-light / fanlight / pair layouts until configurations are confirmed. No timber or steel entrance doors from this hub.

### Architectural glazing

| Family | Status |
| --- | --- |
| Structural Glass Walls | Confirmed |
| Frameless Structural Glazing | Confirmed |
| Oversized Glass Units | Confirmed, no published size |
| Glass Roofs and Rooflights | Confirmed |
| Walk-on Glass | Confirmed, no published load |
| Oriel / Glass Box Windows | Confirmed |

Spans, thicknesses, and loads stay with engineering review.

## Page structure

Shared shell: [`CategoryPage`](../src/components/categories/CategoryPage.tsx), art-directed per `data-category`.

1. **Hero** — ink band, serif title, lede, designed media slot (nested frame / panorama / door leaf / glass joint).
2. **Editorial introduction** — why the category belongs to the architecture.
3. **Product family presentation** — numbered editorial index (windows), alternating bands (sliding), composition chapters (entrance), stacked propositions (glazing).
4. **Design and technical details** — qualitative notes only, plus a technical note that values are confirmed per system and market.
5. **Architectural inspiration** — one visual study or a constructed figure; captioned as reference, not a completed project.
6. **CTA** — existing `/consultation`. The form has no interest field.
7. **Related categories** — the other three routes and `/#systems`.

## Placeholder image strategy

[`CategoryMedia`](../src/components/categories/CategoryMedia.tsx) keeps a stable aspect ratio (`frame`, `panorama`, `door`, `glass`).

- **Default:** CSS/SVG figure (hairline diagrams on mineral plaster or ink). Replace later by passing `image` into the same component—no layout rewrite.
- **Product families:** placeholders only.
- **Inspiration (optional, inspected unused JPEGs):**
  - Windows: `assets/bundo-kim-MmagnTelMyo-unsplash.jpg`
  - Sliding doors: `assets/zhisheng-deng-W8FPl06Q4F4-unsplash.jpg`
  - Architectural glazing: `assets/naomi-august-a14NxeTfMXE-unsplash.jpg`
  - Entrance doors: constructed door figure (no unused photograph fitted the brief)
- Do not reuse the seven homepage images. Do not import the ~13 MB `heng-chiu` file or any MP4. Do not use external placeholder services.

## Content model (ready for later detail pages)

Each family:

- `id` — stable slug, e.g. `timber-sash`
- `title` — descriptive name
- `summary` — material and purpose
- `characteristics[]` — qualitative labels
- `configurations[]` — openings and layouts, no numbers
- `detailHref?` — reserved; unset until a real detail route exists

A future `/windows/timber-sash` (or similar) can set `detailHref` without changing the category layout.

## Confirmed versus open

**Confirmed in this milestone**

- Four routes and homepage system-row links.
- Descriptive family lists above.
- No manufacturer branding on the new pages.
- Consultation remains the lead capture destination.

**Open**

- Proprietary product names.
- Which current supplier systems sit behind each family.
- Technical catalogue (U-values, sizes, security, acoustics, guarantees).
- Hidden-sash specification conflict on the source page.
- Entrance side lights, pairs, and fanlights.
- Whether French doors, heritage doors, or other ranges enter these pages.
- Approved product photography library.
- Admin / CMS for this content (`O-CMS-01`).

## Implementation notes

- Typed content: `src/lib/content/categories.ts`, re-exported from `src/lib/content/index.ts`.
- Motion: `CategoryMotion` (client, `useGSAP`, `matchMedia`, `prefers-reduced-motion`). No pins, no ScrollSmoother, no `data-speed`. Homepage GSAP is unchanged.
- First band is ink so the absolute warm-paper header stays readable.
