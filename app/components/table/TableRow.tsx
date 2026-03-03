import { ProgressBar } from "./ProgressBar";

type Row = { name: string; progress: number; wpm: number; accuracy: number };

type Props = {
  row: Row;
  isYou: boolean;
};

export const TableRow = ({
  row: { accuracy, name, progress, wpm },
  isYou,
}: Props) => (
  <tr
    className={`border-b border-zinc-800/50 last:border-0 ${
      isYou ? "bg-zinc-800/50" : ""
    }`}
  >
    <td
      className={`px-4 py-3 font-mono ${
        isYou ? "text-green-400" : "text-zinc-50"
      }`}
    >
      {name}
    </td>
    <td className="px-4 py-3">
      <ProgressBar percent={progress} isYou={isYou} />
    </td>
    <td className="px-4 py-3 text-right font-mono text-zinc-50">
      {wpm.toFixed(0)}
    </td>
    <td className="px-4 py-3 text-right font-mono text-zinc-400">
      {(accuracy * 100).toFixed(0)}%
    </td>
  </tr>
);
