"use client";

import { motion } from "framer-motion";
import { useCommandCenterStore } from "@/store/useCommandCenterStore";
import { sound } from "@/lib/sound";

export function SkyShiftToggle() {
  const isDayMode = useCommandCenterStore((state) => state.isDayMode);
  const toggleDayMode = useCommandCenterStore((state) => state.toggleDayMode);

  const handleToggle = () => {
    sound.playWhoosh();
    toggleDayMode();
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative w-16 h-8 rounded-full p-1 cursor-pointer transition-colors duration-500 overflow-hidden border ${
        isDayMode
          ? "bg-gradient-to-r from-sky-400 to-blue-500 border-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.5)]"
          : "bg-gradient-to-r from-[#070b14] to-[#0f172a] border-cyan-500/30 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
      }`}
      title={isDayMode ? "Switch to Cyber Night" : "Switch to Studio Day"}
    >
      {/* Background World Details */}
      {isDayMode ? (
        // Day Mode: Drifting Clouds
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-end pr-2 pointer-events-none"
        >
          <div className="w-5 h-2 bg-white/70 rounded-full blur-[0.5px]" />
          <div className="w-3 h-2 bg-white/90 rounded-full -ml-1.5 -mt-1 blur-[0.5px]" />
        </motion.div>
      ) : (
        // Night Mode: Twinkling Stars
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 pointer-events-none"
        >
          <span className="absolute top-1.5 left-2 w-0.5 h-0.5 rounded-full bg-cyan-200 animate-ping" />
          <span className="absolute bottom-2 left-4 w-1 h-1 rounded-full bg-white/80" />
          <span className="absolute top-3.5 left-7 w-0.5 h-0.5 rounded-full bg-amber-200" />
        </motion.div>
      )}

      {/* Sliding Celestial Thumb (Sun <-> Moon) */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 450, damping: 30 }}
        className={`w-6 h-6 rounded-full flex items-center justify-center relative z-10 ${
          isDayMode
            ? "translate-x-8 bg-gradient-to-tr from-amber-400 to-yellow-300 shadow-[0_0_10px_rgba(251,191,36,0.8)]"
            : "translate-x-0 bg-gradient-to-tr from-slate-200 to-white shadow-[0_0_8px_rgba(255,255,255,0.7)]"
        }`}
      >
        {isDayMode ? (
          // Mini Golden Sun Core
          <div className="w-2.5 h-2.5 rounded-full bg-amber-200" />
        ) : (
          // Cratered Crescent Moon Shadow
          <div className="w-4 h-4 rounded-full relative overflow-hidden bg-slate-300">
            <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#0a101d]" />
          </div>
        )}
      </motion.div>
    </button>
  );
}