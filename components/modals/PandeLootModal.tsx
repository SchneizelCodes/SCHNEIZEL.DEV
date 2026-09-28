"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCommandCenterStore } from "@/store/useCommandCenterStore";
import { sound } from "@/lib/sound";
import { X, Gift, Sparkles, Award, RotateCcw } from "lucide-react";

interface CrateItem {
  id: string;
  name: string;
  category: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  accent: string;
  badge: string;
}

const ITEMS_POOL: CrateItem[] = [
  { id: "1", name: "Next.js 15 SSR Spec", category: "Architecture", rarity: "common", accent: "border-slate-600 bg-slate-900/60 text-slate-300", badge: "COMMON" },
  { id: "2", name: "Tailwind v4 Token Kit", category: "Design System", rarity: "common", accent: "border-slate-600 bg-slate-900/60 text-slate-300", badge: "COMMON" },
  { id: "3", name: "Supabase RLS Shield", category: "Security", rarity: "rare", accent: "border-purple-500/60 bg-purple-950/40 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]", badge: "RARE" },
  { id: "4", name: "PayMongo Webhook Node", category: "FinTech", rarity: "rare", accent: "border-purple-500/60 bg-purple-950/40 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]", badge: "RARE" },
  { id: "5", name: "Sub-15ms WebSocket Engine", category: "Real-Time", rarity: "epic", accent: "border-cyan-400 bg-cyan-950/50 text-cyan-200 shadow-[0_0_20px_rgba(0,240,255,0.4)]", badge: "EPIC" },
  { id: "6", name: "Blender Draco glTF Pipeline", category: "3D Graphics", rarity: "epic", accent: "border-cyan-400 bg-cyan-950/50 text-cyan-200 shadow-[0_0_20px_rgba(0,240,255,0.4)]", badge: "EPIC" },
  { id: "7", name: "★ JOSHUA CAMACHO MASTER PASS ★", category: "LEGENDARY ARTIFACT", rarity: "legendary", accent: "border-amber-400 bg-gradient-to-b from-amber-950/80 to-slate-950 text-amber-200 shadow-[0_0_30px_rgba(245,158,11,0.6)] animate-pulse", badge: "★ LEGENDARY ★" },
];

