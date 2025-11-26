"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  Share2,
  ThumbsUp,
  Star,
  Eye,
  TrendingUp,
  Users,
  Repeat2,
  MousePointer2
} from "lucide-react";
import { cn } from "@/lib/utils";
import CountUp from "@/components/shared/CountUp";

export interface SocialMediaGridProps extends React.ComponentPropsWithoutRef<"div"> {}

const socialMetrics = [
  { 
    id: 1, 
    icon: Heart, 
    label: "Likes", 
    value: 8547,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    hoverBg: "hover:bg-red-500/20"
  },
  { 
    id: 2, 
    icon: MessageCircle, 
    label: "Comments", 
    value: 1289,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    hoverBg: "hover:bg-blue-500/20"
  },
  { 
    id: 3, 
    icon: Share2, 
    label: "Shares", 
    value: 3421,
    color: "text-accent-primary",
    bgColor: "bg-accent-primary/10",
    hoverBg: "hover:bg-accent-primary/20"
  },
  { 
    id: 4, 
    icon: ThumbsUp, 
    label: "Reactions", 
    value: 5672,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    hoverBg: "hover:bg-purple-500/20"
  },
  { 
    id: 5, 
    icon: Eye, 
    label: "Views", 
    value: 24891,
    color: "text-accent-secondary",
    bgColor: "bg-accent-secondary/10",
    hoverBg: "hover:bg-accent-secondary/20"
  },
  { 
    id: 6, 
    icon: Star, 
    label: "Favorites", 
    value: 2134,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    hoverBg: "hover:bg-yellow-500/20"
  },
  { 
    id: 7, 
    icon: Bookmark, 
    label: "Saves", 
    value: 1567,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    hoverBg: "hover:bg-indigo-500/20"
  },
  { 
    id: 8, 
    icon: TrendingUp, 
    label: "Engagement", 
    value: 15234,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    hoverBg: "hover:bg-green-500/20"
  },
  { 
    id: 9, 
    icon: Users, 
    label: "Followers", 
    value: 9876,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    hoverBg: "hover:bg-pink-500/20"
  },
  { 
    id: 10, 
    icon: Repeat2, 
    label: "Reposts", 
    value: 876,
    color: "text-teal-500",
    bgColor: "bg-teal-500/10",
    hoverBg: "hover:bg-teal-500/20"
  },
  { 
    id: 11, 
    icon: MousePointer2, 
    label: "Clicks", 
    value: 12543,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    hoverBg: "hover:bg-orange-500/20"
  },
  { 
    id: 12, 
    icon: Send, 
    label: "Messages", 
    value: 543,
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
    hoverBg: "hover:bg-sky-500/20"
  },
];

const SocialMediaGrid: React.FC<SocialMediaGridProps> = ({ className, ...props }) => {
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "w-full h-full bg-linear-to-br from-accent-secondary/5 to-accent-primary/5 p-6",
        className
      )}
      {...props}
    >
      <div className="grid grid-cols-3 gap-2 md:gap-3 h-full">
        {socialMetrics.slice(0, 6).map((metric, index) => {
          const Icon = metric.icon;
          const isHovered = hoveredMetric === metric.id;
          
          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.05,
                type: "spring",
                stiffness: 100
              }}
              onMouseEnter={() => setHoveredMetric(metric.id)}
              onMouseLeave={() => setHoveredMetric(null)}
              className="relative group cursor-pointer"
            >
              <motion.div
                className={cn(
                  "relative h-full rounded-xl md:rounded-2xl p-2 md:p-4",
                  "bg-card border border-standard",
                  "transition-all duration-300",
                  metric.bgColor,
                  metric.hoverBg,
                  "shadow-sm hover:shadow-md"
                )}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Icon */}
                <motion.div
                  className={cn(
                    "w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center mb-1 md:mb-2",
                    "bg-card border border-standard",
                    "transition-colors duration-300"
                  )}
                  animate={{
                    rotate: isHovered ? [0, -10, 10, -10, 0] : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className={cn("h-4 w-4 md:h-5 md:w-5", metric.color)} strokeWidth={2.5} />
                </motion.div>

                {/* Label */}
                <div className="text-[8px] md:text-[10px] font-heading font-medium text-primary/60 mb-0.5 md:mb-1">
                  {metric.label}
                </div>

                {/* Value Counter */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm md:text-lg font-heading font-bold text-primary"
                >
                  {isHovered ? (
                    <CountUp
                      from={0}
                      to={metric.value}
                      duration={1}
                      separator=","
                      startWhen={isHovered}
                    />
                  ) : (
                    <span className="text-primary/40">0</span>
                  )}
                </motion.div>

                {/* Animated Background Gradient on Hover */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.1, scale: 1.2 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={cn(
                      "absolute inset-0 rounded-2xl blur-xl -z-10",
                      metric.bgColor
                    )}
                  />
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

SocialMediaGrid.displayName = "SocialMediaGrid";

export default SocialMediaGrid;
