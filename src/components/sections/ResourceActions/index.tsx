"use client";

import React, { useState } from "react";
import { Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Resource } from "@/lib/resources/data";

export interface ResourceActionsProps
  extends React.ComponentPropsWithoutRef<"div"> {
  resourceMeta: Pick<Resource, "slug" | "title">;
}

const ResourceActions: React.FC<ResourceActionsProps> = ({
  resourceMeta,
  className,
  ...props
}) => {
  const [isSharing, setIsSharing] = useState(false);

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

      {/* Bookmark button temporarily removed - currently offers no function */}
    </div>
  );
};

export default ResourceActions;
