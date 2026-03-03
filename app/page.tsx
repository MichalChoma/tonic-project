"use client";

import { useAuthStore } from "@/store/authStore";
import { useGameStore } from "@/store/gameStore";
import { GameStats } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TypingInput } from "./components/TypingInput";
import { StatsBar } from "./components/StatsBar";
import { PlayersTable } from "./components/PlayersTable";
import RoundEnd from "./components/RoundEnd";

const ROUND_TIME = 30;
const PLAYERS = [
  {
    name: "speed_demon",
    progress: "The quick brown fox jumps over the lazy dog and",
    wpm: 85,
    accuracy: 0.98,
  },
  {
    name: "keyboard_wizard",
    progress: "The quick brown fox jumps over the lazy",
    wpm: 78,
    accuracy: 0.97,
  },
  { name: "average_joe", progress: "The quick", wpm: 44, accuracy: 0.91 },
  { name: "coffee_typer", progress: "The quick brow", wpm: 40, accuracy: 0.9 },
  { name: "two_finger_tim", progress: "The quick br", wpm: 35, accuracy: 0.88 },
  { name: "hunt_n_pecker", progress: "The quick b", wpm: 30, accuracy: 0.86 },
  { name: "slow_turtle", progress: "The quick", wpm: 24, accuracy: 0.85 },
  { name: "sticky_keys", progress: "The qui", wpm: 20, accuracy: 0.83 },
  { name: "one_hand_dan", progress: "The qu", wpm: 16, accuracy: 0.8 },
  { name: "lag_machine", progress: "The q", wpm: 12, accuracy: 0.78 },
  { name: "still_loading", progress: "The", wpm: 8, accuracy: 0.75 },
];

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
    <main className="flex flex-1 flex-col items-center justify-center bg-zinc-950">
      <h1 className="text-3xl font-bold mb-6 text-center">Typing Challenge</h1>
      <section className="flex w-full max-w-4xl flex-col items-center gap-8 px-4">
        {displayStats ? (
          <RoundEnd stats={displayStats} onPlayAgain={handlePlayAgain} />
        ) : (
          <>
            <StatsBar timeLeft={timeLeft} />
            <div className="flex gap-6">
              <TypingInput
                sentence={sentences[0]}
                onRoundEnd={handleRoundEnd}
              />
            </div>
          </>
        )}
        <PlayersTable sentence={sentences[0]} players={PLAYERS} />
      </section>
    </main>
  );
}
