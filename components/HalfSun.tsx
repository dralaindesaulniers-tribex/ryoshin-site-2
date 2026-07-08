"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * The half sun, signature scroll motif (spec section 6). Ryan's request:
 * a red half sun rises and sets with scroll, like his 360/speaking videos.
 *
 * Fixed background layer, pointer-events none. Scrubbed to page progress:
 * top = half-risen behind the hero, mid = fully risen, smaller and dimmer,
 * bottom = sets back below the horizon. Opacity stays low so text always wins.
 */
export default function HalfSun() {
  const layerRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const sun = sunRef.current;
    if (!layer || !sun) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          // mobile: smoothed scrub, fewer in-between states (spec 6)
          scrub: isMobile ? 0.5 : true,
        },
      });

      // start: half-risen over the implied horizon at the viewport bottom
      gsap.set(sun, { yPercent: 50, scale: 1, opacity: 0.16 });

      tl.to(sun, {
        // mid-page: fully risen, smaller, higher, dimmer
        yPercent: -46,
        scale: 0.62,
        opacity: 0.11,
        ease: "none",
        duration: 0.5,
      }).to(sun, {
        // footer: sets back below the horizon
        yPercent: 58,
        scale: 0.9,
        opacity: 0.06,
        ease: "none",
        duration: 0.5,
      });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    // reduced motion: static faint sun, no scroll animation
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(sun, { yPercent: 30, opacity: 0.07 });
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="sun-layer fixed inset-0 z-[1] overflow-hidden"
      style={{ mixBlendMode: "screen" }}
    >
      <div
        ref={sunRef}
        className="absolute bottom-0 left-1/2 aspect-square w-[min(88vw,860px)] -translate-x-1/2 translate-y-1/2"
      >
        {/* atmospheric glow duplicate behind the disc */}
        <div
          className="bg-shu absolute inset-0 rounded-full opacity-30"
          style={{ filter: "blur(60px)" }}
        />
        <div
          className="bg-shu absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, #c43a2f 0%, #c43a2f 55%, rgba(196,58,47,0.6) 78%, rgba(196,58,47,0) 100%)",
          }}
        />
      </div>
    </div>
  );
}
