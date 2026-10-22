/**
 * Real GitHub contribution data, from the public API that react-github-calendar
 * reads. Every number the site shows is computed here from that response.
 */

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionActivity {
  days: ContributionDay[];
  total: number;
  activeDays: number;
  longestStreak: number;
  bestDay: ContributionDay;
}

const CONTRIBUTIONS_API = "https://github-contributions-api.jogruber.de/v4/";

/**
 * The last year of contributions for `username`, cached for an hour.
 * Returns null when the source is down or slow, so the page can still render.
 */
export async function getContributionActivity(username: string): Promise<ContributionActivity | null> {
  try {
    const res = await fetch(`${CONTRIBUTIONS_API}${encodeURIComponent(username)}?y=last`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { total?: { lastYear?: number }; contributions?: ContributionDay[] };
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

/** "Oct 21, 2026", or "Oct 21" without the year. Dates are calendar days, so UTC. */
export function formatContributionDate(date: string, withYear = true) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: withYear ? "numeric" : undefined,
    timeZone: "UTC",
  });
}
