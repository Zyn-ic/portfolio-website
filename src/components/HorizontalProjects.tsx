"use client";
import { useRef, useEffect, useState } from "react";
import projectsData from "@/data/projects.json";
import ProjectCard from "@/components/ProjectCard";
import { ScissorsIcon } from "@/components/icons";

const NAV_HEIGHT = 52;
const CARD_GAP = 24;
const SCROLL_PER_CARD = 400;

function HorizontalProjects() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  const [viewportHeight, setViewportHeight] = useState(800);
  const [cardWidth, setCardWidth] = useState(420);
  const projectCount = projectsData.length;
  const totalHorizontalScroll = projectCount * SCROLL_PER_CARD;
  const totalCardsWidth = projectCount * cardWidth + (projectCount - 1) * CARD_GAP;

  useEffect(() => {
    const updateDimensions = () => {
      setViewportHeight(window.innerHeight);
      setCardWidth(Math.min(420, window.innerWidth - 60));
    };
    if (typeof window !== "undefined") updateDimensions();
    window.addEventListener("resize", updateDimensions, { passive: true });
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    let currentX = 0;
    let targetX = 0;
    let animationFrameId: number;

    const render = () => {
      currentX += (targetX - currentX) * 0.12;

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${currentX}px)`;
      }

      if (dotsRef.current) {
        const vw = window.innerWidth;
        const maxT = Math.max(1, totalCardsWidth - vw + 80);
        const cardProgress = (-currentX) / maxT;

        const dots = dotsRef.current.children;
        for (let i = 0; i < dots.length; i++) {
          const cardPos = i / Math.max(1, projectCount - 1);
          const isActive = Math.abs(cardProgress - cardPos) < 0.5 / projectCount;
          const dot = dots[i] as HTMLElement;
          dot.style.width = isActive ? "20px" : "6px";
          dot.style.background = isActive ? "var(--pc-accent)" : "var(--pc-border-strong)";
        }
      }

      if (Math.abs(targetX - currentX) > 0.05) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const handleScroll = () => {
      const outer = outerRef.current;
      if (!outer) return;

      const rect = outer.getBoundingClientRect();
      const scrollInto = -rect.top + NAV_HEIGHT;
      const progress = Math.max(0, Math.min(1, scrollInto / totalHorizontalScroll));

      if (titleRef.current) {
        if (rect.top < window.innerHeight * 0.8) {
          titleRef.current.style.opacity = "1";
          titleRef.current.style.transform = "translateY(0)";
        }
      }

      const vw = window.innerWidth;
      const maxTranslate = Math.max(0, totalCardsWidth - vw + 80);
      targetX = -progress * maxTranslate;

      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [totalHorizontalScroll, totalCardsWidth, projectCount]);

  return (
    <div
      ref={outerRef}
      id="projects"
      style={{
        height: `${totalHorizontalScroll + viewportHeight}px`,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: NAV_HEIGHT,
          height: `calc(100vh - ${NAV_HEIGHT}px)`,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          ref={titleRef}
          style={{
            padding: "2rem 2rem 1.5rem",
            maxWidth: "900px",
            opacity: 0,
            transform: "translateY(20px)",
            transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <h2 className="paper-section-title"><ScissorsIcon /> My Work</h2>
        </div>

        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: `${CARD_GAP}px`,
            paddingLeft: "40px",
            paddingRight: "40px",
            alignItems: "flex-start",
            flex: 1,
            paddingBottom: "2rem",
            willChange: "transform",
          }}
        >
          {projectsData.map((p, i) => (
            <div
              key={p.id}
              style={{
                flex: `0 0 ${cardWidth}px`,
                width: `${cardWidth}px`,
                transform: `rotate(${i % 2 === 0 ? -0.5 : 0.3}deg)`,
              }}
            >
              <ProjectCard project={p} />
            </div>
          ))}
        </div>

        <div
          ref={dotsRef}
          style={{
            display: "flex", justifyContent: "center", gap: "6px",
            padding: "0.75rem 0 1.25rem",
          }}
        >
          {projectsData.map((_, i) => (
            <div
              key={i}
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "3px",
                background: "var(--pc-border-strong)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HorizontalProjects;
