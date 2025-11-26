"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AcquisitionFunnelProps extends React.ComponentPropsWithoutRef<"div"> {}

const funnelStages = [
  { 
    label: "Impressions", 
    width: 100, 
    gradient: "from-[#FF8C00] to-[#FF8C00]/80",
    metric: "2.4M"
  },
  { 
    label: "Clicks", 
    width: 75, 
    gradient: "from-[#FF8C00]/90 to-[#FFB84D]",
    metric: "180K"
  },
  { 
    label: "Leads", 
    width: 50, 
    gradient: "from-[#FFB84D] to-[#40E0D0]",
    metric: "12.5K"
  },
  { 
    label: "Customers", 
    width: 30, 
    gradient: "from-[#40E0D0] to-[#40E0D0]/90",
    metric: "3.2K"
  },
];

const AcquisitionFunnel: React.FC<AcquisitionFunnelProps> = ({ className, ...props }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div 
      className={cn(
        "w-full h-full bg-linear-to-br from-accent-primary/5 to-accent-secondary/5 flex items-center justify-center p-4 sm:p-6",
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 w-full max-w-[260px] sm:max-w-[300px] md:max-w-[340px]">
        {funnelStages.map((stage, index) => (
          <motion.div
            key={stage.label}
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 0.5,
              delay: index * 0.12,
              ease: "easeOut"
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative w-full origin-top cursor-pointer"
            style={{ width: `${stage.width}%` }}
          >
            {/* Funnel segment */}
            <motion.div
              animate={{
                scale: hoveredIndex === index ? 1.05 : 1,
                y: hoveredIndex === index ? -2 : 0,
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={cn(
                "relative h-10 sm:h-11 md:h-12 bg-linear-to-r rounded-sm flex items-center justify-center",
                "border border-white/20 shadow-[0_4px_12px_rgba(15,23,42,0.18)]",
                "transition-shadow duration-200",
                hoveredIndex === index && "shadow-[0_6px_18px_rgba(15,23,42,0.24)]",
                stage.gradient
              )}
            >
              {/* Label text - blurs and fades on hover */}
              <motion.span 
                animate={{
                  opacity: hoveredIndex === index ? 0.2 : 1,
                  filter: hoveredIndex === index ? "blur(2px)" : "blur(0px)"
                }}
                transition={{ duration: 0.2 }}
                className="text-[11px] sm:text-xs font-heading font-bold text-white z-10"
              >
                {stage.label}
              </motion.span>
              
              {/* Metric overlay on hover */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: hoveredIndex === index ? 1 : 0,
                  scale: hoveredIndex === index ? 1 : 0.9
                }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 rounded-sm flex items-center justify-center"
              >
                <span className="text-xs sm:text-sm font-heading font-black text-white drop-shadow-lg">
                  {stage.metric}
                </span>
              </motion.div>
              
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-linear-to-b from-white/20 to-transparent rounded-sm pointer-events-none" />
            </motion.div>
            
            {/* Connector line to next stage */}
            {index < funnelStages.length - 1 && (
              <motion.svg
                className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                style={{ top: '100%' }}
                width="2"
                height="4"
                viewBox="0 0 2 4"
                animate={{
                  opacity: hoveredIndex === index || hoveredIndex === index + 1 ? 0.6 : 0.2
                }}
              >
                <line
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="4"
                  stroke="url(#lineGradient)"
                  strokeWidth="1.5"
                />
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF8C00" />
                    <stop offset="100%" stopColor="#40E0D0" />
                  </linearGradient>
                </defs>
              </motion.svg>
            )}
          </motion.div>
        ))}
        
        {/* Conversion indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="mt-3 flex items-center gap-2"
        >
          <div className="h-px w-8 bg-linear-to-r from-transparent via-accent-primary to-transparent" />
          <span className="text-[10px] sm:text-xs font-body text-primary/60">
            High-intent acquisition
          </span>
          <div className="h-px w-8 bg-linear-to-r from-transparent via-accent-secondary to-transparent" />
        </motion.div>
      </div>
    </div>
  );
};

AcquisitionFunnel.displayName = "AcquisitionFunnel";

export default AcquisitionFunnel;
