"use client";

import React, { useEffect, useState } from "react";

export interface ReadingProgressProps {
  /** Color of the progress bar - defaults to accent-primary */
  color?: "primary" | "secondary";
}

export function ReadingProgress({ color = "primary" }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  const bgColor = color === "primary" 
    ? "bg-accent-primary" 
    : "bg-accent-secondary";

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-primary/5">
      <div
        className={`h-full ${bgColor} transition-all duration-150 ease-out`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default ReadingProgress;
