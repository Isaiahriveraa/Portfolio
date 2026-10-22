"use client";

import { useEffect } from "react";
import { NEUTRAL_PALETTE, PROJECTS, type ProjectPalette } from "@/lib/projects";

function apply(palette: ProjectPalette) {
  const style = document.body.style;
  style.setProperty("--page-bg", palette.bg);
  style.setProperty("--page-accent", palette.accent);
  style.setProperty("--page-on-accent", palette.onAccent);
}

/**
 * Tints the page with the palette of whichever `[data-palette]` element
 * crosses the middle of the viewport. Values are project ids from PROJECTS;
 * anything else (such as "neutral") restores the neutral palette. The fade
 * itself is a CSS transition on body, so reduced motion makes it instant.
 */
export function ScrollPalette() {
  useEffect(() => {
    const palettes = new Map(PROJECTS.map((p) => [p.id, p.palette]));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting)
            apply(palettes.get((e.target as HTMLElement).dataset.palette ?? "") ?? NEUTRAL_PALETTE);
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    document.querySelectorAll<HTMLElement>("[data-palette]").forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      apply(NEUTRAL_PALETTE);
    };
  }, []);
  return null;
}
