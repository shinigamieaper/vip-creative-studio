"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  AlignStartVertical,
  BarChart3,
  Calculator,
  CheckSquare,
  CircleDashed,
  CircleDot,
  CircleHelp,
  ClipboardList,
  Layers,
  LineChart,
  NotebookPen,
  PieChart,
  Rocket,
  Sparkles,
  Target,
  UsersRound,
  BookOpen
} from "lucide-react";

export interface ResourceFiltersProps extends React.ComponentPropsWithoutRef<"div"> {
  categories: string[];
  activeCategory?: string | "All";
  onCategoryChange: (category: string | "All") => void;
}

const ResourceFilters: React.FC<ResourceFiltersProps> = ({
  className,
  categories,
  activeCategory = "All",
  onCategoryChange,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-card border border-standard text-xs sm:text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary shadow-[0_2px_8px_rgba(15,23,42,0.08)]";

  return (
    <div
      className={cn("flex flex-wrap gap-1.5 justify-center", className)}
      {...props}
    >
      <button
        type="button"
        onClick={() => onCategoryChange("All")}
        aria-pressed={activeCategory === "All"}
        className={cn(
          baseClasses,
          activeCategory === "All"
            ? "border-accent-primary/60 text-accent-primary shadow-[0_4px_14px_rgba(15,23,42,0.2)] bg-[radial-gradient(circle_at_0%_0%,hsl(var(--accent-primary)/0.25),transparent_55%),radial-gradient(circle_at_100%_100%,hsl(var(--accent-secondary)/0.22),transparent_55%)]"
            : "text-primary hover:border-accent-primary/40 hover:text-accent-primary hover:-translate-y-0.5"
        )}
      >
        <span className="flex items-center gap-2">
          <span className="inline-flex text-accent-primary" aria-hidden>
            <Sparkles className="w-4 h-4" />
          </span>
          All topics
        </span>
      </button>

      {categories.map((category) => {
        const isActive = activeCategory === category;
        const iconMap: Record<string, React.ReactNode> = {
          "Budgeting & Finance": <CircleHelp className="w-4 h-4" aria-hidden />,
          "Savings & Investing": <PieChart className="w-4 h-4" aria-hidden />,
          "Payments & Digital Wallets": <AlignStartVertical className="w-4 h-4" aria-hidden />,
          "App Updates": <Rocket className="w-4 h-4" aria-hidden />,
          "Marketing Strategy": <Target className="w-4 h-4" aria-hidden />,
          "Industry Reports": <LineChart className="w-4 h-4" aria-hidden />,
          "Financial foundations": <Layers className="w-4 h-4" aria-hidden />,
          "Digital experiences": <CircleDot className="w-4 h-4" aria-hidden />,
          "Growth marketing": <Rocket className="w-4 h-4" aria-hidden />,
          "Market intelligence": <BarChart3 className="w-4 h-4" aria-hidden />,
          "Growth strategy": <BarChart3 className="w-4 h-4" aria-hidden />,
          "Member experience": <UsersRound className="w-4 h-4" aria-hidden />,
          "Digital innovation": <Sparkles className="w-4 h-4" aria-hidden />,
          "Leadership perspectives": <CircleDashed className="w-4 h-4" aria-hidden />,
          "Launches & rebrands": <ClipboardList className="w-4 h-4" aria-hidden />,
          "Acquisition & growth": <Target className="w-4 h-4" aria-hidden />,
          "Retention & engagement": <CircleDashed className="w-4 h-4" aria-hidden />,
          "Product adoption": <NotebookPen className="w-4 h-4" aria-hidden />,
          "Playbooks & frameworks": <Layers className="w-4 h-4" aria-hidden />,
          "Templates & checklists": <CheckSquare className="w-4 h-4" aria-hidden />,
          "Webinars & training": <UsersRound className="w-4 h-4" aria-hidden />,
          "Tools & calculators": <Calculator className="w-4 h-4" aria-hidden />,
          "Ebooks": <BookOpen className="w-4 h-4" aria-hidden />,
        };

        return (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            aria-pressed={isActive}
            className={cn(
              baseClasses,
              isActive
                ? "border-accent-primary/60 text-accent-primary shadow-[0_4px_14px_rgba(15,23,42,0.2)] bg-[radial-gradient(circle_at_0%_0%,hsl(var(--accent-primary)/0.25),transparent_55%),radial-gradient(circle_at_100%_100%,hsl(var(--accent-secondary)/0.22),transparent_55%)]"
                : "text-primary hover:border-accent-primary/40 hover:text-accent-primary hover:-translate-y-0.5"
            )}
          >
            <span className="flex items-center gap-2">
              {iconMap[category] && (
                <span className="inline-flex text-accent-primary" aria-hidden>
                  {iconMap[category]}
                </span>
              )}
              {category}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ResourceFilters;
