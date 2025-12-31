"use client";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/common/AnimatedSection";

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
          {/* Profile Image Placeholder */}
          <AnimatedSection delay={0.1}>
            <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-surface">
              <div className="absolute inset-0 flex items-center justify-center text-text-muted">
                <div className="text-center">
                  <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-primary/20" />
                  <p className="text-sm">Profile Photo</p>
                </div>
              </div>
              {/* Decorative gradient */}
              <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-primary/20 blur-2xl" />
            </div>
          </AnimatedSection>

          {/* Bio Content */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-4 text-text-muted">
              <p>
                I&apos;m a passionate software engineer with a love for building
                digital experiences that make a difference. My journey in tech
                started with curiosity about how things work, and has evolved into
                a career focused on creating clean, efficient, and user-friendly
                applications.
              </p>
              <p>
                I specialize in full-stack development with a focus on modern web
                technologies like React, Next.js, TypeScript, and Node.js. I believe
                in writing code that is not only functional but also maintainable
                and scalable.
              </p>
              <p>
                When I&apos;m not coding, you can find me exploring new technologies,
                contributing to open-source projects, or learning about the latest
                trends in software development. I&apos;m always eager to take on new
                challenges and grow as a developer.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
