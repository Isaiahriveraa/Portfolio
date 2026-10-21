"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, FileText, Mail } from "lucide-react";
import {
  prototypeActivities,
  prototypeProfile as p,
  prototypeProjects,
  prototypeSkillGroups,
} from "../prototype-content";
import type { PrototypeV10Activity, PrototypeV10Day } from "../prototype-v10-github";
import { PrototypeReveal, prototypeEase } from "../prototype-shared";

const display = "font-[family-name:var(--prototype-archivo)]";
const mono = "font-[family-name:var(--prototype-geist-mono)]";
const pixel = "font-[family-name:var(--prototype-silkscreen)]";

const ink = "#121212";
const lime = "#d4ff3a";
/** Lime ramp for contribution levels 0-4 on the light page. */
const levelColors = ["#e7e8e0", "#eefcc4", "#ddff60", "#c4ee1e", "#98c800"];

/* 5x7 pixel letters (3 wide for I). Rows top to bottom; "#" is a lit cell. */
const prototypeV10Glyphs: Record<string, string[]> = {
  Y: ["#...#", "#...#", ".#.#.", "..#..", "..#..", "..#..", "..#.."],
  O: [".###.", "#...#", "#...#", "#...#", "#...#", "#...#", ".###."],
  N: ["#...#", "##..#", "##..#", "#.#.#", "#..##", "#..##", "#...#"],
  I: ["###", ".#.", ".#.", ".#.", ".#.", ".#.", "###"],
  E: ["#####", "#....", "#....", "####.", "#....", "#....", "#####"],
};

/** Columns/rows lit by the word, starting at column `offset`. */
function prototypeV10NameCells(word: string, offset: number) {
  const lit = new Map<string, number>();
  let col = offset;
  let order = 0;
  for (const ch of word) {
    const g = prototypeV10Glyphs[ch];
    const width = g[0].length;
    for (let c = 0; c < width; c++) {
      for (let r = 0; r < 7; r++) if (g[r][c] === "#") lit.set(`${col + c},${r}`, order++);
    }
    col += width + 1;
  }
  return { lit, width: col - offset - 1 };
}

const prototypeV10NameWidth = prototypeV10NameCells("YONIE", 0).width;

function prototypeV10FormatDate(date: string, withYear = true) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: withYear ? "numeric" : undefined,
    timeZone: "UTC",
  });
}

/** Splits days into Sunday-first week columns and keeps the last `weeks` of them. */
function prototypeV10Weeks(days: PrototypeV10Day[] | null, weeks: number): (PrototypeV10Day | null)[][] {
  if (!days) return Array.from({ length: weeks }, () => Array<PrototypeV10Day | null>(7).fill(null));
  const pad = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const flat: (PrototypeV10Day | null)[] = [...Array(pad).fill(null), ...days];
  const cols: (PrototypeV10Day | null)[][] = [];
  for (let i = 0; i < flat.length; i += 7) {
    const col = flat.slice(i, i + 7);
    while (col.length < 7) col.push(null);
    cols.push(col);
  }
  return cols.slice(-weeks);
}

