"use client";

import React from 'react';
import { motion } from 'framer-motion';
import BlurText from '@/components/shared/BlurText';
import { Search, Lightbulb, Rocket, TrendingUp } from 'lucide-react';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  duration?: string;
}

const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery',
    description: 'Deep dive into your brand, market position, and growth objectives. We analyze competitors, identify opportunities, and define success metrics.',
    icon: <Search className="w-6 h-6" />,
    duration: 'Week 1-2'
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Craft a tailored roadmap combining creative vision with data-driven insights. Every tactic aligns with your business goals and budget.',
    icon: <Lightbulb className="w-6 h-6" />,
    duration: 'Week 2-3'
  },
  {
    number: '03',
    title: 'Execution',
    description: 'Launch campaigns with precision and agility. Our fractional experts integrate seamlessly with your team for maximum impact.',
    icon: <Rocket className="w-6 h-6" />,
    duration: 'Week 4+'
  },
  {
    number: '04',
    title: 'Optimization',
    description: 'Continuously refine based on real-time data. A/B test, iterate, and scale what works to maximize ROI and minimize waste.',
    icon: <TrendingUp className="w-6 h-6" />,
    duration: 'Ongoing'
  }
];

interface HowWeWorkProps extends React.ComponentPropsWithoutRef<'section'> {}

const HowWeWork: React.FC<HowWeWorkProps> = ({ className = '', ...props }) => {
  return (
    <section className={`py-24 px-4 ${className}`} {...props}>
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="h2 text-primary max-w-3xl mx-auto">
            <BlurText
              as="span"
              text="How We"
              className="inline"
              textClassName="text-primary"
              delay={30}
              animateBy="words"
              direction="top"
            />
            <BlurText
              as="span"
              text="Work"
              className="inline"
              textClassName="text-accent-primary font-black"
              delay={40}
              animateBy="words"
              direction="top"
            />
          </h2>
          <p className="subtext-large text-primary/60 max-w-2xl mx-auto">
            A proven four-step process that transforms your marketing from reactive to strategic
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16">
            {processSteps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="relative flex flex-col items-center text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    <span className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-card border border-standard text-xs font-heading text-primary flex items-center justify-center">
                      {index + 1}
                    </span>
                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-accent-primary/30 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-accent-primary/10 border-2 border-accent-primary/30 flex items-center justify-center text-accent-primary">
                        {step.icon}
                      </div>
                    </div>
                  </motion.div>
                  <h3 className="mt-4 font-heading font-bold text-primary">{step.title}</h3>
                  <p className="text-sm text-primary/70 max-w-[260px]">{step.description}</p>
                  {step.duration && (
                    <span className="mt-2 text-xs font-medium text-accent-primary uppercase tracking-wider">{step.duration}</span>
                  )}
                </div>

                {/* Connector between steps */}
                {index < processSteps.length - 1 && (
                  <>
                    {/* Curved dashed connector for large screens */}
                    <div className="hidden lg:block w-32 h-14">
                      <svg viewBox="0 0 128 56" className="w-full h-full">
                        <path d="M2,54 C40,4 88,4 126,54" fill="none" stroke="hsl(var(--accent-primary))" strokeWidth="2" strokeDasharray="6 8" opacity="0.3" />
                      </svg>
                    </div>
                    {/* Vertical dashed connector for mobile */}
                    <div className="lg:hidden my-4 h-8 border-l-2 border-dashed border-accent-primary/20" />
                  </>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
