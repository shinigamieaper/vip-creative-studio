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
  content?: any; // Will be replaced with Sanity PortableText later
  client?: Client; // Optional client info for case studies
  authorBio?: string;
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
