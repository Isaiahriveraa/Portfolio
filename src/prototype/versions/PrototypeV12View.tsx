"use client";

import Image from "next/image";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, FileText, Mail } from "lucide-react";
import {
  prototypeActivities,
  prototypeProfile as p,
} from "../prototype-content";
import type {
  PrototypeV10Activity,
  PrototypeV10Day,
} from "../prototype-v10-github";
import { prototypeEase } from "../prototype-shared";
import {
  prototypeV12Neutral,
  prototypeV12Projects,
  type PrototypeV12Project,
  type PrototypeV12Theme,
  type PrototypeV12Video,
} from "../prototype-v12-projects";

/** Reduced-motion preference that hydrates as "no preference" and then updates, so server and client HTML match. */
function usePrototypeV12Reduced() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

const sans = "font-[family-name:var(--prototype-geist)]";
const mono = "font-[family-name:var(--prototype-geist-mono)]";

/* Neutral contribution ramp; the name is drawn in ink on top of it. */
const levels = ["#e4e4e7", "#d2d2d8", "#b3b3bc", "#90909a", "#6c6c76"];
/* Each letter flashes in one project's accent before settling to ink. */
const letterFlash = prototypeV12Projects
  .slice(0, 5)
  .map((pr) => pr.theme.accent);

const glyphs: Record<string, string[]> = {
  Y: ["#...#", "#...#", ".#.#.", "..#..", "..#..", "..#..", "..#.."],
  O: [".###.", "#...#", "#...#", "#...#", "#...#", "#...#", ".###."],
  N: ["#...#", "##..#", "##..#", "#.#.#", "#..##", "#..##", "#...#"],
  I: ["###", ".#.", ".#.", ".#.", ".#.", ".#.", "###"],
  E: ["#####", "#....", "#....", "####.", "#....", "#....", "#####"],
};

function nameCells(word: string, offset: number) {
  const lit = new Map<string, { order: number; letter: number }>();
  let col = offset;
  let order = 0;
  [...word].forEach((ch, letter) => {
    const g = glyphs[ch];
    for (let c = 0; c < g[0].length; c++)
      for (let r = 0; r < 7; r++)
        if (g[r][c] === "#")
          lit.set(`${col + c},${r}`, { order: order++, letter });
    col += g[0].length + 1;
  });
  return { lit, width: col - offset - 1 };
}
const nameWidth = nameCells("YONIE", 0).width;

const fmtDate = (date: string, year = true) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: year ? "numeric" : undefined,
    timeZone: "UTC",
  });

