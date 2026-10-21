/**
 * Real GitHub contribution data for `?v=10`, from the same public source that
 * react-github-calendar (already used on the site) reads. Every number shown
 * in v10 is computed here from that response; nothing is estimated.
 */

export interface PrototypeV10Day {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface PrototypeV10Activity {
  days: PrototypeV10Day[];
  total: number;
  activeDays: number;
  longestStreak: number;
  bestDay: PrototypeV10Day;
}

const PROTOTYPE_V10_SOURCE = "https://github-contributions-api.jogruber.de/v4/";

export async function getPrototypeV10Activity(username: string): Promise<PrototypeV10Activity | null> {
  try {
    const res = await fetch(`${PROTOTYPE_V10_SOURCE}${encodeURIComponent(username)}?y=last`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { total?: { lastYear?: number }; contributions?: PrototypeV10Day[] };
    const days = (json.contributions ?? []).filter((d) => typeof d.count === "number" && typeof d.date === "string");
    if (days.length === 0) return null;
    days.sort((a, b) => a.date.localeCompare(b.date));

    let longestStreak = 0;
    let run = 0;
    let bestDay = days[0];
    let activeDays = 0;
    for (const d of days) {
      if (d.count > 0) {
        activeDays += 1;
        run += 1;
        longestStreak = Math.max(longestStreak, run);
      } else run = 0;
      if (d.count > bestDay.count) bestDay = d;
    }
    const summed = days.reduce((s, d) => s + d.count, 0);
    return {
      days,
      total: typeof json.total?.lastYear === "number" ? json.total.lastYear : summed,
      activeDays,
      longestStreak,
      bestDay,
    };
  } catch {
    return null;
  }
}
