"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "motion/react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    const radius = 120;
    const [visible, setVisible] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
      const { left, top } = (currentTarget as HTMLDivElement).getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    const wrapperClasses = cn(
      "rounded-lg p-[1px] transition-all duration-300",
      (visible || isFocused) && "bg-shimmer-accent animate-shine",
    );

    return (
      <motion.div
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
              hsl(var(--accent-primary) / 0.08),
              transparent 80%
            )
          `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className={wrapperClasses}
      >
        <input
          type={type}
          className={cn(
            "h-14 w-full rounded-lg border-2 bg-transparent px-4 py-3 body-default text-primary placeholder:text-primary/40 transition-all duration-300",
            // Default brand border
            "border-accent-primary",
            // Hover feedback
            "hover:shadow-sm",
            // Focus feedback with glow
            "focus:border-accent-primary focus:outline-none focus:ring-4 focus:ring-accent-primary/15 focus:shadow-md",
            // Disabled
            "disabled:cursor-not-allowed disabled:opacity-50",
            isFocused && "border-accent-primary ring-4 ring-accent-primary/15 shadow-md",
            className,
          )}
          ref={ref}
          style={{
            borderColor: 'hsl(var(--accent-primary))',
            ...(props.style || {}),
          }}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
      </motion.div>
    );
  },
);
Input.displayName = "Input";

export { Input };
export default Input;
