# Changelog

All notable changes to the RYŌSHIN Solutions website are recorded here, newest first.
Dates are YYYY-MM-DD.

## 2026-07-10

Hero fly-through, seamless white handoff (Alain, take 2):

- The DOM bloom had visible band edges; replaced with a white "beacon" star
  drawn inside the network itself. The dive flies toward it, it swells like a
  sun, and its light (a canvas radial centered on the orb) engulfs the screen
  edge-free until the viewport is solid paper. The next section shares that
  paper, so the release is invisible.
- Whiteout color corrected to exact --paper #F4F1EA (was the node white
  #EDEAE4); verified pixel-identical to the next section's background.
- Pinned hero sized to 100lvh: iOS Safari grows the viewport when its URL
  bar collapses mid-scroll, and the svh-sized pin exposed a black band under
  the whiteout on phones (Alain).
- Half-sun no longer rises during the pinned intro: it was creeping into
  frame mid-dive, vanishing under the whiteout, then reappearing chopped at
  the handoff seam (Alain). It now waits below the horizon until the hero
  has fully cleared the viewport, then rises over the light sections.

Hero fly-through, act 2 (Alain):

- After the chat centers, continued scrolling now flies the camera INTO the
  network: nodes stream past the edges, lines thicken, and the red orb swells
  and slides off past the corner (off-center, like a fly-by) before the page
  releases. Pin lengthened to 170vh so the whole moment breathes. True camera
  zoom inside the canvas, crisp at any magnification; labels bow out early.

Pinned hero intro (Alain):

- Scrolling the home hero now pins it for a beat: headline and subhead exit,
  the chat glides to the center of the screen, and the scrim lifts so the
  network fills the viewport at full strength. Keep scrolling and the page
  releases and moves on as normal. Works with native touch scroll on mobile;
  reduced motion skips the pin.
- Hero line 2 is now full white and the subhead near-white for more contrast.

Ryan's critique round 2 (PDF) plus Alain's hero contrast note:

- Home hero: dark radial scrim behind the text plus text shadows and a brighter
  second line and subhead, so the headline wins over the network.
- Contact form now opens WhatsApp with the message prefilled (email was going
  unread). Needs confirmation that 778-991-3747 is WhatsApp-enabled.
- Chat concierge is home-only; inner pages get a small search icon in the nav
  that points back to it.
- Founder photo recropped (head to mid-shin, no shoes, tighter perspective);
  original file kept alongside.
- "Co-pilot" added to Ryan's self-given titles in the founder bio text.
- Logo PNGs trimmed of transparent padding so nav and footer logos sit flush.
- Contact page bottom white space tightened on mobile.
- Network value label "Fundamentalism" renamed to "Essentialism", the book
  of Ryan's it references (via a brief stop at "Fundamentals").

Earlier today:

- Hero network rebuilt to the approved prototype feel on all devices: mouse
  repulsion, organic variable pulses, compact red orb, three.js dropped from
  the home page. Category labels plus faded value words, kept clear of the
  headline.
- Headline descender clipping fixed site-wide; About values row and Services
  framework boxes aligned.

## 2026-07-09

- Added `CHANGELOG.md` to track changes across build sessions.
- Added a "Changelog rule" section to `CLAUDE.md` requiring a dated entry here at the end of any session that changed code.
