export type ResourceCategory = "Budgeting & Finance" | "Savings & Investing" | "Payments & Digital Wallets" | "App Updates" | "Marketing Strategy" | "Industry Reports";

export type ResourceType = "Article" | "Guide" | "Case Study" | "Report" | "Webinar" | "Template" | "Tool" | "Ebook";

export type ResourceGroup = "insights" | "success-stories" | "resources";

export interface Author {
  name: string;
  role: string;
  avatar?: string;
}

export interface Client {
  name: string;
  industry?: string;
  logo?: string;
  description?: string;
  // Optional primary contact for testimonials / case studies
  contactName?: string;
  contactRole?: string;
  contactAvatar?: string;
}

export interface Resource {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  galleryImages?: string[];
  category: ResourceCategory;
  type: ResourceType;
  tags: string[];
  author: Author;
  publishedAt: string;
  readTime: number; // in minutes
  featured?: boolean;
  content?: string; // Will be replaced with Sanity PortableText later
  client?: Client; // Optional client info for case studies
  // Insights-specific fields
  keyPoints?: string[]; // TL;DR bullet points shown at top of article
  tableOfContents?: { id: string; title: string; level: number }[]; // Auto-generated or manual ToC
  // Webinar-specific fields
  webinar?: {
    date: string; // e.g. "Dec 15, 2024"
    time: string; // e.g. "2:00 PM EST"
    duration: number; // in minutes
    registrationUrl?: string;
    recordingUrl?: string; // for past webinars
    speakers?: { name: string; role: string; avatar?: string }[];
    isLive?: boolean; // true if upcoming, false if recording
  };
  // Template/Tool-specific fields
  downloadable?: {
    format: string; // e.g. "PDF", "Excel", "Google Sheets", "Figma"
    fileSize?: string; // e.g. "2.4 MB"
    downloadUrl: string;
    previewImages?: string[]; // screenshots of the template
    features?: string[]; // key features/what's included
  };
  // Case-study-specific structured fields
  resultsMetrics?: {
    label: string;
    value: number;
    unit?: string;
    description?: string;
  }[];
  challengeSection?: {
    eyebrow?: string;
    title?: string;
    summary?: string;
    painPoints?: string[];
  };
  solutionSection?: {
    eyebrow?: string;
    title?: string;
    summary?: string;
    phases?: {
      title?: string;
      description?: string;
    }[];
  };
  resultsSection?: {
    eyebrow?: string;
    title?: string;
    summary?: string;
    outcomes?: string[];
  };
  testimonial?: {
    quote?: string;
    attributionName?: string;
    attributionRole?: string;
  };
}

