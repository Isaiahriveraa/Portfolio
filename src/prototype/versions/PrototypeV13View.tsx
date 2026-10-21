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
import {
  ArrowUpRight,
  ChevronDown,
  FileText,
  Mail,
  Trophy,
} from "lucide-react";
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
  prototypeV13Iuga as iuga,
  prototypeV13Neutral,
  prototypeV13Projects,
  type PrototypeV13Project,
  type PrototypeV13Theme,
  type PrototypeV13Video,
} from "../prototype-v13-projects";

/** Reduced-motion preference that hydrates as "no preference" and then updates, so server and client HTML match. */
function usePrototypeV13Reduced() {
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

const sans = "font-[family-name:var(--prototype-archivo)]";
const mono = "font-[family-name:var(--prototype-space-mono)]";
const wide = "[font-stretch:112%]";

/* GitHub's own contribution greens, so a dense year reads as dense. */
const levels = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
/* Each letter of the name flashes in one project's accent before settling to ink. */
const letterFlash = prototypeV13Projects
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

function PrototypeV13Grid({
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
      className={`relative ${days ? "prototype-v13-gridwrap" : ""}`}
      onPointerLeave={() => setHover(null)}
    >
      <div
        className={`${mono} relative mb-2 h-4 text-[11px] text-[#6b6b6b]`}
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
        className={`grid grid-flow-col gap-[2px] sm:gap-[3px] lg:gap-1 ${playing ? "prototype-v13-play" : ""}`}
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
                className={`prototype-v13-cell aspect-square rounded-[2px] sm:rounded-[3px] ${name ? "prototype-v13-name" : ""} ${
                  hover && hover.col === c && hover.row === r
                    ? "ring-2 ring-[#111111] ring-offset-1 ring-offset-white"
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
          className={`${mono} pointer-events-none absolute z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#111111] px-2.5 py-1.5 text-[12px] text-[#fafafa] shadow-lg`}
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

function PrototypeV13Monogram() {
  return (
    <span className="grid grid-cols-5 gap-[1.5px]" aria-hidden>
      {glyphs.Y.flatMap((row, r) =>
        row
          .split("")
          .map((ch, c) => (
            <span
              key={`${r}-${c}`}
              className="h-[3.5px] w-[3.5px] rounded-[0.5px]"
              style={{ background: ch === "#" ? "#216e39" : "#d6dbd2" }}
            />
          )),
      )}
    </span>
  );
}

function PrototypeV13Pill({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-stretch overflow-hidden rounded-full border border-[#111111]/15 bg-white shadow-[0_1px_2px_rgba(17,17,17,0.06)]">
      <a
        href={p.emailHref}
        className={`flex items-center gap-2 text-[14px] font-semibold text-[#111111] transition-colors hover:bg-[#f4f4f2] ${compact ? "px-3 py-2 sm:px-4" : "px-4 py-2.5"}`}
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
        className={`prototype-v13-accent-fill group flex items-center gap-1.5 text-[14px] font-semibold transition-[filter] hover:brightness-110 ${compact ? "px-3 py-2 sm:px-4" : "px-4 py-2.5"}`}
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

function PrototypeV13Loop({
  video,
  sizes,
}: {
  video: PrototypeV13Video;
  sizes: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = usePrototypeV13Reduced();
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
        className="object-cover object-top"
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
      className="absolute inset-0 h-full w-full object-cover object-top"
    >
      <source src={`${video.src}.webm`} type="video/webm" />
      <source src={`${video.src}.mp4`} type="video/mp4" />
    </video>
  );
}

function PrototypeV13Frames({ project }: { project: PrototypeV13Project }) {
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-12% 0px" },
    transition: { duration: 0.8, ease: prototypeEase, delay },
  });
  return (
    <div
      className={`relative ${project.phone ? "pb-24 pr-3 sm:pb-10 sm:pr-14 lg:pb-14" : ""}`}
    >
      <motion.div {...rise(0)} className="group/frame">
        <div className="overflow-hidden rounded-[14px] border border-[#111111]/10 bg-white shadow-[0_24px_60px_-28px_rgba(17,17,17,0.35)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/frame:-translate-y-1 motion-reduce:transform-none">
          <div className="flex items-center gap-3 border-b border-[#111111]/[0.07] px-3.5 py-2.5">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-[#e4e4e2]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#e4e4e2]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#e4e4e2]" />
            </span>
            <span
              className={`${mono} mx-auto w-full max-w-[320px] truncate rounded-md bg-[#f4f4f2] px-3 py-1 text-center text-[12px] text-[#555555]`}
            >
              {project.urlLabel}
            </span>
            <span className="w-[42px]" aria-hidden />
          </div>
          <div className="relative aspect-[16/10] bg-white">
            <PrototypeV13Loop
              video={project.desktop}
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </div>
        </div>
      </motion.div>
      {project.phone && (
        <motion.div
          {...rise(0.15)}
          className="absolute -bottom-1 right-0 w-[24%] min-w-[96px] max-w-[172px] sm:-bottom-2 lg:-right-6"
        >
          <div className="rounded-[28px] border border-[#111111]/10 bg-white p-[5px] shadow-[0_24px_50px_-18px_rgba(17,17,17,0.4)] sm:rounded-[32px] sm:p-[6px]">
            <div className="relative aspect-[390/844] overflow-hidden rounded-[23px] bg-white sm:rounded-[26px]">
              <PrototypeV13Loop video={project.phone} sizes="172px" />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function PrototypeV13Kicker({ project }: { project: PrototypeV13Project }) {
  if (project.event)
    return (
      <div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span
            className={`prototype-v13-local-fill inline-flex items-center gap-2 rounded-full font-bold tracking-[-0.01em] ${project.event.award ? "px-4 py-2 text-[17px]" : "px-3.5 py-1.5 text-[15px]"}`}
          >
            {project.event.award && (
              <Trophy size={18} strokeWidth={2.25} aria-hidden />
            )}
            {project.event.award ?? `Built at ${project.event.name}`}
          </span>
          {project.event.award && (
            <span className="text-[17px] font-bold tracking-[-0.01em]">
              {project.event.name}
            </span>
          )}
        </div>
        {project.event.detail && (
          <p className="mt-2 text-[14px] text-[#555555]">
            {project.event.detail}
          </p>
        )}
      </div>
    );
  if (project.logo)
    return (
      <div className="flex items-center gap-3">
        <Image
          src={project.logo.src}
          alt={project.logo.alt}
          width={project.logo.width}
          height={project.logo.height}
          className="h-8 w-auto"
        />
        <span className="border-l border-[#111111]/15 pl-3 text-[14px] font-medium leading-snug text-[#555555]">
          {project.context}
        </span>
      </div>
    );
  return (
    <p className="text-[14px] font-medium text-[#555555]">{project.context}</p>
  );
}

function PrototypeV13Showcase({ project }: { project: PrototypeV13Project }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const reduce = usePrototypeV13Reduced();
  const reveal = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-12% 0px" },
    transition: { duration: 0.7, ease: prototypeEase },
  };
  const site = project.links[0];

  return (
    <article
      data-prototype-theme={project.id}
      aria-labelledby={`${panelId}-title`}
      className="scroll-mt-24 py-12 lg:py-16"
      style={
        {
          "--v13-local-accent": project.theme.accent,
          "--v13-local-on-accent": project.theme.onAccent,
          "--v13-local-mark": project.theme.mark,
        } as React.CSSProperties
      }
    >
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <motion.div {...reveal} className="lg:col-span-5">
          <PrototypeV13Kicker project={project} />
          <h3
            id={`${panelId}-title`}
            className={`${wide} mt-4 text-[38px] font-bold leading-[1.02] tracking-[-0.035em] sm:text-[48px]`}
          >
            {project.title}
          </h3>
          {project.achievement && (
            <p className="mt-4 text-[20px] font-semibold leading-[1.35] tracking-[-0.01em] text-[#111111] sm:text-[22px]">
              <span className="prototype-v13-mark">{project.achievement}</span>
            </p>
          )}
          <p className="mt-3 max-w-[46ch] text-[16px] leading-[1.55] text-[#3d3d3d] sm:text-[17px]">
            {project.hook}
          </p>
          {project.part && (
            <p className="prototype-v13-local-rule mt-4 max-w-[46ch] border-l-[3px] pl-3 text-[15px] leading-[1.5] text-[#3d3d3d]">
              <span className="font-bold text-[#111111]">My part. </span>
              {project.part}
            </p>
          )}
          {project.media && (
            <a
              href={project.media.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 flex items-center gap-3 rounded-[12px] border border-[#111111]/10 bg-white/70 p-2 pr-4 transition hover:bg-white"
            >
              <span className="relative aspect-[16/9] w-[132px] shrink-0 overflow-hidden rounded-[8px] border border-[#111111]/[0.06]">
                <Image
                  src={project.media.src}
                  alt={project.media.alt}
                  fill
                  sizes="132px"
                  className="object-cover"
                />
              </span>
              <span className="text-[14px] leading-snug">
                <span className="block font-semibold text-[#111111]">
                  {project.media.caption}
                </span>
                <span className="mt-0.5 inline-flex items-center gap-1 text-[#555555]">
                  Watch on Devpost
                  <ArrowUpRight
                    size={14}
                    strokeWidth={2.25}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </span>
            </a>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`${panelId}-panel`}
              onClick={() => setOpen((v) => !v)}
              className="prototype-v13-local-fill group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-semibold transition-[filter,transform] hover:brightness-110 active:scale-[0.98]"
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
              className="group inline-flex items-center gap-1.5 rounded-full border border-[#111111]/15 bg-white/60 px-4 py-2.5 text-[15px] font-semibold text-[#111111] transition-colors hover:bg-white"
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
        <div className="lg:col-span-7">
          <PrototypeV13Frames project={project} />
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
            <div className="mt-8 grid grid-cols-1 gap-8 rounded-[16px] border border-[#111111]/[0.08] bg-white/75 p-6 sm:p-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <p className="max-w-[62ch] text-[17px] leading-[1.6] text-[#262626]">
                  {project.story}
                </p>
                <h4
                  className={`${wide} mt-7 text-[18px] font-bold tracking-[-0.01em]`}
                >
                  {project.team ? "What we built" : "What I built"}
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {project.built.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[16px] leading-[1.5] text-[#3d3d3d]"
                    >
                      <span
                        className="prototype-v13-local-bg mt-[8px] h-[7px] w-[7px] shrink-0 rounded-[2px]"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-7 lg:col-span-5">
                {project.team && (
                  <div>
                    <h4
                      className={`${wide} text-[18px] font-bold tracking-[-0.01em]`}
                    >
                      Team
                    </h4>
                    <p className="mt-2 text-[16px] leading-[1.5] text-[#3d3d3d]">
                      {project.team}
                    </p>
                  </div>
                )}
                <div>
                  <h4
                    className={`${wide} text-[18px] font-bold tracking-[-0.01em]`}
                  >
                    Stack
                  </h4>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((s) => (
                      <li
                        key={s}
                        className={`${mono} rounded-md border border-[#111111]/10 bg-white px-2.5 py-1 text-[13px] text-[#262626]`}
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
                      className={`group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-semibold transition ${
                        i === 0
                          ? "prototype-v13-local-fill hover:brightness-110"
                          : "border border-[#111111]/15 bg-white text-[#111111] hover:border-[#111111]/40"
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

/* A loose cluster of contribution squares behind the portrait, borrowed from v2's pixel motif. */
const photoPixels = [
  "..##.#",
  ".#.###",
  "##.#..",
  ".###.#",
  "#.#.##",
  ".##.#.",
];

export function PrototypeV13View({
  activity,
}: {
  activity: PrototypeV10Activity | null;
}) {
  const [theme, setTheme] = useState<PrototypeV13Theme>(prototypeV13Neutral);
  const rootRef = useRef<HTMLDivElement>(null);
  const days = activity?.days ?? null;
  const fmt = (n: number) => n.toLocaleString("en-US");

  // A thin band across the middle of the viewport decides whose palette the page wears.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const themes = new Map(prototypeV13Projects.map((pr) => [pr.id, pr.theme]));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting)
            setTheme(
              themes.get(
                (e.target as HTMLElement).dataset.prototypeTheme ?? "",
              ) ?? prototypeV13Neutral,
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
        className={`${sans} prototype-v13-themed min-h-[100dvh] text-[#111111] selection:bg-[#d4ff3a] selection:text-[#111111]`}
        style={
          {
            "--v13-bg": theme.bg,
            "--v13-accent": theme.accent,
            "--v13-on-accent": theme.onAccent,
          } as React.CSSProperties
        }
      >
        <header className="prototype-v13-header sticky top-0 z-30 border-b border-[#111111]/[0.07] backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6">
            <a
              href="#top"
              className="flex items-center gap-2.5"
              aria-label="Yonie Rivera-Aguilar, back to top"
            >
              <PrototypeV13Monogram />
              <span
                className={`${wide} text-[15px] font-bold tracking-[-0.03em] sm:text-[17px]`}
              >
                yonie rivera-aguilar
              </span>
            </a>
            <nav
              className="flex items-center gap-1 sm:gap-2"
              aria-label="Primary"
            >
              <a
                href="#work"
                className="hidden rounded-full px-3 py-2 text-[14px] font-semibold text-[#3d3d3d] transition hover:bg-[#111111]/5 hover:text-[#111111] md:block"
              >
                Work
              </a>
              <a
                href="#about"
                className="mr-1 hidden rounded-full px-3 py-2 text-[14px] font-semibold text-[#3d3d3d] transition hover:bg-[#111111]/5 hover:text-[#111111] md:block"
              >
                About
              </a>
              <PrototypeV13Pill compact />
            </nav>
          </div>
        </header>

        <div id="top" className="mx-auto max-w-[1240px] px-4 sm:px-6">
          {/* Hero: portrait left, first-person intro right. */}
          <section
            data-prototype-theme="neutral"
            className="grid grid-cols-1 items-center gap-8 pb-10 pt-8 sm:pt-12 lg:grid-cols-12 lg:gap-12 lg:pb-14 lg:pt-14"
          >
            <motion.div {...enter(0)} className="lg:col-span-5">
              <div className="relative w-[200px] sm:w-[260px] lg:ml-6 lg:w-[340px]">
                <div
                  className="absolute -left-3 -top-4 grid grid-cols-6 gap-[5px] sm:-left-8 sm:-top-8 sm:gap-[7px]"
                  aria-hidden
                >
                  {photoPixels.flatMap((row, r) =>
                    row.split("").map((ch, c) => (
                      <span
                        key={`${r}-${c}`}
                        className="h-[14px] w-[14px] rounded-[3px] sm:h-[22px] sm:w-[22px] sm:rounded-[4px]"
                        style={{
                          background:
                            ch === "#"
                              ? levels[1 + ((r + c) % 4)]
                              : "transparent",
                        }}
                      />
                    )),
                  )}
                </div>
                <Image
                  src={p.photo}
                  alt="Yonie Rivera-Aguilar"
                  width={302}
                  height={302}
                  priority
                  className="relative aspect-square w-full rounded-[16px] border border-[#111111]/10 object-cover shadow-[0_30px_60px_-30px_rgba(17,17,17,0.45)]"
                />
                <span className="absolute -bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-[#111111]/10 bg-white px-3 py-1.5 text-[13px] font-semibold shadow-sm">
                  <span
                    className="h-2 w-2 rounded-full bg-[#40c463]"
                    aria-hidden
                  />
                  {p.availability}
                </span>
              </div>
            </motion.div>
            <div className="pt-4 lg:col-span-7 lg:pt-0">
              <motion.h1
                {...enter(0.06)}
                className={`${wide} text-[52px] font-light leading-[0.95] tracking-[-0.05em] sm:text-[72px] lg:text-[88px]`}
              >
                Hey, I&apos;m <span className="font-bold">Yonie.</span>
              </motion.h1>
              <motion.p
                {...enter(0.12)}
                className="mt-6 max-w-[30ch] text-[22px] font-light leading-[1.3] tracking-[-0.02em] sm:text-[28px]"
              >
                I study <strong className="font-bold">Informatics at UW</strong>{" "}
                (class of {p.classOf}) and build{" "}
                <strong className="font-bold">full-stack apps</strong>. As
                IUGA&apos;s Director of IT, I{" "}
                <span className="prototype-v13-mark prototype-v13-mark-lime font-semibold">
                  built its merch shop
                </span>
                , and I ship hackathon projects like FittingRoom.
              </motion.p>
              <motion.div
                {...enter(0.18)}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <a
                  href={p.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#111111] px-5 py-3 text-[15px] font-semibold text-white transition hover:bg-[#2a2a2a] active:scale-[0.98]"
                >
                  <FileText size={17} strokeWidth={2} />
                  Résumé
                  <ArrowUpRight
                    size={16}
                    strokeWidth={2.25}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
                <a
                  href={p.emailHref}
                  className="inline-flex items-center gap-2 rounded-full border border-[#111111]/15 bg-white px-5 py-3 text-[15px] font-semibold transition hover:border-[#111111]/40"
                >
                  <Mail size={17} strokeWidth={2} />
                  Email me
                </a>
              </motion.div>
            </div>
          </section>

          {/* GitHub activity */}
          <motion.section
            {...enter(0.24)}
            data-prototype-theme="neutral"
            aria-labelledby="prototype-v13-activity"
            className="rounded-[16px] border border-[#111111]/[0.08] bg-white p-4 shadow-[0_20px_50px_-30px_rgba(17,17,17,0.3)] sm:p-7"
          >
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2
                  id="prototype-v13-activity"
                  className={`${wide} text-[26px] font-light leading-[1.1] tracking-[-0.035em] sm:text-[36px]`}
                >
                  {activity ? (
                    <>
                      <span className="font-bold tabular-nums">
                        {fmt(activity.total)}
                      </span>{" "}
                      contributions in the last year.
                    </>
                  ) : (
                    <>
                      My <span className="font-bold">GitHub</span> activity.
                    </>
                  )}
                </h2>
                <p className="mt-2 max-w-[60ch] text-[15px] leading-[1.5] text-[#555555] sm:text-[16px]">
                  {activity
                    ? "IUGA's website, hackathon builds, and side projects, one commit at a time. Each square is a real day on my GitHub."
                    : "Live contribution data didn't load just now. It's always up to date on my profile."}
                </p>
              </div>
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`${mono} group inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-[#111111]/15 px-3.5 py-2 text-[13px] transition hover:bg-[#111111] hover:text-white`}
              >
                github.com/{p.githubHandle}
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
            <div className="mt-6 hidden md:block">
              <PrototypeV13Grid days={days} weeks={53} label={label} />
            </div>
            <div className="mt-5 md:hidden">
              <PrototypeV13Grid days={days} weeks={30} label={label} />
            </div>
            <div
              className={`mt-5 flex-col gap-4 border-t border-[#111111]/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-between ${activity ? "flex" : "hidden"}`}
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
                      <dt className="text-[13px] text-[#555555]">{s.k}</dt>
                      <dd
                        className={`${wide} mt-1 text-[24px] font-bold tracking-[-0.03em] tabular-nums`}
                      >
                        {s.v}
                        {s.u && (
                          <span
                            className={`${sans} mt-0.5 block text-[13px] font-normal tracking-normal text-[#555555] [font-stretch:100%] sm:ml-1.5 sm:mt-0 sm:inline`}
                          >
                            {s.u}
                          </span>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
              <div
                className={`${mono} flex items-center gap-1.5 text-[12px] text-[#555555]`}
                aria-hidden
              >
                <span className="mr-4 hidden [@media(hover:hover)]:md:inline">
                  Hover a square for its day
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
          </motion.section>

          <section id="work" className="scroll-mt-20 pt-20 lg:pt-28">
            <h2
              data-prototype-theme="neutral"
              className={`${wide} text-[44px] font-bold leading-none tracking-[-0.045em] sm:text-[72px]`}
            >
              selected work.
            </h2>
            <div>
              {prototypeV13Projects.map((project) => (
                <PrototypeV13Showcase key={project.id} project={project} />
              ))}
            </div>
          </section>

          <section
            id="about"
            data-prototype-theme="neutral"
            className="scroll-mt-20 border-t border-[#111111]/15 py-16 lg:py-24"
          >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <h2
                  className={`${wide} text-[44px] font-bold leading-none tracking-[-0.045em] sm:text-[72px]`}
                >
                  about me.
                </h2>
                <p className="mt-6 max-w-[34ch] text-[20px] font-light leading-[1.4] tracking-[-0.015em] sm:text-[24px]">
                  I&apos;m a{" "}
                  <strong className="font-bold">full-stack developer</strong>{" "}
                  working mostly in React, Next.js, and TypeScript. I build
                  tools that solve real problems, from peer-to-peer tutoring to
                  voice-native macOS automation.
                </p>
              </div>
              <div className="space-y-6 lg:col-span-7">
                <div className="rounded-[16px] border border-[#111111]/[0.08] bg-white p-6 shadow-[0_20px_50px_-34px_rgba(17,17,17,0.35)] sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <Image
                      src={iuga.logo.src}
                      alt={iuga.logo.alt}
                      width={iuga.logo.width}
                      height={iuga.logo.height}
                      className="h-10 w-auto"
                    />
                    <a
                      href={iuga.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${mono} group inline-flex items-center gap-1.5 rounded-full border border-[#111111]/15 px-3 py-1.5 text-[13px] transition hover:bg-[#111111] hover:text-white`}
                    >
                      iuga.info
                      <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  </div>
                  <h3
                    className={`${wide} mt-6 text-[30px] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[36px]`}
                  >
                    {iuga.role}
                  </h3>
                  <p className="mt-1 text-[17px] font-semibold text-[#3d3d3d]">
                    {iuga.name} ({iuga.short}), UW
                  </p>
                  <p className="mt-4 max-w-[62ch] text-[16px] leading-[1.6] text-[#3d3d3d]">
                    {iuga.short} is the undergraduate student government for UW
                    Informatics, run by Informatics undergraduates for
                    Informatics undergraduates.
                  </p>
                  <p className="mt-3 max-w-[62ch] text-[16px] leading-[1.6] text-[#3d3d3d]">
                    I lead {iuga.short}&apos;s IT Committee, which maintains
                    iuga.info so students can find resources and discover
                    events, and supports the iStartup Lab.{" "}
                    <span className="prototype-v13-mark prototype-v13-mark-lime font-semibold text-[#111111]">
                      I built the site&apos;s shop and most of its events pages:
                      249 of its 616 commits.
                    </span>
                  </p>
                </div>
                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div>
                    <dt className={`${mono} text-[12px] text-[#555555]`}>
                      {p.schoolDates}
                    </dt>
                    <dd className="mt-1.5 text-[17px] font-bold leading-snug">
                      {p.school}
                      <span className="mt-0.5 block text-[15px] font-normal text-[#3d3d3d]">
                        {p.degree}, class of {p.classOf}
                      </span>
                      <span className="mt-0.5 block text-[15px] font-normal text-[#3d3d3d]">
                        GPA {p.gpa}
                      </span>
                    </dd>
                  </div>
                  {prototypeActivities.map((a) => (
                    <div key={a.title}>
                      <dt className={`${mono} text-[12px] text-[#555555]`}>
                        {a.period}
                      </dt>
                      <dd className="mt-1.5 text-[17px] font-bold leading-snug">
                        {a.title}
                        <span className="mt-0.5 block text-[15px] font-normal text-[#3d3d3d]">
                          {a.role}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>

          <section
            id="contact"
            data-prototype-theme="neutral"
            className="pb-10"
          >
            <div className="rounded-[16px] bg-[#d4ff3a] px-6 py-12 sm:px-12 sm:py-16">
              <h2
                className={`${wide} text-[60px] font-light leading-[0.95] tracking-[-0.05em] sm:text-[120px]`}
              >
                let&apos;s <span className="font-bold">talk.</span>
              </h2>
              <p className="mt-5 max-w-[46ch] text-[18px] leading-[1.5] text-[#1f1f1f] sm:text-[20px]">
                I&apos;m looking for software engineering internships and
                new-grad roles.
              </p>
              <a
                href={p.emailHref}
                className={`${wide} group mt-8 inline-flex items-center gap-3 border-b-2 border-[#111111] pb-1 text-[22px] font-bold tracking-[-0.03em] sm:text-[40px]`}
              >
                {p.email}
                <ArrowUpRight className="h-6 w-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 sm:h-8 sm:w-8" />
              </a>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                {[
                  { label: "Résumé", href: p.resume },
                  { label: "LinkedIn", href: p.linkedin },
                  { label: "GitHub", href: p.github },
                ].map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 rounded-full bg-[#111111] px-4 py-2.5 text-[14px] font-semibold text-[#f4f4f2] transition hover:bg-[#2a2a2a]"
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
            <div
              className={`${mono} mt-6 flex flex-col justify-between gap-2 text-[12px] text-[#555555] sm:flex-row`}
            >
              <span>{p.name}</span>
              <span>{p.location}</span>
            </div>
          </section>
        </div>
      </div>
    </MotionConfig>
  );
}
