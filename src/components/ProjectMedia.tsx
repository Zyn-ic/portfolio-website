"use client";
import { useEffect, useRef, useState } from "react";

function isImgurGif(src: string): boolean {
  return /^https?:\/\/i\.imgur\.com\/[^?#]+\.gif([?#]|$)/i.test(src);
}

function toImgurMp4(src: string): string {
  return src.replace(/\.gif([?#]|$)/i, ".mp4$1");
}

interface ProjectMediaProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

/**
 * Renders project media, pausing animated content to save compute.
 *
 * - Imgur GIFs are served as muted looping MP4s (bytes Imgur already
 *   generates for gifv), which support play()/pause() — raw <img> GIFs
 *   have no pause API, so this is the Discord-style approach.
 * - Playback pauses when the tab is hidden, the window loses focus, or
 *   the element scrolls out of view, and resumes when visible again.
 * - Anything else (PNGs, non-Imgur files) renders as a plain <img>.
 *   If the MP4 ever fails to load, it falls back to the <img> automatically.
 */
export default function ProjectMedia({ src, alt, className, onClick }: ProjectMediaProps) {
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const useVideo = !videoFailed && isImgurGif(src);

  useEffect(() => {
    setVideoFailed(false);
  }, [src]);

  useEffect(() => {
    if (!useVideo) return;
    const video = videoRef.current;
    if (!video) return;

    let inView = true;
    const sync = () => {
      if (document.hidden || !inView) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
        sync();
      },
      { threshold: 0.05 }
    );
    observer.observe(video);

    const onVisibility = () => sync();
    const onBlur = () => video.pause();
    const onFocus = () => sync();

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
    sync();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
    };
  }, [useVideo, src]);

  if (useVideo) {
    return (
      <video
        ref={videoRef}
        className={className}
        src={toImgurMp4(src)}
        aria-label={alt}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        onClick={onClick}
        onError={() => setVideoFailed(true)}
        style={{ cursor: onClick ? "pointer" : undefined }}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : undefined }}
    />
  );
}
