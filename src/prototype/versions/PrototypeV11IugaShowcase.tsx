"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { prototypeEase, PrototypeReveal } from "../prototype-shared";

const mono = "font-[family-name:var(--prototype-geist-mono)]";
const lime = "#d4ff3a";

/* Facts below come from the UW-IUGA/iuga-web-app repository (code, docs, git history) and iuga.info. */
const prototypeIugaPages = {
  shop: {
    label: "Shop",
    path: "iuga.info/shop",
    desktop: { src: "/prototype-iuga/prototype-live-shop-desktop.webp", alt: "IUGA shop: the Fall Collection with hoodie, crewneck and baseball tee cards showing prices, size pickers and Add to cart" },
    phone: { src: "/prototype-iuga/prototype-live-shop-mobile-added.webp", alt: "IUGA shop on a phone with a hoodie in the cart and the size picker below" },
    points: [
      "A storefront for the Fall Collection with a rotating product hero and size pickers",
      "A cart that follows students across the whole site, with per-student limits counted across sizes",
      "Venmo checkout holds with a countdown, backed by an Express and MongoDB API",
      "Officer controls to pause checkout, plus a maintenance countdown for anyone with a cart",
    ],
  },
  events: {
    label: "Events",
    path: "iuga.info/events",
    desktop: { src: "/prototype-iuga/prototype-live-events-desktop.webp", alt: "IUGA events page with a photo collage hero and a week-by-week agenda" },
    phone: { src: "/prototype-iuga/prototype-live-events-mobile-dialog.webp", alt: "IUGA event details dialog on a phone with an RSVP button" },
    points: [
      "A week-at-a-glance agenda with day filters and a jump to the next event",
      "Event details and RSVP in an accessible native dialog",
      "Past events with photo sets and a full-screen photo viewer",
      "A hero collage drawn from photos of past events",
    ],
  },
} as const;

type PrototypeIugaPage = keyof typeof prototypeIugaPages;

const prototypeIugaStack = ["React", "Vite", "SCSS", "Express", "MongoDB", "Azure AD sign-in"];

