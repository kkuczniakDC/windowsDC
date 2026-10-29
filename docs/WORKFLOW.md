# AI-assisted workflow (Cursor)

This document complements `.cursor/rules/`—rules apply automatically in the IDE; this file explains **how we work together** on this repository.

## Modes of conversation

| Mode | User intent | Agent behavior |
| --- | --- | --- |
| **Discussion / planning** | Ideas, IA, copy direction, trade-offs | No file edits, no installs, no codegen until explicitly asked |
| **Documentation** | Audits, specs, roadmaps | Edit docs only unless scope includes code |
| **Implementation** | “Build X”, “Fix Y” | Small, verified steps; respect animation approval |
| **Refactoring** | Structural cleanup | Requires clear scope; never bundled with unrelated features |

If you are exploring Etap 2+ features, treat replies as planning until you authorize implementation.

## Standard delivery loop

1. **Analyze the task** — Read rules, git status, relevant code; do not assume stack or completion.
2. **Plan before large changes** — Scope, acceptance criteria, files touched; ask when brand or architecture decisions block progress.
3. **Implement in small steps** — One logical change at a time; reuse tokens, components, and patterns.
4. **Verify** — Run `npm run typecheck`, `npm run lint`, and `npm run build` when code changed; use browser tools for visual/motion when available.
5. **Quality** — No test suite today; manual checks for forms, keyboard nav, and responsive layouts when UI changes.
6. **Review diffs** — Ensure no stray assets, secrets, or animation changes outside approval.
7. **Commit locally** — Conventional Commits; one coherent change per commit; **never `git push`** (user publishes remotes).
8. **Report** — Files changed, checks run, known issues, remaining working tree.

## Project-specific guardrails

- **`assets/` is read-only** unless you explicitly approve moves, renames, or overwrites.
- **GSAP / motion** — Propose changes; wait for approval before editing timelines, ScrollTrigger, or motion CSS (see `gsap-animation.mdc`).
- **Homepage** — Treat as production creative work; avoid drive-by redesigns.
- **Dependencies** — No new packages without stated reason.
- **Git** — See `git-workflow.mdc` for commit hygiene and safety.

## Animation change protocol

1. Describe intended motion difference (timing, trigger, fallback).
2. Wait for explicit “yes” / approved direction.
3. Implement scoped to the agreed component.
4. Verify in browser including reduced motion and route leave/unmount.

## Documentation maintenance

When behavior changes:

- Update `CURRENT_STATE.md` for factual implementation changes.
- Update `ROADMAP.md` acceptance checkboxes when milestones complete.
- Log decisions in `DECISIONS.md` when confirmed.
- Keep `README.md` entry point accurate for scripts and env vars.

## What “done” means for a task

- Matches stated acceptance criteria.
- Relevant checks executed and reported honestly.
- Unrelated user changes left untouched.
- No scope creep into the next roadmap etap unless agreed.
