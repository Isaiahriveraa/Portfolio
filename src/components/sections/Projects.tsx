"use client";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { Marquee } from "@/components/ui/Marquee";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ScrollDown } from "@/components/ui/ScrollDown";
import { PROJECTS } from "@/lib/projects";

/**
 * Projects section with horizontal marquee animation.
 * Cards auto-scroll and pause on hover.
 */
export function Projects() {
  return (
    <section id="projects" className="py-24 overflow-hidden">
      <Container>
        <AnimatedSection>
          <SectionHeading
            badge="Projects"
            title="Featured Work"
            subtitle="A selection of projects I've built"
          />
        </AnimatedSection>
      </Container>

      {/* Full-width marquee (outside Container for edge-to-edge scroll) */}
      <AnimatedSection delay={0.2}>
        <Marquee speed={35} pauseOnHover>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Marquee>
      </AnimatedSection>

      <Container>
        <AnimatedSection delay={0.3}>
          <ScrollDown href="#contact" className="mt-16" />
        </AnimatedSection>
      </Container>
    </section>
  );
}
