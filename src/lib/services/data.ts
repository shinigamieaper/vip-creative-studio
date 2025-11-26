export type ServiceSlug =
  | "branding-and-graphics"
  | "seo-content-strategy"
  | "paid-media-sem"
  | "social-media-marketing"
  | "email-marketing"
  | "analytics-and-reporting";

export interface ServiceOutcome {
  title: string;
  description: string;
  icon: "chart" | "users" | "shield" | "layers";
}

export interface ServiceProcessStep {
  title: string;
  description: string;
  features?: string[];
}

export interface ServiceDefinition {
  slug: ServiceSlug;
  title: string;
  subtitle: string;
  heroFlipWords?: string[];
  approach?: {
    title?: string; // Optional override
    description: string;
    outcomes: ServiceOutcome[];
  };
  process?: {
    steps: ServiceProcessStep[];
  };
}

export const SERVICES: ServiceDefinition[] = [
  {
    slug: "branding-and-graphics",
    title: "Branding & Graphics",
    subtitle: "Identity systems, guidelines, and logo suites aligned to strategy.",
    heroFlipWords: [
      "cohesive visual systems your members recognize.",
      "brand stories your board can stand behind.",
      "branch and digital touchpoints that feel unified.",
      "design that signals stability and innovation.",
    ],
    approach: {
      description: "We treat your visual identity as a strategic asset that drives trust, not just a coat of paint. Our systems are built to scale with your credit union.",
      outcomes: [
        {
          title: "Board-Ready Clarity",
          description: "Reporting and rationale that executives understand, connecting creative decisions to growth goals.",
          icon: "chart",
        },
        {
          title: "Member Trust",
          description: "Consistent, accessible designs that reinforce reliability across every touchpoint.",
          icon: "shield",
        },
        {
          title: "Internal Alignment",
          description: "Clear guidelines and templates that empower your internal team to move faster without breaking the brand.",
          icon: "users",
        },
        {
          title: "Vendor Orchestration",
          description: "A single source of truth for all partners, ensuring consistency across print, digital, and branches.",
          icon: "layers",
        },
      ],
    },
    process: {
      steps: [
        {
          title: "Brand discovery & audit",
          description:
            "We dig into your brand history, member perceptions, and competitive landscape to understand what trust looks like for your audience.",
          features: [
            "Stakeholder and board interviews",
            "Visual and messaging consistency review",
            "Audit across branches, web, and campaigns",
          ],
        },
        {
          title: "Visual direction & system design",
          description:
            "We define a scalable visual language that can live across branches, campaigns, and digital products without fragmenting.",
          features: [
            "Core logo, color, and type system decisions",
            "Component and layout patterns for key touchpoints",
            "Accessibility and compliance guardrails",
          ],
        },
        {
          title: "Asset creation & rollout",
          description:
            "We build out the assets and templates your team actually needs, from campaigns to in-branch collateral.",
          features: [
            "Template libraries for core use cases",
            "Launch kits for internal and external partners",
            "Guidance on phasing the rollout by risk",
          ],
        },
        {
          title: "Governance & ongoing support",
          description:
            "We help you maintain standards over time so the brand stays consistent as new campaigns and vendors come online.",
          features: [
            "Living brand guidelines and training",
            "Review rituals for high-visibility assets",
            "Periodic audits and refinement recommendations",
          ],
        },
      ],
    },
  },
  {
    slug: "seo-content-strategy",
    title: "SEO & Content Strategy",
    subtitle: "Data-backed content plans that grow qualified organic traffic.",
    heroFlipWords: [
      "content your members actually search for and read.",
      "organic growth that compounds quarter after quarter.",
      "traffic that converts into deeper member relationships.",
      "search performance your board can clearly understand.",
    ],
    process: {
      steps: [
        {
          title: "Search discovery & audit",
          description:
            "We review your current rankings, on-site content, and technical health to see where you are winning and where you are invisible.",
          features: [
            "Technical and content SEO audit",
            "Competitor and SERP landscape analysis",
            "Baseline reporting you can share with leadership",
          ],
        },
        {
          title: "Strategy & content roadmap",
          description:
            "We define themes, keywords, and formats that match how members actually search for your products and education.",
          features: [
            "Prioritized keyword and topic clusters",
            "Editorial calendar mapped to products and goals",
            "Guardrails for compliance and brand voice",
          ],
        },
        {
          title: "Production & on-site optimization",
          description:
            "We ship content and optimize existing pages so both members and search engines get clear, useful answers.",
          features: [
            "New content briefs and outlines",
            "On-page optimization for key journeys",
            "Internal linking and schema recommendations",
          ],
        },
        {
          title: "Reporting & iteration",
          description:
            "We track the right metrics, communicate results in plain language, and refine the plan as search behavior shifts.",
          features: [
            "Rankings, traffic, and conversion dashboards",
            "Plain-English summaries for board and execs",
            "Quarterly roadmap adjustments based on data",
          ],
        },
      ],
    },
  },
  {
    slug: "paid-media-sem",
    title: "Paid Media & SEM",
    subtitle: "High-intent acquisition across search and performance channels.",
    heroFlipWords: [
      "high-intent campaigns tuned to your risk profile.",
      "media plans your compliance team can fully trust.",
      "SEM strategies tied directly to deposit growth.",
      "spend decisions backed by clear, shared reporting.",
    ],
    process: {
      steps: [
        {
          title: "Acquisition audit & forecasting",
          description:
            "We review your current media mix, funnel performance, and risk constraints to see where paid can safely drive growth.",
          features: [
            "Channel and campaign performance review",
            "Member journey and offer mapping",
            "Forecasts aligned to board-level targets",
          ],
        },
        {
          title: "Channel and budget strategy",
          description:
            "We recommend where to show up, how much to spend, and what to say based on intent, margin, and compliance needs.",
          features: [
            "Mix of search, display, and paid social",
            "Budget scenarios tied to deposit and loan goals",
            "Approval-ready strategy decks for stakeholders",
          ],
        },
        {
          title: "Campaign build & launch",
          description:
            "We build campaigns, audiences, and creative that respect your brand and credit union regulations from day one.",
          features: [
            "Audience and keyword structures that scale",
            "Ad copy and creative aligned to brand",
            "QA checklists for tracking and compliance",
          ],
        },
        {
          title: "Optimization & scaling",
          description:
            "We monitor performance, protect downside risk, and scale only what is working and defensible.",
          features: [
            "Ongoing bid and budget adjustments",
            "Creative and landing page testing plans",
            "Transparent reporting with clear next steps",
          ],
        },
      ],
    },
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    subtitle: "Full-funnel social programs with clear attribution.",
    heroFlipWords: [
      "conversations that turn followers into loyal members.",
      "programs tuned to each member segment and need.",
      "social listening that drives smarter brand decisions.",
      "paid and organic working as one connected system.",
    ],
    process: {
      steps: [
        {
          title: "Listening & channel audit",
          description:
            "We review what members are saying, where you show up today, and how competitors are using social in your market.",
          features: [
            "Channel-by-channel performance review",
            "Community and sentiment analysis",
            "Audit of content formats and cadence",
          ],
        },
        {
          title: "Social strategy & calendar",
          description:
            "We define roles for organic and paid, map content to member journeys, and lock in a realistic publishing rhythm.",
          features: [
            "Strategic pillars and content themes",
            "Channel-specific posting guidelines",
            "Approval-ready content calendar",
          ],
        },
        {
          title: "Production & community management",
          description:
            "We help you create and ship content, then engage with members in a way that feels human and on-brand.",
          features: [
            "Content briefs and creative direction",
            "Playbooks for handling member questions",
            "Coordination with internal teams and partners",
          ],
        },
        {
          title: "Measurement & refinement",
          description:
            "We track what drives awareness, traffic, and product interest, then adjust the mix without losing your voice.",
          features: [
            "Dashboards for reach, engagement, and clicks",
            "Attribution views tied to key campaigns",
            "Quarterly reviews and adjustment plans",
          ],
        },
      ],
    },
  },
  {
    slug: "email-marketing",
    title: "Email Marketing",
    subtitle: "Lifecycle automation and CRM-integrated campaigns.",
    heroFlipWords: [
      "member journeys that never feel like generic spam.",
      "lifecycle flows tuned to each core product.",
      "messages that respect time and build real trust.",
      "automation with clear, compliant human messaging.",
    ],
    process: {
      steps: [
        {
          title: "Data & lifecycle audit",
          description:
            "We assess your CRM, current campaigns, and member journeys to see where email is helping or hurting.",
          features: [
            "Analysis of lists, segments, and triggers",
            "Review of current journeys and campaigns",
            "Deliverability and compliance check",
          ],
        },
        {
          title: "Journey design & mapping",
          description:
            "We design member-centric journeys for onboarding, cross-sell, and retention that respect member attention.",
          features: [
            "Visual maps of key lifecycle sequences",
            "Rules for who enters, pauses, or exits flows",
            "Content strategy aligned to trust and clarity",
          ],
        },
        {
          title: "Build, QA, and launch",
          description:
            "We build templates, set up logic, and test across devices so each send works technically and contextually.",
          features: [
            "Reusable templates aligned to your brand",
            "Automation rules configured and tested",
            "Compliance and QA sign-off before launch",
          ],
        },
        {
          title: "Optimization & testing",
          description:
            "We refine based on engagement and revenue, testing variables without overwhelming your members.",
          features: [
            "A/B tests on subject lines and content",
            "Cadence and timing experiments",
            "Reporting focused on member and revenue impact",
          ],
        },
      ],
    },
  },
  {
    slug: "analytics-and-reporting",
    title: "Analytics & Reporting",
    subtitle: "Decision-grade dashboards and insight loops.",
    heroFlipWords: [
      "dashboards that cut through noise, not add it.",
      "metrics your board can act on with confidence.",
      "insights that de-risk big marketing decisions.",
      "reporting stitched together across every channel.",
    ],
    process: {
      steps: [
        {
          title: "Data & tracking audit",
          description:
            "We evaluate what is being tracked today, where data is broken, and which questions your team cannot yet answer.",
          features: [
            "Tagging and pixel implementation review",
            "Source of truth and system inventory",
            "Gap analysis against key decisions",
          ],
        },
        {
          title: "Measurement strategy design",
          description:
            "We define which metrics matter, how they roll up, and how they will be presented to different stakeholders.",
          features: [
            "North-star and supporting KPI definitions",
            "Attribution and funnel measurement approach",
            "Reporting cadences by audience",
          ],
        },
        {
          title: "Dashboard build & rollout",
          description:
            "We build dashboards that surface the right level of detail for operators, leaders, and the board.",
          features: [
            "Operator and leadership dashboard views",
            "Definitions and documentation inside the tool",
            "Training sessions for key users",
          ],
        },
        {
          title: "Insight reviews & action",
          description:
            "We help your team interpret the data, turn findings into decisions, and adjust tactics with confidence.",
          features: [
            "Recurring performance and insight reviews",
            "Decision logs and next-step recommendations",
            "Refinements to tracking as new questions emerge",
          ],
        },
      ],
    },
  },
];

export function getServiceSlugs(): ServiceSlug[] {
  return SERVICES.map((s) => s.slug);
}

export function getServiceBySlug(slug: ServiceSlug): ServiceDefinition | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
