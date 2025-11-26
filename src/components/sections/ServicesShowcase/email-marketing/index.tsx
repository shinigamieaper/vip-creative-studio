"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MailOpen, MousePointer, TrendingUp, Users, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EmailMarketingProps extends React.ComponentPropsWithoutRef<"div"> {}

const campaigns = [
  { 
    id: 1, 
    name: "Welcome Series", 
    openRate: 68, 
    clickRate: 24,
    status: "active",
    color: "#FF8C00"
  },
  { 
    id: 2, 
    name: "Re-engagement", 
    openRate: 45, 
    clickRate: 12,
    status: "active",
    color: "#40E0D0"
  },
  { 
    id: 3, 
    name: "Product Launch", 
    openRate: 72, 
    clickRate: 31,
    status: "scheduled",
    color: "#9D4EDD"
  },
];

const EmailMarketing: React.FC<EmailMarketingProps> = ({ className, ...props }) => {
  const [hoveredCampaign, setHoveredCampaign] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "w-full h-full bg-linear-to-br from-accent-primary/5 to-accent-secondary/5 p-3 md:p-4",
        className
      )}
      {...props}
    >
      <div className="space-y-2">
        {/* Campaign Cards */}
        {campaigns.map((campaign, index) => {
          const isHovered = hoveredCampaign === campaign.id;
          return (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCampaign(campaign.id)}
              onMouseLeave={() => setHoveredCampaign(null)}
              className="group cursor-pointer"
            >
              <motion.div
                animate={{ scale: isHovered ? 1.02 : 1, x: isHovered ? 4 : 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl p-3 shadow-sm border border-standard/50 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  {/* Icon */}
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${campaign.color}20` }}
                  >
                    <Mail className="w-4 h-4" style={{ color: campaign.color }} />
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-heading font-bold text-primary truncate">
                        {campaign.name}
                      </span>
                      <span 
                        className={cn(
                          "text-[8px] px-1.5 py-0.5 rounded-full font-medium",
                          campaign.status === "active" 
                            ? "bg-green-100 text-green-700" 
                            : "bg-amber-100 text-amber-700"
                        )}
                      >
                        {campaign.status}
                      </span>
                    </div>
                    
                    {/* Metrics */}
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1">
                        <MailOpen className="w-3 h-3 text-primary/40" />
                        <span className="text-[10px] font-medium text-primary/70">{campaign.openRate}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MousePointer className="w-3 h-3 text-primary/40" />
                        <span className="text-[10px] font-medium text-primary/70">{campaign.clickRate}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Ring */}
                  <div className="relative w-10 h-10 shrink-0">
                    <svg className="w-10 h-10 -rotate-90">
                      <circle
                        cx="20"
                        cy="20"
                        r="16"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        className="text-primary/10"
                      />
                      <motion.circle
                        cx="20"
                        cy="20"
                        r="16"
                        stroke={campaign.color}
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: campaign.openRate / 100 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                      />
                    </svg>
                    <span 
                      className="absolute inset-0 flex items-center justify-center text-[9px] font-bold"
                      style={{ color: campaign.color }}
                    >
                      {campaign.openRate}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-4 pt-2"
        >
          <div className="flex items-center gap-1.5">
            <Users className="w-3 h-3 text-accent-primary" />
            <span className="text-[9px] font-medium text-primary/60">12.4k subs</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3 h-3 text-accent-secondary" />
            <span className="text-[9px] font-medium text-primary/60">+18% growth</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

EmailMarketing.displayName = "EmailMarketing";

export default EmailMarketing;
