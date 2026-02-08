import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { Divider } from "@/components/ui/Divider";

export default function Home() {
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
