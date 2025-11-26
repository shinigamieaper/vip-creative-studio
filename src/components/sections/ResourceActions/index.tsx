"use client";

import React, { useEffect, useState } from "react";
import { Share2, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Resource } from "@/lib/resources/data";

export interface ResourceActionsProps
  extends React.ComponentPropsWithoutRef<"div"> {
  resourceMeta: Pick<Resource, "slug" | "title">;
}

const STORAGE_KEY = "vip_saved_resources";

const ResourceActions: React.FC<ResourceActionsProps> = ({
  resourceMeta,
  className,
  ...props
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  // Hydrate saved state from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const savedSlugs: string[] = JSON.parse(raw);
      setIsSaved(savedSlugs.includes(resourceMeta.slug));
    } catch (error) {
      console.error("Failed to read saved resources from localStorage", error);
    }
  }, [resourceMeta.slug]);

  const persistSaved = (nextSaved: boolean) => {
    if (typeof window === "undefined") return;

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const current: string[] = raw ? JSON.parse(raw) : [];

      let next = current;
      if (nextSaved) {
        if (!current.includes(resourceMeta.slug)) {
          next = [...current, resourceMeta.slug];
        }
      } else {
        next = current.filter((slug) => slug !== resourceMeta.slug);
      }

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (error) {
      console.error("Failed to persist saved resources", error);
    }
  };

  const handleToggleSave = () => {
    const next = !isSaved;
    setIsSaved(next);
    persistSaved(next);
  };

  const handleShare = async () => {
    if (typeof window === "undefined") return;

    try {
      setIsSharing(true);
      const url = window.location.href;
      const shareData = {
        title: resourceMeta.title,
        text: resourceMeta.title,
        url,
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        // Simple feedback without introducing a toast system
        // eslint-disable-next-line no-alert
        alert("Link copied to clipboard");
      }
    } catch (error) {
      console.error("Error sharing resource", error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      <button
        type="button"
        onClick={handleShare}
        disabled={isSharing}
        className="group relative p-3 rounded-full bg-card border border-standard hover:border-accent-primary/40 hover:bg-accent-primary/5 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-standard disabled:hover:bg-card"
        aria-label="Share this insight"
      >
        <Share2 className="h-[18px] w-[18px] text-primary/60 group-hover:text-accent-primary transition-colors duration-200" />
      </button>

      <button
        type="button"
        onClick={handleToggleSave}
        className={cn(
          "group relative p-3 rounded-full border active:scale-95 transition-all duration-200",
          isSaved
            ? "bg-accent-primary/10 border-accent-primary/40 hover:bg-accent-primary/15 hover:border-accent-primary/60"
            : "bg-card border-standard hover:border-accent-primary/40 hover:bg-accent-primary/5"
        )}
        aria-pressed={isSaved}
        aria-label={isSaved ? "Remove from saved" : "Save this insight"}
      >
        <Bookmark
          className={cn(
            "h-[18px] w-[18px] transition-all duration-200",
            isSaved
              ? "text-accent-primary fill-accent-primary"
              : "text-primary/60 group-hover:text-accent-primary"
          )}
        />
      </button>
    </div>
  );
};

export default ResourceActions;
