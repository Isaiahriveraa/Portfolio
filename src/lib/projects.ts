export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  tags: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "huskybids",
    title: "HuskyBids",
    description: "A real-time auction platform for university students.",
    image: "/projects/huskybids.png",
    url: "https://huskybids.me",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
  },
];
