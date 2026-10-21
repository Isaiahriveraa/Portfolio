"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { ArrowUpRight, FileText, Github, Linkedin, Mail } from "lucide-react";
import {
  prototypeActivities,
  prototypeProfile as p,
  prototypeProjects,
  prototypeSkillGroups,
  type PrototypeProject,
} from "../prototype-content";
import { PrototypeReveal, prototypeEase } from "../prototype-shared";

const mono = "font-[family-name:var(--prototype-jetbrains)]";
const head = "font-[family-name:var(--prototype-space-grotesk)]";
const neon = "#39ff88";
const tile = "rounded-[20px] border border-[#1d231f] bg-[#0f1210]";

type PrototypeV9Line = { id: number; kind: "cmd" | "out"; body: ReactNode };

const prototypeV9Commands = ["help", "projects", "skills", "education", "contact", "resume", "clear"] as const;

function prototypeV9Link(href: string, label: string) {
  const ext = href.startsWith("http") || href.endsWith(".pdf");
  return (
    <a href={href} target={ext ? "_blank" : undefined} rel={ext ? "noopener noreferrer" : undefined} className="text-[#39ff88] underline decoration-[#39ff88]/40 underline-offset-2 hover:decoration-[#39ff88]">
      {label}
    </a>
  );
}

function prototypeV9Run(cmd: string): ReactNode | "clear" {
  switch (cmd) {
    case "help":
      return (
        <span>
          Commands: {prototypeV9Commands.map((c, i) => (
            <span key={c}>
              <span className="text-[#39ff88]">{c}</span>
              {i < prototypeV9Commands.length - 1 ? ", " : ""}
            </span>
          ))}
        </span>
      );
    case "whoami":
      return `${p.name}. Software engineer, ${p.degree} at UW, class of ${p.classOf}.`;
    case "projects":
    case "ls":
      return (
        <ul>
          {prototypeProjects.map((pr) => (
            <li key={pr.id} className="flex flex-wrap gap-x-3">
              <span className="w-full text-[#39ff88] sm:w-[25ch]">{pr.title}</span>
              <span className="text-[#8a958e]">{pr.context}</span>
              {prototypeV9Link(pr.url, "open")}
            </li>
          ))}
        </ul>
      );
    case "skills":
      return (
        <ul>
          {prototypeSkillGroups.map((g) => (
            <li key={g.label}>
              <span className="text-[#39ff88]">{g.label}:</span> {g.skills.join(", ")}
            </li>
          ))}
        </ul>
      );
    case "education":
      return `${p.school}, ${p.degree} (${p.schoolDates}), GPA ${p.gpa}.`;
    case "contact":
      return (
        <span>
          {prototypeV9Link(p.emailHref, p.email)} / {prototypeV9Link(p.linkedin, `in/${p.linkedinHandle}`)} / {prototypeV9Link(p.github, `@${p.githubHandle}`)}
        </span>
      );
    case "resume":
      return <span>Résumé: {prototypeV9Link(p.resume, "resume.pdf")} (opens in a new tab)</span>;
    case "clear":
      return "clear";
    case "":
      return null;
    default:
      return (
        <span>
          command not found: {cmd}. Try <span className="text-[#39ff88]">help</span>.
        </span>
      );
  }
}

function prototypeV9Boot(cmd: string): PrototypeV9Line[] {
  return [
    { id: 1, kind: "cmd", body: cmd },
    { id: 2, kind: "out", body: prototypeV9Run(cmd) },
    { id: 3, kind: "cmd", body: "projects" },
    { id: 4, kind: "out", body: prototypeV9Run("projects") },
    { id: 5, kind: "out", body: <span className="text-[#8a958e]">Type help, or tap a command below.</span> },
  ];
}

