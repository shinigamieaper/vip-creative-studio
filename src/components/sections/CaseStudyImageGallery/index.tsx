"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CaseStudyImageGalleryProps
  extends React.ComponentPropsWithoutRef<"div"> {
  images: string[];
  alt: string;
}

const CaseStudyImageGallery: React.FC<CaseStudyImageGalleryProps> = ({
  images,
  alt,
  className,
  ...props
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  useEffect(() => {
    if (images.length <= 1) return;

    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 8000);

    return () => clearInterval(id);
  }, [images.length]);

  const handleNext = () => {
    if (images.length <= 1) return;
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    if (images.length <= 1) return;
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const current = images[activeIndex];

  return (
    <div
      className={cn(
        "relative aspect-[16/9] rounded-3xl overflow-hidden border border-standard shadow-[0_8px_24px_rgba(0,0,0,0.12)] bg-card",
        className
      )}
      {...props}
    >
      <Image
        src={current}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
      />

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-card/80 border border-standard flex items-center justify-center text-primary hover:bg-accent-primary/10 hover:border-accent-primary/40 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-card/80 border border-standard flex items-center justify-center text-primary hover:bg-accent-primary/10 hover:border-accent-primary/40 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-card/80 border border-standard text-xs text-primary/70">
            Image {activeIndex + 1} of {images.length}
          </div>
        </>
      )}
    </div>
  );
};

export default CaseStudyImageGallery;
