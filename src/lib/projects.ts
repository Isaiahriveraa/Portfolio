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
    url: "huskybids.me",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Husky Coding Project"],
  },
  {
    id: "commit",
    title: "Commit",
    description:
      "A team accountability platform for remote teams with transparent commitments and deliverables tracking.",
    image: "/projects/commit.png",
    url: "https://commitapp.netlify.app",
    tags: ["TypeScript", "Next.js", "Claude Builder Hackathon"],
  },
  {
    id: "guru",
    title: "Guru",
    description: "Guru a peer-to-peer tutoring platform connecting UW student tutors with learners. Flexible 1-on-1 instruction across STEM, rock climbing, and more. Smart matching, integrated payments, real-time messaging, and reputation-based groups.",
    url: "https://guruappp.netlify.app",
    image: "/projects/guru.png",
    tags: ["Typescript", "CSS", "JavaScript", "WINFO Hackathon 26"]
  },
  {
    id: "care-gap-risk-assessment",
    title: "Care Gap Risk Assessment",
    description: "This project analyzes the National Health Interview Survey (NHIS) Access to Care Dataset (2024) to identify, quantify, and rank healthcare access disparities across 76 demographic subgroups in the United States.",
    image: "/projects/care-gap-risk-assessment.png",
    url: "https://care-gap-risk-assessment.netlify.app",
    tags: ["Python", "Pandas", "Recharts", "Data Analysis", "DubsTech Datathon 2026", "Next.js (React)", "Tailwind CSS"],
  },
  {
    id: "ego",
    title: "Ego",
    description:
      "An on-device voice agent that turns natural speech into instant macOS actions. No cloud. No latency. No compromise.",
    image: "/projects/ego.png",
    url: "#",
    tags: ["Swift", "WhisperKit", "macOS", "Voice AI"],
  },
];


