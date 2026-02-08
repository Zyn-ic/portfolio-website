"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "../types";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  className?: string;
}

export default function ProjectCard({
  project,
  onSelect,
  className,
}: ProjectCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
            <img
              src={project.icon}
              alt={`${project.title} icon`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjNDQ0Ii8+CjxyZWN0IHg9IjgiIHk9IjgiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0iIzY2NiIvPgo8L3N2Zz4K";
              }}
            />
          </div>
          <div>
            <CardTitle className="text-lg">{project.title}</CardTitle>
            <Badge variant="secondary" className="text-xs">
              {project.category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription className="text-sm">
          {project.description}
        </CardDescription>

        <div className="flex flex-wrap gap-1">
          {project.technologies.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{project.technologies.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          {project.githubUrl && (
            <Button asChild size="sm" variant="outline">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-3 w-3 mr-1" />
                Code
              </a>
            </Button>
          )}
          {project.liveUrl && (
            <Button asChild size="sm" variant="outline">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3 mr-1" />
                Live
              </a>
            </Button>
          )}
        </div>
        <Button
          className="w-full mt-2"
          variant="secondary"
          onClick={() => onSelect(project)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
