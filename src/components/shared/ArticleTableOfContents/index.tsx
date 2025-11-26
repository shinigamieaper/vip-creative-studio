"use client";

import React, { useEffect, useState } from "react";
import { List } from "lucide-react";

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export interface ArticleTableOfContentsProps {
  items: TocItem[];
}

export function ArticleTableOfContents({ items }: ArticleTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px" }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  if (items.length === 0) return null;

  return (
    <nav className="sticky top-24">
      <div className="flex items-center gap-2 mb-4">
        <List className="w-4 h-4 text-accent-primary" />
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/60">
          In this article
        </span>
      </div>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => handleClick(item.id)}
              className={`
                block w-full text-left text-sm py-2 px-3 rounded-lg transition-all duration-200
                ${item.level > 2 ? "pl-6" : ""}
                ${activeId === item.id 
                  ? "text-accent-primary bg-accent-primary/5 font-medium" 
                  : "text-primary/60 hover:text-primary hover:bg-primary/5"
                }
              `}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default ArticleTableOfContents;
