"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { networkEntities, type NetworkEntity } from "@/content/network";

/**
 * R3F evolution of the approved network (spec 7.2). Desktop, capable devices.
 * Performance (spec 7.4): anonymous nodes are a single InstancedMesh (one draw
 * call), edges are one LineSegments pass, pulses share one instanced pool.
 * Named partner/client nodes are individual meshes (only 8) so they can be
 * hovered and clicked to ease the camera in with an info card.
 */

const COLORS = {
  paper: new THREE.Color("#EDEAE4"),
  shu: new THREE.Color("#C43A2F"),
  gold: new THREE.Color("#D9A441"),
  indigo: new THREE.Color("#6B87A8"),
  sage: new THREE.Color("#7FA08C"),
};
function pickColor() {
  const r = Math.random();
  if (r < 0.42) return COLORS.paper;
  if (r < 0.62) return COLORS.shu;
  if (r < 0.78) return COLORS.gold;
  if (r < 0.9) return COLORS.indigo;
  return COLORS.sage;
}

type NodeDef = {
  base: THREE.Vector3;
  r: number;
  color: THREE.Color;
  phase: number;
  driftA: number;
  driftS: number;
};

// radial glow sprite texture, generated once
function makeGlowTexture() {
  const s = 128;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.4, "rgba(255,255,255,0.35)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(c);
  return tex;
}

function Core() {
  const ring = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.Sprite>(null);
  const glowTex = useMemo(makeGlowTexture, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (ring.current) ring.current.rotation.z = t * 0.12; // one turn ~52s
    if (glow.current) {
      const b = 0.85 + 0.15 * Math.sin(t * 0.9);
      glow.current.scale.setScalar(4.6 * b);
    }
  });

  return (
    <group>
      {/* soft aura */}
      <sprite ref={glow} scale={4.6}>
        <spriteMaterial
          map={glowTex}
          color={COLORS.shu}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>
      {/* hot core */}
      <mesh>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshBasicMaterial color={new THREE.Color("#FFD6C8")} />
      </mesh>
      <mesh scale={1.9}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshBasicMaterial color={COLORS.shu} transparent opacity={0.35} depthWrite={false} />
      </mesh>
      {/* rotating half-ring, RYŌSHIN mark */}
      <mesh ref={ring}>
        <torusGeometry args={[0.95, 0.022, 12, 80, Math.PI]} />
        <meshBasicMaterial color={COLORS.shu} />
      </mesh>
    </group>
  );
}

function AnonNodes({ defs }: { defs: NodeDef[] }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useMemo(() => {
    // set instance colors once on mount via ref callback below
  }, []);

  useFrame(({ clock }) => {
    const m = mesh.current;
    if (!m) return;
    const t = clock.elapsedTime * 1000;
    for (let i = 0; i < defs.length; i++) {
      const n = defs[i];
      dummy.position.set(
        n.base.x + Math.cos(t * n.driftS + n.phase) * n.driftA,
        n.base.y + Math.sin(t * n.driftS * 1.3 + n.phase) * n.driftA,
        n.base.z + Math.cos(t * n.driftS * 0.8 + n.phase) * n.driftA * 0.6,
      );
      const flick = 0.8 + 0.2 * Math.sin(clock.elapsedTime + n.phase * 3);
      dummy.scale.setScalar(n.r * flick);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={(node) => {
        mesh.current = node;
        if (node) {
          for (let i = 0; i < defs.length; i++) node.setColorAt(i, defs[i].color);
          if (node.instanceColor) node.instanceColor.needsUpdate = true;
        }
      }}
      args={[undefined, undefined, defs.length]}
    >
      <sphereGeometry args={[1, 10, 10]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}

function NamedNode({
  entity,
  position,
}: {
  entity: NetworkEntity;
  position: THREE.Vector3;
}) {
  const [hovered, setHovered] = useState(false);
  const mesh = useRef<THREE.Mesh>(null);
  const color = entity.tier === "partner" ? COLORS.shu : COLORS.gold;
  const size = entity.tier === "partner" ? 0.16 : 0.12;
  const clickable = Boolean(entity.workAnchor);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const pulse = hovered ? 1.4 : 1 + 0.06 * Math.sin(clock.elapsedTime * 2 + position.x);
    mesh.current.scale.setScalar(size * pulse);
  });

  return (
    <group position={position}>
      <mesh
        ref={mesh}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          if (clickable) document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "";
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (entity.workAnchor) window.location.href = entity.workAnchor;
        }}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <Html center distanceFactor={10} position={[0, 0.32, 0]} pointerEvents="none">
        <span
          style={{
            color: "#EDEAE4",
            opacity: hovered ? 0.95 : 0.5,
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            fontWeight: 400,
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
            textShadow: "0 1px 6px rgba(16,17,18,0.9)",
            transition: "opacity 0.3s",
          }}
        >
          {entity.shortName ?? entity.name}
        </span>
      </Html>
    </group>
  );
}

