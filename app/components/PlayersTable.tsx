"use client";

import { useAuthStore } from "@/store/authStore";
import { useGameStore } from "@/store/gameStore";
import { useState } from "react";
import { SortableTableHeader } from "./table/SortableTableHeader";
import { TableRow } from "./table/TableRow";
import { TablePagination } from "./table/TablePagination";

type Row = { name: string; progress: number; wpm: number; accuracy: number };
type SortKey = keyof Row;
type SortDir = "asc" | "desc";

type Props = {
  sentence: string;
  players: { name: string; progress: string; wpm: number; accuracy: number }[];
};

const ITEMS_PER_PAGE = 5;

const sortRows = (rows: Row[], key: SortKey, dir: SortDir): Row[] => {
  const multiplier = dir === "asc" ? 1 : -1;

  return [...rows].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (typeof aVal === "string" && typeof bVal === "string")
      return multiplier * aVal.localeCompare(bVal);

    return multiplier * ((aVal as number) - (bVal as number));
  });
};

export const PlayersTable = ({ sentence, players }: Props) => {
  const username = useAuthStore(({ username }) => username);
  const { liveWpm, liveAccuracy, liveInput } = useGameStore();

  const [sortKey, setSortKey] = useState<SortKey>("progress");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);

  const toPercent = (typed: string) =>
    Math.min((typed.length / sentence.length) * 100);

  const you: Row = {
    name: username ?? "you",
    progress: toPercent(liveInput),
    wpm: liveWpm,
    accuracy: liveAccuracy,
  };

  const allRows: Row[] = [
    you,
    ...players.map((p) => ({ ...p, progress: toPercent(p.progress) })),
  ];

  const sorted = sortRows(allRows, sortKey, sortDir);
  const totalPages = Math.ceil(allRows.length / ITEMS_PER_PAGE);
  const pageRows = sorted.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleSort = (key: SortKey) => {
    setSortDir(
      sortKey === key ? (d) => (d === "asc" ? "desc" : "asc") : "desc"
    );
    setSortKey(key);
    setPage(1);
  };

  return (
    <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden">
      <table className="w-full text-sm">
        <SortableTableHeader
          sortKey={sortKey}
          sortDirection={sortDir}
          onSort={handleSort}
        />
        <tbody>
          {pageRows.map((row) => (
            <TableRow key={row.name} row={row} isYou={row.name === you.name} />
          ))}
        </tbody>
      </table>
      <TablePagination
        page={page}
        totalPages={totalPages}
        totalRows={allRows.length}
        onPrev={() => setPage((p) => p - 1)}
        onNext={() => setPage((p) => p + 1)}
      />
    </div>
  );
};
