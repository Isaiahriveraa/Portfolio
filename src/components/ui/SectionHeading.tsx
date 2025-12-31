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
        "mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      {badge && (
        <Badge variant="primary" className="mb-4">
          {badge}
        </Badge>
      )}
      <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-text-muted">{subtitle}</p>
      )}
    </div>
  );
}
