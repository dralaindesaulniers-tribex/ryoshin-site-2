# RYOSHIN_BUILD_SPEC.md
## RYŌSHIN Solutions — Award-Caliber Site Rebuild
### Claude Code Handoff — v1.0 — July 2026

---

## 0. MISSION

Rebuild ryoshin.solutions as an Awwwards-caliber site. The bar: a visitor should assume this cost $25,000 and was made by a boutique studio in Tokyo or Copenhagen. Zero "AI-made template" tells. Every Ryan feedback item in Section 8 is a hard requirement, not a suggestion.

Two non-negotiable constraints that shape everything:

1. **One complete build.** Everything ships together: the full site, the GSAP motion system, the half-sun scroll motif, AND the WebGL neural network. No deferred phases. The network is still built as a lazy-loaded, feature-flagged component (`NEXT_PUBLIC_NETWORK=on`, default ON) purely as an engineering safety valve, so that if a device or browser problem surfaces at the last minute it can be toggled without a rebuild. It is part of this build, not a future one.
2. **No AI-slop.** No em dashes anywhere in site copy. No "In today's fast-paced world." No generic gradient-purple SaaS aesthetic. Short sentences. Human voice. If copy sounds like a language model wrote it, rewrite it.

---

## 1. STACK

- **Next.js 15** (App Router, static export where possible) on **Vercel**
- **Tailwind CSS** with locked design tokens (Section 2). No arbitrary values outside tokens.
- **GSAP + ScrollTrigger** for scroll choreography
- **Lenis** for smooth scrolling (desktop only; native scroll on touch)
- **React Three Fiber + drei** for the Phase 2 neural network (lazy-loaded, code-split, zero bytes shipped in Phase 1)
- **next/font** for self-hosted fonts. No FOUT, no layout shift.

Repo hygiene: create `CLAUDE.md` at root with these rules (tokens, no em dashes, performance budgets) so they persist across sessions. Use `/compact` proactively around 60% context.

---

## 2. DESIGN SYSTEM (LOCKED)

### 2.1 Color tokens
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
Rule: vermilion appears at most once per viewport as a focal point (CTA, stat, graphic). Restraint is what makes it hit.

### 2.2 Typography
- **Display:** a high-contrast serif with presence. First choice: **Zodiak** or **Gambetta** (Fontshare, free for commercial). Fallback: Playfair Display only if the others fail licensing review. This is the single biggest "not-a-template" signal, so choose deliberately and confirm with Alain before locking.
- **Body/UI:** **General Sans** or **Switzer** (Fontshare). NOT Inter. Inter is the "Claude designed this" tell.
- **Japanese:** **Noto Serif JP** for kanji (良心 / 両親), weight 300-400.
- Scale: fluid clamp() scale, generous. Body minimum 17px mobile / 18px desktop. Ryan flagged text as too small SITE-WIDE. When in doubt, bigger.
- Display headlines: clamp(2.6rem, 7vw, 6rem), tight leading (1.05), letter-spacing -0.02em.
- Eyebrow labels: 12-13px, uppercase, letter-spacing 0.18em, vermilion on light / paper 60% on dark.

### 2.3 Spatial rules
- Section padding: clamp(96px, 14vh, 180px) vertical. Let it breathe. Cramped = template.
- Max content width: 1200px, but let display type and graphics break the grid intentionally.
- 12-col grid, asymmetric layouts. Never three-equal-cards-in-a-row without an offset or size hierarchy.
- Border radius: 2px on buttons/inputs (sharp, editorial), 0 on images unless framed (Section 8, photo treatment).

### 2.4 Motion language (GSAP)
Signature moves, used consistently:
- **Reveal:** headlines split by line (SplitText or manual spans), lines rise 100% with 0.08s stagger, power4.out, 1.1s, triggered at 75% viewport.
- **Images:** clip-path inset reveal (inset(100% 0 0 0) → inset(0)), 1.2s, with subtle 1.06 → 1.0 scale.
- **Parallax:** background elements drift at 0.85-0.92 scroll speed. Subtle. If you notice it consciously, it's too much.
- **Half sun (Section 6):** the hero background motif, scroll-driven.
- **Hover:** links get an underline that draws in from left (transform scaleX, 0.35s). Buttons shift bg to --shu-deep with 2px translate-y press feel.
- `prefers-reduced-motion`: all of the above collapse to simple fades. Non-negotiable.
- Lenis + ScrollTrigger properly synced (`lenis.on('scroll', ScrollTrigger.update)`).

