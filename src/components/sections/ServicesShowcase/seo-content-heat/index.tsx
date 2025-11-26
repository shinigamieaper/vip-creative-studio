"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SEOContentHeatProps extends React.ComponentPropsWithoutRef<"div"> {}

const days = ["M", "T", "W", "T", "F", "S", "S"] as const;

// Content calendar with actual post types and colors
const contentCalendar = [
  [
    { type: "Blog", color: "bg-[#FF8C00]", label: "SEO Guide" },
    { type: "", color: "bg-primary/5", label: "" },
    { type: "Video", color: "bg-[#FF6B9D]", label: "Tutorial" },
    { type: "Blog", color: "bg-[#FF8C00]", label: "Case Study" },
    { type: "", color: "bg-primary/5", label: "" },
    { type: "", color: "bg-primary/5", label: "" },
    { type: "", color: "bg-primary/5", label: "" },
  ],
  [
    { type: "Social", color: "bg-[#40E0D0]", label: "LinkedIn" },
    { type: "Blog", color: "bg-[#FF8C00]", label: "How-to" },
    { type: "Email", color: "bg-[#9D4EDD]", label: "Newsletter" },
    { type: "Social", color: "bg-[#40E0D0]", label: "Twitter" },
    { type: "Infographic", color: "bg-[#FFB84D]", label: "Stats" },
    { type: "", color: "bg-primary/5", label: "" },
    { type: "", color: "bg-primary/5", label: "" },
  ],
  [
    { type: "", color: "bg-primary/5", label: "" },
    { type: "Video", color: "bg-[#FF6B9D]", label: "Demo" },
    { type: "Blog", color: "bg-[#FF8C00]", label: "Tips" },
    { type: "Social", color: "bg-[#40E0D0]", label: "Instagram" },
    { type: "Webinar", color: "bg-[#06B6D4]", label: "Live" },
    { type: "Blog", color: "bg-[#FF8C00]", label: "Review" },
    { type: "", color: "bg-primary/5", label: "" },
  ],
  [
    { type: "", color: "bg-primary/5", label: "" },
    { type: "", color: "bg-primary/5", label: "" },
    { type: "Social", color: "bg-[#40E0D0]", label: "Facebook" },
    { type: "Email", color: "bg-[#9D4EDD]", label: "Promo" },
    { type: "Blog", color: "bg-[#FF8C00]", label: "Update" },
    { type: "Video", color: "bg-[#FF6B9D]", label: "Recap" },
    { type: "", color: "bg-primary/5", label: "" },
  ],
];

const SEOContentHeat: React.FC<SEOContentHeatProps> = ({ className, ...props }) => {
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

  return (
    <div
      className={cn(
        "h-full w-full p-2 bg-gradient-to-br from-primary/5 to-accent-secondary/5",
        className
      )}
      role="group"
      aria-label="Content publishing calendar"
      {...props}
    >
      <div className="flex flex-col h-full gap-1">
        {/* Header */}
        <div className="grid grid-cols-7 gap-0.5 mb-0.5">
          {days.map((d, i) => (
            <div key={i} className="text-center text-[7px] font-heading font-medium text-primary/60">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 grid grid-rows-4 gap-0.5">
          {contentCalendar.map((week, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-7 gap-0.5">
              {week.map((post, colIndex) => {
                const isHovered = hoveredCell?.row === rowIndex && hoveredCell?.col === colIndex;
                const isEmpty = !post.type;

                return (
                  <motion.div
                    key={`${rowIndex}-${colIndex}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.3, 
                      delay: (rowIndex * 7 + colIndex) * 0.02,
                      type: "spring",
                      stiffness: 200
                    }}
                    onMouseEnter={() => setHoveredCell({ row: rowIndex, col: colIndex })}
                    onMouseLeave={() => setHoveredCell(null)}
                    className={cn(
                      "relative rounded border border-white/40 overflow-hidden cursor-pointer aspect-square",
                      "transition-all duration-200",
                      post.color,
                      isEmpty && "border-standard/30",
                      isHovered && !isEmpty && "scale-105 shadow-md"
                    )}
                  >
                    {!isEmpty && (
                      <>
                        {/* Content Type Badge */}
                        <div className="absolute top-0.5 left-0.5 right-0.5">
                          <span className="text-[6px] font-heading font-bold text-white bg-black/30 px-1 py-0.5 rounded backdrop-blur-sm inline-block leading-none">
                            {post.type}
                          </span>
                        </div>

                        {/* Label on hover */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isHovered ? 1 : 0 }}
                          className="absolute inset-0 bg-black/70 backdrop-blur-[2px] flex items-center justify-center p-0.5"
                        >
                          <span className="text-[7px] font-body font-medium text-white text-center leading-tight">
                            {post.label}
                          </span>
                        </motion.div>

                        {/* Decorative dot */}
                        <div className="absolute bottom-0.5 right-0.5 w-1 h-1 rounded-full bg-white/70" />
                      </>
                    )}
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-2 pt-1 border-t border-standard/30">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-sm bg-[#FF8C00]" />
            <span className="text-[7px] font-body text-primary/70">Blog</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-sm bg-[#40E0D0]" />
            <span className="text-[7px] font-body text-primary/70">Social</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-sm bg-[#FF6B9D]" />
            <span className="text-[7px] font-body text-primary/70">Video</span>
          </div>
        </div>
      </div>
    </div>
  );
};

SEOContentHeat.displayName = "SEOContentHeat";

export default SEOContentHeat;
