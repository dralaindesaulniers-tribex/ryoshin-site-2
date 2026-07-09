"use client";

import { useEffect, useRef } from "react";
import { networkCategories, networkValues } from "@/content/network";

/**
 * The hero network, ALL devices (per Alain, July 2026: the approved prototype
 * at ryoshin-neural-background.netlify.app is the reference, not the R3F
 * scene). Center RYŌSHIN orb with a slowly rotating half-ring, density-biased
 * drifting satellites, colored glow halos, mouse repulsion, and organic
 * randomly-spawned pulses. Category labels plus extra-faded value words live
 * strictly OUTSIDE the headline band so text always wins. No company names
 * (those live in the Partners section network).
 */

type Vec = [number, number];
const PAPER: Vec3 = [237, 234, 228];
const SHU: Vec3 = [196, 58, 47];
const GOLD: Vec3 = [217, 164, 65];
const INDIGO: Vec3 = [107, 135, 168];
const SAGE: Vec3 = [127, 160, 140];
type Vec3 = [number, number, number];

type NetNode = {
  bx: number;
  by: number;
  r: number;
  center: boolean;
  color: Vec3;
  phase: number;
  driftA: number;
  driftS: number;
  label: string | null;
  labelAlpha: number;
};

function rand(a: number, b: number) {
  return a + Math.random() * (b - a);
}

