"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BlurText from '@/components/shared/BlurText';
import { Plus, Minus } from 'lucide-react';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const DEFAULT_FAQ_ITEMS: FAQItem[] = [
  {
    id: 'scope',
    question: 'What exactly does a fractional partnership include?',
    answer: 'Our fractional partnerships provide senior-level expertise without the full-time commitment. You get access to our entire team of specialists—from creative directors to data analysts—who integrate seamlessly with your existing team. Services typically include strategy development, campaign execution, performance analytics, and ongoing optimization, all tailored to your specific needs and budget.'
  },
  {
    id: 'availability',
    question: 'How quickly can you start working with us?',
    answer: 'We can typically begin within 5-7 business days of signing. Our onboarding process is streamlined: Day 1-2 for discovery calls and access setup, Day 3-4 for initial audit and strategy outline, and by Day 5 we\'re ready to execute. For urgent projects, we offer expedited onboarding within 48 hours.'
  },
  {
    id: 'commitment',
    question: 'What\'s the minimum commitment required?',
    answer: 'We offer flexible engagement models starting from 3-month partnerships. This gives us enough time to implement strategies, measure impact, and optimize for results. Many partners choose quarterly renewals, though we also offer month-to-month arrangements after the initial period for maximum flexibility.'
  },
  {
    id: 'results',
    question: 'How do you measure and report on performance?',
    answer: 'Transparency is core to our approach. You\'ll receive weekly performance snapshots, detailed monthly reports with actionable insights, and quarterly business reviews. We track both leading indicators (engagement, reach) and lagging metrics (conversions, ROI), with real-time dashboards accessible 24/7.'
  },
  {
    id: 'industries',
    question: 'Do you specialize in specific industries?',
    answer: 'While we have deep expertise in financial services, healthcare, and B2B SaaS, our frameworks adapt across industries. Our fractional model means we can assemble the right team for your specific sector, bringing both fresh perspectives and relevant experience to drive results.'
  },
  {
    id: 'handoff',
    question: 'What happens when our partnership ends?',
    answer: 'We ensure smooth transitions with complete knowledge transfer. You\'ll receive all creative assets, campaign templates, documented strategies, and access credentials. We also offer a 30-day post-engagement support period to answer questions and ensure your team can maintain momentum independently.'
  }
];

interface FAQProps extends React.ComponentPropsWithoutRef<'section'> {
  items?: FAQItem[];
  subtitle?: string;
}

const FAQ: React.FC<FAQProps> = ({ className = '', items, subtitle, ...props }) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const itemsToRender = items && items.length > 0 ? items : DEFAULT_FAQ_ITEMS;

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <section className={`py-24 px-4 ${className}`} {...props}>
      <div className="max-w-[900px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="h2 text-primary max-w-3xl mx-auto">
            <BlurText
              as="span"
              text="Frequently Asked "
              className="inline"
              textClassName="text-primary"
              delay={30}
              animateBy="words"
              direction="top"
            />
            <BlurText
              as="span"
              text="Questions"
              className="inline"
              textClassName="text-accent-primary font-black"
              delay={40}
              animateBy="words"
              direction="top"
            />
          </h2>
          <p className="subtext-large text-primary/60 max-w-2xl mx-auto">
            {subtitle ?? "Everything you need to know about partnering with VIP Creative Studio"}
          </p>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-4">
          {itemsToRender.map((item, index) => {
            const isOpen = openItems.has(item.id);

            const colorCycle = index % 3;
            const isOrange = colorCycle === 1;
            const isTeal = colorCycle === 2;
            const hasColor = isOrange || isTeal;

            const cardBgStyle: React.CSSProperties | undefined = isOrange
              ? { backgroundColor: "hsl(var(--accent-primary))" }
              : isTeal
              ? { backgroundColor: "hsl(var(--accent-secondary))" }
              : undefined;

            const cardBgClass = hasColor ? "" : "bg-card";
            const usesLightText = isOrange;
            const textColor = usesLightText ? "text-white" : "text-primary";
            const textMuted = usesLightText ? "text-white/80" : "text-primary/70";
            const iconBg = hasColor ? "bg-white/20" : "bg-accent-primary/10";
            const iconColor = hasColor ? "text-white" : "text-accent-primary";

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`rounded-[20px] overflow-hidden shadow-[0_4px_16px_rgba(15,23,42,0.08)] hover:shadow-[0_8px_24px_rgba(15,23,42,0.12)] transition-all duration-300 ${cardBgClass}`}
                style={cardBgStyle}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  className={`w-full px-6 py-5 flex items-center justify-between text-left transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-inset ${hasColor ? "hover:bg-white/10 focus:ring-white/20" : "hover:bg-accent-primary/5 focus:ring-accent-primary/20"}`}
                >
                  <h3 className={`font-heading font-bold text-lg pr-4 ${textColor}`}>
                    {item.question}
                  </h3>
                  <span className={`shrink-0 w-8 h-8 rounded-full ${iconBg} flex items-center justify-center transition-transform duration-300`}
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  >
                    {isOpen ? (
                      <Minus className={`w-4 h-4 ${iconColor}`} />
                    ) : (
                      <Plus className={`w-4 h-4 ${iconColor}`} />
                    )}
                  </span>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-0">
                        <p className={`leading-relaxed ${textMuted}`}>
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
