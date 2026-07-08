"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Site-wide scroll choreography (spec 2.4). One engine, consistent moves:
 * - [data-reveal-line]  headline lines rise from an overflow-hidden wrapper,
 *   0.08s stagger, power4.out, 1.1s, triggered at 75% viewport
 * - eyebrows / display headings / [data-reveal]  fade-rise
 * - [data-clip-reveal]  clip-path inset reveal with 1.06 -> 1.0 scale
 * - [data-depth-photo]  grayscale to color + gentle parallax in its frame
 * - [data-parallax]     background drift at 0.85-0.92 scroll speed
 * prefers-reduced-motion: everything collapses to simple fades.
 */
export default function MotionEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // headline line reveals, staggered per heading
      const headings = new Map<Element, Element[]>();
      gsap.utils.toArray<HTMLElement>("[data-reveal-line]").forEach((line) => {
        const parent = line.closest("h1, h2, p") ?? line.parentElement!;
        headings.set(parent, [...(headings.get(parent) ?? []), line]);
      });
      headings.forEach((lines, parent) => {
        gsap.fromTo(
          lines,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1.1,
            ease: "power4.out",
            stagger: 0.08,
            scrollTrigger: { trigger: parent, start: "top 75%" },
          },
        );
      });

      // fade-rise for eyebrows, display headings, and marked elements
      gsap.utils
        .toArray<HTMLElement>(
          "main .eyebrow, main h2.display, main h3.display, [data-reveal]",
        )
        .forEach((el) => {
          if (el.querySelector("[data-reveal-line]")) return;
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 26 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.95,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 80%" },
            },
          );
        });

      // staggered child fades (trusted-by logos, card grids)
      gsap.utils.toArray<HTMLElement>("[data-stagger-children]").forEach((el) => {
        gsap.fromTo(
          el.children,
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.06,
            scrollTrigger: { trigger: el, start: "top 82%" },
          },
        );
      });

      // image clip reveals
      gsap.utils.toArray<HTMLElement>("[data-clip-reveal]").forEach((el) => {
        const img = el.querySelector("img");
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 78%" },
          },
        );
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.06 },
            {
              scale: 1,
              duration: 1.4,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 78%" },
            },
          );
        }
      });

      // founder photo: grayscale to color, slight parallax inside clipped frame
      gsap.utils.toArray<HTMLElement>("[data-depth-photo]").forEach((img) => {
        gsap.fromTo(
          img,
          { filter: "grayscale(1)" },
          {
            filter: "grayscale(0)",
            duration: 1.4,
            ease: "power2.inOut",
            scrollTrigger: { trigger: img, start: "top 65%" },
          },
        );
        gsap.fromTo(
          img,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      // subtle background parallax (0.85-0.92 scroll speed = small counter-drift)
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    });

    // reduced motion: simple fades only, nothing moves
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.utils
        .toArray<HTMLElement>("[data-reveal-line], [data-reveal], [data-depth-photo]")
        .forEach((el) => {
          gsap.set(el, { clearProps: "all" });
        });
    });

    // recalc positions after route swap
    ScrollTrigger.refresh();

    return () => mm.revert();
  }, [pathname]);

  return null;
}
