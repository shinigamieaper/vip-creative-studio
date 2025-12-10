'use client';

import React from 'react';
import { PrimaryCtaButton, ContainerTextFlip, BlurText } from '@/components';
import { ArrowRight } from 'lucide-react';

export interface HomepageHeroProps
  extends React.ComponentPropsWithoutRef<'section'> {
  heroEyebrow?: string;
  heroTitle?: string;
  heroFlipWords?: string[];
  heroSubtitle?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}

const defaultFlipWords = [
  'measurable member growth.',
  'higher loan growth.',
  'increased deposits.',
  'stronger member retention.',
  'proven marketing ROI.',
];

const HomepageHero: React.FC<HomepageHeroProps> = ({
  className = '',
  heroTitle,
  heroFlipWords,
  heroSubtitle,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  ...props
}) => {
  const resolvedHeroTitle =
    heroTitle ?? 'VIP Creative Studio, your fractional partner for';
  const resolvedFlipWords =
    heroFlipWords && heroFlipWords.length > 0 ? heroFlipWords : defaultFlipWords;
  const resolvedSubtitle =
    heroSubtitle ??
    'We cut through the complexity of credit union marketing, delivering quantifiable results by becoming a seamless extension of your team.';
  const resolvedPrimaryLabel = primaryCtaLabel ?? 'Book a Discovery Call';
  const resolvedPrimaryHref = primaryCtaHref ?? '/contact';
  const resolvedSecondaryLabel = secondaryCtaLabel ?? 'Our Partnership Models';
  const resolvedSecondaryHref = secondaryCtaHref ?? '/our-partnership-model';

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
          {/* Content */}
          <div className="text-center">
            <h1 className="h1 mb-6 max-w-6xl mx-auto flex flex-wrap justify-center items-baseline gap-x-2 text-balance">
              <BlurText
                text={resolvedHeroTitle}
                animateBy="words"
                as="span"
                className="text-primary"
              />
              <ContainerTextFlip
                words={resolvedFlipWords}
                interval={3500}
                animationDuration={700}
                unstyled
                extraWidth={0}
                allowWrap
                className="align-baseline text-accent-primary block w-full text-center whitespace-normal wrap-break-word sm:inline-block sm:w-auto sm:whitespace-nowrap sm:break-normal"
                textClassName="text-accent-primary"
              />
            </h1>

            <p className="subtext-large text-primary/80 max-w-[680px] mx-auto mb-10">
              {resolvedSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
              <PrimaryCtaButton shimmer shimmerGradient withArrow asChild>
                <a href={resolvedPrimaryHref}>{resolvedPrimaryLabel}</a>
              </PrimaryCtaButton>

              <PrimaryCtaButton
                asChild
                shimmer
                variant="inverted"
                withArrow
              >
                <a href={resolvedSecondaryHref}>{resolvedSecondaryLabel}</a>
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

export default HomepageHero;
