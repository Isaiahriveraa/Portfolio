"use client";

import { useEffect, useMemo, useState } from "react";
import { CONTRIBUTION_LEVELS, GLYPHS } from "@/lib/pixelFont";
import { formatContributionDate, type ContributionDay } from "@/lib/github";
import { PROJECTS } from "@/lib/projects";
import { cn } from "@/lib/utils";

const NAME = "YONIE";
/* Each letter of the name flashes in one project's accent before settling to ink. */
const LETTER_FLASH = PROJECTS.slice(0, NAME.length).map((p) => p.palette.accent);

type Cell = { order: number; letter: number };

/** The squares that spell `word`, keyed by "col,row", starting at column `offset`. */
function nameCells(word: string, offset: number) {
  const lit = new Map<string, Cell>();
  let col = offset;
  let order = 0;
  [...word].forEach((ch, letter) => {
    const glyph = GLYPHS[ch];
    for (let c = 0; c < glyph[0].length; c++)
      for (let r = 0; r < 7; r++) if (glyph[r][c] === "#") lit.set(`${col + c},${r}`, { order: order++, letter });
    col += glyph[0].length + 1;
  });
  return { lit, width: col - offset - 1 };
}
const NAME_WIDTH = nameCells(NAME, 0).width;

/** Days grouped into week columns (Sunday first), keeping the last `weeks`. */
function weekColumns(days: ContributionDay[] | null, weeks: number): (ContributionDay | null)[][] {
  if (!days) return Array.from({ length: weeks }, () => Array<ContributionDay | null>(7).fill(null));
  const pad = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const flat: (ContributionDay | null)[] = [...Array(pad).fill(null), ...days];
  const cols: (ContributionDay | null)[][] = [];
  for (let i = 0; i < flat.length; i += 7) {
    const col = flat.slice(i, i + 7);
    while (col.length < 7) col.push(null);
    cols.push(col);
  }
  return cols.slice(-weeks);
}

interface ContributionGraphProps {
  /** Null when live data is unavailable; the name still draws on empty squares. */
  days: ContributionDay[] | null;
  weeks: number;
  label: string;
}

/**
 * A GitHub-style contribution graph with YONIE drawn across the middle.
 * Hover a square to see its day; hovering the graph reveals the real days
 * under the name.
 */
export function ContributionGraph({ days, weeks, label }: ContributionGraphProps) {
  const [hover, setHover] = useState<{ col: number; row: number } | null>(null);
  const cols = useMemo(() => weekColumns(days, weeks), [days, weeks]);
  const offset = Math.max(0, Math.floor((cols.length - NAME_WIDTH) / 2));
  const { lit } = useMemo(() => nameCells(NAME, offset), [offset]);
  const sweep = cols.length * 12;
  const [intro, setIntro] = useState(true);
  useEffect(() => {
    const t = window.setTimeout(() => setIntro(false), sweep + 150 + lit.size * 7 + 900);
    return () => window.clearTimeout(t);
  }, [sweep, lit.size]);

  const months = useMemo(() => {
    const out: { col: number; label: string }[] = [];
    let last = -1;
    cols.forEach((col, i) => {
      const first = col.find(Boolean);
      if (!first) return;
      const m = new Date(`${first.date}T00:00:00Z`).getUTCMonth();
      if (m !== last) {
        if (!out.length || i - out[out.length - 1].col >= 3)
          out.push({
            col: i,
            label: new Date(Date.UTC(2000, m, 1)).toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }),
          });
        last = m;
      }
    });
    return out;
  }, [cols]);
  const hovered = hover ? cols[hover.col]?.[hover.row] : null;

  return (
    <div className={cn("relative", days && "contribution-graph")} onPointerLeave={() => setHover(null)}>
      <div className="relative mb-2 h-4 font-mono text-[11px] text-[#6b6b6b]" aria-hidden>
        {days &&
          months.map((m) => (
            <span key={`${m.col}-${m.label}`} className="absolute" style={{ left: `${(m.col / cols.length) * 100}%` }}>
              {m.label}
            </span>
          ))}
      </div>
      <div
        role="img"
        aria-label={label}
        className={cn("grid grid-flow-col gap-[2px] sm:gap-[3px] lg:gap-1", intro && "contribution-intro")}
        style={{ gridTemplateColumns: `repeat(${cols.length}, minmax(0, 1fr))`, gridTemplateRows: "repeat(7, auto)" }}
      >
        {cols.map((col, c) =>
          col.map((day, r) => {
            const name = lit.get(`${c},${r}`);
            const color = day ? CONTRIBUTION_LEVELS[day.level] : days ? "transparent" : CONTRIBUTION_LEVELS[0];
            const isHovered = hover?.col === c && hover.row === r;
            return (
              <span
                key={`${c}-${r}`}
                onPointerEnter={() => day && setHover({ col: c, row: r })}
                className={cn(
                  "contribution-cell aspect-square rounded-[2px] sm:rounded-[3px]",
                  name && "contribution-name",
                  isHovered && "ring-2 ring-foreground ring-offset-1 ring-offset-white",
                )}
                style={
                  {
                    "--cell-color": color,
                    "--cell-flash": name ? LETTER_FLASH[name.letter] : undefined,
                    "--cell-delay": `${c * 12 + r * 4}ms`,
                    "--name-delay": `${sweep + 150 + (name?.order ?? 0) * 7}ms`,
                  } as React.CSSProperties
                }
              />
            );
          }),
        )}
      </div>
      {hovered && hover && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2.5 py-1.5 font-mono text-[12px] text-[#fafafa] shadow-lg"
          style={{ left: `${((hover.col + 0.5) / cols.length) * 100}%`, top: `calc(${(hover.row / 7) * 100}% - 18px)` }}
        >
          {hovered.count === 0 ? "No contributions" : `${hovered.count} contribution${hovered.count === 1 ? "" : "s"}`} on{" "}
          {formatContributionDate(hovered.date)}
        </div>
      )}
    </div>
  );
}
