import { SITE_CONFIG } from "@/lib/constants";
import { Container } from "./Container";
import { SocialLinks } from "@/components/common/SocialLinks";

/**
 * Footer with social links and copyright.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-text-muted">
            &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <SocialLinks iconSize={18} />
        </div>
      </Container>
    </footer>
  );
}
