import React from "react";
import { notFound } from "next/navigation";
import {
  ServicesHero,
  WhyChooseUs,
  KPIHighlights,
  HowWeWorkSticky,
  Testimonials,
  ServiceApproach,
  FAQ,
} from "@/components";
import { getServiceBySlug, getServiceSlugs, type ServiceSlug, type ServiceOutcome, type ServiceDefinition } from "@/lib/services/data";
import { getClient } from "@/lib/sanity/client";
import { serviceBySlugQuery, whyChooseUsSectionQuery, featuredTestimonialsQuery, kpiHighlightsQuery } from "@/lib/sanity/queries";
import type { FAQItem } from "@/components/sections/FAQ";

const PARTNERSHIP_SERVICE_FAQ_ITEMS: Record<ServiceSlug, FAQItem[]> = {
  "branding-and-graphics": [
    {
      id: "branding-timeline",
      question: "How long does a brand refresh or rebrand usually take?",
      answer:
        "Most brand engagements run between 8–16 weeks depending on scope. We start with discovery and audit, then move into concept development, system design, and rollout support. For lighter refreshes, we can move faster while still keeping stakeholders aligned.",
    },
    {
      id: "existing-logo",
      question: "Can you work with our existing logo, or do we need a full rebrand?",
      answer:
        "We meet you where you are. Some credit unions just need a clearer system and updated templates around an existing mark, while others need a full repositioning and new identity. We’ll recommend the right level of change based on risk, budget, and member expectations.",
    },
    {
      id: "board-approvals",
      question: "How do you handle board and leadership approvals for brand work?",
      answer:
        "We build in checkpoints, rationale decks, and clear before/after examples so your board isn’t reacting to design in a vacuum. Every recommendation is tied back to trust, clarity, and growth, so approvals feel like informed decisions—not aesthetic debates.",
    },
  ],
  "seo-content-strategy": [
    {
      id: "seo-timing",
      question: "How long does it take to see results from SEO and content?",
      answer:
        "Most credit unions start to see meaningful movement in 3–6 months, with compounding gains over 12+ months. We balance quick wins on existing pages with a roadmap of new content so you’re not waiting a year to feel progress.",
    },
    {
      id: "internal-team",
      question: "Can you collaborate with our in-house writers or marketing team?",
      answer:
        "Yes. Many partners keep internal writers and SMEs. We bring strategy, briefs, and QA so your team knows what to create and how to align it with search intent, compliance, and member needs.",
    },
    {
      id: "compliance",
      question: "How do you handle compliance and approvals for educational content?",
      answer:
        "We design content frameworks and templates that match your compliance process, with clear guardrails on claims, disclosures, and wording. That keeps reviews efficient while still letting the content feel human and useful.",
    },
  ],
  "paid-media-sem": [
    {
      id: "budget-range",
      question: "What media budgets do you typically work with?",
      answer:
        "We work with a wide range of media budgets, from smaller test spends to multi-market programs. The more important factor is clarity on targets and risk tolerance. We’ll model different spend scenarios so you and your board can choose the right level.",
    },
    {
      id: "existing-agency",
      question: "Can you work alongside our existing media agency?",
      answer:
        "Yes. We can either act as your primary media partner or provide fractional strategy and oversight for an existing agency. In both cases, our focus is on clarity, reporting, and making sure every dollar is traceable back to business outcomes.",
    },
    {
      id: "risk-compliance",
      question: "How do you manage risk and compliance in paid campaigns?",
      answer:
        "We build campaigns with compliance in mind from day one—standardized disclaimers, clear offer language, and pre-approved templates. Nothing ships without passing through your required checks, and we document every change for auditability.",
    },
  ],
  "social-media-marketing": [
    {
      id: "community-management",
      question: "Do you only create posts, or do you also manage community responses?",
      answer:
        "We can support both. Some partners have internal teams handle day-to-day replies while we own strategy and content. Others ask us to help design playbooks and response guidelines so anyone representing the brand knows how to show up.",
    },
    {
      id: "platform-focus",
      question: "Which social platforms do you typically focus on for credit unions?",
      answer:
        "It depends on your market and goals, but most programs lean on a mix of Facebook, Instagram, LinkedIn, and sometimes YouTube. We prioritize the channels where your members actually pay attention—not every new network that launches.",
    },
    {
      id: "social-measurement",
      question: "How do you measure the impact of social beyond likes and follows?",
      answer:
        "We connect social activity to website behavior, inquiries, and product interest. That means tracking the right events, using attribution where possible, and translating performance into language your leadership team can use.",
    },
  ],
  "email-marketing": [
    {
      id: "platforms",
      question: "Which email or marketing automation platforms do you work with?",
      answer:
        "We’re platform-agnostic and have worked with most major tools used by credit unions. In onboarding, we review your current stack and either optimize what you have or recommend a pragmatic path forward if a change is needed.",
    },
    {
      id: "crm-core",
      question: "Can you connect email journeys back to our core or CRM data?",
      answer:
        "Yes. Our focus is on making sure journeys reflect real member behavior—balances, products held, lifecycle stage—while respecting privacy and compliance requirements. We’ll work within the integrations your IT and vendors support.",
    },
    {
      id: "list-fatigue",
      question: "How do you prevent list fatigue and unsubscribes?",
      answer:
        "We design journeys around member value first, not just promotions. That means smart frequency caps, clear expectations, segmentation by needs, and regular reviews of performance so we can dial back anything that starts to feel noisy.",
    },
  ],
  "analytics-and-reporting": [
    {
      id: "existing-tools",
      question: "Do you replace our analytics tools, or work with what we have?",
      answer:
        "We start with what’s already in place—Google Analytics, data warehouses, BI tools—and identify gaps. Sometimes that means tightening up tracking and views; other times it means recommending a cleaner, more maintainable setup.",
    },
    {
      id: "implementation-timeline",
      question: "How long does it take to stand up decision-ready dashboards?",
      answer:
        "A focused analytics engagement is typically 6–10 weeks from audit to launch, depending on how many systems and stakeholders are involved. We prioritize the views your leadership needs first, then expand once the foundations are solid.",
    },
    {
      id: "data-ownership",
      question: "Who owns the data and dashboards after the engagement?",
      answer:
        "You do. We build everything inside your environments wherever possible, with shared documentation and training. When we step back, your team keeps full access, context, and the ability to evolve the setup over time.",
    },
  ],
};

