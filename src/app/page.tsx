"use client";

import { useEffect, useState, useCallback } from "react";
import aboutData from "@/data/about.json";
import contactData from "@/data/contact.json";
import { Reveal } from "@/hooks/useReveal";
import {
  PencilIcon,
  CoffeeIcon,
  ScissorsIcon,
  HeartIcon,
  ClockIcon,
  MapPinIcon,
  HeroMailCard,
} from "@/components/icons";
import { CopyButton } from "@/components/icons";
import HorizontalProjects from "@/components/HorizontalProjects";
import "@/styles/paper.css";

const NAV_HEIGHT = 52;

function fastScrollTo(targetY: number, duration = 600) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  const startTime = performance.now();

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    window.scrollTo(0, startY + diff * ease);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

export default function PaperCraftPortfolio() {
  const [time, setTime] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

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
      const projectsOuter = document.getElementById("projects");
      if (projectsOuter) {
        const projectsBottom = projectsOuter.offsetTop + projectsOuter.offsetHeight;
        const contactTop = el.offsetTop - NAV_HEIGHT - 20;
        fastScrollTo(Math.max(contactTop, projectsBottom - window.innerHeight + 100), 500);
      } else {
        fastScrollTo(el.offsetTop - NAV_HEIGHT - 20, 500);
      }
    } else if (targetId === "projects") {
      fastScrollTo(el.offsetTop - NAV_HEIGHT, 400);
    } else {
      fastScrollTo(el.offsetTop - NAV_HEIGHT - 20, 400);
    }
  }, []);

  return (
    <>
      <div className={`paper ${isLightMode ? "pc-light-mode" : ""}`}>
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

        <section className="paper-hero">
          <div className="paper-hero-doodle" style={{ top: "15%", left: "8%" }}>⚡</div>
          <div className="paper-hero-doodle" style={{ top: "25%", right: "10%" }}>◆</div>
          <div className="paper-hero-doodle" style={{ bottom: "20%", left: "15%" }}>⬡</div>
          <Reveal>
            <h1>Hello, I&apos;m {aboutData.name}</h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="paper-hero-sub">{aboutData.title}</p>
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

        <HorizontalProjects />

        <div className="paper-tape-divider">
          <div className="paper-tape" style={{ transform: "rotate(-1.5deg)", background: "rgba(74,111,165,0.08)" }} />
        </div>

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

        <footer className="paper-footer">
          Made with ♡ by {aboutData.name} · {new Date().getFullYear()}
        </footer>
      </div>
    </>
  );
}
