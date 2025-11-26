'use client';

import React from 'react';
import { PrimaryCtaButton, BlurText } from '@/components';

export interface ResourcesHeroProps extends React.ComponentPropsWithoutRef<'section'> {}

const ResourcesHero: React.FC<ResourcesHeroProps> = ({ className = '', ...props }) => {
  return (
    <section className={`min-h-screen flex items-center py-10 sm:py-16 ${className}`} {...props}>
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="relative overflow-hidden rounded-[40px] border border-standard bg-card p-6 sm:p-8 lg:p-12 shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-shadow duration-300">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-20%,hsl(var(--accent-primary)/0.04),transparent_60%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_80%_120%,hsl(var(--accent-secondary)/0.03),transparent_60%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--text-primary)/0.03)_1px,transparent_1px)] bg-size-[20px_20px] opacity-[0.4]"></div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-1 gap-12 lg:gap-16 items-center">
              <div className="text-center">
                <h1 className="h1 mb-6 max-w-6xl mx-auto flex flex-wrap justify-center items-baseline gap-x-2 text-balance">
                  <BlurText
                    text="Resources to"
                    animateBy="words"
                    as="span"
                    className="text-primary"
                    textClassName="text-primary"
                  />
                  <BlurText
                    text="Fuel Your Growth"
                    animateBy="words"
                    as="span"
                    className="text-accent-primary"
                    textClassName="text-accent-primary"
                  />
                </h1>

                <p className="subtext-large text-primary/80 max-w-[680px] mx-auto mb-10">
                  Explore our collection of insights, guides, and tools designed to help credit unions navigate modern marketing challenges and drive measurable results.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
                  <PrimaryCtaButton shimmer shimmerGradient withArrow>
                    Book a Discovery Call
                  </PrimaryCtaButton>

                  <PrimaryCtaButton asChild shimmer variant="inverted" withArrow>
                    <a href="/contact">Get in Touch</a>
                  </PrimaryCtaButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesHero;
