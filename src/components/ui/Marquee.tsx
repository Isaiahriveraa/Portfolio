"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}

/**
 * Horizontal marquee component with infinite scroll animation.
 * Each set of items spans 100vw with even spacing, creating a seamless loop.
 * Pauses on hover and respects reduced motion preferences.
 */
export function Marquee({
  children,
  speed = 35,
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  const prefersReducedMotion = useReducedMotion();

  // Fallback to static horizontal scroll for reduced motion
  if (prefersReducedMotion) {
    return (
      <div className={cn("flex gap-6 overflow-x-auto pb-4 px-4", className)}>
        {children}
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className={cn(
          "flex",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        {/* First set - spans full viewport width with even spacing */}
        <div className="flex min-w-[100vw] shrink-0 justify-around">
          {children}
        </div>
        {/* Duplicate set for seamless loop */}
        <div className="flex min-w-[100vw] shrink-0 justify-around">
          {children}
        </div>
      </div>
    </div>
  );
}
