"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Html } from "@react-three/drei";
import * as THREE from "three";
import { useCommandCenterStore } from "@/store/useCommandCenterStore";
import { STAR_SYSTEMS, getPlanetaryPosition } from "@/data/starSystems";
import { sound } from "@/lib/sound";
import { Cpu } from "lucide-react";

// Comet Tail Fragment Shader
const cometTailVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const cometTailFragmentShader = `
  uniform vec3 uColor;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    float headFade = smoothstep(1.0, 0.15, vUv.x);
    float tailWidth = 1.0 - abs(vUv.y - 0.5) * 2.0;
    float flicker = sin(uTime * 14.0 + vUv.x * 20.0) * 0.15 + 0.85;
    float alpha = headFade * pow(tailWidth, 2.0) * flicker * 0.85;

    vec3 col = mix(uColor, vec3(1.0), headFade * 0.7);
    gl_FragColor = vec4(col, alpha);
  }
`;

// Interactive Monolith Artifacts in Asteroid Fields
export interface AsteroidArtifact {
  id: string;
  name: string;
  category: string;
  snippet: string;
  badge: string;
  position: [number, number, number];
  rockIndex: number;
}

export const ASTEROID_ARTIFACTS: AsteroidArtifact[] = [
  {
    id: "artifact-docker-compose",
    name: "Zero-Downtime Microservices Stack",
    category: "Infrastructure",
    snippet: "docker compose -f docker-compose.prod.yml up -d --scale worker=4",
    badge: "Docker Swarm",
    position: [32.0, 14.8, -4.5], // Inner Corridor
    rockIndex: 0, // moon_rock_01
  },
  {
    id: "artifact-blender-py",
    name: "Procedural Asteroid Field Generator",
    category: "Graphics Script",
    snippet: "bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=1.4)",
    badge: "Python / Blender",
    position: [0.0, 15.2, 45.0], // Main Asteroid Belt
    rockIndex: 2, // moon_rock_03
  },
  {
    id: "artifact-redis-token",
    name: "Distributed Leaky Bucket Limiter",
    category: "Concurrency",
    snippet: "await redis.eval(rateLimitLuaScript, 1, clientIp, rate, capacity)",
    badge: "Redis Lua",
    position: [42.0, 12.5, 38.0], // Jupiter Greek Swarm
    rockIndex: 3, // moon_rock_05
  },
  {
    id: "artifact-turbopack-cache",
    name: "Turbopack Persistent Cache Pipeline",
    category: "Tooling",
    snippet: "next build --turbo --experimental-build-mode compile",
    badge: "Next.js 15",
    position: [-100.0, 17.5, 95.0], // Kuiper Belt Edge
    rockIndex: 5, // moon_rock_07
  },
];

const MOON_ROCK_NAMES = [
  "moon_rock_01",
  "moon_rock_02",
  "moon_rock_03",
  "moon_rock_05",
  "moon_rock_06",
  "moon_rock_07",
];

