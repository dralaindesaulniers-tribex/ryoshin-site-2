"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import NetworkCanvas from "./NetworkCanvas";

/**
 * Hero network mount (spec 7). Zero LCP impact: nothing renders until after
 * hydration + requestIdleCallback, then fades in over 1.5s. The hero already
 * looks intentional (charcoal + headline) in the moment before it appears.
 *
 * Capability routing (spec 7.3):
 *   - feature flag NEXT_PUBLIC_NETWORK, default ON, off = nothing renders
 *   - reduced-motion, mobile, or low-end (hardwareConcurrency <= 4) => 2D canvas
 *   - capable desktop => lazy-loaded R3F 3D scene (code-split, ships zero bytes
 *     until this decides to load it)
 */

const NetworkScene = dynamic(() => import("./NetworkScene"), { ssr: false });

type Mode = "none" | "canvas" | "r3f";

export default function NetworkHero() {
  const [mode, setMode] = useState<Mode>("none");
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const flag = process.env.NEXT_PUBLIC_NETWORK ?? "on";
    if (flag === "off") return;

    const decide = () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      const cores = navigator.hardwareConcurrency ?? 8;
      const lowEnd = cores <= 4;
      setMode(reduce || mobile || lowEnd ? "canvas" : "r3f");
      // fade in over 1.5s after mount
      requestAnimationFrame(() => setShown(true));
    };

    const ric =
      window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    const id = ric(decide);
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(id as number);
    };
  }, []);

  if (mode === "none") return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 transition-opacity duration-[1500ms] ease-out"
      style={{ opacity: shown ? 1 : 0 }}
    >
      {mode === "canvas" ? <NetworkCanvas interactive={false} /> : <NetworkScene />}
    </div>
  );
}
