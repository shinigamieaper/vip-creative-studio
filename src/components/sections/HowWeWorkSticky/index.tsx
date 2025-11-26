"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Search, Lightbulb, Rocket, TrendingUp, Check } from 'lucide-react';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features?: string[];
  mockup?: React.ReactNode;
  mockupImage?: string; // CMS image URL
  tintColor: string;
}

interface ProcessStepOverride {
  title: string;
  description: string;
  features?: string[];
}

const processSteps: ProcessStep[] = [
  {
    number: '1',
    title: 'Discovery',
    description: 'Deep dive into your brand, market position, and growth objectives. We analyze competitors, identify opportunities, and define success metrics.',
    icon: <Search className="w-6 h-6" />,
    features: [
      'Comprehensive brand audit and market analysis',
      'Competitor research and gap identification',
      'Goal setting with measurable KPIs'
    ],
    tintColor: 'from-accent-secondary/10 to-transparent',
    mockup: (
      <div className="relative aspect-4/3 rounded-2xl border border-standard bg-card p-8 shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-accent-secondary/10 to-transparent" />
        <div className="relative space-y-4">
          <div className="h-4 bg-primary/10 rounded-full w-3/4 animate-pulse" />
          <div className="h-4 bg-primary/10 rounded-full w-full animate-pulse delay-75" />
          <div className="h-4 bg-primary/10 rounded-full w-5/6 animate-pulse delay-150" />
        </div>
      </div>
    )
  },
  {
    number: '2',
    title: 'Strategy',
    description: 'Craft a tailored roadmap combining creative vision with data-driven insights. Every tactic aligns with your business goals and budget.',
    icon: <Lightbulb className="w-6 h-6" />,
    features: [
      'Custom marketing roadmap with creative angles',
      'Channel selection based on audience insights',
      'Budget allocation and timeline planning'
    ],
    tintColor: 'from-accent-primary/10 to-transparent',
    mockup: (
      <div className="relative aspect-4/3 rounded-2xl border border-standard bg-card p-8 shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-accent-primary/10 to-transparent" />
        <div className="relative grid grid-cols-2 gap-4">
          <div className="h-24 bg-accent-primary/10 rounded-xl animate-pulse" />
          <div className="h-24 bg-accent-primary/10 rounded-xl animate-pulse delay-100" />
          <div className="col-span-2 h-16 bg-accent-primary/10 rounded-xl animate-pulse delay-200" />
        </div>
      </div>
    )
  },
  {
    number: '3',
    title: 'Execution',
    description: 'Launch campaigns with precision and agility. Our fractional experts integrate seamlessly with your team for maximum impact.',
    icon: <Rocket className="w-6 h-6" />,
    features: [
      'Campaign deployment across chosen channels',
      'Real-time monitoring and quick adjustments',
      'Seamless team collaboration and reporting'
    ],
    tintColor: 'from-accent-primary/10 to-transparent',
    mockup: (
      <div className="relative aspect-4/3 rounded-2xl border border-standard bg-card p-8 shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-accent-primary/10 to-transparent" />
        <div className="relative flex items-center justify-center h-full">
          <div className="w-20 h-20 rounded-full border-4 border-accent-primary/20 border-t-accent-primary animate-spin" />
        </div>
      </div>
    )
  },
  {
    number: '4',
    title: 'Optimization',
    description: 'Continuously refine based on real-time data. A/B test, iterate, and scale what works to maximize ROI and minimize waste.',
    icon: <TrendingUp className="w-6 h-6" />,
    features: [
      'Data-driven performance analysis',
      'A/B testing and iterative improvements',
      'Scaling successful campaigns for maximum ROI'
    ],
    tintColor: 'from-accent-secondary/10 to-transparent',
    mockup: (
      <div className="relative aspect-4/3 rounded-2xl border border-standard bg-card p-8 shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-accent-secondary/10 to-transparent" />
        <div className="relative space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <div className="h-3 bg-primary/10 rounded-full flex-1 animate-pulse" />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <div className="h-3 bg-primary/10 rounded-full flex-1 animate-pulse delay-100" />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <div className="h-3 bg-primary/10 rounded-full flex-1 animate-pulse delay-200" />
          </div>
        </div>
      </div>
    )
  }
];

interface HowWeWorkStickyProps extends React.ComponentPropsWithoutRef<'section'> {
  stepsOverride?: ProcessStepOverride[];
  title?: string;
  subtitle?: string;
}

