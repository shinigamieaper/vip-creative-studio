"use client";

import React from "react";

export interface FeatureCardProps extends React.ComponentPropsWithoutRef<"article"> {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  visual?: React.ReactNode;
  accent?: "primary" | "secondary";
  borderless?: boolean;
  variant?: "elevated" | "flat";
  colorVariant?: "default" | "teal" | "orange" | "dark";
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  eyebrow,
  title,
  description,
  icon,
  visual,
  accent = "primary",
  borderless = false,
  variant = "elevated",
  colorVariant = "default",
  className = "",
  children,
  ...props
}) => {
  const isTeal = colorVariant === "teal";
  const isOrange = colorVariant === "orange";
  const isDark = colorVariant === "dark";
  const hasColor = isTeal || isOrange || isDark;

  // Background colors based on variant
  const bgColorClass = isTeal
    ? ""
    : isOrange
    ? ""
    : isDark
    ? ""
    : "bg-card";

  const bgColorStyle: React.CSSProperties | undefined = isTeal
    ? { backgroundColor: "hsl(var(--accent-secondary))" }
    : isOrange
    ? { backgroundColor: "hsl(var(--accent-primary))" }
    : isDark
    ? { backgroundColor: "hsl(var(--text-primary))" }
    : undefined;

  // Text colors
  const titleColor = hasColor ? "text-white" : "text-primary";
  const descColor = hasColor ? "text-white/80" : "text-primary/70";
  const eyebrowColor = hasColor ? "text-white/70" : "text-primary/60";

  // Icon background
  const iconBgClass = hasColor
    ? "bg-white/20 backdrop-blur-sm border border-white/20"
    : accent === "secondary"
    ? "bg-accent-secondary/10"
    : "bg-accent-primary/10";

  // Icon color override for colored cards
  const iconColor = hasColor ? "text-white" : undefined;

  const accentBg =
    accent === "secondary"
      ? "bg-[radial-gradient(800px_400px_at_100%_50%,hsl(var(--accent-secondary)/0.04),transparent_60%)]"
      : "bg-[radial-gradient(800px_400px_at_0%_50%,hsl(var(--accent-primary)/0.05),transparent_60%)]";

  const borderClass = hasColor ? "border-0" : borderless ? "border-0" : "border border-standard";
  const isFlat = variant === "flat";
  const baseClasses = `group relative rounded-[40px] p-8 transition-all duration-300 ${bgColorClass}`;
  const elevationClasses = isFlat
    ? "shadow-[0_4px_12px_rgba(15,23,42,0.06)] hover:shadow-[0_6px_16px_rgba(15,23,42,0.1)]"
    : "shadow-[0_8px_24px_rgba(15,23,42,0.08)] hover:shadow-[0_10px_30px_rgba(15,23,42,0.12)] hover:-translate-y-1";
  const articleClasses = `${baseClasses} ${borderClass} ${elevationClasses} ${className}`;

  return (
    <article className={articleClasses} style={bgColorStyle} {...props}>
      {!isFlat && !hasColor && (
        <div className="absolute inset-0 pointer-events-none rounded-[40px]">
          <div className={`absolute inset-0 ${accentBg}`} />
        </div>
      )}

      <div className="relative z-10 flex flex-col h-full">
        {(eyebrow || icon) && (
          <div className="flex items-center gap-2 mb-3">
            {icon && (
              <div className={`w-10 h-10 rounded-xl ${iconBgClass} flex items-center justify-center ${iconColor || ""}`}>
                {hasColor && React.isValidElement(icon)
                  ? React.cloneElement(
                      icon as React.ReactElement<{ className?: string }>,
                      { className: "h-6 w-6 text-white" }
                    )
                  : icon}
              </div>
            )}
            {eyebrow && (
              <span className={`text-xs uppercase tracking-wide font-medium ${eyebrowColor}`}>{eyebrow}</span>
            )}
          </div>
        )}

        <h3 className={`h3 ${titleColor}`}>{title}</h3>
        {description && <p className={`body-default mt-3 ${descColor}`}>{description}</p>}

        {visual && <div className="mt-6">{visual}</div>}

        {children}
      </div>
    </article>
  );
};

export default FeatureCard;
