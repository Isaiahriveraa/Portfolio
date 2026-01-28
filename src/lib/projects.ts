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
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Husky Coding Project"],
  },
  {
    id: "commit",
    title: "Commit",
    description:
      "A team accountability platform for remote teams with transparent commitments and deliverables tracking.",
    image: "/projects/commit.png",
    url: "https://commitapp.netlify.app/dashboard",
    tags: ["TypeScript", "Next.js", "Claude Builder Hackathon"],
  },
  {
    id: "guru",
    title: "Guru",
    description: "Guru a peer-to-peer tutoring platform connecting UW student tutors with learners. Flexible 1-on-1 instruction across STEM, rock climbing, and more. Smart matching, integrated payments, real-time messaging, and reputation-based groups.",
    url: "https://guruappp.netlify.app/",
    image: "/projects/guru.png",
    tags: ["Typescript", "CSS", "JavaScript", "WINFO Hackathon 26"]
  },
];