function weeksOf(
  days: PrototypeV10Day[] | null,
  weeks: number,
): (PrototypeV10Day | null)[][] {
  if (!days)
    return Array.from({ length: weeks }, () =>
      Array<PrototypeV10Day | null>(7).fill(null),
    );
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

function PrototypeV12Grid({
  days,
  weeks,
  label,
}: {
  days: PrototypeV10Day[] | null;
  weeks: number;
  label: string;
}) {
  const [hover, setHover] = useState<{ col: number; row: number } | null>(null);
  const cols = useMemo(() => weeksOf(days, weeks), [days, weeks]);
  const offset = Math.max(0, Math.floor((cols.length - nameWidth) / 2));
  const { lit } = useMemo(() => nameCells("YONIE", offset), [offset]);
  const sweep = cols.length * 12;
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    const t = window.setTimeout(
      () => setPlaying(false),
      sweep + 150 + lit.size * 7 + 900,
    );
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
            label: new Date(Date.UTC(2000, m, 1)).toLocaleDateString("en-US", {
              month: "short",
              timeZone: "UTC",
            }),
          });
        last = m;
      }
    });
    return out;
  }, [cols]);
  const hovered = hover ? cols[hover.col]?.[hover.row] : null;

  return (
    <div
      className={`relative ${days ? "prototype-v12-gridwrap" : ""}`}
      onPointerLeave={() => setHover(null)}
    >
      <div
        className={`${mono} relative mb-2 h-4 text-[11px] text-[#71717a]`}
        aria-hidden
      >
        {days &&
          months.map((m) => (
            <span
              key={`${m.col}-${m.label}`}
              className="absolute"
              style={{ left: `${(m.col / cols.length) * 100}%` }}
            >
              {m.label}
            </span>
          ))}
      </div>
      <div
        role="img"
        aria-label={label}
        className={`grid grid-flow-col gap-[2px] sm:gap-[3px] lg:gap-1 ${playing ? "prototype-v12-play" : ""}`}
        style={{
          gridTemplateColumns: `repeat(${cols.length}, minmax(0, 1fr))`,
          gridTemplateRows: "repeat(7, auto)",
        }}
      >
        {cols.map((col, c) =>
          col.map((day, r) => {
            const name = lit.get(`${c},${r}`);
            const color = day
              ? levels[day.level]
              : days
                ? "transparent"
                : levels[0];
            return (
              <span
                key={`${c}-${r}`}
                onPointerEnter={() => day && setHover({ col: c, row: r })}
                className={`prototype-v12-cell aspect-square rounded-[2px] sm:rounded-[3px] ${name ? "prototype-v12-name" : ""} ${
                  hover && hover.col === c && hover.row === r
                    ? "ring-2 ring-[#18181b] ring-offset-1 ring-offset-white"
                    : ""
                }`}
                style={
                  {
                    "--prototype-c": color,
                    "--prototype-flash": name
                      ? letterFlash[name.letter]
                      : undefined,
                    "--prototype-d": `${c * 12 + r * 4}ms`,
                    "--prototype-nd": `${sweep + 150 + (name?.order ?? 0) * 7}ms`,
                  } as React.CSSProperties
                }
              />
            );
          }),
        )}
      </div>
      {hovered && hover && (
        <div
          className={`${mono} pointer-events-none absolute z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#18181b] px-2.5 py-1.5 text-[12px] text-[#fafafa] shadow-lg`}
          style={{
            left: `${((hover.col + 0.5) / cols.length) * 100}%`,
            top: `calc(${(hover.row / 7) * 100}% - 18px)`,
          }}
        >
          {hovered.count === 0
            ? "No contributions"
            : `${hovered.count} contribution${hovered.count === 1 ? "" : "s"}`}{" "}
          on {fmtDate(hovered.date)}
        </div>
      )}
    </div>
  );
}

function PrototypeV12Monogram() {
  return (
    <span className="grid grid-cols-5 gap-[1.5px]" aria-hidden>
      {glyphs.Y.flatMap((row, r) =>
        row
          .split("")
          .map((ch, c) => (
            <span
              key={`${r}-${c}`}
              className="h-[3.5px] w-[3.5px] rounded-[0.5px]"
              style={{ background: ch === "#" ? "#18181b" : "#d4d4d8" }}
            />
          )),
      )}
    </span>
  );
}

