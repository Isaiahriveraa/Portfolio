import { prototypeProjects } from "./prototype-content";

/**
 * v12 showcase data. Every fact comes from the portfolio content, the project's
 * live site, its public repo, or its Devpost page. Palettes are sampled from each
 * project's own screenshots and kept light so text stays AA.
 */
export interface PrototypeV12Theme {
  /** Page background while this project is in view. */
  bg: string;
  /** Accent for links, buttons, and highlights. Passes 4.5:1 on `bg` and on white. */
  accent: string;
  /** Text color on an accent fill. */
  onAccent: string;
}

export interface PrototypeV12Video {
  src: string;
  poster: string;
  label: string;
}

export interface PrototypeV12Link {
  label: string;
  href: string;
}

export interface PrototypeV12Project {
  id: string;
  title: string;
  meta: string;
  hook: string;
  story: string;
  built: string[];
  role?: string;
  team?: string;
  stack: string[];
  links: PrototypeV12Link[];
  urlLabel: string;
  desktop: PrototypeV12Video;
  phone?: PrototypeV12Video;
  theme: PrototypeV12Theme;
}

const video = (id: string, label: string): PrototypeV12Video => ({
  src: `/prototype-v12/prototype-${id}`,
  poster: `/prototype-v12/prototype-${id}-poster.webp`,
  label,
});

const byId = (id: string) => {
  const project = prototypeProjects.find((p) => p.id === id);
  if (!project) throw new Error(`Unknown prototype project ${id}`);
  return project;
};

const koda = byId("koda");
const guru = byId("guru");
const huskybids = byId("huskybids");
const commit = byId("commit");
const careGap = byId("care-gap");

export const prototypeV12Neutral: PrototypeV12Theme = { bg: "#f4f4f5", accent: "#18181b", onAccent: "#fafafa" };

export const prototypeV12Projects: PrototypeV12Project[] = [
  {
    id: "fittingroom",
    title: "FittingRoom",
    meta: "DubHacks '26",
    hook: "A Chrome extension that tells you what size to buy on any clothing store.",
    story:
      "Pick a size on a product page and FittingRoom answers from the toolbar, without covering the store. A 30-second setup makes the advice yours, every step can be skipped, and your data stays in the browser.",
    built: [
      "Reads each page cheapest first: Shopify data, JSON-LD, review-platform fit stats, then the HTML",
      "Falls back to free AI models only when page data runs out, and drops any value that isn't on the page",
      "Keeps fit and confidence separate, so thin data says Best guess instead of a made-up score",
      "Counts down each order's return window, read from the store's own policy",
    ],
    role: "21 of the repo's 23 non-merge commits are mine, including the setup flow, the closet, review-platform extraction, and the landing site.",
    team: "Built with Nathan Adams and Akshat Ghuge.",
    stack: ["JavaScript", "Chrome Manifest V3", "Node.js", "OpenRouter", "Ollama"],
    links: [
      { label: "Visit site", href: "https://myfittingroom.fit" },
      { label: "Devpost", href: "https://devpost.com/software/fittingroom-t0jm2f" },
      { label: "Repo", href: "https://github.com/Nathan-123/dubhacks2026project" },
    ],
    urlLabel: "myfittingroom.fit",
    desktop: video("fittingroom", "Scrolling the FittingRoom site from the hero to the four setup questions"),
    phone: video("fittingroom-mobile", "The FittingRoom site on a phone"),
    theme: { bg: "#f6eeeb", accent: "#7a2e1f", onAccent: "#fdf6f3" },
  },
  {
    id: "iuga",
    title: "IUGA shop and events",
    meta: "Informatics Undergraduate Association, UW",
    hook: "The merch shop and events pages of the club's website, live at iuga.info.",
    story:
      "I built the Fall Collection shop end to end and rebuilt the events page, from the React interface down to the shop's API.",
    built: [
      "A storefront with size pickers and a cart that follows students across the site",
      "Venmo checkout holds with a countdown and per-student limits, backed by an Express and MongoDB API",
      "A week-by-week events agenda with day filters and a jump to the next event",
      "Event details and a photo viewer built on the browser's native dialog",
    ],
    role: "249 commits to the club's repo between August and October 2026.",
    stack: ["React", "Vite", "SCSS", "Express", "MongoDB"],
    links: [
      { label: "Visit site", href: "https://iuga.info" },
      { label: "Repo", href: "https://github.com/UW-IUGA/iuga-web-app" },
    ],
    urlLabel: "iuga.info/shop",
    desktop: video("iuga-shop", "Browsing the IUGA Fall Collection, picking a crewneck size and adding it to the cart"),
    phone: video("iuga-events-mobile", "Finding the Oct 14 iStartup Lab workshop on the IUGA events agenda and opening its details on a phone"),
    theme: { bg: "#f0eef8", accent: "#4a2d8c", onAccent: "#f7f5fd" },
  },
  {
    id: "koda",
    title: koda.title,
    meta: koda.context,
    hook: koda.oneLiner,
    story: koda.description,
    built: koda.highlights,
    stack: koda.stack,
    links: [{ label: "Visit site", href: koda.url }],
    urlLabel: koda.displayUrl,
    desktop: video("koda", "Scrolling the Koda landing page"),
    theme: { bg: "#e9e9eb", accent: "#18181b", onAccent: "#fafafa" },
  },
  {
    id: "guru",
    title: guru.title,
    meta: `${guru.context}, ${guru.period}`,
    hook: guru.oneLiner,
    story: guru.description,
    built: guru.highlights,
    stack: guru.stack,
    links: [{ label: "Visit site", href: guru.url }],
    urlLabel: guru.displayUrl,
    desktop: video("guru", "Searching for Calculus on Guru and browsing tutors"),
    theme: { bg: "#eaf4f2", accent: "#0b6e64", onAccent: "#f2fbf9" },
  },
  {
    id: "commit",
    title: commit.title,
    meta: commit.context,
    hook: commit.oneLiner,
    story: commit.description,
    built: commit.highlights,
    stack: commit.stack,
    links: [{ label: "Visit site", href: commit.url }],
    urlLabel: commit.displayUrl,
    desktop: video("commit", "The Commit dashboard and its analytics view"),
    theme: { bg: "#fbefe8", accent: "#a8390b", onAccent: "#fff7f2" },
  },
  {
    id: "huskybids",
    title: huskybids.title,
    meta: `${huskybids.context}, ${huskybids.period}`,
    hook: huskybids.oneLiner,
    story: huskybids.description,
    built: huskybids.highlights,
    stack: huskybids.stack,
    links: [
      { label: "Visit site", href: huskybids.url },
      { label: "Repo", href: "https://github.com/Isaiahriveraa/HuskyBids" },
    ],
    urlLabel: huskybids.displayUrl,
    desktop: video("huskybids", "Scrolling the HuskyBids landing page"),
    theme: { bg: "#f5f2e1", accent: "#6b5200", onAccent: "#fffbea" },
  },
  {
    id: "care-gap",
    title: careGap.title,
    meta: careGap.context,
    hook: careGap.oneLiner,
    story: careGap.description,
    built: careGap.highlights,
    stack: careGap.stack,
    links: [
      { label: "Visit site", href: careGap.url },
      { label: "Repo", href: "https://github.com/aghuge0206/dubstechdatathon26" },
    ],
    urlLabel: careGap.displayUrl,
    desktop: video("caregap", "Scrolling the Care Gap analysis to its ranked charts and filtering them"),
    theme: { bg: "#f8eeef", accent: "#a61b29", onAccent: "#fff5f6" },
  },
];
