"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Code2, Database, FileText, GraduationCap, Layout, Mail, Sparkles, Wrench } from "lucide-react";
import {
  prototypeActivities,
  prototypeProfile as p,
  prototypeProjects,
  prototypeSkillGroups,
} from "../prototype-content";
import { PrototypeReveal, prototypeEase } from "../prototype-shared";

const ink = "#141414";
const colors = { pink: "#ff7ac3", yellow: "#ffd23f", teal: "#21b3a5", blue: "#8ea2ff", cream: "#fff4e4" };
const border = "border-[3px] border-[#141414]";
const shadow = "shadow-[6px_6px_0_#141414]";
const press =
  "transition-[transform,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#141414] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[2px_2px_0_#141414]";

const groupIcons = [Code2, Layout, Database, Wrench];
const groupColors = [colors.yellow, colors.pink, colors.teal, colors.blue];
const projectColors = [colors.pink, colors.yellow, colors.teal, colors.blue, colors.yellow];

function PrototypeV6Sticker({ children, color, className = "", rotate = 0, delay = 0 }: { children: React.ReactNode; color: string; className?: string; rotate?: number; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className={`absolute flex items-center justify-center ${border} rounded-[18px] shadow-[4px_4px_0_#141414] ${className}`}
      style={{ background: color, rotate }}
      initial={reduce ? false : { scale: 0, rotate: rotate - 20 }}
      animate={reduce ? undefined : { scale: 1, rotate: [rotate, rotate + 6, rotate] }}
      transition={{ scale: { type: "spring", stiffness: 260, damping: 14, delay }, rotate: { duration: 5, repeat: Infinity, ease: "easeInOut", delay } }}
    >
      {children}
    </motion.div>
  );
}

