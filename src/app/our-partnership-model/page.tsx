import type { Metadata } from "next";
import { ServicesHero, ServicesShowcase, FAQ } from "@/components";
import PartnershipPhilosophy from "@/components/sections/PartnershipPhilosophy";
import { getClient } from "@/lib/sanity/client";
import { servicesPageQuery, faqGroupByKeyQuery, servicesQuery, partnershipPhilosophyQuery } from "@/lib/sanity/queries";
import type { FAQItem } from "@/components/sections/FAQ";

const PARTNERSHIP_FAQ_ITEMS = [
  {
    id: "engagement-length",
    question: "How long do fractional partnerships typically last?",
    answer:
      "Most partners begin with a 3–6 month engagement so we can prove impact, then extend on a quarterly or annual basis. Some relationships stay fractional long term; others evolve into focused support once core systems are in place.",
  },
  {
    id: "fractional-vs-fulltime",
    question: "How does this compare to hiring a full-time senior marketer?",
    answer:
      "With a fractional model you get a bench of senior specialists for a fraction of the cost of one full-time executive. You’re not paying for idle time or roles you don’t need yet, but you still get decision-grade strategy and execution.",
  },
  {
    id: "ramp-down-up",
    question: "Can we ramp the engagement up or down as our needs change?",
    answer:
      "Yes. We build in review points where we can adjust scope, focus areas, and cadence based on performance, budget, and internal capacity—without disrupting your members or campaigns.",
  },
];

const DEFAULT_PARTNERSHIP_METADATA: Metadata = {
  title: "Our Partnership Model",
  description:
    "Discover how VIP Creative Studio's fractional partnership model works. We embed senior marketing expertise into your credit union at a fraction of full-time cost.",
  openGraph: {
    title: "Fractional Partnership Model | VIP Creative Studio",
    description:
      "Senior marketing expertise embedded into your credit union at a fraction of full-time cost.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  try {
    const servicesPage = await getClient().fetch(servicesPageQuery);
    const seo = servicesPage?.seo;

    if (!seo) return DEFAULT_PARTNERSHIP_METADATA;

    return {
      ...DEFAULT_PARTNERSHIP_METADATA,
      title: seo.metaTitle ?? DEFAULT_PARTNERSHIP_METADATA.title,
      description:
        seo.metaDescription ?? DEFAULT_PARTNERSHIP_METADATA.description,
      openGraph: {
        ...(DEFAULT_PARTNERSHIP_METADATA.openGraph ?? {}),
        title: seo.metaTitle ?? DEFAULT_PARTNERSHIP_METADATA.openGraph?.title,
        description:
          seo.metaDescription ?? DEFAULT_PARTNERSHIP_METADATA.openGraph?.description,
      },
    };
  } catch {
    return DEFAULT_PARTNERSHIP_METADATA;
  }
}

export default async function PartnershipModelPage() {
  const [servicesPage, partnershipFaqGroup, services, partnershipPhilosophy] =
    await Promise.all([
      getClient().fetch(servicesPageQuery),
      getClient().fetch(faqGroupByKeyQuery, { key: "partnership" }),
      getClient().fetch(servicesQuery),
      getClient().fetch(partnershipPhilosophyQuery),
    ]);

  const fallbackTitle = "More Than a Vendor. We're Your Fractional Partner for";
  const fallbackSubtitle =
    "We don't just execute campaignswe become an integral part of your team, bringing strategic expertise and creative excellence to every initiative.";
  const fallbackPrimaryCta = {
    label: "Book a Discovery Call",
    href: "/contact",
  };
  const fallbackSecondaryCta = {
    label: "Explore Our Services",
    href: "#services",
  };

  const heroTitle = servicesPage?.heroTitle ?? fallbackTitle;
  const heroSubtitle = servicesPage?.heroSubtitle ?? fallbackSubtitle;
  const primaryCtaLabel = servicesPage?.primaryCta?.label ?? fallbackPrimaryCta.label;
  const primaryCtaHref = servicesPage?.primaryCta?.href ?? fallbackPrimaryCta.href;
  const secondaryCtaLabel = servicesPage?.secondaryCta?.label ?? fallbackSecondaryCta.label;
  const secondaryCtaHref = servicesPage?.secondaryCta?.href ?? fallbackSecondaryCta.href;

  const partnershipFaqItemsFromCms: FAQItem[] | null =
    partnershipFaqGroup?.items &&
    Array.isArray(partnershipFaqGroup.items) &&
    partnershipFaqGroup.items.length > 0
      ? partnershipFaqGroup.items.map((item: any, index: number) => ({
          id: item.id || PARTNERSHIP_FAQ_ITEMS[index]?.id || String(index),
          question: item.question || PARTNERSHIP_FAQ_ITEMS[index]?.question || "",
          answer: item.answer || PARTNERSHIP_FAQ_ITEMS[index]?.answer || "",
        }))
      : null;

  const faqItems: FAQItem[] = partnershipFaqItemsFromCms ?? PARTNERSHIP_FAQ_ITEMS;

  const faqSubtitle =
    partnershipFaqGroup?.subtitle ||
    "How our fractional partnership model works in practicebefore you commit.";

  return (
    <main className="min-h-screen">
      <ServicesHero
        titlePrefix={heroTitle}
        description={heroSubtitle}
        showSecondary={false}
        primaryCtaLabel={primaryCtaLabel}
        primaryCtaHref={primaryCtaHref}
        secondaryCtaLabel={secondaryCtaLabel}
        secondaryCtaHref={secondaryCtaHref}
      />
      <PartnershipPhilosophy
        title={partnershipPhilosophy?.title}
        subtitle={partnershipPhilosophy?.subtitle}
        items={partnershipPhilosophy?.items}
      />
      <ServicesShowcase servicesFromCms={services} />
      <FAQ
        items={faqItems}
        subtitle={faqSubtitle}
      />
    </main>
  );
}
