import type { Variants } from "framer-motion";

/** Custom easing curve — snappy entrance with smooth settle */
export const customEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Fade up animation for scroll reveals.
 */
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: customEasing,
    },
  },
};

/**
 * Staggered children animation.
 */
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/**
 * Fast stagger for character/element reveals.
 */
export const staggerFastVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

/**
 * Scale up animation for cards and interactive elements.
 */
export const scaleUpVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: customEasing,
    },
  },
};

/**
 * Glow in animation — scale + blur entrance.
 */
export const glowInVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: customEasing,
    },
  },
};

/**
 * Fade in animation (no movement).
 */
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};
