"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface SEOContentHeatHeroProps extends React.ComponentPropsWithoutRef<"div"> {}

const SEOContentHeatHero: React.FC<SEOContentHeatHeroProps> = ({ className = "", ...props }) => {
  return (
    <div className={cn("relative h-full w-full bg-linear-to-br from-accent-secondary/10 to-accent-primary/10", className)} {...props}>
      <div className="absolute inset-0 p-6 sm:p-8 lg:p-12 grid grid-cols-6 gap-1">
        {Array.from({ length: 60 }).map((_, i) => (
          <div key={i} className="aspect-square rounded bg-primary/5" />
        ))}
      </div>
      <div className="absolute top-6 right-6 rounded-md px-3 py-1 text-xs border border-standard bg-card/70 backdrop-blur-sm text-primary">
        Top Keywords ↑
      </div>
    </div>
  );
};

export default SEOContentHeatHero;
