"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getFeaturedResources,
  getPrimaryTopicLabelForResource,
  type Resource,
} from "@/lib/resources/data";

type SectionProps = Omit<React.ComponentPropsWithoutRef<"section">, "resource">;

export interface FeaturedResourceHeroProps extends SectionProps {
  resource?: Resource;
}

const FeaturedResourceHero: React.FC<FeaturedResourceHeroProps> = ({
  className,
  resource,
  ...props
}) => {
  const featured = resource ?? getFeaturedResources()[0];

  if (!featured) return null;

  const topicLabel = getPrimaryTopicLabelForResource(featured) ?? featured.category;

  return (
    <section
      className={cn(className)}
      {...props}
    >
      <div className="w-full max-w-[1140px] mx-auto px-6 md:px-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-primary">
              Featured
            </p>
            <h2 className="font-heading font-black text-primary text-2xl sm:text-3xl tracking-tight">
              Spotlight insight
            </h2>
          </div>
        </div>

        <article className="relative overflow-hidden rounded-[32px] bg-card shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
            {/* Image */}
            <div className="relative min-h-[260px] sm:min-h-[320px] lg:min-h-[420px]">
              <Image
                src={featured.coverImage}
                alt={featured.title}
                fill
                priority
                className="object-cover"
              />

              {/* Gradient overlay on left side for legible text */}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/65 via-black/40 to-transparent" />

              {/* Content overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10 flex flex-col gap-4 text-white">
                <div className="inline-flex items-center gap-2 text-xs font-medium text-white/80">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur">
                    <span className="mr-1 inline-block h-1 w-1 rounded-full bg-accent-primary" />
                    {topicLabel}
                  </span>
                  <span className="text-white/70">
                    {featured.publishedAt} · {featured.readTime} min read
                  </span>
                </div>

                <h3 className="font-heading font-black text-xl sm:text-2xl lg:text-[30px] leading-tight max-w-2xl">
                  {featured.title}
                </h3>

                <p className="hidden sm:block text-sm sm:text-base text-white/80 max-w-xl">
                  {featured.excerpt}
                </p>

                <div className="mt-2 flex items-center gap-4">
                  <Link
                    href={`/resources/${featured.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white text-primary px-4 py-2 text-sm font-semibold shadow-sm hover:bg-accent-primary hover:text-white transition-colors"
                  >
                    Read article
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    type="button"
                    className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white/80 hover:bg-white/10 transition-colors"
                    aria-label="Previous featured article"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white/80 hover:bg-white/10 transition-colors"
                    aria-label="Next featured article"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right column: author + short meta (desktop only) */}
            <div className="hidden lg:flex flex-col justify-between p-8">
              <div className="space-y-4">
                <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary/50">
                  About this insight
                </p>
                <p className="text-sm text-primary/75 leading-relaxed">
                  Get a concise breakdown of one of the key growth plays we use with ambitious credit
                  unions. This featured piece pulls out the signal from the noise so your team can act
                  quickly and confidently.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-accent-primary/15 flex items-center justify-center text-xs font-bold text-accent-primary border border-accent-primary/20">
                  {featured.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary">
                    {featured.author.name}
                  </p>
                  <p className="text-xs text-primary/60">
                    {featured.author.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default FeaturedResourceHero;