// Mock data for development
export const mockAuthors: Record<string, Author> = {
  "bessie-cooper": {
    name: "Bessie Cooper",
    role: "Regional Marketing Developer",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80"
  },
  "john-smith": {
    name: "John Smith",
    role: "Senior Financial Analyst",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80"
  },
  "sarah-chen": {
    name: "Sarah Chen",
    role: "Head of Digital Strategy",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb0b90cff2f?auto=format&fit=crop&w=200&q=80"
  },
  "michael-ross": {
    name: "Michael Ross",
    role: "Content Marketing Lead",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  "emily-davis": {
    name: "Emily Davis",
    role: "Senior UX Designer",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=200&q=80"
  }
};

export const mockClients: Record<string, Client> = {
  "techcorp": {
    name: "TechCorp Financial",
    industry: "FinTech",
    description: "Leading digital banking platform serving 2M+ customers"
  },
  "regional-credit-union": {
    name: "Regional Credit Union",
    industry: "Banking",
    description: "Community-focused credit union with 50K+ members",
    contactName: "Chief Digital Officer",
    contactRole: "Regional Credit Union",
    contactAvatar:
      "https://images.unsplash.com/photo-1544723795-3fb0b90cff2f?auto=format&fit=crop&w=200&q=80"
  },
  "enterprise-fintech": {
    name: "Enterprise FinTech",
    industry: "Financial Services",
    description: "Enterprise payment processing solutions provider"
  }
};

export const mockResources: Resource[] = [
  {
    slug: "cryptocurrency-risky-gamble-or-smart-investment",
    title: "Cryptocurrency: A Risky Gamble or a Smart Investment?",
    excerpt: "Discover effective strategies to manage your budget and achieve financial stability. Strategies to manage your budget or achieve.",
    coverImage: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=1600&q=80",
    category: "Budgeting & Finance",
    type: "Article",
    tags: ["cryptocurrency", "investment", "risk-management"],
    author: mockAuthors["bessie-cooper"],
    publishedAt: "Jan 06, 2024",
    readTime: 8,
    featured: true,
    keyPoints: [
      "Cryptocurrency volatility requires a long-term investment mindset and risk tolerance assessment",
      "Diversification across multiple assets remains the safest approach for most investors",
      "Regulatory developments will significantly impact crypto adoption in financial institutions",
      "Dollar-cost averaging can help mitigate timing risks in volatile markets"
    ],
    tableOfContents: [
      { id: "understanding-volatility", title: "Understanding Volatility", level: 2 },
      { id: "risk-assessment", title: "Risk Assessment Framework", level: 2 },
      { id: "diversification-strategies", title: "Diversification Strategies", level: 2 },
      { id: "regulatory-landscape", title: "The Regulatory Landscape", level: 2 },
      { id: "practical-approach", title: "A Practical Approach", level: 2 }
    ]
  },
  {
    slug: "rise-of-digital-wallets-cashless-secure-future",
    title: "The Rise of Digital Wallets and Cashless Secure Future",
    excerpt: "Discover effective strategies to manage your budget and achieve financial stability. Strategies to manage your budget or achieve.",
    coverImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80",
    category: "Payments & Digital Wallets",
    type: "Guide",
    tags: ["digital-payments", "security", "fintech"],
    author: mockAuthors["john-smith"],
    publishedAt: "Jan 04, 2024",
    readTime: 6,
    featured: true
  },
  {
    slug: "what-is-ui-kit-examples-and-why-you-need-one",
    title: "What is a UI Kit? Examples and Why You Need One",
    excerpt: "Our latest version offers an array of new features designed to enhance your financial management experience.",
    coverImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1600&q=80",
    category: "App Updates",
    type: "Guide",
    tags: ["design", "ui-kit", "best-practices"],
    author: mockAuthors["sarah-chen"],
    publishedAt: "Jan 02, 2024",
    readTime: 10
  },
  {
    slug: "future-of-finance-decentralized",
    title: "Is the Future of Finance Decentralized?",
    excerpt: "Our Decentralization for Finance Institutions report reveals how blockchain technology is reshaping financial services.",
    coverImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1600&q=80",
    category: "Industry Reports",
    type: "Report",
    tags: ["defi", "blockchain", "innovation"],
    author: mockAuthors["michael-ross"],
    publishedAt: "Jan 01, 2024",
    readTime: 15
  },
  {
    slug: "fintech-fails-lessons-learned",
    title: "Fintech Fails and Lessons Learned",
    excerpt: "Learn from the biggest fintech failures and discover what went wrong in these cautionary tales of innovation.",
    coverImage: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
    ],
    category: "Marketing Strategy",
    type: "Case Study",
    tags: ["fintech", "case-study", "lessons"],
    author: mockAuthors["emily-davis"],
    publishedAt: "Dec 28, 2023",
    readTime: 12,
    client: mockClients["techcorp"]
  },
  {
    slug: "maximizing-roi-content-marketing",
    title: "Maximizing ROI with Strategic Content Marketing",
    excerpt: "Dive deep into proven strategies that leading financial brands use to achieve 300% ROI on content investments.",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    category: "Marketing Strategy",
    type: "Article",
    tags: ["content-marketing", "roi", "strategy"],
    author: mockAuthors["sarah-chen"],
    publishedAt: "Dec 25, 2023",
    readTime: 9
  },
  {
    slug: "member-onboarding-experience-map",
    title: "Designing a Frictionless Member Onboarding Experience",
    excerpt:
      "Map out every touchpoint in your onboarding journey to reduce drop-off and increase first-90-day engagement.",
    coverImage:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
    category: "Marketing Strategy",
    type: "Guide",
    tags: ["onboarding", "member-experience", "journey-mapping"],
    author: mockAuthors["emily-davis"],
    publishedAt: "Dec 18, 2023",
    readTime: 11,
    featured: true
  },
  {
    slug: "savings-growth-playbook",
    title: "Savings Growth Playbook for Credit Unions",
    excerpt:
      "Step-by-step tactics to grow core deposits using targeted campaigns and member education programs.",
    coverImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
    category: "Savings & Investing",
    type: "Report",
    tags: ["savings", "member-growth", "deposits"],
    author: mockAuthors["john-smith"],
    publishedAt: "Dec 10, 2023",
    readTime: 14
  },
  {
    slug: "branch-to-digital-success-story",
    title: "From Branch-First to Digital-First: A Growth Success Story",
    excerpt:
      "How one regional credit union reshaped its acquisition funnel and grew digital account opens by 220%.",
    coverImage:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
    ],
    category: "Marketing Strategy",
    type: "Case Study",
    tags: ["success-story", "digital-growth", "acquisition"],
    author: mockAuthors["bessie-cooper"],
    publishedAt: "Dec 05, 2023",
    readTime: 7,
    featured: true,
    client: mockClients["regional-credit-union"]
  },
  {
    slug: "webinar-member-insights-panel",
    title: "Webinar: Turning Member Insights into Action",
    excerpt:
      "A live panel with growth leaders on how they translate research into marketing experiments and product bets.",
    coverImage:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
    category: "Industry Reports",
    type: "Webinar",
    tags: ["webinar", "member-insights", "research"],
    author: mockAuthors["michael-ross"],
    publishedAt: "Nov 28, 2023",
    readTime: 5,
    featured: true,
    webinar: {
      date: "Dec 15, 2024",
      time: "2:00 PM EST",
      duration: 60,
      registrationUrl: "https://example.com/register",
      isLive: true,
      speakers: [
        { name: "Michael Ross", role: "Head of Analytics", avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80" },
        { name: "Sarah Chen", role: "VP of Growth", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" }
      ]
    },
    keyPoints: [
      "Learn how top-performing credit unions structure their research programs",
      "Discover frameworks for translating insights into testable hypotheses",
      "Understand how to prioritize experiments based on impact and effort",
      "Get templates for running your own member insight sessions"
    ]
  },
  {
    slug: "budget-planning-template",
    title: "Annual Marketing Budget Planning Template",
    excerpt:
      "A pre-built template to help marketing leaders align budget, campaigns, and KPIs for the next planning cycle.",
    coverImage:
      "https://images.unsplash.com/photo-1554224155-3a58922a22c3?auto=format&fit=crop&w=1600&q=80",
    category: "Budgeting & Finance",
    type: "Template",
    tags: ["template", "budgeting", "planning"],
    author: mockAuthors["john-smith"],
    publishedAt: "Nov 20, 2023",
    readTime: 4,
    featured: true,
    downloadable: {
      format: "Google Sheets",
      fileSize: "156 KB",
      downloadUrl: "/downloads/budget-planning-template.xlsx",
      previewImages: [
        "https://images.unsplash.com/photo-1554224155-3a58922a22c3?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80"
      ],
      features: [
        "12-month budget allocation framework",
        "Campaign ROI tracking formulas",
        "Quarterly review templates",
        "Vendor spend breakdowns",
        "YoY comparison charts"
      ]
    }
  },
  {
    slug: "member-referral-campaign-ideas",
    title: "12 Member Referral Campaign Ideas That Actually Work",
    excerpt:
      "A swipe file of referral mechanics and incentive structures tailored for credit unions and community banks.",
    coverImage:
      "https://images.unsplash.com/photo-1522202195461-41a511c0e1e1?auto=format&fit=crop&w=1600&q=80",
    category: "Marketing Strategy",
    type: "Article",
    tags: ["referrals", "campaigns", "growth"],
    author: mockAuthors["emily-davis"],
    publishedAt: "Nov 15, 2023",
    readTime: 10
  },
  {
    slug: "kpi-dashboard-template",
    title: "Executive KPI Dashboard Template for Growth Teams",
    excerpt:
      "A ready-to-use dashboard structure for tracking acquisition, activation, engagement, and retention KPIs.",
    coverImage:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1522202195461-41a511c0e1e1?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=1600&q=80",
    ],
    category: "Industry Reports",
    type: "Template",
    tags: ["dashboard", "analytics", "reporting"],
    author: mockAuthors["michael-ross"],
    publishedAt: "Nov 08, 2023",
    readTime: 6
  },
  {
    slug: "cx-journey-mapping-case-study",
    title: "How Journey Mapping Unlocked a 40% Lift in CX Scores",
    excerpt:
      "A behind-the-scenes look at how one team used journey mapping to prioritize high-impact CX fixes.",
    coverImage:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=80",
    category: "Marketing Strategy",
    type: "Case Study",
    tags: ["cx", "journey-mapping", "success-story"],
    author: mockAuthors["emily-davis"],
    publishedAt: "Nov 01, 2023",
    readTime: 8,
    featured: true,
    client: mockClients["enterprise-fintech"]
  },
  {
    slug: "digital-wallet-adoption-webinar",
    title: "Driving Digital Wallet Adoption in 90 Days",
    excerpt:
      "Tactics, messaging, and in-app nudges that helped one credit union double digital wallet usage.",
    coverImage:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1600&q=80",
    category: "Payments & Digital Wallets",
    type: "Webinar",
    tags: ["digital-wallets", "activation", "webinar"],
    author: mockAuthors["john-smith"],
    publishedAt: "Oct 25, 2023",
    readTime: 5
  },
  {
    slug: "savings-campaign-email-pack",
    title: "Savings Growth Email Campaign Pack",
    excerpt:
      "Pre-written email sequences to promote savings goals, round-ups, and high-yield accounts.",
    coverImage:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1600&q=80",
    category: "Savings & Investing",
    type: "Template",
    tags: ["email", "savings", "templates"],
    author: mockAuthors["bessie-cooper"],
    publishedAt: "Oct 18, 2023",
    readTime: 6
  },
  {
    slug: "member-growth-playbook-ebook",
    title: "Member Growth Playbook: A Strategic Ebook for Credit Unions",
    excerpt:
      "A 40-page ebook that walks your team through positioning, campaigns, and measurement frameworks to grow member relationships.",
    coverImage:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
    category: "Marketing Strategy",
    type: "Ebook",
    tags: ["ebook", "member-growth", "playbook"],
    author: mockAuthors["sarah-chen"],
    publishedAt: "Oct 10, 2023",
    readTime: 18,
    downloadable: {
      format: "PDF",
      fileSize: "2.4 MB",
      downloadUrl: "/downloads/member-growth-playbook.pdf",
      previewImages: [
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80"
      ],
      features: [
        "Strategic frameworks for member acquisition and retention",
        "Editable campaign brief templates",
        "Sample KPI dashboards for growth teams",
        "Executive-ready summary slides for board updates"
      ]
    },
    keyPoints: [
      "Clarify your growth narrative for members and internal stakeholders",
      "Prioritize the right channels and campaigns for your credit union",
      "Connect day-to-day marketing activity to measurable KPIs"
    ]
  }
];

