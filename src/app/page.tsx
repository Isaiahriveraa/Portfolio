import { Hero } from "@/components/sections/Hero";
import { Activity } from "@/components/sections/Activity";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { Container } from "@/components/layout/Container";
import { Divider } from "@/components/ui/Divider";
import { ScrollPalette } from "@/components/common/ScrollPalette";
import { SITE_CONFIG } from "@/lib/constants";
import { getContributionActivity } from "@/lib/github";

export default async function Home() {
  const activity = await getContributionActivity(SITE_CONFIG.githubHandle);
  return (
    <>
      <Container>
        <ScrollPalette />
        <Hero />
        <Activity activity={activity} />
        <Projects />
      </Container>
      <Divider />
      <About />
    </>
  );
}
