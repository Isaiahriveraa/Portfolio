"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Copy, FileText, GraduationCap, Mail, Users } from "lucide-react";
import {
  prototypeActivities,
  prototypeProfile as p,
  prototypeProjects,
  prototypeSkillGroups,
  prototypeTechLogos,
  type PrototypeProject,
} from "../prototype-content";
import { prototypeEase, usePrototypeCopy } from "../prototype-shared";

const accent = "#ff5a1f";

function PrototypeV4Tile({
  className = "",
  children,
  index,
}: {
  className?: string;
  children: React.ReactNode;
  index: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: prototypeEase, delay: 0.04 * index }}
      className={`relative overflow-hidden rounded-[26px] ${className}`}
    >
      {children}
    </motion.div>
  );
}

function PrototypeV4ProjectTile({ project, index, className = "" }: { project: PrototypeProject; index: number; className?: string }) {
  return (
    <PrototypeV4Tile index={index} className={`bg-white shadow-[0_1px_2px_rgba(16,24,40,0.06)] ${className}`}>
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col">
        <div className="relative m-2 mb-0 min-h-[150px] flex-1 overflow-hidden rounded-[18px] bg-[#eef0f3] lg:min-h-0">
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition duration-700 group-hover:scale-[1.05]"
          />
        </div>
        <div className="flex items-start justify-between gap-3 px-4 pb-3.5 pt-3">
          <div className="min-w-0">
            <h3 className="truncate text-[15px] font-bold tracking-[-0.01em] text-[#14161a]">{project.title}</h3>
            <p className="truncate text-[12.5px] text-[#6b7280]">{project.context}</p>
          </div>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef0f3] text-[#14161a] transition group-hover:rotate-45 group-hover:bg-[#14161a] group-hover:text-white">
            <ArrowUpRight size={16} />
          </span>
        </div>
      </a>
    </PrototypeV4Tile>
  );
}

