import { prototypeProjects } from "./prototype-content";

/**
 * v13 showcase data. Facts come from the portfolio content, each project's live site,
 * its repo history (commit counts are non-merge commits), its README, or its Devpost
 * page. The IUGA shop share and the Care Gap placing were supplied by Yonie.
 * Palettes match v12; `mark` is the highlight behind key facts.
 */
export interface PrototypeV13Theme {
  bg: string;
  accent: string;
  onAccent: string;
  mark: string;
}

export interface PrototypeV13Video {
  src: string;
  poster: string;
  label: string;
}

export interface PrototypeV13Link {
  label: string;
  href: string;
}

export interface PrototypeV13Project {
  id: string;
  title: string;
  /** Who it was for or where it was built. */
  context: string;
  logo?: { src: string; alt: string; width: number; height: number };
  /** Hackathon or competition, shown as a prominent banner. */
  event?: { name: string; detail?: string; award?: string };
  /** The one result a reader should take away, highlighted. */
  achievement?: string;
  hook: string;
  /** My contribution, short. */
  part?: string;
  team?: string;
  story: string;
  built: string[];
  stack: string[];
  links: PrototypeV13Link[];
  urlLabel: string;
  desktop: PrototypeV13Video;
  phone?: PrototypeV13Video;
  media?: { src: string; alt: string; caption: string; href: string };
  theme: PrototypeV13Theme;
}