function PrototypeV12Pill({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-stretch overflow-hidden rounded-full border border-[#18181b]/15 bg-white shadow-[0_1px_2px_rgba(24,24,27,0.06)]">
      <a
        href={p.emailHref}
        className={`group flex items-center gap-2 text-[14px] font-medium text-[#18181b] transition-colors hover:bg-[#f4f4f5] ${compact ? "px-3 py-2 sm:px-4" : "px-4 py-2.5"}`}
      >
        <Mail size={16} strokeWidth={2} />
        <span className={compact ? "sr-only sm:not-sr-only" : ""}>
          Email me
        </span>
      </a>
      <a
        href={p.resume}
        target="_blank"
        rel="noopener noreferrer"
        className={`prototype-v12-accent-fill group flex items-center gap-1.5 text-[14px] font-medium transition-[filter] hover:brightness-110 ${compact ? "px-3 py-2 sm:px-4" : "px-4 py-2.5"}`}
      >
        <FileText
          size={16}
          strokeWidth={2}
          className={compact ? "hidden sm:block" : ""}
        />
        Résumé
        <ArrowUpRight
          size={15}
          strokeWidth={2.25}
          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </a>
    </div>
  );
}

function PrototypeV12Loop({
  video,
  sizes,
  className = "",
}: {
  video: PrototypeV12Video;
  sizes: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = usePrototypeV12Reduced();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  if (reduce)
    return (
      <Image
        src={video.poster}
        alt={video.label}
        fill
        sizes={sizes}
        className={`object-cover object-top ${className}`}
      />
    );
  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="metadata"
      poster={video.poster}
      aria-label={video.label}
      className={`absolute inset-0 h-full w-full object-cover object-top ${className}`}
    >
      <source src={`${video.src}.webm`} type="video/webm" />
      <source src={`${video.src}.mp4`} type="video/mp4" />
    </video>
  );
}

function PrototypeV12Frames({ project }: { project: PrototypeV12Project }) {
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 36 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-12% 0px" },
    transition: { duration: 0.8, ease: prototypeEase, delay },
  });
  return (
    <div
      className={`relative ${project.phone ? "pb-24 pr-3 sm:pb-10 sm:pr-14 lg:pb-14" : ""}`}
    >
      <motion.div {...rise(0)} className="group/frame">
        <div className="overflow-hidden rounded-[14px] border border-[#18181b]/10 bg-white shadow-[0_24px_60px_-28px_rgba(24,24,27,0.35)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/frame:-translate-y-1 motion-reduce:transform-none">
          <div className="flex items-center gap-3 border-b border-[#18181b]/[0.07] px-3.5 py-2.5">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-[#e4e4e7]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#e4e4e7]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#e4e4e7]" />
            </span>
            <span
              className={`${mono} mx-auto w-full max-w-[320px] truncate rounded-md bg-[#f4f4f5] px-3 py-1 text-center text-[12px] text-[#52525b]`}
            >
              {project.urlLabel}
            </span>
            <span className="w-[42px]" aria-hidden />
          </div>
          <div className="relative aspect-[16/10] bg-white">
            <PrototypeV12Loop
              video={project.desktop}
              sizes="(min-width: 1024px) 760px, 100vw"
            />
          </div>
        </div>
      </motion.div>
      {project.phone && (
        <motion.div
          {...rise(0.15)}
          className="absolute -bottom-1 right-0 w-[24%] max-w-[172px] min-w-[96px] sm:-bottom-2 lg:-right-6"
        >
          <div className="rounded-[28px] border border-[#18181b]/10 bg-white p-[5px] shadow-[0_24px_50px_-18px_rgba(24,24,27,0.4)] sm:rounded-[32px] sm:p-[6px]">
            <div className="relative aspect-[390/844] overflow-hidden rounded-[23px] bg-white sm:rounded-[26px]">
              <PrototypeV12Loop video={project.phone} sizes="172px" />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function PrototypeV12Showcase({ project }: { project: PrototypeV12Project }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const reduce = usePrototypeV12Reduced();
  const reveal = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-12% 0px" },
    transition: { duration: 0.7, ease: prototypeEase },
  };
  const site = project.links[0];

  return (
    <article
      data-prototype-theme={project.id}
      aria-labelledby={`${panelId}-title`}
      className="scroll-mt-24 py-16 lg:py-24"
    >
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <motion.div {...reveal} className="lg:col-span-4">
          <p className="text-[14px] text-[#52525b]">{project.meta}</p>
          <h3
            id={`${panelId}-title`}
            className="mt-2 text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[40px]"
          >
            {project.title}
          </h3>
          <p className="mt-4 max-w-[40ch] text-[18px] leading-[1.5] text-[#3f3f46]">
            {project.hook}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`${panelId}-panel`}
              onClick={() => setOpen((v) => !v)}
              className="prototype-v12-accent-fill group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-medium transition-[filter,transform] hover:brightness-110 active:scale-[0.98]"
            >
              {open ? "Show less" : "Read the story"}
              <ChevronDown
                size={17}
                strokeWidth={2.25}
                className={`transition-transform duration-300 ${open ? "rotate-180" : "group-hover:translate-y-0.5"}`}
              />
            </button>
            <a
              href={site.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 rounded-full border border-[#18181b]/15 bg-white/60 px-4 py-2.5 text-[15px] font-medium text-[#18181b] transition-colors hover:bg-white"
            >
              {site.label}
              <ArrowUpRight
                size={16}
                strokeWidth={2.25}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </motion.div>
        <div className="lg:col-span-8">
          <PrototypeV12Frames project={project} />
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${panelId}-panel`}
            role="region"
            aria-label={`${project.title} details`}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={
              reduce
                ? { height: 0, opacity: 0, transition: { duration: 0 } }
                : { height: 0, opacity: 0 }
            }
            transition={{ duration: reduce ? 0 : 0.45, ease: prototypeEase }}
            className="overflow-hidden"
          >
            <div className="mt-10 grid grid-cols-1 gap-10 rounded-[16px] border border-[#18181b]/[0.08] bg-white/70 p-6 sm:p-8 lg:grid-cols-12 lg:gap-14 lg:p-10">
              <div className="lg:col-span-7">
                <p className="max-w-[62ch] text-[17px] leading-[1.6] text-[#27272a]">
                  {project.story}
                </p>
                <h4 className="mt-8 text-[14px] font-semibold text-[#18181b]">
                  What I built
                </h4>
                <ul className="mt-3 space-y-3">
                  {project.built.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[16px] leading-[1.5] text-[#3f3f46]"
                    >
                      <span
                        className="prototype-v12-accent-bg mt-[9px] h-[7px] w-[7px] shrink-0 rounded-[2px]"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-8 lg:col-span-5">
                {(project.role || project.team) && (
                  <div>
                    <h4 className="text-[14px] font-semibold text-[#18181b]">
                      My part
                    </h4>
                    {project.role && (
                      <p className="mt-2 text-[16px] leading-[1.5] text-[#3f3f46]">
                        {project.role}
                      </p>
                    )}
                    {project.team && (
                      <p className="mt-2 text-[16px] leading-[1.5] text-[#3f3f46]">
                        {project.team}
                      </p>
                    )}
                  </div>
                )}
                <div>
                  <h4 className="text-[14px] font-semibold text-[#18181b]">
                    Stack
                  </h4>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((s) => (
                      <li
                        key={s}
                        className={`${mono} rounded-md border border-[#18181b]/10 bg-white px-2.5 py-1 text-[13px] text-[#27272a]`}
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {project.links.map((l, i) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-medium transition ${
                        i === 0
                          ? "prototype-v12-accent-fill hover:brightness-110"
                          : "border border-[#18181b]/15 bg-white text-[#18181b] hover:border-[#18181b]/40"
                      }`}
                    >
                      {l.label}
                      <ArrowUpRight
                        size={15}
                        strokeWidth={2.25}
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

export function PrototypeV12View({
  activity,
}: {
  activity: PrototypeV10Activity | null;
}) {
  const [theme, setTheme] = useState<PrototypeV12Theme>(prototypeV12Neutral);
  const rootRef = useRef<HTMLDivElement>(null);
  const days = activity?.days ?? null;
  const fmt = (n: number) => n.toLocaleString("en-US");

  // A thin band across the middle of the viewport decides whose palette the page wears.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const themes = new Map(prototypeV12Projects.map((pr) => [pr.id, pr.theme]));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting)
            setTheme(
              themes.get(
                (e.target as HTMLElement).dataset.prototypeTheme ?? "",
              ) ?? prototypeV12Neutral,
            );
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    root
      .querySelectorAll<HTMLElement>("[data-prototype-theme]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const label = activity
    ? `GitHub contribution graph for the last year: ${fmt(activity.total)} contributions over ${activity.activeDays} active days, with YONIE written across it.`
    : "The name YONIE drawn as a contribution-style pixel grid. Live GitHub data is unavailable right now.";
  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: prototypeEase, delay },
  });

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={rootRef}
        className={`${sans} prototype-v12-themed min-h-[100dvh] text-[#18181b] selection:bg-[#18181b] selection:text-white`}
        style={
          {
            "--v12-bg": theme.bg,
            "--v12-accent": theme.accent,
            "--v12-on-accent": theme.onAccent,
          } as React.CSSProperties
        }
      >
        <header className="prototype-v12-header sticky top-0 z-30 border-b border-[#18181b]/[0.07] backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6">
            <a
              href="#top"
              className="flex items-center gap-2.5"
              aria-label="Yonie Rivera-Aguilar, back to top"
            >
              <PrototypeV12Monogram />
              <span className="text-[15px] font-semibold tracking-[-0.01em] sm:text-[16px]">
                Yonie Rivera-Aguilar
              </span>
            </a>
            <nav
              className="flex items-center gap-1 sm:gap-2"
              aria-label="Primary"
            >
              <a
                href="#work"
                className="hidden rounded-full px-3 py-2 text-[14px] font-medium text-[#3f3f46] transition hover:bg-[#18181b]/5 hover:text-[#18181b] md:block"
              >
                Work
              </a>
              <a
                href="#about"
                className="mr-1 hidden rounded-full px-3 py-2 text-[14px] font-medium text-[#3f3f46] transition hover:bg-[#18181b]/5 hover:text-[#18181b] md:block"
              >
                About
              </a>
              <PrototypeV12Pill compact />
            </nav>
          </div>
        </header>

        <div id="top" className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <section
            data-prototype-theme="neutral"
            className="pb-16 pt-10 sm:pt-14 lg:pb-24"
          >
            <motion.div {...enter(0)} className="flex items-center gap-3">
              <Image
                src={p.photo}
                alt=""
                width={40}
                height={40}
                priority
                className="rounded-full border border-[#18181b]/10"
              />
              <span className="text-[14px] text-[#52525b]">
                {p.availability}
              </span>
            </motion.div>
            <motion.h1
              {...enter(0.06)}
              className="mt-6 max-w-[22ch] text-[38px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[52px] lg:text-[56px]"
            >
              Full-stack apps, built one commit at a time.
            </motion.h1>
            <motion.p
              {...enter(0.12)}
              className="mt-4 max-w-[54ch] text-[18px] leading-[1.55] text-[#52525b]"
            >
              UW Informatics, class of {p.classOf}.{" "}
              {activity
                ? "Every square below is a real day of my GitHub activity this past year."
                : "My full commit history lives on GitHub."}
            </motion.p>

            <motion.div
              {...enter(0.18)}
              className="mt-9 rounded-[16px] border border-[#18181b]/[0.08] bg-white p-4 shadow-[0_20px_50px_-30px_rgba(24,24,27,0.3)] sm:p-7"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                {activity ? (
                  <div>
                    <p className="text-[40px] font-semibold leading-none tracking-[-0.03em] tabular-nums sm:text-[48px]">
                      {fmt(activity.total)}
                    </p>
                    <p className="mt-2 text-[15px] text-[#52525b]">
                      contributions on GitHub in the last year
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-[22px] font-semibold tracking-[-0.02em]">
                      My GitHub activity
                    </p>
                    <p className="mt-1 text-[15px] text-[#52525b]">
                      Live contribution data didn&apos;t load just now.
                      It&apos;s always up to date on my profile.
                    </p>
                  </div>
                )}
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${mono} group inline-flex w-fit items-center gap-1.5 rounded-full border border-[#18181b]/15 px-3.5 py-2 text-[13px] transition hover:bg-[#18181b] hover:text-white`}
                >
                  github.com/{p.githubHandle}
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </div>
              <div className="mt-6 hidden md:block">
                <PrototypeV12Grid days={days} weeks={53} label={label} />
              </div>
              <div className="mt-5 md:hidden">
                <PrototypeV12Grid days={days} weeks={30} label={label} />
              </div>
              <div
                className={`mt-5 flex-col gap-4 border-t border-[#18181b]/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-between ${activity ? "flex" : "hidden"}`}
              >
                {activity && (
                  <dl className="grid grid-cols-3 gap-4 sm:flex sm:gap-10">
                    {[
                      { k: "Active days", v: fmt(activity.activeDays), u: "" },
                      {
                        k: "Longest streak",
                        v: String(activity.longestStreak),
                        u: "days",
                      },
                      {
                        k: "Best day",
                        v: String(activity.bestDay.count),
                        u: `on ${fmtDate(activity.bestDay.date, false)}`,
                      },
                    ].map((s) => (
                      <div key={s.k}>
                        <dt className="text-[13px] text-[#52525b]">{s.k}</dt>
                        <dd className="mt-1 text-[22px] font-semibold tracking-[-0.02em] tabular-nums">
                          {s.v}
                          {s.u && (
                            <span className="mt-0.5 block text-[13px] font-normal tracking-normal text-[#52525b] sm:ml-1.5 sm:mt-0 sm:inline">
                              {s.u}
                            </span>
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
                <div
                  className={`${mono} flex items-center gap-1.5 text-[12px] text-[#52525b]`}
                  aria-hidden
                >
                  <span className="mr-4 hidden [@media(hover:hover)]:md:inline">
                    Hover to see the days under the name
                  </span>
                  Less
                  {levels.map((c) => (
                    <span
                      key={c}
                      className="h-3 w-3 rounded-[2px]"
                      style={{ background: c }}
                    />
                  ))}
                  More
                </div>
              </div>
            </motion.div>
          </section>

          <section id="work" className="scroll-mt-20 pt-8 lg:pt-12">
            <h2
              data-prototype-theme="neutral"
              className="text-[32px] font-semibold tracking-[-0.03em] sm:text-[40px]"
            >
              Selected work
            </h2>
            <div>
              {prototypeV12Projects.map((project) => (
                <PrototypeV12Showcase key={project.id} project={project} />
              ))}
            </div>
          </section>

          <section
            id="about"
            data-prototype-theme="neutral"
            className="scroll-mt-20 grid grid-cols-1 gap-10 border-t border-[#18181b]/10 py-16 md:grid-cols-12 lg:py-24"
          >
            <div className="md:col-span-4">
              <Image
                src={p.photo}
                alt="Portrait of Yonie Rivera-Aguilar"
                width={220}
                height={220}
                className="h-[200px] w-[200px] rounded-[16px] object-cover lg:h-[220px] lg:w-[220px]"
              />
            </div>
            <div className="md:col-span-8">
              <h2 className="text-[32px] font-semibold tracking-[-0.03em] sm:text-[40px]">
                About me
              </h2>
              <p className="mt-4 max-w-[60ch] text-[18px] leading-[1.6] text-[#3f3f46]">
                {p.pitch}
              </p>
              <dl className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <dt className="text-[13px] text-[#52525b]">
                    {p.schoolDates}
                  </dt>
                  <dd className="mt-1 text-[16px] font-medium leading-snug">
                    {p.school}
                    <span className="block font-normal text-[#52525b]">
                      {p.degree}, GPA {p.gpa}
                    </span>
                  </dd>
                </div>
                {prototypeActivities.map((a) => (
                  <div key={a.title}>
                    <dt className="text-[13px] text-[#52525b]">{a.period}</dt>
                    <dd className="mt-1 text-[16px] font-medium leading-snug">
                      {a.title}
                      <span className="block font-normal text-[#52525b]">
                        {a.role}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <section
            id="contact"
            className="border-t border-[#18181b]/10 py-16 lg:py-24"
          >
            <h2 className="text-[44px] font-semibold leading-[1.05] tracking-[-0.04em] sm:text-[64px]">
              Let&apos;s talk.
            </h2>
            <p className="mt-4 max-w-[46ch] text-[18px] text-[#3f3f46]">
              I&apos;m looking for software engineering internships and new-grad
              roles.
            </p>
            <a
              href={p.emailHref}
              className="group mt-6 inline-flex items-center gap-2 border-b-2 border-[#18181b] pb-1 text-[22px] font-semibold tracking-[-0.02em] sm:text-[32px]"
            >
              {p.email}
              <ArrowUpRight className="h-6 w-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <PrototypeV12Pill />
              {[
                { label: "LinkedIn", href: p.linkedin },
                { label: "GitHub", href: p.github },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#18181b]/15 bg-white/60 px-4 py-2.5 text-[14px] font-medium transition hover:bg-white"
                >
                  {l.label} <ArrowUpRight size={15} strokeWidth={2.25} />
                </a>
              ))}
            </div>
            <div className="mt-16 flex flex-col justify-between gap-2 border-t border-[#18181b]/10 pt-6 text-[13px] text-[#52525b] sm:flex-row">
              <span>{p.name}</span>
              <span>{p.location}</span>
            </div>
          </section>
        </div>
      </div>
    </MotionConfig>
  );
}