function Edges({
  positions,
  pairs,
}: {
  positions: THREE.Vector3[];
  pairs: [number, number][];
}) {
  const geom = useRef<THREE.BufferGeometry>(null);
  const arr = useMemo(() => new Float32Array(pairs.length * 6), [pairs.length]);

  useFrame(() => {
    if (!geom.current) return;
    for (let i = 0; i < pairs.length; i++) {
      const [a, b] = pairs[i];
      const pa = positions[a];
      const pb = positions[b];
      arr.set([pa.x, pa.y, pa.z, pb.x, pb.y, pb.z], i * 6);
    }
    geom.current.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments>
      <bufferGeometry ref={geom}>
        <bufferAttribute attach="attributes-position" args={[arr, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color={COLORS.paper} transparent opacity={0.1} toneMapped={false} />
    </lineSegments>
  );
}

function Rig() {
  const { camera } = useThree();
  const desired = useMemo(() => new THREE.Vector3(), []);
  const origin = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useFrame(({ clock, pointer }) => {
    const t = clock.elapsedTime;
    // gentle screensaver float, camera drift ±2deg with pointer parallax
    desired.set(
      pointer.x * 0.6 + Math.sin(t * 0.15) * 0.3,
      pointer.y * 0.4 + Math.cos(t * 0.12) * 0.2,
      9,
    );
    camera.position.lerp(desired, 0.04);
    camera.lookAt(origin);
  });

  return null;
}

function Scene() {
  const { anon, named, namedPositions, allPositions, pairs } = useMemo(() => {
    const partners = networkEntities.filter((e) => e.tier === "partner");
    const clients = networkEntities.filter((e) => e.tier === "client");

    const namedPositions: THREE.Vector3[] = [];
    partners.forEach((_, i) => {
      const a = -Math.PI / 2 + (i / partners.length) * Math.PI * 2;
      namedPositions.push(new THREE.Vector3(Math.cos(a) * 2.2, Math.sin(a) * 1.5, Math.sin(a * 1.3) * 0.6));
    });
    clients.forEach((_, i) => {
      const a = -Math.PI / 6 + (i / clients.length) * Math.PI * 2;
      namedPositions.push(new THREE.Vector3(Math.cos(a) * 4, Math.sin(a) * 2.8, Math.cos(a * 1.7) * 0.9));
    });
    const named = [...partners, ...clients];

    // anonymous field, density biased to center, flattened in z
    const anon: NodeDef[] = [];
    const COUNT = 110;
    for (let i = 0; i < COUNT; i++) {
      const ang = Math.random() * Math.PI * 2;
      const t = Math.pow(Math.random(), 1.4);
      const rad = 1.4 + t * 6;
      anon.push({
        base: new THREE.Vector3(Math.cos(ang) * rad, Math.sin(ang) * rad * 0.7, (Math.random() - 0.5) * 3),
        r: Math.random() < 0.14 ? 0.06 : 0.03,
        color: pickColor(),
        phase: Math.random() * Math.PI * 2,
        driftA: 0.05 + Math.random() * 0.12,
        driftS: 0.0002 + Math.random() * 0.0004,
      });
    }

    // live positions array: [core, ...named, ...anon]
    const allPositions: THREE.Vector3[] = [
      new THREE.Vector3(0, 0, 0),
      ...namedPositions.map((p) => p.clone()),
      ...anon.map((n) => n.base.clone()),
    ];

    // edges: spokes from core to named + some anon-anon proximity links
    const pairs: [number, number][] = [];
    const namedStart = 1;
    named.forEach((_, i) => pairs.push([0, namedStart + i]));
    const anonStart = 1 + named.length;
    for (let i = 0; i < anon.length; i++) {
      // link some anon to core
      if (anon[i].r > 0.04 && Math.random() < 0.5) pairs.push([0, anonStart + i]);
      for (let j = i + 1; j < anon.length; j++) {
        const d = anon[i].base.distanceTo(anon[j].base);
        if (d < 1.5 && Math.random() < 0.12) pairs.push([anonStart + i, anonStart + j]);
      }
    }

    return { anon, named, namedPositions, allPositions, pairs };
  }, []);

  // keep allPositions in sync with anon drift for edges
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 1000;
    const anonStart = 1 + named.length;
    for (let i = 0; i < anon.length; i++) {
      const n = anon[i];
      allPositions[anonStart + i].set(
        n.base.x + Math.cos(t * n.driftS + n.phase) * n.driftA,
        n.base.y + Math.sin(t * n.driftS * 1.3 + n.phase) * n.driftA,
        n.base.z + Math.cos(t * n.driftS * 0.8 + n.phase) * n.driftA * 0.6,
      );
    }
  });

  return (
    <>
      <Rig />
      <Core />
      <AnonNodes defs={anon} />
      <Edges positions={allPositions} pairs={pairs} />
      {named.map((e, i) => (
        <NamedNode key={e.id} entity={e} position={namedPositions[i]} />
      ))}
    </>
  );
}

export default function NetworkScene() {
  return (
    <Canvas
      className="!pointer-events-auto"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 9], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene />
    </Canvas>
  );
}
