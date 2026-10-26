import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { EDUCATION } from "@/lib/constants";
import { ACTIVITIES, IUGA_ROLE as iuga } from "@/data/experience";

/**
 * Who I am in one line, my IUGA role up front, then education and clubs.
 */
export function About() {
  return (
    <section id="about" data-palette="neutral" className="scroll-mt-20 border-t border-foreground/15 py-16 lg:py-24">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2 className="font-wide text-[44px] font-bold leading-none tracking-[-0.045em] sm:text-[72px]">about me.</h2>
          <p className="mt-6 max-w-[34ch] text-[20px] font-light leading-[1.4] tracking-[-0.015em] sm:text-[24px]">
            I&apos;m a <strong className="font-bold">full-stack developer</strong> working mostly in React, Next.js, and
            TypeScript. I build tools that solve real problems, from peer-to-peer tutoring to voice-native macOS
            automation.
          </p>
        </div>
        <div className="space-y-6 lg:col-span-7">
          <div className="rounded-[16px] border border-foreground/[0.08] bg-surface p-6 shadow-[0_20px_50px_-34px_rgba(17,17,17,0.35)] sm:p-8">
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
                className="group inline-flex items-center gap-1.5 rounded-full border border-foreground/15 px-3 py-1.5 font-mono text-[13px] transition hover:bg-foreground hover:text-white"
              >
                {iuga.siteLabel}
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
            <h3 className="font-wide mt-6 text-[30px] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[36px]">
              {iuga.title}
            </h3>
            <p className="mt-1 text-[17px] font-semibold text-text-secondary">
              {iuga.organization} ({iuga.acronym}), UW
            </p>
            <p className="mt-4 max-w-[62ch] text-[16px] leading-[1.6] text-text-secondary">
              {iuga.acronym} is the undergraduate student government for UW Informatics, run by Informatics
              undergraduates for Informatics undergraduates.
            </p>
            <p className="mt-3 max-w-[62ch] text-[16px] leading-[1.6] text-text-secondary">
              I lead {iuga.acronym}&apos;s IT Committee, which maintains iuga.info so students can find resources and
              discover events, and supports the iStartup Lab.{" "}
              <span className="highlight highlight-lime font-semibold text-foreground">
                I built the site&apos;s shop and most of its events pages: 249 of its 616 commits.
              </span>
            </p>
          </div>
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <dt className="font-mono text-[12px] text-text-muted">{EDUCATION.dates}</dt>
              <dd className="mt-1.5 text-[17px] font-bold leading-snug">
                {EDUCATION.school}
                <span className="mt-0.5 block text-[15px] font-normal text-text-secondary">
                  {EDUCATION.degree}, class of {EDUCATION.classOf}
                </span>
                <span className="mt-0.5 block text-[15px] font-normal text-text-secondary">GPA {EDUCATION.gpa}</span>
              </dd>
            </div>
            {ACTIVITIES.map((a) => (
              <div key={a.title}>
                <dt className="font-mono text-[12px] text-text-muted">{a.period}</dt>
                <dd className="mt-1.5 text-[17px] font-bold leading-snug">
                  {a.title}
                  <span className="mt-0.5 block text-[15px] font-normal text-text-secondary">{a.role}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
