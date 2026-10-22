import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { Container } from "@/components/layout/Container";
import { Divider } from "@/components/ui/Divider";

export default function Home() {
  return (
    <>
      <Container>
        <Hero />
      </Container>
      <Divider />
      <Projects />
      <Divider />
      <About />
    </>
  );
}
