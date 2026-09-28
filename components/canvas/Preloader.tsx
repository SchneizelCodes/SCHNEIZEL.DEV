"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Activity } from "lucide-react";

export function Preloader() {
  const { progress, active } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  // Smooth artificial acceleration to 100% for crisp UX
  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsDone(true), 400);
          return 100;
        }
        const target = Math.max(progress, prev + 4);
        return Math.min(target, 100);
      });
    }, 30);

    return () => clearInterval(timer);
  }, [progress]);

  if (isDone) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.6 } }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05070a] text-slate-100 font-mono select-none px-6"
      >
        <div className="w-full max-w-md space-y-6">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
              <span className="text-xs font-bold tracking-widest text-slate-200">
                SCHNEIZEL // CORE BOOT
              </span>
            </div>
            <span className="text-xs text-cyan-400 font-bold">
              {Math.round(displayProgress)}%
            </span>
          </div>

          {/* Progress Bar Track */}
          <div className="relative w-full h-2 bg-slate-900 rounded-sm overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 shadow-[0_0_15px_rgba(0,240,255,0.6)]"
              style={{ width: `${displayProgress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>

          {/* Diagnostic Console Messages */}
          <div className="space-y-1 text-[11px] text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              <span>PARSING SHADER BUFFERS & WEBGL KERNEL</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              <span>SYNCHRONIZING ZUSTAND 3D BRIDGE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={displayProgress >= 80 ? "text-emerald-400" : "text-amber-400"}>
                {displayProgress >= 80 ? "✓" : "▶"}
              </span>
              <span>
                {displayProgress >= 100
                  ? "SYSTEM READY // QUANTUM CORE OPERATIONAL"
                  : "ALLOCATING GEOMETRIC INSTANCES..."}
              </span>
            </div>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}