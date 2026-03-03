type Props = {
  percent: number;
  isYou: boolean;
};

export const ProgressBar = ({ percent, isYou }: Props) => (
  <div className="flex items-center gap-3">
    <div className="h-1.5 flex-1 rounded-full bg-zinc-700">
      <div
        className={`h-1.5 rounded-full transition-all duration-300 ${
          isYou ? "bg-green-400" : "bg-zinc-500"
        }`}
        style={{ width: `${percent}%` }}
      />
    </div>
    <span className="w-10 text-right text-xs text-zinc-500">
      {percent.toFixed(0)}%
    </span>
  </div>
);
