import { Badge } from "./Badge";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

/**
 * Section heading with optional badge and subtitle.
 * Used at the top of each portfolio section.
 */
export function SectionHeading({
  badge,
  title,
  subtitle,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-8 md:mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      {badge && (
        <Badge variant="primary" className="mb-3 sm:mb-4">
          {badge}
        </Badge>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text font-[family-name:var(--font-display)]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-text-muted">{subtitle}</p>
      )}
    </div>
  );
}
