import { ProjectShowcase } from "@/components/ui/ProjectShowcase";
import { PROJECTS } from "@/lib/projects";

/**
 * Selected work: one showcase per project, in the order of PROJECTS.
 */
export function Projects() {
  return (
    <section id="work" className="scroll-mt-20 pt-20 lg:pt-28">
      <h2
        data-palette="neutral"
        className="font-wide text-[44px] font-bold leading-none tracking-[-0.045em] sm:text-[72px]"
      >
        selected work.
      </h2>
      <div>
        {PROJECTS.map((project) => (
          <ProjectShowcase key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