export function PandeLootModal() {
  const isLootBoxOpen = useCommandCenterStore((state) => state.isLootBoxOpen);
  const setIsLootBoxOpen = useCommandCenterStore((state) => state.setIsLootBoxOpen);

  const [reel, setReel] = useState<CrateItem[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winningItem, setWinningItem] = useState<CrateItem | null>(null);
  const [spinOffset, setSpinOffset] = useState(0);

  const ITEM_WIDTH = 180; // px
  const WINNING_INDEX = 38; // target item index

  // Generate randomized track on mount or reset
  const generateReel = () => {
    const list: CrateItem[] = [];
    for (let i = 0; i < 45; i++) {
      if (i === WINNING_INDEX) {
        // Guarantee winning item is high-tier
        list.push(ITEMS_POOL[6]); // Legendary Master Pass!
      } else {
        const rand = Math.floor(Math.random() * (ITEMS_POOL.length - 1));
        list.push(ITEMS_POOL[rand]);
      }
    }
    setReel(list);
    setSpinOffset(0);
    setWinningItem(null);
  };

  useEffect(() => {
    if (isLootBoxOpen) {
      generateReel();
    }
  }, [isLootBoxOpen]);

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWinningItem(null);

    // Calculate exact scroll distance so WINNING_INDEX lands on central needle
    // Center needle is in the middle of a ~750px viewport (~375px)
    const containerCenter = 375;
    const targetOffset = -(WINNING_INDEX * ITEM_WIDTH + ITEM_WIDTH / 2 - containerCenter);
    
    // Add minor randomized variation within the card
    const jitter = (Math.random() - 0.5) * 60;
    const finalOffset = targetOffset + jitter;

    setSpinOffset(finalOffset);

    // Audio Ticker loop that decelerates over 5 seconds
    let elapsed = 0;
    const totalDuration = 5000;
    let delay = 50;

    const tickInterval = () => {
      sound.playTick();
      elapsed += delay;
      // Exponentially increase delay as spinner slows down
      delay = 50 + Math.pow(elapsed / totalDuration, 2.5) * 350;

      if (elapsed < totalDuration) {
        setTimeout(tickInterval, delay);
      } else {
        // Landed!
        setIsSpinning(false);
        setWinningItem(reel[WINNING_INDEX]);
        sound.playVictory();
      }
    };

    setTimeout(tickInterval, delay);
  };

  const handleClose = () => {
    if (isSpinning) return;
    setIsLootBoxOpen(false);
  };

  return (
    <AnimatePresence>
      {isLootBoxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md pointer-events-auto cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative pointer-events-auto w-full max-w-3xl bg-[#080d16] border border-amber-500/40 rounded-sm shadow-[0_0_80px_rgba(245,158,11,0.25)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 bg-slate-950/90 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <Gift className="w-5 h-5 text-amber-400 animate-bounce" />
                <div>
                  <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                    PANDELOOT // CRATE UNBOXING REEL
                  </h2>
                  <p className="text-[10px] font-mono text-amber-400/80">
                    CS:GO CASE SPIN MECHANICS // BUILT WITH HARDWARE-ACCELERATED LERP
                  </p>
                </div>
              </div>

              <button
                onClick={handleClose}
                disabled={isSpinning}
                className="p-1.5 rounded border border-slate-700 text-slate-400 hover:text-white hover:border-amber-400 transition-colors cursor-pointer disabled:opacity-30"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Spinner Container */}
            <div className="relative p-6 bg-[#05080f] overflow-hidden">
              
              {/* Central Needle / Static Tick Indicator */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-amber-400 z-30 shadow-[0_0_15px_rgba(245,158,11,0.9)]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-8 border-t-amber-400" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-b-8 border-b-amber-400" />
              </div>

              {/* Edge Gradient Shadows */}
              <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#05080f] to-transparent z-20 pointer-events-none" />
              <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#05080f] to-transparent z-20 pointer-events-none" />

              {/* Reel Conveyor Track */}
              <div className="relative h-44 overflow-hidden rounded-sm border border-slate-800 bg-slate-950/80 flex items-center">
                <div
                  style={{
                    transform: `translate3d(${spinOffset}px, 0, 0)`,
                    transition: isSpinning
                      ? "transform 5000ms cubic-bezier(0.12, 0.8, 0.32, 1)"
                      : "none",
                  }}
                  className="flex gap-2.5 px-4"
                >
                  {reel.map((item, idx) => (
                    <div
                      key={idx}
                      style={{ width: `${ITEM_WIDTH - 10}px` }}
                      className={`h-36 flex-shrink-0 rounded-sm border p-3 flex flex-col justify-between select-none ${item.accent}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono font-bold tracking-wider opacity-80">
                          {item.badge}
                        </span>
                        <Sparkles className="w-3.5 h-3.5 opacity-60" />
                      </div>

                      <div className="text-center my-auto">
                        <p className="font-mono text-xs font-bold leading-tight">
                          {item.name}
                        </p>
                      </div>

                      <span className="text-[9px] font-mono text-center text-slate-400 uppercase tracking-widest">
                        {item.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Winning Item Display or Roll Controls */}
            <div className="p-6 bg-slate-950 border-t border-slate-800 flex flex-col items-center justify-center gap-4">
              {winningItem ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center space-y-3"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-950 border border-amber-400/60 rounded text-amber-300 font-mono text-xs font-bold tracking-widest shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>UNLOCKED: {winningItem.name}</span>
                  </div>

                  <p className="text-xs text-slate-300 font-mono max-w-md">
                    Congratulations! You unlocked Joshua Camacho&apos;s Legendary Artifact. Feel free to inspect the full codebase or send an inquiry.
                  </p>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={generateReel}
                      className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 border border-slate-700 text-slate-300 font-mono text-xs rounded hover:border-amber-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>SPIN AGAIN</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
                  <span className="text-xs font-mono text-slate-400">
                    STATUS: {isSpinning ? "CONVEYOR DECELERATING..." : "READY TO UNBOX"}
                  </span>

                  <button
                    onClick={spin}
                    disabled={isSpinning}
                    className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-mono font-bold text-xs tracking-wider rounded-sm shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all cursor-pointer disabled:opacity-40"
                  >
                    {isSpinning ? "UNBOXING..." : "ROLL PANDELOOT CRATE"}
                  </button>
                </div>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}