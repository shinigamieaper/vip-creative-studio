"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface EmailMarketingHeroProps extends React.ComponentPropsWithoutRef<"div"> {}

const EmailMarketingHero: React.FC<EmailMarketingHeroProps> = ({ className = "", ...props }) => {
  return (
    <div className={cn("relative h-full w-full bg-linear-to-br from-primary/5 to-accent-primary/10", className)} {...props}>
      <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--text-primary)/0.05)_1px,transparent_1px)] [background-size:20px_20px]" />
      <div className="relative h-full w-full p-6 sm:p-8 lg:p-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {[1,2,3,4].map((i) => (
            <div key={i} className="rounded-xl border border-standard bg-card/60 backdrop-blur-sm p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-md bg-accent-primary/20 border border-standard" />
              <div className="space-y-2 flex-1">
                <div className="h-2.5 rounded bg-primary/10 w-2/3" />
                <div className="h-2 rounded bg-primary/5 w-4/5" />
                <div className="h-2 rounded bg-primary/5 w-3/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmailMarketingHero;

