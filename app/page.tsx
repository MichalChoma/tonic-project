"use client";

import { useAuthStore } from "@/store/authStore";
import { useGameStore } from "@/store/gameStore";
import { GameStats } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TypingInput } from "./components/TypingInput";
import { StatsBar } from "./components/StatsBar";
import RoundEnd from "./components/RoundEnd";

const ROUND_TIME = 30;

const sentences = [
  "The quick brown fox jumps over the lazy dog and the dog barks loudly at the fox running away",
];

export default function Home() {
  const router = useRouter();
  const token = useAuthStore(({ token }) => token);
  const { addRound, resetLive, liveWpm, liveAccuracy } = useGameStore();

  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  const [roundStats, setRoundStats] = useState<GameStats | null>(null);

  useEffect(() => {
    if (!token) router.push("/login");
  }, [token, router]);

  useEffect(() => {
    if (roundStats) return;

    const id = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          clearInterval(id);
          return 0;
        }
        return time - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [roundStats]);

  useEffect(() => {
    if (timeLeft === 0 && !roundStats) {
      addRound({
        wpm: liveWpm,
        accuracy: liveAccuracy,
        timeSeconds: ROUND_TIME,
      });
    }
  }, [timeLeft, roundStats, addRound, liveWpm, liveAccuracy]);

  const handleRoundEnd = (stats: GameStats) => {
    const finalStats = { ...stats, timeSeconds: ROUND_TIME - timeLeft };
    addRound(finalStats);
    setRoundStats(finalStats);
  };

  const handlePlayAgain = () => {
    setRoundStats(null);
    setTimeLeft(ROUND_TIME);
    resetLive();
  };

  const timeUpStats: GameStats = {
    wpm: liveWpm,
    accuracy: liveAccuracy,
    timeSeconds: ROUND_TIME,
  };
  const displayStats = roundStats ?? (timeLeft === 0 ? timeUpStats : null);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-950">
      <h1 className="text-3xl font-bold mb-6 text-center">Typing Challenge</h1>
      {displayStats ? (
        <RoundEnd stats={displayStats} onPlayAgain={handlePlayAgain} />
      ) : (
        <>
          <StatsBar timeLeft={timeLeft} />
          <TypingInput sentence={sentences[0]} onRoundEnd={handleRoundEnd} />
        </>
      )}
    </div>
  );
}
