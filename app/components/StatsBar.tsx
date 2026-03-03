"use client";

import { useGameStore } from "@/store/gameStore";

type Props = {
  timeLeft: number;
};

export const StatsBar = ({ timeLeft }: Props) => {
  const { liveWpm, liveAccuracy } = useGameStore();

  return (
    <div className="flex gap-6 text-center text-gray-500 mb-4">
      <p>WPM: <span className="font-bold text-white">{liveWpm.toFixed(0)}</span></p>
      <p>Accuracy: <span className="font-bold text-white">{(liveAccuracy * 100).toFixed(1)}%</span></p>
      <p>Time left: <span className="font-bold text-white">{timeLeft}s</span></p>
    </div>
  );
};
