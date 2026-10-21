"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Copy, FileText } from "lucide-react";
import {
  prototypeActivities,
  prototypeLinks,
  prototypeProfile as p,
  prototypeProjects,
  prototypeSkillGroups,
  prototypeIsExternal,
} from "../prototype-content";
import { PrototypeReveal, prototypeEase, usePrototypeCopy } from "../prototype-shared";

const sans = "font-[family-name:var(--prototype-geist)]";
const mono = "font-[family-name:var(--prototype-geist-mono)]";

function PrototypeV1Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <PrototypeReveal as="section" className="grid grid-cols-1 gap-3 py-10 md:grid-cols-[140px_1fr] md:gap-8">
      <h2 className={`${mono} pt-0.5 text-[13px] text-zinc-400`}>{label}</h2>
      <div>{children}</div>
    </PrototypeReveal>
  );
}

export function PrototypeV1Minimal() {
  const reduce = useReducedMotion();
  const { state, copy } = usePrototypeCopy(p.email);
  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 10, filter: "blur(4px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.7, ease: prototypeEase, delay },
        };

  return (
    <div className={`${sans} min-h-[100dvh] bg-[#fcfcfc] text-zinc-900 selection:bg-zinc-900 selection:text-white`}>
      <header className="sticky top-0 z-20 border-b border-zinc-200/70 bg-[#fcfcfc]/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[680px] items-center justify-between px-5">
          <a href="#top" className="flex items-center gap-2.5 text-sm font-medium">
            <Image src={p.photo} alt="" width={26} height={26} className="rounded-full" />
            <span className="hidden sm:inline">{p.shortName}</span>
            <span className="sm:hidden">{p.firstName}</span>
          </a>
          <nav className="flex items-center gap-1 text-[13px]">
            <a href="#projects" className="hidden rounded-md px-2.5 py-1.5 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 sm:block">
              Projects
            </a>
            <a href="#contact" className="rounded-md px-2.5 py-1.5 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900">
              Contact
            </a>
            <a
              href={p.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 inline-flex items-center gap-1.5 rounded-md bg-zinc-900 px-3 py-1.5 font-medium text-white transition hover:bg-zinc-700 active:scale-[0.98]"
            >
              <FileText size={14} strokeWidth={1.75} />
              Résumé
            </a>
          </nav>
        </div>
      </header>

      <div id="top" className="mx-auto max-w-[680px] px-5">
        <section className="pb-14 pt-16 md:pb-20 md:pt-24">
          <motion.p {...enter(0)} className={`${mono} mb-6 flex items-center gap-2 text-[12px] uppercase tracking-[0.12em] text-zinc-500`}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {p.availability}
          </motion.p>
          <motion.h1 {...enter(0.08)} className="text-[30px] font-semibold leading-[1.2] tracking-[-0.02em] sm:text-[38px]">
            Hi, I&apos;m{" "}
            <Image
              src={p.photo}
              alt="Portrait of Yonie"
              width={44}
              height={44}
              priority
              className="mx-0.5 inline-block h-[1.05em] w-[1.05em] -translate-y-[0.08em] rounded-[10px] align-middle ring-2 ring-white shadow-[0_2px_8px_rgba(24,24,27,0.18)]"
            />{" "}
            Yonie Rivera-Aguilar.
            <br />
            <span className="text-zinc-400">Software engineer, UW &apos;27.</span>
          </motion.h1>
          <motion.p {...enter(0.16)} className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-zinc-600">
            {p.short} {p.now}
          </motion.p>
          <motion.div {...enter(0.24)} className="mt-8 flex flex-wrap gap-2.5">
            <a
              href={p.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_1px_2px_rgba(24,24,27,0.3)] transition hover:bg-zinc-700 active:scale-[0.98]"
            >
              <FileText size={15} strokeWidth={1.75} />
              Résumé
            </a>
            <a
              href={p.emailHref}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-50 active:scale-[0.98]"
            >
              Email me
            </a>
          </motion.div>
        </section>

        <div className="divide-y divide-zinc-200/80 border-t border-zinc-200/80">
          <PrototypeV1Row label="About">
            <p className="max-w-[56ch] text-[15px] leading-relaxed text-zinc-700">{p.pitch}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-zinc-500">
              Based in {p.location}. Studying {p.degree} at the {p.school}, graduating {p.classOf}.
            </p>
          </PrototypeV1Row>

          <section id="projects" className="scroll-mt-16">
            <PrototypeV1Row label="Projects">
              <ul className="-mx-3 space-y-1">
                {prototypeProjects.map((project) => (
                  <li key={project.id}>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group grid grid-cols-[88px_1fr] gap-4 rounded-xl p-3 transition-colors hover:bg-zinc-100/80 sm:grid-cols-[120px_1fr]"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100">
                        <Image
                          src={project.image}
                          alt={`${project.title} screenshot`}
                          fill
                          sizes="120px"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-baseline justify-between gap-3">
                          <h3 className="flex items-center gap-1 text-[15px] font-medium">
                            {project.title}
                            <ArrowUpRight
                              size={14}
                              className="text-zinc-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zinc-900"
                            />
                          </h3>
                          <span className={`${mono} hidden shrink-0 text-[12px] text-zinc-400 sm:block`}>{project.context}</span>
                        </div>
                        <p className="mt-1 text-[14px] leading-snug text-zinc-600">{project.oneLiner}</p>
                        <p className={`${mono} mt-2 truncate text-[12px] text-zinc-400`}>
                          <span className="sm:hidden">{project.context}, </span>
                          {project.stack.join(", ")}
                        </p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </PrototypeV1Row>
          </section>

          <PrototypeV1Row label="Education">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-[15px] font-medium">{p.school}</h3>
              <span className={`${mono} text-[12px] text-zinc-400`}>{p.schoolDates}</span>
            </div>
            <p className="mt-1 text-[14px] text-zinc-600">
              {p.degree}, GPA {p.gpa}
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-zinc-500">{p.coursework.join(", ")}.</p>
          </PrototypeV1Row>

          <PrototypeV1Row label="Activities">
            <ul className="space-y-6">
              {prototypeActivities.map((a) => (
                <li key={a.title}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-[15px] font-medium">{a.title}</h3>
                    <span className={`${mono} text-[12px] text-zinc-400`}>{a.period}</span>
                  </div>
                  <p className="mt-1 text-[14px] text-zinc-600">
                    {a.role}. {a.detail}
                  </p>
                </li>
              ))}
            </ul>
          </PrototypeV1Row>

          <PrototypeV1Row label="Skills">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {prototypeSkillGroups.map((g) => (
                <div key={g.label}>
                  <dt className="text-[13px] text-zinc-400">{g.label}</dt>
                  <dd className="mt-1 text-[14px] text-zinc-700">{g.skills.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </PrototypeV1Row>

          <section id="contact" className="scroll-mt-16">
            <PrototypeV1Row label="Contact">
              <ul className="space-y-1">
                {prototypeLinks.map((link) => (
                  <li key={link.label} className="group flex items-center justify-between gap-4 rounded-lg py-1.5">
                    <span className="w-20 text-[14px] text-zinc-400">{link.label}</span>
                    <a
                      href={link.href}
                      target={prototypeIsExternal(link.href) ? "_blank" : undefined}
                      rel={prototypeIsExternal(link.href) ? "noopener noreferrer" : undefined}
                      className="flex-1 truncate text-[14px] text-zinc-800 underline decoration-zinc-300 underline-offset-4 transition hover:decoration-zinc-900"
                    >
                      {link.value}
                    </a>
                    {link.label === "Email" && (
                      <button
                        type="button"
                        onClick={copy}
                        className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 px-2 py-1 text-[12px] text-zinc-600 transition hover:bg-zinc-100 active:scale-[0.97]"
                        aria-live="polite"
                      >
                        {state === "copied" ? <Check size={13} /> : <Copy size={13} />}
                        {state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : "Copy"}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </PrototypeV1Row>
          </section>
        </div>

        <footer className={`${mono} flex items-center justify-between border-t border-zinc-200/80 py-8 text-[12px] text-zinc-400`}>
          <span>{p.name}</span>
          <span>{p.location}</span>
        </footer>
      </div>
    </div>
  );
}
