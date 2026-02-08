"use client";

import { Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import TimeDisplay from "../components/TimeDisplay";
import type { AboutData } from "../types";

interface HeroSectionProps {
  about: AboutData;
}

export default function HeroSection({ about }: HeroSectionProps) {
  return (
    <section className="pt-24 pb-12 md:pb-16 px-4">
      <div className="container mx-auto text-center animate-fade-in-up">
        <div className="w-32 h-32 rounded-full bg-muted mx-auto mb-6 overflow-hidden">
          <img
            src={about.profileImage}
            alt={about.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src =
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjMzMzIi8+CjxjaXJjbGUgY3g9IjY0IiBjeT0iNDQiIHI9IjE2IiBmaWxsPSIjNjY2Ii8+CjxwYXRoIGQ9Ik00MCA5NkM0MCA4NS4yIDUxLjIgNzYgNjQgNzZTODggODUuMiA4OCA5NiIgZmlsbD0iIzY2NiIvPgo8L3N2Zz4K";
            }}
          />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{about.name}</h1>
        <h2 className="text-xl md:text-2xl text-muted-foreground mb-6">
          {about.title}
        </h2>
        <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8 text-sm md:text-base flex-wrap">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0" />
            <span>{about.location}</span>
          </div>
          <TimeDisplay timeZone={about.timeZone} />
        </div>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button asChild variant="default" className="min-w-[10rem]">
            <a href="#projects">View My Work</a>
          </Button>
          <Button asChild variant="outline" className="min-w-[10rem]">
            <a href="#contact">
              <Mail className="h-4 w-4 mr-2" />
              Get In Touch
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
