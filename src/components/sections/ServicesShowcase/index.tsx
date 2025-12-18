"use client";

import React from "react";
import Link from "next/link";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { BlurText } from "@/components";
import { BarChart3, Brush, Megaphone, Mail, Rocket, Search, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import AcquisitionFunnel from "./acquisition-funnel";
import SocialMediaGrid from "./social-media-grid";
import SEOContentHeat from "./seo-content-heat";
import EmailMarketing from "./email-marketing";
import BrandShowcase from "./brand-showcase";

export interface ServicesShowcaseProps
  extends React.ComponentPropsWithoutRef<"section"> {
  servicesFromCms?: CmsService[];
}

type ServiceColorVariant = "default" | "dark";

interface ServiceTemplate {
  slug: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  header?: React.ReactNode;
  colorVariant?: ServiceColorVariant;
  className?: string;
}

type ResolvedService = ServiceTemplate & {
  _id?: string;
};

interface CmsService {
  _id?: string;
  slug?: string | { current?: string };
  title?: string;
  subtitle?: string;
  description?: string;
  icon?: string;
}

interface HeaderBlockProps {
  className?: string;
  children?: React.ReactNode;
}

const HeaderBlock: React.FC<HeaderBlockProps> = ({ className, children }) => (
  <div className={cn("w-full rounded-2xl", className)}>
    {children}
  </div>
);

// Analytics chart data
const analyticsData = [
  { month: 'Jan', value: 4000, growth: 2400 },
  { month: 'Feb', value: 3000, growth: 1398 },
  { month: 'Mar', value: 2000, growth: 9800 },
  { month: 'Apr', value: 2780, growth: 3908 },
  { month: 'May', value: 1890, growth: 4800 },
  { month: 'Jun', value: 2390, growth: 3800 },
];

// Branding placeholder
const BrandingPlaceholder = () => (
  <div className="w-full h-full bg-linear-to-br from-accent-primary/10 to-accent-secondary/10 flex items-center justify-center p-6">
    <div className="space-y-4 w-full">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-accent-primary/20" />
        <div className="space-y-2 flex-1">
          <div className="h-3 bg-primary/10 rounded w-3/4" />
          <div className="h-2 bg-primary/5 rounded w-1/2" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="h-16 rounded bg-accent-primary/15" />
        <div className="h-16 rounded bg-accent-secondary/15" />
        <div className="h-16 rounded bg-primary/10" />
      </div>
    </div>
  </div>
);

// SEO placeholder
const SEOPlaceholder = () => (
  <div className="w-full h-full bg-linear-to-br from-accent-secondary/10 to-accent-primary/10 flex items-center justify-center p-6">
    <div className="space-y-3 w-full">
      <div className="flex items-center gap-2">
        <Search className="h-6 w-6 text-accent-primary" />
        <div className="h-3 bg-primary/10 rounded flex-1" />
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-1">
          <div className="h-2 bg-primary/10 rounded w-full" />
          <div className="h-2 bg-primary/5 rounded w-4/5" />
        </div>
      ))}
    </div>
  </div>
);

// Paid Media placeholder
const PaidMediaPlaceholder = () => (
  <div className="w-full h-full bg-linear-to-br from-accent-primary/10 to-primary/5 flex items-center justify-center p-6">
    <div className="space-y-3 w-full">
      <div className="flex justify-between items-center">
        <Rocket className="h-8 w-8 text-accent-primary" />
        <div className="text-right">
          <div className="h-4 bg-accent-primary/20 rounded w-16 mb-1" />
          <div className="h-2 bg-primary/10 rounded w-12" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 items-end h-20">
        {[40, 70, 50, 90].map((height, i) => (
          <div
            key={i}
            className="bg-accent-primary/20 rounded-t"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  </div>
);

// Social Media placeholder
const SocialMediaPlaceholder = () => (
  <div className="w-full h-full bg-linear-to-br from-accent-secondary/10 to-primary/5 flex items-center justify-center p-6">
    <div className="grid grid-cols-2 gap-3 w-full">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="aspect-square rounded-lg bg-primary/10 flex items-center justify-center">
          <Megaphone className="h-6 w-6 text-accent-secondary/40" />
        </div>
      ))}
    </div>
  </div>
);

