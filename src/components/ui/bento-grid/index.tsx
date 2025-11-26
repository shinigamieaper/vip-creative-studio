import * as React from "react";
import { cn } from "@/lib/utils";

interface BentoGridProps extends React.ComponentPropsWithoutRef<"div"> {
  children?: React.ReactNode;
}

export const BentoGrid = ({ className, children, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-auto md:grid-cols-3",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface BentoGridItemProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  colorVariant?: "default" | "teal" | "orange" | "dark";
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  colorVariant = "default",
  ...props
}: BentoGridItemProps) => {
  const isTeal = colorVariant === "teal";
  const isOrange = colorVariant === "orange";
  const isDark = colorVariant === "dark";
  const hasColor = isTeal || isOrange || isDark;

  const bgStyle: React.CSSProperties | undefined = isTeal
    ? { backgroundColor: "hsl(var(--accent-secondary))" }
    : isOrange
    ? { backgroundColor: "hsl(var(--accent-primary))" }
    : isDark
    ? { backgroundColor: "hsl(var(--text-primary))" }
    : undefined;

  const borderClass = hasColor ? "border-transparent" : "border-standard";
  const titleColor = hasColor ? "text-white" : "text-primary";
  const descColor = hasColor ? "text-white/80" : "text-primary";
  const iconColor = hasColor ? "[&_svg]:text-white" : "";

  return (
    <div
      className={cn(
        "group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl border p-4 shadow-[0_4px_12px_rgba(15,23,42,0.08)] transition-all duration-300 hover:shadow-[0_8px_20px_rgba(15,23,42,0.14)] hover:-translate-y-1",
        borderClass,
        className
      )}
      style={bgStyle}
      {...props}
    >
      {header}
      <div className={cn("transition duration-200 group-hover/bento:translate-x-2", iconColor)}>
        {icon}
        <div className={cn("mt-2 mb-2 font-heading font-bold", titleColor)}>
          {title}
        </div>
        <div className={cn("font-body text-xs font-normal", descColor)}>
          {description}
        </div>
      </div>
    </div>
  );
};
