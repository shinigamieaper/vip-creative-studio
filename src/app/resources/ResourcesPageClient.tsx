"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ResourceFilters,
  ResourceGrid,
  SearchInput,
  DropdownMenu,
  PrimaryCtaButton,
  BlurText,
  ContainerTextFlip,
  NewsletterSignup,
} from "@/components";
import {
  mockResources,
  getResourceGroup,
  topicConfigs,
  getPrimaryTopicLabelForResource,
  type Resource,
  type ResourceGroup,
  type ResourceCategory,
  type TopicConfig,
} from "@/lib/resources/data";
import {
  Sparkles,
  Lightbulb,
  Trophy,
  Wrench,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { ResourcesPageData } from "./page";

// ----- Default fallback values (match current hardcoded content) -----

const defaultHeroTitle = "Content hub";

const defaultHeroSubtitle =
  "Search, filter, and explore everything in one place, from strategic insights and measurable success stories to practical templates and tools.";

const defaultHeroFlipWords = [
  "growth insights",
  "client success stories",
  "resources & tools",
];

const defaultBucketOptions = [
  {
    key: "All",
    label: "All content",
    description: "Everything in one view",
    iconKey: "sparkles",
  },
  {
    key: "insights",
    label: "Insights",
    description: "Articles, guides, reports",
    iconKey: "lightbulb",
  },
  {
    key: "success-stories",
    label: "Success stories",
    description: "Client wins and results",
    iconKey: "trophy",
  },
  {
    key: "resources",
    label: "Resources & tools",
    description: "Templates, webinars, tools",
    iconKey: "wrench",
  },
];

// Icon mapping for bucket options
const iconMap: Record<string, React.ReactNode> = {
  sparkles: <Sparkles className="w-full h-full" />,
  lightbulb: <Lightbulb className="w-full h-full" />,
  trophy: <Trophy className="w-full h-full" />,
  wrench: <Wrench className="w-full h-full" />,
};

// ----- Props -----

interface ResourcesPageClientProps {
  pageData: ResourcesPageData | null;
}

export default function ResourcesPageClient({
  pageData,
}: ResourcesPageClientProps) {
  const searchParams = useSearchParams();
  const resourcesSectionRef = useRef<HTMLElement | null>(null);

  // ----- Merge Sanity data with fallbacks -----
  const heroTitle = pageData?.heroTitle ?? defaultHeroTitle;
  const heroSubtitle = pageData?.heroSubtitle ?? defaultHeroSubtitle;
  const heroFlipWords =
    pageData?.heroFlipWords && pageData.heroFlipWords.length > 0
      ? pageData.heroFlipWords
      : defaultHeroFlipWords;

  // Bucket options from CMS or fallback
  const rawBucketOptions =
    pageData?.bucketOptions && pageData.bucketOptions.length > 0
      ? pageData.bucketOptions.filter((opt) => opt.enabled !== false)
      : defaultBucketOptions;

  const bucketOptions = rawBucketOptions.map((opt) => ({
    value: opt.key as "All" | ResourceGroup,
    label: opt.label,
    description: opt.description,
    icon: iconMap[opt.iconKey] ?? <Sparkles className="w-full h-full" />,
  }));

  // Topics from CMS or fallback
  const topics: TopicConfig[] =
    pageData?.topics && pageData.topics.length > 0
      ? (pageData.topics as TopicConfig[])
      : topicConfigs;

  // Helper: get topics for a given bucket
  const getTopicsForBucket = (bucket: ResourceGroup | "All"): TopicConfig[] => {
    if (bucket === "All") return topics;
    return topics.filter((t) => t.bucket === bucket);
  };

  // Helper: get topic by id
  const getTopicById = (id: string): TopicConfig | undefined => {
    return topics.find((t) => t.id === id);
  };

  // ----- URL params & initial state -----
  const initialGroup: ResourceGroup | "All" = (() => {
    const groupParam = searchParams.get("group");
    if (!groupParam) return "All";
    const validGroups: ResourceGroup[] = [
      "insights",
      "success-stories",
      "resources",
    ];
    return validGroups.includes(groupParam as ResourceGroup)
      ? (groupParam as ResourceGroup)
      : "All";
  })();

  const initialSearchQuery = searchParams.get("q") ?? "";
  const initialTag = searchParams.get("tag");
  const initialTopicId: string | "All" = (() => {
    const topicParam = searchParams.get("topic");
    if (topicParam) {
      const topic = getTopicById(topicParam);
      if (topic && (initialGroup === "All" || topic.bucket === initialGroup)) {
        return topic.id;
      }
    }

    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      const topicFromCategory = getTopicsForBucket(initialGroup).find((topic) =>
        topic.categories.includes(categoryParam as ResourceCategory)
      );
      if (topicFromCategory) {
        return topicFromCategory.id;
      }
    }

    return "All";
  })();

  const [activeGroup, setActiveGroup] =
    useState<ResourceGroup | "All">(initialGroup);
  const [activeTopicId, setActiveTopicId] =
    useState<string | "All">(initialTopicId);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [activeTag, setActiveTag] = useState<string | null>(initialTag);

  // ----- Filtering logic (still uses mockResources for now) -----
  const filteredResources = useMemo(() => {
    let filtered: Resource[] = mockResources;

    if (activeGroup !== "All") {
      filtered = filtered.filter(
        (r) => getResourceGroup(r.type) === activeGroup
      );
    }

    if (activeTopicId !== "All") {
      const topic = getTopicById(activeTopicId);
      if (topic) {
        filtered = filtered.filter((r) => {
          const categoryMatch = topic.categories.includes(r.category);
          const typeMatch = !topic.types || topic.types.includes(r.type);
          return categoryMatch && typeMatch;
        });
      }
    }

    if (activeTag) {
      filtered = filtered.filter((r) => r.tags.includes(activeTag));
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(query) ||
          r.excerpt.toLowerCase().includes(query) ||
          r.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          r.author.name.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [activeGroup, activeTopicId, activeTag, searchQuery, topics]);

  // Featured resources
  const featuredResources = useMemo(() => {
    const flagged = mockResources.filter((r) => r.featured);
    if (flagged.length > 0) return flagged;
    if (mockResources.length === 0) return [];
    return [mockResources[0]];
  }, []);

  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    setFeaturedIndex(0);
  }, [featuredResources.length]);

  useEffect(() => {
    if (featuredResources.length <= 1) return;
    const intervalId = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredResources.length);
    }, 8000);

    return () => clearInterval(intervalId);
  }, [featuredResources.length]);

  const featuredResource = featuredResources[featuredIndex] ?? null;

  const [visibleCount, setVisibleCount] = useState(9);

  const regularResources = useMemo(() => {
    if (!featuredResource) return filteredResources;
    return filteredResources.filter((r) => r.slug !== featuredResource.slug);
  }, [filteredResources, featuredResource]);

  useEffect(() => {
    setVisibleCount(9);
  }, [activeGroup, activeTopicId, activeTag, searchQuery]);

  const paginatedResources = useMemo(
    () => regularResources.slice(0, visibleCount),
    [regularResources, visibleCount]
  );

  // Topics for current bucket
  const topicsForBucket = useMemo(
    () => getTopicsForBucket(activeGroup),
    [activeGroup, topics]
  );

  const topicLabels = topicsForBucket.map((topic) => topic.label);

  const activeTopicLabel =
    activeTopicId === "All"
      ? "All"
      : topicsForBucket.find((topic) => topic.id === activeTopicId)?.label ??
        "All";

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-10 pb-4 sm:pt-14 sm:pb-6">
        <div className="w-full max-w-[1140px] mx-auto px-6 md:px-10">
          <div className="text-center space-y-3">
            <h1 className="h1 max-w-5xl mx-auto flex flex-wrap justify-center items-baseline gap-x-2 text-balance">
              <BlurText
                text={heroTitle}
                animateBy="words"
                as="span"
                className="text-primary whitespace-nowrap"
                textClassName="text-primary"
              />
              <ContainerTextFlip
                words={heroFlipWords}
                interval={3200}
                animationDuration={700}
                unstyled
                allowWrap
                className="align-baseline block w-full text-center whitespace-normal wrap-break-word sm:inline-block sm:w-auto sm:whitespace-nowrap sm:break-normal"
                textClassName="text-accent-primary"
              />
            </h1>
            <p className="subtext-large text-primary/80 max-w-[640px] mx-auto">
              {heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Resource Hero */}
      {featuredResource && (
        <section className="pb-10">
          <div className="w-full max-w-[1140px] mx-auto px-6 md:px-10">
            <article className="group relative overflow-hidden rounded-[32px] border border-standard/80 transition-all duration-500 shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:border-accent-primary/40 hover:shadow-[0_10px_30px_rgba(15,23,42,0.1)]">
              <div className="relative min-h-[360px] sm:min-h-[460px] lg:min-h-[580px]">
                <Image
                  src={featuredResource.coverImage}
                  alt={featuredResource.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />

                <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/80 via-black/45 to-black/10" />

                <div className="absolute inset-0 flex items-center">
                  <div className="w-full p-8 sm:p-12 lg:p-16 flex flex-col gap-6 text-white max-w-3xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                      Featured
                    </p>

                    <div className="inline-flex items-center gap-2 text-xs font-medium text-white/80">
                      <span className="text-white/70">
                        {featuredResource.publishedAt} ·{" "}
                        {featuredResource.readTime} min read
                      </span>
                    </div>

                    <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-[40px] leading-tight">
                      {featuredResource.title}
                    </h3>

                    <p className="hidden sm:block text-base sm:text-lg text-white/85">
                      {featuredResource.excerpt}
                    </p>

                    <div className="mt-2">
                      <Link
                        href={`/resources/${featuredResource.slug}`}
                        className="inline-flex items-center gap-2 text-white text-sm font-medium hover:text-accent-primary transition-colors"
                      >
                        Read article
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {featuredResources.length > 1 && (
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden sm:flex">
                      <button
                        type="button"
                        onClick={() => {
                          setFeaturedIndex(
                            (prev) => (prev + 1) % featuredResources.length
                          );
                        }}
                        className="h-12 w-12 rounded-full border border-white/40 bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        aria-label="Next featured article"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}

                  {/* Pagination dots */}
                  {featuredResources.length > 1 && (
                    <div className="absolute bottom-6 right-6 flex items-center gap-2">
                      {featuredResources.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setFeaturedIndex(idx)}
                          className={cn(
                            "h-2 rounded-full transition-all duration-300",
                            idx === featuredIndex
                              ? "w-6 bg-white"
                              : "w-2 bg-white/40 hover:bg-white/60"
                          )}
                          aria-label={`Go to featured article ${idx + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* Search and filters */}
      <section className="pb-6">
        <div className="w-full max-w-[1140px] mx-auto px-6 md:px-10">
          <div className="space-y-4">
            <SearchInput
              onSearch={setSearchQuery}
              placeholder="Search insights, success stories, resources..."
            />

            {activeTag && (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setActiveTag(null)}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-standard text-xs text-primary/80 hover:border-accent-primary/40 hover:text-accent-primary transition-colors"
                >
                  <span className="text-primary/60">Filtering by topic</span>
                  <span className="font-semibold text-primary">
                    #{activeTag}
                  </span>
                  <span className="text-primary/50">×</span>
                </button>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <div className="flex justify-center">
                <DropdownMenu
                  options={bucketOptions}
                  value={activeGroup === "All" ? "All" : activeGroup}
                  onChange={(value) => {
                    const newGroup = value as "All" | ResourceGroup;
                    setActiveGroup(newGroup);
                    setActiveTopicId("All");
                  }}
                  label="View"
                />
              </div>

              <ResourceFilters
                categories={topicLabels}
                activeCategory={activeTopicLabel}
                onCategoryChange={(label) => {
                  if (label === "All") {
                    setActiveTopicId("All");
                    return;
                  }
                  const match = topicsForBucket.find(
                    (topic) => topic.label === label
                  );
                  setActiveTopicId(match ? match.id : "All");
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section ref={resourcesSectionRef} className="pb-24 pt-4">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-heading font-bold text-primary text-xl sm:text-2xl">
              Recent resources
            </h2>
          </div>
          <ResourceGrid resources={paginatedResources} featuredFirst={false} />

          {filteredResources.length > 9 && (
            <div className="mt-8 flex justify-center">
              <PrimaryCtaButton
                type="button"
                shimmer
                shimmerGradient
                withArrow={false}
                onClick={() => {
                  const isLoadLess = visibleCount > 9;
                  setVisibleCount(isLoadLess ? 9 : filteredResources.length);

                  if (isLoadLess && resourcesSectionRef.current) {
                    resourcesSectionRef.current.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
              >
                <span className="inline-flex items-center gap-2">
                  {visibleCount > 9 ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      <span>Load less</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      <span>Load more</span>
                    </>
                  )}
                </span>
              </PrimaryCtaButton>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="pb-20">
        <div className="w-full max-w-[800px] mx-auto px-6 md:px-10">
          <NewsletterSignup variant="dark" />
        </div>
      </section>
    </main>
  );
}
