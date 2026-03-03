import { create } from "zustand";
import { GameStats } from "@/lib/types";

interface GameState {
  liveWpm: number;
  liveAccuracy: number;
  rounds: GameStats[];
  setLiveProgress: (wpm: number, accuracy: number) => void;
  addRound: (stats: GameStats) => void;
  resetLive: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  liveWpm: 0,
  liveAccuracy: 0,
  rounds: [],
  setLiveProgress: (wpm, accuracy) => set({ liveWpm: wpm, liveAccuracy: accuracy }),
  addRound: (stats) => set((s) => ({ rounds: [...s.rounds, stats] })),
  resetLive: () => set({ liveWpm: 0, liveAccuracy: 0 }),
}));
