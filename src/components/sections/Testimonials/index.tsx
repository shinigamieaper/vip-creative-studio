"use client";

import React, { useEffect, useState, useRef } from 'react';
import BlurText from '@/components/shared/BlurText';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { urlFor } from '@/lib/sanity/image';

interface SuccessMetric {
  label: string;
  value: string;
  description?: string;
  chartType?: 'line' | 'area' | 'radial' | 'none';
  chartData?: any[];
  targetValue?: number;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
  metrics?: SuccessMetric[];
  successStoryUrl?: string;
}

interface TestimonialProps extends React.ComponentPropsWithoutRef<'section'> {
  testimonials?: Testimonial[];
  sanityTestimonials?: any[];
}

type TestimonialVariant = 'teal' | 'orange' | 'black';

const VARIANT_SEQUENCE: TestimonialVariant[] = ['teal', 'orange', 'black'];

interface TestimonialCardProps {
  testimonial: Testimonial;
  variant: TestimonialVariant;
  layout: 'hero' | 'single' | 'small';
}

const CountUp: React.FC<{ value: string; className?: string }> = ({ value, className }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Parse the metric value to extract number, prefix, and suffix
  const parseValue = (val: string) => {
    const match = val.match(/^([+\-]?)([\d.]+)([%xX]?.*)?$/);
    if (match) {
      return {
        prefix: match[1] || '',
        number: parseFloat(match[2]),
        suffix: match[3] || '',
      };
    }
    return { prefix: '', number: 0, suffix: val };
  };

  const { prefix, number, suffix } = parseValue(value);

  useEffect(() => {
    if (!isInView) return;

    const duration = 800; // 0.8 seconds - fast count-up
    const steps = 40;
    const increment = number / steps;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= number) {
        setCount(number);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, number]);

  const formatNumber = (num: number) => {
    // Preserve decimal places if original number had them
    const decimalPlaces = value.includes('.') ? value.split('.')[1]?.match(/\d+/)?.[0]?.length || 0 : 0;
    return num.toFixed(decimalPlaces);
  };

  return (
    <div ref={ref} className={className}>
      {prefix}{formatNumber(count)}{suffix}
    </div>
  );
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, variant, layout }) => {
  const primaryMetric = testimonial.metrics?.[0];

  const isTeal = variant === 'teal';
  const isOrange = variant === 'orange';
  const isBlack = variant === 'black';

  const borderColorClass = isBlack || isTeal || isOrange ? 'border-transparent' : 'border-standard';

  const metricColorClasses =
    isBlack
      ? 'text-primary-foreground'
      : isTeal || isOrange
      ? 'text-primary'
      : 'text-accent-primary';

  const labelColorClasses = isBlack ? 'text-primary-foreground/80' : 'text-primary/80';
  const descriptionColorClasses = isBlack ? 'text-primary-foreground/70' : 'text-primary/60';
  const bodyTextClasses = isBlack ? 'text-primary-foreground' : 'text-primary';
  const quoteMarkClasses = isBlack
    ? 'text-primary-foreground/40'
    : isTeal
    ? 'text-accent-secondary/40'
    : 'text-accent-primary/25';
  const avatarBgClasses = isBlack
    ? 'bg-background'
    : isTeal
    ? 'bg-accent-secondary/15'
    : isOrange
    ? 'bg-accent-primary/15'
    : 'bg-accent-primary/10';
  const nameColorClasses = isBlack ? 'text-primary-foreground' : 'text-primary';
  const roleColorClasses = isBlack ? 'text-primary-foreground/70' : 'text-primary/60';
  const linkColorClasses = isBlack
    ? 'text-primary-foreground'
    : isTeal || isOrange
    ? 'text-primary'
    : 'text-accent-primary';

  const cardStyle: React.CSSProperties | undefined = isBlack
    ? { backgroundColor: 'hsl(var(--text-primary))' }
    : isTeal
    ? { backgroundColor: 'hsl(var(--accent-secondary))' }
    : isOrange
    ? { backgroundColor: 'hsl(var(--accent-primary))' }
    : undefined;

  const cardTextClass = isBlack ? 'text-primary-foreground' : 'text-primary';

  const layoutClasses =
    layout === 'hero'
      ? 'md:row-span-2 min-h-[420px] lg:min-h-[460px] lg:p-10'
      : layout === 'single'
      ? 'min-h-[320px] md:min-h-[380px]'
      : 'h-[340px]';

  return (
    <article
      style={cardStyle}
      className={`relative overflow-hidden rounded-[32px] border p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow ${cardTextClass} ${borderColorClass} ${layoutClasses}`}
    >
      <div className="relative z-10 space-y-6">
        {primaryMetric && (
          <div className="space-y-1">
            <CountUp 
              value={primaryMetric.value} 
              className={`text-4xl md:text-5xl font-heading font-black ${metricColorClasses}`}
            />
            <p className={`body-small font-heading ${labelColorClasses}`}>
              {primaryMetric.label}
            </p>
            {primaryMetric.description && (
              <p className={`body-small ${descriptionColorClasses}`}>
                {primaryMetric.description}
              </p>
            )}
          </div>
        )}

        <blockquote className="relative">
          <span className={`absolute -top-4 left-0 text-4xl font-heading leading-none select-none ${quoteMarkClasses}`}>
            "
          </span>
          <p className={`body-default pl-5 ${bodyTextClasses}`}>
            {testimonial.quote}
          </p>
        </blockquote>
      </div>

      <div className="relative z-10 mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`h-12 w-12 rounded-full overflow-hidden ${avatarBgClasses}`}>
            <img
              src={testimonial.image}
              alt={`${testimonial.name} headshot`}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className={`text-sm font-heading font-semibold ${nameColorClasses}`}>
              {testimonial.name}
            </p>
            <p className={`text-xs ${roleColorClasses}`}>
              {testimonial.role} at {testimonial.company}
            </p>
          </div>
        </div>

        {testimonial.successStoryUrl && (
          <a
            href={testimonial.successStoryUrl}
            className={`text-xs md:text-sm font-heading underline-offset-4 hover:underline ${linkColorClasses}`}
          >
            See how we did it
          </a>
        )}
      </div>
    </article>
  );
};

