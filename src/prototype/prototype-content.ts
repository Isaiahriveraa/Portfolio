/**
 * Shared content for the redesign directions rendered with `?v=N`.
 * Every fact comes from the current site (projects, About, skills, footer)
 * or the résumé PDF it already links to. Nothing here is invented.
 */

export const prototypeProfile = {
  name: "Yonie Isaiah Rivera-Aguilar",
  shortName: "Yonie Rivera-Aguilar",
  firstName: "Yonie",
  role: "Software engineer",
  school: "University of Washington",
  degree: "B.S. Informatics",
  schoolDates: "Sep 2024 - Dec 2027",
  classOf: "2027",
  gpa: "3.47",
  location: "Seattle, WA",
  photo: "/headshot.png",
  resume: "/resume.pdf",
  email: "yiriveraaa@gmail.com",
  emailHref: "mailto:yiriveraaa@gmail.com",
  github: "https://github.com/Isaiahriveraa",
  githubHandle: "Isaiahriveraa",
  linkedin: "https://www.linkedin.com/in/yirivera/",
  linkedinHandle: "yirivera",
  availability: "Open to internships and new-grad roles",
  pitch:
    "Full-stack engineer specializing in React, Next.js, and TypeScript. I build tools that solve real problems, from peer-to-peer tutoring platforms to voice-native macOS automation.",
  short: "I build full-stack web apps and tools with React, Next.js, and TypeScript.",
  now: "Currently shipping Guru and Koda.",
  coursework: [
    "Object Oriented Programming",
    "Data Structures & Algorithms",
    "Databases and Data Modeling",
    "Foundations of Data Science",
    "Information Assurance and Cybersecurity",
    "Client-Side Development",
  ],
} as const;

export interface PrototypeProject {
  id: string;
  title: string;
  oneLiner: string;
  description: string;
  image: string;
  url: string;
  displayUrl: string;
  context: string;
  period?: string;
  stack: string[];
  highlights: string[];
}

export const prototypeProjects: PrototypeProject[] = [
  {
    id: "koda",
    title: "Koda",
    oneLiner: "An on-device voice agent that turns natural speech into instant macOS actions.",
    description:
      "Koda runs on your Mac and turns what you say into instant macOS actions. Speak, and it is done.",
    image: "/projects/Koda.png",
    url: "https://koda-sigma-six.vercel.app/",
    displayUrl: "koda-sigma-six.vercel.app",
    context: "Voice AI",
    stack: ["Swift", "Rust", "LLM", "macOS"],
    highlights: ["Runs on-device", "Natural speech to macOS actions"],
  },
  {
    id: "guru",
    title: "Guru",
    oneLiner: "Peer-to-peer tutoring that connects UW student tutors with learners.",
    description:
      "A tutoring marketplace for UW students: flexible 1-on-1 help across STEM, rock climbing, and more, with smart matching, messaging, and scheduling.",
    image: "/projects/guru.png",
    url: "https://guruappp.netlify.app",
    displayUrl: "guruappp.netlify.app",
    context: "WINFO Hackathon 26",
    period: "Jan 2026 - Present",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    highlights: ["15+ views, including dashboards, messaging, and scheduling", "Instant tutor search and filtering"],
  },
  {
    id: "huskybids",
    title: "HuskyBids",
    oneLiner: "Sports betting with virtual currency, built for UW Husky fans.",
    description:
      "A serverless Next.js platform where students bet virtual currency on Husky games, with real-time data and a transactional engine that keeps balances and odds in sync.",
    image: "/projects/huskybids.png",
    url: "https://huskybids.me",
    displayUrl: "huskybids.me",
    context: "Husky Coding Project",
    period: "Oct 2024 - 2025",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    highlights: ["16+ RESTful endpoints", "Balances and odds update together"],
  },
  {
    id: "commit",
    title: "Commit",
    oneLiner: "Accountability for remote teams: transparent commitments and deliverable tracking.",
    description:
      "A team accountability platform for remote teams with transparent commitments and deliverables tracking.",
    image: "/projects/commit.png",
    url: "https://commitapp.netlify.app",
    displayUrl: "commitapp.netlify.app",
    context: "Claude Builder Hackathon",
    stack: ["Next.js", "TypeScript"],
    highlights: ["Transparent commitments", "Deliverables tracking"],
  },
  {
    id: "care-gap",
    title: "Care Gap Risk Assessment",
    oneLiner: "Ranks US healthcare access gaps across 76 demographic subgroups.",
    description:
      "An analysis of the 2024 National Health Interview Survey Access to Care data that identifies, quantifies, and ranks healthcare access disparities across 76 US demographic subgroups.",
    image: "/projects/care-gap-risk-assessment.png",
    url: "https://care-gap-risk-assessment.netlify.app",
    displayUrl: "care-gap-risk-assessment.netlify.app",
    context: "DubsTech Datathon 2026",
    stack: ["Python", "Pandas", "Next.js", "Recharts", "Tailwind CSS"],
    highlights: ["NHIS 2024 Access to Care dataset", "76 subgroups scored and ranked"],
  },
];

export interface PrototypeSkillGroup {
  label: string;
  skills: string[];
}

export const prototypeSkillGroups: PrototypeSkillGroup[] = [
  { label: "Languages", skills: ["TypeScript", "JavaScript", "Python", "Java", "HTML/CSS"] },
  { label: "Frontend", skills: ["React", "Next.js", "Vite", "Tailwind CSS"] },
  { label: "Backend & data", skills: ["Node.js", "MongoDB", "RESTful APIs", "WebSockets"] },
  { label: "Tools", skills: ["Git/GitHub", "CI/CD", "OpenAI API", "IndexedDB"] },
];

export interface PrototypeActivity {
  title: string;
  role: string;
  period: string;
  detail: string;
}

export const prototypeActivities: PrototypeActivity[] = [
  {
    title: "Software Engineering Career Club (SWECC)",
    role: "Member",
    period: "2024 - Present",
    detail: "Coding challenges, mock interviews, and peer mentorship at UW.",
  },
  {
    title: "Claude Builder Club",
    role: "Member",
    period: "2025 - Present",
    detail: "Building and testing AI-powered apps with Anthropic's Claude API, plus code reviews with peers.",
  },
];

/** Logo files in /public/prototype-icons (from Simple Icons). */
export const prototypeTechLogos: { name: string; slug: string }[] = [
  { name: "TypeScript", slug: "typescript" },
  { name: "React", slug: "react" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "JavaScript", slug: "javascript" },
  { name: "Python", slug: "python" },
  { name: "Java", slug: "openjdk" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "Swift", slug: "swift" },
  { name: "Rust", slug: "rust" },
  { name: "Vite", slug: "vite" },
  { name: "Git", slug: "git" },
  { name: "HTML5", slug: "html5" },
  { name: "CSS", slug: "css" },
];

export const prototypeLinks = [
  { label: "Email", href: prototypeProfile.emailHref, value: prototypeProfile.email },
  { label: "LinkedIn", href: prototypeProfile.linkedin, value: `in/${prototypeProfile.linkedinHandle}` },
  { label: "GitHub", href: prototypeProfile.github, value: `@${prototypeProfile.githubHandle}` },
] as const;

export function prototypeIsExternal(href: string) {
  return href.startsWith("http");
}
