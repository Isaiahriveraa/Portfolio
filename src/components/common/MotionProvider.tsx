"use client";

import { MotionConfig } from "framer-motion";

/**
 * Makes every Framer Motion animation on the site follow the user's
 * reduced-motion setting: movement is dropped, fades stay.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
