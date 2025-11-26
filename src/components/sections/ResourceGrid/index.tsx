"use client";

import React from "react";
import { cn } from "@/lib/utils";
import ResourceCard from "@/components/sections/ResourceCard";
import type { Resource } from "@/lib/resources/data";

export interface ResourceGridProps extends React.ComponentPropsWithoutRef<"div"> {
  resources: Resource[];
  featuredFirst?: boolean;
}

const ResourceGrid: React.FC<ResourceGridProps> = ({
  className,
  resources,
  featuredFirst = true,
  ...props
}) => {
  if (resources.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="h3 text-primary mb-2">No resources found</h3>
        <p className="text-primary/60">Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  // Separate featured and regular resources
  const featuredResources = featuredFirst 
    ? resources.filter(r => r.featured).slice(0, 2)
    : [];
  const regularResources = featuredFirst
    ? resources.filter(r => !r.featured || !featuredResources.includes(r))
    : resources;

  return (
    <div className={cn("space-y-8", className)} {...props}>
      {/* Featured Cards Row - Max 2 */}
      {featuredResources.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featuredResources.map((resource) => (
            <ResourceCard
              key={resource.slug}
              resource={resource}
              featured={true}
            />
          ))}
        </div>
      )}

      {/* Regular Cards Grid */}
      {regularResources.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {regularResources.map((resource) => (
            <ResourceCard
              key={resource.slug}
              resource={resource}
              featured={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourceGrid;
