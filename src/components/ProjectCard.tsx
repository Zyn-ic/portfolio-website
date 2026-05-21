"use client";
import { useState } from "react";

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

function Lightbox({ img, onClose }: { img: string; onClose: () => void }) {
  return (
    <div className="pc-lightbox" onClick={onClose}>
      <button className="pc-lightbox-close" onClick={onClose} aria-label="Close">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <img
        className="pc-lightbox-content"
        src={img}
        alt="Expanded view"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const hasFeatures = project.keyFeatures.length > 0;
  const hasImages = project.images.length > 0;

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

          {hasImages && (
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
        <Lightbox img={lightboxImg} onClose={() => setLightboxImg(null)} />
      )}
    </div>
  );
}

export type { Project };
export default ProjectCard;
