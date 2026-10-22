"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { ProjectVideo } from "@/lib/projects";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/**
 * A silent screen recording that plays only while on screen. Under reduced
 * motion it shows the poster still instead.
 */
export function LoopingVideo({ video, sizes }: { video: ProjectVideo; sizes: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = usePrefersReducedMotion();
  const poster = `${video.src}-poster.webp`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // React does not always reflect `muted` to the DOM; autoplay needs it.
    el.muted = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduce]);

  if (reduce) return <Image src={poster} alt={video.label} fill sizes={sizes} className="object-cover object-top" />;
  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-label={video.label}
      className="absolute inset-0 h-full w-full object-cover object-top"
    >
      <source src={`${video.src}.webm`} type="video/webm" />
      <source src={`${video.src}.mp4`} type="video/mp4" />
    </video>
  );
}
