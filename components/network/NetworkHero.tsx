"use client";

import { useEffect, useState } from "react";
import NetworkCanvas from "./NetworkCanvas";

/**
 * Hero network mount (spec 7, revised July 2026 per Alain). The approved
 * prototype canvas (ryoshin-neural-background.netlify.app) is the hero on
 * every device: mouse repulsion, organic pulses, full-viewport scatter.
 * The R3F scene is retired from the home page, which also drops three.js
 * from the bundle entirely.
 *
 * Zero LCP impact: nothing renders until after hydration +
 * requestIdleCallback, then fades in over 1.5s. The hero already looks
 * intentional (charcoal + headline) in the moment before it appears.
 * Feature flag NEXT_PUBLIC_NETWORK, default ON, off = nothing renders.
 * Reduced motion renders a single static frame (handled inside the canvas).
 */
export default function NetworkHero() {
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const flag = process.env.NEXT_PUBLIC_NETWORK ?? "on";
    if (flag === "off") return;

    const ric =
      window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    const id = ric(() => {
      setMounted(true);
      // fade in over 1.5s after mount
      requestAnimationFrame(() => setShown(true));
    });
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(id as number);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 transition-opacity duration-[1500ms] ease-out"
      style={{ opacity: shown ? 1 : 0 }}
    >
      <NetworkCanvas />
    </div>
  );
}
