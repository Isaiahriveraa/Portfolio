"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUpVariants } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
}

/**
 * Merges delay into variant's visible transition without overriding
 * existing transition properties (duration, ease).
 */
function mergeDelayIntoVariants(variants: Variants, delay: number): Variants {
  if (delay === 0) return variants;

  const visible = variants.visible;
  if (typeof visible !== "object") return variants;

  return {
    ...variants,
    visible: {
      ...visible,
      transition: {
        ...(typeof visible.transition === "object" ? visible.transition : {}),
        delay,
      },
    },
  };
}

/**
 * Wrapper component that animates children on scroll into view.
 * Uses Framer Motion's whileInView for intersection-based animation.
 */
export function AnimatedSection({
  children,
  className,
  variants = fadeUpVariants,
  delay = 0,
}: AnimatedSectionProps) {
  const resolvedVariants = mergeDelayIntoVariants(variants, delay);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={resolvedVariants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