export function PrototypeV4Bento() {
  const { state, copy } = usePrototypeCopy(p.email);
  const [koda, guru, husky, commit, care] = prototypeProjects;
  const logoRowA = prototypeTechLogos.slice(0, 8);
  const logoRowB = prototypeTechLogos.slice(8);

  return (
    <div className="min-h-[100dvh] bg-[#e9ebee] font-[family-name:var(--prototype-manrope)] text-[#14161a] selection:bg-[#ff5a1f] selection:text-white">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-3 p-3 sm:grid-cols-2 sm:p-4 lg:h-[100dvh] lg:min-h-[740px] lg:grid-cols-4 lg:grid-rows-4">
        {/* Profile */}
        <PrototypeV4Tile index={0} className="bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.06)] sm:col-span-2 md:p-8 lg:row-span-2">
          <div className="flex h-full flex-col">
            <div className="flex items-start justify-between gap-4">
              <div className="rounded-full p-[3px]" style={{ background: accent }}>
                <Image src={p.photo} alt="Portrait of Yonie Rivera-Aguilar" width={76} height={76} priority className="rounded-full border-[3px] border-white" />
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#ecfdf3] px-3 py-1.5 text-[12.5px] font-semibold text-[#067647]">
                <span className="h-2 w-2 rounded-full bg-[#17b26a]" />
                <span className="hidden sm:inline">{p.availability}</span>
                <span className="sm:hidden">Open to roles</span>
              </span>
            </div>
            <h1 className="mt-6 text-[27px] font-extrabold leading-tight tracking-[-0.03em] sm:text-[30px] md:text-[36px]">{p.name}</h1>
            <p className="mt-1 text-[15px] font-medium text-[#6b7280]">
              {p.role}, {p.degree} at UW, class of {p.classOf}
            </p>
            <p className="mt-5 max-w-[52ch] text-[15.5px] leading-relaxed text-[#3f444d]">
              {p.pitch} <strong className="font-bold text-[#14161a]">{p.now}</strong>
            </p>
            <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-6">
              <a
                href={p.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#14161a] px-5 py-3 text-[14px] font-bold text-white transition hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-8px_rgba(20,22,26,0.6)] active:translate-y-0"
              >
                <FileText size={16} /> Résumé
              </a>
              <a
                href={p.emailHref}
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[14px] font-bold text-white transition hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-8px_rgba(255,90,31,0.7)] active:translate-y-0"
                style={{ background: accent }}
              >
                <Mail size={16} /> Email me
              </a>
              <button
                type="button"
                onClick={copy}
                aria-live="polite"
                className="inline-flex items-center gap-2 rounded-full bg-[#eef0f3] px-4 py-3 text-[13px] font-semibold text-[#3f444d] transition hover:bg-[#e2e5ea] active:scale-[0.98]"
              >
                {state === "copied" ? <Check size={15} /> : <Copy size={15} />}
                {state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : "Copy email"}
              </button>
            </div>
          </div>
        </PrototypeV4Tile>

        {/* Featured project */}
        <PrototypeV4Tile index={1} className="bg-[#101114] text-white sm:col-span-2">
          <a href={koda.url} target="_blank" rel="noopener noreferrer" className="group grid h-full grid-cols-1 sm:grid-cols-[1fr_1.3fr]">
            <div className="flex flex-col p-6">
              <span className="text-[12.5px] font-semibold text-white/50">Featured project</span>
              <h2 className="mt-1 text-[24px] font-extrabold tracking-[-0.02em]">{koda.title}</h2>
              <p className="mt-1.5 text-[14px] leading-snug text-white/70">{koda.oneLiner}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13px] font-bold text-white transition group-hover:gap-2.5">
                {koda.displayUrl} <ArrowUpRight size={15} />
              </span>
            </div>
            <div className="relative min-h-[170px] overflow-hidden">
              <Image src={koda.image} alt="Koda screenshot" fill sizes="(min-width: 1024px) 28vw, 100vw" className="object-cover object-[50%_20%] transition duration-700 group-hover:scale-[1.05]" />
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#101114] to-transparent" />
            </div>
          </a>
        </PrototypeV4Tile>

        <PrototypeV4ProjectTile project={guru} index={2} />
        <PrototypeV4ProjectTile project={husky} index={3} />
        <PrototypeV4ProjectTile project={commit} index={4} />
        <PrototypeV4ProjectTile project={care} index={5} />

        {/* Skills */}
        <PrototypeV4Tile index={6} className="flex flex-col justify-between bg-white py-4 shadow-[0_1px_2px_rgba(16,24,40,0.06)] sm:col-span-2">
          <div className="space-y-2 overflow-hidden">
            {[logoRowA, logoRowB].map((row, r) => (
              <div key={r} className={`flex gap-2.5 ${r === 1 ? "pl-8" : "pl-4"}`}>
                {row.map((t) => (
                  <span
                    key={t.slug}
                    title={t.name}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#e6e8ec] bg-white shadow-[0_2px_6px_rgba(16,24,40,0.06)] transition hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(16,24,40,0.12)]"
                  >
                    <Image src={`/prototype-icons/${t.slug}.svg`} alt={t.name} width={20} height={20} unoptimized />
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="px-5 pt-2">
            <h2 className="text-[17px] font-extrabold tracking-[-0.01em]">Skills & tools</h2>
            <p className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-[#6b7280]">
              {prototypeSkillGroups.map((g) => g.skills.slice(0, 3).join(", ")).join(", ")}, and more.
            </p>
          </div>
        </PrototypeV4Tile>

        {/* Education */}
        <PrototypeV4Tile index={7} className="bg-[#fff1ea] p-5">
          <div className="flex h-full flex-col">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white" style={{ color: accent }}>
              <GraduationCap size={20} />
            </span>
            <h2 className="mt-auto pt-3 text-[16px] font-extrabold leading-tight">{p.school}</h2>
            <p className="mt-1 text-[13px] text-[#6b4a3a]">
              {p.degree}, GPA {p.gpa}
            </p>
            <span className="mt-2.5 w-fit rounded-full bg-[#14161a] px-2.5 py-1 text-[11.5px] font-bold text-white">{p.schoolDates}</span>
          </div>
        </PrototypeV4Tile>

        {/* Activities */}
        <PrototypeV4Tile index={8} className="bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.06)]">
          <div className="flex h-full flex-col">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef0f3] text-[#14161a]">
              <Users size={19} />
            </span>
            <ul className="mt-auto space-y-2.5 pt-3">
              {prototypeActivities.map((a) => (
                <li key={a.title}>
                  <h2 className="text-[14px] font-extrabold leading-tight">{a.title.replace("Software Engineering Career Club (SWECC)", "SWECC at UW")}</h2>
                  <p className="text-[12.5px] text-[#6b7280]">
                    {a.role}, {a.period}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </PrototypeV4Tile>

        {/* GitHub */}
        <PrototypeV4Tile index={9} className="bg-[#14161a] text-white">
          <a href={p.github} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col p-5">
            <Image src="/prototype-icons/github-white.svg" alt="" width={34} height={34} unoptimized />
            <h2 className="mt-auto pt-3 text-[16px] font-extrabold">GitHub</h2>
            <p className="text-[13px] text-white/60">@{p.githubHandle}</p>
            <span className="mt-3 w-fit rounded-full bg-white px-4 py-2 text-[13px] font-bold text-[#14161a] transition group-hover:-translate-y-0.5">See my code</span>
          </a>
        </PrototypeV4Tile>

        {/* LinkedIn */}
        <PrototypeV4Tile index={10} className="bg-[#e3eeff]">
          <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col p-5">
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[8px] bg-[#0a66c2] text-[15px] font-extrabold text-white">in</span>
            <h2 className="mt-auto pt-3 text-[16px] font-extrabold text-[#0b2a55]">LinkedIn</h2>
            <p className="text-[13px] text-[#3a5a8a]">in/{p.linkedinHandle}</p>
            <span className="mt-3 w-fit rounded-full bg-[#0a66c2] px-4 py-2 text-[13px] font-bold text-white transition group-hover:-translate-y-0.5">Connect</span>
          </a>
        </PrototypeV4Tile>
      </div>
    </div>
  );
}
