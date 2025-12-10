"use client";

import React from 'react';
import { motion } from 'framer-motion';
import BlurText from '@/components/shared/BlurText';
import PrimaryCtaButton from '@/components/shared/PrimaryCtaButton';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';

interface FinalCTAProps extends React.ComponentPropsWithoutRef<'section'> {}

const FinalCTA: React.FC<FinalCTAProps> = ({ className = '', ...props }) => {
  return (
    <section className={`py-24 px-4 relative overflow-hidden ${className}`} {...props}>
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] 
          bg-linear-to-r from-accent-primary/10 via-accent-secondary/10 to-accent-primary/10 
          rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-[900px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-card border border-standard rounded-[40px] p-8 md:p-12 lg:p-16 text-center shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-shadow duration-300"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-accent-primary/5 rounded-full blur-2xl" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent-secondary/5 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            {/* Heading */}
            <div className="mb-6">
              <h2 className="h2 text-primary max-w-3xl mx-auto">
                <BlurText
                  as="span"
                  text="Ready to Transform"
                  className="inline"
                  textClassName="text-primary"
                  delay={30}
                  animateBy="words"
                  direction="top"
                />
                <BlurText
                  as="span"
                  text="Your Marketing?"
                  className="inline"
                  textClassName="text-accent-primary font-black"
                  delay={40}
                  animateBy="words"
                  direction="top"
                />
              </h2>
            </div>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-primary/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              Let's discuss how our fractional partnership model can accelerate your growth. 
              Book a no-obligation discovery call to explore the possibilities.
            </p>

            {/* Value Props */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {[
                '30-minute strategy session',
                'Custom growth roadmap',
                'No commitment required'
              ].map((value, index) => {
                // Middle item gets teal accent
                const isAccent = index === 1;
                return (
                  <motion.div
                    key={value}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                    className={`flex items-center justify-center gap-2 text-sm font-medium px-4 py-2 rounded-full ${
                      isAccent 
                        ? "text-primary" 
                        : "text-primary/80"
                    }`}
                    style={isAccent ? { backgroundColor: "hsl(var(--accent-secondary))" } : undefined}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      isAccent ? "bg-white/20" : "bg-accent-primary/10"
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${isAccent ? "bg-white" : "bg-accent-primary"}`} />
                    </span>
                    {value}
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <PrimaryCtaButton asChild shimmer={true} shimmerGradient={true} shimmerSpeedSeconds={3} className="group">
                <Link href="/contact">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book a Discovery Call
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </PrimaryCtaButton>
              
              <Link
                href="/our-partnership-model"
                className="px-6 py-3 rounded-full font-heading font-semibold text-primary 
                  border-2 border-standard hover:border-accent-primary/50 
                  transition-all duration-300 hover:shadow-lg inline-flex items-center gap-2"
              >
                Explore Our Partnership Model
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust Signal */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 text-xs text-primary/50 italic"
            >
              Join 150+ companies that have accelerated their growth with VIP Creative Studio
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
