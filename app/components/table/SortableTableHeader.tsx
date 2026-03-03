type SortKey = "name" | "progress" | "wpm" | "accuracy";
type SortDirection = "asc" | "desc";

type Props = {
  sortKey: SortKey;
  sortDirection: SortDirection;
  onSort: (key: SortKey) => void;
};

const thClass =
  "px-4 py-3 text-xs font-medium uppercase tracking-widest text-zinc-400 cursor-pointer select-none hover:text-zinc-200 transition-colors";

const SortIndicator = ({
  active,
  direction,
}: {
  active: boolean;
  direction: SortDirection;
}) => (
  <span className={`ml-1 ${active ? "text-zinc-300" : "text-zinc-600"}`}>
    {active ? (direction === "asc" ? "↑" : "↓") : "↕"}
  </span>
);

export const SortableTableHeader = ({
  sortKey,
  sortDirection,
  onSort,
}: Props) => (
  <thead>
    <tr className="border-b border-zinc-800">
      <th className={`${thClass} text-left`} onClick={() => onSort("name")}>
        Player{" "}
        <SortIndicator active={sortKey === "name"} direction={sortDirection} />
      </th>
      <th className={`${thClass} text-left`} onClick={() => onSort("progress")}>
        Progress{" "}
        <SortIndicator
          active={sortKey === "progress"}
          direction={sortDirection}
        />
      </th>
      <th className={`${thClass} text-right`} onClick={() => onSort("wpm")}>
        WPM{" "}
        <SortIndicator active={sortKey === "wpm"} direction={sortDirection} />
      </th>
      <th
        className={`${thClass} text-right`}
        onClick={() => onSort("accuracy")}
      >
        Acc{" "}
        <SortIndicator
          active={sortKey === "accuracy"}
          direction={sortDirection}
        />
      </th>
    </tr>
  </thead>
);
