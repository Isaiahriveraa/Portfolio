"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}

/**
 * Simple auto-scrolling marquee that pauses on hover.
 */
export function Marquee({
  children,
  speed: _speed = 35,
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  const AUTO_SCROLL_SPEED = 0.5;

  useEffect(() => {
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;

    const scroll = () => {
      if (!isHoveredRef.current && container) {
        const firstSet = container.firstElementChild as HTMLElement;
        if (firstSet) {
          const firstSetWidth = firstSet.offsetWidth;
          const style = window.getComputedStyle(container);
          const gap = parseFloat(style.columnGap) || 32;

          // Reset when scrolled past first set
          if (container.scrollLeft >= firstSetWidth + gap) {
            container.scrollLeft = 0;
          } else {
            container.scrollLeft += AUTO_SCROLL_SPEED;
          }
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [prefersReducedMotion]);

  // Fallback for reduced motion
  if (prefersReducedMotion) {
    return (
      <div className={cn("flex gap-6 overflow-x-auto pb-4 px-4", className)}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex gap-8 overflow-x-hidden overflow-y-hidden select-none",
        "scrollbar-hide",
        className
      )}
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      onMouseEnter={() => {
        if (pauseOnHover) isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        if (pauseOnHover) isHoveredRef.current = false;
      }}
      onTouchStart={() => {
        isHoveredRef.current = true;
      }}
      onTouchEnd={() => {
        isHoveredRef.current = false;
      }}
    >
      {/* Set 1 */}
      <div className="flex shrink-0 min-w-max items-stretch gap-8 py-4">
        {children}
      </div>
      {/* Set 2 - duplicate for seamless loop */}
      <div className="flex shrink-0 min-w-max items-stretch gap-8 py-4">
        {children}
      </div>
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
