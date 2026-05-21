"use client";

import { useRef, useEffect, useState, useCallback, type ReactNode } from "react";
import aboutData from "@/data/about.json";
import projectsData from "@/data/projects.json";
import contactData from "@/data/contact.json";

/* ═══════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════ */

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({ children, delay = 0, rotate = 0 }: { children: ReactNode; delay?: number; rotate?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? `translateY(0) rotate(${rotate}deg)` : `translateY(30px) rotate(${rotate + 2}deg)`,
      transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   FAST SMOOTH SCROLL (for nav clicks)
   ═══════════════════════════════════════════════════ */

function fastScrollTo(targetY: number, duration = 600) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  const startTime = performance.now();

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // easeInOutCubic
    const ease = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    window.scrollTo(0, startY + diff * ease);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ═══════════════════════════════════════════════════
   ANIMATED SVG ICONS
   ═══════════════════════════════════════════════════ */

function PencilIcon() {
  return (
    <svg className="pc-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g className="pc-icon-pencil">
        <path d="M6 26l1.5-5.5L22 6l4 4L11.5 24.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M7.5 20.5l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M6 26l1-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path className="pc-icon-write" d="M10 28h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="14" strokeDashoffset="14" />
      </g>
    </svg>
  );
}

function CoffeeIcon() {
  return (
    <svg className="pc-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g className="pc-icon-coffee">
        <path d="M6 14h16v10a4 4 0 01-4 4h-8a4 4 0 01-4-4V14z" stroke="currentColor" strokeWidth="1.8" fill="none" />
        <path d="M22 16h2a3 3 0 010 6h-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path className="pc-icon-steam pc-icon-steam-1" d="M10 10c0-2 2-2 2-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path className="pc-icon-steam pc-icon-steam-2" d="M14 10c0-2 2-2 2-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path className="pc-icon-steam pc-icon-steam-3" d="M18 10c0-2 2-2 2-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

function ScissorsIcon() {
  return (
    <svg className="pc-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g className="pc-icon-scissors">
        <circle cx="9" cy="23" r="3.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
        <circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
        <path className="pc-icon-blade" d="M12 11l14 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path className="pc-icon-blade" d="M12 21l14-14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg className="pc-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        className="pc-icon-heart"
        d="M16 28S4 20 4 12a6 6 0 0112 0 6 6 0 0112 0c0 8-12 16-12 16z"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="pc-icon pc-icon--small" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <line className="pc-icon-clock-hour" x1="16" y1="16" x2="16" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line className="pc-icon-clock-min" x1="16" y1="16" x2="22" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="16" r="1.5" fill="currentColor" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg className="pc-icon pc-icon--small" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g className="pc-icon-pin">
        <path d="M16 3C10.5 3 6 7.5 6 13c0 7 10 16 10 16s10-9 10-16c0-5.5-4.5-10-10-10z" stroke="currentColor" strokeWidth="1.8" fill="none" />
        <circle cx="16" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
      </g>
    </svg>
  );
}

function MailIcon({ className = "pc-icon pc-icon--small" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g className="pc-icon-mail">
        <rect x="4" y="7" width="24" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none" />
        <path className="pc-icon-mail-flap" d="M4 9l12 8 12-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  );
}

function HeroMailCard({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      className={`paper-hero-info-card ${copied ? "paper-hero-info-card--copied" : ""}`}
      onClick={handleCopy}
      title="Copy email"
    >
      {copied ? <CheckIcon className="pc-icon--tiny" /> : <MailIcon />} 
      <span style={{ marginLeft: "0.25rem" }}>{copied ? "Copied!" : email}</span>
    </button>
  );
}

function CopyIcon({ className = "pc-icon" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon({ className = "pc-icon" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className={`pc-copy-button ${copied ? "pc-copy-button--copied" : ""}`}
      title="Copy to clipboard"
    >
      <span className="pc-copy-text" style={{ marginRight: "0.4rem" }}>{text}</span>
      {copied ? <CheckIcon className="pc-icon--tiny" /> : <CopyIcon className="pc-icon--tiny" />}
    </button>
  );
}

/* ═══════════════════════════════════════════════════
   EXPANDABLE PROJECT CARD
   ═══════════════════════════════════════════════════ */

function ProjectCard({ project, index }: { project: typeof projectsData[0]; index: number }) {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  return (
    <div className="pc-project-card">
      <div className="pc-project-card-header">
        <div className="pc-project-card-top">
          <h3>{project.title}</h3>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {project.featured && <span className="pc-project-card-featured">★ featured</span>}
          </div>
        </div>
        <p className="pc-project-card-desc">{project.description}</p>
        <div className="pc-project-card-techs">
          {project.technologies.map((t) => <span key={t} className="pc-project-card-tech">{t}</span>)}
        </div>
      </div>

      <div className="pc-project-detail-wrapper">
        <div className="pc-project-detail-inner">
          <div className="pc-project-detail-divider" />
          <p className="pc-project-detail-long">{project.longDescription}</p>

          {project.keyFeatures.length > 0 && (
            <div className="pc-project-detail-features">
              <h4>Key Features</h4>
              <ul>
                {project.keyFeatures.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {project.images.length > 0 && (
            <div className="pc-project-detail-media">
              <h4>Gallery</h4>
              <div className="pc-project-detail-media-grid">
                {project.images.map((img, i) => (
                  <div key={i} className="pc-project-media-item">
                    <img
                      src={img}
                      alt={`${project.title} ${i + 1}`}
                      loading="lazy"
                      onClick={() => setLightboxImg(img)}
                      style={{ cursor: "pointer" }}
                    />
                    <div className="pc-project-media-buttons">
                      <button
                        className="pc-project-media-btn pc-project-media-btn--expand"
                        onClick={() => setLightboxImg(img)}
                        title="Expand"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="15 3 21 3 21 9" />
                          <polyline points="9 21 3 21 3 15" />
                          <line x1="21" y1="3" x2="14" y2="10" />
                          <line x1="3" y1="21" x2="10" y2="14" />
                        </svg>
                      </button>
                      <a
                        href={img}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pc-project-media-btn pc-project-media-btn--link"
                        title="Open in new tab"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pc-project-detail-links">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="pc-project-link">
                ↗ View on GitHub
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="pc-project-link pc-project-link--alt">
                ↗ Live Demo
              </a>
            )}
          </div>
        </div>
      </div>

      {lightboxImg && (
        <div className="pc-lightbox" onClick={() => setLightboxImg(null)}>
          <button className="pc-lightbox-close" onClick={() => setLightboxImg(null)} aria-label="Close">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <img
            className="pc-lightbox-content"
            src={lightboxImg}
            alt="Expanded view"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   HORIZONTAL SCROLL-HIJACK PROJECTS
   ═══════════════════════════════════════════════════ */

const NAV_HEIGHT = 52;
const CARD_GAP = 24;
const SCROLL_PER_CARD = 400; // vertical px of scroll consumed per card

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

  // Track window dimensions cleanly
  useEffect(() => {
    const updateDimensions = () => {
      setViewportHeight(window.innerHeight);
      setCardWidth(Math.min(420, window.innerWidth - 60)); // Ensure cards fit on small screens
    };
    if (typeof window !== "undefined") updateDimensions();
    window.addEventListener("resize", updateDimensions, { passive: true });
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // RAF Lerp loop for buttery scroll hijacking
  useEffect(() => {
    let currentX = 0;
    let targetX = 0;
    let animationFrameId: number;

    const render = () => {
      // Lerp (smoothness factor)
      currentX += (targetX - currentX) * 0.12;
      
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${currentX}px)`;
      }

      // Sync progress dots directly without triggering React re-renders
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

      // Quick fade title
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
    handleScroll(); // Init
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
              <ProjectCard project={p} index={i} />
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

/* ═══════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════ */

export default function PaperCraftPortfolio() {
  const [time, setTime] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  // Initialize theme from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("pc-theme");
      if (savedTheme === "light") {
        setIsLightMode(true);
      }
    }
  }, []);

  const toggleTheme = () => {
    setIsLightMode((prev) => {
      const next = !prev;
      localStorage.setItem("pc-theme", next ? "light" : "dark");
      return next;
    });
  };

  useEffect(() => {
    const tick = () => {
      try {
        setTime(new Date().toLocaleTimeString("en-US", {
          timeZone: aboutData.timeZone,
          hour12: true, hour: "numeric", minute: "2-digit", second: "2-digit"
        }));
      } catch {
        setTime(new Date().toLocaleTimeString("en-US", { hour12: true }));
      }
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  // Scroll tracking for nav blur
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { passive: true });
    h();
    return () => window.removeEventListener("scroll", h);
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (!el) return;

    if (targetId === "contact") {
      // For contact, jump past the entire projects scroll range quickly
      const projectsOuter = document.getElementById("projects");
      if (projectsOuter) {
        const projectsBottom = projectsOuter.offsetTop + projectsOuter.offsetHeight;
        // Scroll to just past the projects section, then to contact
        const contactTop = el.offsetTop - NAV_HEIGHT - 20;
        fastScrollTo(Math.max(contactTop, projectsBottom - window.innerHeight + 100), 500);
      } else {
        fastScrollTo(el.offsetTop - NAV_HEIGHT - 20, 500);
      }
    } else if (targetId === "projects") {
      // Scroll to the start of the projects outer container
      fastScrollTo(el.offsetTop - NAV_HEIGHT, 400);
    } else {
      // About or hero
      fastScrollTo(el.offsetTop - NAV_HEIGHT - 20, 400);
    }
  }, []);

  return (
    <>
      <style>{`
        /* ═══════════ THEME TOKENS (Default: DARK) ═══════════ */
        :root, .paper {
          color-scheme: dark;
          --pc-bg: #1a1614;
          --pc-bg-card: #242019;
          --pc-text: #e8ddd0;
          --pc-text-muted: #a89b8e;
          --pc-text-meta: #7a6e62;
          --pc-accent: #e87f4f;
          --pc-accent-bg: rgba(232,127,79,0.1);
          --pc-green: #9aab8e;
          --pc-green-bg: rgba(154,171,142,0.1);
          --pc-blue: #7da0d1;
          --pc-border: #342e27;
          --pc-border-strong: #4a4239;
          --pc-shadow: rgba(0,0,0,0.3);
          --pc-shadow-deep: rgba(0,0,0,0.15);
          --pc-tape-bg: rgba(154,171,142,0.08);
          --pc-noise-opacity: 0.3;
          --pc-nav-bg: rgba(26,22,20,0.7);
        }

        .paper.pc-light-mode {
          color-scheme: light;
          --pc-bg: #f5f0e8;
          --pc-bg-card: #fffdf7;
          --pc-text: #3c2415;
          --pc-text-muted: #7a6b5d;
          --pc-text-meta: #999;
          --pc-accent: #c75c2e;
          --pc-accent-bg: rgba(199,92,46,0.08);
          --pc-green: #7a8b6f;
          --pc-green-bg: rgba(122,139,111,0.15);
          --pc-blue: #4a6fa5;
          --pc-border: #e8ddd0;
          --pc-border-strong: #d4c5b0;
          --pc-shadow: #e8ddd0;
          --pc-shadow-deep: #f0e8dc;
          --pc-tape-bg: rgba(122,139,111,0.15);
          --pc-noise-opacity: 0.6;
          --pc-nav-bg: rgba(245,240,232,0.7);
        }

        /* ═══════════ BASE ═══════════ */
        /* overflow-x on html, NOT on .paper — overflow on a parent breaks position:sticky */
        html { overflow-x: hidden; }
        .paper * { box-sizing: border-box; margin: 0; padding: 0; }
        .paper {
          background: var(--pc-bg);
          color: var(--pc-text);
          font-family: 'Liberation Mono', 'Courier New', monospace;
          font-weight: 400;
          font-size: 15px;
          line-height: 1.8;
          min-height: 100vh;
          position: relative;
          transition: background-color 0.5s ease, color 0.5s ease;
        }
        .paper::before {
          content: '';
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: var(--pc-noise-opacity);
        }
        .paper h1, .paper h2, .paper h3, .paper h4 {
          font-family: 'Liberation Mono', 'Courier New', monospace;
          font-weight: 700; line-height: 1.3;
        }

        /* ═══════════ ANIMATED SVG ICONS ═══════════ */
        .pc-icon {
          width: 28px; height: 28px;
          color: var(--pc-accent);
          display: inline-block;
          vertical-align: middle;
          margin-right: 0.5rem;
          position: relative; top: -2px;
        }
        .pc-icon-write { animation: pcDraw 2.5s ease-in-out infinite; }
        @keyframes pcDraw {
          0% { stroke-dashoffset: 14; }
          40% { stroke-dashoffset: 0; }
          80% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -14; }
        }
        .pc-icon-pencil { animation: pcPencilBob 2.5s ease-in-out infinite; transform-origin: center; }
        @keyframes pcPencilBob {
          0%, 100% { transform: translateX(0); }
          30% { transform: translateX(2px); }
          60% { transform: translateX(-1px); }
        }
        .pc-icon-steam { animation: pcSteam 2.5s ease-in-out infinite; opacity: 0.5; }
        .pc-icon-steam-1 { animation-delay: 0s; }
        .pc-icon-steam-2 { animation-delay: 0.4s; }
        .pc-icon-steam-3 { animation-delay: 0.8s; }
        @keyframes pcSteam {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 0.7; transform: translateY(-3px); }
        }
        .pc-icon-blade:first-of-type { animation: pcSnipA 2s ease-in-out infinite; }
        .pc-icon-blade:last-of-type { animation: pcSnipB 2s ease-in-out infinite; }
        @keyframes pcSnipA {
          0%, 100% { transform: rotate(0deg); transform-origin: 12px 11px; }
          35% { transform: rotate(10deg); transform-origin: 12px 11px; }
          65% { transform: rotate(10deg); transform-origin: 12px 11px; }
        }
        @keyframes pcSnipB {
          0%, 100% { transform: rotate(0deg); transform-origin: 12px 21px; }
          35% { transform: rotate(-10deg); transform-origin: 12px 21px; }
          65% { transform: rotate(-10deg); transform-origin: 12px 21px; }
        }
        .pc-icon-heart { animation: pcHeartBeat 2s ease-in-out infinite; transform-origin: center; }
        @keyframes pcHeartBeat {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.12); }
          30% { transform: scale(1); }
          45% { transform: scale(1.08); }
          60% { transform: scale(1); }
        }
        .pc-icon-clock-hour { animation: pcClockHour 12s linear infinite; transform-origin: 16px 16px; }
        .pc-icon-clock-min { animation: pcClockMin 3s linear infinite; transform-origin: 16px 16px; }
        @keyframes pcClockHour { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pcClockMin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .pc-icon-pin { animation: pcPinBounce 2s ease-in-out infinite; transform-origin: center bottom; }
        @keyframes pcPinBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
        .pc-icon-mail-flap { animation: pcMailFlap 3s ease-in-out infinite; transform-origin: 16px 9px; }
        @keyframes pcMailFlap { 0%, 90%, 100% { transform: scaleY(1); } 35%, 65% { transform: scaleY(0.05); } }
        .pc-icon--small { width: 18px; height: 18px; margin-right: 0.35rem; top: -1px; }
        .pc-icon--tiny { width: 14px; height: 14px; display: inline-block; vertical-align: middle; position: relative; top: -1px; }

        /* ═══════════ NAV ═══════════ */
        .paper-nav {
          position: sticky; top: 0; z-index: 100;
          padding: 0.85rem 2rem;
          display: flex; justify-content: space-between; align-items: center;
          transition: all 0.4s ease;
          border-bottom: 1px solid transparent;
        }
        .paper-nav--scrolled {
          background: var(--pc-nav-bg);
          backdrop-filter: blur(16px) saturate(1.4);
          -webkit-backdrop-filter: blur(16px) saturate(1.4);
          border-bottom-color: var(--pc-border);
        }
        .paper-nav--top {
          background: transparent;
        }
        .paper-nav-name {
          font-size: 1.3rem; font-weight: 700;
          color: var(--pc-accent);
          letter-spacing: 0.02em;
        }
        .paper-nav-links { display: flex; gap: 1.5rem; align-items: center; }
        .paper-nav-links a {
          color: var(--pc-green); text-decoration: none; font-size: 0.9rem;
          transition: color 0.3s; cursor: pointer;
        }
        .paper-nav-links a:hover { color: var(--pc-accent); }
        .paper-nav-controls {
          display: flex; align-items: center; gap: 0.5rem;
        }
        .pc-theme-toggle {
          background: none; border: none; color: var(--pc-text-muted);
          cursor: pointer; padding: 0.4rem; display: flex; align-items: center; justify-content: center;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.3s ease;
        }
        .pc-theme-toggle:hover {
          color: var(--pc-accent);
          transform: rotate(15deg) scale(1.1);
        }

        /* ═══════════ HERO ═══════════ */
        .paper-hero {
          min-height: auto;
          display: flex; flex-direction: column;
          align-items: center; justify-content: flex-start;
          text-align: center; padding: 6rem 2rem 5rem;
          position: relative; z-index: 1;
        }
        .paper-hero h1 {
          font-size: clamp(2.5rem, 8vw, 5rem);
          color: var(--pc-text);
          position: relative; display: inline-block;
        }
        .paper-hero h1::after {
          content: '';
          position: absolute; bottom: 0.05em; left: -3%; right: -3%; height: 0.3em;
          background: var(--pc-accent-bg);
          z-index: -1; transform: rotate(-1deg);
        }
        .paper-hero-sub {
          font-size: 1rem; font-weight: 400;
          color: var(--pc-text-muted);
          margin-top: 1rem; max-width: 500px;
        }
        .paper-hero-info {
          display: flex; gap: 1rem; margin-top: 2rem;
          flex-wrap: wrap; justify-content: center;
        }
        .paper-hero-info-card {
          display: inline-flex; align-items: center; gap: 0.25rem;
          background: var(--pc-accent-bg);
          border: 1px dashed var(--pc-border-strong);
          padding: 0.4rem 1.2rem;
          font-size: 0.85rem;
          color: var(--pc-text-muted); font-family: inherit;
          transition: all 0.3s ease;
          cursor: default;
        }
        button.paper-hero-info-card { cursor: pointer; }
        .paper-hero-info-card:nth-child(1) { transform: rotate(-1.5deg); }
        .paper-hero-info-card:nth-child(2) { transform: rotate(0.8deg); }
        .paper-hero-info-card:nth-child(3) { transform: rotate(-0.5deg); }
        .paper-hero-info-card:hover {
          transform: rotate(0deg) translateY(-2px) !important;
          border-color: var(--pc-accent); color: var(--pc-accent);
        }
        .paper-hero-info-card--copied {
          border-style: solid; background: var(--pc-green-bg); color: var(--pc-green) !important; border-color: var(--pc-green) !important;
        }
        .paper-hero-doodle {
          position: absolute; font-size: 4rem; opacity: 0.05;
          user-select: none; color: var(--pc-text);
        }

        /* ═══════════ SECTIONS ═══════════ */
        .paper-section {
          position: relative; z-index: 1;
          max-width: 900px; margin: 0 auto;
          padding: 4rem 2rem;
        }
        .paper-section-title {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          color: var(--pc-text);
          margin-bottom: 2rem;
          position: relative; display: inline-flex; align-items: center;
        }
        .paper-section-title::after {
          content: '';
          position: absolute; bottom: -4px; left: 0; right: 0; height: 2px;
          background: repeating-linear-gradient(90deg,
            var(--pc-accent) 0px, var(--pc-accent) 6px,
            transparent 6px, transparent 10px
          );
        }

        /* Tape divider */
        .paper-tape-divider {
          display: flex; justify-content: center; padding: 1rem 0;
        }
        .paper-tape {
          width: 100px; height: 20px;
          background: var(--pc-tape-bg);
          border: 1px solid var(--pc-border);
          transform: rotate(-3deg);
        }

        /* ═══════════ ABOUT ═══════════ */
        .paper-about-card {
          background: var(--pc-bg-card);
          border: 1px solid var(--pc-border);
          padding: 2rem;
          box-shadow: 3px 3px 0 var(--pc-shadow);
          transform: rotate(-0.5deg);
          position: relative;
        }
        .paper-about-card::before {
          content: '📌';
          position: absolute; top: -12px; right: 20px;
          font-size: 1.3rem;
        }
        .paper-about-bio { color: var(--pc-text-muted); font-size: 0.95rem; }
        .paper-about-meta {
          margin-top: 1rem; font-size: 0.8rem;
          color: var(--pc-text-meta); font-style: italic;
        }

        /* ═══════════ SKILLS ═══════════ */
        .paper-skills-grid { display: flex; flex-wrap: wrap; gap: 0.6rem; }
        .paper-skill-tag {
          display: inline-block; padding: 0.3rem 0.75rem;
          font-size: 0.85rem; font-weight: 700;
          color: var(--pc-text); position: relative; cursor: default;
          transition: transform 0.3s ease;
        }
        .paper-skill-tag::before {
          content: ''; position: absolute; inset: 0;
          border: 2px solid var(--pc-border-strong);
          border-radius: 2px; transform: rotate(-1deg);
          transition: border-color 0.3s;
        }
        .paper-skill-tag:nth-child(even)::before { transform: rotate(1.5deg); }
        .paper-skill-tag:nth-child(3n)::before { transform: rotate(-2deg); }
        .paper-skill-tag:hover { transform: translateY(-2px) rotate(1deg); }
        .paper-skill-tag:hover::before { border-color: var(--pc-accent); }

        /* ═══════════ PROJECTS (horizontal) ═══════════ */
        .pc-project-card {
          background: var(--pc-bg-card);
          border: 1px solid var(--pc-border);
          box-shadow: 2px 2px 0 var(--pc-shadow), 4px 4px 0 var(--pc-shadow-deep);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: default; position: relative; overflow: hidden;
          
          /* pure CSS accordion scaling */
          display: flex; flex-direction: column;
          max-height: calc(100vh - 200px);
        }
        .pc-project-card:hover {
          box-shadow: 3px 3px 0 var(--pc-border-strong), 5px 5px 0 var(--pc-shadow);
        }

        .pc-project-card-header {
          width: 100%; text-align: left;
          padding: 1.5rem; display: block;
          flex-shrink: 0;
        }
        .pc-project-card-top {
          display: flex; justify-content: space-between; align-items: flex-start;
          margin-bottom: 0.5rem;
        }
        .pc-project-card-top h3 { font-size: 1.15rem; color: var(--pc-text); }
        .pc-project-card-featured {
          font-size: 0.7rem; color: var(--pc-accent);
          background: var(--pc-accent-bg);
          padding: 0.1rem 0.5rem;
          transform: rotate(3deg); display: inline-block;
        }
        .pc-project-card-desc {
          color: var(--pc-text-muted); font-size: 0.85rem; margin-bottom: 0.65rem;
        }
        .pc-project-card-techs { display: flex; gap: 0.4rem; flex-wrap: wrap; }
        .pc-project-card-tech {
          font-size: 0.7rem; color: var(--pc-green);
          border-bottom: 1px dashed var(--pc-green); padding-bottom: 1px;
        }

        /* Detail Area */
        .pc-project-detail-wrapper {
          display: flex; flex-direction: column;
          flex: 1; min-height: 0;
        }
        .pc-project-detail-inner {
          padding: 0 1.5rem 1.5rem;
          overflow-y: auto;
          overscroll-behavior: contain;
          flex: 1; min-height: 0;
          
          /* custom card internal scrollbar */
          scrollbar-width: thin;
          scrollbar-color: var(--pc-border-strong) var(--pc-bg-card);
        }
        .pc-project-detail-inner::-webkit-scrollbar { width: 6px; }
        .pc-project-detail-inner::-webkit-scrollbar-track { background: transparent; }
        .pc-project-detail-inner::-webkit-scrollbar-thumb {
          background-color: var(--pc-border-strong);
          border-radius: 3px;
        }
        .pc-project-detail-divider {
          height: 1px; margin-bottom: 1rem;
          background: repeating-linear-gradient(90deg,
            var(--pc-border-strong) 0px, var(--pc-border-strong) 4px,
            transparent 4px, transparent 8px);
        }
        .pc-project-detail-long { color: var(--pc-text-muted); font-size: 0.85rem; margin-bottom: 1rem; }
        .pc-project-detail-features h4 { font-size: 0.85rem; color: var(--pc-accent); margin-bottom: 0.4rem; }
        .pc-project-detail-features ul {
          list-style: none; padding: 0; margin: 0 0 1rem 0;
          display: flex; flex-wrap: wrap; gap: 0.35rem;
        }
        .pc-project-detail-features li {
          font-size: 0.75rem; color: var(--pc-text-muted);
          background: var(--pc-accent-bg); border: 1px dashed var(--pc-border);
          padding: 0.15rem 0.5rem;
        }
        .pc-project-detail-media { margin-bottom: 1rem; }
        .pc-project-detail-media h4 { font-size: 0.85rem; color: var(--pc-accent); margin-bottom: 0.5rem; }
        .pc-project-detail-media-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 0.6rem;
        }
.pc-project-media-item {
          display: block; overflow: hidden;
          border: 1px solid var(--pc-border);
          background: var(--pc-bg);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
        }
        .pc-project-media-item:hover {
          transform: rotate(-1deg) scale(1.02);
          box-shadow: 3px 3px 0 var(--pc-shadow);
        }
        .pc-project-media-item img { width: 100%; height: 100px; object-fit: cover; display: block; }
        .pc-project-media-buttons {
          position: absolute;
          top: 0.35rem;
          right: 0.35rem;
          display: flex;
          gap: 0.3rem;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .pc-project-media-item:hover .pc-project-media-buttons {
          opacity: 1;
        }
        .pc-project-media-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 3px;
          border: 1px solid var(--pc-border-strong);
          background: var(--pc-bg-card);
          color: var(--pc-text-muted);
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
        }
        .pc-project-media-btn:hover {
          color: var(--pc-accent);
          border-color: var(--pc-accent);
          background: var(--pc-accent-bg);
        }
        .pc-project-media-btn--link:hover {
          color: var(--pc-blue);
          border-color: var(--pc-blue);
          background: rgba(125,160,209,0.1);
        }

        .pc-project-detail-links {
          display: flex; gap: 0.75rem; flex-wrap: wrap;
        }
        .pc-project-link {
          font-size: 0.8rem; font-weight: 700;
          color: var(--pc-blue); text-decoration: none;
          border: 1px dashed var(--pc-blue);
          padding: 0.3rem 0.75rem; transition: all 0.3s ease;
        }
        .pc-project-link:hover {
          background: var(--pc-blue); color: var(--pc-bg-card); border-style: solid;
        }
        .pc-project-link--alt { color: var(--pc-accent); border-color: var(--pc-accent); }
        .pc-project-link--alt:hover { background: var(--pc-accent); color: var(--pc-bg-card); }

        /* ═══════════ LIGHTBOX ═══════════ */
        .pc-lightbox {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(0,0,0,0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: pcLightboxFade 0.2s ease;
        }
        @keyframes pcLightboxFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .pc-lightbox-content {
          max-width: 90vw;
          max-height: 90vh;
          object-fit: contain;
          border-radius: 4px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.5);
          animation: pcLightboxScale 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes pcLightboxScale {
          from { transform: scale(0.85); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .pc-lightbox-close {
          position: fixed;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
          padding: 0.5rem;
          opacity: 0.7;
          transition: opacity 0.2s;
          z-index: 1001;
        }
        .pc-lightbox-close:hover { opacity: 1; }

        /* ═══════════ CONTACT ═══════════ */
        .paper-contact-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem;
        }
        .paper-contact-card {
          background: var(--pc-bg-card); border: 1px solid var(--pc-border);
          padding: 1.25rem; text-align: center;
          box-shadow: 2px 2px 0 var(--pc-shadow); transition: all 0.3s ease;
        }
        .paper-contact-card:nth-child(odd) { transform: rotate(-1deg); }
        .paper-contact-card:nth-child(even) { transform: rotate(0.8deg); }
        .paper-contact-card:hover {
          transform: rotate(0deg) translateY(-3px) !important;
          box-shadow: 3px 3px 0 var(--pc-border-strong);
        }
        .paper-contact-card h3 { font-size: 1.05rem; color: var(--pc-accent); margin-bottom: 0.4rem; }
        .paper-contact-card p { font-size: 0.8rem; color: var(--pc-text-meta); margin-bottom: 0.6rem; }
        .paper-contact-card a {
          color: var(--pc-blue); text-decoration: none; font-size: 0.85rem; font-weight: 700;
        }
        .paper-contact-card a:hover { color: var(--pc-accent); }
        .pc-copy-button {
          background: var(--pc-accent-bg); border: 1px dashed var(--pc-border-strong);
          color: var(--pc-blue); display: inline-flex; align-items: center;
          padding: 0.3rem 0.6rem; font-size: 0.85rem; font-weight: 700;
          cursor: pointer; transition: all 0.2s ease; border-radius: 2px;
          margin: 0 auto;
        }
        .pc-copy-button:hover { background: rgba(199,92,46,0.12); border-color: var(--pc-accent); color: var(--pc-accent); }
        .pc-copy-button--copied { border-style: solid; background: var(--pc-green-bg); color: var(--pc-green); border-color: var(--pc-green); }
        .pc-copy-text { font-family: inherit; }

        /* ═══════════ FOOTER ═══════════ */
        .paper-footer {
          position: relative; z-index: 1;
          text-align: center; padding: 1rem 2rem;
          font-size: 0.8rem; color: var(--pc-text-meta);
          border-top: 2px dashed var(--pc-border-strong);
        }

        /* ═══════════ MOBILE NAV ═══════════ */
        .paper-mobile-toggle {
          display: none; background: none; border: none;
          color: var(--pc-text); cursor: pointer; padding: 0.5rem;
        }
        @media (max-width: 768px) {
          .paper-nav { padding: 0.75rem 1rem; }
          .paper-mobile-toggle { display: block; }
          .paper-nav-links {
            display: flex; flex-direction: column; gap: 1rem;
            position: absolute; top: 100%; left: 0; right: 0;
            background: var(--pc-bg-card);
            border-bottom: 2px dashed var(--pc-border-strong);
            padding: 1rem 2rem; 
            transform: translateY(-10px); opacity: 0; pointer-events: none;
            transition: all 0.3s ease;
            box-shadow: 0 10px 20px var(--pc-shadow-deep);
          }
          .paper-nav-links--open {
            transform: translateY(0); opacity: 1; pointer-events: auto;
          }
          .paper-contact-grid { grid-template-columns: 1fr; }
          .pc-project-detail-media-grid { grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); }
        }
      `}</style>

      <div className={`paper ${isLightMode ? "pc-light-mode" : ""}`}>
        {/* Nav */}
        <nav className={`paper-nav ${scrolled ? "paper-nav--scrolled" : "paper-nav--top"}`}>
          <div className="paper-nav-name">{aboutData.name}</div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <div className={`paper-nav-links ${mobileMenuOpen ? "paper-nav-links--open" : ""}`}>
              <a href="#about" onClick={(e) => { setMobileMenuOpen(false); handleNavClick(e, "about"); }}>About</a>
              <a href="#projects" onClick={(e) => { setMobileMenuOpen(false); handleNavClick(e, "projects"); }}>Projects</a>
              <a href="#contact" onClick={(e) => { setMobileMenuOpen(false); handleNavClick(e, "contact"); }}>Contact</a>
            </div>

            <div className="paper-nav-controls">
              <button 
                className="pc-theme-toggle" 
                onClick={toggleTheme} 
                aria-label="Toggle theme" 
                title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
              >
                {isLightMode ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                )}
              </button>
              
              <button className="paper-mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  {mobileMenuOpen ? (
                    <path d="M18 6L6 18M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="paper-hero">
          <div className="paper-hero-doodle" style={{ top: "15%", left: "8%" }}>⚡</div>
          <div className="paper-hero-doodle" style={{ top: "25%", right: "10%" }}>◆</div>
          <div className="paper-hero-doodle" style={{ bottom: "20%", left: "15%" }}>⬡</div>
          <Reveal>
            <h1>Hello, I&apos;m {aboutData.name}</h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="paper-hero-sub">{aboutData.title} — creating things from {aboutData.location}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="paper-hero-info">
              <div className="paper-hero-info-card">
                <MapPinIcon /> {aboutData.location}
              </div>
              <div className="paper-hero-info-card">
                <ClockIcon /> {time}
              </div>
              <HeroMailCard email={aboutData.email} />
            </div>
          </Reveal>
        </section>

        <div className="paper-tape-divider"><div className="paper-tape" /></div>

        {/* About */}
        <section id="about" className="paper-section">
          <Reveal>
            <h2 className="paper-section-title"><PencilIcon /> About Me</h2>
          </Reveal>
          <Reveal delay={0.1} rotate={-0.5}>
            <div className="paper-about-card">
              <p className="paper-about-bio">{aboutData.bio}</p>
              <p className="paper-about-meta">📍 {aboutData.location} · ⏱ {aboutData.experience} of experience</p>
            </div>
          </Reveal>
        </section>

        {/* Skills */}
        <section className="paper-section">
          <Reveal>
            <h2 className="paper-section-title"><CoffeeIcon /> Things I Know</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="paper-skills-grid">
              {aboutData.skills.map((s) => (
                <span key={s} className="paper-skill-tag">{s}</span>
              ))}
            </div>
          </Reveal>
        </section>

        <div className="paper-tape-divider">
          <div className="paper-tape" style={{ transform: "rotate(2deg)", background: "var(--pc-accent-bg)" }} />
        </div>

        {/* Projects — horizontal scroll hijack */}
        <HorizontalProjects />

        <div className="paper-tape-divider">
          <div className="paper-tape" style={{ transform: "rotate(-1.5deg)", background: "rgba(74,111,165,0.08)" }} />
        </div>

        {/* Contact */}
        <section id="contact" className="paper-section">
          <Reveal>
            <h2 className="paper-section-title"><HeartIcon /> Say Hello!</h2>
          </Reveal>
          <div className="paper-contact-grid">
            {contactData.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.08}>
                <div className="paper-contact-card">
                  <h3>{c.title}</h3>
                  <p>{c.description}</p>
                  {c.actionType === "link" ? (
                    <a href={c.actionValue} target="_blank" rel="noopener noreferrer">{c.buttonText} →</a>
                  ) : (
                    <CopyButton text={c.actionValue} />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="paper-footer">
          Made with ♡ by {aboutData.name} · {new Date().getFullYear()}
        </footer>
      </div>
    </>
  );
}
