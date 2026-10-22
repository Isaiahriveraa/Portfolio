"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { customEasing } from "@/lib/animations";
import { EDUCATION, SITE_CONFIG } from "@/lib/constants";
import { CONTRIBUTION_LEVELS } from "@/lib/pixelFont";

/* A loose cluster of contribution squares behind the portrait. */
const PHOTO_PIXELS = ["..##.#", ".#.###", "##.#..", ".###.#", "#.#.##", ".##.#."];

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: customEasing, delay },
});

/**
 * Portrait on the left, a first-person intro on the right, and the two
 * actions a recruiter needs: the résumé and email.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="grid grid-cols-1 items-center gap-8 pb-10 pt-8 sm:pt-12 lg:grid-cols-12 lg:gap-12 lg:pb-14 lg:pt-14"
    >
      <motion.div {...enter(0)} className="lg:col-span-5">
        <div className="relative w-[200px] sm:w-[260px] lg:ml-6 lg:w-[340px]">
          <div
            className="absolute -left-3 -top-4 grid grid-cols-6 gap-[5px] sm:-left-8 sm:-top-8 sm:gap-[7px]"
            aria-hidden
          >
            {PHOTO_PIXELS.flatMap((row, r) =>
              row.split("").map((ch, c) => (
                <span
                  key={`${r}-${c}`}
                  className="h-[14px] w-[14px] rounded-[3px] sm:h-[22px] sm:w-[22px] sm:rounded-[4px]"
                  style={{ background: ch === "#" ? CONTRIBUTION_LEVELS[1 + ((r + c) % 4)] : "transparent" }}
                />
              )),
            )}
          </div>
          <Image
            src={SITE_CONFIG.photo}
            alt={SITE_CONFIG.shortName}
            width={302}
            height={302}
            priority
            className="relative aspect-square w-full rounded-[16px] border border-foreground/10 object-cover shadow-[0_30px_60px_-30px_rgba(17,17,17,0.45)]"
          />
          <span className="absolute -bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-surface px-3 py-1.5 text-[13px] font-semibold shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#40c463]" aria-hidden />
            {SITE_CONFIG.availability}
          </span>
        </div>
      </motion.div>
      <div className="pt-4 lg:col-span-7 lg:pt-0">
        <motion.h1
          {...enter(0.06)}
          className="font-wide text-[52px] font-light leading-[0.95] tracking-[-0.05em] sm:text-[72px] lg:text-[88px]"
        >
          Hey, I&apos;m <span className="font-bold">Yonie.</span>
        </motion.h1>
        <motion.p
          {...enter(0.12)}
          className="mt-6 max-w-[30ch] text-[22px] font-light leading-[1.3] tracking-[-0.02em] sm:text-[28px]"
        >
          I study <strong className="font-bold">Informatics at UW</strong> (class of {EDUCATION.classOf}) and build{" "}
          <strong className="font-bold">full-stack apps</strong>. As IUGA&apos;s Director of IT, I{" "}
          <span className="highlight highlight-lime font-semibold">built its merch shop</span>, and I ship hackathon
          projects like FittingRoom.
        </motion.p>
        <motion.div {...enter(0.18)} className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={SITE_CONFIG.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-[15px] font-semibold text-white transition hover:bg-[#2a2a2a] active:scale-[0.98]"
          >
            <FileText size={17} strokeWidth={2} />
            Résumé
            <ArrowUpRight
              size={16}
              strokeWidth={2.25}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
          <a
            href={SITE_CONFIG.emailHref}
            className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-surface px-5 py-3 text-[15px] font-semibold transition hover:border-foreground/40"
          >
            <Mail size={17} strokeWidth={2} />
            Email me
          </a>
        </motion.div>
      </div>
    </section>
  );
}
