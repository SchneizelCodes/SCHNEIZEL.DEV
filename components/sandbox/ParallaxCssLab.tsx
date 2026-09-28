"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Sparkles, Copy, Check, Sliders, Eye } from "lucide-react";
import { sound } from "@/lib/sound";

interface ParallaxCoordinates {
  x: number;
  y: number;
}

export function ParallaxCssLab() {
  // Time scrub value: 0 (Dawn) -> 33 (Noon) -> 66 (Sunset) -> 100 (Deep Night)
  const [timeValue, setTimeValue] = useState<number>(66);
  const [mousePos, setMousePos] = useState<ParallaxCoordinates>({ x: 0, y: 0 });
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalized time factors (0 to 1)
  const t = timeValue / 100;

  // Handle smooth mouse parallax inside the frame
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: nx, y: ny });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Preset selector
  const setPreset = (val: number) => {
    sound.playClick();
    setTimeValue(val);
  };

  const copyCode = (code: string, index: number) => {
    sound.playClick();
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  // Color interpolations based on time of day
  // Dawn: #f59e0b / #7c3aed
  // Noon: #38bdf8 / #1e3a8a
  // Sunset: #ea580c / #311042
  // Night: #050814 / #02040a
  const getSkyGradient = () => {
    if (t < 0.3) {
      // Dawn
      return "from-amber-600 via-rose-800 to-indigo-950";
    } else if (t < 0.6) {
      // Noon
      return "from-sky-400 via-blue-600 to-slate-900";
    } else if (t < 0.85) {
      // Sunset
      return "from-amber-500 via-orange-600 via-purple-900 to-[#070b19]";
    } else {
      // Deep Night
      return "from-[#080d21] via-[#040612] to-[#010206]";
    }
  };

  // Calculated transform CSS strings for the live code inspector
  const layer1Transform = `translate3d(${(mousePos.x * 12).toFixed(1)}px, ${(mousePos.y * 6).toFixed(1)}px, 0px)`;
  const layer2Transform = `translate3d(${(mousePos.x * 24).toFixed(1)}px, ${(mousePos.y * 12).toFixed(1)}px, 0px)`;
  const layer3Transform = `translate3d(${(mousePos.x * 40).toFixed(1)}px, ${(mousePos.y * 20).toFixed(1)}px, 0px)`;
  const sunMoonTransform = `translate3d(${(mousePos.x * 8).toFixed(1)}px, ${(mousePos.y * 4 + (t * 80 - 20)).toFixed(1)}px, 0px)`;

  const transformCodeSnippet = `/* Layer 03 // Foreground Silhouette */
.parallax-foreground {
  transform: ${layer3Transform};
  transition: transform 0.12s cubic-bezier(0.2, 0, 0.2, 1);
  will-change: transform;
}

/* Layer 02 // Mid-Range Ridge */
.parallax-ridge {
  transform: ${layer2Transform};
  filter: brightness(${(1.1 - t * 0.5).toFixed(2)});
}`;

  const environmentCodeSnippet = `/* Sky Atmosphere Matrix (T: ${timeValue}%) */
.sky-atmosphere {
  background: linear-gradient(180deg, ${
    t < 0.3
      ? "#f59e0b 0%, #9f1239 50%, #1e1b4b 100%"
      : t < 0.6
      ? "#38bdf8 0%, #2563eb 50%, #0f172a 100%"
      : t < 0.85
      ? "#f97316 0%, #7e22ce 60%, #050814 100%"
      : "#080d21 0%, #030612 70%, #010206 100%"
  });
  backdrop-filter: blur(24px);
  sun-opacity: ${(Math.max(0, 1 - t * 1.4)).toFixed(2)};
  moon-opacity: ${(Math.max(0, (t - 0.5) * 2)).toFixed(2)};
}`;

  return (
    <div className="flex flex-col gap-6">
      {/* Control Strip & Info: Luxury Glass Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/[0.03] p-4 sm:px-6 rounded-2xl border border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Sliders className="w-4 h-4 text-white/80" />
          <span className="font-sans text-xs text-white uppercase font-semibold tracking-[0.2em]">
            ATMOSPHERIC PARALLAX
          </span>
          <span className="font-sans text-[10px] font-semibold text-white/80 px-3 py-1 rounded-full bg-white/5 border border-white/15 tracking-wider uppercase">
            {timeValue < 25 ? "06:00 DAWN" : timeValue < 55 ? "12:00 NOON" : timeValue < 80 ? "18:45 SUNSET" : "23:30 NIGHT"}
          </span>
        </div>

        {/* Preset Buttons: Rounded-Full Luxury Switchers */}
        <div className="flex items-center gap-1.5 p-1 rounded-full border border-white/10 bg-black/20">
          <button
            onClick={() => setPreset(15)}
            className={`px-3.5 py-1 rounded-full text-xs font-sans tracking-wider uppercase transition-all cursor-pointer ${
              timeValue <= 25 ? "bg-white text-slate-950 font-semibold shadow-[0_0_15px_rgba(255,255,255,0.3)]" : "text-white/50 hover:text-white"
            }`}
          >
            Dawn
          </button>
          <button
            onClick={() => setPreset(45)}
            className={`px-3.5 py-1 rounded-full text-xs font-sans tracking-wider uppercase transition-all cursor-pointer ${
              timeValue > 25 && timeValue <= 60 ? "bg-white text-slate-950 font-semibold shadow-[0_0_15px_rgba(255,255,255,0.3)]" : "text-white/50 hover:text-white"
            }`}
          >
            Noon
          </button>
          <button
            onClick={() => setPreset(72)}
            className={`px-3.5 py-1 rounded-full text-xs font-sans tracking-wider uppercase transition-all cursor-pointer ${
              timeValue > 60 && timeValue <= 85 ? "bg-white text-slate-950 font-semibold shadow-[0_0_15px_rgba(255,255,255,0.3)]" : "text-white/50 hover:text-white"
            }`}
          >
            Sunset
          </button>
          <button
            onClick={() => setPreset(95)}
            className={`px-3.5 py-1 rounded-full text-xs font-sans tracking-wider uppercase transition-all cursor-pointer ${
              timeValue > 85 ? "bg-white text-slate-950 font-semibold shadow-[0_0_15px_rgba(255,255,255,0.3)]" : "text-white/50 hover:text-white"
            }`}
          >
            Night
          </button>
        </div>
      </div>

      {/* Scrub Slider: Sleek Frosted Bar */}
      <div className="flex items-center gap-4 px-4 py-3 rounded-2xl border border-white/10 bg-white/[0.02]">
        <Sun className="w-4 h-4 text-amber-300" />
        <input
          type="range"
          min="0"
          max="100"
          value={timeValue}
          onChange={(e) => setTimeValue(Number(e.target.value))}
          className="w-full accent-white cursor-pointer h-1.5 bg-white/10 rounded-lg appearance-none"
        />
        <Moon className="w-4 h-4 text-indigo-300" />
      </div>

      {/* ========================================================= */}
      {/* 3D PARALLAX INTERACTIVE STAGE                             */}
      {/* ========================================================= */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[340px] sm:h-[380px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-crosshair select-none"
      >
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/20 backdrop-blur-md text-[10px] font-sans font-medium text-white/80 uppercase tracking-widest shadow-lg">
            <Eye className="w-3 h-3 text-cyan-300" />
            <span>INTERACTIVE PARALLAX</span>
          </div>
        </div>
        {/* Layer 0: Sky Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-b ${getSkyGradient()} transition-colors duration-700`}
        />

        {/* Stars (fade in during twilight and night) */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{ opacity: Math.max(0, (t - 0.45) * 2) }}
        >
          {/* Constellation Nodes */}
          <div className="absolute top-8 left-16 w-1 h-1 bg-white rounded-full animate-ping" />
          <div className="absolute top-12 left-1/4 w-1.5 h-1.5 bg-white/90 rounded-full" />
          <div className="absolute top-20 left-1/3 w-1 h-1 bg-cyan-200 rounded-full" />
          <div className="absolute top-10 right-1/3 w-1 h-1 bg-amber-100 rounded-full" />
          <div className="absolute top-16 right-1/5 w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          <div className="absolute top-6 right-12 w-1 h-1 bg-blue-200 rounded-full" />
          <div className="absolute top-28 right-1/2 w-0.5 h-0.5 bg-white/70 rounded-full" />

          {/* Shooting Star Streak */}
          {t > 0.7 && (
            <motion.div
              initial={{ x: 200, y: -20, opacity: 0 }}
              animate={{ x: -100, y: 120, opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, repeatDelay: 4 }}
              className="absolute top-4 right-1/4 w-24 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-200 to-white -rotate-35 blur-[0.5px]"
            />
          )}
        </div>

        {/* Celestial Body: Sun & Moon */}
        <div
          className="absolute left-1/2 -ml-16 pointer-events-none transition-transform duration-75"
          style={{
            transform: sunMoonTransform,
            top: `${Math.min(260, 40 + t * 200)}px`,
          }}
        >
          {/* The Golden Solar Orb (Visible day/sunset) */}
          <div
            className="w-32 h-32 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-200 to-white shadow-[0_0_80px_rgba(251,191,36,0.9)] transition-opacity duration-700 flex items-center justify-center"
            style={{ opacity: Math.max(0, 1 - t * 1.4) }}
          >
            <div className="w-24 h-24 rounded-full bg-amber-300/40 blur-md" />
          </div>

          {/* The Crescent Moon (Visible twilight/night) */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-700"
            style={{ opacity: Math.max(0, (t - 0.5) * 2) }}
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-slate-200 to-white shadow-[0_0_50px_rgba(255,255,255,0.7)] relative overflow-hidden">
              {/* Moon shadow for crescent look */}
              <div className="absolute -top-1 -right-2 w-18 h-18 rounded-full bg-[#050814]" />
            </div>
          </div>
        </div>

        {/* Layer 1: High Cirrus Clouds */}
        <div
          className="absolute inset-x-0 top-12 pointer-events-none transition-transform duration-75"
          style={{
            transform: `translate3d(${(mousePos.x * 8).toFixed(1)}px, ${(mousePos.y * 4).toFixed(1)}px, 0px)`,
            opacity: t > 0.85 ? 0.25 : 0.65,
          }}
        >
          <div className="w-72 h-8 bg-white/20 blur-xl rounded-full absolute left-12" />
          <div className="w-96 h-12 bg-white/25 blur-2xl rounded-full absolute right-20 -top-4" />
        </div>

        {/* Flocks of Flying Birds / Recon Drones (Sunset peak) */}
        {t > 0.4 && t < 0.88 && (
          <div
            className="absolute top-24 left-1/3 pointer-events-none flex gap-4 transition-transform duration-100"
            style={{
              transform: `translate3d(${(mousePos.x * -18).toFixed(1)}px, ${(mousePos.y * -8).toFixed(1)}px, 0px)`,
            }}
          >
            <div className="w-3 h-1.5 border-t-2 border-r-2 border-slate-900 -rotate-45" />
            <div className="w-2.5 h-1 border-t-2 border-r-2 border-slate-900 -rotate-45 mt-2" />
            <div className="w-2 h-1 border-t-2 border-r-2 border-slate-900 -rotate-45 -mt-1" />
          </div>
        )}

        {/* Layer 2: Distant Grand Mountain Range */}
        <svg
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-[110%] -left-[5%] h-56 transition-transform duration-75 pointer-events-none"
          style={{
            transform: layer1Transform,
            fill: t > 0.8 ? "#090f24" : t > 0.6 ? "#431c38" : t > 0.3 ? "#1e3a6a" : "#63273a",
            opacity: 0.9,
          }}
        >
          <polygon points="0,400 0,180 180,90 350,220 520,70 700,190 880,80 1040,170 1200,120 1200,400" />
        </svg>

        {/* Layer 3: Mid-Range Jagged Ridges */}
        <svg
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-[115%] -left-[7%] h-44 transition-transform duration-75 pointer-events-none"
          style={{
            transform: layer2Transform,
            fill: t > 0.8 ? "#050817" : t > 0.6 ? "#290c2a" : t > 0.3 ? "#132549" : "#3d1326",
          }}
        >
          <polygon points="0,400 0,220 140,150 280,240 460,130 640,210 780,120 960,200 1100,140 1200,190 1200,400" />
        </svg>

        {/* Layer 4: Foreground Silhouette Peaks & Forest Ridge */}
        <svg
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-[120%] -left-[10%] h-32 transition-transform duration-75 pointer-events-none"
          style={{
            transform: layer3Transform,
            fill: "#020409",
          }}
        >
          <polygon points="0,400 0,260 90,200 210,290 360,180 500,270 660,170 820,260 980,160 1120,230 1200,190 1200,400" />
        </svg>

        {/* Bottom Ambient Glow Line */}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

        {/* Interactive Indicator Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/60 backdrop-blur border border-slate-700 text-[10px] font-mono text-cyan-300">
          <Eye className="w-3 h-3 text-cyan-400" />
          <span>DRAG MOUSE FOR 3D PERSPECTIVE PARALLAX</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* LIVE CODE INSPECTION PANELS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Transform Matrix Inspector */}
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 relative group backdrop-blur-xl">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
            <span className="font-sans text-xs font-semibold tracking-wider text-white uppercase">
              CSS TRANSFORM MATRIX
            </span>
            <button
              onClick={() => copyCode(transformCodeSnippet, 1)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-[10px] font-sans tracking-wider text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer shadow-sm"
            >
              {copiedIndex === 1 ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>COPY CSS</span>
                </>
              )}
            </button>
          </div>
          <pre className="font-mono text-[11px] text-white/70 overflow-x-auto leading-relaxed whitespace-pre-wrap select-all">
            {transformCodeSnippet}
          </pre>
        </div>

        {/* Environment Filter & Atmosphere Inspector */}
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 relative group backdrop-blur-xl">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
            <span className="font-sans text-xs font-semibold tracking-wider text-white uppercase">
              ATMOSPHERIC FILTER MATRIX
            </span>
            <button
              onClick={() => copyCode(environmentCodeSnippet, 2)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-[10px] font-sans tracking-wider text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer shadow-sm"
            >
              {copiedIndex === 2 ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>COPY CSS</span>
                </>
              )}
            </button>
          </div>
          <pre className="font-mono text-[11px] text-white/70 overflow-x-auto leading-relaxed whitespace-pre-wrap select-all">
            {environmentCodeSnippet}
          </pre>
        </div>

      </div>
    </div>
  );
}