// Email Marketing placeholder
const EmailMarketingPlaceholder = () => (
  <div className="w-full h-full bg-linear-to-br from-primary/5 to-accent-primary/10 flex items-center justify-center p-6">
    <div className="space-y-3 w-full">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-card border border-standard/50">
          <Mail className="h-5 w-5 text-accent-primary mt-1" />
          <div className="space-y-2 flex-1">
            <div className="h-2 bg-primary/10 rounded w-3/4" />
            <div className="h-2 bg-primary/5 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Analytics chart component
const AnalyticsChart = () => (
  <div className="w-full bg-linear-to-br from-accent-primary/5 to-accent-secondary/5 flex items-center justify-center p-2">
    <ResponsiveContainer width="100%" aspect={2}>
      <AreaChart 
        data={analyticsData}
        margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--accent-primary))" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="hsl(var(--accent-primary))" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--text-primary))" opacity={0.1} />
        <XAxis 
          dataKey="month" 
          stroke="hsl(var(--text-primary))" 
          opacity={0.5}
          fontSize={11}
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          stroke="hsl(var(--text-primary))" 
          opacity={0.5}
          fontSize={11}
          tickLine={false}
          axisLine={false}
          width={35}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            border: '1px solid hsl(var(--border-standard))',
            borderRadius: '8px',
            fontSize: '12px'
          }}
        />
        <Area 
          type="monotone" 
          dataKey="value" 
          stroke="hsl(var(--accent-primary))" 
          strokeWidth={2.5}
          fill="url(#colorValue)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

const services: ServiceTemplate[] = [
  {
    slug: "branding-and-graphics",
    title: "Branding & Graphics",
    description: "Identity systems, guidelines, and logo suites aligned to strategy.",
    icon: <Brush className="h-5 w-5 text-primary" />,
    header: <BrandShowcase />,
    colorVariant: "default" as const,
    className: "md:col-span-2",
  },
  {
    slug: "seo-content-strategy",
    title: "SEO & Content Strategy",
    description: "Data-backed content plans that grow qualified organic traffic.",
    icon: <Search className="h-5 w-5 text-primary" />,
    header: <SEOContentHeat />,
    colorVariant: "dark" as const,
  },
  {
    slug: "paid-media-sem",
    title: "Paid Media & SEM",
    description: "High-intent acquisition across search and performance channels.",
    icon: <Rocket className="h-5 w-5 text-primary" />,
    header: <AcquisitionFunnel />,
    colorVariant: "dark" as const,
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    description: "Full-funnel social programs with clear attribution.",
    icon: <Megaphone className="h-5 w-5 text-primary" />,
    header: <SocialMediaGrid />,
    colorVariant: "default" as const,
    className: "md:col-span-2",
  },
  {
    slug: "email-marketing",
    title: "Email Marketing",
    description: "Lifecycle automation and CRM-integrated campaigns.",
    icon: <Mail className="h-5 w-5 text-primary" />,
    header: <EmailMarketing />,
    colorVariant: "default" as const,
    className: "md:col-span-2",
  },
  {
    slug: "analytics-and-reporting",
    title: "Analytics & Reporting",
    description: "Decision-grade dashboards and insight loops.",
    icon: <BarChart3 className="h-5 w-5 text-primary" />,
    header: <AnalyticsChart />,
    colorVariant: "dark" as const,
  },
];

const getIconForService = (
  iconKey: string | undefined,
  fallbackIcon: React.ReactNode,
) => {
  switch (iconKey) {
    case "Brush":
    case "brush":
      return <Brush className="h-5 w-5 text-primary" />;
    case "Search":
    case "search":
      return <Search className="h-5 w-5 text-primary" />;
    case "Rocket":
    case "rocket":
      return <Rocket className="h-5 w-5 text-primary" />;
    case "Megaphone":
    case "megaphone":
      return <Megaphone className="h-5 w-5 text-primary" />;
    case "Mail":
    case "mail":
      return <Mail className="h-5 w-5 text-primary" />;
    case "BarChart3":
    case "barchart3":
    case "barChart3":
      return <BarChart3 className="h-5 w-5 text-primary" />;
    default:
      return fallbackIcon;
  }
};