function mapSanityServiceToDefinition(doc: any): ServiceDefinition {
  const slugValue = typeof doc.slug === "string" ? doc.slug : doc.slug?.current;

  return {
    slug: slugValue,
    title: doc.title ?? "",
    subtitle: doc.subtitle ?? "",
    heroFlipWords: doc.heroFlipWords ?? [],
    approach: doc.approach
      ? {
          title: undefined,
          description: doc.approach.description ?? "",
          outcomes:
            Array.isArray(doc.approach.outcomes)
              ? doc.approach.outcomes.map((outcome: any) => ({
                  title: outcome.title ?? "",
                  description: outcome.description ?? "",
                  icon: outcome.icon ?? "chart",
                }))
              : [],
        }
      : undefined,
    process: doc.process && Array.isArray(doc.process.steps)
      ? {
          steps: doc.process.steps.map((step: any) => ({
            title: step.title ?? "",
            description: step.description ?? "",
            features: step.features ?? [],
          })),
        }
      : undefined,
  };
}

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export default async function PartnershipModelSlugPage({ params }: { params: Promise<{ slug: ServiceSlug }> }) {
  const { slug } = await params;

  const [sanityDoc, whyChooseUsSection, featuredTestimonials, kpiHighlights] = await Promise.all([
    getClient().fetch(serviceBySlugQuery, { slug }),
    getClient().fetch(whyChooseUsSectionQuery),
    getClient().fetch(featuredTestimonialsQuery),
    getClient().fetch(kpiHighlightsQuery),
  ]);

  const sanityService = sanityDoc ? mapSanityServiceToDefinition(sanityDoc) : undefined;
  const fallbackService = getServiceBySlug(slug);
  const service = sanityService ?? fallbackService;

  if (!service) return notFound();

  const serviceFaqItemsFromCms: FAQItem[] | null =
    sanityDoc?.faqs && Array.isArray(sanityDoc.faqs) && sanityDoc.faqs.length > 0
      ? sanityDoc.faqs.map((item: any, index: number) => {
          const fallback = PARTNERSHIP_SERVICE_FAQ_ITEMS[slug]?.[index];

          return {
            id: item.id || fallback?.id || String(index),
            question: item.question || fallback?.question || "",
            answer: item.answer || fallback?.answer || "",
          };
        })
      : null;

  const faqItems: FAQItem[] = serviceFaqItemsFromCms ?? PARTNERSHIP_SERVICE_FAQ_ITEMS[slug];

  const heroTitlePrefix = `${service.title} that delivers`;
  const fallbackHeroFlipWords = [
    "measurable member growth.",
    "clarity your board can stand behind.",
    "less noise, more qualified demand.",
    "marketing you can actually attribute.",
  ];
  const heroFlipWords = service.heroFlipWords ?? fallbackHeroFlipWords;
  const heroDescription = service.subtitle;

  const defaultApproach = {
    title: undefined,
    description: "We treat each channel as part of a single growth system, not a collection of disconnected campaigns.",
    outcomes: [
      { 
        title: "Strategic Clarity", 
        description: "Aligning every tactic to your broader business goals.", 
        icon: "chart" 
      },
      { 
        title: "Member-Centricity", 
        description: "Focusing on member needs to drive genuine engagement.", 
        icon: "users" 
      },
      { 
        title: "Data-Driven Decisions", 
        description: "Using analytics to guide optimization and spend.", 
        icon: "layers" 
      },
      { 
        title: "Risk Mitigation", 
        description: "Ensuring compliance and brand safety in every execution.", 
        icon: "shield" 
      },
    ] as ServiceOutcome[]
  };

  const approachData = service.approach || defaultApproach;

  const processStepsOverride = service.process?.steps.map((step) => ({
    title: step.title,
    description: step.description,
    features: step.features,
  }));

  return (
    <main className="min-h-screen">
      <ServicesHero
        titlePrefix={heroTitlePrefix}
        flipWords={heroFlipWords}
        description={heroDescription}
        showSecondary={false}
      />
      
      <ServiceApproach 
        serviceTitle={service.title}
        description={approachData.description}
        outcomes={approachData.outcomes}
        customTitle={approachData.title}
      />

      <WhyChooseUs
        title={whyChooseUsSection?.title}
        subtitle={whyChooseUsSection?.subtitle}
        items={whyChooseUsSection?.items}
        highlightCard={whyChooseUsSection?.highlightCard}
      />
      <HowWeWorkSticky stepsOverride={processStepsOverride} />
      <KPIHighlights metricsFromCms={kpiHighlights?.metrics} />
      <Testimonials sanityTestimonials={featuredTestimonials} />
      {faqItems && faqItems.length > 0 && (
        <FAQ
          items={faqItems}
          subtitle={`Questions about ${service.title}? Here are the ones we hear most often.`}
        />
      )}
    </main>
  );
}
