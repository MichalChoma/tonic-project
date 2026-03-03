"use client";

import { calculateWPM, getAccuracy, getElapsed } from "@/lib/typing";
import { GameStats } from "@/lib/types";
import { useState, useEffect } from "react";
import { useGameStore } from "@/store/gameStore";

type Props = {
  sentence: string;
  onRoundEnd: (stats: GameStats) => void;
};

export const TypingInput = ({ sentence, onRoundEnd }: Props) => {
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [totalTyped, setTotalTyped] = useState(0);
  const [correctTyped, setCorrectTyped] = useState(0);
  const { setLiveProgress } = useGameStore();

  useEffect(() => {
    setInput("");
    setStartTime(null);
    setTotalTyped(0);
    setCorrectTyped(0);
  }, [sentence]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const currentStartTime =
      startTime ?? (value.length > 0 ? Date.now() : null);

    if (!startTime && currentStartTime) {
      setStartTime(currentStartTime);
    }

    const elapsed = getElapsed(currentStartTime);
    let total = totalTyped;
    let correct = correctTyped;

    const userTypedNewChar = value.length > input.length;
    if (userTypedNewChar) {
      const isCorrect = value[input.length] === sentence[input.length];
      if (isCorrect) {
        correct++;
      }
      total++;

      setTotalTyped(total);
      setCorrectTyped(correct);
      setLiveProgress(
        calculateWPM(value, elapsed),
        getAccuracy(correct, total)
      );
    }

    setInput(value);

    const isComplete = value === sentence;
    if (isComplete) {
      onRoundEnd({
        wpm: calculateWPM(value, elapsed),
        accuracy: getAccuracy(correct, total),
        timeSeconds: elapsed,
      });
    }
  };

  return (
    <div className="w-full max-w-sm space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
      <p className="font-mono text-lg leading-relaxed tracking-wide">
        {sentence.split("").map((char, i) => {
          let color = "text-zinc-500";
          if (i < input.length) {
            color = input[i] === char ? "text-green-400" : "text-red-400";
          }
          return (
            <span key={i} className={color}>
              {char}
            </span>
          );
        })}
      </p>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        autoFocus
        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 font-mono text-sm text-zinc-50 outline-none transition focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
      />
    </div>
  );
};
