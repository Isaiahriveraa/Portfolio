"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}

/**
 * CSS-based auto-scrolling marquee with pauseOnHover support.
 * Uses -50% translation for seamless looping.
 */
export function Marquee({
  children,
  speed = 40,
  pauseOnHover = false,
  className,
}: MarqueeProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);

  if (prefersReducedMotion) {
    return (
      <div className={cn("flex gap-4 sm:gap-6 overflow-x-auto pb-4 px-4", className)}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex overflow-x-hidden overflow-y-hidden select-none",
        className
      )}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div
        className="flex animate-marquee"
        style={{
          animationDuration: `${speed}s`,
          animationPlayState: isPaused ? "paused" : "running",
          willChange: "transform",
        }}
      >
        <div className="flex shrink-0 min-w-max items-stretch gap-4 sm:gap-6 md:gap-8 py-4 pr-4 sm:pr-6 md:pr-8">
          {children}
        </div>
        <div className="flex shrink-0 min-w-max items-stretch gap-4 sm:gap-6 md:gap-8 py-4 pr-4 sm:pr-6 md:pr-8">
          {children}
        </div>
      </div>
    </div>
  );
}
