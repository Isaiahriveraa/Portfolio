import { SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
}

/**
 * Social media links with hover effects.
 * Renders GitHub, LinkedIn, and Email icons from constants.
 */
export function SocialLinks({ className, iconSize = 20 }: SocialLinksProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {SOCIAL_LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.href.startsWith("mailto:") ? undefined : "_blank"}
          rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          aria-label={link.label}
          className="text-text-muted transition-colors hover:text-primary"
        >
          <link.icon size={iconSize} />
        </a>
      ))}
    </div>
  );
}