### 2.5 Anti-template checklist (verify before every deploy)
- [ ] No Inter, no default Tailwind blue/purple, no glassmorphism cards
- [ ] No centered-everything symmetry on every section
- [ ] No em dashes in rendered copy (grep the build output: `grep -r "—" .next/ src/`)
- [ ] At least one intentional grid-break per page
- [ ] Vermilion used max once per viewport
- [ ] Fonts loaded, no fallback flash

---

## 3. OPERATING INSTRUCTIONS FOR THE EXECUTING AGENT

You are the build agent for this project. Regardless of which model you are, you will operate exactly as follows. These rules override your default tendencies. They exist because this build has a high quality bar and a real client. Follow them literally.

### 3.1 Before writing any code
1. Read this ENTIRE spec top to bottom before your first action. Do not skim. Do not start building after reading only Section 1.
2. Verify every asset in Section 11 exists in the repo. If any asset is missing, STOP and list what is missing. Never substitute a placeholder image, an invented logo, or a stock photo for a missing asset without marking it `TODO-ASSET` in code AND telling Alain in your summary.
3. Create `CLAUDE.md` in the repo root containing: the design tokens (Section 2.1), the typography rules (2.2), the voice rules (Section 12), the anti-template checklist (2.5), and the sentence "Re-read RYOSHIN_BUILD_SPEC.md section relevant to the current task before each work session."

### 3.2 While building
4. Follow the build order in Section 9 EXACTLY. Do not reorder, merge, or skip steps. Do not build ahead.
5. After completing each build-order step, run its verification before moving on: does it render, does it match the spec section, does it pass the anti-template checklist, is it responsive at 375px / 768px / 1440px. Fix failures immediately. Never carry a known failure forward.
6. Work in small commits, one per build-order step minimum, with messages like `step-3: homepage hero + trusted-by`.
7. Copy comes ONLY from `content/*.ts`, and `content/*.ts` comes ONLY from this spec. If the spec does not provide copy for something, write `[INTERVIEW RYAN]` or `[COPY TBD]` as the value. NEVER invent business facts, client names, stats, testimonials, or Japanese translations beyond what Sections 5 and 8 provide.
8. If you are uncertain how something should look or behave and the spec does not answer it, choose the more RESTRAINED option (less motion, fewer colors, more whitespace) and note the decision in your summary. Do not ask Alain about aesthetics mid-build; do ask about missing assets or contradictions.
9. Never remove or "simplify away" a spec requirement because it is difficult. The network, the half sun, the split-line reveals, and the photo treatment are all mandatory. If something is genuinely blocked, say so explicitly; do not silently ship a reduced version.
10. Manage your context: after each major step, if context is above ~60%, compact/summarize before continuing. When resuming, re-read the spec sections for the current step first.

### 3.3 Definition of done
11. A step is done when its code exists, renders correctly at all three breakpoints, passes the checklists that apply to it, and is committed. The PROJECT is done only when every Section 10 gate passes and every Section 8 checkbox is checked, with the checklist reproduced in your final summary.
12. Your final summary to Alain must contain: what shipped, every TODO/flag remaining, the Section 8 punch list with checkmarks, gate results with numbers (Lighthouse scores, chunk sizes), and anything you deviated on with reasons.

---

## 3B. BUILD SCOPE

Everything in this spec ships in ONE build: full site (Home + About + reflowed existing pages), complete GSAP motion system, half-sun scroll motif, the R3F neural network (Section 7), and the chat input as a styled placeholder.

The only deferred item is LIVE chat functionality (Claude API wiring). The input ships exactly as designed with `AI-POWERED GUIDANCE · COMING SOON` microcopy so the layout never shifts when it goes live later.

---

## 4. SITE STRUCTURE

```
/                 Homepage
/about            About Us (Ryan's feedback page)
/services         (existing content, reflow into new system)
/work             (client/partner showcase, feeds the network nodes)
/contact          (or anchor section, keep whatever exists)
```

---

## 5. HOMEPAGE SPEC

### 5.1 Hero (dark, --ink)
- Headline (display serif, two lines, line-split reveal):
  Line 1: `Whole-hearted Solutions.` (per Ryan; "Solutions." in vermilion)
  Line 2: `Real-World Results.` (paper, 55% opacity)
