"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Trophy } from "lucide-react";
import { customEasing } from "@/lib/animations";
import type { Project } from "@/lib/projects";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import { DeviceFrames } from "./DeviceFrames";

/* Fills and rules in the project's own accent, set on the article. */
const accentFill = "bg-[var(--project-accent)] text-[var(--project-on-accent)]";

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-12% 0px" },
  transition: { duration: 0.7, ease: customEasing },
};

/** What sits above the title: the event or award, else the org logo, else the context. */
function Kicker({ project }: { project: Project }) {
  const { event, logo } = project;
  if (event)
    return (
      <div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span
            className={cn(
              accentFill,
              "inline-flex items-center gap-2 rounded-full font-bold tracking-[-0.01em]",
              event.award ? "px-4 py-2 text-[17px]" : "px-3.5 py-1.5 text-[15px]",
            )}
          >
            {event.award && <Trophy size={18} strokeWidth={2.25} aria-hidden />}
            {event.award ?? `Built at ${event.name}`}
          </span>
          {event.award && <span className="text-[17px] font-bold tracking-[-0.01em]">{event.name}</span>}
        </div>
        {event.detail && <p className="mt-2 text-[14px] text-text-muted">{event.detail}</p>}
      </div>
    );
  if (logo)
    return (
      <div className="flex items-center gap-3">
        <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className="h-8 w-auto" />
        <span className="border-l border-foreground/15 pl-3 text-[14px] font-medium leading-snug text-text-muted">
          {project.context}
        </span>
      </div>
    );
  return <p className="text-[14px] font-medium text-text-muted">{project.context}</p>;
}

function LinkArrow({ size = 15 }: { size?: number }) {
  return (
    <ArrowUpRight
      size={size}
      strokeWidth={2.25}
      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
    />
  );
}

/**
 * One project: the key result and my part beside its recordings, with the
 * full story expanding in place. `data-palette` tints the page while it is
 * in view.
 */
export function ProjectShowcase({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const reduce = usePrefersReducedMotion();
  const site = project.links[0];

  return (
    <article
      data-palette={project.id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-24 py-12 lg:py-16"
      style={
        {
          "--project-accent": project.palette.accent,
          "--project-on-accent": project.palette.onAccent,
          "--highlight-color": project.palette.highlight,
        } as React.CSSProperties
      }
    >
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <motion.div {...reveal} className="lg:col-span-5">
          <Kicker project={project} />
          <h3
            id={`${id}-title`}
            className="font-wide mt-4 text-[38px] font-bold leading-[1.02] tracking-[-0.035em] sm:text-[48px]"
          >
            {project.title}
          </h3>
          {project.achievement && (
            <p className="mt-4 text-[20px] font-semibold leading-[1.35] tracking-[-0.01em] text-foreground sm:text-[22px]">
              <span className="highlight">{project.achievement}</span>
            </p>
          )}
          <p className="mt-3 max-w-[46ch] text-[16px] leading-[1.55] text-text-secondary sm:text-[17px]">
            {project.summary}
          </p>
          {project.part && (
            <p className="mt-4 max-w-[46ch] border-l-[3px] border-[var(--project-accent)] pl-3 text-[15px] leading-[1.5] text-text-secondary">
              <span className="font-bold text-foreground">My part. </span>
              {project.part}
            </p>
          )}
          {project.demo && (
            <a
              href={project.demo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 flex items-center gap-3 rounded-[12px] border border-foreground/10 bg-white/70 p-2 pr-4 transition hover:bg-white"
            >
              <span className="relative aspect-[16/9] w-[132px] shrink-0 overflow-hidden rounded-[8px] border border-foreground/[0.06]">
                <Image src={project.demo.src} alt={project.demo.alt} fill sizes="132px" className="object-cover" />
              </span>
              <span className="text-[14px] leading-snug">
                <span className="block font-semibold text-foreground">{project.demo.caption}</span>
                <span className="mt-0.5 inline-flex items-center gap-1 text-text-muted">
                  Watch on Devpost
                  <LinkArrow size={14} />
                </span>
              </span>
            </a>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`${id}-panel`}
              onClick={() => setOpen((v) => !v)}
              className={cn(
                accentFill,
                "group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-semibold transition-[filter,transform] hover:brightness-110 active:scale-[0.98]",
              )}
            >
              {open ? "Show less" : "Read the story"}
              <ChevronDown
                size={17}
                strokeWidth={2.25}
                className={cn("transition-transform duration-300", open ? "rotate-180" : "group-hover:translate-y-0.5")}
              />
            </button>
            <a
              href={site.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-white/60 px-4 py-2.5 text-[15px] font-semibold text-foreground transition-colors hover:bg-white"
            >
              {site.label}
              <LinkArrow size={16} />
            </a>
          </div>
        </motion.div>
        <div className="lg:col-span-7">
          <DeviceFrames project={project} />
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-label={`${project.title} details`}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { height: 0, opacity: 0, transition: { duration: 0 } } : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.45, ease: customEasing }}
            className="overflow-hidden"
          >
            <div className="mt-8 grid grid-cols-1 gap-8 rounded-[16px] border border-foreground/[0.08] bg-white/75 p-6 sm:p-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <p className="max-w-[62ch] text-[17px] leading-[1.6] text-[#262626]">{project.story}</p>
                <h4 className="font-wide mt-7 text-[18px] font-bold tracking-[-0.01em]">
                  {project.team ? "What we built" : "What I built"}
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {project.built.map((item) => (
                    <li key={item} className="flex gap-3 text-[16px] leading-[1.5] text-text-secondary">
                      <span
                        className="mt-[8px] h-[7px] w-[7px] shrink-0 rounded-[2px] bg-[var(--project-accent)]"
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
                    <h4 className="font-wide text-[18px] font-bold tracking-[-0.01em]">Team</h4>
                    <p className="mt-2 text-[16px] leading-[1.5] text-text-secondary">{project.team}</p>
                  </div>
                )}
                <div>
                  <h4 className="font-wide text-[18px] font-bold tracking-[-0.01em]">Stack</h4>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((s) => (
                      <li
                        key={s}
                        className="rounded-md border border-foreground/10 bg-surface px-2.5 py-1 font-mono text-[13px] text-[#262626]"
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
                      className={cn(
                        "group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-semibold transition",
                        i === 0
                          ? cn(accentFill, "hover:brightness-110")
                          : "border border-foreground/15 bg-surface text-foreground hover:border-foreground/40",
                      )}
                    >
                      {l.label}
                      <LinkArrow />
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
