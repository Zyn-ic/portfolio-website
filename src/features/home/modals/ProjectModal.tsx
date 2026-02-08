"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, ExternalLink, Github, X } from "lucide-react";
import type { Project } from "../types";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-md p-4 sm:p-6 md:p-10">
      <div className="w-full max-w-5xl max-h-[90vh] bg-card border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-border flex justify-between items-center bg-card z-20">
          <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden shrink-0">
                  <img
                    src={project.icon}
                    alt={`${project.title} icon`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjNDQ0Ii8+CjxyZWN0IHg9IjgiIHk9IjgiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0iIzY2NiIvPgo8L3N2Zz4K";
                }}
              />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold line-clamp-1">
                {project.title}
              </h3>
              <Badge variant="secondary" className="mt-1">
                {project.category}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-10 w-10 hover:bg-muted"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-10">
          {project.images && project.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.images.map((img) => (
                <div
                  key={img}
                  className="rounded-xl overflow-hidden border border-border bg-muted shadow-sm"
                >
                  <div className="aspect-[4/3] sm:aspect-[16/9] w-full">
                    <img
                      src={img}
                      alt={`${project.title} screenshot`}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.parentElement?.classList.add("hidden");
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-primary rounded-full" />
                  Description
                </h4>
                <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-wrap">
                  {project.longDescription || project.description}
                </p>
              </div>

              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <div>
                  <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-primary rounded-full" />
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.keyFeatures.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 text-muted-foreground border border-transparent hover:border-border transition-colors"
                      >
                        <Check className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                        <span className="text-sm md:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="space-y-8">
              <div className="p-6 rounded-xl bg-muted/30 border border-border">
                <h4 className="text-lg font-semibold mb-4">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="bg-background/50"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <Separator className="my-6" />

                <div className="space-y-3">
                  {project.githubUrl && (
                    <Button asChild className="w-full group" variant="default">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        View Source Code
                        <ExternalLink className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button asChild className="w-full group" variant="outline">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Preview / Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 border-t border-border flex justify-end bg-card z-20">
          <Button variant="secondary" size="lg" className="px-8" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
