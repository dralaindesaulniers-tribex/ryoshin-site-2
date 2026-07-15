"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { networkEntities, type NetworkEntity } from "@/content/network";

/**
 * Smaller, contained network for the Partners & Clients section. The nodes ARE
 * the partners (inner ring, larger) and clients (outer ring), each clickable:
 * clicking opens an info card popup (Alain, July 2026) with the entity, the
 * person behind it when we have their bio + headshot, and a link to the work
 * case study when one exists. Same core visual language as the hero network
 * (RYŌSHIN orb, half-ring, glow halos, pulses) but focused and interactive.
 * An accessible link list is rendered alongside for keyboard users, no-JS,
 * and SEO.
 */

type Vec3 = [number, number, number];
const PAPER: Vec3 = [237, 234, 228];
const SHU: Vec3 = [196, 58, 47];
const GOLD: Vec3 = [217, 164, 65];

type PNode = {
  entity: NetworkEntity | null; // null = core
  baseAng: number;
  radius: number;
  r: number;
  color: Vec3;
  phase: number;
  // live screen position, updated each frame for hit testing
  sx: number;
  sy: number;
};

export default function PartnersNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<NetworkEntity | null>(null);
  const [touch, setTouch] = useState(false);
  const nodesRef = useRef<PNode[]>([]);
  const hoverRef = useRef<string | null>(null);

  const partners = networkEntities.filter((e) => e.tier === "partner");
  const clients = networkEntities.filter((e) => e.tier === "client");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTouch(window.matchMedia("(hover: none)").matches);

    let W = 0;
    let H = 0;
    let DPR = 1;
    let raf = 0;
    const pulses: { from: number; to: number; t: number; speed: number; color: Vec3 }[] = [];
    let lastPulse = 0;
    let edges: [number, number][] = [];

    function build() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas!.clientWidth;
      H = canvas!.clientHeight;
      canvas!.width = W * DPR;
      canvas!.height = H * DPR;
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);

      const isNarrow = W < 640;
      const nodes: PNode[] = [];
      // core
      nodes.push({ entity: null, baseAng: 0, radius: 0, r: isNarrow ? 7 : 9, color: SHU, phase: 0, sx: 0, sy: 0 });

      const innerR = Math.min(W, H) * (isNarrow ? 0.26 : 0.3);
      const outerR = Math.min(W, H) * (isNarrow ? 0.42 : 0.46);

      partners.forEach((e, i) => {
        nodes.push({
          entity: e,
          baseAng: -Math.PI / 2 + (i / partners.length) * Math.PI * 2,
          radius: innerR,
          r: isNarrow ? 6 : 8,
          color: SHU,
          phase: Math.random() * Math.PI * 2,
          sx: 0,
          sy: 0,
        });
      });
      clients.forEach((e, i) => {
        nodes.push({
          entity: e,
          baseAng: -Math.PI / 6 + (i / clients.length) * Math.PI * 2,
          radius: outerR,
          r: isNarrow ? 4 : 5.5,
          color: GOLD,
          phase: Math.random() * Math.PI * 2,
          sx: 0,
          sy: 0,
        });
      });
      nodesRef.current = nodes;

      // edges: core to every entity
      edges = [];
      for (let i = 1; i < nodes.length; i++) edges.push([0, i]);
    }

    const spawnPulse = () => {
      const nodes = nodesRef.current;
      if (nodes.length < 2) return;
      const to = 1 + ((Math.random() * (nodes.length - 1)) | 0);
      pulses.push({ from: 0, to, t: 0, speed: 0.008 + Math.random() * 0.006, color: Math.random() < 0.5 ? PAPER : GOLD });
    };

    function frame(time: number) {
      ctx!.clearRect(0, 0, W, H);
      const cx = W / 2;
      const cy = H / 2;
      const nodes = nodesRef.current;

      // compute live positions
      for (const n of nodes) {
        if (!n.entity) {
          n.sx = cx;
          n.sy = cy;
        } else {
          const wob = reduceMotion ? 0 : Math.sin(time * 0.0004 + n.phase) * 0.05;
          const ang = n.baseAng + wob;
          n.sx = cx + Math.cos(ang) * n.radius * 1.15;
          n.sy = cy + Math.sin(ang) * n.radius;
        }
      }

      // edges
      ctx!.lineWidth = 0.7;
      for (const [a, b] of edges) {
        const na = nodes[a];
        const nb = nodes[b];
        const active = hoverRef.current && nb.entity?.id === hoverRef.current;
        ctx!.strokeStyle = active
          ? `rgba(${SHU[0]},${SHU[1]},${SHU[2]},0.5)`
          : `rgba(${PAPER[0]},${PAPER[1]},${PAPER[2]},0.1)`;
        ctx!.beginPath();
        ctx!.moveTo(na.sx, na.sy);
        ctx!.lineTo(nb.sx, nb.sy);
        ctx!.stroke();
      }

      // pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += reduceMotion ? 0 : p.speed;
        if (p.t >= 1) {
          pulses.splice(i, 1);
          continue;
        }
        const a = nodes[p.from];
        const b = nodes[p.to];
        const x = a.sx + (b.sx - a.sx) * p.t;
        const y = a.sy + (b.sy - a.sy) * p.t;
        const alpha = Math.sin(p.t * Math.PI);
        ctx!.fillStyle = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},${0.9 * alpha})`;
        ctx!.beginPath();
        ctx!.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx!.fill();
      }

      // nodes
      for (const n of nodes) {
        const c = n.color;
        if (!n.entity) {
          // core with breathing glow + half ring
          const breathe = 0.85 + 0.15 * Math.sin(time * 0.0009);
          const g = ctx!.createRadialGradient(n.sx, n.sy, 0, n.sx, n.sy, 70 * breathe);
          g.addColorStop(0, `rgba(${SHU[0]},${SHU[1]},${SHU[2]},0.4)`);
          g.addColorStop(0.4, `rgba(${SHU[0]},${SHU[1]},${SHU[2]},0.12)`);
          g.addColorStop(1, "rgba(0,0,0,0)");
          ctx!.fillStyle = g;
          ctx!.beginPath();
          ctx!.arc(n.sx, n.sy, 70 * breathe, 0, Math.PI * 2);
          ctx!.fill();
          // glowing red orb, brand red, no white center
          const orbR = n.r * 1.7 * breathe;
          const core = ctx!.createRadialGradient(n.sx, n.sy, 0, n.sx, n.sy, orbR);
          core.addColorStop(0, `rgba(${SHU[0]},${SHU[1]},${SHU[2]},1)`);
          core.addColorStop(0.55, `rgba(${SHU[0]},${SHU[1]},${SHU[2]},0.9)`);
          core.addColorStop(1, `rgba(${SHU[0]},${SHU[1]},${SHU[2]},0)`);
          ctx!.fillStyle = core;
          ctx!.beginPath();
          ctx!.arc(n.sx, n.sy, orbR, 0, Math.PI * 2);
          ctx!.fill();
          const ringR = n.r * 3.2;
          const rot = time * 0.00012;
          ctx!.strokeStyle = `rgba(${SHU[0]},${SHU[1]},${SHU[2]},0.85)`;
          ctx!.lineWidth = 2;
          ctx!.lineCap = "round";
          ctx!.beginPath();
          ctx!.arc(n.sx, n.sy, ringR, rot, rot + Math.PI);
          ctx!.stroke();
          continue;
        }

        const isHover = hoverRef.current === n.entity.id;
        const boost = isHover ? 1.8 : 1;
        const haloR = n.r * 4;
        const halo = ctx!.createRadialGradient(n.sx, n.sy, 0, n.sx, n.sy, haloR);
        halo.addColorStop(0, `rgba(${c[0]},${c[1]},${c[2]},${0.28 * boost})`);
        halo.addColorStop(1, `rgba(${c[0]},${c[1]},${c[2]},0)`);
        ctx!.fillStyle = halo;
        ctx!.beginPath();
        ctx!.arc(n.sx, n.sy, haloR, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${isHover ? 1 : 0.85})`;
        ctx!.beginPath();
        ctx!.arc(n.sx, n.sy, n.r * (isHover ? 1.25 : 1), 0, Math.PI * 2);
        ctx!.fill();

        // label
        const label = n.entity.shortName ?? n.entity.name;
        ctx!.fillStyle = `rgba(${PAPER[0]},${PAPER[1]},${PAPER[2]},${isHover ? 0.95 : 0.6})`;
        ctx!.font = `400 ${n.entity.tier === "partner" ? 13 : 12}px "General Sans", "Helvetica Neue", Arial, sans-serif`;
        const onLeft = n.sx < cx;
        ctx!.textAlign = onLeft ? "right" : "left";
        ctx!.fillText(label, n.sx + (onLeft ? -(n.r + 8) : n.r + 8), n.sy + 4);
        ctx!.textAlign = "left";
      }

      if (!reduceMotion && time - lastPulse > 600 && pulses.length < 8) {
        spawnPulse();
        lastPulse = time;
      }

      raf = requestAnimationFrame(frame);
    }

    const hitTest = (mx: number, my: number): PNode | null => {
      for (const n of nodesRef.current) {
        if (!n.entity) continue;
        if (Math.hypot(mx - n.sx, my - n.sy) < n.r + 14) return n;
      }
      return null;
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      const hit = hitTest(e.clientX - rect.left, e.clientY - rect.top);
      const id = hit?.entity ? hit.entity.id : null;
      hoverRef.current = id;
      setHovered(id);
      canvas!.style.cursor = id ? "pointer" : "default";
    };
    const onClick = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      const hit = hitTest(e.clientX - rect.left, e.clientY - rect.top);
      // node opens the info card; empty canvas closes it
      setSelected(hit?.entity ?? null);
    };
    const onResize = () => build();

    build();
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("click", onClick);
    window.addEventListener("resize", onResize);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Escape closes the info card
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <div className="relative">
      <div className="bg-ink relative overflow-hidden rounded-[2px] border border-(--color-line-dark)">
        <canvas
          ref={canvasRef}
          className="block h-[clamp(360px,52vh,520px)] w-full"
          role="img"
          aria-label="Interactive network of RYŌSHIN partners and clients"
        />
        <p
          className="eyebrow text-paper/55 pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px]"
          aria-hidden="true"
        >
          {touch ? "Tap a node to meet the network" : hovered ? "Click to open" : "Hover a node"}
        </p>

        {/* info card popup: the entity, the person behind it when we have
            them, and the case study link when one exists */}
        {selected && (
          <aside
            role="dialog"
            aria-label={selected.name}
            data-lenis-prevent
            className="panel-dark absolute inset-x-3 bottom-3 max-h-[calc(100%-24px)] overflow-y-auto overscroll-contain p-6 md:inset-x-auto md:top-4 md:right-4 md:bottom-auto md:w-[340px] md:p-7"
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="text-paper/60 hover:text-paper absolute top-3 right-3 flex h-9 w-9 items-center justify-center text-xl leading-none transition-colors"
            >
              &times;
            </button>
            <p className="eyebrow text-shu text-[11px]">
              {selected.tier === "partner" ? "Partner" : "Client"}
            </p>
            <h3 className="font-display text-paper mt-2 pr-8 text-xl">{selected.name}</h3>
            {!selected.line.includes("[COPY TBD]") && (
              <p className="text-paper/65 mt-2 text-sm">{selected.line}</p>
            )}
            {selected.person && (
              <div className="mt-5 border-t border-(--color-line-dark) pt-5">
                <div className="flex items-center gap-4">
                  {selected.person.photo && (
                    <Image
                      src={selected.person.photo}
                      alt={selected.person.name}
                      width={96}
                      height={96}
                      className="h-14 w-14 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="text-paper text-base font-medium">{selected.person.name}</p>
                    <p className="text-paper/60 text-sm">{selected.person.role}</p>
                  </div>
                </div>
                <p className="text-paper/70 mt-4 text-sm leading-relaxed">
                  {selected.person.bio}
                </p>
              </div>
            )}
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              {selected.pageAnchor && (
                <Link
                  href={selected.pageAnchor}
                  className="link-draw eyebrow text-paper/80 hover:text-paper inline-block text-[11px]"
                >
                  Full bio
                </Link>
              )}
              {selected.workAnchor && (
                <Link
                  href={selected.workAnchor}
                  className="link-draw eyebrow text-paper/80 hover:text-paper inline-block text-[11px]"
                >
                  See the work
                </Link>
              )}
            </div>
          </aside>
        )}
      </div>

      {/* Accessible / no-JS / SEO list of the same entities */}
      <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
        {[...partners, ...clients].map((e) => {
          const href = e.pageAnchor ?? e.workAnchor;
          return (
            <li key={e.id}>
              {href ? (
                <a href={href} className="link-draw text-ink/70 hover:text-ink text-base">
                  {e.name}
                </a>
              ) : (
                <span className="text-ink/60 text-base">{e.name}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
