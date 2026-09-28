"use client";

import { useCommandCenterStore, CoreTheme } from "@/store/useCommandCenterStore";
import { sound } from "@/lib/sound";
import { Terminal, Eye, Layers, Activity, Mail, Volume2, VolumeX, Gift } from "lucide-react";
import { SkyShiftToggle } from "./SkyShiftToggle";
import { AtmosphereSelector } from "./AtmosphereSelector";

const NAV_ITEMS = [
  { id: "hero", label: "01 // CORE" },
  { id: "projects", label: "02 // PROJECTS" },
  { id: "sandbox", label: "03 // SANDBOX" },
  { id: "terminal", label: "04 // TERMINAL" },
];

export function NavigationHUD() {
  const activeSection = useCommandCenterStore((state) => state.activeSection);
  const setActiveSection = useCommandCenterStore((state) => state.setActiveSection);

  const mode = useCommandCenterStore((state) => state.mode);
  const setMode = useCommandCenterStore((state) => state.setMode);

  const coreTheme = useCommandCenterStore((state) => state.coreTheme);
  const setCoreTheme = useCommandCenterStore((state) => state.setCoreTheme);

  const toggleTerminal = useCommandCenterStore((state) => state.toggleTerminal);
  const toggleContact = useCommandCenterStore((state) => state.toggleContact);
  const toggleLootBox = useCommandCenterStore((state) => state.toggleLootBox);

  const soundEnabled = useCommandCenterStore((state) => state.soundEnabled);
  const toggleSound = useCommandCenterStore((state) => state.toggleSound);

  const handleNavClick = (id: string) => {
    sound.playClick();
    if (id === "terminal") {
      toggleTerminal();
    }
    setActiveSection(id);
  };

  const handleSoundToggle = () => {
    toggleSound();
    sound.enabled = !soundEnabled;
    if (!soundEnabled) {
      sound.playClick();
    }
  };

  const handleModeToggle = () => {
    sound.playWhoosh();
    setMode(mode === "spatial" ? "fastTrack" : "spatial");
  };

  const handleThemeChange = (themeId: CoreTheme) => {
    sound.playClick();
    setCoreTheme(themeId);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 p-4 sm:p-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Identity / System Title */}
        <div className="pointer-events-auto flex items-center gap-3 hud-panel px-4 py-2 rounded-sm border border-cyan-500/20">
          <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
          <div className="flex flex-col">
            <span className="font-mono text-xs font-bold tracking-wider text-slate-100 uppercase">
              JOSHUA CAMACHO
            </span>
            <span className="font-mono text-[10px] text-cyan-400/70 tracking-widest">
              SYS.CMD // V2.4
            </span>
          </div>
        </div>

        {/* Section Navigation Nodes */}
        <nav className="hidden md:flex pointer-events-auto items-center gap-1 hud-panel p-1.5 rounded-sm border border-slate-800">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={() => sound.playHover()}
                className={`px-3 py-1.5 font-mono text-xs tracking-wider transition-all duration-200 cursor-pointer rounded-sm ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Controls: Atmosphere Matrix + Loot + Audio + Mode */}
        <div className="pointer-events-auto flex items-center gap-2">
          
          {/* Atmosphere Environment Switcher */}
          <AtmosphereSelector />
          
          {/* PandeLoot Mystery Crate Button */}
          <button
            onClick={() => {
              sound.playClick();
              toggleLootBox();
            }}
            onMouseEnter={() => sound.playHover()}
            className="hud-panel flex items-center gap-1.5 px-2.5 py-2 rounded-sm border border-amber-500/40 text-amber-400 hover:bg-amber-950/40 transition-colors text-xs font-mono cursor-pointer"
            title="Roll PandeLoot Mystery Crate"
          >
            <Gift className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline text-[11px] font-bold">LOOT CRATE</span>
          </button>

          {/* Dual-Mode Switcher */}
          <button
            onClick={handleModeToggle}
            onMouseEnter={() => sound.playHover()}
            className="hud-panel flex items-center gap-2 px-3 py-2 rounded-sm border border-cyan-500/30 text-xs font-mono text-cyan-300 hover:bg-cyan-950/40 transition-colors cursor-pointer"
            title="Press [ESC] to toggle reader mode"
          >
            {mode === "spatial" ? (
              <>
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">SPATIAL 3D</span>
              </>
            ) : (
              <>
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">FAST-TRACK 2D</span>
              </>
            )}
          </button>

          {/* Audio SFX Toggle */}
          <button
            onClick={handleSoundToggle}
            className="hud-panel p-2 rounded-sm border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors cursor-pointer"
            title={soundEnabled ? "Mute Cyber Audio" : "Unmute Cyber Audio"}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Contact Direct Comm */}
          <button
            onClick={() => {
              sound.playClick();
              toggleContact();
            }}
            onMouseEnter={() => sound.playHover()}
            className="hud-panel p-2 rounded-sm border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors cursor-pointer"
            title="Direct Transmission Dispatch"
          >
            <Mail className="w-4 h-4" />
          </button>

          {/* Terminal Launcher */}
          <button
            onClick={() => {
              sound.playClick();
              toggleTerminal();
            }}
            onMouseEnter={() => sound.playHover()}
            className="hud-panel p-2 rounded-sm border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors cursor-pointer"
            title="Open UNIX CLI Terminal"
          >
            <Terminal className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}