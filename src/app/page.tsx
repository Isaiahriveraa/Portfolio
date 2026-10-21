import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { Divider } from "@/components/ui/Divider";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // prototype: `?v=1`..`?v=13` render a redesign direction over this page.
  const { v } = await searchParams;
  if (v !== undefined) {
    const prototype = await import("@/prototype/PrototypeRoot");
    const prototypeVersion = prototype.getPrototypeVersion(v);
    if (prototypeVersion) return <prototype.PrototypeRoot version={prototypeVersion} />;
  }

  return (
    <>
      <Hero />
      <Divider />
      <Projects />
      <Divider />
      <About />
    </>
  );
}