export function PrototypeV6Brutalist() {
  const reduce = useReducedMotion();
  const [first, ...rest] = prototypeProjects;

  return (
    <div className="min-h-[100dvh] overflow-hidden bg-[#fff4e4] font-[family-name:var(--prototype-bricolage)] text-[#141414] selection:bg-[#ffd23f]">
      <div className="mx-auto max-w-[1240px] px-3 py-3 sm:px-6 sm:py-6">
        <div className={`${border} relative rounded-[28px] bg-[#fffaf2] sm:rounded-[36px]`}>
          <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between rounded-t-[26px] border-b-[3px] border-[#141414] bg-[#fffaf2] px-4 sm:rounded-t-[34px] sm:px-8">
            <a href="#top" className="flex items-center gap-2 text-[18px] font-extrabold tracking-tight">
              <span className={`${border} flex h-9 w-9 items-center justify-center rounded-[10px] text-[17px]`} style={{ background: colors.blue }}>
                Y
              </span>
              <span className="hidden sm:inline">yonie.dev</span>
            </a>
            <nav className="hidden items-center gap-7 text-[15px] font-semibold md:flex">
              <a href="#work" className="underline-offset-4 hover:underline">My work</a>
              <a href="#skills" className="underline-offset-4 hover:underline">Skills</a>
              <a href="#contact" className="underline-offset-4 hover:underline">Contact</a>
            </nav>
            <div className="flex items-center gap-2">
              <a href={p.emailHref} className={`${border} ${press} flex h-11 items-center gap-2 rounded-full bg-white px-3 text-[14px] font-bold shadow-[4px_4px_0_#141414] sm:px-4`}>
                <Mail size={17} strokeWidth={2.5} />
                <span className="hidden sm:inline">Email me</span>
              </a>
              <a
                href={p.resume}
                target="_blank"
                rel="noopener noreferrer"
                className={`${border} ${press} flex h-11 items-center gap-2 rounded-full px-4 text-[14px] font-bold shadow-[4px_4px_0_#141414]`}
                style={{ background: colors.yellow }}
              >
                <FileText size={17} strokeWidth={2.5} /> Résumé
              </a>
            </div>
          </header>

          <section id="top" className="relative grid grid-cols-1 items-center gap-12 px-5 pb-16 pt-12 sm:px-10 md:grid-cols-[1.25fr_1fr] md:pb-24 md:pt-16">
            <div className="relative z-10">
              <p className="text-[18px] font-semibold">Hi, my name is Yonie.</p>
              <motion.h1
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: prototypeEase }}
                className="mt-3 text-[46px] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] sm:text-[68px] lg:text-[78px]"
              >
                I build tools that solve{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">real</span>
                  <span className="absolute inset-x-[-4px] bottom-1 top-[45%] -z-0 -rotate-1 rounded-md" style={{ background: colors.pink }} aria-hidden />
                </span>{" "}
                problems.
              </motion.h1>
              <p className="mt-6 max-w-[46ch] text-[18px] leading-relaxed">
                Full-stack engineer working in React, Next.js, and TypeScript. UW Informatics, class of {p.classOf}.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#work" className={`${border} ${shadow} ${press} inline-flex items-center gap-2 rounded-[14px] px-6 py-3.5 text-[17px] font-extrabold`} style={{ background: colors.yellow }}>
                  See my work <ArrowUpRight size={19} strokeWidth={2.75} />
                </a>
                <a href={p.github} target="_blank" rel="noopener noreferrer" className={`${border} ${shadow} ${press} inline-flex items-center gap-2 rounded-[14px] bg-white px-6 py-3.5 text-[17px] font-extrabold`}>
                  GitHub
                </a>
              </div>
            </div>

            <div className="relative mx-auto h-[300px] w-[280px] sm:h-[360px] sm:w-[330px]">
              <div className={`${border} absolute inset-x-6 bottom-0 top-8 rounded-[28px] shadow-[8px_8px_0_#141414]`} style={{ background: colors.pink }} />
              <div className={`${border} absolute inset-x-10 bottom-4 top-12 overflow-hidden rounded-[22px] bg-white`}>
                <Image src={p.photo} alt="Portrait of Yonie Rivera-Aguilar" fill priority sizes="260px" className="object-cover grayscale contrast-[1.1]" />
              </div>
              <PrototypeV6Sticker color={colors.teal} className="-left-2 top-0 h-16 w-16" rotate={-10} delay={0.3}>
                <Code2 size={30} strokeWidth={2.5} color="#fff" />
              </PrototypeV6Sticker>
              <PrototypeV6Sticker color={colors.yellow} className="-right-3 top-[38%] h-14 w-14 !rounded-full" rotate={8} delay={0.45}>
                <Sparkles size={26} strokeWidth={2.5} />
              </PrototypeV6Sticker>
              <span className={`${border} absolute -bottom-4 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#9df2a8] px-3.5 py-1.5 text-[13px] font-extrabold shadow-[3px_3px_0_#141414]`}>
                {p.availability}
              </span>
            </div>
          </section>

          <section id="work" className="scroll-mt-24 border-t-[3px] border-[#141414] px-5 py-16 sm:px-10 md:py-20">
            <p className="text-center text-[17px] font-semibold">Hackathon builds and apps I&apos;m still shipping</p>
            <h2 className="mt-1 text-center text-[38px] font-extrabold tracking-[-0.03em] sm:text-[52px]">What I&apos;ve built</h2>
            <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-6">
              {[first, ...rest].map((project, i) => (
                <PrototypeReveal key={project.id} delay={(i % 3) * 0.06} className={i === 0 ? "md:col-span-6" : i < 3 ? "md:col-span-3" : "md:col-span-3"}>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${border} ${shadow} ${press} group flex h-full flex-col overflow-hidden rounded-[22px] bg-white ${i === 0 ? "md:grid md:grid-cols-[1.3fr_1fr]" : ""}`}
                  >
                    <div className={`relative overflow-hidden border-b-[3px] border-[#141414] ${i === 0 ? "aspect-[16/10] md:aspect-auto md:min-h-[340px] md:border-b-0 md:border-r-[3px]" : "aspect-[16/10]"}`} style={{ background: projectColors[i] }}>
                      <div className={`${border} absolute inset-4 overflow-hidden rounded-[12px] bg-white transition-transform duration-300 group-hover:-rotate-1 group-hover:scale-[1.02]`}>
                        <Image src={project.image} alt={`${project.title} screenshot`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-top" />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <span className={`${border} w-fit rounded-full px-3 py-1 text-[12.5px] font-bold`} style={{ background: projectColors[i] }}>
                        {project.context}
                      </span>
                      <h3 className="mt-4 flex items-center gap-2 text-[26px] font-extrabold leading-tight tracking-[-0.02em]">
                        {project.title}
                        <ArrowUpRight size={24} strokeWidth={2.75} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                      </h3>
                      <p className="mt-2 text-[16px] leading-relaxed text-[#3a3a3a]">{i === 0 ? project.description : project.oneLiner}</p>
                      <p className="mt-auto pt-4 text-[14px] font-semibold">{project.stack.join(" + ")}</p>
                    </div>
                  </a>
                </PrototypeReveal>
              ))}
            </div>
          </section>

          <section id="skills" className="scroll-mt-24 border-t-[3px] border-[#141414] px-5 py-16 sm:px-10 md:py-20" style={{ background: colors.cream }}>
            <h2 className="text-center text-[38px] font-extrabold tracking-[-0.03em] sm:text-[52px]">What I work with</h2>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {prototypeSkillGroups.map((g, i) => {
                const Icon = groupIcons[i];
                return (
                  <PrototypeReveal key={g.label} delay={i * 0.06}>
                    <div className={`${border} ${shadow} h-full rounded-[22px] bg-white p-6`}>
                      <span className={`${border} flex h-14 w-14 items-center justify-center rounded-[14px] shadow-[3px_3px_0_#141414]`} style={{ background: groupColors[i] }}>
                        <Icon size={26} strokeWidth={2.5} />
                      </span>
                      <h3 className="mt-5 text-[21px] font-extrabold">{g.label}</h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {g.skills.map((s, k) => (
                          <span key={s} className={`${border} rounded-full bg-[#fffaf2] px-3 py-1 text-[13.5px] font-bold transition hover:-rotate-3`} style={{ rotate: `${(k % 2 ? 1 : -1) * 1.5}deg` }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </PrototypeReveal>
                );
              })}
            </div>
          </section>

          <section className="grid grid-cols-1 gap-6 border-t-[3px] border-[#141414] px-5 py-16 sm:px-10 md:grid-cols-3 md:py-20">
            <PrototypeReveal className="md:col-span-1">
              <div className={`${border} ${shadow} h-full rounded-[22px] p-6`} style={{ background: colors.blue }}>
                <GraduationCap size={34} strokeWidth={2.5} />
                <h3 className="mt-4 text-[24px] font-extrabold leading-tight">{p.school}</h3>
                <p className="mt-2 text-[16px] font-semibold">{p.degree}</p>
                <p className="text-[16px]">
                  {p.schoolDates}, GPA {p.gpa}
                </p>
              </div>
            </PrototypeReveal>
            {prototypeActivities.map((a, i) => (
              <PrototypeReveal key={a.title} delay={0.06 * (i + 1)}>
                <div className={`${border} ${shadow} h-full rounded-[22px] bg-white p-6`}>
                  <span className="text-[14px] font-bold text-[#5a5a5a]">{a.period}</span>
                  <h3 className="mt-2 text-[22px] font-extrabold leading-tight">{a.title}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-[#3a3a3a]">{a.detail}</p>
                </div>
              </PrototypeReveal>
            ))}
          </section>

          <section id="contact" className="scroll-mt-24 rounded-b-[26px] border-t-[3px] border-[#141414] px-5 py-16 text-center sm:rounded-b-[34px] sm:px-10 md:py-20" style={{ background: colors.yellow }}>
            <h2 className="text-[40px] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] sm:text-[64px]">Hiring? Let&apos;s talk.</h2>
            <p className="mx-auto mt-4 max-w-[44ch] text-[18px]">I&apos;m looking for software internships and new-grad roles.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href={p.emailHref} className={`${border} ${shadow} ${press} inline-flex items-center gap-2 rounded-[14px] bg-white px-6 py-3.5 text-[17px] font-extrabold`}>
                <Mail size={19} strokeWidth={2.5} /> Email me
              </a>
              <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className={`${border} ${shadow} ${press} inline-flex items-center gap-2 rounded-[14px] px-6 py-3.5 text-[17px] font-extrabold text-white`} style={{ background: ink }}>
                LinkedIn <ArrowUpRight size={19} strokeWidth={2.75} />
              </a>
            </div>
            <p className="mt-10 text-[14px] font-semibold">{p.email}</p>
          </section>
        </div>
        <p className="py-6 text-center text-[13px] font-semibold">{p.name}, {p.location}</p>
      </div>
    </div>
  );
}
