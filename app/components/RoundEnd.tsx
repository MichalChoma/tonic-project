import { GameStats } from "@/lib/types";

type Props = {
  stats: GameStats;
  onPlayAgain: () => void;
};

const RoundEnd = ({ stats, onPlayAgain }: Props) => {
  return (
    <div className="w-full max-w-md space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
      <h2 className="text-2xl font-bold text-zinc-50">Round Over!</h2>
      <div className="flex items-center justify-center gap-12">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-1">
            WPM
          </p>
          <p className="text-4xl font-bold text-zinc-50">
            {stats.wpm.toFixed(0)}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-1">
            Accuracy
          </p>
          <p className="text-4xl font-bold text-zinc-50">
            {(stats.accuracy * 100).toFixed(1)}%
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-1">
            Time
          </p>
          <p className="text-4xl font-bold text-zinc-50">
            {stats.timeSeconds.toFixed(1)}s
          </p>
        </div>
      </div>
      <button
        onClick={onPlayAgain}
        className="w-full rounded-lg bg-zinc-50 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
      >
        Play Again
      </button>
    </div>
  );
};

export default RoundEnd;