export interface TopicConfig {
  id: string;
  label: string;
  bucket: ResourceGroup;
  categories: ResourceCategory[];
  // Optional: restrict this topic to specific resource types (e.g. only Ebooks)
  types?: ResourceType[];
}

export const topicConfigs: TopicConfig[] = [
  // Insights
  {
    id: "financial-foundations",
    label: "Financial foundations",
    bucket: "insights",
    categories: ["Budgeting & Finance", "Savings & Investing"],
  },
  {
    id: "digital-experiences",
    label: "Digital experiences",
    bucket: "insights",
    categories: ["Payments & Digital Wallets", "App Updates"],
  },
  {
    id: "growth-strategy",
    label: "Growth strategy",
    bucket: "insights",
    categories: ["Marketing Strategy"],
  },
  {
    id: "market-intelligence",
    label: "Market intelligence",
    bucket: "insights",
    categories: ["Industry Reports"],
  },
  {
    id: "leadership-perspectives",
    label: "Leadership perspectives",
    bucket: "insights",
    categories: ["Industry Reports", "Marketing Strategy"],
  },

  // Success stories
  {
    id: "launches-rebrands",
    label: "Launches & rebrands",
    bucket: "success-stories",
    categories: ["Marketing Strategy"],
  },
  {
    id: "acquisition-growth",
    label: "Acquisition & growth",
    bucket: "success-stories",
    categories: ["Marketing Strategy"],
  },
  {
    id: "retention-engagement",
    label: "Retention & engagement",
    bucket: "success-stories",
    categories: ["Marketing Strategy"],
  },
  {
    id: "product-adoption",
    label: "Product adoption",
    bucket: "success-stories",
    categories: ["App Updates", "Payments & Digital Wallets"],
  },

  // Resources & tools
  {
    id: "playbooks-frameworks",
    label: "Playbooks & frameworks",
    bucket: "resources",
    categories: ["Marketing Strategy", "Budgeting & Finance"],
  },
  {
    id: "ebooks",
    label: "Ebooks",
    bucket: "resources",
    categories: ["Marketing Strategy", "Industry Reports"],
    types: ["Ebook"],
  },
  {
    id: "templates-checklists",
    label: "Templates & checklists",
    bucket: "resources",
    categories: ["Marketing Strategy", "Budgeting & Finance"],
  },
  {
    id: "webinars-training",
    label: "Webinars & training",
    bucket: "resources",
    categories: ["Industry Reports", "App Updates"],
  },
  {
    id: "tools-calculators",
    label: "Tools & calculators",
    bucket: "resources",
    categories: ["Savings & Investing", "Payments & Digital Wallets"],
  },
];

