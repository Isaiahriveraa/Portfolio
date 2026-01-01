import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Database,
  Globe,
  Layout,
  Server,
  Terminal,
  Wrench,
  Cpu,
} from "lucide-react";

export interface Skill {
  name: string;
  icon: LucideIcon;
  category: SkillCategory;
}

export type SkillCategory =
  | "languages"
  | "frontend"
  | "backend"
  | "tools";

export const SKILL_CATEGORIES: Record<SkillCategory, { label: string; icon: LucideIcon }> = {
  languages: { label: "Languages", icon: Code2 },
  frontend: { label: "Frontend", icon: Layout },
  backend: { label: "Backend & Database", icon: Server },
  tools: { label: "Tools & Other", icon: Wrench },
};

export const SKILLS: Skill[] = [
  // Languages
  { name: "TypeScript", icon: Code2, category: "languages" },
  { name: "JavaScript", icon: Code2, category: "languages" },
  { name: "Python", icon: Code2, category: "languages" },
  { name: "Java", icon: Code2, category: "languages" },
  { name: "HTML/CSS", icon: Code2, category: "languages" },

  // Frontend
  { name: "React", icon: Layout, category: "frontend" },
  { name: "Next.js", icon: Globe, category: "frontend" },
  { name: "Vite", icon: Layout, category: "frontend" },
  { name: "Tailwind CSS", icon: Layout, category: "frontend" },

  // Backend & Database
  { name: "Node.js", icon: Server, category: "backend" },
  { name: "MongoDB", icon: Database, category: "backend" },
  { name: "RESTful APIs", icon: Server, category: "backend" },
  { name: "WebSockets", icon: Server, category: "backend" },

  // Tools & Other
  { name: "Git/GitHub", icon: Terminal, category: "tools" },
  { name: "CI/CD", icon: Wrench, category: "tools" },
  { name: "OpenAI API", icon: Cpu, category: "tools" },
  { name: "IndexedDB", icon: Database, category: "tools" },
];
