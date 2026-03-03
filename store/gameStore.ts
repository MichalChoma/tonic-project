import { create } from "zustand";
import { GameStats } from "@/lib/types";

interface GameState {
  liveWpm: number;
  liveAccuracy: number;
  liveInput: string;
  rounds: GameStats[];
  setLiveProgress: (wpm: number, accuracy: number) => void;
  setLiveInput: (input: string) => void;
  addRound: (stats: GameStats) => void;
  resetLive: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  liveWpm: 0,
  liveAccuracy: 0,
  liveInput: "",
  rounds: [],
  setLiveProgress: (wpm, accuracy) => set({ liveWpm: wpm, liveAccuracy: accuracy }),
  setLiveInput: (input) => set({ liveInput: input }),
  addRound: (stats) => set((s) => ({ rounds: [...s.rounds, stats] })),
  resetLive: () => set({ liveWpm: 0, liveAccuracy: 0, liveInput: "" }),
}));