// Utility functions
export function getResourceBySlug(slug: string): Resource | undefined {
  return mockResources.find(r => r.slug === slug);
}

export function getResourcesByCategory(category: ResourceCategory): Resource[] {
  return mockResources.filter(r => r.category === category);
}

export function getResourcesByTag(tag: string): Resource[] {
  return mockResources.filter(r => r.tags.includes(tag));
}

export function getFeaturedResources(): Resource[] {
  return mockResources.filter(r => r.featured);
}

export function getRecentResources(limit: number = 3): Resource[] {
  return mockResources.slice(0, limit);
}

export function getAllCategories(): ResourceCategory[] {
  return Array.from(new Set(mockResources.map(r => r.category)));
}

export function getAllTags(): string[] {
  const tags = mockResources.flatMap(r => r.tags);
  return Array.from(new Set(tags));
}

export function getTopicsForBucket(bucket: ResourceGroup | "All"): TopicConfig[] {
  if (bucket === "All") {
    return topicConfigs;
  }
  return topicConfigs.filter(topic => topic.bucket === bucket);
}

export function getTopicById(id: string): TopicConfig | undefined {
  return topicConfigs.find(topic => topic.id === id);
}

export function getResourceGroup(type: ResourceType): ResourceGroup {
  switch (type) {
    case "Article":
    case "Guide":
    case "Report":
      return "insights";
    case "Case Study":
      return "success-stories";
    case "Webinar":
    case "Template":
    case "Tool":
    case "Ebook":
      return "resources";
    default:
      return "insights";
  }
}

export function getResourceTypeLabel(type: ResourceType): string {
  if (type === "Case Study") {
    return "Success story";
  }
  return type;
}

export function getPrimaryTopicLabelForResource(resource: Resource): string | null {
  const bucket = getResourceGroup(resource.type);
  const topics = getTopicsForBucket(bucket);
  const match = topics.find((topic) => {
    const categoryMatch = topic.categories.includes(resource.category);
    const typeMatch = !topic.types || topic.types.includes(resource.type);
    return categoryMatch && typeMatch;
  });
  return match ? match.label : null;
}
