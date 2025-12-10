'use client';

import React from 'react';
import Link from 'next/link';
import { BlurText, PrimaryCtaButton } from '@/components';
import { Users, Target, Zap, BarChart3 } from 'lucide-react';
import FeatureCard from '@/components/shared/FeatureCard';

export interface WhyChooseUsItem {
  eyebrow?: string;
  title?: string;
  description?: string;
  iconKey?: string;
}

export interface WhyChooseUsHighlightCard {
  eyebrow?: string;
  title?: string;
  body?: string;
  statLabel?: string;
  statValue?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface WhyChooseUsProps extends React.ComponentPropsWithoutRef<'section'> {
  title?: string;
  subtitle?: string;
  items?: WhyChooseUsItem[];
  highlightCard?: WhyChooseUsHighlightCard;
}

const defaultTitle =
  'Why VIP Creative Studio is the right choice for growth-focused financial institutions';

const defaultItems: WhyChooseUsItem[] = [
  {
    title: 'Strategic Vision',
    description:
      "We don't just execute tasks; we align every creative decision with your long-term business goals for sustainable growth.",
    iconKey: 'strategy',
  },
  {
    title: 'Data-Driven Insights',
    description:
      'Our approach combines creativity with rigorous analytics, ensuring your campaigns perform as good as they look.',
    iconKey: 'data',
  },
  {
    title: 'Comprehensive Capabilities',
    description:
      'From brand identity and high-end production to performance marketing and automation—we cover the entire digital ecosystem under one roof.',
    iconKey: 'capabilities',
  },
];

const defaultHighlight: WhyChooseUsHighlightCard = {
  title: 'Flexible Partnership Models',
  body:
    'Whether you need an embedded team or focused project execution, we adapt to your rhythm. Get senior-level expertise without the agency bloat.',
  ctaLabel: 'Book a Discovery Call',
  ctaHref: '/contact',
};

const getIconForItem = (item: WhyChooseUsItem, index: number) => {
  const key = item.iconKey?.toLowerCase();

  if (key === 'strategy') {
    return <Users className="h-6 w-6 text-accent-primary" />;
  }
  if (key === 'data') {
    return <BarChart3 className="h-6 w-6 text-accent-primary" />;
  }
  if (key === 'capabilities') {
    return <Zap className="h-6 w-6 text-accent-primary" />;
  }

  // Fallback to original mapping by index
  if (index === 0) {
    return <Users className="h-6 w-6 text-accent-primary" />;
  }
  if (index === 1) {
    return <BarChart3 className="h-6 w-6 text-accent-primary" />;
  }
  return <Zap className="h-6 w-6 text-accent-primary" />;
};

const WhyChooseUs: React.FC<WhyChooseUsProps> = ({
  className = '',
  title,
  subtitle,
  items,
  highlightCard,
  ...props
}) => {
  const resolvedTitle = title ?? defaultTitle;
  const resolvedItemsSource = items && items.length > 0 ? items : defaultItems;
  const mergedItems: WhyChooseUsItem[] = [0, 1, 2].map((index) => {
    const source = resolvedItemsSource[index] ?? {};
    const fallback = defaultItems[index];
    return {
      eyebrow: source.eyebrow ?? fallback.eyebrow,
      title: source.title ?? fallback.title,
      description: source.description ?? fallback.description,
      iconKey: source.iconKey ?? fallback.iconKey,
    };
  });

  const resolvedHighlight: WhyChooseUsHighlightCard = {
    eyebrow: highlightCard?.eyebrow ?? defaultHighlight.eyebrow,
    title: highlightCard?.title ?? defaultHighlight.title,
    body: highlightCard?.body ?? defaultHighlight.body,
    statLabel: highlightCard?.statLabel ?? defaultHighlight.statLabel,
    statValue: highlightCard?.statValue ?? defaultHighlight.statValue,
    ctaLabel: highlightCard?.ctaLabel ?? defaultHighlight.ctaLabel,
    ctaHref: highlightCard?.ctaHref ?? defaultHighlight.ctaHref,
  };

  const titleWords = resolvedTitle.split(' ').filter(Boolean);
  const accentWordCount = Math.min(5, Math.max(1, titleWords.length));
  const accentWords = titleWords.slice(-accentWordCount).join(' ');
  const baseWords = titleWords.slice(0, -accentWordCount).join(' ');

  return (
    <section className={`py-24 px-4 ${className}`} {...props}>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="h2 text-primary max-w-4xl mx-auto">
            {baseWords && (
              <BlurText
                as="span"
                text={baseWords}
                className="inline"
                textClassName="text-primary"
                delay={30}
                animateBy="words"
                direction="top"
              />
            )}
            {accentWords && (
              <span className="text-accent-primary">
                {baseWords ? ' ' : ''}
                {accentWords}
              </span>
            )}
          </h2>
          {subtitle && (
            <p className="subtext-large text-primary/80 max-w-[640px] mx-auto mt-4">
              {subtitle}
            </p>
          )}
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column (Spans 2 cols) */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 content-start">
            {/* Card 1 */}
            <FeatureCard
              title={mergedItems[0]?.title ?? defaultItems[0].title ?? ''}
              description={mergedItems[0]?.description ?? defaultItems[0].description}
              icon={getIconForItem(mergedItems[0] ?? defaultItems[0], 0)}
              accent="primary"
              borderless
              variant="flat"
              className="h-full"
            />

            {/* Card 2 */}
            <FeatureCard
              title={mergedItems[1]?.title ?? defaultItems[1].title ?? ''}
              description={mergedItems[1]?.description ?? defaultItems[1].description}
              icon={getIconForItem(mergedItems[1] ?? defaultItems[1], 1)}
              accent="primary"
              borderless
              variant="flat"
              colorVariant="orange"
              className="h-full"
            />

            {/* Card 3 (Wide) */}
            <FeatureCard
              title={mergedItems[2]?.title ?? defaultItems[2].title ?? ''}
              description={mergedItems[2]?.description ?? defaultItems[2].description}
              icon={getIconForItem(mergedItems[2] ?? defaultItems[2], 2)}
              accent="primary"
              borderless
              variant="flat"
              className="md:col-span-2 h-full"
            />
          </div>

          {/* Right Column (Highlight Card) */}
          <div className="lg:col-span-1">
            <article className="h-full flex flex-col justify-between rounded-[40px] p-8 lg:p-10 highlight-teal-card relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  
                  <h3 className="h3 text-primary mb-4">
                    {resolvedHighlight.title ?? 'Flexible Partnership Models'}
                  </h3>
                  
                  <p className="body-default text-primary/80 mb-8">
                    {resolvedHighlight.body ?? defaultHighlight.body}
                  </p>
                  
                  <ul className="space-y-3 text-primary/70 body-small mb-8">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white" />
                      <span>Month-to-month agility</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white" />
                      <span>Direct access to senior partners</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white" />
                      <span>Transparent reporting</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-auto flex justify-center">
                  <PrimaryCtaButton
                    variant="whiteTeal"
                    className="rounded-full h-14 px-6 text-base font-medium"
                    shimmer
                    shimmerGradient={false}
                    withArrow
                    asChild
                  >
                    <Link href={resolvedHighlight.ctaHref ?? defaultHighlight.ctaHref!}>
                      {resolvedHighlight.ctaLabel ?? defaultHighlight.ctaLabel}
                    </Link>
                  </PrimaryCtaButton>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
