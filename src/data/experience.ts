import { IUGA_LOGO } from "@/lib/projects";

/**
 * Leadership role and clubs shown in About. Wording about IUGA comes from the
 * club's own website (iuga.info); the commit counts come from its repository.
 */
export const IUGA_ROLE = {
  title: "Director of IT",
  organization: "Informatics Undergraduate Association",
  acronym: "IUGA",
  site: "https://iuga.info",
  siteLabel: "iuga.info",
  logo: IUGA_LOGO,
} as const;

export interface Activity {
  title: string;
  role: string;
  period: string;
}

export const ACTIVITIES: Activity[] = [
  {
    title: "Software Engineering Career Club (SWECC)",
    role: "Member",
    period: "2024 - Present",
  },
  {
    title: "Claude Builder Club",
    role: "Member",
    period: "2025 - Present",
  },
];
