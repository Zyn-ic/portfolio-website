import { useEffect, useMemo, useState } from "react";
import type { Project } from "../types";

export function useProjects(projectsData: Project[]) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    setProjects(projectsData ?? []);
    setFilteredProjects(projectsData ?? []);
  }, [projectsData]);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(projects);
      return;
    }

    setFilteredProjects(
      projects.filter((project) => project.category === selectedCategory),
    );
  }, [selectedCategory, projects]);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects],
  );

  return {
    projects,
    filteredProjects,
    categories,
    selectedCategory,
    setSelectedCategory,
  };
}
