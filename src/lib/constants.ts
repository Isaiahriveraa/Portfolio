import { Github, Linkedin, Mail, type LucideIcon } from "lucide-react";

/**
 * Navigation items for the header.
 * Each item has a label and href for smooth scrolling to sections.
 */
export const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];

/**
 * Social media links with icons.
 * Used in Header, Footer, and SocialLinks components.
 */
export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/Isaiahriveraa",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yirivera/",
    icon: Linkedin,
  },
  {
    label: "Email",
    href: "mailto:yiriveraaa@gmail.com",
    icon: Mail,
  },
];

/**
 * Site metadata for consistent branding.
 */
export const SITE_CONFIG = {
  name: "Yonie Isaiah Rivera-Aguilar",
  title: "Software Engineer",
  email: "yiriveraaa@gmail.com",
  github: "Isaiahriveraa",
} as const;
