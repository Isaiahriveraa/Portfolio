/**
 * Navigation items for the header. Each links to a section on the page.
 */
export const NAV_ITEMS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];

/**
 * Site-wide facts about Yonie, used across sections. Every value comes from
 * the résumé or a public profile; nothing here is a placeholder.
 */
export const SITE_CONFIG = {
  name: "Yonie Isaiah Rivera-Aguilar",
  shortName: "Yonie Rivera-Aguilar",
  title: "Software Engineer",
  location: "Seattle, WA",
  availability: "Open to internships and new-grad roles",
  photo: "/headshot.png",
  resume: "/resume.pdf",
  email: "yiriveraaa@gmail.com",
  emailHref: "mailto:yiriveraaa@gmail.com",
  github: "https://github.com/Isaiahriveraa",
  githubHandle: "Isaiahriveraa",
  linkedin: "https://www.linkedin.com/in/yirivera/",
} as const;

/**
 * Education shown in About.
 */
export const EDUCATION = {
  school: "University of Washington",
  degree: "B.S. Informatics",
  dates: "Sep 2024 - Dec 2027",
  classOf: "2027",
  gpa: "3.47",
} as const;
