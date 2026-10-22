/**
 * Project showcases, in display order. Facts come from each project's live
 * site, README, repository history (commit counts are non-merge commits), or
 * Devpost page. Each palette is sampled from the project's own site and kept
 * light enough that text on it stays AA.
 */
export interface ProjectPalette {
  /** Page background while the project is in view. */
  bg: string;
  /** Buttons, pills and rules. Passes 4.5:1 on `bg` and on white. */
  accent: string;
  /** Text on an accent fill. */
  onAccent: string;
  /** Highlight behind the key result. */
  highlight: string;
}

export interface ProjectVideo {
  /** Path without extension; `.webm` and `.mp4` sit next to `-poster.webp`. */
  src: string;
  label: string;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  /** Who it was for or what kind of project it is. */
  context: string;
  logo?: { src: string; alt: string; width: number; height: number };
  /** Hackathon or competition, shown as a pill above the title. */
  event?: { name: string; detail?: string; award?: string };
  /** The one result a reader should take away. */
  achievement?: string;
  summary: string;
  /** My contribution. */
  part?: string;
  team?: string;
  story: string;
  built: string[];
  stack: string[];
  /** The first link is the live site. */
  links: [ProjectLink, ...ProjectLink[]];
  urlLabel: string;
  desktop: ProjectVideo;
  phone?: ProjectVideo;
  demo?: { src: string; alt: string; caption: string; href: string };
  palette: ProjectPalette;
}

export const IUGA_LOGO = { src: "/projects/iuga/logo.png", alt: "IUGA logo", width: 192, height: 102 };

export const NEUTRAL_PALETTE: ProjectPalette = {
  bg: "#f4f4f2",
  accent: "#111111",
  onAccent: "#fafafa",
  highlight: "#d4ff3a",
};

