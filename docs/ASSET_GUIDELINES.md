# Asset guidelines

## Principles

1. **`assets/` holds source masters** — treat as read-only unless the project owner approves renames, moves, or overwrites.
2. **Do not serve raw masters blindly** — the app should use optimized delivery paths (Next Image for photos; transcoded video when introduced).
3. **Separate “in repo” from “on the wire”** — large files may live in git for production art direction while users download smaller derivatives.

## Current inventory (2026-10-29)

### In use (7 images)

See `docs/CURRENT_STATE.md` for the mapping to homepage sections. Next.js generates responsive WebP/AVIF-style output at runtime/build when using `next/image`.

### Unused JPEGs (19 files)

Available for future sections or product pages. Notable large sources (optimize before first import if possible):

| File | ~Size |
| --- | --- |
| `heng-chiu-O0-nO2ipXAg-unsplash.jpg` | 13.4 MB |
| `im3rd-media-f888opoBHUo-unsplash.jpg` | 5.7 MB |
| `maxim-scheglov-TMauUlE9PxE-unsplash.jpg` | 5.7 MB (also used in one section) |
| `de-vontez-cox-obHGJUwzJsA-unsplash.jpg` | 4.9 MB (used in sequence) |
| `ben-ashby-0jUEk_11na8-unsplash.jpg` | 4.3 MB (used in sequence) |

Even “used” images are multi-MB sources; Next mitigates **transfer** size but editors should still prefer reasonable master dimensions.

### Unused video (4 files)

| File | ~Size | Notes |
| --- | --- | --- |
| `living-room-with-light-streaming-in-through-the-window-uhd_3840_2160_30fps.mp4` | **32.7 MB** | UHD 3840×2160 — highest priority for transcoding before any embed |
| `woman-pulls-back-curtains-revealing-a-window-uhd_2160_3840_30fps.mp4` | 18.2 MB | Portrait UHD |
| `woman-pulls-back-curtains-and-looking-out-the-window-in-the-morning-uhd_2560_1080_25fps.mp4` | 10.5 MB | Cinematic wide |
| `flowers-on-which-light-from-the-window-falls-hd_1080_1920_30fps.mp4` | 5.3 MB | Vertical HD |

**None are referenced in application code today** — no immediate performance impact on `/`, but they are part of the creative inventory.

## Recommended folder strategy (future)

Without moving files yet, consider a logical convention:

```
assets/
  masters/          # untouched originals (git LFS optional)
  optimized/        # build inputs — compressed JPEG/WebP, transcoded MP4/WebM
  posters/          # video poster frames (JPEG/WebP)
```

Any reorganization requires explicit approval per project rules.

## Image optimization

**When adding to UI:**

- Prefer width appropriate to max display size (e.g. hero ~2400px wide, not 6000px).
- Use `next/image` with accurate `sizes` (already done on homepage).
- Consider AVIF/WebP exports in `optimized/` for manual static use if bypassing `next/image`.
- Keep alt text descriptive; decorative video backgrounds need `aria-hidden` and text alternatives elsewhere.

## Video optimization (when implementing)

For the ~33 MB living-room clip and similar:

1. **Transcode ladder** — e.g. 1080p H.264 MP4 (~4–8 Mbps target) + optional 720p for mobile; add **WebM/AV1** if browser support matrix allows.
2. **Mobile-specific asset** — shorter loop or lower resolution for `(max-width: 767px)` via `<source media="...">`.
3. **Poster image** — first-frame or art-directed still in `posters/`; `poster=""` on `<video>` for LCP and autoplay policies.
4. **Loading** — avoid eager load of hero video on mobile data; use `preload="none"` or `metadata` until in view; consider intersection observer.
5. **Autoplay rules** — `muted`, `playsInline`, `loop` for ambient loops; provide reduced-motion static poster fallback.
6. **Hosting** — for very large files, consider streaming CDN (Mux, Cloudflare Stream) instead of bundling through Next static.

**Do not** commit multi-megabyte transcoded files without team agreement on git/LFS policy.

## Lazy loading

- Below-the-fold images: default lazy loading via `next/image` (non-priority).
- Hero: current implementation uses `fetchPriority="high"` and eager load—correct for LCP image.
- Video: when added, do not mirror hero image eager strategy unless measured LCP wins.

## Protecting originals

- Never overwrite masters in place; export new files alongside.
- Document which optimized file corresponds to which master (filename prefix or manifest JSON later).
- License/attribution for Unsplash and stock-like names: verify commercial use terms before launch (open compliance task).

## Performance checklist before launch (media)

- [ ] Inventory every import from `assets/` in production bundle analysis.
- [ ] Measure `/` with throttled mobile network after any video goes live.
- [ ] Confirm unused 30+ MB files are not accidentally imported or copied to `public/`.
