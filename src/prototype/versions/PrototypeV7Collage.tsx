"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Box, Settings } from "lucide-react";
import {
  prototypeActivities,
  prototypeProfile as p,
  prototypeProjects,
  prototypeSkillGroups,
} from "../prototype-content";
import { PrototypeReveal } from "../prototype-shared";

const pixel = "font-[family-name:var(--prototype-pixelify)]";
const hand = "font-[family-name:var(--prototype-kalam)]";
const silk = "font-[family-name:var(--prototype-silkscreen)]";
const blue = "#2f6bff";

const spriteColors: Record<string, string> = { k: "#151515", r: "#ff4d6d", w: "#ffc2cf", y: "#ffd23f", c: "#fff3d6" };

const prototypeSprites = {
  heart: [".kk.kk.", "kwrkrrk", "kwrrrrk", "krrrrrk", ".krrrk.", "..krk..", "...k..."],
  envelope: ["kkkkkkkkk", "kccrcrcck", "kcrrrrrck", "kkcrrrckk", "kcckrkcck", "kccckccck", "kkkkkkkkk"],
  star: ["...k...", "..kyk..", "kkyyykk", "kyyyyyk", ".kyyyk.", "kyk.kyk", "kk...kk"],
};

function PrototypeV7Sprite({ name, cell = 6 }: { name: keyof typeof prototypeSprites; cell?: number }) {
  const rows = prototypeSprites[name];
  return (
    <span className="grid" style={{ gridTemplateColumns: `repeat(${rows[0].length}, ${cell}px)` }} aria-hidden>
      {rows.flatMap((row, r) =>
        row.split("").map((ch, c) => <span key={`${r}-${c}`} style={{ width: cell, height: cell, background: ch === "." ? "transparent" : spriteColors[ch] }} />),
      )}
    </span>
  );
}

