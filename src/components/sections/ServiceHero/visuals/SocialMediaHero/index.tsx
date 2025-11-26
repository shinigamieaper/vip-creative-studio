"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface SocialMediaHeroProps extends React.ComponentPropsWithoutRef<"div"> {}

const SocialMediaHero: React.FC<SocialMediaHeroProps> = ({ className = "", ...props }) => {
  return (
    <div className={cn("relative h-full w-full bg-linear-to-br from-accent-secondary/10 to-primary/5", className)} {...props}>
      <div className="absolute inset-0 p-6 sm:p-8 lg:p-12 grid grid-cols-2 gap-3">
        {[1,2,3,4].map((i) => (
          <div key={i} className="aspect-square rounded-xl border border-standard bg-card/60 backdrop-blur-sm" />
        ))}
      </div>
      <div className="absolute top-6 left-6 rounded-md px-3 py-1 text-xs border border-standard bg-card/70 backdrop-blur-sm text-primary">
        CTR ↑ 12%
      </div>
    </div>
  );
};

export default SocialMediaHero;
