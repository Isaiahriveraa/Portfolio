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
 * Wrapper component that animates children on scroll into view.
 * Uses Framer Motion's whileInView for intersection-based animation.
 */
export function AnimatedSection({
  children,
  className,
  variants = fadeUpVariants,
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