function PrototypeV7Draggable({
  children,
  className = "",
  rotate = 0,
  constraints,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
  constraints: React.RefObject<HTMLDivElement | null>;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      drag={!reduce}
      dragConstraints={constraints}
      dragElastic={0.15}
      whileHover={reduce ? undefined : { scale: 1.05, rotate: rotate + 3 }}
      whileDrag={{ scale: 1.08, cursor: "grabbing" }}
      initial={reduce ? false : { opacity: 0, scale: 0.6, rotate: rotate - 12 }}
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={{ type: "spring", stiffness: 220, damping: 16, delay }}
      className={`absolute z-10 cursor-grab touch-none ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function PrototypeV7Collage() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const tilts = [-3, 2, -1.5, 3, -2];

  return (
    <div className="min-h-[100dvh] bg-[#ececec] p-2 font-[family-name:var(--prototype-dm-sans)] text-[#151515] selection:bg-[#ffd23f] sm:p-5">
      <div className="mx-auto max-w-[1320px] overflow-hidden rounded-[22px] bg-white shadow-[0_2px_0_#d9d9d9,0_20px_60px_-30px_rgba(0,0,0,0.25)] sm:rounded-[28px]">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-white/90 px-4 backdrop-blur sm:px-8">
          <a href="#top" className={`${hand} flex items-center gap-2 text-[19px] font-bold italic`}>
            <Box size={20} strokeWidth={2} /> YONIE&apos;S PORTFOLIO
          </a>
          <nav className={`${silk} flex items-center gap-2 text-[12px] sm:gap-3`}>
            <a href="#projects" className="hidden px-2 py-1 hover:bg-[#151515] hover:text-white sm:block">Projects</a>
            <a href={p.emailHref} className="px-2 py-1 hover:bg-[#151515] hover:text-white">Email</a>
            <a href={p.resume} target="_blank" rel="noopener noreferrer" className="prototype-v7-pixel-frame ml-1 bg-[#ffd23f] px-3 py-1.5 transition hover:-translate-y-0.5 active:translate-y-0.5">
              Résumé
            </a>
          </nav>
        </header>

        <section id="top" ref={heroRef} className="relative flex min-h-[calc(100dvh-104px)] flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-10">
          <h1 className={`${pixel} relative z-0 select-none text-center font-bold uppercase leading-[0.86] tracking-[-0.02em] text-[#151515]`}>
            <span className="sr-only">Yonie Rivera-Aguilar, software engineer</span>
            <span aria-hidden className="flex items-center justify-center text-[22vw] sm:text-[150px] lg:text-[200px]">
              Y
              <motion.span
                className="mx-[0.02em] inline-flex"
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              >
                <Settings className="h-[0.78em] w-[0.78em]" strokeWidth={0} fill={blue} />
              </motion.span>
              NIE
            </span>
            <span aria-hidden className="block text-[16vw] sm:text-[110px] lg:text-[150px]">
              RIVERA
            </span>
          </h1>

          <p className={`${silk} relative z-20 mt-6 text-center text-[12px] text-[#555] sm:text-[14px]`}>Software engineer, UW Informatics &apos;27</p>
          <a
            href="#projects"
            className={`${hand} group relative z-20 mt-7 inline-flex items-center gap-2 border border-dashed border-[#9a9a9a] px-6 py-3 text-[19px] italic transition hover:border-[#151515] hover:bg-[#f6f6f6]`}
          >
            {["-left-1 -top-1", "-right-1 -top-1", "-left-1 -bottom-1", "-right-1 -bottom-1"].map((pos) => (
              <span key={pos} className={`absolute ${pos} h-2 w-2 border border-[#9a9a9a] bg-white group-hover:border-[#151515]`} aria-hidden />
            ))}
            See what I&apos;ve built <ArrowDown size={18} className="transition-transform group-hover:translate-y-1" />
          </a>

          {/* Collage objects (draggable) */}
          <PrototypeV7Draggable constraints={heroRef} rotate={-6} delay={0.15} className="left-[6%] top-[6%] sm:left-[14%] sm:top-[10%]">
            <div className="relative">
              <Image src={p.photo} alt="Portrait of Yonie Rivera-Aguilar" width={140} height={140} priority draggable={false} className="h-[86px] w-[86px] rounded-full border-[5px] border-white object-cover shadow-[0_8px_24px_rgba(0,0,0,0.2)] sm:h-[140px] sm:w-[140px]" />
              <span className="absolute -left-3 -top-2 scale-75 sm:scale-100">
                <PrototypeV7Sprite name="heart" />
              </span>
            </div>
          </PrototypeV7Draggable>

          <PrototypeV7Draggable constraints={heroRef} rotate={8} delay={0.3} className="right-[6%] top-[8%] sm:right-[15%] sm:top-[12%]">
            <a href={p.emailHref} aria-label="Email Yonie" className="block rounded-md p-1 transition hover:bg-[#fff3d6]" draggable={false}>
              <span className="sm:hidden"><PrototypeV7Sprite name="envelope" cell={6} /></span>
              <span className="hidden sm:block"><PrototypeV7Sprite name="envelope" cell={9} /></span>
            </a>
          </PrototypeV7Draggable>

          <PrototypeV7Draggable constraints={heroRef} rotate={-8} delay={0.45} className="bottom-[10%] left-[4%] hidden md:block lg:left-[8%]">
            <div className="w-[230px] bg-white p-2.5 pb-8 shadow-[0_14px_30px_-10px_rgba(0,0,0,0.35)]">
              <span className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-[-4deg] bg-[#ffe9a8]/80" aria-hidden />
              <div className="relative aspect-[4/3] overflow-hidden bg-[#eee]">
                <Image src={prototypeProjects[1].image} alt="Guru screenshot" fill sizes="230px" draggable={false} className="object-cover object-top" />
              </div>
              <p className={`${hand} mt-2 text-center text-[16px]`}>Guru, WINFO 26</p>
            </div>
          </PrototypeV7Draggable>

          <PrototypeV7Draggable constraints={heroRef} rotate={12} delay={0.55} className="left-[44%] top-[3%] hidden sm:block">
            <PrototypeV7Sprite name="star" cell={7} />
          </PrototypeV7Draggable>

          <PrototypeV7Draggable constraints={heroRef} rotate={3} delay={0.6} className="bottom-[6%] right-[4%] hidden md:block lg:right-[9%]">
            <div className="relative h-[230px] w-[240px] bg-[#ffe14d] p-5 shadow-[6px_14px_24px_-8px_rgba(0,0,0,0.35)]">
              <p className={`${hand} text-[17px] leading-snug`}>{p.pitch}</p>
              <span className="absolute bottom-0 right-0 h-8 w-8 bg-gradient-to-tl from-[#e8c200] to-[#ffe14d]" aria-hidden />
            </div>
          </PrototypeV7Draggable>
        </section>

        {/* Mobile sticky note (the draggable one is desktop-only) */}
        <div className="px-6 pb-12 md:hidden">
          <div className="mx-auto max-w-[340px] rotate-[-2deg] bg-[#ffe14d] p-5 shadow-[6px_14px_24px_-8px_rgba(0,0,0,0.35)]">
            <p className={`${hand} text-[17px] leading-snug`}>{p.pitch}</p>
          </div>
        </div>

        <div className="prototype-v7-dots border-t border-[#ececec]">
          <section id="projects" className="scroll-mt-20 px-4 py-16 sm:px-10 md:py-24">
            <h2 className={`${pixel} text-center text-[44px] font-bold uppercase leading-none sm:text-[64px]`}>Stuff I made</h2>
            <p className={`${hand} mt-3 text-center text-[19px] text-[#555]`}>Click a photo to open the live site.</p>
            <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-6">
              {prototypeProjects.map((project, i) => (
                <PrototypeReveal key={project.id} delay={(i % 3) * 0.06} className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block bg-white p-3 pb-5 shadow-[0_14px_34px_-14px_rgba(0,0,0,0.35)] transition duration-300 hover:z-10 hover:shadow-[0_22px_44px_-14px_rgba(0,0,0,0.4)]"
                    style={{ rotate: `${tilts[i]}deg` }}
                  >
                    <span className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-[3deg] bg-[#bfe3ff]/80" aria-hidden />
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#eee]">
                      <Image src={project.image} alt={`${project.title} screenshot`} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover object-top transition duration-500 group-hover:scale-[1.04]" />
                    </div>
                    <div className="mt-4 flex items-start justify-between gap-3 px-1">
                      <div>
                        <h3 className={`${pixel} text-[24px] font-bold uppercase leading-none`}>{project.title}</h3>
                        <p className={`${hand} mt-1.5 text-[16px] text-[#555]`}>{project.context}</p>
                      </div>
                      <span className="prototype-v7-pixel-frame mt-1 flex h-8 w-8 shrink-0 items-center justify-center bg-white transition group-hover:bg-[#ffd23f]">
                        <ArrowUpRight size={16} strokeWidth={2.5} />
                      </span>
                    </div>
                    <p className="mt-3 px-1 text-[15px] leading-relaxed text-[#333]">{project.oneLiner}</p>
                  </a>
                </PrototypeReveal>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 gap-10 px-4 pb-20 sm:px-10 lg:grid-cols-[1.2fr_1fr]">
            <PrototypeReveal>
              <div
                className="relative h-full rotate-[-1deg] bg-[#fffdf6] px-7 pb-8 pt-10 shadow-[0_14px_34px_-14px_rgba(0,0,0,0.3)]"
                style={{ backgroundImage: "repeating-linear-gradient(transparent 0 31px, #dde6f5 31px 32px)", backgroundPositionY: "8px" }}
              >
                <span className="absolute bottom-0 left-12 top-0 w-px bg-[#ffb3c1]" aria-hidden />
                <div className="pl-8">
                  <h2 className={`${hand} text-[30px] font-bold leading-[32px]`}>About me</h2>
                  <p className="mt-[32px] text-[16px] leading-[32px]">
                    I&apos;m studying {p.degree} at the {p.school}, class of {p.classOf}, GPA {p.gpa}. {p.now}
                  </p>
                  {prototypeActivities.map((a) => (
                    <p key={a.title} className="text-[16px] leading-[32px]">
                      <strong className="font-semibold">{a.title}</strong> ({a.period}): {a.detail}
                    </p>
                  ))}
                </div>
              </div>
            </PrototypeReveal>
            <PrototypeReveal delay={0.08}>
              <div className="h-full">
                <h2 className={`${hand} text-[30px] font-bold`}>Things I use</h2>
                <div className="mt-5 flex flex-wrap gap-3">
                  {prototypeSkillGroups.flatMap((g) => g.skills).map((s, i) => (
                    <span
                      key={s}
                      className={`${silk} prototype-v7-pixel-frame px-3 py-1.5 text-[12px] transition hover:-translate-y-1`}
                      style={{ background: ["#ffffff", "#ffe14d", "#bfe3ff", "#ffc9d6"][i % 4] }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </PrototypeReveal>
          </section>

          <section id="contact" className="scroll-mt-20 border-t border-[#ececec] bg-white px-4 py-16 text-center sm:px-10 md:py-24">
            <div className="flex justify-center">
              <PrototypeV7Sprite name="heart" cell={8} />
            </div>
            <h2 className={`${pixel} mt-6 text-[40px] font-bold uppercase leading-none sm:text-[72px]`}>Say hi!</h2>
            <p className={`${hand} mt-3 text-[20px] text-[#555]`}>I&apos;m looking for internships and new-grad roles.</p>
            <div className={`${silk} mt-10 flex flex-wrap justify-center gap-5 text-[14px]`}>
              <a href={p.emailHref} className="prototype-v7-pixel-frame bg-[#2f6bff] px-6 py-3.5 text-white transition hover:-translate-y-1 active:translate-y-0.5">Email me</a>
              <a href={p.resume} target="_blank" rel="noopener noreferrer" className="prototype-v7-pixel-frame bg-[#ffd23f] px-6 py-3.5 transition hover:-translate-y-1 active:translate-y-0.5">Résumé</a>
              <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="prototype-v7-pixel-frame bg-white px-6 py-3.5 transition hover:-translate-y-1 active:translate-y-0.5">LinkedIn</a>
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="prototype-v7-pixel-frame bg-white px-6 py-3.5 transition hover:-translate-y-1 active:translate-y-0.5">GitHub</a>
            </div>
            <p className={`${hand} mt-12 text-[16px] text-[#777]`}>{p.name}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
