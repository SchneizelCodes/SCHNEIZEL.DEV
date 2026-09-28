"use client";

import { PROJECTS } from "@/data/projects";
import { useBadgeStore } from "@/store/useBadgeStore";
import { useCommandCenterStore } from "@/store/useCommandCenterStore";
import { sound } from "@/lib/sound";
import { ArrowUpRight } from "lucide-react";

export function SpatialBadgesOverlay() {
  const positions = useBadgeStore((state) => state.positions);
  const selectedProjectId = useCommandCenterStore((state) => state.selectedProjectId);
  const setSelectedProjectId = useCommandCenterStore((state) => state.setSelectedProjectId);
  const setCameraTarget = useCommandCenterStore((state) => state.setCameraTarget);
  const mode = useCommandCenterStore((state) => state.mode);
  const activeSection = useCommandCenterStore((state) => state.activeSection);

  if (mode === "fastTrack") return null;

  const isProjectsActive = activeSection === "projects";

  const handleSelect = (project: typeof PROJECTS[0]) => {
    sound.playClick();
    setSelectedProjectId(project.id);
    setCameraTarget({
      position: [
        project.spatialPosition[0] - 1.4,
        project.spatialPosition[1],
        project.spatialPosition[2] + 2.2,
      ],
      target: [
        project.spatialPosition[0],
        project.spatialPosition[1],
        project.spatialPosition[2],
      ],
    });
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {PROJECTS.map((project, index) => {
        const pos = positions[project.id];
        if (!pos || !pos.visible) return null;

        const isSelected = selectedProjectId === project.id;
        const shouldShow = isProjectsActive || isSelected;

        return (
          <div
            key={project.id}
            style={{
              transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
            }}
            onClick={() => handleSelect(project)}
            onMouseEnter={() => sound.playHover()}
            className={`group absolute top-0 left-0 transition-all duration-500 px-4 py-2 rounded-full border backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center gap-2.5 select-none ${
              shouldShow ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none scale-90"
            } ${
              isSelected
                ? "bg-white text-slate-950 border-white shadow-[0_0_35px_rgba(255,255,255,0.6)] scale-110"
                : "bg-black/60 text-white/90 border-white/20 hover:border-white hover:bg-white hover:text-slate-950 hover:scale-105"
            }`}
          >
            {/* Index number indicator */}
            <span
              className={`text-[10px] font-mono tracking-widest uppercase transition-colors ${
                isSelected
                  ? "text-slate-500 font-bold"
                  : "text-white/40 group-hover:text-slate-500"
              }`}
            >
              0{index + 1}
            </span>

            {/* Glowing active status dot */}
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                isSelected
                  ? "bg-slate-950 animate-ping"
                  : project.status === "PRODUCTION"
                  ? "bg-emerald-400 group-hover:bg-slate-950"
                  : "bg-cyan-400 group-hover:bg-slate-950"
              }`}
            />

            {/* Clean Punchy Project Title */}
            <span className="tracking-[0.18em] uppercase text-xs font-semibold">
              {project.title}
            </span>

            {/* R&D Badge if In Development */}
            {project.status === "IN_DEVELOPMENT" && (
              <span
                className={`px-2 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wider transition-colors ${
                  isSelected
                    ? "bg-amber-100 text-amber-900 border border-amber-300"
                    : "bg-amber-500/20 text-amber-300 border border-amber-500/40 group-hover:bg-amber-200 group-hover:text-amber-950"
                }`}
              >
                R&D
              </span>
            )}

            {/* Luxury Interactive Arrow */}
            <ArrowUpRight
              className={`w-3.5 h-3.5 transition-transform duration-300 ${
                isSelected
                  ? "text-slate-950 translate-x-0.5 -translate-y-0.5"
                  : "text-white/50 group-hover:text-slate-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              }`}
            />
          </div>
        );
      })}
    </div>
  );
}