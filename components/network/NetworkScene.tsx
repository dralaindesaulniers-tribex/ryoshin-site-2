"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

/**
 * R3F evolution of the approved prototype (spec 7). Desktop, capable devices.
 * Abstract living network: the RYŌSHIN core, density-biased anonymous nodes,
 * conceptual category labels (Ideas, Culture, Technology...) on the outer
 * field. No company names here (those live in the Partners section network).
 * Performance (spec 7.4): anonymous nodes are one InstancedMesh, edges are one
 * LineSegments pass.
 */

const COLORS = {
  paper: new THREE.Color("#EDEAE4"),
  shu: new THREE.Color("#C43A2F"),
  gold: new THREE.Color("#D9A441"),
  indigo: new THREE.Color("#6B87A8"),
  sage: new THREE.Color("#7FA08C"),
};

const CATEGORIES = [
  "Strategy",
  "Technology",
  "Community",
  "People",
  "Ideas",
  "Projects",
  "Places",
  "Culture",
  "AI",
];

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
  return new THREE.CanvasTexture(c);
}

function Core() {
  const ring = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.Sprite>(null);
  const glowTex = useMemo(makeGlowTexture, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (ring.current) ring.current.rotation.z = t * 0.12;
    if (glow.current) glow.current.scale.setScalar(4.6 * (0.85 + 0.15 * Math.sin(t * 0.9)));
  });

  return (
    <group>
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
      <mesh>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshBasicMaterial color={new THREE.Color("#FFD6C8")} />
      </mesh>
      <mesh scale={1.9}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshBasicMaterial color={COLORS.shu} transparent opacity={0.35} depthWrite={false} />
      </mesh>
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
      dummy.scale.setScalar(n.r * (0.8 + 0.2 * Math.sin(clock.elapsedTime + n.phase * 3)));
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

// Category label node: a small paper node with a dim floating label. No interaction.
function LabelNode({ label, position }: { label: string; position: THREE.Vector3 }) {
  return (
    <group position={position}>
      <mesh scale={0.055}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color={COLORS.paper} toneMapped={false} />
      </mesh>
      <Html center distanceFactor={11} position={[0, 0.28, 0]} pointerEvents="none">
        <span
          style={{
            color: "#EDEAE4",
            opacity: 0.32,
            fontFamily: "var(--font-body)",
            fontSize: "11px",
            fontWeight: 400,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            textShadow: "0 1px 6px rgba(16,17,18,0.9)",
          }}
        >
          {label}
        </span>
      </Html>
    </group>
  );
}

function Edges({ positions, pairs }: { positions: THREE.Vector3[]; pairs: [number, number][] }) {
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
    desired.set(pointer.x * 0.6 + Math.sin(t * 0.15) * 0.3, pointer.y * 0.4 + Math.cos(t * 0.12) * 0.2, 9);
    camera.position.lerp(desired, 0.04);
    camera.lookAt(origin);
  });

  return null;
}

function Scene() {
  const { anon, categoryPositions, allPositions, pairs } = useMemo(() => {
    // category label nodes on the outer field
    const categoryPositions: THREE.Vector3[] = CATEGORIES.map((_, i) => {
      const a = (i / CATEGORIES.length) * Math.PI * 2 + 0.3;
      const rad = 3.4 + (i % 3) * 0.9;
      return new THREE.Vector3(Math.cos(a) * rad, Math.sin(a) * rad * 0.7, (Math.random() - 0.5) * 2);
    });

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

    const allPositions: THREE.Vector3[] = [
      new THREE.Vector3(0, 0, 0),
      ...categoryPositions.map((p) => p.clone()),
      ...anon.map((n) => n.base.clone()),
    ];

    const pairs: [number, number][] = [];
    const catStart = 1;
    CATEGORIES.forEach((_, i) => pairs.push([0, catStart + i]));
    const anonStart = 1 + CATEGORIES.length;
    for (let i = 0; i < anon.length; i++) {
      if (anon[i].r > 0.04 && Math.random() < 0.5) pairs.push([0, anonStart + i]);
      for (let j = i + 1; j < anon.length; j++) {
        if (anon[i].base.distanceTo(anon[j].base) < 1.5 && Math.random() < 0.12) {
          pairs.push([anonStart + i, anonStart + j]);
        }
      }
    }

    return { anon, categoryPositions, allPositions, pairs };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 1000;
    const anonStart = 1 + CATEGORIES.length;
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
      {CATEGORIES.map((label, i) => (
        <LabelNode key={label} label={label} position={categoryPositions[i]} />
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
