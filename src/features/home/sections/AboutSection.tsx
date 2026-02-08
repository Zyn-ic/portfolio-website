"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AboutData } from "../types";

interface AboutSectionProps {
  about: AboutData;
}

export default function AboutSection({ about }: AboutSectionProps) {
  const [aboutExpanded, setAboutExpanded] = useState(false);

  return (
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
            <p className="text-lg mb-6">{about.bio}</p>
            {aboutExpanded && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Experience</h4>
                  <p className="text-muted-foreground">
                    {about.experience} of professional development
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Skills & Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {about.skills.map((skill) => (
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
  );
}
