import type { Metadata } from "next";
import { 
  AboutHero, 
  TeamIDCards, 
  PartnershipPhilosophy,
  KPIHighlights,
  HowWeWorkSticky,
  Testimonials,
  FAQ
} from "@/components";
import { getClient } from "@/lib/sanity/client";
import { aboutPageQuery, globalProcessQuery, faqGroupByKeyQuery, teamMembersQuery, partnershipPhilosophyQuery, kpiHighlightsQuery } from "@/lib/sanity/queries";
import type { FAQItem } from "@/components/sections/FAQ";

const ABOUT_FAQ_ITEMS = [
  {
    id: "who-you-work-with",
    question: "Who will we actually work with day to day?",
    answer:
      "You work directly with senior partners—not a rotating cast of juniors. Each engagement has a clear lead who owns strategy, plus specialists who plug in for design, media, content, and analytics as needed.",
  },
  {
    id: "timezones-availability",
    question: "How do you handle time zones and meeting cadence?",
    answer:
      "Most partners prefer a weekly or bi-weekly working session, plus async check-ins via email or your preferred tools. We align to your team’s schedule and board calendar so conversations happen when they’re most useful.",
  },
  {
    id: "team-fit",
    question: "What does a good fit for VIP Creative Studio look like?",
    answer:
      "We’re best suited for credit unions and financial teams who want senior partners they can trust, clear reporting, and collaborative ways of working—not just a vendor handing over assets.",
  },
];

const DEFAULT_ABOUT_METADATA: Metadata = {
  title: "About Us",
  description:
    "Meet the senior marketing team behind VIP Creative Studio. We embed as your fractional partners to drive measurable growth for credit unions and financial institutions.",
  openGraph: {
    title: "About VIP Creative Studio | Fractional Marketing Partners",
    description:
      "Meet the senior marketing team behind VIP Creative Studio. We embed as your fractional partners to drive measurable growth.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  try {
    const aboutPage = await getClient().fetch(aboutPageQuery);
    const seo = aboutPage?.seo;

    if (!seo) return DEFAULT_ABOUT_METADATA;

    return {
      ...DEFAULT_ABOUT_METADATA,
      title: seo.metaTitle ?? DEFAULT_ABOUT_METADATA.title,
      description: seo.metaDescription ?? DEFAULT_ABOUT_METADATA.description,
      openGraph: {
        ...(DEFAULT_ABOUT_METADATA.openGraph ?? {}),
        title: seo.metaTitle ?? DEFAULT_ABOUT_METADATA.openGraph?.title,
        description:
          seo.metaDescription ?? DEFAULT_ABOUT_METADATA.openGraph?.description,
      },
    };
  } catch {
    return DEFAULT_ABOUT_METADATA;
  }
}

export default async function AboutPage() {
  const [
    aboutPage,
    globalProcess,
    aboutFaqGroup,
    teamMembers,
    partnershipPhilosophy,
    kpiHighlights,
  ] = await Promise.all([
    getClient().fetch(aboutPageQuery),
    getClient().fetch(globalProcessQuery),
    getClient().fetch(faqGroupByKeyQuery, { key: "about" }),
    getClient().fetch(teamMembersQuery),
    getClient().fetch(partnershipPhilosophyQuery),
    getClient().fetch(kpiHighlightsQuery),
  ]);

  const fallbackHeroTitle = "The Experts Behind Your Growth";
  const fallbackHeroSubtitle =
    "Our team of seasoned professionals brings a wealth of experience in crafting innovative marketing strategies tailored for financial institutions. We're committed to driving your success through creative solutions and data-driven insights.";
  const fallbackPrimaryCta = {
    label: "Book a Discovery Call",
    href: "/contact",
  };
  const fallbackSecondaryCta = {
    label: "Our Partnership Model",
    href: "/our-partnership-model",
  };

  const heroTitle = aboutPage?.heroTitle ?? fallbackHeroTitle;
  const heroSubtitle = aboutPage?.heroSubtitle ?? fallbackHeroSubtitle;
  const primaryCtaLabel = aboutPage?.primaryCta?.label ?? fallbackPrimaryCta.label;
  const primaryCtaHref = aboutPage?.primaryCta?.href ?? fallbackPrimaryCta.href;
  const secondaryCtaLabel = aboutPage?.secondaryCta?.label ?? fallbackSecondaryCta.label;
  const secondaryCtaHref = aboutPage?.secondaryCta?.href ?? fallbackSecondaryCta.href;

  const aboutFaqItemsFromCms: FAQItem[] | null =
    aboutFaqGroup?.items && Array.isArray(aboutFaqGroup.items) && aboutFaqGroup.items.length > 0
      ? aboutFaqGroup.items.map((item: any, index: number) => ({
          id: item.id || ABOUT_FAQ_ITEMS[index]?.id || String(index),
          question: item.question || ABOUT_FAQ_ITEMS[index]?.question || "",
          answer: item.answer || ABOUT_FAQ_ITEMS[index]?.answer || "",
        }))
      : null;

  const faqItems: FAQItem[] = aboutFaqItemsFromCms ?? ABOUT_FAQ_ITEMS;

  const faqSubtitle =
    aboutFaqGroup?.subtitle ||
    "Questions about who we are and how we work as your fractional partners.";

  return (
    <main className="min-h-screen">
      <AboutHero
        heroTitle={heroTitle}
        heroSubtitle={heroSubtitle}
        primaryCtaLabel={primaryCtaLabel}
        primaryCtaHref={primaryCtaHref}
        secondaryCtaLabel={secondaryCtaLabel}
        secondaryCtaHref={secondaryCtaHref}
      />
      <TeamIDCards sanityMembers={teamMembers} />
      <PartnershipPhilosophy
        title={partnershipPhilosophy?.title}
        subtitle={partnershipPhilosophy?.subtitle}
        items={partnershipPhilosophy?.items}
      />
      <HowWeWorkSticky
        title={globalProcess?.title}
        subtitle={globalProcess?.subtitle}
        stepsOverride={globalProcess?.steps}
      />
      <Testimonials />
      <KPIHighlights metricsFromCms={kpiHighlights?.metrics} />
      <FAQ
        items={faqItems}
        subtitle={faqSubtitle}
      />
    </main>
  );
}
