"use client";

import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "../types";
import ProjectCard from "../components/ProjectCard";
import styles from "./ProjectsSection.module.css";

interface ProjectsSectionProps {
  projects: Project[];
  filteredProjects: Project[];
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onSelectProject: (project: Project) => void;
}

export default function ProjectsSection({
  projects,
  filteredProjects,
  categories,
  selectedCategory,
  onSelectCategory,
  onSelectProject,
}: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">My Projects</h2>

        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={onSelectProject}
              className={styles.projectCard}
            />
          ))}
        </div>

        {projects.length > 0 && filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
