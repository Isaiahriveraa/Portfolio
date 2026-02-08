import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
}

export function Divider({ className }: DividerProps) {
  return (
    <div className={cn("mx-auto max-w-6xl px-5 py-2 sm:px-6", className)}>
      <div className="section-line" />
    </div>
  );
}
