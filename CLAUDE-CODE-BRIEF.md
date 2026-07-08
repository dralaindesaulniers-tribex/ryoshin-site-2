# RYŌSHIN Solutions — Website Rebuild Brief

## What we're doing
Rebuilding the RYŌSHIN Solutions marketing site (currently WordPress + Thrive Themes)
as a hand-coded site. This is a clone-then-up-level project: same core content and
structure as the original, but a full visual, copy, and structural refresh — not a
1:1 copy.

Live reference site (for structure/content comparison only, not visual reference):
https://www.ryoshin.solutions/

## Source material
Everything you need is in CONTENT-INVENTORY.md (attached/in this folder) — full copy
for all 5 pages, stats, testimonials, services list, project case studies, contact
info, and a checklist of every image file with its source URL and where it's used.

**First step: fetch all images listed in the "IMAGE CHECKLIST" section of
CONTENT-INVENTORY.md and save them into an /images folder in this project.** Each URL
is given in full. Confirm all download successfully before moving on.

## Visual direction: Minimalist Japanese-inspired
- Lots of whitespace, restrained color palette — deep charcoal/near-black as the base,
  one considered accent color (open to suggestions — something like a deep red, gold,
  or ink tone that feels intentional rather than corporate-default blue)
- Generous negative space, nothing crowded
- Typography-led: confident, clean type doing most of the visual work rather than heavy
  graphics or busy layouts
- Subtle line work / dividers rather than boxes and cards everywhere
- Should feel calm, premium, and intentional — quiet confidence, not loud or flashy
- This ties directly to the brand philosophy (良心/両親 — good heart, conscience,
  family/community) — the design itself should feel like it embodies restraint and
  thoughtfulness, not just describe it in copy

## Build order
1. Set up the project (plain HTML/CSS/JS to start unless you recommend otherwise for a
   site this size — explain your reasoning if you'd suggest a framework instead)
2. Fetch and organize all images first
3. Build a shared header/nav and footer component (same across all pages per the
   inventory doc)
4. Build pages in this order: Home → About Us → Services → Projects → Contact
5. Make it fully responsive (mobile, tablet, desktop)
6. Pause for review after each page before moving to the next — I want to see and react
   as we go, not get a giant dump at the end

## Known gaps to flag, not block on
- Contact form needs to submit to ryan@ryoshin.ca — use a simple approach for now
  (e.g. a basic form backend or service); we'll finalize the real integration later
- Email signup connects to MailerLite — stub this out for now with a placeholder,
  we'll wire up the real API/embed later
- Privacy Policy and Terms pages are not in scope yet — just keep the footer links
  pointing to placeholder pages we'll fill in later

## Important — do NOT build yet
There's a planned future feature: a branded AI-powered search/chat box for the
homepage (like the prompt box on claude.ai), where visitors can ask a question and get
routed to relevant content on the site. This is a separate, more complex phase
involving a backend and the Claude API. Don't build this now — just leave a clear
placeholder comment in the homepage code marking where it will eventually go, so the
layout has room for it. We'll scope this as its own project once the core site is solid.

## Working style
I'm new to coding and to working with Claude Code, so:
- Explain what you're doing in plain language as you go, not just code
- Ask me before making assumptions on anything not covered in the inventory doc
- Show me visual progress often (use the preview pane) rather than working silently
  for a long stretch