const HowWeWorkSticky: React.FC<HowWeWorkStickyProps> = ({
  className = '',
  stepsOverride,
  title,
  subtitle,
  ...props
}) => {
  // Track scroll within this section to determine which card is active
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const [activeIndex, setActiveIndex] = useState(0);

  const stepsToRender: ProcessStep[] =
    stepsOverride && stepsOverride.length
      ? processSteps.map((base, index) => ({
          ...base,
          title: stepsOverride[index]?.title ?? base.title,
          description: stepsOverride[index]?.description ?? base.description,
          features: stepsOverride[index]?.features ?? base.features,
        }))
      : processSteps;

  const resolvedTitle = title ?? 'Our Process in 4 Steps';
  const resolvedSubtitle =
    subtitle ?? 'A proven approach to transform your marketing strategy';

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const steps = stepsToRender.length;
      const idx = Math.min(steps - 1, Math.max(0, Math.floor(v * steps)));
      setActiveIndex(idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress, stepsToRender.length]);

  return (
    <section className={`py-24 px-4 ${className}`} {...props}>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="h2 text-primary mb-6 text-balance">
            {resolvedTitle}
          </h2>
          <p className="subtext-large text-primary/80 max-w-[680px] mx-auto">
            {resolvedSubtitle}
          </p>
        </div>

        {/* Sticky Stack Container */}
        <div ref={containerRef} className="relative isolate" style={{ minHeight: `${stepsToRender.length * 700}px` }}>
          {stepsToRender.map((step, index) => (
            <div
              key={step.number}
              className="sticky mb-8"
              style={{ 
                top: `${4 + index * 1}rem`, 
                zIndex: index === activeIndex ? 100 : 0,
                visibility: index === activeIndex ? 'visible' : 'hidden'
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: index === activeIndex ? 1 : 0, y: index === activeIndex ? 0 : 20 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-[900px] mx-auto rounded-3xl border border-standard overflow-hidden bg-card isolate shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-shadow duration-300"
                style={{ pointerEvents: index === activeIndex ? 'auto' : 'none' }}
                aria-hidden={index !== activeIndex}
              >
                <div className={`absolute inset-0 opacity-20 bg-linear-to-br ${step.tintColor} pointer-events-none`} />
                
                <div className="relative p-6 sm:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Giant Step Number */}
                    <div className="lg:col-span-2 flex items-center justify-center">
                      <span 
                        className="text-[180px] leading-none font-heading font-black select-none opacity-40"
                        style={{
                          background: 'linear-gradient(135deg, hsl(var(--accent-primary)) 0%, hsl(var(--accent-secondary)) 50%, hsl(var(--accent-primary)) 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                      >
                        {step.number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-5">
                      {/* Icon */}
                      {/* Title */}
                      <h3 className="text-2xl sm:text-3xl font-heading font-bold tracking-tight text-primary mb-4 flex items-center gap-2">
                        <span className="text-accent-primary">{step.icon}</span>
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-base sm:text-lg text-primary/70 leading-relaxed mb-6">
                        {step.description}
                      </p>

                      {/* Features */}
                      {step.features && step.features.length > 0 && (
                        <div className="flex flex-col gap-3">
                          {step.features.map((feature, idx) => {
                            // Alternate pill colors: first feature gets accent color based on step
                            const isAccentPill = idx === 0;
                            const accentVariant = index % 2 === 0 ? "orange" : "teal";
                            
                            if (isAccentPill) {
                              const bgStyle = accentVariant === "orange" 
                                ? { backgroundColor: "hsl(var(--accent-primary))" }
                                : { backgroundColor: "hsl(var(--accent-secondary))" };
                              return (
                                <div
                                  key={idx}
                                  className="inline-flex text-sm w-full border-0 rounded-2xl px-4 py-3 gap-3 items-center text-white shadow-sm"
                                  style={bgStyle}
                                >
                                  <span className="inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm border border-white/20">
                                    <Check className="w-4 h-4 text-white" aria-hidden="true" />
                                  </span>
                                  <span className="font-medium tracking-tight">{feature}</span>
                                </div>
                              );
                            }
                            return (
                              <div
                                key={idx}
                                className="inline-flex text-sm w-full border rounded-2xl px-4 py-3 gap-3 items-center text-primary/80 border-standard bg-card shadow-sm"
                              >
                                <span className="inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg border border-standard bg-accent-primary/5">
                                  <Check className="w-4 h-4 text-accent-primary" aria-hidden="true" />
                                </span>
                                <span className="font-medium tracking-tight">{feature}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Visual Mockup (Optional) */}
                    {(step.mockupImage || step.mockup) && (
                      <div className="lg:col-span-5">
                        {step.mockupImage ? (
                          <div className="relative aspect-4/3 rounded-2xl border border-standard bg-card shadow-xl overflow-hidden">
                            <img 
                              src={step.mockupImage} 
                              alt={`${step.title} illustration`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          step.mockup
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSticky;
