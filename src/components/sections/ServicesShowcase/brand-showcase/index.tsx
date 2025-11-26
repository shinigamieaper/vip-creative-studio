"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface BrandShowcaseProps extends React.ComponentPropsWithoutRef<"div"> {}

type Tab = "palette" | "logos" | "type";

const tabs: { key: Tab; label: string }[] = [
  { key: "palette", label: "Palette" },
  { key: "logos", label: "Logos" },
  { key: "type", label: "Typography" },
];

const BrandShowcase: React.FC<BrandShowcaseProps> = ({ className, ...props }) => {
  const [active, setActive] = useState<Tab>("palette");

  return (
    <div
      className={cn(
        "h-full w-full bg-linear-to-br from-accent-primary/5 to-accent-secondary/5 rounded-md p-3",
        className
      )}
      {...props}
    >
      <div className="flex flex-col h-full">
        {/* Tabs - more compact */}
        <div className="flex gap-1.5">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setActive(t.key)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-heading font-bold transition-all",
                active === t.key
                  ? "text-white shadow-md"
                  : "text-primary/70 bg-white/80 hover:bg-white"
              )}
              style={active === t.key ? { backgroundColor: 'hsl(var(--accent-primary))' } : undefined}
              aria-pressed={active === t.key}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-2 md:mt-3 flex-1 min-h-0">
          <AnimatePresence mode="wait">
            {active === "palette" && (
              <motion.div
                key="palette"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="h-full flex items-center justify-center"
              >
                <div className="grid grid-cols-3 gap-2 md:gap-4 w-full">
                  {/* Orange */}
                  <motion.div 
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="flex flex-col items-center gap-1 md:gap-2"
                  >
                    <div 
                      className="w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-2xl shadow-lg"
                      style={{ backgroundColor: 'hsl(var(--accent-primary))' }}
                    />
                    <span className="text-[8px] md:text-[10px] font-heading font-bold text-primary/80">#FF8C00</span>
                  </motion.div>

                  {/* Teal */}
                  <motion.div 
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="flex flex-col items-center gap-1 md:gap-2"
                  >
                    <div 
                      className="w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-2xl shadow-lg"
                      style={{ backgroundColor: 'hsl(var(--accent-secondary))' }}
                    />
                    <span className="text-[8px] md:text-[10px] font-heading font-bold text-primary/80">#40E0D0</span>
                  </motion.div>

                  {/* White */}
                  <motion.div 
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="flex flex-col items-center gap-1 md:gap-2"
                  >
                    <div className="w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-white shadow-lg" />
                    <span className="text-[8px] md:text-[10px] font-heading font-bold text-primary/80">#FFFFFF</span>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {active === "logos" && (
              <motion.div
                key="logos"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="h-full flex items-center justify-center"
              >
                <div className="grid grid-cols-3 gap-2 md:gap-3 w-full">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center gap-1 md:gap-2"
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-white shadow-md grid place-items-center overflow-hidden">
                      <Image src="/viplogotransparentblack.png" alt="Logo black" width={48} height={48} className="w-8 h-8 md:w-12 md:h-12" />
                    </div>
                    <span className="text-[8px] md:text-[10px] font-body text-primary/60">Primary</span>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center gap-1 md:gap-2"
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-white shadow-md grid place-items-center overflow-hidden">
                      <Image src="/viplogocircle.png" alt="Logo circle" width={48} height={48} className="w-8 h-8 md:w-12 md:h-12" />
                    </div>
                    <span className="text-[8px] md:text-[10px] font-body text-primary/60">Circle</span>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center gap-1 md:gap-2"
                  >
                    <div 
                      className="w-12 h-12 md:w-16 md:h-16 rounded-lg shadow-md grid place-items-center overflow-hidden"
                      style={{ backgroundColor: 'hsl(var(--accent-primary))' }}
                    >
                      <Image src="/viplogotansparentwhite.png" alt="Logo white" width={48} height={48} className="w-8 h-8 md:w-12 md:h-12" />
                    </div>
                    <span className="text-[8px] md:text-[10px] font-body text-primary/60">Reversed</span>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {active === "type" && (
              <motion.div
                key="type"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="h-full flex items-center justify-center"
              >
                <div className="grid grid-cols-2 gap-2 md:gap-3 w-full">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="rounded-lg bg-white shadow-md p-2 md:p-4"
                  >
                    <div className="font-heading text-primary text-sm md:text-lg font-black">Satoshi</div>
                    <div className="text-[8px] md:text-[10px] font-body text-primary/60 mt-0.5 md:mt-1">Display</div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="rounded-lg bg-white shadow-md p-2 md:p-4"
                  >
                    <div className="font-body text-primary text-xs md:text-sm">Satoshi Regular</div>
                    <div className="text-[8px] md:text-[10px] font-body text-primary/60 mt-0.5 md:mt-1">Body</div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

BrandShowcase.displayName = "BrandShowcase";

export default BrandShowcase;
