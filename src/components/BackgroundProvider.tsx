"use client";

import type React from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";

// Context to control background playback
interface BackgroundContextType {
  isPaused: boolean;
  setPaused: (paused: boolean) => void;
}

const BackgroundContext = createContext<BackgroundContextType>({
  isPaused: false,
  setPaused: () => {},
});

export const useBackground = () => useContext(BackgroundContext);

export function BackgroundProvider({ children }: { children: React.ReactNode }) {
  const [isPaused, setPaused] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isTabActive, setIsTabActive] = useState(true);

  // Handle visibility change (tab switching)
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabActive(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Control video playback based on tab activity and manual pause state
  useEffect(() => {
    if (!videoRef.current) return;

    if (isTabActive && !isPaused) {
      videoRef.current.play().catch(() => {
        // Autoplay prevented or other error
      });
    } else {
      videoRef.current.pause();
    }
  }, [isTabActive, isPaused]);

  return (
    <BackgroundContext.Provider value={{ isPaused, setPaused }}>
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 -z-50 pointer-events-none bg-[#02060a]">
        
        {/* Placeholder Skin (visible before video loads) */}
        <div 
          className={`absolute inset-0 bg-[#02060a] transition-opacity duration-1000 ${
            videoLoaded ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Video Layer */}
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover object-center opacity-[0.18] mix-blend-screen transition-opacity duration-1000 ${
            videoLoaded ? "opacity-[0.18]" : "opacity-0"
          }`}
          src="/background.mp4"
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
        />

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-80" />
      </div>

      {children}
    </BackgroundContext.Provider>
  );
}
