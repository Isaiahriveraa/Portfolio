"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, FileText, Mail } from "lucide-react";
import {
  prototypeActivities,
  prototypeProfile as p,
  prototypeProjects,
  prototypeSkillGroups,
} from "../prototype-content";
import { PrototypeReveal } from "../prototype-shared";

const display = "font-[family-name:var(--prototype-bungee)]";
const ui = "font-[family-name:var(--prototype-chakra)]";
const gold = "#ffc53d";

function PrototypeV8Bracket({ href, children, newTab = false }: { href: string; children: React.ReactNode; newTab?: boolean }) {
  return (
    <a
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      className={`${ui} group relative inline-flex items-center gap-2 px-3.5 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/85 transition hover:text-[#ffc53d]`}
    >
      {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "left-0 bottom-0 border-l border-b", "right-0 bottom-0 border-r border-b"].map((c) => (
        <span key={c} className={`absolute h-2 w-2 border-white/60 transition-all group-hover:h-3 group-hover:w-3 group-hover:border-[#ffc53d] ${c}`} aria-hidden />
      ))}
      {children}
    </a>
  );
}

function PrototypeV8Layer({ mx, my, depth, className }: { mx: MotionValue<number>; my: MotionValue<number>; depth: number; className: string }) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return <motion.div aria-hidden className={`pointer-events-none absolute -inset-16 ${className}`} style={{ x, y }} />;
}

function PrototypeV8Planet({
  mx,
  my,
  depth,
  className,
  style,
  children,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  depth: number;
  className: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div aria-hidden className={`pointer-events-none absolute ${className}`} style={{ x, y, ...style }}>
      {children}
    </motion.div>
  );
}

