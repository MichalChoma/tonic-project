type Props = {
  page: number;
  totalPages: number;
  totalRows: number;
  onPrev: () => void;
  onNext: () => void;
};

const btnClass =
  "text-xs text-zinc-400 hover:text-zinc-50 disabled:cursor-not-allowed disabled:opacity-30 transition-colors";

export const TablePagination = ({ page, totalPages, totalRows, onPrev, onNext }: Props) => (
  <div className="flex items-center justify-between border-t border-zinc-800 px-4 py-3">
    <span className="text-xs text-zinc-500">{totalRows} players</span>
    <div className="flex items-center gap-3">
      <button onClick={onPrev} disabled={page === 1} className={btnClass}>← Prev</button>
      <span className="text-xs text-zinc-500">{page} / {totalPages}</span>
      <button onClick={onNext} disabled={page === totalPages} className={btnClass}>Next →</button>
    </div>
  </div>
);