export function PrototypeV11IugaShowcase() {
  const [page, setPage] = useState<PrototypeIugaPage>("shop");
  const reduce = useReducedMotion();
  const current = prototypeIugaPages[page];
  const fade = reduce
    ? { initial: false as const, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0 } }
    : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -6 }, transition: { duration: 0.45, ease: prototypeEase } };

  return (
    <PrototypeReveal>
      <article className="mt-12 overflow-hidden rounded-[24px] border-2 border-[#121212] bg-[#121212] text-white shadow-[6px_6px_0_#121212]" aria-labelledby="prototype-iuga-title">
        <div className="grid grid-cols-1 gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12 lg:p-10">
          <div className="flex flex-col">
            <span className={`${mono} inline-flex w-fit items-center gap-2 rounded-full px-2.5 py-1 text-[11.5px] font-medium text-[#121212]`} style={{ background: lime }}>
              <span className="grid grid-cols-2 gap-[2px]" aria-hidden>
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className={`h-[4px] w-[4px] rounded-[1px] ${i === 1 ? "bg-[#121212]/30" : "bg-[#121212]"}`} />
                ))}
              </span>
              Featured build
            </span>
            <p className={`${mono} mt-6 text-[12.5px] text-white/60`}>Informatics Undergraduate Association, UW</p>
            <h3 id="prototype-iuga-title" className="mt-2 text-[34px] font-bold leading-[1.02] tracking-[-0.035em] [font-stretch:108%] sm:text-[44px]">
              The shop and events pages behind iuga.info
            </h3>
            <p className="mt-4 max-w-[48ch] text-[16px] leading-relaxed text-white/75">
              I built the merch store and the events experience for UW&apos;s Informatics club website, from the React interface down to the shop&apos;s API.
            </p>
            <p className={`${mono} mt-4 text-[12.5px] text-white/60`}>
              <span className="text-[#d4ff3a]">249 commits</span> to the club&apos;s repo, Aug to Oct 2026
            </p>

            <div className="mt-7 inline-flex w-fit rounded-full border border-white/15 bg-white/5 p-1" role="tablist" aria-label="IUGA pages">
              {(Object.keys(prototypeIugaPages) as PrototypeIugaPage[]).map((key) => {
                const on = key === page;
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls="prototype-iuga-panel"
                    onClick={() => setPage(key)}
                    className={`relative rounded-full px-5 py-2 text-[14px] font-semibold transition-colors ${on ? "text-[#121212]" : "text-white/70 hover:text-white"}`}
                  >
                    {on && (
                      <motion.span layoutId="prototype-iuga-tab" className="absolute inset-0 rounded-full" style={{ background: lime }} transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }} />
                    )}
                    <span className="relative">{prototypeIugaPages[key].label}</span>
                  </button>
                );
              })}
            </div>

            <div id="prototype-iuga-panel" role="tabpanel" className="mt-6 min-h-[188px]">
              <AnimatePresence mode="wait">
                <motion.ul key={page} {...fade} className="space-y-3">
                  {current.points.map((point) => (
                    <li key={point} className="flex gap-3 text-[15px] leading-snug text-white/90">
                      <span className="mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px]" style={{ background: lime }}>
                        <Check size={11} strokeWidth={3.5} className="text-[#121212]" />
                      </span>
                      {point}
                    </li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {prototypeIugaStack.map((s) => (
                <span key={s} className={`${mono} rounded-[4px] border border-white/15 px-2 py-1 text-[12px] text-white/80`}>
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 lg:mt-auto lg:pt-8">
              <a
                href="https://iuga.info"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[14px] font-semibold text-[#121212] transition hover:brightness-95"
                style={{ background: lime }}
              >
                Visit iuga.info
                <ArrowUpRight size={15} strokeWidth={2.5} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="https://github.com/UW-IUGA/iuga-web-app"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 rounded-full border border-white/25 px-4 py-2.5 text-[14px] font-semibold transition hover:border-white hover:bg-white hover:text-[#121212]"
              >
                View the repo
                <ArrowUpRight size={15} strokeWidth={2.5} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          <div className="relative order-first pb-10 sm:pb-16 lg:order-none lg:pb-12 lg:pt-2">
            <div className="overflow-hidden rounded-[14px] border border-white/15 bg-[#1e1e1e] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
              <div className="flex items-center gap-3 border-b border-white/10 px-3.5 py-2.5">
                <span className="flex gap-1.5" aria-hidden>
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                </span>
                <span className={`${mono} flex-1 truncate rounded-md bg-white/[0.07] px-3 py-1 text-center text-[11.5px] text-white/65`}>{current.path}</span>
              </div>
              <div className="relative aspect-[1440/900] bg-white">
                <AnimatePresence initial={false}>
                  <motion.div key={page} className="absolute inset-0" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.5 }}>
                    <Image src={current.desktop.src} alt={current.desktop.alt} fill sizes="(min-width: 1024px) 680px, 100vw" className="object-cover object-top" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <motion.div
              className="absolute -bottom-2 right-3 w-[30%] min-w-[104px] max-w-[190px] sm:right-6 lg:-bottom-4 lg:-right-3"
              whileHover={reduce ? undefined : { y: -6, rotate: -1.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <div className="rounded-[26px] border-[5px] border-[#2b2b2b] bg-[#2b2b2b] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.7)] ring-1 ring-white/15 sm:rounded-[30px] sm:border-[6px]">
                <div className="relative aspect-[390/844] overflow-hidden rounded-[21px] bg-white sm:rounded-[24px]">
                  <AnimatePresence initial={false}>
                    <motion.div key={page} className="absolute inset-0" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.08 }}>
                      <Image src={current.phone.src} alt={current.phone.alt} fill sizes="190px" className="object-cover object-top" />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </article>
    </PrototypeReveal>
  );
}
