"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import { useCommandCenterStore } from "@/store/useCommandCenterStore";
import { ExternalLink, Layers, Cpu, ArrowRight, Eye } from "lucide-react";
export function FastTrackView() {
  const mode = useCommandCenterStore((state) => state.mode);
  const setMode = useCommandCenterStore((state) => state.setMode);
  const setSelectedProjectId = useCommandCenterStore((state) => state.setSelectedProjectId);

  if (mode !== "fastTrack") return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-40 bg-[#05070a]/95 backdrop-blur-xl overflow-y-auto pt-24 pb-20 px-4 sm:px-8"
      >
        <div className="max-w-6xl mx-auto space-y-10">
          
          {/* Header Banner: Editorial Dossier Headline & Luxury Glass Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-3 rounded-full bg-white/5 border border-white/15 text-[11px] font-medium text-white/80 uppercase tracking-widest backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                EXECUTIVE ENGINEERING DOSSIER
              </div>
              <h1 className="font-display text-3xl sm:text-5xl text-white uppercase tracking-tight">
                SYSTEMS & ENGINEERING DOSSIER
              </h1>
              <p className="text-sm text-white/60 font-sans mt-2 max-w-xl leading-relaxed">
                Direct access to architecture specifications, live production metrics, and source repositories.
              </p>
            </div>

            <button
              onClick={() => setMode("spatial")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-950 hover:bg-slate-200 transition-all font-semibold text-xs tracking-wider cursor-pointer whitespace-nowrap shadow-[0_0_25px_rgba(255,255,255,0.25)] self-start sm:self-center"
            >
              <Eye className="w-4 h-4 text-slate-950" />
              <span>RETURN TO 3D SPATIAL</span>
            </button>
          </div>

          {/* High-Density Project Grid: Luxury Editorial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((project, idx) => (
              <div
                key={project.id}
                className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/25 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between group shadow-2xl backdrop-blur-xl"
              >
                <div>
                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono tracking-[0.2em] text-white/50 uppercase">
                      0{idx + 1} // {project.category}
                    </span>
                    <span
                      className={`text-[10px] font-sans font-semibold px-3 py-1 rounded-full uppercase tracking-wider border ${
                        project.status === "PRODUCTION"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : project.status === "ACTIVE"
                          ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                          : "bg-amber-500/10 text-amber-300 border-amber-500/30"
                      }`}
                    >
                      {project.status.replace("_", " ")}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="font-display text-2xl sm:text-3xl text-white group-hover:text-cyan-200 transition-colors mb-1 tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs font-sans text-white/50 mb-5 tracking-wide">
                    {project.subtitle}
                  </p>

                  {/* Metrics Bar: Clean Hairline Dividers */}
                  <div className="grid grid-cols-3 gap-4 py-3.5 my-4 border-y border-white/10">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="flex flex-col">
                        <span className="text-[10px] font-sans uppercase tracking-wider text-white/40">{m.label}</span>
                        <span className="text-sm font-semibold text-white mt-0.5">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6 font-sans">
                    {project.summary}
                  </p>

                  {/* Tech Badges: Delicate Rounded-Full Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-[10px] font-sans tracking-wide bg-white/5 text-white/70 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between pt-5 border-t border-white/10">
                  <button
                    onClick={() => setSelectedProjectId(project.id)}
                    className="flex items-center gap-2 text-xs font-sans tracking-wider uppercase text-white/80 hover:text-white transition-colors cursor-pointer group-hover:translate-x-1 duration-200"
                  >
                    <span>INSPECT ARCHITECTURE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2.5">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 rounded-full bg-white/5 border border-white/15 text-white/70 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all flex items-center justify-center cursor-pointer shadow-sm"
                        title="GitHub Source"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                    {project.links.liveDemo && (
                      <a
                        href={project.links.liveDemo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-slate-950 font-sans font-semibold text-xs tracking-wider hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>LIVE DEMO</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}