import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "primary" | "outline";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-surface-elevated text-text-muted",
  primary: "bg-primary-muted text-primary",
  outline: "border border-border text-text-muted",
};

/**
 * Badge component for tech tags and labels.
 */
export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
