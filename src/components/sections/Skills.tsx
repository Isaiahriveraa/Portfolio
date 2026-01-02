"use client";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { ResumePreview } from "@/components/ui/ResumePreview";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { SKILLS, SKILL_CATEGORIES, type SkillCategory } from "@/data/skills";

/**
 * Skills section displaying tech stack flanking the resume.
 */
export function Skills() {
  const getSkillsByCategory = (category: SkillCategory) => ({
    category,
    ...SKILL_CATEGORIES[category],
    skills: SKILLS.filter((skill) => skill.category === category),
  });

  const leftCategories: SkillCategory[] = ["languages", "frontend"];
  const rightCategories: SkillCategory[] = ["backend", "tools"];

  const renderSkillGroup = (category: SkillCategory, index: number) => {
    const group = getSkillsByCategory(category);
    return (
      <AnimatedSection key={group.category} delay={0.1 * index}>
        <SpotlightCard className="rounded-xl p-6">
          <div className="mb-4 flex items-center gap-2 text-primary">
            <group.icon size={20} />
            <h3 className="font-semibold">{group.label}</h3>
          </div>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-1">
            {group.skills.map((skill) => (
              <li
                key={skill.name}
                className="flex items-center gap-2 text-sm text-text-muted"
              >
                <skill.icon size={14} className="text-text-subtle" />
                {skill.name}
              </li>
            ))}
          </ul>
        </SpotlightCard>
      </AnimatedSection>
    );
  };

  return (
    <section id="skills" className="overflow-hidden py-24">
      <Container>
        <AnimatedSection>
          <SectionHeading
            badge="Skills & Resume"
            title="My Tech Stack"
            subtitle="The technologies I use to build digital experiences"
          />
        </AnimatedSection>

        <div className="mt-12 grid gap-8 lg:grid-cols-3 lg:items-center">
          {/* Left Column */}
          <div className="order-2 space-y-6 lg:order-1">
            {leftCategories.map((cat, idx) => renderSkillGroup(cat, idx))}
          </div>

          {/* Center Column - Resume */}
          <div className="order-1 flex justify-center lg:order-2">
            <AnimatedSection delay={0.2} className="w-full">
              <ResumePreview />
            </AnimatedSection>
          </div>

          {/* Right Column */}
          <div className="order-3 space-y-6 lg:order-3">
            {rightCategories.map((cat, idx) => renderSkillGroup(cat, idx + 2))}
          </div>
        </div>
      </Container>
    </section>
  );
}
