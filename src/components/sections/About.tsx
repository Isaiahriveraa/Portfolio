"use client";

import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { ScrollDown } from "@/components/ui/ScrollDown";

/**
 * About section with bio and personal introduction.
 */
export function About() {
  return (
    <section id="about" className="py-24">
      <Container>
        <AnimatedSection>
          <SectionHeading
            badge="About"
            title="Get to know me"
            subtitle="A brief introduction to who I am and what I do"
          />
        </AnimatedSection>

        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* Profile Image */}
          <AnimatedSection delay={0.1}>
            <div className="flex flex-col items-center">
              <div className="relative mx-auto aspect-square w-full max-w-[240px] sm:max-w-sm overflow-hidden rounded-2xl border border-border bg-surface">
                <Image
                  src="/profile.jpg"
                  alt="Yonie Isaiah Rivera-Aguilar"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Decorative gradient */}
                <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-primary/20 blur-2xl" />
              </div>
              <p className="mt-4 text-sm text-text-muted">
                Building Guru @WINFO26
              </p>
            </div>
          </AnimatedSection>

          {/* Bio Content */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-4 text-text-muted">
              <p>
                I&apos;m a passionate software engineer with a deep love for building
                disruptive experiences that make a tangible difference. I focus on
                developing clean, efficient, and user-friendly applications that people
                genuinely enjoy using, and I&apos;m always eager to learn on the go to
                tackle any challenge that comes my way.
              </p>
              <p>
                I specialize in full-stack development, with a core focus on modern
                technologies like React, Next.js, TypeScript, Node.js, and JavaScript.
                I&apos;m also familiar with languages such as Java and Python, allowing
                me to approach problems from different architectural perspectives.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll likely find me keeping up with the
                latest technological advancements, specifically exploring how to utilize
                and integrate AI into my workflow to drive efficiency. To stay balanced,
                I also enjoy rock climbing and hitting the gym for a good workout session.
              </p>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.3}>
          <ScrollDown href="#skills" className="mt-16" />
        </AnimatedSection>
      </Container>
    </section>
  );
}
