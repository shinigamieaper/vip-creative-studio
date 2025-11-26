"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  type Resource,
  getPrimaryTopicLabelForResource,
} from "@/lib/resources/data";

export interface RelatedInsightsSliderProps
  extends React.ComponentPropsWithoutRef<"div"> {
  resources: Resource[];
  title?: string;
}

const RelatedInsightsSlider: React.FC<RelatedInsightsSliderProps> = ({
  resources,
  title = "Related insights",
  className,
  ...props
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate through related insights in an infinite loop
  useEffect(() => {
    if (!resources || resources.length <= 1) return;

    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % resources.length);
    }, 10000);

    return () => clearInterval(id);
  }, [resources?.length]);

  if (!resources || resources.length === 0) {
    return null;
  }

  const current = resources[activeIndex];
  const topicLabel =
    getPrimaryTopicLabelForResource(current) ?? current.category;

  const handleNext = () => {
    if (resources.length <= 1) return;
    setActiveIndex((prev) => (prev + 1) % resources.length);
  };

  return (
    <div className={cn("space-y-6", className)} {...props}>
      <article className="group relative overflow-hidden rounded-[32px] border border-standard/80 transition-all duration-500 shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:border-accent-primary/40 hover:shadow-[0_10px_30px_rgba(15,23,42,0.1)]">
        <div className="relative min-h-[360px] sm:min-h-[460px] lg:min-h-[580px]">
          {current.coverImage && (
            <Image
              src={current.coverImage}
              alt={current.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          )}

          <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/80 via-black/45 to-black/10" />

          <div className="absolute inset-0 flex items-center">
            <div className="w-full p-8 sm:p-12 lg:p-16 flex flex-col gap-6 text-white max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                Related insight
              </p>

              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-white/80">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white">
                  {topicLabel}
                </span>
                <span className="flex items-center gap-2 text-white/70">
                  <span>{current.publishedAt}</span>
                  <span className="opacity-60">•</span>
                  <span>{current.readTime} min read</span>
                </span>
                {resources.length > 1 && (
                  <span className="text-[11px] text-white/60">
                    Insight {activeIndex + 1} of {resources.length}
                  </span>
                )}
              </div>

              <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-[40px] leading-tight">
                {current.title}
              </h3>

              <p className="hidden sm:block text-base sm:text-lg text-white/85">
                {current.excerpt}
              </p>

              <div className="mt-2">
                <Link
                  href={`/resources/${current.slug}`}
                  className="inline-flex items-center gap-2 text-white text-sm font-medium hover:text-accent-primary transition-colors"
                >
                  Read next
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {resources.length > 1 && (
              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex">
                <button
                  type="button"
                  onClick={handleNext}
                  className="h-12 w-12 rounded-full border border-white/40 bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  aria-label="Next related insight"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  );
};

export default RelatedInsightsSlider;