function PrototypeV9Terminal() {
  const reduce = useReducedMotion();
  const [lines, setLines] = useState<PrototypeV9Line[]>([]);
  const [typed, setTyped] = useState("");
  const [input, setInput] = useState("");
  const [booted, setBooted] = useState(false);
  const idRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const push = (kind: PrototypeV9Line["kind"], body: ReactNode) => {
    idRef.current += 1;
    const id = idRef.current;
    setLines((l) => [...l, { id, kind, body }]);
  };

  // Boot sequence: type "whoami", print the answer, then hand over the prompt.
  useEffect(() => {
    const cmd = "whoami";
    let i = reduce ? cmd.length - 1 : 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const tick = () => {
      i += 1;
      setTyped(cmd.slice(0, i));
      if (i < cmd.length) timers.push(setTimeout(tick, 90));
      else
        timers.push(
          setTimeout(() => {
            setTyped("");
            idRef.current = 5;
            setLines([
              ...prototypeV9Boot(cmd),
            ]);
            setBooted(true);
          }, reduce ? 0 : 320),
        );
    };
    timers.push(setTimeout(tick, reduce ? 0 : 500));
    return () => timers.forEach(clearTimeout);
  }, [reduce]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const out = prototypeV9Run(cmd);
    if (out === "clear") {
      setLines([]);
      return;
    }
    push("cmd", raw.trim());
    if (out !== null) push("out", out);
    if (cmd === "resume") window.open(p.resume, "_blank", "noopener");
  };

  return (
    <div className={`${tile} prototype-v9-scan relative flex h-full min-h-[380px] flex-col overflow-hidden`}>
      <div className="flex items-center justify-between border-b border-[#1d231f] px-5 py-3">
        <span className={`${mono} text-[12px] text-[#8a958e]`}>yonie@uw: ~</span>
        <span className={`${mono} text-[12px] text-[#8a958e]`}>zsh</span>
      </div>
      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        className={`${mono} flex-1 overflow-y-auto px-5 py-4 text-[13.5px] leading-[1.75] text-[#d6ded8] sm:text-[14px]`}
        aria-live="polite"
      >
        {lines.map((l) =>
          l.kind === "cmd" ? (
            <div key={l.id} className="whitespace-pre-wrap">
              <span style={{ color: neon }}>yonie@uw</span>
              <span className="text-[#8a958e]">:~$ </span>
              {l.body}
            </div>
          ) : (
            <div key={l.id} className="mb-2 whitespace-pre-wrap">
              {l.body}
            </div>
          ),
        )}
        {booted ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              run(input);
              setInput("");
            }}
            className="flex items-center"
          >
            <label htmlFor="prototype-v9-input" className="shrink-0">
              <span style={{ color: neon }}>yonie@uw</span>
              <span className="text-[#8a958e]">:~$&nbsp;</span>
            </label>
            <input
              id="prototype-v9-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoComplete="off"
              spellCheck={false}
              aria-label="Terminal command"
              className="min-w-0 flex-1 bg-transparent text-[#eaf2ec] caret-[#39ff88] outline-none placeholder:text-[#5d6862]"
              placeholder="type a command"
            />
          </form>
        ) : (
          <div>
            <span style={{ color: neon }}>yonie@uw</span>
            <span className="text-[#8a958e]">:~$ </span>
            {typed}
            <span className="prototype-v9-caret ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.18em] bg-[#39ff88]" />
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2 border-t border-[#1d231f] px-5 py-3">
        {prototypeV9Commands.filter((c) => c !== "help").map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => run(c)}
            className={`${mono} rounded-md border border-[#26302a] bg-[#131815] px-2.5 py-1 text-[12px] text-[#b9c4bd] transition hover:border-[#39ff88]/60 hover:text-[#39ff88] active:scale-[0.97]`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

function PrototypeV9Project({ project, large = false }: { project: PrototypeProject; large?: boolean }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${tile} group flex h-full flex-col overflow-hidden transition duration-300 hover:border-[#39ff88]/50 hover:shadow-[0_0_0_1px_rgba(57,255,136,0.25),0_0_40px_-10px_rgba(57,255,136,0.45)]`}
    >
      <div className={`relative overflow-hidden border-b border-[#1d231f] ${large ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
        <Image src={project.image} alt={`${project.title} screenshot`} fill sizes={large ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"} className="object-cover object-top opacity-80 saturate-[0.6] transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100 group-hover:saturate-100" />
        <div className="prototype-v9-scan absolute inset-0" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className={`${head} flex items-center gap-1.5 text-[20px] font-semibold text-[#eaf2ec]`}>
            {project.title}
            <ArrowUpRight size={18} className="text-[#5d6862] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#39ff88]" />
          </h3>
          <span className={`${mono} shrink-0 rounded-md bg-[#1a201c] px-2 py-1 text-[11px] text-[#9aa59e]`}>{project.period ?? project.context}</span>
        </div>
        <p className="mt-1 text-[13px]" style={{ color: neon }}>
          {project.period ? project.context : project.displayUrl}
        </p>
        <p className="mt-3 text-[14.5px] leading-relaxed text-[#a9b4ad]">{large ? project.description : project.oneLiner}</p>
        {large && (
          <ul className="mt-3 space-y-1 text-[14px] text-[#c6d0c9]">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2">
                <span style={{ color: neon }}>&gt;</span>
                {h}
              </li>
            ))}
          </ul>
        )}
        <p className={`${mono} mt-auto pt-4 text-[12px] text-[#6f7a73]`}>{project.stack.join(" · ")}</p>
      </div>
    </a>
  );
}

export function PrototypeV9NeonBento() {
  const reduce = useReducedMotion();
  const [koda, guru, husky, commit, care] = prototypeProjects;

  return (
    <div className={`${head} min-h-[100dvh] bg-[#080a09] text-[#eaf2ec] selection:bg-[#39ff88] selection:text-[#080a09]`}>
      <div
        className="pointer-events-none fixed inset-0"
        style={{ background: "radial-gradient(50% 40% at 20% 0%, rgba(57,255,136,0.08), transparent 70%), radial-gradient(40% 40% at 100% 100%, rgba(57,255,136,0.05), transparent 70%)" }}
        aria-hidden
      />
      <header className="sticky top-0 z-20 border-b border-[#1d231f] bg-[#080a09]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-4 sm:px-6">
          <a href="#top" className={`${mono} text-[14px]`}>
            <span style={{ color: neon }}>~/</span>yonie
          </a>
          <nav className={`${mono} flex items-center gap-1 text-[13px]`}>
            <a href="#work" className="hidden rounded-md px-3 py-2 text-[#9aa59e] transition hover:text-[#eaf2ec] sm:block">./work</a>
            <a href={p.emailHref} className="rounded-md px-3 py-2 text-[#9aa59e] transition hover:text-[#eaf2ec]">./contact</a>
            <a href={p.resume} target="_blank" rel="noopener noreferrer" className="ml-1 inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-[#39ff88] transition hover:bg-[#39ff88] hover:text-[#080a09]" style={{ borderColor: `${neon}66` }}>
              <FileText size={14} /> resume.pdf
            </a>
          </nav>
        </div>
      </header>

      <div id="top" className="relative mx-auto max-w-[1240px] px-4 pb-16 pt-6 sm:px-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: prototypeEase }} className="lg:col-span-8 lg:row-span-2">
            <PrototypeV9Terminal />
          </motion.div>

          <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: prototypeEase, delay: 0.08 }} className={`${tile} p-6 lg:col-span-4`}>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Image src={p.photo} alt="Portrait of Yonie Rivera-Aguilar" width={76} height={76} priority className="rounded-[16px] border border-[#26302a]" />
                <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-[3px] border-[#0f1210]" style={{ background: neon }} title="Available" />
              </div>
              <div>
                <h1 className="text-[22px] font-semibold leading-tight tracking-[-0.01em]">Yonie Rivera-Aguilar</h1>
                <p className="mt-0.5 text-[14px] text-[#9aa59e]">Full-stack engineer, UW &apos;27</p>
              </div>
            </div>
            <p className="mt-5 text-[14.5px] leading-relaxed text-[#a9b4ad]">{p.short}</p>
            <p className={`${mono} mt-4 text-[12.5px]`} style={{ color: neon }}>
              status: {p.availability.toLowerCase()}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <a href={p.resume} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-[12px] px-3 py-2.5 text-[14px] font-semibold text-[#080a09] transition hover:shadow-[0_0_30px_-6px_rgba(57,255,136,0.8)] active:scale-[0.98]" style={{ background: neon }}>
                <FileText size={16} /> Résumé
              </a>
              <a href={p.emailHref} className="inline-flex items-center justify-center gap-2 rounded-[12px] border border-[#26302a] px-3 py-2.5 text-[14px] font-semibold transition hover:border-[#39ff88]/60 active:scale-[0.98]">
                <Mail size={16} /> Email me
              </a>
            </div>
          </motion.div>

          <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: prototypeEase, delay: 0.16 }} className={`${tile} p-2 lg:col-span-4`}>
            {[
              { label: "GitHub", value: `@${p.githubHandle}`, href: p.github, Icon: Github },
              { label: "LinkedIn", value: `in/${p.linkedinHandle}`, href: p.linkedin, Icon: Linkedin },
              { label: "Email", value: p.email, href: p.emailHref, Icon: Mail },
            ].map(({ label, value, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-3 rounded-[14px] px-4 py-3.5 transition hover:bg-[#151a17]"
              >
                <Icon size={18} className="text-[#6f7a73] transition group-hover:text-[#39ff88]" />
                <span className="text-[14px] font-medium">{label}</span>
                <span className={`${mono} ml-auto truncate text-[12px] text-[#6f7a73]`}>{value}</span>
                <ArrowUpRight size={15} className="shrink-0 text-[#4a544e] transition group-hover:text-[#39ff88]" />
              </a>
            ))}
          </motion.div>
        </div>

        <section id="work" className="scroll-mt-20 pt-14">
          <PrototypeReveal>
            <p className={`${mono} text-[13px] text-[#6f7a73]`}>
              <span style={{ color: neon }}>$</span> ls ~/projects
            </p>
            <h2 className="mt-2 text-[32px] font-semibold tracking-[-0.02em] sm:text-[40px]">Selected work</h2>
          </PrototypeReveal>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
            <PrototypeReveal className="md:col-span-2 lg:col-span-7">
              <PrototypeV9Project project={koda} large />
            </PrototypeReveal>
            <PrototypeReveal delay={0.06} className="lg:col-span-5">
              <PrototypeV9Project project={guru} />
            </PrototypeReveal>
            {[husky, commit, care].map((project, i) => (
              <PrototypeReveal key={project.id} delay={0.06 * i} className="lg:col-span-4">
                <PrototypeV9Project project={project} />
              </PrototypeReveal>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 pt-14 lg:grid-cols-12">
          <PrototypeReveal className="lg:col-span-5">
            <div className={`${tile} h-full p-6`}>
              <h2 className="text-[20px] font-semibold">Stack</h2>
              <div className="mt-5 space-y-4">
                {prototypeSkillGroups.map((g) => (
                  <div key={g.label}>
                    <p className={`${mono} text-[12px] text-[#6f7a73]`}>{g.label.toLowerCase()}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {g.skills.map((s) => (
                        <span key={s} className={`${mono} rounded-md border border-[#26302a] bg-[#131815] px-2 py-1 text-[12px] text-[#c6d0c9] transition hover:border-[#39ff88]/60 hover:text-[#39ff88]`}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </PrototypeReveal>
          <div className="grid grid-cols-1 gap-4 lg:col-span-7">
            <PrototypeReveal delay={0.06}>
              <div className={`${tile} p-6`}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-[20px] font-semibold">{p.school}</h2>
                    <p className="mt-0.5 text-[14px]" style={{ color: neon }}>
                      {p.degree}, GPA {p.gpa}
                    </p>
                  </div>
                  <span className={`${mono} rounded-md bg-[#1a201c] px-2 py-1 text-[11px] text-[#9aa59e]`}>{p.schoolDates}</span>
                </div>
                <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-1.5 text-[14px] text-[#a9b4ad] sm:grid-cols-2">
                  {p.coursework.map((c) => (
                    <li key={c} className="flex gap-2">
                      <span style={{ color: neon }}>&gt;</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </PrototypeReveal>
            <PrototypeReveal delay={0.1}>
              <div className={`${tile} grid grid-cols-1 gap-5 p-6 sm:grid-cols-2`}>
                {prototypeActivities.map((a) => (
                  <div key={a.title}>
                    <span className={`${mono} rounded-md bg-[#1a201c] px-2 py-1 text-[11px] text-[#9aa59e]`}>{a.period}</span>
                    <h3 className="mt-3 text-[16px] font-semibold leading-snug">{a.title}</h3>
                    <p className="mt-1 text-[14px] leading-relaxed text-[#a9b4ad]">{a.detail}</p>
                  </div>
                ))}
              </div>
            </PrototypeReveal>
          </div>
        </section>

        <PrototypeReveal className="pt-4">
          <div className={`${tile} overflow-hidden p-6`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-[20px] font-semibold">GitHub activity</h2>
              <a href={p.github} target="_blank" rel="noopener noreferrer" className={`${mono} text-[12.5px] text-[#9aa59e] transition hover:text-[#39ff88]`}>
                github.com/{p.githubHandle} ↗
              </a>
            </div>
            <div className="mt-5 overflow-x-auto">
              <GitHubCalendar
                username={p.githubHandle}
                colorScheme="dark"
                fontSize={11}
                blockSize={11}
                blockMargin={3}
                theme={{ dark: ["#141a16", "#0f4d2c", "#178a49", "#26c46a", "#39ff88"] }}
              />
            </div>
          </div>
        </PrototypeReveal>

        <footer className={`${mono} mt-10 flex flex-col justify-between gap-2 border-t border-[#1d231f] pt-6 text-[12px] text-[#6f7a73] sm:flex-row`}>
          <span>{p.name}</span>
          <span>{p.location}</span>
        </footer>
      </div>
    </div>
  );
}
