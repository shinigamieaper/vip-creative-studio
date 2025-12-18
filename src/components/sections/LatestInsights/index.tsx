"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlurText } from "@/components";
import {
  getPrimaryTopicLabelForResource,
  type Resource,
} from "@/lib/resources/data";

export interface LatestInsightsProps
  extends React.ComponentPropsWithoutRef<"section"> {
  /** Section heading */
  heading?: string;
  accentText?: string;
  subheading?: string;
  resources?: Resource[];
  /** Show "View all" link */
  showViewAll?: boolean;
  /** Auto-rotate interval in ms (default: 8000) */
  rotateInterval?: number;
}

const LatestInsights: React.FC<LatestInsightsProps> = ({
  className,
  heading = "Latest insights",
  accentText = "from our content hub",
  subheading = "Case studies, success stories, and resources for growth-focused financial teams.",
  resources,
  showViewAll = true,
  rotateInterval = 8000,
  ...props
}) => {
  // Get featured resources - same logic as Content Hub
  const featuredResources = useMemo(() => {
    const list = resources ?? [];
    const flagged = list.filter((r) => r.featured);
    if (flagged.length > 0) return flagged;
    if (list.length === 0) return [];
    return [list[0]];
  }, [resources]);

  const [featuredIndex, setFeaturedIndex] = useState(0);

  // Reset index when featured set changes
  useEffect(() => {
    setFeaturedIndex(0);
  }, [featuredResources.length]);

  // Auto-rotate featured insights when multiple exist
  useEffect(() => {
    if (featuredResources.length <= 1) return;
    const intervalId = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredResources.length);
    }, rotateInterval);

    return () => clearInterval(intervalId);
  }, [featuredResources.length, rotateInterval]);

  const featured = featuredResources[featuredIndex] ?? null;

  if (!featured) return null;

  const topicLabel = getPrimaryTopicLabelForResource(featured) ?? featured.category;

  return (
    <section className={cn("py-20 lg:py-28", className)} {...props}>
      <div className="w-full max-w-[1140px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-8 md:mb-10">
          <div className="space-y-3 max-w-3xl">
            <h2 className="h2 text-primary">
              <BlurText
                as="span"
                text={heading}
                className="inline"
                textClassName="text-primary"
                delay={30}
                animateBy="words"
                direction="top"
              />
              {accentText && (
                <span className="text-accent-primary whitespace-nowrap">
                  {" "}
                  {accentText}
                </span>
              )}
            </h2>
            {subheading && (
              <p className="subtext-large text-primary/80 max-w-[640px] mx-auto">
                {subheading}
              </p>
            )}
          </div>

          {showViewAll && (
            <Link
              href="/resources"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-accent-primary hover:text-accent-primary/80 transition-colors mt-1 md:mt-2"
            >
              View all resources
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>

        {/* Featured Card */}
        <article className="group relative overflow-hidden rounded-[32px] border border-standard/80 transition-all duration-500 shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:border-accent-primary/40 hover:shadow-[0_10px_30px_rgba(15,23,42,0.1)]">
          <Link href={`/resources/${featured.slug}`} className="block">
            <div className="relative min-h-[360px] sm:min-h-[460px] lg:min-h-[520px]">
              {featured.coverImage ? (
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              ) : (
                <div className="absolute inset-0 bg-linear-to-br from-accent-primary/10 via-accent-secondary/10 to-accent-primary/5" />
              )}

              {/* Dark gradient overlay */}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/80 via-black/45 to-black/10" />

              {/* Content overlay */}
              <div className="absolute inset-0 flex items-center">
                <div className="w-full p-8 sm:p-12 lg:p-16 flex flex-col gap-5 text-white max-w-3xl">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-3">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur text-xs font-semibold text-white">
                      <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent-primary" />
                      {topicLabel}
                    </span>
                    <span className="text-xs text-white/70">
                      {featured.publishedAt} · {featured.readTime} min read
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-[42px] leading-tight">
                    {featured.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="hidden sm:block text-base sm:text-lg text-white/85 max-w-2xl">
                    {featured.excerpt}
                  </p>

                  {/* CTA */}
                  <div className="mt-2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white text-primary px-5 py-2.5 text-sm font-semibold shadow-sm group-hover:bg-accent-primary group-hover:text-white transition-colors">
                      Read article
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation button - right side */}
              {featuredResources.length > 1 && (
                <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden sm:flex">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setFeaturedIndex((prev) => (prev + 1) % featuredResources.length);
                    }}
                    className="h-12 w-12 rounded-full border border-white/40 bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    aria-label="Next featured article"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Pagination dots */}
              {featuredResources.length > 1 && (
                <div className="absolute bottom-6 right-6 flex items-center gap-2">
                  {featuredResources.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setFeaturedIndex(idx);
                      }}
                      className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        idx === featuredIndex
                          ? "w-6 bg-white"
                          : "w-2 bg-white/40 hover:bg-white/60"
                      )}
                      aria-label={`Go to featured article ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </Link>
        </article>
      </div>
    </section>
  );
};

export default LatestInsights;