export const PROJECTS: Project[] = [
  {
    id: "iuga",
    title: "IUGA Shop",
    context: "Informatics Undergraduate Association (IUGA), UW",
    logo: IUGA_LOGO,
    achievement: "I wrote 100% of the shop's code and most of the events pages.",
    summary:
      "The merch store and events pages on iuga.info, the website of the undergraduate student government for UW Informatics.",
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
    desktop: {
      src: "/projects/iuga/shop",
      label: "Browsing the IUGA Fall Collection, picking a crewneck size and adding it to the cart",
    },
    phone: {
      src: "/projects/iuga/events-mobile",
      label:
        "Finding the Oct 14 iStartup Lab workshop on the IUGA events agenda and opening its details on a phone",
    },
    palette: { bg: "#f0eef8", accent: "#4a2d8c", onAccent: "#f7f5fd", highlight: "#ddd3f7" },
  },
  {
    id: "fittingroom",
    title: "FittingRoom",
    context: "Hackathon project",
    event: { name: "DubHacks '26", detail: "Oct 17-18, 2026 · University of Washington, Seattle" },
    achievement: "Shipped a working Chrome extension and its landing site at DubHacks '26.",
    summary: "A Chrome extension that tells you what size to buy on any clothing store.",
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
    stack: ["JavaScript", "Chrome Manifest V3", "Node.js", "OpenRouter", "Ollama"],
    links: [
      { label: "Visit site", href: "https://myfittingroom.fit" },
      { label: "Devpost", href: "https://devpost.com/software/fittingroom-t0jm2f" },
      { label: "Repo", href: "https://github.com/Nathan-123/dubhacks2026project" },
    ],
    urlLabel: "myfittingroom.fit",
    desktop: {
      src: "/projects/fittingroom/site",
      label: "Scrolling the FittingRoom site from the hero to the four setup questions",
    },
    phone: { src: "/projects/fittingroom/site-mobile", label: "The FittingRoom site on a phone" },
    demo: {
      src: "/projects/fittingroom/devpost-demo.webp",
      alt: "FittingRoom's popup recommending size S on a store's product page",
      caption: "From our DubHacks '26 Devpost demo",
      href: "https://devpost.com/software/fittingroom-t0jm2f",
    },
    palette: { bg: "#f6eeeb", accent: "#7a2e1f", onAccent: "#fdf6f3", highlight: "#f5cbbd" },
  },
  {
    id: "care-gap",
    title: "Care Gap Risk Assessment",
    context: "Datathon project",
    event: { name: "DubsTech Datathon 2026", detail: "Data Analysis Track · Team 25", award: "5th place" },
    achievement: "Ranked 76 US demographic subgroups by how strongly cost keeps them from care.",
    summary:
      "Who is getting blocked from healthcare, and why? We answered with a risk score built from the 2024 National Health Interview Survey.",
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
    stack: ["Python", "Pandas", "Next.js", "Recharts", "Tailwind CSS"],
    links: [
      { label: "Visit site", href: "https://care-gap-risk-assessment.netlify.app" },
      { label: "Repo", href: "https://github.com/aghuge0206/dubstechdatathon26" },
    ],
    urlLabel: "care-gap-risk-assessment.netlify.app",
    desktop: {
      src: "/projects/care-gap/site",
      label: "Scrolling the Care Gap analysis to its ranked charts and filtering them",
    },
    palette: { bg: "#f8eeef", accent: "#a61b29", onAccent: "#fff5f6", highlight: "#f7c6cc" },
  },
  {
    id: "koda",
    title: "Koda",
    context: "Voice automation for macOS",
    achievement: "Runs on-device, on the Mac's Neural Engine, with no round trip to a data center.",
    summary:
      "Say what you mean in plain English. Koda works out the intent, chains the steps, and runs them in any app on your Mac.",
    part: "One of the two projects I'm shipping now, alongside Guru.",
    story:
      "Koda drives apps through the macOS Accessibility API, so an app doesn't need to support Koda for it to work. It's built around developer workflows, and custom commands let you chain actions into your own routines.",
    built: [
      "Turns one spoken request into a chain of macOS actions",
      "Controls any app through the Accessibility API, no app integration needed",
      "Voice workflows for developers: scaffold projects, manage git, control terminals, run builds",
      "Custom commands that chain actions into personal workflows",
    ],
    stack: ["Swift", "Rust", "LLM", "macOS"],
    links: [{ label: "Visit site", href: "https://koda-sigma-six.vercel.app/" }],
    urlLabel: "koda-sigma-six.vercel.app",
    desktop: { src: "/projects/koda/site", label: "Scrolling the Koda landing page" },
    palette: { bg: "#e9e9eb", accent: "#18181b", onAccent: "#fafafa", highlight: "#d4ff3a" },
  },
  {
    id: "guru",
    title: "Guru",
    context: "WINFO Hackathon 26, Jan 2026 to now",
    achievement: "15+ views, including dashboards, messaging, and scheduling.",
    summary: "Peer-to-peer tutoring that connects UW student tutors with learners.",
    story:
      "A tutoring marketplace for UW students: flexible 1-on-1 help across STEM, rock climbing, and more, with smart matching, messaging, and scheduling.",
    built: ["15+ views, including dashboards, messaging, and scheduling", "Instant tutor search and filtering"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    links: [{ label: "Visit site", href: "https://guruappp.netlify.app" }],
    urlLabel: "guruappp.netlify.app",
    desktop: { src: "/projects/guru/site", label: "Searching for Calculus on Guru and browsing tutors" },
    palette: { bg: "#eaf4f2", accent: "#0b6e64", onAccent: "#f2fbf9", highlight: "#bfe7df" },
  },
  {
    id: "commit",
    title: "Commit",
    context: "Hackathon project",
    event: { name: "Claude Builder Club Hackathon" },
    summary: "Accountability for remote teams: transparent commitments and deliverable tracking.",
    story: "A team accountability platform for remote teams with transparent commitments and deliverables tracking.",
    built: ["Transparent commitments", "Deliverables tracking"],
    stack: ["Next.js", "TypeScript"],
    links: [{ label: "Visit site", href: "https://commitapp.netlify.app" }],
    urlLabel: "commitapp.netlify.app",
    desktop: { src: "/projects/commit/site", label: "The Commit dashboard and its analytics view" },
    palette: { bg: "#fbefe8", accent: "#a8390b", onAccent: "#fff7f2", highlight: "#fbcfb6" },
  },
  {
    id: "huskybids",
    title: "HuskyBids",
    context: "Husky Coding Project, Oct 2024 to 2025",
    achievement: "16+ RESTful endpoints, with balances and odds updated together.",
    summary: "Sports betting with virtual currency, built for UW Husky fans.",
    story:
      "A serverless Next.js platform where students bet virtual currency on Husky games, with real-time data and a transactional engine that keeps balances and odds in sync.",
    built: ["16+ RESTful endpoints", "Balances and odds update together"],
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    links: [
      { label: "Visit site", href: "https://huskybids.me" },
      { label: "Repo", href: "https://github.com/Isaiahriveraa/HuskyBids" },
    ],
    urlLabel: "huskybids.me",
    desktop: { src: "/projects/huskybids/site", label: "Scrolling the HuskyBids landing page" },
    palette: { bg: "#f5f2e1", accent: "#6b5200", onAccent: "#fffbea", highlight: "#f1dd86" },
  },
];
