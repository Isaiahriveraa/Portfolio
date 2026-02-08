"use client";

import Image from "next/image";
import { GitHubCalendar } from "react-github-calendar";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ResumePreview } from "@/components/ui/ResumePreview";
import { SKILLS, SKILL_CATEGORIES, type SkillCategory } from "@/data/skills";

const skillOrder: SkillCategory[] = ["languages", "frontend", "backend", "tools"];

export function About() {
  return (
    <section id="about" className="py-24">
      <Container>
        <AnimatedSection>
          <SectionHeading
            badge="About"
            title="About Me"
            subtitle="What I build, what I know, and proof of work"
          />
        </AnimatedSection>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Left Column — Bio + Resume */}
          <div className="space-y-8">
            <AnimatedSection delay={0.1}>
              <div className="flex items-start gap-6">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-border">
                  <Image
                    src="/profile.jpg"
                    alt="Yonie Isaiah Rivera-Aguilar"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="space-y-3 text-text-secondary text-sm leading-relaxed">
                  <p>
                    Full-stack engineer specializing in React, Next.js, and TypeScript.
                    I build tools that solve real problems — from peer-to-peer tutoring
                    platforms to voice-native macOS automation.
                  </p>
                  <p>
                    Currently shipping{" "}
                    <span className="text-accent-light">Guru</span> (peer tutoring @ WINFO) and{" "}
                    <span className="text-accent-light">Ego</span> (on-device voice agent for macOS).
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <ResumePreview />
            </AnimatedSection>
          </div>

          {/* Right Column — Skills + GitHub Calendar */}
          <div className="space-y-6">
            <AnimatedSection delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {skillOrder.map((category) => {
                  const config = SKILL_CATEGORIES[category];
                  const skills = SKILLS.filter((s) => s.category === category);
                  return (
                    <SpotlightCard key={category} className="rounded-xl p-4">
                      <div className="mb-3 flex items-center gap-2 text-accent">
                        <config.icon size={16} />
                        <h3 className="text-sm font-semibold">{config.label}</h3>
                      </div>
                      <ul className="space-y-1.5">
                        {skills.map((skill) => (
                          <li
                            key={skill.name}
                            className="flex items-center gap-2 text-xs text-text-secondary"
                          >
                            <skill.icon size={12} className="text-text-muted" />
                            {skill.name}
                          </li>
                        ))}
                      </ul>
                    </SpotlightCard>
                  );
                })}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <div className="glass-card rounded-xl p-4">
                <h3 className="mb-3 text-sm font-semibold text-accent">
                  Contribution Activity
                </h3>
                <div className="overflow-x-auto">
                  <GitHubCalendar
                    username="Isaiahriveraa"
                    colorScheme="dark"
                    fontSize={11}
                    blockSize={10}
                    blockMargin={3}
                    theme={{
                      dark: ["#1a1a25", "#4d1f1f", "#8f2f2f", "#d94f4f", "#ff5252"],
                    }}
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </Container>
    </section>
  );
}
