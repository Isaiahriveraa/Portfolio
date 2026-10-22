"use client";

import { motion } from "framer-motion";
import { customEasing } from "@/lib/animations";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { LoopingVideo } from "./LoopingVideo";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-12% 0px" },
  transition: { duration: 0.8, ease: customEasing, delay },
});

/**
 * A white browser window playing the project's desktop recording, with its
 * phone recording overlapping the corner when there is one.
 */
export function DeviceFrames({ project }: { project: Project }) {
  return (
    <div className={cn("relative", project.phone && "pb-24 pr-3 sm:pb-10 sm:pr-14 lg:pb-14")}>
      <motion.div {...rise(0)} className="group/frame">
        <div className="overflow-hidden rounded-[14px] border border-foreground/10 bg-surface shadow-[0_24px_60px_-28px_rgba(17,17,17,0.35)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/frame:-translate-y-1 motion-reduce:transform-none">
          <div className="flex items-center gap-3 border-b border-foreground/[0.07] px-3.5 py-2.5">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-[#e4e4e2]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#e4e4e2]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#e4e4e2]" />
            </span>
            <span className="mx-auto w-full max-w-[320px] truncate rounded-md bg-[#f4f4f2] px-3 py-1 text-center font-mono text-[12px] text-text-muted">
              {project.urlLabel}
            </span>
            <span className="w-[42px]" aria-hidden />
          </div>
          <div className="relative aspect-[16/10] bg-surface">
            <LoopingVideo video={project.desktop} sizes="(min-width: 1024px) 720px, 100vw" />
          </div>
        </div>
      </motion.div>
      {project.phone && (
        <motion.div
          {...rise(0.15)}
          className="absolute -bottom-1 right-0 w-[24%] min-w-[96px] max-w-[172px] sm:-bottom-2 lg:-right-6"
        >
          <div className="rounded-[28px] border border-foreground/10 bg-surface p-[5px] shadow-[0_24px_50px_-18px_rgba(17,17,17,0.4)] sm:rounded-[32px] sm:p-[6px]">
            <div className="relative aspect-[390/844] overflow-hidden rounded-[23px] bg-surface sm:rounded-[26px]">
              <LoopingVideo video={project.phone} sizes="172px" />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
