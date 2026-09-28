import { create } from "zustand";

export type Mode = "spatial" | "fastTrack";
export type CoreTheme = "cyan" | "emerald" | "amber";
export type AtmosphereMode = "cyanVoid" | "solarGold" | "blueprintCad" | "matrixEmerald";

export interface CameraTarget {
  position: [number, number, number];
  target: [number, number, number];
}

export const CAMERA_PRESETS: Record<string, CameraTarget> = {
  hero: {
    position: [0, 0, 7],
    target: [0, 0, 0],
  },
  projects: {
    position: [0, 4, 11],
    target: [0, 0.5, 0],
  },
  sandbox: {
    position: [6, 2, 6],
    target: [0, 0, 0],
  },
  terminal: {
    position: [0, -3, 8],
    target: [0, -1, 0],
  },
};

interface CommandCenterState {
  mode: Mode;
  activeSection: string;
  setMode: (mode: Mode) => void;
  setActiveSection: (section: string) => void;

  cameraTarget: CameraTarget;
  setCameraTarget: (target: CameraTarget) => void;

  coreTheme: CoreTheme;
  setCoreTheme: (theme: CoreTheme) => void;

  // 4-Way Atmosphere Environment Matrix
  atmosphere: AtmosphereMode;
  setAtmosphere: (env: AtmosphereMode) => void;

  telemetry: {
    fps: number;
    camPos: [number, number, number];
  };
  setTelemetry: (telemetry: { fps: number; camPos: [number, number, number] }) => void;

  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;

  isTerminalOpen: boolean;
  toggleTerminal: () => void;

  isContactOpen: boolean;
  toggleContact: () => void;
  setIsContactOpen: (open: boolean) => void;

  soundEnabled: boolean;
  toggleSound: () => void;

  isLootBoxOpen: boolean;
  toggleLootBox: () => void;
  setIsLootBoxOpen: (open: boolean) => void;
}

export const useCommandCenterStore = create<CommandCenterState>((set) => ({
  mode: "spatial",
  activeSection: "hero",
  setMode: (mode) => set({ mode }),
  setActiveSection: (section) =>
    set((state) => ({
      activeSection: section,
      cameraTarget: CAMERA_PRESETS[section] || state.cameraTarget,
    })),

  cameraTarget: CAMERA_PRESETS.hero,
  setCameraTarget: (cameraTarget) => set({ cameraTarget }),

  coreTheme: "cyan",
  setCoreTheme: (coreTheme) => set({ coreTheme }),

  atmosphere: "cyanVoid",
  setAtmosphere: (atmosphere) => {
    // Automatically match the core accent color to the atmosphere
    let theme: CoreTheme = "cyan";
    if (atmosphere === "solarGold") theme = "amber";
    if (atmosphere === "matrixEmerald") theme = "emerald";
    if (atmosphere === "blueprintCad") theme = "cyan";
    set({ atmosphere, coreTheme: theme });
  },

  telemetry: {
    fps: 60,
    camPos: [0, 0, 7],
  },
  setTelemetry: (telemetry) => set({ telemetry }),

  selectedProjectId: null,
  setSelectedProjectId: (selectedProjectId) => set({ selectedProjectId }),

  isTerminalOpen: false,
  toggleTerminal: () => set((state) => ({ isTerminalOpen: !state.isTerminalOpen })),

  isContactOpen: false,
  toggleContact: () => set((state) => ({ isContactOpen: !state.isContactOpen })),
  setIsContactOpen: (isContactOpen) => set({ isContactOpen }),

  soundEnabled: true,
  toggleSound: () =>
    set((state) => ({ soundEnabled: !state.soundEnabled })),

  isLootBoxOpen: false,
  toggleLootBox: () => set((state) => ({ isLootBoxOpen: !state.isLootBoxOpen })),
  setIsLootBoxOpen: (isLootBoxOpen) => set({ isLootBoxOpen }),
}));