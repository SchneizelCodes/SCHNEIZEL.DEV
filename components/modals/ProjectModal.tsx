"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import { useCommandCenterStore, CAMERA_PRESETS } from "@/store/useCommandCenterStore";
import { X, ArrowUpRight } from "lucide-react";

export function ProjectModal() {
  const selectedProjectId = useCommandCenterStore((state) => state.selectedProjectId);
  const setSelectedProjectId = useCommandCenterStore((state) => state.setSelectedProjectId);
  const setCameraTarget = useCommandCenterStore((state) => state.setCameraTarget);
  const activeSection = useCommandCenterStore((state) => state.activeSection);

  const project = PROJECTS.find((p) => p.id === selectedProjectId);

  const handleClose = () => {
    setSelectedProjectId(null);
    setCameraTarget(CAMERA_PRESETS[activeSection] || CAMERA_PRESETS.hero);
  };

  // Keyboard shortcut: Press ESC to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProjectId) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProjectId, activeSection]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex justify-end pointer-events-none">
          {/* Transparent Backdrop Click-to-Dismiss Zone (No blur, 3D pod remains 100% crisp) */}
          <div
            onClick={handleClose}
            className="absolute inset-0 pointer-events-auto cursor-pointer bg-transparent"
            title="Click outside to close inspection"
          />

          {/* Slide-out Editorial Drawer */}
          <motion.div
            initial={{ x: "100%", opacity: 0.8 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="relative pointer-events-auto w-full max-w-2xl h-full bg-[#060a12]/95 backdrop-blur-2xl border-l border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.9)] flex flex-col overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-6 bg-[#060a12]/90 backdrop-blur-xl border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-[11px] font-medium tracking-[0.2em] uppercase rounded-full bg-white/5 border border-white/15 text-white/80">
                  {project.category}
                </span>
                <span className="text-xs text-white/40 tracking-[0.2em] font-mono">
                  {project.id.toUpperCase()}
                </span>
              </div>
              <button
                onClick={handleClose}
                className="w-9 h-9 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all cursor-pointer"
                title="Close [ESC]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-8 sm:p-10 space-y-10 flex-1">
              
              {/* Title & Subtitle */}
              <div>
                <h2 className="text-3xl sm:text-4xl font-display font-normal text-white tracking-tight mb-3">
                  {project.title}
                </h2>
                <p className="text-base text-white/60 font-light leading-relaxed">
                  {project.subtitle}
                </p>
              </div>

              {/* Engineering Metrics Row (Clean Borderless Hairlines) */}
              <div className="grid grid-cols-3 gap-6 py-6 border-y border-white/10">
                {project.metrics.map((metric, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase mb-2">
                      {metric.label}
                    </span>
                    <span className="text-xl sm:text-2xl font-light text-white tracking-tight">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Executive Summary */}
              <div className="space-y-3">
                <span className="text-xs font-semibold tracking-[0.25em] text-white/50 uppercase block">
                  Architecture Overview
                </span>
                <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
                  {project.summary}
                </p>
              </div>

              {/* Subsystem Specifications (Open Breathable 2-Column Grid) */}
              <div className="space-y-4">
                <span className="text-xs font-semibold tracking-[0.25em] text-white/50 uppercase block">
                  Core Subsystems
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                    <span className="text-[10px] tracking-[0.25em] text-white/40 block mb-1.5 uppercase">
                      Frontend Layer
                    </span>
                    <span className="text-sm text-white/90 font-light">
                      {project.architecture.frontend}
                    </span>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                    <span className="text-[10px] tracking-[0.25em] text-white/40 block mb-1.5 uppercase">
                      Backend & Runtime
                    </span>
                    <span className="text-sm text-white/90 font-light">
                      {project.architecture.backend}
                    </span>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                    <span className="text-[10px] tracking-[0.25em] text-white/40 block mb-1.5 uppercase">
                      Persistence & DB
                    </span>
                    <span className="text-sm text-white/90 font-light">
                      {project.architecture.database}
                    </span>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                    <span className="text-[10px] tracking-[0.25em] text-white/40 block mb-1.5 uppercase">
                      External APIs
                    </span>
                    <span className="text-sm text-cyan-300 font-light">
                      {project.architecture.apis.join(" • ")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tech Matrix Pill Cloud */}
              <div className="space-y-3">
                <span className="text-xs font-semibold tracking-[0.25em] text-white/50 uppercase block">
                  Tech Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3.5 py-1.5 rounded-full text-xs text-white/70 bg-white/[0.04] border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Solid High-Contrast Pill CTA (WayWild Style) */}
              <div className="pt-6 flex flex-wrap items-center gap-4 border-t border-white/10">
                {project.links.liveDemo && (
                  <a
                    href={project.links.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-white text-slate-950 text-xs font-semibold tracking-wider hover:bg-slate-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                  >
                    <span>LAUNCH PRODUCTION ENGINE</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-white/5 border border-white/15 text-white text-xs font-medium tracking-wider hover:bg-white/10 hover:border-white/30 transition-all"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    <span>SOURCE CODE</span>
                  </a>
                )}
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}