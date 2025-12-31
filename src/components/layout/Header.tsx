"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { Container } from "./Container";
import { SocialLinks } from "@/components/common/SocialLinks";
import { cn } from "@/lib/utils";

/**
 * Fixed header with blur backdrop, navigation links, and mobile menu.
 */
export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Name */}
          <a
            href="#"
            className="text-lg font-semibold text-foreground transition-colors hover:text-primary"
          >
            {SITE_CONFIG.name.split(" ")[0]}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Social Links */}
          <div className="hidden md:block">
            <SocialLinks iconSize={18} />
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="p-2 text-text-muted transition-colors hover:text-foreground md:hidden"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-md transition-all duration-300 md:hidden",
          isMobileMenuOpen ? "max-h-96" : "max-h-0 border-t-0"
        )}
      >
        <Container>
          <nav className="flex flex-col gap-4 py-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={closeMobileMenu}
                className="text-base text-text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4">
              <SocialLinks iconSize={20} />
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}
