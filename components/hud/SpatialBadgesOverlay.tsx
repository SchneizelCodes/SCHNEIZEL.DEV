"use client";

import { PROJECTS } from "@/data/projects";
import { useBadgeStore } from "@/store/useBadgeStore";
import { useCommandCenterStore, CoreTheme } from "@/store/useCommandCenterStore";

const THEME_COLORS: Record<CoreTheme, string> = {
  cyan: "#00f0ff",
  emerald: "#10b981",
  amber: "#f59e0b",
};

export function SpatialBadgesOverlay() {
  const positions = useBadgeStore((state) => state.positions);
  const selectedProjectId = useCommandCenterStore((state) => state.selectedProjectId);
  const setSelectedProjectId = useCommandCenterStore((state) => state.setSelectedProjectId);
  const setCameraTarget = useCommandCenterStore((state) => state.setCameraTarget);
  const mode = useCommandCenterStore((state) => state.mode);

  if (mode === "fastTrack") return null;

  const handleSelect = (project: typeof PROJECTS[0]) => {
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

        return (
          <div
            key={project.id}
            style={{
              transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
            }}
            onClick={() => handleSelect(project)}
            className={`absolute top-0 left-0 pointer-events-auto cursor-pointer transition-all duration-200 px-3 py-1.5 rounded-sm font-mono text-[10px] whitespace-nowrap tracking-wider border backdrop-blur-md shadow-lg ${
              isSelected
                ? "bg-cyan-950/95 text-white border-cyan-300 shadow-[0_0_25px_rgba(0,240,255,0.6)] scale-110"
                : "bg-[#070c14]/90 text-slate-300 border-slate-700/70 hover:border-cyan-400 hover:text-cyan-200 hover:scale-105"
            }`}
          >
            <span className="text-cyan-400 font-bold mr-1.5">0{index + 1} //</span>
            <span>{project.title}</span>
            {project.status === "IN_DEVELOPMENT" && (
              <span className="ml-2 px-1.5 py-0.5 text-[8px] font-bold bg-amber-950/80 text-amber-400 border border-amber-500/40 rounded-sm">
                R&D
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}