import { create } from "zustand";

interface BadgePosition {
  x: number;
  y: number;
  visible: boolean;
}

interface BadgeStoreState {
  positions: Record<string, BadgePosition>;
  setBadgePosition: (id: string, pos: BadgePosition) => void;
}

export const useBadgeStore = create<BadgeStoreState>((set) => ({
  positions: {},
  setBadgePosition: (id, pos) =>
    set((state) => ({
      positions: {
        ...state.positions,
        [id]: pos,
      },
    })),
}));