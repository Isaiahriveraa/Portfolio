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

export function ProjectCard({ project, className }: ProjectCardProps) {
  const isPlaceholderLink = project.url === "#";

  return (
    <a
      href={project.url}
      target={isPlaceholderLink ? undefined : "_blank"}
      rel={isPlaceholderLink ? undefined : "noopener noreferrer"}
      onClick={isPlaceholderLink ? (e) => e.preventDefault() : undefined}
      className={cn("block flex-shrink-0", isPlaceholderLink && "cursor-default")}
    >
      <motion.div
        className={cn(
          "group relative flex flex-col w-[280px] sm:w-80 md:w-96 h-auto min-h-[400px] sm:h-[420px] overflow-hidden rounded-xl",
          "glass-card glass-card-hover",
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
          <div
            className={cn(
              "absolute inset-0",
              "bg-gradient-to-t from-background/80 via-background/20 to-transparent",
              "opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            )}
          />
          {!isPlaceholderLink && (
            <div
              className={cn(
                "absolute top-3 right-3",
                "flex items-center justify-center",
                "w-8 h-8 rounded-full",
                "bg-background/80 backdrop-blur-sm",
                "opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              )}
            >
              <ExternalLink className="w-4 h-4 text-accent" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-text-secondary mt-1 line-clamp-3">
            {project.description}
          </p>

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
      </motion.div>
    </a>
  );
}
