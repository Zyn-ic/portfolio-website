"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import ProjectMedia from "@/components/ProjectMedia";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  images: string[];
  technologies: string[];
  category: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  keyFeatures: string[];
}

function Lightbox({
  images,
  index,
  onIndexChange,
  onClose,
}: {
  images: string[];
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}) {
  const count = images.length;
  // Bounded navigation: no wraparound, arrows hide at the ends.
  const showPrev = count > 1 && index > 0;
  const showNext = count > 1 && index < count - 1;

  // Escape closes; arrow keys step (bounded); lock background scroll.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && index > 0) onIndexChange(index - 1);
      else if (e.key === "ArrowRight" && index < count - 1) onIndexChange(index + 1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onIndexChange, index, count]);

  // Portal to <body>: the card lives inside transformed ancestors
  // (rotate() on the card wrapper, translateX() on the scroll track),
  // which would break position:fixed and anchor the overlay to the
  // card instead of the viewport.
  if (typeof document === "undefined") return null;
  return createPortal(
    <div className="pc-lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <button className="pc-lightbox-close" onClick={onClose} aria-label="Close">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <figure className="pc-lightbox-figure" onClick={(e) => e.stopPropagation()}>
        <ProjectMedia
          key={index}
          src={images[index]}
          alt={`Expanded view ${index + 1} of ${count}`}
          className="pc-lightbox-content"
        />
        {showPrev && (
          <button
            className="pc-carousel-arrow pc-carousel-arrow--left"
            onClick={() => onIndexChange(index - 1)}
            aria-label="Previous image"
            title="Previous image"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
        {showNext && (
          <button
            className="pc-carousel-arrow pc-carousel-arrow--right"
            onClick={() => onIndexChange(index + 1)}
            aria-label="Next image"
            title="Next image"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
        {count > 1 && (
          <span className="pc-carousel-count">{index + 1} / {count}</span>
        )}
      </figure>
    </div>,
    document.body
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const hasFeatures = project.keyFeatures.length > 0;
  const imageCount = project.images.length;
  const hasImages = imageCount > 0;
  // Clamp in case the image list ever shrinks; arrows are bounded (no wrap).
  const safeIdx = Math.max(0, Math.min(activeIdx, imageCount - 1));
  const activeImg = hasImages ? project.images[safeIdx] : null;
  const showPrev = imageCount > 1 && safeIdx > 0;
  const showNext = imageCount > 1 && safeIdx < imageCount - 1;

  return (
    <div className="pc-project-card">
      {hasImages && activeImg && (
        <div className="pc-project-detail-media pc-project-media--top">
          <div className="pc-project-carousel">
            <div className="pc-project-media-item">
              <ProjectMedia
                key={safeIdx}
                src={activeImg}
                alt={`${project.title} ${safeIdx + 1} of ${imageCount}`}
                className="pc-carousel-img"
                onClick={() => setLightboxOpen(true)}
              />
              {showPrev && (
                <button
                  className="pc-carousel-arrow pc-carousel-arrow--left"
                  onClick={() => setActiveIdx(safeIdx - 1)}
                  aria-label="Previous image"
                  title="Previous image"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
              )}
              {showNext && (
                <button
                  className="pc-carousel-arrow pc-carousel-arrow--right"
                  onClick={() => setActiveIdx(safeIdx + 1)}
                  aria-label="Next image"
                  title="Next image"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              )}
              {imageCount > 1 && (
                <span className="pc-carousel-count">{safeIdx + 1} / {imageCount}</span>
              )}
              <div className="pc-project-media-buttons">
                <button
                  className="pc-project-media-btn pc-project-media-btn--expand"
                  onClick={() => setLightboxOpen(true)}
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
                  href={activeImg}
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
            {imageCount > 1 && (
              <div className="pc-carousel-dots" role="tablist" aria-label="Gallery images">
                {project.images.map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === safeIdx}
                    aria-label={`Go to image ${i + 1}`}
                    title={`Image ${i + 1}`}
                    className={`pc-carousel-dot${i === safeIdx ? " pc-carousel-dot--active" : ""}`}
                    onClick={() => setActiveIdx(i)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

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

          {hasFeatures && (
            <div className="pc-project-detail-features">
              <h4>Key Features</h4>
              <ul>
                {project.keyFeatures.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
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

      {lightboxOpen && activeImg && (
        <Lightbox
          images={project.images}
          index={safeIdx}
          onIndexChange={setActiveIdx}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}

export type { Project };
export default ProjectCard;
