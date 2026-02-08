import { SITE_CONFIG } from "@/lib/constants";
import { Container } from "./Container";
import { SocialLinks } from "@/components/common/SocialLinks";

/**
 * Footer with social links and copyright.
 * Serves as the main contact section.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-border py-12 bg-bg-secondary/30">
      <Container>
        <div className="flex flex-col items-center justify-center gap-6 text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground">Get in Touch</h2>
          <p className="text-text-muted max-w-md">
            I&apos;m currently open to new opportunities. Whether you have a question
            or just want to say hi, feel free to reach out!
          </p>
          <div className="mt-2">
            <SocialLinks iconSize={24} className="justify-center" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-text-muted">
            &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-sm text-text-muted">
            Built with Next.js, Tailwind, and Framer Motion
          </p>
        </div>
      </Container>
    </footer>
  );
}
