"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  prototypeActivities,
  prototypeProfile as p,
  prototypeProjects,
  prototypeSkillGroups,
} from "../prototype-content";
import { PrototypeReveal, prototypeEase } from "../prototype-shared";

const display = "font-[family-name:var(--prototype-archivo)]";
const mono = "font-[family-name:var(--prototype-space-mono)]";
const lime = "#d4ff3a";

/* Pixel mosaic over the portrait: a fixed pattern of lit cells (col,row) on a 9x7 grid. */
const prototypeMosaic: [number, number][] = [
  [0, 1], [1, 1], [1, 2], [2, 0], [2, 2], [3, 1], [3, 3], [4, 2], [4, 4], [5, 1], [5, 3],
  [6, 2], [6, 4], [7, 3], [7, 5], [8, 4], [0, 4], [1, 5], [2, 4], [3, 6], [5, 5], [6, 6], [8, 2],
];

function PrototypeV2Project({ project, large = false }: { project: (typeof prototypeProjects)[number]; large?: boolean }) {
  return (
    <a href={project.url} target="_blank" rel="noopener noreferrer" className="group block">
      <div className={`relative overflow-hidden border border-[#0e0e0e] bg-[#0e0e0e] ${large ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 30vw, 100vw"}
          className="object-cover object-top grayscale transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
        />
        <span
          className="absolute bottom-0 right-0 flex h-12 w-12 translate-y-full items-center justify-center text-[#0e0e0e] transition-transform duration-300 group-hover:translate-y-0"
          style={{ background: lime }}
          aria-hidden
        >
          <ArrowUpRight size={22} />
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className={`${mono} text-[11px] uppercase text-[#0e0e0e]/60`}>{project.context}</p>
          <h3 className={`${display} mt-1 font-bold leading-[1.05] tracking-[-0.02em] [font-stretch:112%] ${large ? "text-[34px] md:text-[44px]" : "text-[26px]"}`}>
            {project.title}
          </h3>
        </div>
      </div>
      <p className={`mt-2 max-w-[48ch] leading-relaxed text-[#0e0e0e]/75 ${large ? "text-[17px]" : "text-[15px]"}`}>
        {large ? project.description : project.oneLiner}
      </p>
      <p className={`${mono} mt-3 text-[12px] text-[#0e0e0e]/60`}>{project.stack.join(" / ")}</p>
    </a>
  );
}

export function PrototypeV2Editorial() {
  const reduce = useReducedMotion();
  const [feature, ...rest] = prototypeProjects;

  return (
    <div className={`${display} min-h-[100dvh] bg-[#f3f3ef] text-[#0e0e0e] selection:bg-[#d4ff3a] selection:text-[#0e0e0e]`}>
      <header className="sticky top-0 z-20 border-b border-[#0e0e0e]/10 bg-[#f3f3ef]/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:px-8">
          <a href="#top" className="text-[17px] font-bold tracking-[-0.03em] [font-stretch:115%]">
            yonie rivera-aguilar
          </a>
          <nav className={`${mono} hidden items-center gap-8 text-[12px] uppercase md:flex`}>
            <a href="#work" className="hover:underline hover:underline-offset-4">Work</a>
            <a href="#about" className="hover:underline hover:underline-offset-4">About</a>
            <a href="#contact" className="hover:underline hover:underline-offset-4">Contact</a>
          </nav>
          <a
            href={p.resume}
            target="_blank"
            rel="noopener noreferrer"
            className={`${mono} inline-flex items-center gap-2 border border-[#0e0e0e] px-3.5 py-2 text-[12px] uppercase transition hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#0e0e0e] active:translate-y-0 active:shadow-none`}
            style={{ background: lime }}
          >
            Résumé <ArrowUpRight size={14} />
          </a>
        </div>
      </header>

      <div id="top" className="mx-auto max-w-[1400px] px-4 pt-4 md:px-8 md:pt-6">
        <section className="relative grid min-h-[calc(100dvh-104px)] grid-cols-1 overflow-hidden bg-[#0e0e0e] text-[#f3f3ef] md:grid-cols-12">
          <div className="relative z-10 flex flex-col justify-between p-6 md:col-span-7 md:p-12">
            <p className={`${mono} text-[12px] uppercase text-[#f3f3ef]/60`}>{p.availability}</p>
            <div className="mt-16 md:mt-0">
              <motion.h1
                initial={reduce ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: prototypeEase }}
                className="text-[64px] font-light leading-[0.92] tracking-[-0.05em] [font-stretch:110%] sm:text-[96px] lg:text-[132px]"
              >
                yonie
                <br />
                <span className="font-semibold">rivera</span>
              </motion.h1>
              <p className="mt-8 max-w-[40ch] text-[17px] leading-relaxed text-[#f3f3ef]/80">
                Software engineer and UW Informatics student, class of {p.classOf}. I build full-stack web apps with React, Next.js, and TypeScript.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#work"
                  className={`${mono} inline-flex items-center gap-2 px-4 py-3 text-[12px] uppercase text-[#0e0e0e] transition hover:gap-3 active:scale-[0.98]`}
                  style={{ background: lime }}
                >
                  See the work <ArrowRight size={14} />
                </a>
                <a
                  href={p.emailHref}
                  className={`${mono} inline-flex items-center gap-2 border border-[#f3f3ef]/40 px-4 py-3 text-[12px] uppercase transition hover:border-[#f3f3ef] active:scale-[0.98]`}
                >
                  Email me
                </a>
              </div>
            </div>
          </div>
          <div className="relative flex items-center justify-center p-6 pb-14 md:col-span-5 md:p-12">
            <div className="relative">
              <Image
                src={p.photo}
                alt="Portrait of Yonie Rivera-Aguilar"
                width={280}
                height={280}
                priority
                className="relative h-[220px] w-[220px] object-cover grayscale contrast-125 md:h-[280px] md:w-[280px]"
              />
              <div className="pointer-events-none absolute -left-[150px] -top-12 grid grid-cols-9 grid-rows-7 gap-0 md:-left-[250px] md:-top-16" aria-hidden>
                {prototypeMosaic.map(([c, r], i) => (
                  <motion.span
                    key={`${c}-${r}`}
                    initial={reduce ? false : { opacity: 0, scale: 0.4 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.035, duration: 0.3 }}
                    className="h-6 w-6 md:h-9 md:w-9"
                    style={{ gridColumn: c + 1, gridRow: r + 1, background: lime }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-20 py-20 md:py-32">
          <PrototypeReveal>
            <p className="max-w-[22ch] text-[34px] font-light leading-[1.18] tracking-[-0.03em] md:text-[58px]">
              I build <strong className="font-bold">full-stack web apps</strong> and{" "}
              <span className="prototype-v2-mark font-semibold italic">tools that solve real problems</span>, from{" "}
              <span className="prototype-v2-scribble">peer-to-peer tutoring</span> to{" "}
              <strong className="font-bold">voice-native macOS automation</strong>.
            </p>
          </PrototypeReveal>
          <PrototypeReveal delay={0.1} className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-12">
            <p className="text-[17px] leading-relaxed text-[#0e0e0e]/75 md:col-span-5 md:col-start-6">
              I&apos;m studying {p.degree} at the {p.school} (class of {p.classOf}) and specialize in React,
              Next.js, and TypeScript. <span className="prototype-v2-mark">{p.now}</span>
            </p>
          </PrototypeReveal>
        </section>

        <section id="work" className="scroll-mt-20 border-t border-[#0e0e0e] pt-10 md:pt-14">
          <h2 className="text-[44px] font-bold leading-none tracking-[-0.04em] [font-stretch:115%] md:text-[80px]">
            selected work.
          </h2>
          <PrototypeReveal className="mt-10 md:mt-14">
            <PrototypeV2Project project={feature} large />
          </PrototypeReveal>
          <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
            {rest.map((project, i) => (
              <PrototypeReveal key={project.id} delay={(i % 2) * 0.08} className={i % 2 === 1 ? "md:mt-24" : ""}>
                <PrototypeV2Project project={project} />
              </PrototypeReveal>
            ))}
          </div>
        </section>

        <section className="mt-24 border-t border-[#0e0e0e] pt-10 md:mt-32 md:pt-14">
          <h2 className="text-[44px] font-bold leading-none tracking-[-0.04em] [font-stretch:115%] md:text-[80px]">
            what I work with.
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {prototypeSkillGroups.map((g, i) => (
              <PrototypeReveal key={g.label} delay={i * 0.06}>
                <div
                  className={`${mono} group relative h-full border border-[#0e0e0e] p-5 pt-8 transition duration-300 hover:-rotate-1 hover:shadow-[6px_6px_0_#0e0e0e] ${i % 2 === 0 ? "" : "bg-white"}`}
                  style={i % 2 === 0 ? { background: lime } : undefined}
                >
                  <div className="absolute left-5 right-5 top-3 flex justify-between" aria-hidden>
                    {Array.from({ length: 8 }).map((_, k) => (
                      <span key={k} className="h-2 w-2 rounded-full bg-[#f3f3ef] ring-1 ring-[#0e0e0e]" />
                    ))}
                  </div>
                  <h3 className="text-[13px] font-bold uppercase">{g.label}</h3>
                  <ul className="mt-4 space-y-1.5 text-[14px]">
                    {g.skills.map((s) => (
                      <li key={s}>+ {s}</li>
                    ))}
                  </ul>
                </div>
              </PrototypeReveal>
            ))}
          </div>
        </section>

        <section className="mt-24 grid grid-cols-1 gap-12 border-t border-[#0e0e0e] pt-10 md:mt-32 md:grid-cols-12 md:pt-14">
          <div className="md:col-span-5">
            <h2 className="text-[44px] font-bold leading-none tracking-[-0.04em] [font-stretch:115%] md:text-[64px]">
              school & clubs.
            </h2>
          </div>
          <div className="space-y-10 md:col-span-7">
            <div>
              <p className={`${mono} text-[12px] uppercase text-[#0e0e0e]/60`}>{p.schoolDates}</p>
              <h3 className="mt-1 text-[28px] font-semibold tracking-[-0.02em]">{p.school}</h3>
              <p className="mt-1 text-[16px] text-[#0e0e0e]/75">
                {p.degree}, GPA {p.gpa}
              </p>
            </div>
            {prototypeActivities.map((a) => (
              <div key={a.title}>
                <p className={`${mono} text-[12px] uppercase text-[#0e0e0e]/60`}>{a.period}</p>
                <h3 className="mt-1 text-[24px] font-semibold tracking-[-0.02em]">{a.title}</h3>
                <p className="mt-1 text-[16px] text-[#0e0e0e]/75">{a.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="mt-24 scroll-mt-20 p-6 md:mt-32 md:p-14" style={{ background: lime }}>
          <h2 className="text-[52px] font-light leading-[0.95] tracking-[-0.05em] [font-stretch:110%] md:text-[120px]">
            let&apos;s <span className="font-bold">talk.</span>
          </h2>
          <a
            href={p.emailHref}
            className="group mt-10 inline-flex items-center gap-3 border-b-2 border-[#0e0e0e] pb-1 text-[22px] font-semibold tracking-[-0.02em] md:text-[40px]"
          >
            {p.email}
            <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
          <div className={`${mono} mt-12 flex flex-wrap gap-3 text-[12px] uppercase`}>
            {[
              { label: "LinkedIn", href: p.linkedin },
              { label: "GitHub", href: p.github },
              { label: "Résumé (PDF)", href: p.resume },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#0e0e0e] bg-[#0e0e0e] px-4 py-3 text-[#f3f3ef] transition hover:bg-transparent hover:text-[#0e0e0e]"
              >
                {l.label} <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        </section>

        <footer className={`${mono} flex flex-col justify-between gap-2 py-8 text-[12px] uppercase text-[#0e0e0e]/60 sm:flex-row`}>
          <span>{p.name}</span>
          <span>{p.location}</span>
        </footer>
      </div>
    </div>
  );
}