const getStaticVariantForIndex = (index: number, total: number): TestimonialVariant => {
  if (total === 1) {
    return 'teal';
  }

  return VARIANT_SEQUENCE[index % VARIANT_SEQUENCE.length];
};

const dropInVariants = {
  initial: { y: -300, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 300, opacity: 0 },
};

const slideInVariants = {
  initial: { x: 300, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -300, opacity: 0 },
};

const testimonialTransition = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 25,
  mass: 0.8,
};

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Patrick Nwankwo",
    role: "UX Manager",
    company: "Superhabits",
    quote:
      "The team at VIP Creative Studio has provided our startup with exceptional leverage. Their work is exceptionally professional, and they are always attentive to our needs, taking the time to understand our briefs and offer valuable direction. Additionally, their turnaround times are impressively fast!",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&h=720&q=80",
    metrics: [
      {
        label: "User Engagement",
        value: "+180%",
        description: "Increase in active users",
        chartType: "none",
      },
    ],
    successStoryUrl: "/success-stories/superhabits",
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    role: "Marketing Director",
    company: "FinTech Solutions",
    quote:
      "Working with VIP Creative Studio transformed our brand presence. Their strategic approach to marketing and design helped us achieve a 40% increase in member engagement within just three months. They truly understand the financial services industry.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&h=720&q=80",
    metrics: [
      {
        label: "ROI Increase",
        value: "340%",
        description: "Return on marketing investment",
        chartType: "none",
      },
    ],
    successStoryUrl: "/success-stories/fintech-solutions",
  },
  {
    id: 3,
    name: "Tom Becker",
    role: "Founder",
    company: "PulseCore",
    quote:
      "Their animation work took our product videos to the next level. The team truly understands user experience and storytelling.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=600&q=80",
    metrics: [
      {
        label: "Video Engagement",
        value: "98%",
        description: "Average completion rate on key campaigns",
        chartType: "none",
      },
    ],
    successStoryUrl: "/success-stories/pulsecore",
  },
  {
    id: 4,
    name: "Lisa Gomez",
    role: "Head of Growth",
    company: "NovaBank",
    quote:
      "VIP Creative Studio helped us turn a very dry product into something members actually get excited about. The campaigns feel premium but still very human.",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=600&h=720&q=80",
    metrics: [
      {
        label: "Lead Conversion",
        value: "+72%",
        description: "Increase in qualified demo requests",
        chartType: "none",
      },
    ],
    successStoryUrl: "/success-stories/novabank",
  },
  {
    id: 5,
    name: "David Okafor",
    role: "Digital Strategy Lead",
    company: "UnionTrust Credit",
    quote:
      "They gave us a clear story for every campaign and made complex data feel simple. Our team finally has creative that actually keeps up with our roadmap.",
    image:
      "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=crop&w=600&h=720&q=80",
    metrics: [
      {
        label: "Campaign Efficiency",
        value: "2.3x",
        description: "Lift in cross-sell campaign ROI",
        chartType: "none",
      },
    ],
    successStoryUrl: "/success-stories/uniontrust-credit",
  },
  {
    id: 6,
    name: "Aisha Khan",
    role: "Product Marketing Lead",
    company: "CloudLedger",
    quote:
      "From landing pages to launch videos, everything feels on-brand and intentional. It’s like having an in-house creative team that already understands SaaS.",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb0b90cffc6?auto=format&fit=crop&w=600&h=720&q=80",
    metrics: [
      {
        label: "Launch Velocity",
        value: "4 weeks",
        description: "Time to ship a full GTM campaign",
        chartType: "none",
      },
    ],
    successStoryUrl: "/success-stories/cloudledger",
  },
];

