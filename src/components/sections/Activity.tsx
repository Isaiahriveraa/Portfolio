"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ContributionGraph } from "@/components/ui/ContributionGraph";
import { customEasing } from "@/lib/animations";
import { SITE_CONFIG } from "@/lib/constants";
import { formatContributionDate, type ContributionActivity } from "@/lib/github";
import { CONTRIBUTION_LEVELS } from "@/lib/pixelFont";
import { cn } from "@/lib/utils";

const fmt = (n: number) => n.toLocaleString("en-US");

/**
 * The last year of GitHub contributions, with headline stats. Falls back to
 * the name on an empty grid and a link to the profile when data is missing.
 */
export function Activity({ activity }: { activity: ContributionActivity | null }) {
  const days = activity?.days ?? null;
  const label = activity
    ? `GitHub contribution graph for the last year: ${fmt(activity.total)} contributions over ${activity.activeDays} active days, with YONIE written across it.`
    : "The name YONIE drawn as a contribution-style pixel grid. Live GitHub data is unavailable right now.";

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: customEasing, delay: 0.24 }}
      aria-labelledby="activity-title"
      className="rounded-[16px] border border-foreground/[0.08] bg-surface p-4 shadow-[0_20px_50px_-30px_rgba(17,17,17,0.3)] sm:p-7"
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2
            id="activity-title"
            className="font-wide text-[26px] font-light leading-[1.1] tracking-[-0.035em] sm:text-[36px]"
          >
            {activity ? (
              <>
                <span className="font-bold tabular-nums">{fmt(activity.total)}</span> contributions in the last year.
              </>
            ) : (
              <>
                My <span className="font-bold">GitHub</span> activity.
              </>
            )}
          </h2>
          <p className="mt-2 max-w-[60ch] text-[15px] leading-[1.5] text-text-muted sm:text-[16px]">
            {activity
              ? "IUGA's website, hackathon builds, and side projects, one commit at a time. Each square is a real day on my GitHub."
              : "Live contribution data didn't load just now. It's always up to date on my profile."}
          </p>
        </div>
        <a
          href={SITE_CONFIG.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-foreground/15 px-3.5 py-2 font-mono text-[13px] transition hover:bg-foreground hover:text-white"
        >
          github.com/{SITE_CONFIG.githubHandle}
          <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
      <div className="mt-6 hidden md:block">
        <ContributionGraph days={days} weeks={53} label={label} />
      </div>
      <div className="mt-5 md:hidden">
        <ContributionGraph days={days} weeks={30} label={label} />
      </div>
      <div
        className={cn(
          "mt-5 flex-col gap-4 border-t border-foreground/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-between",
          activity ? "flex" : "hidden",
        )}
      >
        {activity && (
          <dl className="grid grid-cols-3 gap-4 sm:flex sm:gap-10">
            {[
              { k: "Active days", v: fmt(activity.activeDays), u: "" },
              { k: "Longest streak", v: String(activity.longestStreak), u: "days" },
              {
                k: "Best day",
                v: String(activity.bestDay.count),
                u: `on ${formatContributionDate(activity.bestDay.date, false)}`,
              },
            ].map((s) => (
              <div key={s.k}>
                <dt className="text-[13px] text-text-muted">{s.k}</dt>
                <dd className="font-wide mt-1 text-[24px] font-bold tracking-[-0.03em] tabular-nums">
                  {s.v}
                  {s.u && (
                    <span className="mt-0.5 block text-[13px] font-normal tracking-normal text-text-muted [font-stretch:100%] sm:ml-1.5 sm:mt-0 sm:inline">
                      {s.u}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        )}
        <div className="flex items-center gap-1.5 font-mono text-[12px] text-text-muted" aria-hidden>
          <span className="mr-4 hidden [@media(hover:hover)]:md:inline">Hover a square for its day</span>
          Less
          {CONTRIBUTION_LEVELS.map((c) => (
            <span key={c} className="h-3 w-3 rounded-[2px]" style={{ background: c }} />
          ))}
          More
        </div>
      </div>
    </motion.section>
  );
}
