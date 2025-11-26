"use client";

import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchInputProps extends Omit<React.ComponentPropsWithoutRef<"input">, "type" | "onChange"> {
  onSearch: (query: string) => void;
  placeholder?: string;
  containerClassName?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  className,
  containerClassName,
  onSearch,
  placeholder = "Search resources...",
  ...props
}) => {
  const [query, setQuery] = useState("");
  const hasQuery = query.trim().length > 0;
  
  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div
      className={cn(
        "relative max-w-2xl mx-auto transition-all duration-300",
        hasQuery &&
          "rounded-full p-px bg-[radial-gradient(circle_at_0%_0%,hsl(var(--accent-primary)/0.45),transparent_55%),radial-gradient(circle_at_100%_100%,hsl(var(--accent-secondary)/0.4),transparent_55%)]",
        containerClassName
      )}
    >
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            "w-full pl-12 pr-12 py-3 rounded-full border bg-card text-primary placeholder:text-primary/40 transition-all duration-300",
            "shadow-[0_2px_8px_rgba(15,23,42,0.06)]",
            "focus:outline-none focus:shadow-[0_0_0_1px_rgba(15,23,42,0.18),0_4px_18px_rgba(15,23,42,0.12)]",
            !hasQuery && "border-standard",
            hasQuery && "border-transparent",
            className
          )}
          aria-label={placeholder}
          {...props}
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-primary/10 transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4 text-primary/60" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
