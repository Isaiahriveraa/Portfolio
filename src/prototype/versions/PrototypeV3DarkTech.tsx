"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Download, Github, Linkedin, Mail } from "lucide-react";
import {
  prototypeActivities,
  prototypeProfile as p,
  prototypeProjects,
  prototypeTechLogos,
} from "../prototype-content";
import { PrototypeReveal, prototypeEase, usePrototypeCopy } from "../prototype-shared";

const mono = "font-[family-name:var(--prototype-jetbrains)]";
const gradientText = "bg-gradient-to-r from-[#b77cff] via-[#d66cf0] to-[#ff7aa8] bg-clip-text text-transparent";
const gradientBg = "bg-gradient-to-r from-[#8b3dff] via-[#b84de6] to-[#ff5f93]";

const prototypeBadges = [
  { slug: "nextdotjs-white", name: "Next.js", pos: "left-[-18px] top-[18px]", delay: 0 },
  { slug: "typescript-white", name: "TypeScript", pos: "right-[-10px] top-[-6px]", delay: 0.6 },
  { slug: "react-white", name: "React", pos: "right-[6px] bottom-[2px]", delay: 1.2 },
  { slug: "python-white", name: "Python", pos: "left-[-26px] bottom-[46px]", delay: 1.8 },
];

const prototypeJourney = [
  { when: p.schoolDates, title: p.school, detail: `${p.degree}, GPA ${p.gpa}` },
  ...prototypeActivities.map((a) => ({ when: a.period, title: a.title, detail: a.detail })),
  ...prototypeProjects
    .filter((pr) => /Hackathon|Datathon/.test(pr.context))
    .map((pr) => ({ when: pr.context, title: `Built ${pr.title}`, detail: pr.oneLiner })),
];

function PrototypeV3Social() {
  const items = [
    { label: "GitHub", href: p.github, Icon: Github },
    { label: "LinkedIn", href: p.linkedin, Icon: Linkedin },
    { label: "Email", href: p.emailHref, Icon: Mail },
  ];
  return (
    <div className="flex items-center gap-2.5">
      {items.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#d9d0f5] transition hover:-translate-y-0.5 hover:border-[#b77cff]/60 hover:text-white hover:shadow-[0_0_24px_-4px_rgba(183,124,255,0.6)]"
        >
          <Icon size={18} strokeWidth={1.75} />
        </a>
      ))}
    </div>
  );
}