const Testimonials: React.FC<TestimonialProps> = ({
  className = '',
  testimonials = defaultTestimonials,
  sanityTestimonials,
  ...props
}) => {
  const [rotationStep, setRotationStep] = useState(0);

  const resolvedTestimonials: Testimonial[] =
    sanityTestimonials && Array.isArray(sanityTestimonials) && sanityTestimonials.length > 0
      ? sanityTestimonials.map((doc: any, index: number) => {
          const fallback = defaultTestimonials[index] ?? defaultTestimonials[0];
          const imageFromSanity = doc?.avatar ? urlFor(doc.avatar).url() : undefined;
          const ctaHrefFromSanity = typeof doc?.ctaHref === 'string' ? doc.ctaHref.trim() : '';

          return {
            id: index,
            name: doc?.author ?? fallback?.name ?? '',
            role: doc?.role ?? fallback?.role ?? '',
            company: doc?.company ?? fallback?.company ?? '',
            quote: doc?.quote ?? fallback?.quote ?? '',
            image: imageFromSanity ?? fallback?.image ?? '',
            metrics: fallback?.metrics,
            successStoryUrl: ctaHrefFromSanity.length > 0 ? ctaHrefFromSanity : undefined,
          };
        })
      : testimonials;

  const count = resolvedTestimonials.length;
  const hasMultiple = count > 1;
  const hasHeroLayout = count >= 3;
  const hasRotation = count > 3;

  const rotatingTestimonials = hasRotation ? resolvedTestimonials.slice(1) : [];
  const rotatingLength = rotatingTestimonials.length;

  useEffect(() => {
    if (!hasRotation || rotatingLength === 0) {
      return;
    }

    const interval = window.setInterval(() => {
      setRotationStep((prev) => prev + 1);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [hasRotation, rotatingLength]);

  const gridColsClass = !hasMultiple
    ? 'md:grid-cols-1'
    : hasHeroLayout
    ? 'md:grid-cols-2 lg:grid-cols-[1.7fr_1.3fr]'
    : 'md:grid-cols-2 lg:grid-cols-2';

  const heroTestimonial = count > 0 ? resolvedTestimonials[0] : undefined;

  const topIndex = hasRotation && rotatingLength > 0 ? rotationStep % rotatingLength : 0;
  const bottomIndex = hasRotation && rotatingLength > 0 ? (rotationStep + 1) % rotatingLength : 0;

  const topTestimonial =
    hasRotation && rotatingLength > 0
      ? rotatingTestimonials[topIndex]
      : hasHeroLayout && count >= 2
      ? resolvedTestimonials[1]
      : undefined;

  const bottomTestimonial =
    hasRotation && rotatingLength > 0
      ? rotatingTestimonials[bottomIndex]
      : hasHeroLayout && count >= 3
      ? resolvedTestimonials[2]
      : undefined;

  const getVariantForDynamicSlot = (slot: 'top' | 'bottom'): TestimonialVariant => {
    if (!hasRotation) {
      const index = slot === 'top' ? 1 : 2;
      return getStaticVariantForIndex(index, count);
    }

    const baseIndex = rotationStep + (slot === 'top' ? 0 : 1);
    return VARIANT_SEQUENCE[baseIndex % VARIANT_SEQUENCE.length];
  };

  return (
    <section
      className={`py-24 px-4 ${className}`}
      {...props}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="h2 text-primary max-w-4xl mx-auto">
            <BlurText
              as="span"
              text="Don't take it from us,"
              className="inline"
              textClassName="text-primary"
              delay={30}
              animateBy="words"
              direction="top"
            />
            {' '}
            <BlurText
              as="span"
              text="hear it from our"
              className="inline"
              textClassName="text-primary"
              delay={40}
              animateBy="words"
              direction="top"
            />
            {' '}
            <BlurText
              as="span"
              text="partners"
              className="inline"
              textClassName="text-accent-primary"
              delay={50}
              animateBy="words"
              direction="top"
            />
          </h2>
          <p className="subtext-large text-primary/80 max-w-[860px] mx-auto mt-4">
            Every testimonial pairs a story with measurable winsdive into the numbers, the strategies, and the momentum we create together.
          </p>
        </div>

        <div className={`grid gap-4 md:gap-5 ${gridColsClass}`}>
          {count === 0 ? null : !hasMultiple ? (
            heroTestimonial && (
              <TestimonialCard
                testimonial={heroTestimonial}
                variant={getStaticVariantForIndex(0, count)}
                layout="single"
              />
            )
          ) : !hasHeroLayout ? (
            <>
              <TestimonialCard
                testimonial={resolvedTestimonials[0]}
                variant={getStaticVariantForIndex(0, count)}
                layout="small"
              />
              {count >= 2 && (
                <TestimonialCard
                  testimonial={resolvedTestimonials[1]}
                  variant={getStaticVariantForIndex(1, count)}
                  layout="small"
                />
              )}
            </>
          ) : (
            <>
              {heroTestimonial && (
                <TestimonialCard
                  testimonial={heroTestimonial}
                  variant={getStaticVariantForIndex(0, count)}
                  layout="hero"
                />
              )}

              <div className="flex flex-col gap-4 md:gap-5">
                {topTestimonial &&
                  (hasRotation ? (
                    <div className="relative overflow-hidden rounded-[32px]" style={{ height: '340px' }}>
                      <AnimatePresence mode="sync" initial={false}>
                        <motion.div
                          key={topTestimonial.id}
                          className="w-full"
                          variants={dropInVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          transition={testimonialTransition}
                          style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
                        >
                          <TestimonialCard
                            testimonial={topTestimonial}
                            variant={getVariantForDynamicSlot('top')}
                            layout="small"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  ) : (
                    <TestimonialCard
                      testimonial={topTestimonial}
                      variant={getVariantForDynamicSlot('top')}
                      layout="small"
                    />
                  ))}

                {bottomTestimonial &&
                  (hasRotation ? (
                    <div className="relative overflow-hidden rounded-[32px]" style={{ height: '340px' }}>
                      <AnimatePresence mode="sync" initial={false}>
                        <motion.div
                          key={bottomTestimonial.id}
                          className="w-full"
                          variants={slideInVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          transition={testimonialTransition}
                          style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
                        >
                          <TestimonialCard
                            testimonial={bottomTestimonial}
                            variant={getVariantForDynamicSlot('bottom')}
                            layout="small"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  ) : (
                    <TestimonialCard
                      testimonial={bottomTestimonial}
                      variant={getVariantForDynamicSlot('bottom')}
                      layout="small"
                    />
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
