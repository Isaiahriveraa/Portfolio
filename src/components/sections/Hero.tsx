"use client";

import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { ScrollDown } from "@/components/ui/ScrollDown";
import { SITE_CONFIG } from "@/lib/constants";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

/**
 * Hero section with animated intro, name, title, and CTAs.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          {/* Greeting */}
          <motion.p
            variants={itemVariants}
            className="mb-4 text-sm font-medium tracking-wide text-primary"
          >
            Hi, my name is
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="mb-4 text-4xl font-bold text-foreground sm:text-5xl md:text-6xl"
          >
            {SITE_CONFIG.name}
          </motion.h1>

          {/* Title */}
          <motion.p
            variants={itemVariants}
            className="mb-6 text-2xl font-medium text-text-muted sm:text-3xl"
          >
            {SITE_CONFIG.title}
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mb-8 max-w-xl text-text-muted"
          >
            I build exceptional digital experiences with modern web technologies.
            Passionate about clean code, intuitive design, and continuous learning.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <ButtonLink href="#projects" size="lg">
              View Projects
            </ButtonLink>
            <ButtonLink href="#contact" variant="outline" size="lg">
              Contact Me
            </ButtonLink>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="mt-16"
          >
            <ScrollDown href="#about" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
