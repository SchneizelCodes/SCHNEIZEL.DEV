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
    <div className="space-y-4 font-mono text-xs">
      
      {/* Top Pass Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-950/80 rounded-sm border border-slate-800">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-300 font-bold">SHADER PASS:</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setMode("pbr")}
            className={`px-3 py-1.5 rounded-sm transition-all cursor-pointer ${
              mode === "pbr"
                ? "bg-cyan-500 text-black font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            PBR METALLIC
          </button>
          <button
            onClick={() => setMode("normal")}
            className={`px-3 py-1.5 rounded-sm transition-all cursor-pointer ${
              mode === "normal"
                ? "bg-cyan-500 text-black font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            NORMAL MAP
          </button>
          <button
            onClick={() => setMode("wireframe")}
            className={`px-3 py-1.5 rounded-sm transition-all cursor-pointer ${
              mode === "wireframe"
                ? "bg-cyan-500 text-black font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            WIREFRAME
          </button>
        </div>
      </div>

      {/* 3D Viewport Window */}
      <div className="relative h-[260px] rounded-sm overflow-hidden border border-cyan-500/20 bg-[#05080f] shadow-inner">
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

        <div className="absolute bottom-2 left-2 text-[10px] text-slate-500 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
          TOPOLOGY: TORUS_KNOT // 128x32 POLYS
        </div>
      </div>

      {/* Real-time Material Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-950/60 rounded-sm border border-slate-800">
        <div className="flex items-center justify-between gap-2">
          <span className="text-slate-400">METALNESS:</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            disabled={mode !== "pbr"}
            value={metalness}
            onChange={(e) => setMetalness(Number(e.target.value))}
            className="w-24 accent-cyan-400 disabled:opacity-30 cursor-pointer"
          />
          <span className="text-cyan-400 w-8 text-right">{metalness}</span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-slate-400">ROUGHNESS:</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            disabled={mode !== "pbr"}
            value={roughness}
            onChange={(e) => setRoughness(Number(e.target.value))}
            className="w-24 accent-cyan-400 disabled:opacity-30 cursor-pointer"
          />
          <span className="text-cyan-400 w-8 text-right">{roughness}</span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-slate-400">ROTATION:</span>
          <input
            type="range"
            min="0"
            max="2.5"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-24 accent-cyan-400 cursor-pointer"
          />
          <span className="text-cyan-400 w-8 text-right">{speed}x</span>
        </div>
      </div>

    </div>
  );
}