const getTemplateFromIconKey = (iconKey: string | undefined) => {
  const normalizedKey = iconKey?.toLowerCase();

  switch (normalizedKey) {
    case "brush":
      return services.find((template) => template.slug === "branding-and-graphics");
    case "search":
      return services.find((template) => template.slug === "seo-content-strategy");
    case "rocket":
      return services.find((template) => template.slug === "paid-media-sem");
    case "megaphone":
      return services.find((template) => template.slug === "social-media-marketing");
    case "mail":
      return services.find((template) => template.slug === "email-marketing");
    case "barchart3":
    case "barChart3":
      return services.find((template) => template.slug === "analytics-and-reporting");
    default:
      return undefined;
  }
};

const ServicesShowcase: React.FC<ServicesShowcaseProps> = ({
  className,
  servicesFromCms,
  ...props
}) => {
  const resolvedServices: ResolvedService[] =
    servicesFromCms && Array.isArray(servicesFromCms) && servicesFromCms.length > 0
      ? servicesFromCms.map((service: CmsService, index: number): ResolvedService => {
          const slugFromCms =
            typeof service.slug === "string"
              ? service.slug
              : service.slug?.current;
          const templateFromSlug = slugFromCms
            ? services.find((template) => template.slug === slugFromCms)
            : undefined;
          const templateFromIcon =
            !templateFromSlug && typeof service.icon === "string"
              ? getTemplateFromIconKey(service.icon)
              : undefined;
          const fallbackTemplate = services[index] ?? services[0];
          const template = templateFromSlug ?? templateFromIcon ?? fallbackTemplate;
          const hasTemplateMatch = Boolean(templateFromSlug ?? templateFromIcon);

          const slug = slugFromCms || template.slug;
          const title = service.title || template.title;
          const description =
            service.subtitle || service.description || template.description;
          const icon = getIconForService(service.icon, template.icon);

          return hasTemplateMatch
            ? {
                ...template,
                _id: service._id,
                slug,
                title,
                description,
                icon,
              }
            : {
                _id: service._id,
                slug,
                title,
                description,
                icon,
                header: undefined,
                colorVariant: "default" as const,
                className: undefined,
              };
        })
      : services;

  return (
    <section id="services" className={cn("py-24", className)} {...props}>
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="mb-10 space-y-4 text-center">
          <h2 className="h2 text-primary max-w-4xl mx-auto">
            <BlurText
              as="span"
              text="Your fractional growth"
              className="inline"
              textClassName="text-primary"
              delay={30}
              animateBy="words"
              direction="top"
            />
            <span className="text-accent-primary">
              {" "}
              marketing partners
            </span>
          </h2>
          <p className="subtext-large text-primary/80 max-w-[640px] mx-auto">
            Senior growth partners embedded into your team to design, run, and optimize your full marketing ecosystem.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[40px] border border-standard bg-card p-6 sm:p-8 lg:p-12 shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-shadow duration-300">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-20%,hsl(var(--accent-primary)/0.04),transparent_60%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_80%_120%,hsl(var(--accent-secondary)/0.03),transparent_60%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--text-primary)/0.03)_1px,transparent_1px)] bg-size-[20px_20px] opacity-[0.4]"></div>
          </div>
          <div className="relative">
            <BentoGrid>
              {resolvedServices.map((s, i) => {
                // Dark bg for SEO (colorful calendar pops), Paid Media (funnel), Analytics (chart)
                const colorVariant = s.colorVariant ?? "default";
                const isDark = colorVariant === "dark";
                return (
                  <BentoGridItem
                    key={s._id || s.slug || i}
                    title={s.title}
                    description={
                      <div className="space-y-2">
                        <p className={isDark ? "body-default text-white/70" : "body-default text-primary/70"}>{s.description}</p>
                        <Link
                          href={`/our-partnership-model/${s.slug}`}
                          className={isDark 
                            ? "inline-flex items-center gap-1 text-xs font-medium text-accent-primary hover:underline" 
                            : "inline-flex items-center gap-1 text-xs font-medium text-accent-primary hover:underline"
                          }
                        >
                          Learn more
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                      </div>
                    }
                    header={
                      s.header ? (
                        <HeaderBlock className="min-h-48">{s.header}</HeaderBlock>
                      ) : undefined
                    }
                    icon={s.icon}
                    colorVariant={colorVariant}
                    className={s.className}
                  />
                );
              })}
            </BentoGrid>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;
