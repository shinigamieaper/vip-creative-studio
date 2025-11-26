"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface AnalyticsHeroProps extends React.ComponentPropsWithoutRef<"div"> {}

const AnalyticsHero: React.FC<AnalyticsHeroProps> = ({ className = "", ...props }) => {
  return (
    <div className={cn("relative h-full w-full bg-linear-to-br from-accent-primary/5 to-accent-secondary/5", className)} {...props}>
      <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--text-primary)/0.04)_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="relative h-full w-full p-6 sm:p-8 lg:p-12 grid grid-cols-6 gap-3 items-end">
        {[30,50,70,45,85,60,90,55,75,35,65,80].map((h, i) => (
          <div key={i} className="bg-accent-primary/30 rounded-t border border-standard" style={{ height: `${h}%` }} />
        ))}
        <div className="absolute right-6 top-6 rounded-xl border border-standard bg-card/70 backdrop-blur-sm px-4 py-2 text-xs text-primary">
          Session Growth ↑ 24%
        </div>
      </div>
    </div>
  );
};

export default AnalyticsHero;

