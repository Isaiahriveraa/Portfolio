"use client";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { Marquee } from "@/components/ui/Marquee";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { PROJECTS } from "@/lib/projects";

export function Projects() {
  return (
    <section id="projects" className="py-12 md:py-24 overflow-hidden">
      <Container>
        <AnimatedSection>
          <SectionHeading
            badge="Featured Work"
            title="What I've Built"
            subtitle="Projects I've shipped — from hackathons to production"
          />
        </AnimatedSection>
      </Container>

      <AnimatedSection delay={0.2}>
        <Marquee speed={35} pauseOnHover>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Marquee>
      </AnimatedSection>
    </section>
  );
}
