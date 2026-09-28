"use client";

import { useCommandCenterStore, AtmosphereMode } from "@/store/useCommandCenterStore";
import { sound } from "@/lib/sound";

const ATMOSPHERE_DOTS: {
  id: AtmosphereMode;
  label: string;
  color: string;
  glow: string;
}[] = [
  {
    id: "cyanVoid",
    label: "Cyber Void",
    color: "bg-cyan-400",
    glow: "shadow-[0_0_12px_rgba(0,240,255,0.7)]",
  },
  {
    id: "solarGold",
    label: "Solar Gold",
    color: "bg-amber-400",
    glow: "shadow-[0_0_12px_rgba(245,158,11,0.7)]",
  },
  {
    id: "blueprintCad",
    label: "CAD Blueprint",
    color: "bg-blue-500",
    glow: "shadow-[0_0_12px_rgba(59,130,246,0.7)]",
  },
  {
    id: "matrixEmerald",
    label: "Matrix Terminal",
    color: "bg-emerald-400",
    glow: "shadow-[0_0_12px_rgba(16,185,129,0.7)]",
  },
];

export function AtmosphereSelector() {
  const atmosphere = useCommandCenterStore((state) => state.atmosphere);
  const setAtmosphere = useCommandCenterStore((state) => state.setAtmosphere);

  const handleSelect = (env: AtmosphereMode) => {
    sound.playWhoosh();
    setAtmosphere(env);
  };

  return (
    <div className="flex items-center gap-1.5 hud-panel px-2.5 py-2 rounded-sm border border-slate-800">
      {ATMOSPHERE_DOTS.map((env) => {
        const isActive = atmosphere === env.id;
        return (
          <button
            key={env.id}
            onClick={() => handleSelect(env.id)}
            onMouseEnter={() => sound.playHover()}
            className={`w-3.5 h-3.5 rounded-full ${env.color} transition-all duration-300 cursor-pointer ${
              isActive
                ? `scale-125 ring-2 ring-white/70 ${env.glow} opacity-100`
                : "opacity-40 hover:opacity-90 hover:scale-110"
            }`}
            title={`Switch to ${env.label} Atmosphere`}
          />
        );
      })}
    </div>
  );
}