const video = (id: string, label: string): PrototypeV13Video => ({
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

export const prototypeV13Neutral: PrototypeV13Theme = {
  bg: "#f4f4f2",
  accent: "#111111",
  onAccent: "#fafafa",
  mark: "#d4ff3a",
};

export const prototypeV13Iuga = {
  name: "Informatics Undergraduate Association",
  short: "IUGA",
  role: "Director of IT",
  site: "https://iuga.info",
  logo: {
    src: "/prototype-v13/prototype-iuga-logo.png",
    alt: "IUGA logo",
    width: 192,
    height: 102,
  },
};

export const prototypeV13Projects: PrototypeV13Project[] = [
  {
    id: "iuga",
    title: "IUGA Shop",
    context: "Informatics Undergraduate Association (IUGA), UW",
    logo: prototypeV13Iuga.logo,
    achievement:
      "I wrote 100% of the shop's code and most of the events pages.",
    hook: "The merch store and events pages on iuga.info, the website of the undergraduate student government for UW Informatics.",
    part: "As IUGA's Director of IT: 249 of the repo's 616 commits, August to October 2026.",
    story:
      "Students buy IUGA's Fall Collection and find club events on the same site. I built the shop end to end, from the React storefront down to its Express and MongoDB API, and rebuilt the events page.",
    built: [
      "A storefront with size pickers and a cart that follows students across the site",
      "Venmo checkout holds with a countdown and per-student limits, backed by an Express and MongoDB API",
      "A week-by-week events agenda with day filters and a jump to the next event",
      "Event details and a photo viewer built on the browser's native dialog",
    ],
    stack: ["React", "Vite", "SCSS", "Express", "MongoDB"],
    links: [
      { label: "Visit site", href: "https://iuga.info" },
      { label: "Repo", href: "https://github.com/UW-IUGA/iuga-web-app" },
    ],
    urlLabel: "iuga.info/shop",
    desktop: video(
      "iuga-shop",
      "Browsing the IUGA Fall Collection, picking a crewneck size and adding it to the cart",
    ),
    phone: video(
      "iuga-events-mobile",
      "Finding the Oct 14 iStartup Lab workshop on the IUGA events agenda and opening its details on a phone",
    ),
    theme: {
      bg: "#f0eef8",
      accent: "#4a2d8c",
      onAccent: "#f7f5fd",
      mark: "#ddd3f7",
    },
  },
  {
    id: "fittingroom",
    title: "FittingRoom",
    context: "Hackathon project",
    event: {
      name: "DubHacks '26",
      detail: "Oct 17-18, 2026 · University of Washington, Seattle",
    },
    achievement:
      "Shipped a working Chrome extension and its landing site at DubHacks '26.",
    hook: "A Chrome extension that tells you what size to buy on any clothing store.",
    part: "21 of the repo's 23 commits are mine: the setup flow, the closet, review-platform extraction, and the landing site.",
    team: "Built with Nathan Adams and Akshat Ghuge.",
    story:
      "Pick a size on a product page and FittingRoom answers from the toolbar, without covering the store. A 30-second setup makes the advice yours, every step can be skipped, and your data stays in the browser.",
    built: [
      "Reads each page cheapest first: Shopify data, JSON-LD, review-platform fit stats, then the HTML",
      "Falls back to free AI models only when page data runs out, and drops any value that isn't on the page",
      "Keeps fit and confidence separate, so thin data says Best guess instead of a made-up score",
      "Counts down each order's return window, read from the store's own policy",
    ],
    stack: [
      "JavaScript",
      "Chrome Manifest V3",
      "Node.js",
      "OpenRouter",
      "Ollama",
    ],
    links: [
      { label: "Visit site", href: "https://myfittingroom.fit" },
      {
        label: "Devpost",
        href: "https://devpost.com/software/fittingroom-t0jm2f",
      },
      {
        label: "Repo",
        href: "https://github.com/Nathan-123/dubhacks2026project",
      },
    ],
    urlLabel: "myfittingroom.fit",
    desktop: video(
      "fittingroom",
      "Scrolling the FittingRoom site from the hero to the four setup questions",
    ),
    phone: video("fittingroom-mobile", "The FittingRoom site on a phone"),
    media: {
      src: "/prototype-v13/prototype-fittingroom-devpost.webp",
      alt: "FittingRoom's popup recommending size S on a store's product page",
      caption: "From our DubHacks '26 Devpost demo",
      href: "https://devpost.com/software/fittingroom-t0jm2f",
    },
    theme: {
      bg: "#f6eeeb",
      accent: "#7a2e1f",
      onAccent: "#fdf6f3",
      mark: "#f5cbbd",
    },
  },
  {
    id: "care-gap",
    title: careGap.title,
    context: "Datathon project",
    event: {
      name: "DubsTech Datathon 2026",
      detail: "Data Analysis Track · Team 25",
      award: "5th place",
    },
    achievement:
      "Ranked 76 US demographic subgroups by how strongly cost keeps them from care.",
    hook: "Who is getting blocked from healthcare, and why? We answered with a risk score built from the 2024 National Health Interview Survey.",
    part: "25 of the repo's 38 commits are mine: the Next.js site, its chart system, the ranking filters, and the written story. Akshat Ghuge prepared the dataset.",
    team: "Built with Akshat Ghuge.",
    story:
      "Built on the 2024 National Health Interview Survey Access to Care data. Our Care Gap Risk Score (0 to 3) combines unmet medical, mental health, and medication needs, each normalized and weighted equally.",
    built: [
      "A risk score that ranks all 76 subgroups on three cost-barrier indicators",
      "Bisexual (2.54) and uninsured (2.47) adults came out at the highest risk",
      "Interactive Recharts rankings with Top 10 and Bottom 5 filters",
      "A one-page site with our process, findings, and limitations",
    ],
    stack: careGap.stack,
    links: [
      { label: "Visit site", href: careGap.url },
      {
        label: "Repo",
        href: "https://github.com/aghuge0206/dubstechdatathon26",
      },
    ],
    urlLabel: careGap.displayUrl,
    desktop: video(
      "caregap",
      "Scrolling the Care Gap analysis to its ranked charts and filtering them",
    ),
    theme: {
      bg: "#f8eeef",
      accent: "#a61b29",
      onAccent: "#fff5f6",
      mark: "#f7c6cc",
    },
  },
  {
    id: "koda",
    title: koda.title,
    context: "Voice automation for macOS",
    achievement:
      "Runs on-device, on the Mac's Neural Engine, with no round trip to a data center.",
    hook: "Say what you mean in plain English. Koda works out the intent, chains the steps, and runs them in any app on your Mac.",
    part: "One of the two projects I'm shipping now, alongside Guru.",
    story:
      "Koda drives apps through the macOS Accessibility API, so an app doesn't need to support Koda for it to work. It's built around developer workflows, and custom commands let you chain actions into your own routines.",
    built: [
      "Turns one spoken request into a chain of macOS actions",
      "Controls any app through the Accessibility API, no app integration needed",
      "Voice workflows for developers: scaffold projects, manage git, control terminals, run builds",
      "Custom commands that chain actions into personal workflows",
    ],
    stack: koda.stack,
    links: [{ label: "Visit site", href: koda.url }],
    urlLabel: koda.displayUrl,
    desktop: video("koda", "Scrolling the Koda landing page"),
    theme: {
      bg: "#e9e9eb",
      accent: "#18181b",
      onAccent: "#fafafa",
      mark: "#d4ff3a",
    },
  },
  {
    id: "guru",
    title: guru.title,
    context: `${guru.context}, Jan 2026 to now`,
    achievement: "15+ views, including dashboards, messaging, and scheduling.",
    hook: guru.oneLiner,
    story: guru.description,
    built: guru.highlights,
    stack: guru.stack,
    links: [{ label: "Visit site", href: guru.url }],
    urlLabel: guru.displayUrl,
    desktop: video(
      "guru",
      "Searching for Calculus on Guru and browsing tutors",
    ),
    theme: {
      bg: "#eaf4f2",
      accent: "#0b6e64",
      onAccent: "#f2fbf9",
      mark: "#bfe7df",
    },
  },
  {
    id: "commit",
    title: commit.title,
    context: "Hackathon project",
    event: { name: "Claude Builder Club Hackathon" },
    hook: commit.oneLiner,
    story: commit.description,
    built: commit.highlights,
    stack: commit.stack,
    links: [{ label: "Visit site", href: commit.url }],
    urlLabel: commit.displayUrl,
    desktop: video("commit", "The Commit dashboard and its analytics view"),
    theme: {
      bg: "#fbefe8",
      accent: "#a8390b",
      onAccent: "#fff7f2",
      mark: "#fbcfb6",
    },
  },
  {
    id: "huskybids",
    title: huskybids.title,
    context: `${huskybids.context}, Oct 2024 to 2025`,
    achievement:
      "16+ RESTful endpoints, with balances and odds updated together.",
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
    theme: {
      bg: "#f5f2e1",
      accent: "#6b5200",
      onAccent: "#fffbea",
      mark: "#f1dd86",
    },
  },
];
