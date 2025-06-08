"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, ExternalLink, Mail, MapPin, ChevronDown, ChevronUp, Filter } from "lucide-react";
import Link from "next/link";

// Import data directly
import aboutData from "@/data/about.json";
import projectsData from "@/data/projects.json";

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
      setFilteredProjects(projects.filter(project => project.category === selectedCategory));
    }
  }, [selectedCategory, projects]);

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">{aboutData.name}</h1>
          <div className="flex gap-6">
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
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
                e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjMzMzIi8+CjxjaXJjbGUgY3g9IjY0IiBjeT0iNDQiIHI9IjE2IiBmaWxsPSIjNjY2Ii8+CjxwYXRoIGQ9Ik00MCA5NkM0MCA4NS4yIDUxLjIgNzYgNjQgNzZTODggODUuMiA4OCA5NiIgZmlsbD0iIzY2NiIvPgo8L3N2Zz4K";
              }}
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{aboutData.name}</h1>
          <h2 className="text-xl md:text-2xl text-muted-foreground mb-6">{aboutData.title}</h2>
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
            <MapPin className="h-4 w-4" />
            <span>{aboutData.location}</span>
          </div>
          <div className="flex justify-center gap-4">
            <Button asChild variant="default">
              <a href="#projects">View My Work</a>
            </Button>
            <Button asChild variant="outline">
              <a href={`mailto:${aboutData.email}`}>
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
                  {aboutExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-6">{aboutData.bio}</p>
              {aboutExpanded && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Experience</h4>
                    <p className="text-muted-foreground">{aboutData.experience} of professional development</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Skills & Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {aboutData.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button asChild variant="outline" size="sm">
                      <a href={aboutData.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <a href={aboutData.discord} target="_blank" rel="noopener noreferrer">
                        Discord
                      </a>
                    </Button>
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
                          e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjNDQ0Ii8+CjxyZWN0IHg9IjgiIHk9IjgiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0iIzY2NiIvPgo8L3N2Zz4K";
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
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Interested in working together? Let's discuss your project and see how I can help.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <a href={`mailto:${aboutData.email}`}>
                <Mail className="h-4 w-4 mr-2" />
                Email Me
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={aboutData.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 {aboutData.name}. Built with Next.js and deployed on GitHub Pages.</p>
        </div>
      </footer>
    </div>
  );
}
