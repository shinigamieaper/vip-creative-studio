"use client";

import React from "react";
import { BlurText, PrimaryCtaButton } from "@/components";
import { cn } from "@/lib/utils";

export interface ServiceHeroProps extends React.ComponentPropsWithoutRef<"section"> {
  eyebrow?: string;
  headline: string | React.ReactNode;
  subtext?: string;
  Visual?: React.ComponentType<React.ComponentPropsWithoutRef<"div">>;
  primaryCta?: { text: string; href?: string };
  secondaryCta?: { text: string; href?: string };
}

const ServiceHero: React.FC<ServiceHeroProps> = ({
  className = "",
  eyebrow,
  headline,
  subtext,
  Visual,
  primaryCta,
  secondaryCta,
  ...props
}) => {
  return (
    <section className={cn("py-24", className)} {...props}>
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="relative overflow-hidden rounded-[40px] border border-standard bg-card h-[360px] sm:h-[440px] lg:h-[560px] shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-shadow duration-300">
          <div className="absolute inset-0 min-w-0">
            {Visual ? (
              <Visual className="h-full w-full" />
            ) : (
              <div className="h-full w-full bg-linear-to-br from-accent-primary/10 to-accent-secondary/10" />
            )}
          </div>
          <div className="absolute inset-0 pointer-events-none bg-linear-to-br from-background/40 to-background/10" />
          <div className="relative z-10 max-w-3xl p-6 sm:p-8 lg:p-12 text-center lg:text-left">
            {eyebrow && (
              <div className="text-xs uppercase tracking-wide text-primary/60 font-medium mb-3">{eyebrow}</div>
            )}
            <h1 className="h1 text-primary mb-5">
              {typeof headline === "string" ? (
                <BlurText text={headline} animateBy="words" as="span" className="text-primary" />
              ) : (
                headline
              )}
            </h1>
            {subtext && (
              <p className="subtext-large text-primary/80 max-w-[680px] mx-auto lg:mx-0 mb-8">{subtext}</p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
              {primaryCta && (
                <PrimaryCtaButton shimmer withArrow asChild>
                  <a href={primaryCta.href ?? "#"}>{primaryCta.text}</a>
                </PrimaryCtaButton>
              )}
              {secondaryCta && (
                <PrimaryCtaButton shimmer variant="inverted" withArrow asChild>
                  <a href={secondaryCta.href ?? "#"}>{secondaryCta.text}</a>
                </PrimaryCtaButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;

