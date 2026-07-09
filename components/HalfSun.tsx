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
          start: "top top",
          end: "bottom bottom",
          scrub: isMobile ? 0.5 : true,
        },
      });
      gsap.set(sun, { yPercent: 42, opacity: 0.5 });
      tl.to(sun, { yPercent: -22, opacity: 0.32, ease: "none", duration: 0.5 }).to(sun, {
        yPercent: 46,
        opacity: 0.16,
        ease: "none",
        duration: 0.5,
      });
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(sun, { yPercent: 18, opacity: 0.6 });
    });

    return () => mm.revert();
  }, [variant]);

  const isScroll = variant === "scroll";

  return (
    <div
      aria-hidden="true"
      className={`sun-layer ${isScroll ? "fixed" : "absolute"} inset-0 overflow-hidden`}
    >
      <div
        ref={sunRef}
        className={
          isScroll
            ? "absolute bottom-0 left-1/2 -translate-x-1/2"
            : "absolute left-1/2 top-[14%] -translate-x-1/2"
        }
        style={{
          width: "min(90vw, 820px)",
          aspectRatio: "2 / 1",
          opacity: isScroll ? undefined : 0.7,
        }}
      >
        <div className="halfsun-glow halfsun-pulse" />
        <div className="halfsun-disc halfsun-pulse" />
      </div>
    </div>
  );
}
