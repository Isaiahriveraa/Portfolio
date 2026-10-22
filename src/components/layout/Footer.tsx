import { ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { Container } from "./Container";

const CONTACT_LINKS = [
  { label: "Résumé", href: SITE_CONFIG.resume },
  { label: "LinkedIn", href: SITE_CONFIG.linkedin },
  { label: "GitHub", href: SITE_CONFIG.github },
];

/**
 * The contact section: what I'm looking for, my email, and my profiles.
 */
export function Footer() {
  return (
    <Container as="footer" className="pb-10">
      <section id="contact" data-palette="neutral" aria-labelledby="contact-title">
        <div className="rounded-[16px] bg-highlight px-6 py-12 sm:px-12 sm:py-16">
          <h2
            id="contact-title"
            className="font-wide text-[60px] font-light leading-[0.95] tracking-[-0.05em] sm:text-[120px]"
          >
            let&apos;s <span className="font-bold">talk.</span>
          </h2>
          <p className="mt-5 max-w-[46ch] text-[18px] leading-[1.5] text-[#1f1f1f] sm:text-[20px]">
            I&apos;m looking for software engineering internships and new-grad roles.
          </p>
          <a
            href={SITE_CONFIG.emailHref}
            className="font-wide group mt-8 inline-flex items-center gap-3 border-b-2 border-foreground pb-1 text-[22px] font-bold tracking-[-0.03em] sm:text-[40px]"
          >
            {SITE_CONFIG.email}
            <ArrowUpRight className="h-6 w-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 sm:h-8 sm:w-8" />
          </a>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {CONTACT_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2.5 text-[14px] font-semibold text-[#f4f4f2] transition hover:bg-[#2a2a2a]"
              >
                {l.label}
                <ArrowUpRight
                  size={15}
                  strokeWidth={2.25}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-6 flex flex-col justify-between gap-2 font-mono text-[12px] text-text-muted sm:flex-row">
          <span>{SITE_CONFIG.name}</span>
          <span>{SITE_CONFIG.location}</span>
        </div>
      </section>
    </Container>
  );
}