export function MeteorBelts() {
  const cometGroupRef = useRef<THREE.Group>(null!);

  const selectedStarSystemId = useCommandCenterStore((state) => state.selectedStarSystemId);
  const setSelectedMeteorId = useCommandCenterStore((state) => state.setSelectedMeteorId);
  const setCameraTarget = useCommandCenterStore((state) => state.setCameraTarget);

  const activeSystem = useMemo(
    () => STAR_SYSTEMS.find((s) => s.id === selectedStarSystemId),
    [selectedStarSystemId]
  );

  // Load the comprehensive multi-rock model containing moon rocks 01, 02, 03, 05, 06, 07
  const { nodes } = useGLTF("/models/moon_rocks.glb") as any;

  // Extract all 6 distinct moon rock geometries
  const rockGeometries = useMemo(() => {
    const defaultGeo = new THREE.DodecahedronGeometry(0.35, 1);
    return MOON_ROCK_NAMES.map((name) => {
      if (nodes && nodes[name] && nodes[name].geometry) {
        return nodes[name].geometry as THREE.BufferGeometry;
      }
      return defaultGeo;
    });
  }, [nodes]);

  // Generate 4 populations of asteroids according to real astrophysics:
  // 1. Main Asteroid Belt (R = 40.0 - 52.0) with Kirkwood Gaps (R = 43.5, 47.0)
  // 2. Jupiter Trojans & Greeks (R = 58.0 at +/- 60 deg from Jupiter)
  // 3. Kuiper Belt & Scattered Disc (R = 128.0 - 180.0, inclination up to 30 deg)
  const { batches, dummyMatrix } = useMemo(() => {
    const batchList: Array<
      Array<{
        type: "mainBelt" | "trojan" | "kuiper";
        radius: number;
        angle: number;
        speed: number;
        yOffset: number;
        tilt: number;
        scale: number;
        rotSpeed: [number, number, number];
        trojanLagrangeSign?: number; // +1 for Greeks (L4), -1 for Trojans (L5)
      }>
    > = [[], [], [], [], [], []];

    // Population 1: Main Asteroid Belt (280 asteroids)
    let assigned = 0;
    while (assigned < 280) {
      const candidateR = 40.0 + Math.random() * 12.0;

      // Real Kirkwood Gaps exclusion:
      // 3:1 resonance at 43.5 (gap 42.9 to 44.1)
      // 5:2 resonance at 47.0 (gap 46.5 to 47.5)
      if (
        (candidateR >= 42.9 && candidateR <= 44.1) ||
        (candidateR >= 46.5 && candidateR <= 47.5)
      ) {
        continue; // Kirkwood gap: cleared by Jupiter gravity!
      }

      const rockType = assigned % 6;
      const angle = Math.random() * Math.PI * 2;
      // Prograde orbital speed: omega = 10.0 / r^1.5
      const speed = 10.0 / Math.pow(candidateR, 1.5);
      const yOffset = (Math.random() - 0.5) * 1.8;
      const tilt = (Math.random() - 0.5) * 0.14;
      const scale = 1.6 + Math.random() * 1.5;
      const rotSpeed: [number, number, number] = [
        (Math.random() - 0.5) * 1.5,
        (Math.random() - 0.5) * 1.5,
        (Math.random() - 0.5) * 1.5,
      ];

      batchList[rockType].push({
        type: "mainBelt",
        radius: candidateR,
        angle,
        speed,
        yOffset,
        tilt,
        scale,
        rotSpeed,
      });
      assigned++;
    }

    // Population 2: Jupiter Trojans & Greeks (Lagrange L4 & L5) - 90 asteroids
    for (let i = 0; i < 90; i++) {
      const rockType = i % 6;
      const isGreek = i % 2 === 0;
      const trojanLagrangeSign = isGreek ? 1 : -1;

      // Centered on Jupiter's orbital ring (R = 58.0)
      const radius = 58.0 + (Math.random() - 0.5) * 3.5;
      // Clustered tightly around +/- 60 degrees (+/- PI/3)
      const librationOffset = (Math.random() - 0.5) * 0.32;
      const angle = librationOffset;
      const speed = 0.041; // Synchronized lockstep with Jupiter
      const yOffset = (Math.random() - 0.5) * 1.6;
      const tilt = (Math.random() - 0.5) * 0.12;
      const scale = 1.8 + Math.random() * 1.4;
      const rotSpeed: [number, number, number] = [
        (Math.random() - 0.5) * 1.2,
        (Math.random() - 0.5) * 1.2,
        (Math.random() - 0.5) * 1.2,
      ];

      batchList[rockType].push({
        type: "trojan",
        radius,
        angle,
        speed,
        yOffset,
        tilt,
        scale,
        rotSpeed,
        trojanLagrangeSign,
      });
    }

    // Population 3: Kuiper Belt & Scattered Disc (120 asteroids)
    for (let i = 0; i < 120; i++) {
      const rockType = i % 6;
      const radius = 128.0 + Math.random() * 52.0; // 128.0 to 180.0
      const angle = Math.random() * Math.PI * 2;
      const speed = 7.5 / Math.pow(radius, 1.5);
      const yOffset = (Math.random() - 0.5) * 6.5;
      // High inclination tilt (up to 30 deg = 0.52 rad)
      const tilt = (Math.random() - 0.5) * 0.52;
      const scale = 2.2 + Math.random() * 2.0;
      const rotSpeed: [number, number, number] = [
        (Math.random() - 0.5) * 1.0,
        (Math.random() - 0.5) * 1.0,
        (Math.random() - 0.5) * 1.0,
      ];

      batchList[rockType].push({
        type: "kuiper",
        radius,
        angle,
        speed,
        yOffset,
        tilt,
        scale,
        rotSpeed,
      });
    }

    return { batches: batchList, dummyMatrix: new THREE.Matrix4() };
  }, []);

  // Shared rock material with responsive spectral tinting
  const rockMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#94a3b8"),
        roughness: 0.5,
        metalness: 0.35,
        emissive: new THREE.Color("#1e293b"),
        emissiveIntensity: 0.65,
      }),
    []
  );

  // Comet tail uniforms
  const cometUniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color("#38bdf8") },
      uTime: { value: 0 },
    }),
    []
  );

  // Refs for each of the 6 instanced meshes
  const instancedMeshRefs = useRef<(THREE.InstancedMesh | null)[]>([]);

  // 60 FPS Orbit Ticks & Impulse Shimmer
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    cometUniforms.uTime.value += delta;

    // Jupiter's current orbital angle (Jupiter: a=58, speed=0.041)
    const jupiterM = t * 0.041;
    const jupiterNu =
      jupiterM + (2 * 0.048 - 0.0001) * Math.sin(jupiterM) + 0.0028 * Math.sin(2 * jupiterM);

    // Shift material emissive to active sun's spectral color
    if (activeSystem) {
      rockMaterial.emissive.lerp(new THREE.Color(activeSystem.spectralColor), 0.05);
      rockMaterial.emissiveIntensity = 0.85;
    } else {
      rockMaterial.emissive.lerp(new THREE.Color("#1e293b"), 0.02);
      rockMaterial.emissiveIntensity = 0.55;
    }

    // Update each batch of asteroids
    for (let r = 0; r < batches.length; r++) {
      const mesh = instancedMeshRefs.current[r];
      if (!mesh) continue;

      const batch = batches[r];
      for (let j = 0; j < batch.length; j++) {
        const ast = batch[j];
        let curAngle: number;

        if (ast.type === "trojan") {
          // Locked to Jupiter +/- 60 deg (+/- PI/3) with libration oscillation
          const lagrangeAngle =
            jupiterNu + (ast.trojanLagrangeSign || 1) * (Math.PI / 3);
          const libration = Math.sin(t * 0.4 + j) * 0.06;
          curAngle = lagrangeAngle + ast.angle + libration;
        } else {
          curAngle = ast.angle + t * ast.speed;
        }

        // Keplerian trajectory around Sun [0, 14.0, 0] elevated above black hole
        const lx = Math.cos(curAngle) * ast.radius;
        const ly = 14.0 + Math.sin(curAngle) * ast.radius * Math.sin(ast.tilt) + ast.yOffset;
        const lz = Math.sin(curAngle) * ast.radius * Math.cos(ast.tilt);

        const pos = new THREE.Vector3(lx, ly, lz);
        const rot = new THREE.Euler(
          t * ast.rotSpeed[0],
          t * ast.rotSpeed[1],
          t * ast.rotSpeed[2]
        );
        const sc = ast.scale;

        dummyMatrix.makeRotationFromEuler(rot);
        dummyMatrix.setPosition(pos);
        dummyMatrix.scale(new THREE.Vector3(sc, sc, sc));

        mesh.setMatrixAt(j, dummyMatrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
    }

    // Population 4: Meteor Showers (High-Eccentricity Comet Debris Trail, e = 0.95, tilt = 45 deg)
    if (cometGroupRef.current) {
      const cometA = 42.0;
      const cometE = 0.95;
      const cometSpeed = 0.22;
      const [cX, cY, cZ] = getPlanetaryPosition(cometA, cometE, 45.0, cometSpeed, t);
      cometGroupRef.current.position.set(cX, cY, cZ);

      // Look toward future position for velocity alignment
      const [nX, nY, nZ] = getPlanetaryPosition(cometA, cometE, 45.0, cometSpeed, t + 0.04);
      cometGroupRef.current.lookAt(nX, nY, nZ);
    }
  });

  return (
    <group>
      {/* 6 Instanced Asteroid Fields — cycling across all moon rock designs 1 to 7 */}
      {batches.map((batch, idx) => (
        <instancedMesh
          key={`moon-rock-batch-${idx}`}
          ref={(el) => {
            instancedMeshRefs.current[idx] = el;
          }}
          args={[rockGeometries[idx], rockMaterial, batch.length]}
        />
      ))}

      {/* Population 4: Hyperbolic Comet Express (e = 0.95, 45 deg tilt) */}
      <group ref={cometGroupRef}>
        {/* Icy Nucleus */}
        <mesh>
          <sphereGeometry args={[0.9, 16, 16]} />
          <meshBasicMaterial color="#e0f2fe" />
        </mesh>
        <pointLight color="#38bdf8" intensity={8.0} distance={20} />

        {/* Ionized Blue Particle Tail Ribbon */}
        <mesh rotation={[0, Math.PI / 2, 0]} position={[0, 0, -8.0]}>
          <planeGeometry args={[16.0, 2.2]} />
          <shaderMaterial
            vertexShader={cometTailVertexShader}
            fragmentShader={cometTailFragmentShader}
            uniforms={cometUniforms}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Secondary Orthogonal Tail Blade */}
        <mesh rotation={[Math.PI / 2, Math.PI / 2, 0]} position={[0, 0, -8.0]}>
          <planeGeometry args={[16.0, 2.2]} />
          <shaderMaterial
            vertexShader={cometTailVertexShader}
            fragmentShader={cometTailFragmentShader}
            uniforms={cometUniforms}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Interactive Monolith Asteroids (Clickable Tech Artifacts) */}
      {ASTEROID_ARTIFACTS.map((artifact) => (
        <InteractiveAsteroidNode
          key={artifact.id}
          artifact={artifact}
          geometry={rockGeometries[artifact.rockIndex] || rockGeometries[0]}
          onSelect={(art) => {
            sound.playClick();
            setSelectedMeteorId(art.id);
            setCameraTarget({
              position: [art.position[0] - 2.0, art.position[1] + 1.2, art.position[2] + 4.0],
              target: [art.position[0], art.position[1], art.position[2]],
            });
          }}
        />
      ))}
    </group>
  );
}

