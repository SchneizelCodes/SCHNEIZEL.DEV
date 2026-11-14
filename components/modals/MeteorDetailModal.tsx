"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCommandCenterStore } from "@/store/useCommandCenterStore";
import { ASTEROID_ARTIFACTS } from "@/components/canvas/MeteorBelts";
import { sound } from "@/lib/sound";
import { X, Cpu, Copy, Check, Terminal } from "lucide-react";
import { useState } from "react";

export function MeteorDetailModal() {
  const selectedMeteorId = useCommandCenterStore((state) => state.selectedMeteorId);
  const setSelectedMeteorId = useCommandCenterStore((state) => state.setSelectedMeteorId);
  const [copied, setCopied] = useState(false);

  const artifact = ASTEROID_ARTIFACTS.find((a) => a.id === selectedMeteorId);

  const handleClose = () => {
    sound.playClick();
    setSelectedMeteorId(null);
  };

  const handleCopy = () => {
    if (!artifact) return;
    navigator.clipboard.writeText(artifact.snippet);
    sound.playClick();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {artifact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
          <div
            onClick={handleClose}
            className="absolute inset-0 pointer-events-auto bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative pointer-events-auto w-full max-w-md rounded-2xl bg-[#090d16]/95 border border-cyan-500/30 p-6 shadow-[0_0_60px_rgba(6,182,212,0.25)] space-y-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-300">
                  {artifact.badge} // Asteroid Monolith
                </span>
              </div>
              <button
                onClick={handleClose}
                className="w-7 h-7 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-1">
                {artifact.name}
              </h3>
              <p className="text-xs text-white/50 font-mono">
                Category: {artifact.category}
              </p>
            </div>

            <p className="text-xs text-white/70 font-light leading-relaxed">
              Orbital debris salvage recovered from the system perimeter. Contains ready-to-run microservices configurations and engineering routines.
            </p>

            {/* Code Snippet Box */}
            <div className="p-3.5 rounded-xl bg-black/80 border border-white/10 text-xs font-mono text-cyan-300/90 flex items-center justify-between gap-3">
              <span className="truncate">{artifact.snippet}</span>
              <button
                onClick={handleCopy}
                className="shrink-0 p-1.5 rounded-md bg-white/5 border border-white/15 text-white/70 hover:text-white transition-all cursor-pointer"
                title="Copy snippet"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