function PrototypeV10Grid({ days, weeks, label }: { days: PrototypeV10Day[] | null; weeks: number; label: string }) {
  const [hover, setHover] = useState<{ col: number; row: number } | null>(null);
  const cols = useMemo(() => prototypeV10Weeks(days, weeks), [days, weeks]);
  const offset = Math.max(0, Math.floor((cols.length - prototypeV10NameWidth) / 2));
  const { lit } = useMemo(() => prototypeV10NameCells("YONIE", offset), [offset]);
  const sweep = cols.length * 12; // ms for the column sweep to finish
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    // Drop the animation class once it has played so layout changes never replay it.
    const t = window.setTimeout(() => setPlaying(false), sweep + 150 + lit.size * 7 + 700);
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
        if (!out.length || i - out[out.length - 1].col >= 3) out.push({ col: i, label: new Date(Date.UTC(2000, m, 1)).toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }) });
        last = m;
      }
    });
    return out;
  }, [cols]);

  const hovered = hover ? cols[hover.col]?.[hover.row] : null;

  return (
    <div className={`relative ${days ? "prototype-v10-gridwrap" : ""}`} onPointerLeave={() => setHover(null)}>
      <div className={`${mono} relative mb-2 h-4 text-[11px] text-[#7a7b72]`} aria-hidden>
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
        className={`grid grid-flow-col gap-[2px] sm:gap-[3px] lg:gap-1 ${playing ? "prototype-v10-play" : ""}`}
        style={{ gridTemplateColumns: `repeat(${cols.length}, minmax(0, 1fr))`, gridTemplateRows: "repeat(7, auto)" }}
      >
        {cols.map((col, c) =>
          col.map((day, r) => {
            const nameOrder = lit.get(`${c},${r}`);
            const isName = nameOrder !== undefined;
            const color = day ? levelColors[day.level] : days ? "transparent" : levelColors[0];
            return (
              <span
                key={`${c}-${r}`}
                onPointerEnter={() => day && setHover({ col: c, row: r })}
                className={`prototype-v10-cell aspect-square rounded-[2px] sm:rounded-[3px] ${isName ? "prototype-v10-name" : ""} ${
                  hover && hover.col === c && hover.row === r ? "ring-2 ring-[#121212] ring-offset-1 ring-offset-white" : ""
                }`}
                style={
                  {
                    "--prototype-c": color,
                    "--prototype-d": `${c * 12 + r * 4}ms`,
                    "--prototype-nd": `${sweep + 150 + (nameOrder ?? 0) * 7}ms`,
                  } as React.CSSProperties
                }
              />
            );
          }),
        )}
      </div>
      {hovered && hover && (
        <div
          className={`${mono} pointer-events-none absolute z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#121212] px-2.5 py-1.5 text-[11.5px] text-white shadow-lg`}
          style={{ left: `${((hover.col + 0.5) / cols.length) * 100}%`, top: `calc(${((hover.row) / 7) * 100}% - 18px)` }}
        >
          {hovered.count === 0 ? "No contributions" : `${hovered.count} contribution${hovered.count === 1 ? "" : "s"}`} on {prototypeV10FormatDate(hovered.date)}
        </div>
      )}
    </div>
  );
}

function PrototypeV10Monogram() {
  const g = prototypeV10Glyphs.Y;
  return (
    <span className="grid grid-cols-5 gap-[1.5px]" aria-hidden>
      {g.flatMap((row, r) =>
        row.split("").map((ch, c) => (
          <span key={`${r}-${c}`} className="h-[3.5px] w-[3.5px] rounded-[0.5px]" style={{ background: ch === "#" ? ink : r + c > 7 ? lime : "#e6e7df" }} />
        )),
      )}
    </span>
  );
}

