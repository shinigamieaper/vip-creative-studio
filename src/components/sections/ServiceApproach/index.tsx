import React from "react";
import { BarChart3, Users, ShieldCheck, Layers } from "lucide-react";
import BlurText from "@/components/shared/BlurText";
import FeatureCard from "@/components/shared/FeatureCard";
import { ServiceOutcome } from "@/lib/services/data";

const ICON_MAP = {
  chart: <BarChart3 className="w-6 h-6 text-accent-primary" />,
  users: <Users className="w-6 h-6 text-accent-primary" />,
  shield: <ShieldCheck className="w-6 h-6 text-accent-primary" />,
  layers: <Layers className="w-6 h-6 text-accent-primary" />,
};

interface ServiceApproachProps {
  serviceTitle: string;
  description: string;
  outcomes: ServiceOutcome[];
  customTitle?: string;
}

const ServiceApproach: React.FC<ServiceApproachProps> = ({
  serviceTitle,
  description,
  outcomes,
  customTitle,
}) => {
  const titleParts = customTitle 
    ? [customTitle] 
    : ["What our approach to", serviceTitle, "optimizes for"];

  return (
    <section className="py-24 relative">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="h2 text-primary mb-6 flex flex-wrap justify-center gap-x-3">
            {customTitle ? (
              <BlurText text={customTitle} delay={0.1} animateBy="words" />
            ) : (
              <>
                <BlurText text="What our approach to" delay={0.1} animateBy="words" />
                <BlurText 
                  text={serviceTitle} 
                  delay={0.1} 
                  animateBy="words" 
                  textClassName="text-accent-primary"
                />
                <BlurText text="optimizes for" delay={0.1} animateBy="words" />
              </>
            )}
          </div>
          <p className="subtext-large text-primary/70">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {outcomes.map((outcome, index) => {
            // Strategic color rhythm: white → orange → white → teal
            const colorVariant = index === 1 ? "orange" : index === 3 ? "teal" : "default";
            return (
              <FeatureCard
                key={index}
                title={outcome.title}
                description={outcome.description}
                icon={ICON_MAP[outcome.icon]}
                variant="flat"
                colorVariant={colorVariant}
                className="h-full"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceApproach;
