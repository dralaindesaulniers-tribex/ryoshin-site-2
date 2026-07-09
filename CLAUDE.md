# RYŌSHIN Solutions — Build Rules

Re-read RYOSHIN_BUILD_SPEC.md section relevant to the current task before each work session.

## Design tokens (LOCKED — spec 2.1)

```
--ink:        #101112   /* deep charcoal, page base for dark sections */
--ink-soft:   #1A1B1D   /* raised surfaces on dark */
--paper:      #F4F1EA   /* warm off-white, light section base */
--paper-soft: #EDEAE4   /* cards on light */
--shu:        #C43A2F   /* vermilion. THE brand accent. Used with intent, not sprinkled */
--shu-deep:   #9E2B25   /* hover/pressed states */
--gold:       #D9A441   /* rare secondary accent, small doses only */
--indigo:     #6B87A8   /* network + data viz only, never UI chrome */
--sage:       #7FA08C   /* network only */
--line:       rgba(16,17,18,0.12) on light / rgba(244,241,234,0.14) on dark
```

Vermilion appears at most once per viewport as a focal point. No arbitrary Tailwind values outside these tokens.

## Typography (spec 2.2)

- Display: **Zodiak** (self-hosted, app/fonts). NOT Playfair unless licensing fails.
- Body/UI: **General Sans** (self-hosted). **NEVER Inter** — Inter is the "Claude designed this" tell.
- Japanese kanji: **Noto Serif JP** 300–400 via next/font/google.
- Body minimum 17px mobile / 18px desktop. When in doubt, bigger (Ryan flagged small text site-wide).
- Display headlines: clamp(2.6rem, 7vw, 6rem), leading 1.05, tracking -0.02em.
- Eyebrows: 12–13px uppercase, tracking 0.18em, vermilion on light / paper 60% on dark.

## Voice rules (spec 12) — apply to ALL user-facing copy

- **No em dashes. Ever.** Use commas, periods, or restructure. (grep-verify before deploy)
- Short paragraphs. Sentences a human would say out loud.
- Banned words: "delve", "elevate", "seamless", "cutting-edge", "in today's world", "unlock". ("empower" allowed only because Ryan's draft uses it.)
- Warm, direct, quietly confident. Trusted advisor, not pitch deck.
- Vermilion words in headlines: max one phrase per page.
- Copy lives ONLY in content/*.ts. Missing copy = `[INTERVIEW RYAN]` or `[COPY TBD]`, never invented facts.

## Anti-template checklist (spec 2.5 — verify before every deploy)

- [ ] No Inter, no default Tailwind blue/purple, no glassmorphism cards
- [ ] No centered-everything symmetry on every section
- [ ] No em dashes in rendered copy (`grep -rn "—" app/ content/ components/`)
- [ ] At least one intentional grid-break per page
- [ ] Vermilion used max once per viewport
- [ ] Fonts loaded, no fallback flash

## Performance budgets (spec 7.4 / 10)

- Network chunk lazy-loaded, < 250KB gzipped incl. three.js
- Lighthouse mobile: Perf ≥ 85 (network ON), A11y ≥ 95, SEO ≥ 95
- LCP < 2.0s Fast 4G, CLS < 0.02
- prefers-reduced-motion: all motion collapses to simple fades. Non-negotiable.

## Changelog rule

At the end of any work session where you changed code, append a dated entry to `CHANGELOG.md` (repo root) summarizing what changed. Newest entries go at the top, grouped under a `## YYYY-MM-DD` heading (use today's date). Keep entries short, one bullet per meaningful change, plain language. No entry needed for sessions that only read or discussed code.

## Assets

Missing (render styled placeholder + `TODO-ASSET` comment): RYŌSHIN SVG logo (using 1600px PNGs), Penticton Indian Band, Tribe Rocks, Eitree, Mobius Systems logos.

Confirm with Ryan before ship: 5+ vs 20+ years stat, final hero copy (brother review), native-speaker sign-off on Japanese lesson block.
