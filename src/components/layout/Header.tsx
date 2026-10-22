import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { Container } from "./Container";
import { PixelMonogram } from "@/components/ui/PixelMonogram";

/**
 * Sticky header: the site mark, section links, and a split pill that keeps
 * email and the résumé one click away on every screen size.
 */
export function Header() {
  return (
    <header className="page-header sticky top-0 z-30 border-b border-foreground/[0.07] backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5" aria-label={`${SITE_CONFIG.shortName}, back to top`}>
          <PixelMonogram />
          <span className="font-wide text-[15px] font-bold tracking-[-0.03em] sm:text-[17px]">
            {SITE_CONFIG.shortName.toLowerCase()}
          </span>
        </a>
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Primary">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className={`hidden rounded-full px-3 py-2 text-[14px] font-semibold text-text-secondary transition hover:bg-foreground/5 hover:text-foreground md:block ${
                i === NAV_ITEMS.length - 1 ? "mr-1" : ""
              }`}
            >
              {item.label}
            </a>
          ))}
          <div className="flex items-stretch overflow-hidden rounded-full border border-foreground/15 bg-surface shadow-[0_1px_2px_rgba(17,17,17,0.06)]">
            <a
              href={SITE_CONFIG.emailHref}
              className="flex items-center gap-2 px-3 py-2 text-[14px] font-semibold text-foreground transition-colors hover:bg-[#f4f4f2] sm:px-4"
            >
              <Mail size={16} strokeWidth={2} />
              <span className="sr-only sm:not-sr-only">Email me</span>
            </a>
            <a
              href={SITE_CONFIG.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="page-accent-fill group flex items-center gap-1.5 px-3 py-2 text-[14px] font-semibold transition-[filter] hover:brightness-110 sm:px-4"
            >
              <FileText size={16} strokeWidth={2} className="hidden sm:block" />
              Résumé
              <ArrowUpRight
                size={15}
                strokeWidth={2.25}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </nav>
      </Container>
    </header>
  );
}