export default function NetworkCanvas({ interactive = true }: { interactive?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let DPR = 1;
    let nodes: NetNode[] = [];
    let edges: [number, number, number][] = [];
    let pulses: { edge: [number, number, number]; t: number; speed: number; flip: boolean; color: Vec3 }[] = [];
    let raf = 0;
    let lastPulse = 0;
    const mouse = { x: -9999, y: -9999 };

    const pickColor = (): Vec3 => {
      const r = Math.random();
      if (r < 0.42) return PAPER;
      if (r < 0.62) return SHU;
      if (r < 0.78) return GOLD;
      if (r < 0.9) return INDIGO;
      return SAGE;
    };

    function build() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas!.clientWidth;
      H = canvas!.clientHeight;
      canvas!.width = W * DPR;
      canvas!.height = H * DPR;
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);

      nodes = [];
      edges = [];
      pulses = [];

      const isMobile = W < 700;
      const count = isMobile ? 70 : 130;
      const cx = W / 2;
      const cy = H / 2;
      const minWH = Math.min(W, H);

      // Center: RYŌSHIN orb
      nodes.push({
        bx: cx,
        by: cy,
        r: isMobile ? 7 : 9,
        center: true,
        color: SHU,
        phase: Math.random() * Math.PI * 2,
        driftA: 0,
        driftS: 0,
        label: null,
        labelAlpha: 0,
      });

      // Anonymous satellites, density biased toward center
      for (let i = 1; i < count; i++) {
        const ang = Math.random() * Math.PI * 2;
        const t = Math.pow(Math.random(), 1.45);
        const rad = 70 + t * minWH * 0.66;
        const x = cx + Math.cos(ang) * rad * (W / minWH) * 0.75;
        const y = cy + Math.sin(ang) * rad * 0.88;
        const big = Math.random() < 0.16;
        nodes.push({
          bx: x,
          by: y,
          r: big ? rand(3, 4.4) : rand(1.2, 2.6),
          center: false,
          color: pickColor(),
          phase: Math.random() * Math.PI * 2,
          driftA: rand(4, 14),
          driftS: rand(0.00012, 0.0004),
          label: null,
          labelAlpha: 0,
        });
      }

      // Labels: categories readable-faint, value words a whisper (per Alain).
      // The keep-out band covers the headline / subhead / chat column plus
      // drift + mouse-push slack, so no word ever sits over the hero text.
      // Mobile gets categories only; there is no safe room for more.
      const wanted: [string, number][] = [
        ...networkCategories.map((l): [string, number] => [l, 0.3]),
        ...(isMobile ? [] : networkValues.map((l): [string, number] => [l, 0.16])),
      ];
      const inTextBand = (n: NetNode) =>
        Math.abs(n.by - cy) < H * 0.36 && Math.abs(n.bx - cx) < W * 0.42;
      const inBounds = (n: NetNode) =>
        n.bx > 48 && n.bx < W - 48 && n.by > 84 && n.by < H - 28;
      const candidates = nodes
        .filter((n) => !n.center && !inTextBand(n) && inBounds(n))
        .sort((a, b) => b.r - a.r);
      const placed: NetNode[] = [];
      for (const [label, alpha] of wanted) {
        for (const sep of [minWH * 0.18, minWH * 0.12, minWH * 0.07]) {
          const pick = candidates.find(
            (c) =>
              !c.label &&
              placed.every((p) => Math.hypot(p.bx - c.bx, p.by - c.by) > sep),
          );
          if (pick) {
            pick.label = label;
            pick.labelAlpha = alpha;
            pick.r = Math.max(pick.r, 3); // labeled nodes read as anchors
            placed.push(pick);
            break;
          }
        }
      }

      // Edges: nearby links + guaranteed spokes from center
      const maxDist = isMobile ? 125 : 165;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].bx - nodes[j].bx, nodes[i].by - nodes[j].by);
          if (d < maxDist && Math.random() < 0.5) edges.push([i, j, d]);
        }
      }
      nodes.forEach((n, i) => {
        if (i !== 0 && n.r > 2.8) {
          edges.push([0, i, Math.hypot(n.bx - nodes[0].bx, n.by - nodes[0].by)]);
        }
      });
    }

    const spawnPulse = () => {
      if (!edges.length) return;
      let edge = edges[(Math.random() * edges.length) | 0];
      if (Math.random() < 0.4) {
        const centerEdges = edges.filter((ed) => ed[0] === 0 || ed[1] === 0);
        if (centerEdges.length) edge = centerEdges[(Math.random() * centerEdges.length) | 0];
      }
      const r = Math.random();
      let color: Vec3 = PAPER;
      if (r < 0.3) color = SHU;
      else if (r < 0.45) color = GOLD;
      else if (r < 0.55) color = INDIGO;
      // wide speed range = visibly variable shots of light (prototype feel)
      pulses.push({ edge, t: 0, speed: rand(0.0014, 0.005), flip: Math.random() < 0.5, color });
    };

    const nodePos = (n: NetNode, time: number): Vec => {
      const dx = Math.cos(time * n.driftS + n.phase) * n.driftA;
      const dy = Math.sin(time * n.driftS * 1.3 + n.phase) * n.driftA;
      let x = n.bx + dx;
      let y = n.by + dy;
      if (interactive) {
        const mdx = x - mouse.x;
        const mdy = y - mouse.y;
        const md = Math.hypot(mdx, mdy);
        if (md < 180 && md > 0.001) {
          const push = (1 - md / 180) * 14;
          x += (mdx / md) * push;
          y += (mdy / md) * push;
        }
      }
      return [x, y];
    };

    function frame(time: number) {
      ctx!.clearRect(0, 0, W, H);
      const pos = nodes.map((n) => nodePos(n, time));

      // edges
      ctx!.lineWidth = 0.6;
      for (const [a, b, d] of edges) {
        const [ax, ay] = pos[a];
        const [bx, by] = pos[b];
        const fade = Math.max(0, 1 - d / 240);
        ctx!.strokeStyle = `rgba(${PAPER[0]},${PAPER[1]},${PAPER[2]},${0.05 + fade * 0.07})`;
        ctx!.beginPath();
        ctx!.moveTo(ax, ay);
        ctx!.lineTo(bx, by);
        ctx!.stroke();
      }

      // pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += p.speed * (reduceMotion ? 0 : 16);
        if (p.t >= 1) {
          pulses.splice(i, 1);
          continue;
        }
        const [a, b] = p.edge;
        const [ax, ay] = pos[p.flip ? b : a];
        const [bx, by] = pos[p.flip ? a : b];
        const x = ax + (bx - ax) * p.t;
        const y = ay + (by - ay) * p.t;
        const alpha = Math.sin(p.t * Math.PI);
        const c = p.color;
        const glow = ctx!.createRadialGradient(x, y, 0, x, y, 11);
        glow.addColorStop(0, `rgba(${c[0]},${c[1]},${c[2]},${0.45 * alpha})`);
        glow.addColorStop(1, `rgba(${c[0]},${c[1]},${c[2]},0)`);
        ctx!.fillStyle = glow;
        ctx!.beginPath();
        ctx!.arc(x, y, 11, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${0.75 * alpha})`;
        ctx!.beginPath();
        ctx!.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx!.fill();
      }

      // nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const [x, y] = pos[i];
        const flicker = 0.72 + 0.28 * Math.sin(time * 0.001 + n.phase * 3);
        const c = n.color;

        if (n.center) {
          const breathe = 0.85 + 0.15 * Math.sin(time * 0.0009);
          const g = ctx!.createRadialGradient(x, y, 0, x, y, 95 * breathe);
          g.addColorStop(0, `rgba(${SHU[0]},${SHU[1]},${SHU[2]},0.38)`);
          g.addColorStop(0.35, `rgba(${SHU[0]},${SHU[1]},${SHU[2]},0.12)`);
          g.addColorStop(1, "rgba(0,0,0,0)");
          ctx!.fillStyle = g;
          ctx!.beginPath();
          ctx!.arc(x, y, 95 * breathe, 0, Math.PI * 2);
          ctx!.fill();

          // glowing red orb, brand red, no white center, kept dim
          const orbR = n.r * 1.7 * (0.92 + 0.08 * Math.sin(time * 0.0016));
          const core = ctx!.createRadialGradient(x, y, 0, x, y, orbR);
          core.addColorStop(0, `rgba(${SHU[0]},${SHU[1]},${SHU[2]},0.85)`);
          core.addColorStop(0.55, `rgba(${SHU[0]},${SHU[1]},${SHU[2]},0.7)`);
          core.addColorStop(1, `rgba(${SHU[0]},${SHU[1]},${SHU[2]},0)`);
          ctx!.fillStyle = core;
          ctx!.beginPath();
          ctx!.arc(x, y, orbR, 0, Math.PI * 2);
          ctx!.fill();

          // rotating half-ring, one turn ~52s
          const ringR = n.r * 3.4;
          const rot = time * 0.00012;
          ctx!.strokeStyle = `rgba(${SHU[0]},${SHU[1]},${SHU[2]},0.85)`;
          ctx!.lineWidth = 2;
          ctx!.lineCap = "round";
          ctx!.shadowColor = `rgba(${SHU[0]},${SHU[1]},${SHU[2]},0.7)`;
          ctx!.shadowBlur = 10;
          ctx!.beginPath();
          ctx!.arc(x, y, ringR, rot, rot + Math.PI);
          ctx!.stroke();
          ctx!.shadowBlur = 0;
        } else {
          const haloR = n.r * (n.r > 2.8 ? 6 : 4.5);
          const halo = ctx!.createRadialGradient(x, y, 0, x, y, haloR);
          halo.addColorStop(0, `rgba(${c[0]},${c[1]},${c[2]},${0.22 * flicker})`);
          halo.addColorStop(1, `rgba(${c[0]},${c[1]},${c[2]},0)`);
          ctx!.fillStyle = halo;
          ctx!.beginPath();
          ctx!.arc(x, y, haloR, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${(0.4 + n.r * 0.13) * flicker})`;
          ctx!.beginPath();
          ctx!.arc(x, y, n.r, 0, Math.PI * 2);
          ctx!.fill();
        }

        if (n.label) {
          ctx!.fillStyle = `rgba(${PAPER[0]},${PAPER[1]},${PAPER[2]},${n.labelAlpha})`;
          ctx!.font = `300 11px "General Sans", "Helvetica Neue", Arial, sans-serif`;
          const text = n.label.toUpperCase();
          // flip to the left side of the node near the right edge so words
          // never clip off-screen
          const tw = ctx!.measureText(text).width;
          const lx = x + n.r + 8 + tw > W - 12 ? x - n.r - 8 - tw : x + n.r + 8;
          ctx!.fillText(text, lx, y + 4);
        }
      }

      if (!reduceMotion && time - lastPulse > rand(180, 520) && pulses.length < 20) {
        spawnPulse();
        lastPulse = time;
      }

      raf = requestAnimationFrame(frame);
    }

    const onResize = () => build();
    const onMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    build();
    window.addEventListener("resize", onResize);
    if (interactive) {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseleave", onLeave);
    }

    if (reduceMotion) frame(0);
    else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [interactive]);

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />;
}
