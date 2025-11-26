"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface AcquisitionFunnelHeroProps extends React.ComponentPropsWithoutRef<"div"> {}

const AcquisitionFunnelHero: React.FC<AcquisitionFunnelHeroProps> = ({ className = "", ...props }) => {
  return (
    <div className={cn("relative h-full w-full bg-linear-to-br from-accent-primary/10 to-primary/5", className)} {...props}>
      <div className="absolute inset-0 p-6 sm:p-8 lg:p-12 grid grid-cols-4 gap-4 items-end">
        {[50,70,90,60].map((h, i) => (
          <div key={i} className="rounded-t bg-accent-primary/30 border border-standard" style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="absolute bottom-6 right-6 rounded-md px-3 py-1 text-xs border border-standard bg-card/70 backdrop-blur-sm text-primary">
        CPA ↓ 18%
      </div>
    </div>
  );
};

export default AcquisitionFunnelHero;
