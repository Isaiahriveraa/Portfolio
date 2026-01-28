"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

/**
 * Project card with hover effects (lift, glow, image zoom).
 * Links to the live project URL.
 */
export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block flex-shrink-0"
    >
      <motion.div
        className={cn(
          "group relative flex flex-col w-[280px] sm:w-80 h-[400px] overflow-hidden rounded-xl",
          "bg-surface border border-border",
          "transition-colors duration-300",
          "hover:border-primary/50",
          className
        )}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {/* Image container */}
        <div className="relative h-48 w-full flex-shrink-0 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Gradient overlay on hover */}
          <div
            className={cn(
              "absolute inset-0",
              "bg-gradient-to-t from-background/80 via-background/20 to-transparent",
              "opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            )}
          />
          {/* External link icon */}
          <div
            className={cn(
              "absolute top-3 right-3",
              "flex items-center justify-center",
              "w-8 h-8 rounded-full",
              "bg-background/80 backdrop-blur-sm",
              "opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            )}
          >
            <ExternalLink className="w-4 h-4 text-primary" />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-text-muted mt-1 line-clamp-3">
            {project.description}
          </p>

          {/* Tags - Pushed to bottom */}
          <div className="mt-auto pt-4 flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 4 && (
              <Badge variant="outline">+{project.tags.length - 4}</Badge>
            )}
          </div>
        </div>

        {/* Glow effect behind card */}
        <div
          className={cn(
            "absolute -inset-px rounded-xl -z-10",
            "bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0",
            "opacity-0 blur-sm transition-opacity duration-300",
            "group-hover:opacity-100"
          )}
        />
      </motion.div>
    </a>
  );
}
