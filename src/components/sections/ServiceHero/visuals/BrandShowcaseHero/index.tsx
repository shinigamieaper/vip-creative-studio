"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface BrandShowcaseHeroProps extends React.ComponentPropsWithoutRef<"div"> {}

const BrandShowcaseHero: React.FC<BrandShowcaseHeroProps> = ({ className = "", ...props }) => {
  return (
    <div className={cn("relative h-full w-full bg-linear-to-br from-accent-primary/10 to-primary/5", className)} {...props}>
      <div className="absolute inset-0 grid grid-cols-3 gap-4 p-6 sm:p-8 lg:p-12">
        {[1,2,3,4,5,6].map((i) => (
          <div key={i} className="rounded-xl border border-standard bg-card/60 backdrop-blur-sm h-24 sm:h-28 lg:h-32" />
        ))}
      </div>
    </div>
  );
};

export default BrandShowcaseHero;