function PrototypeV8Carousel() {
  const [index, setIndex] = useState(0);
  const count = prototypeProjects.length;
  const move = useCallback((d: number) => setIndex((i) => (i + d + count) % count), [count]);
  const active = prototypeProjects[index];

  return (
    <div
      className="hidden lg:block"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") move(1);
        if (e.key === "ArrowLeft") move(-1);
      }}
    >
      <div className="relative mx-auto h-[360px] w-full [perspective:1400px]">
        <div className="absolute inset-0 [transform-style:preserve-3d]">
          {prototypeProjects.map((project, i) => {
            // signed distance from the active card, wrapped to -2..2
            const d = ((i - index + count + Math.floor(count / 2)) % count) - Math.floor(count / 2);
            const isActive = d === 0;
            return (
              <motion.button
                key={project.id}
                type="button"
                onClick={() => move(d)}
                aria-label={`Show ${project.title}`}
                aria-current={isActive}
                tabIndex={Math.abs(d) > 1 ? -1 : 0}
                className={`absolute left-1/2 top-1/2 -ml-[230px] -mt-[150px] h-[300px] w-[460px] overflow-hidden rounded-[18px] border bg-[#0d0d12] transition-[border-color,box-shadow] duration-500 ${
                  isActive ? "border-[#ffc53d]/80 shadow-[0_0_70px_-12px_rgba(255,197,61,0.5)]" : "border-white/10 hover:border-white/30"
                }`}
                animate={{
                  x: d * 330,
                  z: -Math.abs(d) * 260,
                  rotateY: d * -32,
                  opacity: Math.abs(d) > 1 ? 0.35 : isActive ? 1 : 0.7,
                }}
                style={{ zIndex: 10 - Math.abs(d) }}
                transition={{ type: "spring", stiffness: 90, damping: 18 }}
              >
                <Image src={project.image} alt="" fill sizes="460px" className="object-cover object-top" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#060608] via-[#060608]/80 to-transparent p-5 pt-16 text-left">
                  <p className={`${display} text-[22px] text-white`}>{project.title}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-[760px] items-start justify-between gap-8">
        <button type="button" onClick={() => move(-1)} aria-label="Previous project" className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-[#ffc53d] hover:text-[#ffc53d] active:scale-95">
          <ArrowLeft size={20} />
        </button>
        <div className="text-center" aria-live="polite">
          <p className={`${ui} text-[13px] font-semibold uppercase tracking-[0.16em] text-[#ffc53d]`}>{active.context}</p>
          <h3 className={`${display} mt-2 text-[30px] text-white`}>{active.title}</h3>
          <p className={`${ui} mx-auto mt-2 max-w-[54ch] text-[16px] leading-relaxed text-white/70`}>{active.description}</p>
          <p className={`${ui} mt-3 text-[13px] text-white/50`}>{active.stack.join("  /  ")}</p>
          <a href={active.url} target="_blank" rel="noopener noreferrer" className={`${ui} mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-bold uppercase tracking-[0.08em] text-[#060608] transition hover:brightness-110 active:scale-[0.98]`} style={{ background: gold }}>
            Visit {active.displayUrl} <ArrowUpRight size={16} />
          </a>
        </div>
        <button type="button" onClick={() => move(1)} aria-label="Next project" className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-[#ffc53d] hover:text-[#ffc53d] active:scale-95">
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}

export function PrototypeV8Space() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 50, damping: 18 });
  const my = useSpring(rawY, { stiffness: 50, damping: 18 });
  const tiltX = useTransform(my, (v) => v * -0.25);
  const tiltY = useTransform(mx, (v) => v * 0.25);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroLift = useTransform(scrollYProgress, [0, 1], [0, -120]);

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 40);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 40);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, rawX, rawY]);

  return (
    <div className={`${ui} relative min-h-[100dvh] overflow-hidden bg-[#060608] text-white selection:bg-[#ffc53d] selection:text-[#060608]`}>
      <div className="prototype-v8-grid pointer-events-none fixed inset-0" aria-hidden />
      <PrototypeV8Layer mx={mx} my={my} depth={0.3} className="prototype-v8-stars-a prototype-v8-twinkle fixed" />
      <PrototypeV8Layer mx={mx} my={my} depth={0.8} className="prototype-v8-stars-b fixed" />

      <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between px-4 py-4 sm:px-8 sm:py-6">
        <div className="flex items-center gap-1">
          <PrototypeV8Bracket href={p.github} newTab>
            GitHub
          </PrototypeV8Bracket>
          <span className="hidden sm:inline">
            <PrototypeV8Bracket href={p.linkedin} newTab>
              LinkedIn
            </PrototypeV8Bracket>
          </span>
        </div>
        <div className="flex items-center gap-1">
          <PrototypeV8Bracket href={p.emailHref}>
            <Mail size={13} /> Email
          </PrototypeV8Bracket>
          <PrototypeV8Bracket href={p.resume} newTab>
            <FileText size={13} /> Résumé
          </PrototypeV8Bracket>
        </div>
      </header>

      <section ref={heroRef} id="top" className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-4">
        {/* Orbits */}
        <svg className="pointer-events-none absolute left-1/2 top-1/2 h-[680px] w-[1300px] -translate-x-1/2 -translate-y-1/2 opacity-70" viewBox="0 0 1300 680" aria-hidden>
          <path id="prototype-v8-orbit-a" d="M 150 340 A 500 170 -12 1 1 1150 340 A 500 170 -12 1 1 150 340" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.2" />
          <path id="prototype-v8-orbit-b" d="M 330 340 A 320 230 18 1 1 970 340 A 320 230 18 1 1 330 340" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 8" />
          {!reduce && (
            <>
              <circle r="7" fill="#5b5b66">
                <animateMotion dur="38s" repeatCount="indefinite">
                  <mpath href="#prototype-v8-orbit-a" />
                </animateMotion>
              </circle>
              <circle r="4" fill={gold}>
                <animateMotion dur="22s" repeatCount="indefinite" begin="-8s">
                  <mpath href="#prototype-v8-orbit-b" />
                </animateMotion>
              </circle>
              <circle r="3" fill="#fff">
                <animateMotion dur="38s" repeatCount="indefinite" begin="-19s">
                  <mpath href="#prototype-v8-orbit-a" />
                </animateMotion>
              </circle>
            </>
          )}
        </svg>

        <PrototypeV8Planet
          mx={mx}
          my={my}
          depth={1.6}
          className="-bottom-24 -left-24 h-[260px] w-[260px] rounded-full sm:-left-16 sm:bottom-[-60px] sm:h-[340px] sm:w-[340px]"
          style={{ background: "radial-gradient(circle at 35% 30%, #ffe08a, #ffc53d 35%, #c98a00 70%, #5a3a00)", boxShadow: "0 0 120px -20px rgba(255,197,61,0.5)" }}
        >
          <span className="absolute left-[-14%] top-[44%] h-[18%] w-[128%] -rotate-[14deg] rounded-[50%] border-[6px] border-white/70 [clip-path:inset(50%_0_0_0)]" />
        </PrototypeV8Planet>
        <PrototypeV8Planet
          mx={mx}
          my={my}
          depth={-0.9}
          className="right-[6%] top-[16%] h-[70px] w-[70px] rounded-full sm:h-[110px] sm:w-[110px]"
          style={{ background: "radial-gradient(circle at 35% 30%, #9a9aa6, #55555f 55%, #1d1d22)" }}
        />
        <PrototypeV8Planet mx={mx} my={my} depth={-0.5} className="left-[18%] top-[22%] h-[26px] w-[26px] rounded-full" style={{ background: "radial-gradient(circle at 35% 30%, #6f6f7a, #2a2a30)" }} />

        <motion.div style={reduce ? undefined : { opacity: heroFade, y: heroLift }} className="relative z-10 text-center">
          <motion.div style={reduce ? undefined : { rotateX: tiltX, rotateY: tiltY }} className="[perspective:900px]">
            <motion.h1
              initial={reduce ? false : { opacity: 0, scale: 0.85, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className={`${display} text-[15vw] leading-[0.9] sm:text-[96px] lg:text-[132px]`}
              style={{ color: gold, textShadow: "0 1px 0 #e0a412, 0 2px 0 #c98f0a, 0 3px 0 #b07c04, 0 4px 0 #946600, 0 18px 40px rgba(255,197,61,0.35)" }}
            >
              Yonie
              <br />
              Rivera
            </motion.h1>
          </motion.div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mx-auto mt-6 max-w-[34ch] text-[17px] leading-relaxed text-white/75 sm:text-[19px]"
          >
            Software engineer and UW Informatics student, class of {p.classOf}. I build full-stack apps and tools.
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <a href="#missions" className="inline-flex items-center gap-2 px-6 py-3 text-[14px] font-bold uppercase tracking-[0.1em] text-[#060608] shadow-[0_0_40px_-8px_rgba(255,197,61,0.8)] transition hover:-translate-y-0.5 active:translate-y-0" style={{ background: gold }}>
              Launch projects <ArrowRight size={16} />
            </a>
            <a href={p.resume} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-[14px] font-bold uppercase tracking-[0.1em] text-white transition hover:border-[#ffc53d] hover:text-[#ffc53d]">
              Résumé
            </a>
          </motion.div>
        </motion.div>
      </section>

      <section id="missions" className="relative z-10 scroll-mt-16 px-4 py-24 sm:px-8">
        <PrototypeReveal className="text-center">
          <h2 className={`${display} text-[36px] text-white sm:text-[56px]`}>Projects</h2>
          <p className="mx-auto mt-3 max-w-[50ch] text-[16px] text-white/60">
            <span className="hidden lg:inline">Use the arrows or pick a card.</span>
            <span className="lg:hidden">Five things I&apos;ve built and shipped.</span>
          </p>
        </PrototypeReveal>
        <div className="mt-14">
          <PrototypeV8Carousel />
          {/* Fallback list for small screens */}
          <div className="mx-auto grid max-w-[640px] grid-cols-1 gap-6 lg:hidden">
            {prototypeProjects.map((project, i) => (
              <PrototypeReveal key={project.id} delay={i * 0.04}>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-[18px] border border-white/10 bg-[#0d0d12]/90 transition hover:border-[#ffc53d]/60">
                  <div className="relative aspect-[16/10]">
                    <Image src={project.image} alt={`${project.title} screenshot`} fill sizes="100vw" className="object-cover object-top" />
                  </div>
                  <div className="p-5">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#ffc53d]">{project.context}</p>
                    <h3 className={`${display} mt-1.5 flex items-center gap-2 text-[22px]`}>
                      {project.title} <ArrowUpRight size={18} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-white/70">{project.oneLiner}</p>
                  </div>
                </a>
              </PrototypeReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 py-20 sm:px-8">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr]">
          <PrototypeReveal>
            <div className="h-full rounded-[22px] border border-white/10 bg-[#0d0d12]/85 p-7 backdrop-blur">
              <div className="flex items-center gap-4">
                <Image src={p.photo} alt="Portrait of Yonie Rivera-Aguilar" width={72} height={72} className="rounded-full ring-2 ring-[#ffc53d]/70" />
                <div>
                  <h2 className={`${display} text-[22px]`}>About me</h2>
                  <p className="text-[14px] text-white/60">{p.location}</p>
                </div>
              </div>
              <p className="mt-5 text-[16px] leading-relaxed text-white/80">{p.pitch}</p>
              <dl className="mt-6 space-y-4 text-[15px]">
                <div>
                  <dt className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#ffc53d]">{p.schoolDates}</dt>
                  <dd className="mt-1 text-white/85">
                    {p.school}, {p.degree}, GPA {p.gpa}
                  </dd>
                </div>
                {prototypeActivities.map((a) => (
                  <div key={a.title}>
                    <dt className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#ffc53d]">{a.period}</dt>
                    <dd className="mt-1 text-white/85">
                      {a.title}: {a.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </PrototypeReveal>
          <PrototypeReveal delay={0.08}>
            <div className="h-full rounded-[22px] border border-white/10 bg-[#0d0d12]/85 p-7 backdrop-blur">
              <h2 className={`${display} text-[22px]`}>Toolkit</h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {prototypeSkillGroups.map((g) => (
                  <div key={g.label}>
                    <h3 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/50">{g.label}</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {g.skills.map((s) => (
                        <span key={s} className="rounded-full border border-white/15 px-3 py-1 text-[13px] text-white/85 transition hover:border-[#ffc53d] hover:text-[#ffc53d]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </PrototypeReveal>
        </div>
      </section>

      <section id="contact" className="relative z-10 px-4 pb-24 pt-10 text-center sm:px-8">
        <PrototypeReveal>
          <h2 className={`${display} text-[36px] sm:text-[64px]`} style={{ color: gold }}>
            Open a channel
          </h2>
          <p className="mx-auto mt-3 max-w-[44ch] text-[17px] text-white/70">Looking for internships and new-grad software roles.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={p.emailHref} className="inline-flex items-center gap-2 px-6 py-3 text-[14px] font-bold uppercase tracking-[0.1em] text-[#060608] transition hover:-translate-y-0.5" style={{ background: gold }}>
              <Mail size={16} /> Email me
            </a>
            <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-[14px] font-bold uppercase tracking-[0.1em] transition hover:border-[#ffc53d] hover:text-[#ffc53d]">
              LinkedIn
            </a>
          </div>
          <p className="mt-10 text-[13px] text-white/40">{p.name}</p>
        </PrototypeReveal>
      </section>
    </div>
  );
}
