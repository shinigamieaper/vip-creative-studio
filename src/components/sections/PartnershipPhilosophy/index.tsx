"use client";

import React from "react";
import { BlurText, FeatureCard } from "@/components";
import { Handshake, UserCheck, TrendingUp } from "lucide-react";

export interface PartnershipPhilosophyItem {
  title?: string;
  description?: string;
  iconKey?: string;
}

export interface PartnershipPhilosophyProps
  extends React.ComponentPropsWithoutRef<"section"> {
  title?: string;
  subtitle?: string;
  items?: PartnershipPhilosophyItem[];
}

const FALLBACK_TITLE = "Our Partnership Philosophy";
const FALLBACK_SUBTITLE =
  "The creative minds and strategic thinkers behind your success";

const FALLBACK_ITEMS: PartnershipPhilosophyItem[] = [
  {
    title: "Collaboration",
    description:
      "We believe in working closely with our clients, fostering open communication and mutual respect throughout the partnership.",
    iconKey: "collaboration",
  },
  {
    title: "Client-Centric Approach",
    description:
      "Your success is our priority. We tailor our strategies to meet your specific goals and challenges, ensuring a personalized experience.",
    iconKey: "client-centric",
  },
  {
    title: "Results-Driven",
    description:
      "We're committed to delivering measurable results. Our data-driven approach ensures that every campaign contributes to your bottom line.",
    iconKey: "results",
  },
];

const getIconForKey = (iconKey: string | undefined) => {
  switch (iconKey) {
    case "collaboration":
      return <Handshake className="w-6 h-6 text-accent-primary" />;
    case "client-centric":
      return <UserCheck className="w-6 h-6 text-accent-secondary" />;
    case "results":
      return <TrendingUp className="w-6 h-6 text-accent-primary" />;
    default:
      return <Handshake className="w-6 h-6 text-accent-primary" />;
  }
};

const PartnershipPhilosophy: React.FC<PartnershipPhilosophyProps> = ({
  className = "",
  title,
  subtitle,
  items,
  ...props
}) => {
  const resolvedTitle = title ?? FALLBACK_TITLE;
  const resolvedSubtitle = subtitle ?? FALLBACK_SUBTITLE;

  const resolvedItems: PartnershipPhilosophyItem[] =
    items && items.length > 0
      ? items.map((item, index) => ({
          ...FALLBACK_ITEMS[index],
          ...item,
        }))
      : FALLBACK_ITEMS;

  return (
    <section className={`py-24 px-4 ${className}`} {...props}>
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-14 text-center">
          <BlurText
            as="h2"
            text={resolvedTitle}
            className="h2 text-primary"
            textClassName="text-primary"
            delay={30}
            animateBy="words"
            direction="top"
          />
          <p className="subtext-large text-primary/60 max-w-2xl mx-auto mt-4">
            {resolvedSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {resolvedItems.map((item, index) => {
            const fallback = FALLBACK_ITEMS[index] ?? FALLBACK_ITEMS[0];
            const icon = getIconForKey(item.iconKey ?? fallback.iconKey);
            const accent = index === 1 ? "secondary" : "primary";
            const colorVariant = index === 1 ? "teal" : "default";

            return (
              <FeatureCard
                key={index}
                icon={icon}
                title={item.title ?? fallback.title ?? ""}
                description={item.description ?? fallback.description}
                accent={accent}
                colorVariant={colorVariant}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PartnershipPhilosophy;
