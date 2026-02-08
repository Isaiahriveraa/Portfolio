import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href: string;
}

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "btn-primary text-accent-light rounded-lg",
  secondary: "btn-secondary text-foreground rounded-lg",
  outline:
    "border border-accent/30 text-accent hover:bg-accent/10 hover:text-accent-light",
  ghost: "text-text-secondary hover:text-foreground hover:bg-glass",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

/**
 * Button component with multiple variants and sizes.
 */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * Link styled as a button for navigation.
 * Uses native <a> for hash links, Next.js Link for page navigation.
 */
export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: ButtonLinkProps) {
  const styles = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

  // Use native anchor for hash links (same-page scrolling)
  if (href.startsWith("#")) {
    return (
      <a href={href} className={styles} {...props}>
        {children}
      </a>
    );
  }

  // Use Next.js Link for page navigation
  return (
    <Link href={href} className={styles} {...props}>
      {children}
    </Link>
  );
}
