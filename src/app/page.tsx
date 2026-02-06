"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Github,
  ExternalLink,
  Mail,
  MapPin,
  ChevronDown,
  ChevronUp,
  Filter,
  MessageCircle,
  X,
  Copy,
  Check,
} from "lucide-react";
import Link from "next/link";

// Import data directly
import aboutData from "@/data/about.json";
import projectsData from "@/data/projects.json";
import contactData from "@/data/contact.json";

// Types
interface AboutData {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  github: string;
  discord: string;
  skills: string[];
  experience: string;
  profileImage: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  images: string[];
  technologies: string[];
  category: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  keyFeatures: string[];
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // Project Modal state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Initialize data
  useEffect(() => {
    setProjects(projectsData as Project[]);
    setFilteredProjects(projectsData as Project[]);
  }, []);

  // Filter projects by category
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.category === selectedCategory),
      );
    }
  }, [selectedCategory, projects]);

  // Get unique categories
  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];

  const handleContactAction = (actionType: string, actionValue: string) => {
    if (actionType === "link") {
      window.open(actionValue, "_blank");
    } else if (actionType === "modal") {
      setModalContent(actionValue);
      setIsModalOpen(true);
      setIsCopied(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(modalContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const DiscordIcon = () => (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3847-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0775-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0775.0105c.1201.099.246.1971.3718.2914a.077.077 0 01-.0066.1277 12.2986 12.2986 0 01-1.873.8923.076.076 0 00-.0416.1057c.3604.698.7719 1.3628 1.226 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.419-2.157 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />
    </svg>
  );

  const TwitterIcon = () => (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );

  const RobloxIcon = () => (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.505 19.147l-1.637 4.853L0 19.147 4.853 2.495 21.637 7.348l-3.132 11.799zM15.42 12.83l-1.125-3.882-3.882-1.125-1.125 3.882 3.882 1.125 1.125-3.882z" />
    </svg>
  );

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Github":
        return <Github className="w-5 h-5" />;
      case "Mail":
        return <Mail className="w-5 h-5" />;
      case "Discord":
        return <DiscordIcon />;
      case "Twitter":
        return <TwitterIcon />;
      case "Roblox":
        return <RobloxIcon />;
      default:
        return <Mail className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">{aboutData.name}</h1>
          <div className="flex gap-6">
            <a href="#about" className="hover:text-primary transition-colors">
              About
            </a>
            <a
              href="#projects"
              className="hover:text-primary transition-colors"
            >
              Projects
            </a>
            <a href="#contact" className="hover:text-primary transition-colors">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center animate-fade-in-up">
          <div className="w-32 h-32 rounded-full bg-muted mx-auto mb-6 overflow-hidden">
            <img
              src={aboutData.profileImage}
              alt={aboutData.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjMzMzIi8+CjxjaXJjbGUgY3g9IjY0IiBjeT0iNDQiIHI9IjE2IiBmaWxsPSIjNjY2Ii8+CjxwYXRoIGQ9Ik00MCA5NkM0MCA4NS4yIDUxLjIgNzYgNjQgNzZTODggODUuMiA4OCA5NiIgZmlsbD0iIzY2NiIvPgo8L3N2Zz4K";
              }}
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {aboutData.name}
          </h1>
          <h2 className="text-xl md:text-2xl text-muted-foreground mb-6">
            {aboutData.title}
          </h2>
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
            <MapPin className="h-4 w-4" />
            <span>{aboutData.location}</span>
          </div>
          <div className="flex justify-center gap-4">
            <Button asChild variant="default">
              <a href="#projects">View My Work</a>
            </Button>
            <Button asChild variant="outline">
              <a href="#contact">
                <Mail className="h-4 w-4 mr-2" />
                Get In Touch
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                About
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setAboutExpanded(!aboutExpanded)}
                >
                  {aboutExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-6">{aboutData.bio}</p>
              {aboutExpanded && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Experience</h4>
                    <p className="text-muted-foreground">
                      {aboutData.experience} of professional development
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">
                      Skills & Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {aboutData.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">My Projects</h2>

          {/* Category Filter */}
          <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
            <Filter className="h-4 w-4 text-muted-foreground" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="project-card overflow-hidden">
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
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-3 w-3 mr-1" />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button asChild size="sm" variant="outline">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Live
                        </a>
                      </Button>
                    )}
                  </div>
                  <Button
                    className="w-full mt-2"
                    variant="secondary"
                    onClick={() => setSelectedProject(project)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Get In Touch</h2>
          <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
            Interested in working together? Let's discuss your project and see
            how I can help.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contactData.map((contact) => (
              <Card
                key={contact.id}
                className="overflow-hidden hover:border-primary/50 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    {getIcon(contact.icon)}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{contact.title}</h3>
                  <p className="text-muted-foreground mb-6 min-h-[3rem]">
                    {contact.description}
                  </p>
                  <Button
                    className="w-full"
                    onClick={() =>
                      handleContactAction(
                        contact.actionType,
                        contact.actionValue,
                      )
                    }
                  >
                    {contact.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>
            &copy; 2024 {aboutData.name}. Built with Next.js and deployed on
            <i> netlify.app</i>
          </p>
        </div>
      </footer>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-md p-4 sm:p-6 md:p-10">
          <div className="w-full max-w-5xl max-h-[90vh] bg-card border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
            {/* Modal Header - Fixed */}
            <div className="p-6 border-b border-border flex justify-between items-center bg-card z-20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden shrink-0">
                  <img
                    src={selectedProject.icon}
                    alt={`${selectedProject.title} icon`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjNDQ0Ii8+CjxyZWN0IHg9IjgiIHk9IjgiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0iIzY2NiIvPgo8L3N2Zz4K";
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold line-clamp-1">
                    {selectedProject.title}
                  </h3>
                  <Badge variant="secondary" className="mt-1">
                    {selectedProject.category}
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-10 w-10 hover:bg-muted"
                onClick={() => setSelectedProject(null)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-10">
              {/* Image Gallery */}
              {selectedProject.images && selectedProject.images.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedProject.images.map((img) => (
                    <div
                      key={img}
                      className="rounded-xl overflow-hidden border border-border bg-muted shadow-sm group"
                    >
                      <img
                        src={img}
                        alt={`${selectedProject.title} screenshot`}
                        className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.parentElement?.classList.add(
                            "hidden",
                          );
                        }}
                      />
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
                      {selectedProject.longDescription ||
                        selectedProject.description}
                    </p>
                  </div>

                  {selectedProject.keyFeatures &&
                    selectedProject.keyFeatures.length > 0 && (
                      <div>
                        <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                          <div className="w-1.5 h-6 bg-primary rounded-full" />
                          Key Features
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {selectedProject.keyFeatures.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 text-muted-foreground border border-transparent hover:border-border transition-colors"
                            >
                              <Check className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                              <span className="text-sm md:text-base">
                                {feature}
                              </span>
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
                      {selectedProject.technologies.map((tech) => (
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
                      {selectedProject.githubUrl && (
                        <Button
                          asChild
                          className="w-full group"
                          variant="default"
                        >
                          <a
                            href={selectedProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4 mr-2" />
                            View Source Code
                            <ExternalLink className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        </Button>
                      )}
                      {selectedProject.liveUrl && (
                        <Button
                          asChild
                          className="w-full group"
                          variant="outline"
                        >
                          <a
                            href={selectedProject.liveUrl}
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

            {/* Modal Footer - Fixed */}
            <div className="p-4 md:p-6 border-t border-border flex justify-end bg-card z-20">
              <Button
                variant="secondary"
                size="lg"
                className="px-8"
                onClick={() => setSelectedProject(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Simple Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 bg-card border border-border rounded-lg shadow-lg m-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">User Tag</h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2 p-3 bg-muted rounded-md mb-6">
              <code className="flex-1 font-mono text-sm break-all">
                {modalContent}
              </code>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={copyToClipboard}
              >
                {isCopied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button className="w-full" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
