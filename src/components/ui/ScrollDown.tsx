"use client";

import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollDownProps {
  href: string;
  className?: string;
}

export function ScrollDown({ href, className }: ScrollDownProps) {
  return (
    <div className={cn("flex justify-center w-full", className)}>
      <a
        href={href}
        aria-label={`Scroll to ${href.replace("#", "")} section`}
        className="relative z-20 inline-flex animate-bounce p-2 text-text-muted transition-colors hover:text-accent cursor-pointer"
      >
        <ArrowDown size={24} />
      </a>
    </div>
  );
}