export function PrototypeV3DarkTech() {
  const reduce = useReducedMotion();
  const { state, copy } = usePrototypeCopy(p.email);
  const [feature, ...rest] = prototypeProjects;
  const enter = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: prototypeEase, delay } };

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[#0a0714] font-[family-name:var(--prototype-sora)] text-[#f4f0ff] selection:bg-[#b77cff]/40">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[720px]"
        style={{
          background:
            "radial-gradient(60% 60% at 30% 0%, rgba(139,61,255,0.35), transparent 70%), radial-gradient(40% 50% at 85% 10%, rgba(255,95,147,0.18), transparent 70%)",
        }}
        aria-hidden
      />

      <header className="sticky top-0 z-20 border-b border-white/[0.06] bg-[#0a0714]/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#top" className="text-[18px] font-semibold tracking-tight">
            Yonie<span className={gradientText}>&lt;/&gt;</span>
          </a>
          <nav className="hidden items-center gap-7 text-[14px] text-[#b9b0d6] md:flex">
            {[
              ["Projects", "#projects"],
              ["Stack", "#stack"],
              ["Journey", "#journey"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a key={href} href={href} className="transition hover:text-white">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#contact" className="rounded-full px-3 py-2 text-[13px] text-[#b9b0d6] transition hover:text-white md:hidden">
              Contact
            </a>
            <a
              href={p.resume}
              target="_blank"
              rel="noopener noreferrer"
              className={`${gradientBg} rounded-full px-4 py-2 text-[13px] font-medium text-white shadow-[0_6px_24px_-8px_rgba(184,77,230,0.8)] transition hover:brightness-110 active:scale-[0.98]`}
            >
              Résumé
            </a>
          </div>
        </div>
      </header>

      <div id="top" className="relative mx-auto max-w-6xl px-5">
        <section className="grid min-h-[calc(100dvh-64px)] grid-cols-1 items-center gap-14 py-14 md:grid-cols-[1.15fr_1fr] md:py-0">
          <div className="order-2 md:order-1">
            <motion.h1 {...enter(0)} className="text-[48px] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[64px] lg:text-[76px]">
              Hi, I&apos;m Yonie
            </motion.h1>
            <motion.p {...enter(0.08)} className={`${gradientText} mt-3 pb-1 text-[28px] font-semibold tracking-[-0.02em] sm:text-[36px]`}>
              Full-stack developer
            </motion.p>
            <motion.p {...enter(0.16)} className="mt-6 max-w-[44ch] text-[16px] leading-relaxed text-[#b9b0d6] sm:text-[17px]">
              UW Informatics, class of {p.classOf}. I build web apps and tools with React, Next.js, and TypeScript.
            </motion.p>
            <motion.div {...enter(0.24)} className="mt-9 flex flex-wrap items-center gap-5">
              <a
                href={p.resume}
                download
                className={`${gradientBg} group inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[15px] font-medium text-white shadow-[0_10px_40px_-10px_rgba(184,77,230,0.9)] transition hover:shadow-[0_14px_50px_-8px_rgba(255,95,147,0.8)] active:scale-[0.98]`}
              >
                Download résumé
                <Download size={17} className="transition-transform group-hover:translate-y-0.5" />
              </a>
              <PrototypeV3Social />
            </motion.div>
          </div>

          <motion.div {...enter(0.1)} className="order-1 flex justify-center md:order-2">
            <div className="relative h-[230px] w-[230px] sm:h-[300px] sm:w-[300px]">
              <div className="absolute -inset-10 rounded-full bg-[#8b3dff]/30 blur-3xl" aria-hidden />
              <div className="prototype-v3-ring absolute -inset-[3px] rounded-full" aria-hidden />
              <div className="absolute inset-0 overflow-hidden rounded-full border-4 border-[#0a0714]">
                <Image src={p.photo} alt="Portrait of Yonie Rivera-Aguilar" fill priority sizes="300px" className="object-cover" />
              </div>
              {prototypeBadges.map((b) => (
                <motion.div
                  key={b.slug}
                  className={`absolute ${b.pos} flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#140d26]/90 shadow-[0_0_30px_-6px_rgba(183,124,255,0.7)] backdrop-blur sm:h-14 sm:w-14`}
                  animate={reduce ? undefined : { y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: b.delay }}
                  title={b.name}
                >
                  <Image src={`/prototype-icons/${b.slug}.svg`} alt={b.name} width={24} height={24} unoptimized />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="projects" className="scroll-mt-20 py-20 md:py-28">
          <PrototypeReveal>
            <h2 className="text-[34px] font-semibold tracking-[-0.03em] md:text-[44px]">
              Things I&apos;ve <span className={gradientText}>built</span>
            </h2>
            <p className="mt-3 max-w-[55ch] text-[16px] text-[#b9b0d6]">From hackathon weekends to apps I&apos;m still shipping.</p>
          </PrototypeReveal>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {[feature, ...rest].map((project, i) => (
              <PrototypeReveal key={project.id} delay={(i % 2) * 0.08} className={i === 0 ? "md:col-span-2" : ""}>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] transition duration-500 hover:-translate-y-1 hover:border-[#b77cff]/40 hover:shadow-[0_30px_80px_-30px_rgba(139,61,255,0.6)] ${
                    i === 0 ? "md:grid md:grid-cols-[1.3fr_1fr]" : ""
                  }`}
                >
                  <div className={`relative overflow-hidden ${i === 0 ? "aspect-[16/10] md:aspect-auto md:min-h-[360px]" : "aspect-[16/10]"}`}>
                    <Image
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      fill
                      sizes={i === 0 ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
                      className="object-cover object-top transition duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0714]/70 via-transparent to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <p className={`${mono} text-[12px] text-[#c9a6ff]`}>{project.context}</p>
                    <h3 className="mt-2 flex items-center gap-2 text-[22px] font-semibold tracking-[-0.02em] md:text-[26px]">
                      {project.title}
                      <ArrowUpRight size={20} className="text-[#b9b0d6] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-[#b9b0d6]">{i === 0 ? project.description : project.oneLiner}</p>
                    {i === 0 && (
                      <ul className="mt-4 space-y-1.5 text-[14px] text-[#d9d0f5]">
                        {project.highlights.map((h) => (
                          <li key={h} className="flex gap-2">
                            <span className={gradientText}>+</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-auto flex flex-wrap gap-2 pt-5">
                      {project.stack.map((s) => (
                        <span key={s} className={`${mono} rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-[#d9d0f5]`}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </PrototypeReveal>
            ))}
          </div>
        </section>

        <section id="stack" className="scroll-mt-20 py-16 md:py-24">
          <PrototypeReveal>
            <h2 className="text-[34px] font-semibold tracking-[-0.03em] md:text-[44px]">
              My <span className={gradientText}>stack</span>
            </h2>
          </PrototypeReveal>
          <div className="mt-10 grid grid-cols-4 gap-3 sm:grid-cols-8">
            {prototypeTechLogos.map((t, i) => (
              <PrototypeReveal key={t.slug} delay={i * 0.025} y={10}>
                <div className="group flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-[#b77cff]/50 hover:bg-[#8b3dff]/10 hover:shadow-[0_0_30px_-8px_rgba(183,124,255,0.7)]">
                  <Image src={`/prototype-icons/${t.slug}-white.svg`} alt="" width={26} height={26} unoptimized className="opacity-80 transition group-hover:opacity-100" />
                  <span className="text-center text-[11px] leading-tight text-[#b9b0d6]">{t.name}</span>
                </div>
              </PrototypeReveal>
            ))}
          </div>
        </section>

        <section id="journey" className="scroll-mt-20 py-16 md:py-24">
          <PrototypeReveal>
            <h2 className="text-[34px] font-semibold tracking-[-0.03em] md:text-[44px]">
              The <span className={gradientText}>journey</span> so far
            </h2>
          </PrototypeReveal>
          <ol className="relative mt-12 space-y-8 border-l border-transparent pl-8 md:ml-4">
            <span className="absolute bottom-2 left-0 top-2 w-px bg-gradient-to-b from-[#b77cff] via-[#d66cf0]/60 to-transparent" aria-hidden />
            {prototypeJourney.map((item, i) => (
              <PrototypeReveal as="li" key={item.title} delay={i * 0.05} className="relative">
                <span className="absolute -left-[37px] top-1.5 h-[11px] w-[11px] rounded-full border-2 border-[#0a0714] bg-[#d66cf0] shadow-[0_0_12px_rgba(214,108,240,0.9)]" aria-hidden />
                <p className={`${mono} text-[12px] text-[#c9a6ff]`}>{item.when}</p>
                <h3 className="mt-1 text-[18px] font-semibold">{item.title}</h3>
                <p className="mt-1 max-w-[60ch] text-[15px] text-[#b9b0d6]">{item.detail}</p>
              </PrototypeReveal>
            ))}
          </ol>
        </section>

        <section id="contact" className="scroll-mt-20 pb-16 pt-10 md:pb-24">
          <PrototypeReveal>
            <div className="rounded-[28px] bg-gradient-to-br from-[#8b3dff]/70 via-[#b84de6]/40 to-[#ff5f93]/60 p-px">
              <div className="rounded-[27px] bg-[#0f0a1d] px-6 py-12 text-center md:px-12 md:py-16">
                <h2 className="text-[32px] font-semibold tracking-[-0.03em] md:text-[48px]">
                  Hiring for an internship or <span className={gradientText}>new-grad role?</span>
                </h2>
                <p className="mx-auto mt-4 max-w-[46ch] text-[16px] text-[#b9b0d6]">Reach me by email, or find me on LinkedIn and GitHub.</p>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={p.emailHref}
                    className={`${gradientBg} inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-medium text-white shadow-[0_10px_40px_-10px_rgba(184,77,230,0.9)] transition hover:brightness-110 active:scale-[0.98]`}
                  >
                    <Mail size={17} /> Email me
                  </a>
                  <button
                    type="button"
                    onClick={copy}
                    className={`${mono} inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3.5 text-[13px] text-[#d9d0f5] transition hover:border-white/40 active:scale-[0.98]`}
                    aria-live="polite"
                  >
                    {state === "copied" ? <Check size={15} /> : <Copy size={15} />}
                    {state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : p.email}
                  </button>
                </div>
              </div>
            </div>
          </PrototypeReveal>
        </section>

        <footer className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] py-8 text-[13px] text-[#8f86ad] sm:flex-row">
          <span>{p.name}</span>
          <PrototypeV3Social />
        </footer>
      </div>
    </div>
  );
}
