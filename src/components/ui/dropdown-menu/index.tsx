"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface DropdownOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface DropdownMenuProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  className,
  options,
  value,
  onChange,
  label = "View",
  placeholder = "Select option"
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const activeOption = options.find((opt) => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <div ref={dropdownRef} className={cn("relative inline-block", className)}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-standard bg-card text-sm font-semibold text-primary transition-all duration-300",
          "shadow-[0_2px_8px_rgba(15,23,42,0.06)]",
          "hover:border-accent-primary/40 hover:shadow-[0_4px_14px_rgba(15,23,42,0.12)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary",
          isOpen && "shadow-[0_4px_18px_rgba(15,23,42,0.16)]"
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={label || "Select content group"}
      >
        <span className="flex items-center gap-2">
          {activeOption?.icon && (
            <span className="flex items-center justify-center w-4 h-4 text-accent-primary" aria-hidden>
              {activeOption.icon}
            </span>
          )}
          {activeOption?.label || placeholder}
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-primary/60 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute z-[60] mt-2 w-80 rounded-[24px] p-2 bg-card",
            "shadow-[0_8px_24px_rgba(15,23,42,0.08)]",
            "animate-in fade-in-0 zoom-in-95 duration-200"
          )}
          role="listbox"
          aria-label={label}
        >
          <div className="space-y-1">
            {options.map((option) => {
              const isActive = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-[18px] flex items-start gap-3 transition-all duration-200 bg-card",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary",
                    isActive
                      ? "border border-accent-primary/60 text-primary shadow-[0_4px_14px_rgba(15,23,42,0.2)] bg-[radial-gradient(circle_at_0%_0%,hsl(var(--accent-primary)/0.22),transparent_55%),radial-gradient(circle_at_100%_100%,hsl(var(--accent-secondary)/0.2),transparent_55%)]"
                      : "border border-transparent text-primary hover:border-accent-primary/40 hover:shadow-[0_2px_10px_rgba(15,23,42,0.12)]"
                  )}
                  role="option"
                  aria-selected={isActive}
                >
                  {option.icon && (
                    <span className="flex items-center justify-center w-5 h-5 mt-0.5 shrink-0 text-accent-primary">
                      {option.icon}
                    </span>
                  )}
                  <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                    <span className="font-semibold text-sm leading-tight">
                      {option.label}
                    </span>
                    {option.description && (
                      <span
                        className={cn(
                          "text-xs leading-tight",
                          isActive ? "text-primary/75" : "text-primary/60"
                        )}
                      >
                        {option.description}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