function PrototypeV10Actions({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-stretch overflow-hidden rounded-full border-2 border-[#121212] bg-[#121212] shadow-[0_2px_0_#121212]">
      <a
        href={p.emailHref}
        className={`group flex items-center gap-2 bg-white text-[14px] font-semibold text-[#121212] transition-colors hover:bg-[#f0f0e8] ${compact ? "px-3 py-2 sm:px-3.5" : "px-3.5 py-2.5 sm:px-4"}`}
      >
        <Mail size={16} strokeWidth={2.25} className="transition-transform group-hover:-rotate-6" />
        <span className={compact ? "sr-only sm:not-sr-only" : ""}>Email me</span>
      </a>
      <a
        href={p.resume}
        target="_blank"
        rel="noopener noreferrer"
        className={`group flex items-center gap-2 text-[14px] font-semibold text-[#121212] transition-[filter] hover:brightness-95 ${compact ? "gap-1.5 px-3 py-2 sm:px-3.5" : "px-3.5 py-2.5 sm:px-4"}`}
        style={{ background: lime }}
      >
        <FileText size={16} strokeWidth={2.25} className={compact ? "hidden sm:block" : ""} />
        Résumé
        <ArrowUpRight size={15} strokeWidth={2.5} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}

function PrototypeV10Work() {
  const [active, setActive] = useState(0);
  const project = prototypeProjects[active];
  return (
    <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
      <ul className="border-t-2 border-[#121212]">
        {prototypeProjects.map((pr, i) => {
          const on = i === active;
          return (
            <li key={pr.id} className="border-b border-[#121212]/15">
              <a
                href={pr.url}
                target="_blank"
                rel="noopener noreferrer"
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group relative block overflow-hidden py-5 outline-none sm:py-6"
              >
                <span
                  className={`absolute inset-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${on ? "lg:scale-x-100" : "lg:scale-x-0"} scale-x-0`}
                  style={{ background: lime }}
                  aria-hidden
                />
                <span className="relative flex items-start justify-between gap-4 px-1 lg:px-4">
                  <span className="min-w-0">
                    <span className={`${mono} block text-[12px] text-[#5e5f57]`}>{pr.context}</span>
                    <span className={`${display} mt-1 block text-[28px] font-bold leading-[1.05] tracking-[-0.03em] [font-stretch:108%] sm:text-[34px]`}>{pr.title}</span>
                    <span className="mt-2 block max-w-[46ch] text-[15px] leading-relaxed text-[#3d3e38]">{pr.oneLiner}</span>
                  </span>
                  <span className={`mt-6 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#121212] transition duration-300 ${on ? "lg:bg-[#121212] lg:text-white" : ""} group-hover:rotate-45`}>
                    <ArrowUpRight size={18} strokeWidth={2.5} />
                  </span>
                </span>
                {/* Mobile: show the screenshot inline */}
                <span className="relative mt-4 block aspect-[16/10] overflow-hidden rounded-[10px] border-2 border-[#121212] lg:hidden">
                  <Image src={pr.image} alt={`${pr.title} screenshot`} fill sizes="100vw" className="object-cover object-top" />
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      <div className="hidden lg:block">
        <div className="sticky top-24">
          <div className="prototype-v10-stepped relative aspect-[16/10] overflow-hidden bg-[#121212] p-[3px]">
            <div className="prototype-v10-stepped relative h-full w-full overflow-hidden bg-white">
              {prototypeProjects.map((pr, i) => (
                <Image
                  key={pr.id}
                  src={pr.image}
                  alt={i === active ? `${pr.title} screenshot` : ""}
                  fill
                  sizes="(min-width: 1024px) 45vw, 1px"
                  className={`object-cover object-top transition-[opacity,transform] duration-500 ${i === active ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"}`}
                />
              ))}
            </div>
          </div>
          <div className="mt-6" aria-live="polite">
            <p className="max-w-[56ch] text-[16px] leading-relaxed text-[#2c2d28]">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span key={s} className={`${mono} rounded-[4px] border border-[#121212]/20 bg-white px-2 py-1 text-[12px]`}>
                  {s}
                </span>
              ))}
            </div>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className={`${mono} mt-5 inline-flex items-center gap-1.5 text-[13px] underline decoration-[#121212]/30 underline-offset-4 hover:decoration-[#121212]`}>
              {project.displayUrl} <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PrototypeV10PixelsView({ activity, featured }: { activity: PrototypeV10Activity | null; featured?: React.ReactNode }) {
  const reduce = useReducedMotion();
  const days = activity?.days ?? null;
  const fmt = (n: number) => n.toLocaleString("en-US");
  const label = activity
    ? `GitHub contribution graph for the last year: ${fmt(activity.total)} contributions over ${activity.activeDays} active days, with YONIE written across it.`
    : "The name YONIE drawn as a contribution-style pixel grid. Live GitHub data is unavailable right now.";
  const enter = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: prototypeEase, delay } };

  return (
    <div className={`${display} min-h-[100dvh] bg-[#f4f4ee] text-[#121212] selection:bg-[#d4ff3a] selection:text-[#121212]`}>
      <header className="sticky top-0 z-30 border-b border-[#121212]/10 bg-[#f4f4ee]/85 backdrop-blur-md">
        <div className="mx-auto flex h-[68px] max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2.5" aria-label="Yonie Rivera-Aguilar, back to top">
            <PrototypeV10Monogram />
            <span className="text-[15px] font-bold tracking-[-0.02em] [font-stretch:108%] sm:text-[17px] sm:[font-stretch:112%]">Yonie Rivera-Aguilar</span>
          </a>
          <nav className="flex items-center gap-1 sm:gap-2">
            <a href="#work" className="hidden rounded-full px-3 py-2 text-[14px] font-medium text-[#3d3e38] transition hover:bg-[#121212]/5 hover:text-[#121212] md:block">
              Work
            </a>
            <a href={p.github} target="_blank" rel="noopener noreferrer" className="mr-1 hidden rounded-full px-3 py-2 text-[14px] font-medium text-[#3d3e38] transition hover:bg-[#121212]/5 hover:text-[#121212] md:block">
              GitHub
            </a>
            <PrototypeV10Actions compact />
          </nav>
        </div>
      </header>

      <div id="top" className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <section className="pb-14 pt-8 sm:pt-12 lg:pb-20">
          <motion.div {...enter(0)} className="flex items-center gap-3">
            <Image src={p.photo} alt="" width={44} height={44} priority className="rounded-[10px] border-2 border-[#121212]" />
            <span className={`${mono} text-[12.5px] text-[#3d3e38]`}>{p.availability}</span>
          </motion.div>
          <motion.h1 {...enter(0.06)} className="mt-6 max-w-[20ch] text-[36px] font-bold leading-[1.02] tracking-[-0.04em] [font-stretch:108%] sm:text-[54px] lg:text-[58px]">
            Yonie Rivera-Aguilar builds full-stack apps,{" "}
            <span className="whitespace-nowrap rounded-[6px] px-1.5 [box-decoration-break:clone]" style={{ background: lime }}>
              one commit
            </span>{" "}
            at a time.
          </motion.h1>
          <motion.p {...enter(0.12)} className="mt-5 max-w-[52ch] text-[17px] leading-relaxed text-[#3d3e38]">
            UW Informatics, class of {p.classOf}.{" "}
            {activity ? "Every square below is a real day of my GitHub activity this past year." : "My full commit history lives on GitHub."}
          </motion.p>

          <motion.div {...enter(0.18)} className="mt-8 rounded-[20px] border-2 border-[#121212] bg-white p-4 shadow-[6px_6px_0_#121212] sm:p-7">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              {activity ? (
                <div>
                  <p className={`${pixel} text-[44px] leading-none sm:text-[64px]`}>{fmt(activity.total)}</p>
                  <p className="mt-2 text-[15px] font-semibold">contributions on GitHub in the last year</p>
                </div>
              ) : (
                <div>
                  <p className="text-[22px] font-bold tracking-[-0.02em]">My GitHub activity</p>
                  <p className="mt-1 text-[15px] text-[#3d3e38]">Live contribution data didn&apos;t load just now. It&apos;s always up to date on my profile.</p>
                </div>
              )}
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`${mono} group inline-flex w-fit items-center gap-1.5 rounded-full border-2 border-[#121212] px-3.5 py-2 text-[12.5px] font-medium transition hover:bg-[#121212] hover:text-white`}
              >
                github.com/{p.githubHandle}
                <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>

            <div className="mt-6 hidden md:block">
              <PrototypeV10Grid days={days} weeks={53} label={label} />
            </div>
            <div className="mt-5 md:hidden">
              <PrototypeV10Grid days={days} weeks={30} label={label} />
            </div>

            <div className={`mt-5 flex-col gap-4 border-t border-[#121212]/10 pt-5 sm:flex-row sm:items-center sm:justify-between ${activity ? "flex" : "hidden"}`}>
              {activity ? (
                <dl className="grid grid-cols-3 gap-4 sm:flex sm:gap-10">
                  <div>
                    <dt className="text-[12.5px] text-[#5e5f57]">Active days</dt>
                    <dd className={`${pixel} mt-1 text-[20px] sm:text-[24px]`}>{fmt(activity.activeDays)}</dd>
                  </div>
                  <div>
                    <dt className="text-[12.5px] text-[#5e5f57]">Longest streak</dt>
                    <dd className={`${pixel} mt-1 text-[20px] sm:text-[24px]`}>
                      {activity.longestStreak}
                      <span className="ml-1 font-[family-name:var(--prototype-archivo)] text-[13px] font-semibold">days</span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[12.5px] text-[#5e5f57]">Best day</dt>
                    <dd className={`${pixel} mt-1 text-[20px] sm:text-[24px]`}>
                      {activity.bestDay.count}
                      <span className="mt-0.5 block font-[family-name:var(--prototype-archivo)] text-[13px] font-semibold sm:ml-1 sm:mt-0 sm:inline">on {prototypeV10FormatDate(activity.bestDay.date, false)}</span>
                    </dd>
                  </div>
                </dl>
              ) : (
                <span />
              )}
              <div className={`${mono} items-center gap-1.5 text-[11.5px] text-[#5e5f57] ${activity ? "flex" : "hidden"}`} aria-hidden>
                {activity && <span className="mr-4 hidden [@media(hover:hover)]:md:inline">Hover to see the days under the name</span>}
                Less
                {levelColors.map((c) => (
                  <span key={c} className="h-3 w-3 rounded-[2px]" style={{ background: c }} />
                ))}
                More
              </div>
            </div>
          </motion.div>
        </section>

        <section id="work" className="scroll-mt-24 py-16 lg:py-24">
          <PrototypeReveal>
            <h2 className="text-[44px] font-bold leading-none tracking-[-0.04em] [font-stretch:112%] sm:text-[64px]">What those commits built</h2>
          </PrototypeReveal>
          {featured}
          <PrototypeV10Work />
        </section>

        <section className="grid grid-cols-1 items-start gap-12 border-t-2 border-[#121212] py-16 lg:grid-cols-[300px_1fr] lg:gap-16 lg:py-24">
          <PrototypeReveal>
            <div className="relative mx-auto w-fit lg:mx-0">
              <Image src={p.photo} alt="Portrait of Yonie Rivera-Aguilar" width={240} height={240} className="h-[220px] w-[220px] rounded-[16px] border-2 border-[#121212] object-cover lg:h-[240px] lg:w-[240px]" />
              <div className="pointer-events-none absolute -bottom-5 -right-6 grid grid-cols-5 gap-[3px]" aria-hidden>
                {["..##.", ".####", "###.#", ".#.##", "#.###"].flatMap((row, r) =>
                  row.split("").map((ch, c) => (
                    <span key={`${r}-${c}`} className="h-4 w-4 rounded-[2px]" style={{ background: ch === "#" ? (r + c) % 3 === 0 ? "#a8d50f" : lime : "transparent" }} />
                  )),
                )}
              </div>
            </div>
          </PrototypeReveal>
          <PrototypeReveal delay={0.06}>
            <h2 className="text-[34px] font-bold leading-[1.05] tracking-[-0.03em] [font-stretch:108%] sm:text-[44px]">About me</h2>
            <p className="mt-5 max-w-[60ch] text-[18px] leading-relaxed text-[#2c2d28]">{p.pitch}</p>
            <dl className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <dt className={`${mono} text-[12px] text-[#5e5f57]`}>{p.schoolDates}</dt>
                <dd className="mt-1 text-[16px] font-semibold leading-snug">
                  {p.school}
                  <span className="block font-normal text-[#3d3e38]">
                    {p.degree}, GPA {p.gpa}
                  </span>
                </dd>
              </div>
              {prototypeActivities.map((a) => (
                <div key={a.title}>
                  <dt className={`${mono} text-[12px] text-[#5e5f57]`}>{a.period}</dt>
                  <dd className="mt-1 text-[16px] font-semibold leading-snug">
                    {a.title}
                    <span className="block font-normal text-[#3d3e38]">{a.role}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-2">
              {prototypeSkillGroups.flatMap((g) => g.skills).map((s) => (
                <span key={s} className={`${mono} rounded-[4px] border border-[#121212]/20 bg-white px-2.5 py-1 text-[12.5px] transition hover:border-[#121212] hover:bg-[#d4ff3a]`}>
                  {s}
                </span>
              ))}
            </div>
          </PrototypeReveal>
        </section>
      </div>

      <section id="contact" className="scroll-mt-24 border-t-2 border-[#121212]" style={{ background: lime }}>
        <div className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:py-24">
          <PrototypeReveal>
            <h2 className="text-[52px] font-bold leading-[0.95] tracking-[-0.05em] [font-stretch:112%] sm:text-[96px]">Let&apos;s talk.</h2>
            <p className="mt-4 max-w-[46ch] text-[18px]">I&apos;m looking for software engineering internships and new-grad roles.</p>
            <a href={p.emailHref} className="group mt-8 inline-flex items-center gap-2 border-b-[3px] border-[#121212] pb-1 text-[22px] font-bold tracking-[-0.02em] sm:text-[36px]">
              {p.email}
              <ArrowUpRight className="h-6 w-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 sm:h-8 sm:w-8" />
            </a>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <PrototypeV10Actions />
              {[
                { label: "LinkedIn", href: p.linkedin },
                { label: "GitHub", href: p.github },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#121212] px-4 py-2.5 text-[14px] font-semibold transition hover:bg-[#121212] hover:text-[#d4ff3a]"
                >
                  {l.label} <ArrowUpRight size={15} strokeWidth={2.5} />
                </a>
              ))}
            </div>
          </PrototypeReveal>
          <div className={`${mono} mt-16 flex flex-col justify-between gap-2 border-t border-[#121212]/25 pt-6 text-[12px] sm:flex-row`}>
            <span>{p.name}</span>
            <span>{p.location}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
