"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { getResourceTypeLabel, getPrimaryTopicLabelForResource, type Resource } from "@/lib/resources/data";

export interface ResourceCardProps
  extends Omit<React.ComponentPropsWithoutRef<"article">, "resource"> {
  resource: Resource;
  featured?: boolean;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  className,
  resource,
  featured = false,
  ...props
}) => {
  const topicLabel = getPrimaryTopicLabelForResource(resource) ?? resource.category;

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-[24px] border border-standard transition-all duration-300 h-full",
        "shadow-[0_4px_16px_rgba(15,23,42,0.08)]",
        "hover:shadow-[0_8px_30px_rgba(15,23,42,0.16)]",
        "hover:-translate-y-2 hover:border-accent-primary/30",
        className
      )}
      {...props}
    >
      <Link href={`/resources/${resource.slug}`} className="block h-full">
        {/* Featured badge */}
        {featured && resource.featured && (
          <div className="absolute top-4 left-4 z-20">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent-primary text-background text-xs font-bold rounded-full shadow-[0_4px_12px_rgba(15,23,42,0.2)]">
              Featured
            </span>
          </div>
        )}

        <div
          className={cn(
            "relative h-full overflow-hidden bg-accent-primary/5",
            featured ? "aspect-video" : "aspect-4/3"
          )}
        >
          {resource.coverImage ? (
            <Image
              src={resource.coverImage}
              alt={resource.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                // Fallback for missing images
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                if (target.parentElement) {
                  target.parentElement.classList.add(
                    "bg-linear-to-br",
                    "from-accent-primary/10",
                    "to-accent-secondary/10"
                  );
                }
              }}
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-accent-primary/10 to-accent-secondary/10 flex items-center justify-center">
              <span className="text-4xl opacity-50">📄</span>
            </div>
          )}

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/10" />

          {/* Text overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 gap-3">
            {/* Category & Type */}
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="inline-flex items-center px-3 py-1 bg-white/10 text-white text-xs font-semibold rounded-full border border-white/25">
                {topicLabel}
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-white/5 text-white/85 text-xs font-medium rounded-full border border-white/20">
                {getResourceTypeLabel(resource.type)}
              </span>
            </div>

            {/* Title */}
            <h3
              className={cn(
                "font-heading font-bold text-white mb-1 line-clamp-2 transition-colors duration-300",
                featured ? "text-xl sm:text-2xl leading-tight" : "text-lg leading-tight"
              )}
            >
              {resource.title}
            </h3>

            {/* Excerpt */}
            <p
              className={cn(
                "text-white/80 line-clamp-2 leading-relaxed",
                featured ? "text-base" : "text-sm"
              )}
            >
              {resource.excerpt}
            </p>

            {/* Author and metadata */}
            <div className="flex items-center justify-between gap-3 mt-3">
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                {/* Author avatar */}
                {resource.author.avatar ? (
                  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-white/25 bg-white/10">
                    <Image
                      src={resource.author.avatar}
                      alt={resource.author.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0 border border-white/25">
                    {resource.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-xs text-white truncate">
                    {resource.author.name}
                  </div>
                  <div className="text-[11px] text-white/70 truncate">{resource.author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-white/80 shrink-0">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {resource.publishedAt}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ResourceCard;
