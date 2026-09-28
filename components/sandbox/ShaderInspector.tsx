"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Layers, Eye, RefreshCw } from "lucide-react";

type RenderMode = "pbr" | "normal" | "wireframe";

function InspectableMesh({
  mode,
  metalness,
  roughness,
  speed,
}: {
  mode: RenderMode;
  metalness: number;
  roughness: number;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * speed;
      meshRef.current.rotation.x += delta * (speed * 0.5);
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.1, 0.35, 128, 32]} />
      {mode === "pbr" && (
        <meshStandardMaterial
          color="#00f0ff"
          metalness={metalness}
          roughness={roughness}
          wireframe={false}
        />
      )}
      {mode === "normal" && <meshNormalMaterial wireframe={false} />}
      {mode === "wireframe" && (
        <meshBasicMaterial color="#00f0ff" wireframe />
      )}
    </mesh>
  );
}

export function ShaderInspector() {
  const [mode, setMode] = useState<RenderMode>("pbr");
  const [metalness, setMetalness] = useState(0.9);
  const [roughness, setRoughness] = useState(0.15);
  const [speed, setSpeed] = useState(0.8);

  return (
    <div className="space-y-4">
      
      {/* Top Pass Mode Switcher: Luxury Pill Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:px-6 bg-white/[0.03] rounded-2xl border border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <Layers className="w-4 h-4 text-white/80" />
          <span className="font-sans text-xs text-white uppercase font-semibold tracking-[0.2em]">
            SHADER PASS
          </span>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-full border border-white/10 bg-black/20">
          <button
            onClick={() => setMode("pbr")}
            className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-wider uppercase transition-all cursor-pointer ${
              mode === "pbr"
                ? "bg-white text-slate-950 font-semibold shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                : "text-white/50 hover:text-white"
            }`}
          >
            PBR METALLIC
          </button>
          <button
            onClick={() => setMode("normal")}
            className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-wider uppercase transition-all cursor-pointer ${
              mode === "normal"
                ? "bg-white text-slate-950 font-semibold shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                : "text-white/50 hover:text-white"
            }`}
          >
            NORMAL MAP
          </button>
          <button
            onClick={() => setMode("wireframe")}
            className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-wider uppercase transition-all cursor-pointer ${
              mode === "wireframe"
                ? "bg-white text-slate-950 font-semibold shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                : "text-white/50 hover:text-white"
            }`}
          >
            WIREFRAME
          </button>
        </div>
      </div>

      {/* 3D Viewport Window: Smooth Rounded Frame */}
      <div className="relative h-[270px] rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl">
        <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
          <directionalLight position={[-10, -5, -5]} intensity={0.8} color="#00f0ff" />
          <InspectableMesh
            mode={mode}
            metalness={metalness}
            roughness={roughness}
            speed={speed}
          />
        </Canvas>

        <div className="absolute bottom-3 left-3 text-[10px] text-white/60 bg-white/5 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 font-sans tracking-widest uppercase">
          TOPOLOGY: TORUS KNOT • 128x32 POLYS
        </div>
      </div>

      {/* Real-time Material Controls: Frosted Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-white/[0.02] rounded-2xl border border-white/10 text-xs font-sans">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/50">
            METALNESS
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            disabled={mode !== "pbr"}
            value={metalness}
            onChange={(e) => setMetalness(Number(e.target.value))}
            className="w-24 accent-white disabled:opacity-20 cursor-pointer"
          />
          <span className="text-white font-semibold font-mono w-8 text-right">{metalness}</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/50">
            ROUGHNESS
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            disabled={mode !== "pbr"}
            value={roughness}
            onChange={(e) => setRoughness(Number(e.target.value))}
            className="w-24 accent-white disabled:opacity-20 cursor-pointer"
          />
          <span className="text-white font-semibold font-mono w-8 text-right">{roughness}</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/50">
            ROTATION
          </span>
          <input
            type="range"
            min="0"
            max="2.5"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-24 accent-white cursor-pointer"
          />
          <span className="text-white font-semibold font-mono w-8 text-right">{speed}x</span>
        </div>
      </div>

    </div>
  );
}