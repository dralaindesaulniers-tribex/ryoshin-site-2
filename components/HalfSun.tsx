"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * The RYŌSHIN half-sun mark: a glowing, pulsing half circle (the logo).
 *
 * variant "scroll" (home): fixed background layer that rises and sets with page
 * scroll, like Ryan's 360/speaking videos (spec section 6). Text always wins.
 * variant "static" (inner pages): pulses in place behind the hero headline.
 */
export default function HalfSun({ variant = "scroll" }: { variant?: "scroll" | "static" }) {
  const sunRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (variant !== "scroll") return;
    const sun = sunRef.current;
    if (!sun) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          // the home hero pins for 170vh, then needs ~100vh more to clear
          // the viewport. The sun waits below the horizon until that whole
          // sequence is over, so it never collides with the fly-through or
          // gets chopped at the white handoff seam (Alain)
          start: () => window.innerHeight * 2.75,
          end: "bottom bottom",
          scrub: isMobile ? 0.5 : true,
          invalidateOnRefresh: true,
        },
      });
      // below the fly-through: fully under the horizon. It rises, faint,
      // over the light sections mid-page, then sets at the footer.
      gsap.set(sun, { yPercent: 105, opacity: 0.3 });
      tl.to(sun, { yPercent: 6, opacity: 0.26, ease: "none", duration: 0.5 }).to(sun, {
        yPercent: 110,
        opacity: 0.1,
        ease: "none",
        duration: 0.5,
      });
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(sun, { yPercent: 62, opacity: 0.18 });
    });

    return () => mm.revert();
  }, [variant]);

  const isScroll = variant === "scroll";

  return (
    <div
      aria-hidden="true"
      className={`sun-layer ${isScroll ? "fixed" : "absolute"} inset-0 overflow-hidden`}
      /* screen blend: reads as red glow on dark, collapses to a faint warm
         blush on light sections so it never stains light content */
      style={{ mixBlendMode: "screen" }}
    >
      <div
        ref={sunRef}
        /* static variant sits flush at the bottom of the hero section, faint */
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: isScroll ? "min(90vw, 820px)" : "min(78vw, 680px)",
          aspectRatio: "2 / 1",
          opacity: isScroll ? undefined : 0.38,
        }}
      >
        <div className="halfsun-glow halfsun-pulse" />
        <div className="halfsun-disc halfsun-pulse" />
      </div>
    </div>
  );
}
