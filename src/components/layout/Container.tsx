import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * Max-width container with responsive padding.
 * Centers content and provides consistent horizontal spacing.
 */
export function Container({
  children,
  className,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component className={cn("mx-auto w-full max-w-[1240px] px-4 sm:px-6", className)}>
      {children}
    </Component>
  );
}