- Subhead (Ryan's wording, dash removed, lightly tightened):
  `Empowering organizations with business and technology strategies that simplify challenges and amplify your positive impact. Ultimately, we help you solve your own problems.`
  NOTE: Ryan says copy is interim until his brother reviews. Build so copy swaps are trivial (single content file: `content/site.ts`).
- Chat input, placeholder: `How may we be of service?` with vermilion send icon and breathing dot. Microcopy below: `AI-POWERED GUIDANCE · COMING SOON`.
- Background: the R3F neural network (Section 7) as the hero's living background, with the half-sun scroll motif (Section 6) taking over as the background motif on scroll past the hero and across the About page.

### 5.2 Trusted By strip (light, --paper)
- Label `TRUSTED BY` centered (Ryan).
- Logos in FULL COLOR (Ryan), not grayscale: FM, Backpack Buddies, Hitachi Solutions, Apple, Nikkei National Museum & Cultural Centre, Google, Penticton Indian Band, TribeX.
- Logos larger than current, vertically centered, generous gaps, subtle stagger-fade on scroll. Marquee ONLY if it's slow and pauses on hover; static centered row is safer and classier.

### 5.3 Partners & Clients (NEW section, Ryan priority: "front and center")
- Eyebrow: `PARTNERS & CLIENTS`
- Display headline, e.g. `Good company, kept.` (flag for copy review)
- Two-tier layout with clear hierarchy:
  - **Partners** (bigger cards/marks): Tribe Rocks, Eitree, Mobius Systems
  - **Recent clients**: NNMCC, Nikkei Place Seniors Home, Nikkei Place Foundation, Japanese Canadian Hastings Park Interpretive Centre, Penticton Indian Band
- This section is the 2D "powerful first impression" Ryan asked for. These same entities are the large named nodes in the hero network, so define them once in `content/network.ts` and render both views from the same data.

### 5.4 For Organizations / For Individuals (light)
- Font size UP (Ryan). Two columns, asymmetric (7/5 split), not twin cards.
- For Organizations: `We partner with businesses, cultural institutions, and government agencies on strategic planning, technology integration, and the kind of change management that actually sticks.` (em-dash clause removed per Ryan)
- For Individuals (reworked from Ryan's draft, no dash):
  `We work with founders, executives, and changemakers who want more than a roadmap. They want a trusted, values-aligned, give-a-damn partner who can clarify their vision, sharpen their strategy, and make it happen.`
  ALT (Ryan's spicier voice, his call): swap final clause to `...and make shit happen.` Ship the safe version, put the alt in a code comment.

### 5.5 Stats band (dark)
- Numbers in vermilion display serif, labels in paper 65%.
- CONTENT FLAG: Ryan wrote `5+ years of experience` against the current `20+`. Interpretation: RYŌSHIN the firm is 5+ years old while Ryan personally has 20+ years. CONFIRM WITH RYAN before shipping. Suggested set:
  - `$100M+` Projects led (incl. two airport developments with SNC-Lavalin)
  - `100+` Projects delivered across industries
  - `30+` Communities and organizations positively impacted
  - `5,000+` Professionals, leaders, and innovators connected
- Ryan wants dollar figures and keyword-rich descriptors (airports, data centers, national consortiums). Include `data centers` and `Malta Cruise Network` in supporting copy on /about or /work for SEO.

### 5.6 Testimonials
- Build the component now with the two existing quotes (Jim C., Henry Wakabayashi).
- Leave five empty slots wired for: Karah (NNMCC), Yvonne (Seniors Home), Keiko (NPF), Sherri (NNMCC), Chief Chad (PIB). Collection is a human task, not a build task.

### 5.7 AI Projects section (NEW, dark)
- Eyebrow: `APPLIED AI`
- Content placeholders for: 2 AI prototypes at NNMCC, AI policy and standards work. Ryan wants help pulling this out of himself. Build the section with placeholder copy clearly marked `[INTERVIEW RYAN]` in the content file so it can't accidentally ship as lorem.

### 5.8 Footer CTA (light)
- `Ready to Start?` perfectly centered (Ryan).
- Secondary line `Let's Build Something Worth Building` flagged as awkward but acceptable. Ship it; add TODO for copywriter pass.
- Logo in footer significantly larger (Ryan), aligned to grid.

---

## 6. THE HALF SUN — SIGNATURE SCROLL MOTIF (Phase 1)

Ryan's direct request: the half red sun rises and sets as the user scrolls, like the effect in Alain's 360/speaking videos.

Implementation:
- A single SVG/div semicircle (--shu, slight radial glow, blur(60px) duplicate behind it at 30% opacity for atmosphere).
- Fixed-position background layer, z-index behind content, `pointer-events: none`.
- GSAP ScrollTrigger scrubbed to page progress:
  - Page top: sun half-risen behind the hero headline (peeking over an implied horizon line)
  - Mid-page (dark sections): sun fully risen, smaller, higher, dimmer (10-14% opacity so text always wins)
  - Page bottom (footer): sun sets back below the horizon
- On light sections it renders at very low opacity (4-6%) as a warm blush, never competing with text.
- Mobile: same effect, simplified (two keyframe positions, no scrub jank; use `scrub: 0.5` smoothing).
- This motif also solves the About page requirement (Section 8): the static half sun graphic moves from inline element to this scroll-driven background layer.

---

## 7. THE NETWORK (R3F) — SHIPS IN THIS BUILD

Evolves the approved 2D canvas prototype (`ryoshin-network-background.html`, keep in repo at `/reference`) into an explorable 3D scene. Everything Alain approved carries over:

### 7.1 Visual spec (from approved prototype)
- Deep charcoal void. Nodes in paper, vermilion, gold, indigo, sage. Soft glow halos on all nodes.
- Center: the RYŌSHIN core. Glowing vermilion orb, hot white-red heart, large breathing aura, and the slowly rotating vermilion half-ring around it (one rotation ≈ 50s).
- Slow pulses of light traveling along edges (the "information transfer"). Most paper-white, some vermilion/gold/indigo. Calm rhythm, never busy.
- Density biased toward center, thinning outward.
- Category labels (Strategy, Technology, Community, People, Ideas, Projects, Places) only OUTSIDE the center zone. Nothing crowds the core.

### 7.2 Ryan's evolution: prominent named nodes
- Partners (Tribe Rocks, Eitree, Mobius Systems) render as LARGE named nodes on the first ring around the core.
- Key clients (NNMCC, Nikkei Place Seniors Home, NPF, Hastings Park Interpretive Centre, PIB) as medium named nodes on the second ring.
- Anonymous small nodes fill out the field.
- Data source: `content/network.ts` (shared with the 2D Partners section, single source of truth).

### 7.3 Explorability (desktop)
- Idle: slow drift, gentle camera float (±2°), pulses firing. Beautiful screensaver.
- Hover a named node: it brightens, its edges to the core light up, name label sharpens.
- Click: camera eases toward it (GSAP-driven camera), small info card fades in (name, one line, link to /work anchor). Click-away eases back.
- Mobile: NO interaction, reduced node count (~60%), pixel ratio capped at 1.5, pause via IntersectionObserver + `document.visibilitychange`. If device is low-end (navigator.hardwareConcurrency <= 4), fall back to the 2D canvas version.

### 7.4 Performance gates (hard)
- Network chunk lazy-loaded, < 250KB gzipped total including three.js (use selective imports).
- 60fps desktop / 30fps+ mobile mid-range. Instanced meshes for nodes, single BufferGeometry line pass for edges, no per-node draw calls.
- Zero impact on LCP: the hero renders instantly with the charcoal background and headline; the network component mounts after `requestIdleCallback` post-hydration and fades in over 1.5s. The page must look intentional in the moment before the network appears.

---

## 8. RYAN'S FEEDBACK — COMPLETE PUNCH LIST (all hard requirements)

### Global
- [ ] Increase overall font size site-wide
- [ ] Enlarge logo significantly in nav AND footer
- [ ] Fix alignment inconsistencies and odd color variations everywhere
- [ ] Remove ALL em dashes from copy (grep-verify)
- [ ] Copy marked interim; structure content in `content/*.ts` for easy copywriter pass

### Homepage
- [ ] Hero headline → `Whole-hearted Solutions.` / `Real-World Results.`
- [ ] New subhead (Section 5.1 wording)
- [ ] Chat placeholder → `How may we be of service?`
- [ ] Trusted By: full-color logos, label centered, logos bigger
- [ ] NEW Partners & Clients section, front and center (Section 5.3)
- [ ] For Organizations copy: em-dash clause removed
- [ ] For Individuals copy: reworked (Section 5.4)
- [ ] Stats: confirm 5+ vs 20+ with Ryan; add $ figures and keyword descriptors
- [ ] Testimonial slots wired for the five named clients
- [ ] AI Projects section scaffolded with [INTERVIEW RYAN] placeholders

### About Us page
- [ ] `About Us` heading centered, alignment fixed
- [ ] Headline split to two lines with visual space:
      `Our work begins and ends with people.`
      `Technology is just the bridge.`
- [ ] Search/chat placeholder → `How may we be of service`
- [ ] `Who We Are` + `Built on Trust` text block alignment corrected
- [ ] RYŌSHIN dual-meaning block rebuilt as a mini Japanese lesson (Section 8.1)
- [ ] Add job title `Co-pilot` to profile section
- [ ] CTA text: `Work with Ryan` → `Work with Ryōshin`
- [ ] Ryan's photo: depth treatment. Spec: subtle vermilion offset frame (4px border shifted 12px down-right), grayscale-to-color on scroll reveal, slight parallax within a clipped frame. NOT flat.
- [ ] Static half sun graphic REMOVED from inline position; replaced by the scroll-driven background motif (Section 6)
- [ ] `What Guides Us` heading centered, font size up; three columns keep copy, dashes stripped
- [ ] Footer: `Ready to Start?` centered; `Wholehearted Solutions` block logo enlarged + aligned

### 8.1 The RYŌSHIN Japanese lesson block
Ryan: Japanese partners will read this. It must be precise AND teach. Format each entry as: characters → reading → literal meaning → what it means to us.

```
良心   りょうしん · ryōshin (say it: ryoh-sheen)
       Conscience. Literally "good heart."
       Solutions rooted in integrity and a moral compass. We ask
       whether we are solving the right problems, in the right way.

両親   りょうしん · ryōshin (same sound, different characters)
       Parents.
       A reminder that our work is about family, community, and the
       future. Every decision should be one we would be proud to
       pass forward.
```
- Kanji set in Noto Serif JP, large, vermilion at low opacity as backdrop art + sharp in the definition block.
- MANDATORY: flag for native-speaker review before launch (Ryan has Japanese partners who can verify). Do not ship without sign-off note in PR description.
- Tagline usage note: `Strategy, technology, and community, connected by good heart.` (comma, not em dash) or split into two sentences.

---

## 9. BUILD ORDER

1. Scaffold: Next.js 15 + Tailwind tokens + fonts + `CLAUDE.md` + `content/*.ts` files (incl. `content/network.ts`)
2. Layout shell: nav (big logo), footer (big logo), Lenis, base motion utilities
3. Homepage sections top to bottom, static first, content wired from `content/site.ts` (hero background = plain charcoal for now)
4. About page, all punch-list fixes, static first
5. GSAP pass: line-split reveals, image clip reveals, parallax, hovers, the half-sun scroll motif on both pages
6. R3F network: build the component against the approved 2D prototype (`/reference/ryoshin-network-background.html`), named nodes from `content/network.ts`, hover/click exploration, mobile fallback rules (7.3), mount it into the hero
7. Mobile polish pass on REAL devices (iPhone Safari mandatory; this is where GSAP/Lenis/WebGL break). Verify network fallback triggers correctly on low-end profile.
8. Performance + a11y gates (Section 10), fix until green
9. Deploy to Vercel preview → walk every page at 375/768/1440 → production

Verification between every step. Do not proceed past a failing step. Chat API wiring is explicitly OUT of this build (placeholder only).

---

## 10. GATES (run before any deploy)

- [ ] Lighthouse mobile: Performance ≥ 85 with the network ON, A11y ≥ 95, SEO ≥ 95. If performance is below 85, optimize the network (node count, DPR cap, instancing) before touching anything else; do not disable it to pass.
- [ ] LCP < 2.0s on Fast 4G, CLS < 0.02
- [ ] `grep -rn "—" src/ content/` returns ZERO hits in user-facing copy
- [ ] All fonts self-hosted, `font-display: swap`, no CLS from font load
- [ ] prefers-reduced-motion verified by toggling in devtools
- [ ] iPhone Safari + Android Chrome manual scroll test (no jank, no rubber-band breakage from Lenis)
- [ ] All images next/image, AVIF/WebP, sized correctly
- [ ] Every Ryan punch-list item in Section 8 checked off, listed in PR description
- [ ] OG images, favicon, metadata per page
- [ ] 404 page styled (template 404s scream template)

---

## 11. ASSETS NEEDED FROM ALAIN (blockers, gather before build)

- [ ] RYŌSHIN logo: SVG, light + dark variants
- [ ] Partner/client logos in full color (SVG or high-res PNG): FM, Backpack Buddies, Hitachi Solutions, Apple, Nikkei, Google, PIB, TribeX, Tribe Rocks, Eitree, Mobius Systems
- [ ] Ryan's photo, high-res (for the depth-treatment frame)
- [ ] Existing site copy export (current /services, /work content)
- [ ] Confirmation from Ryan: 5+ vs 20+ years stat; final hero copy after brother review
- [ ] Native speaker sign-off on the Japanese lesson block (pre-launch, not pre-build)

---

## 12. VOICE RULES (bake into CLAUDE.md)

- No em dashes. Ever. Use commas, periods, or restructure.
- Short paragraphs. Sentences a human would say out loud.
- Banned: "delve", "elevate" (in copy), "seamless", "cutting-edge", "in today's world", "unlock", "empower" is allowed ONLY because Ryan's own draft uses it.
- Warm, direct, quietly confident. Think a trusted advisor, not a pitch deck.
- Vermilion words in headlines: max one phrase per page.
