"use client";

import React from 'react';
import { motion } from 'framer-motion';
import CountUp from '@/components/shared/CountUp';
import { TrendingUp, Award, Users, Zap } from 'lucide-react';

interface KPIMetric {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon: React.ReactNode;
  description?: string;
}

const metrics: KPIMetric[] = [
  {
    value: 250,
    suffix: '+',
    label: 'Successful Campaigns',
    icon: <TrendingUp className="w-5 h-5" />,
    description: 'Delivered across industries'
  },
  {
    value: 4.9,
    suffix: '/5',
    label: 'Partner Rating',
    icon: <Award className="w-5 h-5" />,
    description: 'Average client satisfaction'
  },
  {
    value: 320,
    suffix: '%',
    label: 'Avg. ROAS Uplift',
    icon: <Zap className="w-5 h-5" />,
    description: 'Return on ad spend increase'
  },
  {
    value: 45,
    prefix: '-',
    suffix: '%',
    label: 'Reduced CAC',
    icon: <Users className="w-5 h-5" />,
    description: 'Customer acquisition cost'
  }
];

interface CmsKpiMetric {
  value?: number;
  suffix?: string;
  prefix?: string;
  label?: string;
  description?: string;
  iconKey?: string;
}

interface KPIHighlightsProps extends React.ComponentPropsWithoutRef<'section'> {
  metricsFromCms?: CmsKpiMetric[];
}

const getIconForMetric = (iconKey: string | undefined, fallbackIcon: React.ReactNode) => {
  switch (iconKey) {
    case 'campaigns':
      return <TrendingUp className="w-5 h-5" />;
    case 'rating':
      return <Award className="w-5 h-5" />;
    case 'roas':
      return <Zap className="w-5 h-5" />;
    case 'cac':
      return <Users className="w-5 h-5" />;
    default:
      return fallbackIcon;
  }
};

const KPIHighlights: React.FC<KPIHighlightsProps> = ({ className = '', metricsFromCms, ...props }) => {
  const resolvedMetrics: KPIMetric[] =
    metricsFromCms && Array.isArray(metricsFromCms) && metricsFromCms.length > 0
      ? metricsFromCms.map((metric, index) => {
          const fallback = metrics[index] ?? metrics[0];
          const icon = getIconForMetric(metric.iconKey, fallback.icon);

          return {
            value: metric.value ?? fallback.value,
            suffix: metric.suffix ?? fallback.suffix,
            prefix: metric.prefix ?? fallback.prefix,
            label: metric.label ?? fallback.label,
            description: metric.description ?? fallback.description,
            icon,
          };
        })
      : metrics;

  return (
    <section className={`py-20 px-4 relative overflow-hidden ${className}`} {...props}>
      {/* Subtle background gradient */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {resolvedMetrics.map((metric, index) => {
            // Strategic color: index 1 (teal), index 3 (orange)
            const isTeal = index === 1;
            const isOrange = index === 3;
            const hasColor = isTeal || isOrange;

            const bgStyle: React.CSSProperties | undefined = isTeal
              ? { backgroundColor: "hsl(var(--accent-secondary))" }
              : isOrange
              ? { backgroundColor: "hsl(var(--accent-primary))" }
              : undefined;

            const borderClass = hasColor ? "border-transparent" : "border-standard";
            const bgClass = hasColor ? "" : "bg-card";
            const usesLightText = isOrange;
            const textColor = usesLightText ? "text-white" : "text-primary";
            const textMuted = usesLightText ? "text-white/80" : "text-primary/80";
            const textSubtle = usesLightText ? "text-white/60" : "text-primary/60";
            const iconBg = usesLightText
              ? "bg-white/20 text-white"
              : isTeal
              ? "bg-accent-secondary/10 text-accent-secondary"
              : "bg-accent-primary/10 text-accent-primary";

            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div 
                  className={`relative ${bgClass} border ${borderClass} rounded-[20px] p-6 lg:p-8 shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1`}
                  style={bgStyle}
                >
                  
                  {/* Icon */}
                  <div className={`mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full ${iconBg} group-hover:scale-110 transition-transform duration-300`}>
                    {metric.icon}
                  </div>

                  {/* Value */}
                  <div className="mb-2">
                    <span className={`font-heading font-black text-4xl lg:text-5xl ${textColor} inline-flex items-baseline`}>
                      {metric.prefix && <span>{metric.prefix}</span>}
                      <CountUp to={metric.value} duration={2.5} separator="," className="inline" />
                      {metric.suffix && <span className="ml-1">{metric.suffix}</span>}
                    </span>
                  </div>

                  {/* Label */}
                  <h3 className={`font-heading font-bold text-sm uppercase tracking-wider ${textMuted} mb-1`}>
                    {metric.label}
                  </h3>

                  {/* Description */}
                  {metric.description && (
                    <p className={`text-xs ${textSubtle} font-body`}>
                      {metric.description}
                    </p>
                  )}

                  {/* Subtle gradient overlay - only for non-colored cards */}
                  {!hasColor && (
                    <div className="absolute top-0 right-0 w-24 h-24 opacity-5 pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle at top right, hsl(var(--accent-primary)) 0%, transparent 70%)'
                      }}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KPIHighlights;
