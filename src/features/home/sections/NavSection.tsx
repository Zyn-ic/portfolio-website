"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavSectionProps {
  name: string;
}

export default function NavSection({ name }: NavSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-card/70 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">{name}</h1>
        <div className="hidden sm:flex gap-6">
          <a href="#about" className="hover:text-primary transition-colors">
            About
          </a>
          <a href="#projects" className="hover:text-primary transition-colors">
            Projects
          </a>
          <a href="#contact" className="hover:text-primary transition-colors">
            Contact
          </a>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="sm:hidden h-10 w-10"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      {isOpen && (
        <div
          id="mobile-nav"
          className="sm:hidden border-t border-border bg-card/80 backdrop-blur-md animate-in fade-in slide-in-from-top-2"
        >
          <div className="container mx-auto px-4 py-3 flex flex-col gap-3">
            <a
              href="#about"
              className="hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a
              href="#projects"
              className="hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </a>
            <a
              href="#contact"
              className="hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
