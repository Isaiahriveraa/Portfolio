"use client";

import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { SITE_CONFIG } from "@/lib/constants";

const customEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];

const itemVariants = (delay: number) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: customEasing,
      delay,
    },
  },
});

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden"
    >
      <AmbientBackground />

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          {/* Name */}
          <motion.h1
            variants={itemVariants(0)}
            initial="hidden"
            animate="visible"
            className="mb-4 font-[family-name:var(--font-display)] text-5xl font-bold gradient-text sm:text-6xl md:text-7xl"
          >
            {SITE_CONFIG.name}
          </motion.h1>

          {/* Role */}
          <motion.p
            variants={itemVariants(0.2)}
            initial="hidden"
            animate="visible"
            className="mb-8 text-xl text-text-secondary sm:text-2xl"
          >
            {SITE_CONFIG.title}
          </motion.p>

          {/* Terminal snippet */}
          <motion.div
            variants={itemVariants(0.4)}
            initial="hidden"
            animate="visible"
            className="mx-auto mb-10 max-w-lg glass-card rounded-lg p-4 text-left"
          >
            <div className="mb-2 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500/60" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
              <div className="h-3 w-3 rounded-full bg-green-500/60" />
              <span className="ml-2 font-[family-name:var(--font-mono)] text-xs text-text-muted">
                ~/portfolio
              </span>
            </div>
            <div className="font-[family-name:var(--font-mono)] text-sm leading-relaxed">
              <p className="text-text-muted">
                <span className="text-accent">$</span> cat about.txt
              </p>
              <p className="mt-1 text-text-secondary">
                Full-stack engineer building tools that
              </p>
              <p className="text-text-secondary">
                feel like magic. Currently shipping
              </p>
              <p className="text-text-secondary">
                <span className="text-accent-light">Guru</span> &{" "}
                <span className="text-accent-light">Ego</span>.
              </p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={itemVariants(0.6)}
            initial="hidden"
            animate="visible"
          >
            <ButtonLink href="#projects" size="lg">
              View Projects
            </ButtonLink>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
