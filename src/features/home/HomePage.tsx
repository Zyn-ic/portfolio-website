"use client";

import { useEffect, useState } from "react";
import { useBackground } from "@/components/BackgroundProvider";
import type { AboutData, ContactItem, Project } from "./types";
import { useProjects } from "./hooks/useProjects";
import NavSection from "./sections/NavSection";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import ProjectsSection from "./sections/ProjectsSection";
import ContactSection from "./sections/ContactSection";
import FooterSection from "./sections/FooterSection";
import ProjectModal from "./modals/ProjectModal";
import ContactModal from "./modals/ContactModal";

interface HomePageProps {
  aboutData: AboutData;
  projectsData: Project[];
  contactData: ContactItem[];
}

export default function HomePage({
  aboutData,
  projectsData,
  contactData,
}: HomePageProps) {
  const { setPaused } = useBackground();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactModalContent, setContactModalContent] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const {
    projects,
    filteredProjects,
    categories,
    selectedCategory,
    setSelectedCategory,
  } = useProjects(projectsData);

  useEffect(() => {
    setPaused(!!selectedProject);
  }, [selectedProject, setPaused]);

  const handleContactAction = (actionType: string, actionValue: string) => {
    if (actionType === "link") {
      window.open(actionValue, "_blank");
      return;
    }

    if (actionType === "modal") {
      setContactModalContent(actionValue);
      setIsContactModalOpen(true);
      setIsCopied(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contactModalContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-transparent">
      <NavSection name={aboutData.name} />
      <HeroSection about={aboutData} />
      <AboutSection about={aboutData} />
      <ProjectsSection
        projects={projects}
        filteredProjects={filteredProjects}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onSelectProject={setSelectedProject}
      />
      <ContactSection
        contacts={contactData}
        onContactAction={handleContactAction}
      />
      <FooterSection name={aboutData.name} />

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      <ContactModal
        isOpen={isContactModalOpen}
        content={contactModalContent}
        isCopied={isCopied}
        onCopy={copyToClipboard}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