// Single Interactive Asteroid Node with 3D Holographic Beacon
function InteractiveAsteroidNode({
  artifact,
  geometry,
  onSelect,
}: {
  artifact: AsteroidArtifact;
  geometry: THREE.BufferGeometry;
  onSelect: (art: AsteroidArtifact) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.45;
      meshRef.current.rotation.y += delta * 0.65;
    }
  });

  return (
    <group position={artifact.position}>
      {/* 3D Rock Mesh: Tangible, prominent scale (3.0 to 3.8) */}
      <mesh
        ref={meshRef}
        geometry={geometry}
        scale={hovered ? 3.8 : 3.0}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(artifact);
        }}
        onPointerOver={() => {
          setHovered(true);
          sound.playHover();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <meshStandardMaterial
          color={hovered ? "#38bdf8" : "#cbd5e1"}
          roughness={0.4}
          metalness={0.65}
          emissive={hovered ? "#0284c7" : "#1e293b"}
          emissiveIntensity={hovered ? 2.8 : 0.85}
        />
      </mesh>

      {/* Target Specular Glow Point */}
      <pointLight color="#38bdf8" intensity={hovered ? 6.0 : 2.5} distance={8} />

      {/* Holographic targeting ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.6, 1.7, 32]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={hovered ? 0.7 : 0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Pinned 3D Badge */}
      {mounted && (
        <Html position={[0, -1.8, 0]} center distanceFactor={14} zIndexRange={[40, 0]}>
          <div
            onClick={(e) => {
              e.stopPropagation();
              onSelect(artifact);
            }}
            className={`px-2.5 py-1 rounded-full border backdrop-blur-xl flex items-center gap-1.5 cursor-pointer transition-all duration-200 pointer-events-auto ${
              hovered
                ? "bg-white text-slate-950 border-white shadow-[0_0_25px_rgba(56,189,248,0.8)] scale-110"
                : "bg-black/80 text-white/80 border-cyan-500/30 hover:border-cyan-400"
            }`}
          >
            <Cpu className="w-3 h-3 text-cyan-400" />
            <span className="text-[9px] font-mono tracking-widest uppercase font-semibold">
              {artifact.badge}
            </span>
          </div>
        </Html>
      )}
    </group>
  );
}

useGLTF.preload("/models/moon_rocks.glb");
