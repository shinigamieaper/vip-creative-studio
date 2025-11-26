import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, ChevronRight, User, TrendingUp, Heart, Zap, Quote, AlertCircle, Lightbulb, Target, CheckCircle2, Sparkles, BookOpen, Video, Download, Play, FileSpreadsheet, Check, Users } from "lucide-react";
import {
  RelatedInsightsSlider,
  ResourceActions,
  ClientInfo,
  CountUp,
  CaseStudyImageGallery,
  LeadCaptureForm,
  ReadingProgress,
  ArticleTableOfContents,
  PrimaryCtaButton,
  ResourceActionCard,
  NewsletterSignup
} from "@/components";
import {
  getResourceBySlug,
  mockResources,
  getResourceTypeLabel,
  getPrimaryTopicLabelForResource,
  getResourceGroup,
  type Resource
} from "@/lib/resources/data";
import { getClient } from "@/lib/sanity/client";
import { resourceBySlugQuery, resourceSlugsQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

function assertResource(resource: Resource | undefined): Resource {
  if (!resource) {
    notFound();
  }
  return resource;
}

function mapSanityResourceToResource(doc: any): Resource {
  const coverImageUrl = doc.coverImage ? urlFor(doc.coverImage).url() : "";
  const galleryImageUrls = Array.isArray(doc.galleryImages)
    ? doc.galleryImages
        .map((img: any) => (img ? urlFor(img).url() : null))
        .filter((url: string | null) => Boolean(url))
    : undefined;

  const author = {
    name: doc.author?.name ?? "",
    role: doc.author?.role ?? "",
    avatar: doc.author?.avatar ? urlFor(doc.author.avatar).url() : undefined,
  };

  const publishedAt = doc.publishedAt
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }).format(new Date(doc.publishedAt))
    : "";

  const webinar = doc.webinar
    ? {
        date: doc.webinar.date ?? "",
        time: doc.webinar.time ?? "",
        duration: doc.webinar.duration ?? 0,
        registrationUrl: doc.webinar.registrationUrl,
        recordingUrl: doc.webinar.recordingUrl,
        speakers: Array.isArray(doc.webinar.speakers)
          ? doc.webinar.speakers.map((speaker: any) => ({
              name: speaker.name ?? "",
              role: speaker.role ?? "",
              avatar: speaker.avatar ? urlFor(speaker.avatar).url() : undefined,
            }))
          : undefined,
        isLive: doc.webinar.isLive,
      }
    : undefined;

  const downloadable = doc.downloadable
    ? {
        format: doc.downloadable.format ?? "",
        fileSize: doc.downloadable.fileSize,
        downloadUrl: doc.downloadable.downloadUrl ?? "",
        previewImages: Array.isArray(doc.downloadable.previewImages)
          ? doc.downloadable.previewImages
              .map((img: any) => (img ? urlFor(img).url() : null))
              .filter((url: string | null) => Boolean(url))
          : undefined,
        features: doc.downloadable.features ?? [],
      }
    : undefined;

  const client = doc.client
    ? {
        name: doc.client.name ?? "",
        industry: doc.client.industry,
        logo: doc.client.logo ? urlFor(doc.client.logo).url() : undefined,
        description: doc.client.description,
        contactName: doc.client.contactName,
        contactRole: doc.client.contactRole,
        contactAvatar: doc.client.contactAvatar
          ? urlFor(doc.client.contactAvatar).url()
          : undefined,
      }
    : undefined;

  return {
    slug: doc.slug,
    title: doc.title ?? "",
    excerpt: doc.excerpt ?? "",
    coverImage: coverImageUrl,
    galleryImages: galleryImageUrls,
    category: doc.category,
    type: doc.type,
    tags: doc.tags ?? [],
    author,
    publishedAt,
    readTime: doc.readTime ?? 0,
    featured: doc.featured ?? false,
    keyPoints: doc.keyPoints ?? [],
    tableOfContents: doc.tableOfContents ?? [],
    webinar,
    downloadable,
    client,
    resultsMetrics: doc.resultsMetrics ?? [],
    challengeSection: doc.challengeSection,
    solutionSection: doc.solutionSection,
    resultsSection: doc.resultsSection,
    testimonial: doc.testimonial,
  };
}

export async function generateStaticParams() {
  const sanitySlugs: { slug: string }[] = await getClient().fetch(
    resourceSlugsQuery
  );

  const mockSlugs = mockResources.map((resource) => ({
    slug: resource.slug,
  }));

  const seen = new Set<string>();
  return [...sanitySlugs, ...mockSlugs].filter(({ slug }) => {
    if (seen.has(slug)) return false;
    seen.add(slug);
    return true;
  });
}

export interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ResourceDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const sanityResource = await getClient().fetch(resourceBySlugQuery, { slug });

  const resource: Resource = sanityResource
    ? mapSanityResourceToResource(sanityResource)
    : assertResource(getResourceBySlug(slug));
  
  const topicLabel = getPrimaryTopicLabelForResource(resource) ?? resource.category;
  const resourceGroup = getResourceGroup(resource.type);
  const isInsights = resourceGroup === "insights";
  const isCaseStudy = resource.type === "Case Study";
  const isResourcesBucket = resourceGroup === "resources";

  // Get related resources
  // For insights: use the entire insights bucket (same resource group) so the slider has
  // multiple items to cycle through.
  // For case studies: use the entire success-stories group for the slider.
  // For other types: keep same-category behavior for now.
  const relatedResources = mockResources.filter((r) => {
    if (r.slug === resource.slug) return false;

    const group = getResourceGroup(r.type);

    if (isInsights) {
      return group === "insights";
    }

    if (isCaseStudy) {
      return group === "success-stories";
    }

    return r.category === resource.category && group === resourceGroup;
  });

  // Determine type-specific accent color
  const typeAccent = resource.type === "Guide" 
    ? "secondary" 
    : resource.type === "Report" 
      ? "secondary" 
      : "primary";

  // Render insights layout (Article, Guide, Report)
  if (isInsights) {
    return (
      <main className="min-h-screen">
        {/* Reading Progress Bar */}
        <ReadingProgress color={typeAccent} />

        {/* Insights Header */}
        <section className="py-12 sm:py-16">
          <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-primary/60">
                <li>
                  <Link href="/resources" className="hover:text-accent-primary transition-colors">
                    Content hub
                  </Link>
                </li>
                <ChevronRight className="h-3 w-3" />
                <li>
                  <Link 
                    href={`/resources?filter=${resource.type}`} 
                    className="hover:text-accent-primary transition-colors"
                  >
                    {getResourceTypeLabel(resource.type)}s
                  </Link>
                </li>
                <ChevronRight className="h-3 w-3" />
                <li className="text-primary truncate max-w-[200px]">{resource.title}</li>
              </ol>
            </nav>

            {/* 2-column header layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 lg:gap-12">
              {/* Left: Title + Dek */}
              <div>
                {/* Pills */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                    typeAccent === "primary" 
                      ? "bg-accent-primary/10 text-accent-primary" 
                      : "bg-accent-secondary/10 text-accent-secondary"
                  }`}>
                    <BookOpen className="w-3.5 h-3.5" />
                    {getResourceTypeLabel(resource.type)}
                  </span>
                  <span className="inline-block px-3 py-1.5 bg-primary/5 text-primary/70 text-xs font-medium rounded-full">
                    {topicLabel}
                  </span>
                  {resource.featured && (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-accent-primary text-background text-xs font-semibold rounded-full">
                      <Sparkles className="w-3 h-3" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="font-heading font-black text-primary text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-[-0.02em] mb-6">
                  {resource.title}
                </h1>
                
                {/* Dek */}
                <p className="text-lg text-primary/70 leading-relaxed max-w-2xl">
                  {resource.excerpt}
                </p>

                {/* Meta row (mobile-friendly) */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6 text-sm text-primary/60">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{resource.publishedAt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{resource.readTime} min read</span>
                  </div>
                </div>
              </div>

              {/* Right: Author + Actions */}
              <div className="lg:pt-4">
                <div className="space-y-5">
                  {/* Author card - more prominent */}
                  <div className="bg-card rounded-2xl p-5 border border-standard/50">
                    <p className="text-[11px] text-primary/50 uppercase tracking-[0.18em] mb-3">Written by</p>
                    <div className="flex items-center gap-3">
                      {resource.author.avatar ? (
                        <Image
                          src={resource.author.avatar}
                          alt={resource.author.name}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-accent-primary/20 flex items-center justify-center text-sm font-bold text-accent-primary">
                          {resource.author.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-primary text-sm">{resource.author.name}</div>
                        <div className="text-xs text-primary/60">{resource.author.role}</div>
                      </div>
                    </div>
                  </div>

                  {/* Share & Save actions */}
                  <ResourceActions
                    resourceMeta={{ slug: resource.slug, title: resource.title }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cover Image */}
        {resource.coverImage && (
          <section className="pb-10">
            <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10">
              <div className="relative aspect-21/9 rounded-[24px] overflow-hidden border border-standard/50 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                <Image
                  src={resource.coverImage}
                  alt={resource.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </section>
        )}

        {/* Key Points Card (TL;DR) */}
        {resource.keyPoints && resource.keyPoints.length > 0 && (
          <section className="pb-10">
            <div className="w-full max-w-[800px] mx-auto px-6 md:px-10">
              <div 
                className="rounded-2xl p-6 sm:p-8 shadow-[0_8px_24px_rgba(15,23,42,0.12)]"
                style={{ 
                  backgroundColor: typeAccent === "primary" 
                    ? "hsl(var(--accent-primary))" 
                    : "hsl(var(--accent-secondary))" 
                }}
              >
                <div className="flex items-center gap-2 mb-5">
                  <Sparkles className="w-5 h-5 text-white" />
                  <h2 className="font-heading font-bold text-lg text-white">Key Takeaways</h2>
                </div>
                <ul className="space-y-3">
                  {resource.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-white/20 text-white">
                        {index + 1}
                      </span>
                      <span className="text-sm text-white/90 leading-relaxed pt-0.5">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Article Body with optional ToC sidebar */}
        <section className="pb-16">
          <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-12">
              {/* Main content */}
              <article className="max-w-[720px]">
                <div className="prose prose-lg max-w-none">
                  <div className="space-y-6 text-primary/80">
                    {/* Section 1 */}
                    <h2 id="understanding-volatility" className="font-heading font-bold text-2xl text-primary mt-0 mb-4 scroll-mt-24">
                      Understanding Volatility
                    </h2>
                    <p className="text-base leading-relaxed">
                      This is where the rich content would be rendered from Sanity CMS using PortableText.
                      The content would include properly formatted paragraphs, headings, lists, images, code blocks, and other rich media elements.
                    </p>
                    <p className="text-base leading-relaxed">
                      When integrated with Sanity, each section will be dynamically rendered based on the content blocks defined in your CMS schema.
                      This placeholder demonstrates the visual structure and typography hierarchy.
                    </p>
                    
                    {/* Section 2 */}
                    <h2 id="risk-assessment" className="font-heading font-bold text-2xl text-primary mt-12 mb-4 scroll-mt-24">
                      Risk Assessment Framework
                    </h2>
                    <p className="text-base leading-relaxed">
                      A comprehensive risk assessment helps organizations understand their exposure and develop appropriate mitigation strategies.
                      The framework should consider multiple factors including market conditions, regulatory environment, and operational capacity.
                    </p>

                    {/* Callout block */}
                    <div className={`rounded-xl p-6 my-8 ${
                      typeAccent === "primary" 
                        ? "bg-accent-primary/5 border-l-4 border-accent-primary" 
                        : "bg-accent-secondary/5 border-l-4 border-accent-secondary"
                    }`}>
                      <h3 className="font-heading font-bold text-base text-primary mb-2">💡 Pro tip</h3>
                      <p className="text-sm text-primary/75 leading-relaxed">
                        Start small with pilot programs to test new strategies before full-scale implementation.
                        This approach minimizes risk while providing valuable insights for refinement.
                      </p>
                    </div>

                    {/* Section 3 */}
                    <h2 id="diversification-strategies" className="font-heading font-bold text-2xl text-primary mt-12 mb-4 scroll-mt-24">
                      Diversification Strategies
                    </h2>
                    <p className="text-base leading-relaxed">
                      Diversification remains one of the most effective tools for managing portfolio risk.
                      By spreading investments across different asset classes, sectors, and geographies, investors can reduce their exposure to any single point of failure.
                    </p>

                    {/* Quote block */}
                    <blockquote className="border-l-4 border-primary/20 pl-6 py-2 my-8">
                      <p className="text-lg text-primary/70 italic leading-relaxed">
                        "The key to successful investing is not predicting the future, but preparing for it."
                      </p>
                      <cite className="text-sm text-primary/50 not-italic">— Industry Expert</cite>
                    </blockquote>

                    {/* Section 4 */}
                    <h2 id="regulatory-landscape" className="font-heading font-bold text-2xl text-primary mt-12 mb-4 scroll-mt-24">
                      The Regulatory Landscape
                    </h2>
                    <p className="text-base leading-relaxed">
                      Understanding the evolving regulatory environment is crucial for any financial institution.
                      Compliance requirements continue to expand, and organizations must stay ahead of changes to avoid penalties and maintain customer trust.
                    </p>

                    {/* Section 5 */}
                    <h2 id="practical-approach" className="font-heading font-bold text-2xl text-primary mt-12 mb-4 scroll-mt-24">
                      A Practical Approach
                    </h2>
                    <p className="text-base leading-relaxed mb-6">
                      Ready to put these insights into action? Here are the recommended next steps:
                    </p>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                          typeAccent === "primary" ? "bg-accent-primary" : "bg-accent-secondary"
                        }`}>1</span>
                        <p className="text-base leading-relaxed pt-1">
                          Evaluate your current position and identify priority areas for improvement.
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                          typeAccent === "primary" ? "bg-accent-primary" : "bg-accent-secondary"
                        }`}>2</span>
                        <p className="text-base leading-relaxed pt-1">
                          Develop a phased implementation plan with clear milestones and success metrics.
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                          typeAccent === "primary" ? "bg-accent-primary" : "bg-accent-secondary"
                        }`}>3</span>
                        <p className="text-base leading-relaxed pt-1">
                          Engage stakeholders early and maintain open communication throughout the process.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Author Bio Card - expanded */}
                <div className="mt-12 pt-8 border-t border-standard">
                  <div className="bg-card rounded-2xl p-6 sm:p-8 border border-standard/50">
                    <div className="flex flex-col sm:flex-row gap-5">
                      {resource.author.avatar ? (
                        <Image
                          src={resource.author.avatar}
                          alt={resource.author.name}
                          width={80}
                          height={80}
                          className="w-20 h-20 rounded-2xl object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-2xl bg-accent-primary/20 flex items-center justify-center text-xl font-bold text-accent-primary shrink-0">
                          {resource.author.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-[11px] text-primary/50 uppercase tracking-[0.18em] mb-1">About the author</p>
                        <h3 className="font-heading font-bold text-lg text-primary mb-1">{resource.author.name}</h3>
                        <p className="text-sm text-accent-primary font-medium mb-3">{resource.author.role}</p>
                        <p className="text-sm text-primary/65 leading-relaxed">
                          A seasoned professional with expertise in financial marketing and digital transformation.
                          Passionate about helping credit unions and community banks grow through strategic innovation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Tags */}
                <div className="mt-8">
                  <h3 className="text-sm font-medium text-primary/50 mb-3">Related topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {resource.tags.map(tag => (
                      <Link
                        key={tag}
                        href={`/resources?tag=${tag}`}
                        className="inline-block px-4 py-2 bg-card border border-standard rounded-full text-sm text-primary hover:border-accent-primary/30 hover:text-accent-primary transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </article>

              {/* Sidebar - ToC (desktop only) */}
              <aside className="hidden lg:block">
                {resource.tableOfContents && resource.tableOfContents.length > 0 && (
                  <ArticleTableOfContents items={resource.tableOfContents} />
                )}
              </aside>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="pb-16">
          <div className="w-full max-w-[800px] mx-auto px-6 md:px-10">
            <NewsletterSignup variant="dark" />
          </div>
        </section>

        {/* Related Resources */}
        {relatedResources.length > 0 && (
          <section className="pb-16">
            <div className="w-full max-w-[1140px] mx-auto px-6 md:px-10">
              <RelatedInsightsSlider
                resources={relatedResources}
                title="Continue reading"
              />
            </div>
          </section>
        )}
      </main>
    );
  }

  // Render resources layout (Webinar, Template, Tool, Ebook)
  if (isResourcesBucket) {
    const isWebinar = resource.type === "Webinar";
    const isTemplate = resource.type === "Template";
    const isTool = resource.type === "Tool";
    const isEbook = resource.type === "Ebook";

    const hasWebinarData = isWebinar && !!resource.webinar;
    const hasDownloadable = !!resource.downloadable;

    // Icon based on type
    const TypeIcon = isWebinar ? Video : isEbook ? BookOpen : isTemplate ? FileSpreadsheet : Download;

    return (
      <main className="min-h-screen">
        {/* Reading Progress */}
        <ReadingProgress color="secondary" />

        {/* Header */}
        <section className="py-12 sm:py-16">
          <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-primary/60">
                <li>
                  <Link href="/resources" className="hover:text-accent-primary transition-colors">
                    Resources
                  </Link>
                </li>
                <ChevronRight className="h-3 w-3" />
                <li>
                  <Link
                    href={`/resources?filter=${resource.type}`}
                    className="hover:text-accent-primary transition-colors"
                  >
                    {resource.type}s
                  </Link>
                </li>
                <ChevronRight className="h-3 w-3" />
                <li className="text-primary truncate max-w-[200px]">{resource.title}</li>
              </ol>
            </nav>

            {/* 2-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">
              {/* Left: Title + Description */}
              <div>
                {/* Pills */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-accent-secondary/10 text-accent-secondary">
                    <TypeIcon className="w-3.5 h-3.5" />
                    {resource.type}
                  </span>
                  <span className="inline-block px-3 py-1.5 bg-primary/5 text-primary/70 text-xs font-medium rounded-full">
                    {topicLabel}
                  </span>
                  {resource.featured && (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-accent-primary text-background text-xs font-semibold rounded-full">
                      <Sparkles className="w-3 h-3" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="font-heading font-black text-primary text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-[-0.02em] mb-6">
                  {resource.title}
                </h1>

                {/* Excerpt */}
                <p className="text-lg text-primary/70 leading-relaxed mb-6">
                  {resource.excerpt}
                </p>

                {/* Webinar-specific: Speakers */}
                {hasWebinarData && resource.webinar?.speakers && resource.webinar.speakers.length > 0 && (
                  <div className="mb-6">
                    <p className="text-[11px] text-primary/50 uppercase tracking-[0.18em] mb-3">Featuring</p>
                    <div className="flex flex-wrap gap-4">
                      {resource.webinar.speakers.map((speaker, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          {speaker.avatar ? (
                            <Image
                              src={speaker.avatar}
                              alt={speaker.name}
                              width={40}
                              height={40}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-accent-secondary/20 flex items-center justify-center text-sm font-bold text-accent-secondary">
                              {speaker.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          )}
                          <div>
                            <div className="font-semibold text-sm text-primary">{speaker.name}</div>
                            <div className="text-xs text-primary/60">{speaker.role}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-primary/60">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{resource.publishedAt}</span>
                  </div>
                  {hasWebinarData && (
                    <>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{resource.webinar?.duration} min</span>
                      </div>
                      {resource.webinar?.isLive && (
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                          </span>
                          <span className="font-medium text-red-600">Live Event</span>
                        </div>
                      )}
                    </>
                  )}
                  {hasDownloadable && (
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>{resource.downloadable?.format}</span>
                      {resource.downloadable?.fileSize && (
                        <span className="text-primary/40">({resource.downloadable.fileSize})</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Action Card */}
              <div className="lg:pt-4">
                {/* Action Card with Lead Capture Modal - Always show for these types */}
                <ResourceActionCard
                  resourceType={resource.type as "Webinar" | "Template" | "Tool" | "Ebook"}
                  resourceTitle={resource.title}
                  webinar={resource.webinar}
                  downloadable={resource.downloadable}
                />

                {/* Share Actions */}
                <div className="mt-5">
                  <ResourceActions resourceMeta={{ slug: resource.slug, title: resource.title }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cover Image / Preview */}
        {resource.coverImage && (
          <section className="pb-10">
            <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10">
              <div className="relative aspect-video rounded-[24px] overflow-hidden border border-standard/50 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                <Image
                  src={resource.coverImage}
                  alt={resource.title}
                  fill
                  className="object-cover"
                  priority
                />
                {isWebinar && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Play className="w-10 h-10 text-white ml-1" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Key Points (if available) */}
        {resource.keyPoints && resource.keyPoints.length > 0 && (
          <section className="pb-10">
            <div className="w-full max-w-[800px] mx-auto px-6 md:px-10">
              <div
                className="rounded-2xl p-6 sm:p-8 shadow-[0_8px_24px_rgba(15,23,42,0.12)]"
                style={{ backgroundColor: "hsl(var(--accent-secondary))" }}
              >
                <div className="flex items-center gap-2 mb-5">
                  <Sparkles className="w-5 h-5 text-white" />
                  <h2 className="font-heading font-bold text-lg text-white">
                    {isWebinar ? "What You'll Learn" : isEbook ? "What's Inside" : "Key Features"}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {resource.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-white/20 text-white">
                        {index + 1}
                      </span>
                      <span className="text-sm text-white/90 leading-relaxed pt-0.5">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Description / About */}
        <section className="pb-16">
          <div className="w-full max-w-[800px] mx-auto px-6 md:px-10">
            <div className="prose prose-lg max-w-none">
              <h2 className="font-heading font-bold text-2xl text-primary mb-6">
                {isWebinar ? "About This Webinar" : `About This ${resource.type}`}
              </h2>
              <div className="space-y-4 text-primary/75 leading-relaxed">
                <p>
                  {isWebinar
                    ? "Join us for an in-depth session where industry experts share practical strategies and actionable insights. This session is designed for marketing leaders who want to stay ahead of the curve and implement proven approaches."
                    : isEbook
                      ? "This comprehensive guide brings together industry research, expert perspectives, and actionable frameworks in one resource. Perfect for teams looking to build their knowledge base and implement proven strategies."
                      : `This ${resource.type.toLowerCase()} has been crafted to help you streamline your workflow and achieve better results. It's based on real-world best practices used by top-performing teams.`}
                </p>
                <p>
                  Whether you're just getting started or looking to optimize your existing processes, this resource provides the foundation you need to succeed.
                </p>
              </div>

              {/* Author */}
              <div className="mt-10 pt-8 border-t border-standard">
                <div className="flex items-center gap-4">
                  {resource.author.avatar ? (
                    <Image
                      src={resource.author.avatar}
                      alt={resource.author.name}
                      width={56}
                      height={56}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-accent-secondary/20 flex items-center justify-center text-lg font-bold text-accent-secondary">
                      {resource.author.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                  <div>
                    <p className="text-[11px] text-primary/50 uppercase tracking-[0.18em] mb-0.5">
                      {isWebinar ? "Hosted by" : isEbook ? "Written by" : "Created by"}
                    </p>
                    <div className="font-heading font-bold text-primary">{resource.author.name}</div>
                    <div className="text-sm text-primary/60">{resource.author.role}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-8 pt-8 border-t border-standard">
              <h3 className="text-sm font-medium text-primary/50 mb-3">Related topics</h3>
              <div className="flex flex-wrap gap-2">
                {resource.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/resources?tag=${tag}`}
                    className="inline-block px-4 py-2 bg-card border border-standard rounded-full text-sm text-primary hover:border-accent-secondary/30 hover:text-accent-secondary transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        {relatedResources.length > 0 && (
          <section className="pb-16">
            <div className="w-full max-w-[1140px] mx-auto px-6 md:px-10">
              <RelatedInsightsSlider
                resources={relatedResources}
                title="More resources"
              />
            </div>
          </section>
        )}
      </main>
    );
  }

  // Render case study layout
  if (isCaseStudy) {
    return (
      <main className="min-h-screen">
        {/* Case Study Header */}
        <section className="py-12 sm:py-16">
          <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-primary/60">
                <li>
                  <Link href="/resources" className="hover:text-accent-primary transition-colors">
                    Resources
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-3 h-3" />
                  <Link href="/resources?filter=Case Study" className="hover:text-accent-primary transition-colors">
                    Success Stories
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-primary">{resource.title}</span>
                </li>
              </ol>
            </nav>

            {/* 2-column header */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Left column */}
              <div className="lg:col-span-8 space-y-4">
                {/* Pills row */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-xs font-semibold uppercase tracking-[0.18em]">
                    {topicLabel}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-card border border-standard text-primary text-xs font-semibold uppercase tracking-[0.18em]">
                    Success Story
                  </span>
                  {resource.featured && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-primary text-background text-xs font-semibold uppercase tracking-[0.18em]">
                      Featured
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl leading-tight text-primary">
                  {resource.title}
                </h1>

                {/* Excerpt */}
                <p className="text-lg sm:text-xl text-primary/80 leading-relaxed">
                  {resource.excerpt}
                </p>
              </div>

              {/* Right column */}
              <div className="lg:col-span-4 space-y-6">
                {/* Meta table */}
                <div className="bg-card border border-standard rounded-2xl p-6">
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-standard/30">
                        <td className="py-3 text-primary/60">Published</td>
                        <td className="py-3 text-primary font-medium text-right">
                          {resource.publishedAt}
                        </td>
                      </tr>
                      <tr className="border-b border-standard/30">
                        <td className="py-3 text-primary/60">Read time</td>
                        <td className="py-3 text-primary font-medium text-right">
                          {resource.readTime} min
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 text-primary/60">Category</td>
                        <td className="py-3 text-primary font-medium text-right">
                          {resource.category}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Client info */}
                {resource.client && (
                  <ClientInfo client={resource.client} />
                )}

                {/* Share & Save actions */}
                <ResourceActions
                  resourceMeta={{ slug: resource.slug, title: resource.title }} />
              </div>
            </div>
          </div>
        </section>

        {/* Cover Image */}
        <section className="pb-8">
          <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10">
            {resource.galleryImages && resource.galleryImages.length > 0 ? (
              <CaseStudyImageGallery
                images={[resource.coverImage, ...resource.galleryImages]}
                alt={resource.title} />
            ) : (
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-standard shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                <Image
                  src={resource.coverImage}
                  alt={resource.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px" />
              </div>
            )}
          </div>
        </section>

        {/* Results metrics strip */}
        <section className="pb-16">
          <div className="w-full max-w-[1140px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
              {resource.resultsMetrics && resource.resultsMetrics.length > 0 ? (
                resource.resultsMetrics.map((metric, index) => (
                  <div
                    key={index}
                    className="group relative bg-card border border-standard rounded-[20px] p-6 lg:p-8 shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-primary/10 text-accent-primary group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div className="mb-2">
                      <span className="font-heading font-black text-4xl lg:text-5xl text-primary inline-flex items-baseline">
                        <CountUp to={metric.value ?? 0} className="inline" />
                        {metric.unit && <span className="ml-1">{metric.unit}</span>}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-primary/80 mb-1">
                      {metric.label}
                    </h3>
                    {metric.description && (
                      <p className="text-xs text-primary/60">
                        {metric.description}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <>
                  {/* Metric Card 1 - Orange accent */}
                  <div 
                    className="group relative rounded-[20px] p-6 lg:p-8 border border-transparent shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1"
                    style={{ backgroundColor: "hsl(var(--accent-primary))" }}
                  >
                    {/* Icon */}
                    <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 text-white group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    
                    {/* Value */}
                    <div className="mb-2">
                      <span className="font-heading font-black text-4xl lg:text-5xl text-white inline-flex items-baseline">
                        <CountUp to={220} className="inline" />
                        <span className="ml-1">%</span>
                      </span>
                    </div>
                    
                    {/* Label */}
                    <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-white/80 mb-1">
                      Digital Account Opens
                    </h3>
                    <p className="text-xs text-white/60">
                      Increase in new accounts
                    </p>
                  </div>

                  {/* Metric Card 2 - Neutral */}
                  <div className="group relative bg-card border border-standard rounded-[20px] p-6 lg:p-8 shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1">
                    {/* Icon */}
                    <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-primary/10 text-accent-primary group-hover:scale-110 transition-transform duration-300">
                      <Heart className="w-5 h-5" />
                    </div>
                    
                    {/* Value */}
                    <div className="mb-2">
                      <span className="font-heading font-black text-4xl lg:text-5xl text-primary inline-flex items-baseline">
                        <CountUp to={40} className="inline" />
                        <span className="ml-1">%</span>
                      </span>
                    </div>
                    
                    {/* Label */}
                    <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-primary/80 mb-1">
                      Customer Satisfaction
                    </h3>
                    <p className="text-xs text-primary/60">
                      Lift in CSAT scores
                    </p>
                    
                    {/* Subtle gradient overlay */}
                    <div className="absolute top-0 right-0 w-24 h-24 opacity-5 pointer-events-none"
                      style={{ background: 'radial-gradient(circle at top right, hsl(var(--accent-primary)) 0%, transparent 70%)' }}
                    />
                  </div>

                  {/* Metric Card 3 - Teal accent */}
                  <div 
                    className="group relative rounded-[20px] p-6 lg:p-8 border border-transparent shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1"
                    style={{ backgroundColor: "hsl(var(--accent-secondary))" }}
                  >
                    {/* Icon */}
                    <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 text-white group-hover:scale-110 transition-transform duration-300">
                      <Zap className="w-5 h-5" />
                    </div>
                    
                    {/* Value */}
                    <div className="mb-2">
                      <span className="font-heading font-black text-4xl lg:text-5xl text-white inline-flex items-baseline">
                        <CountUp to={65} className="inline" />
                        <span className="ml-1">%</span>
                      </span>
                    </div>
                    
                    {/* Label */}
                    <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-white/80 mb-1">
                      Processing Time
                    </h3>
                    <p className="text-xs text-white/60">
                      Reduction in turnaround
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Case Study Content */}
        <section className="pb-20">
          <div className="w-full max-w-[1000px] mx-auto px-6 md:px-10">
            {/* Section Header */}
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-accent-primary mb-3">
                From problem to solution
              </p>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-primary">
                The Full Story
              </h2>
            </div>

            {/* Challenge Card - Black */}
            <div className="mb-6">
              <div className="bg-primary rounded-[20px] p-8 lg:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-accent-primary" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-primary mb-0.5">
                      {resource.challengeSection?.eyebrow ?? "Problem Context"}
                    </p>
                    <h3 className="font-heading font-black text-xl text-white">
                      {resource.challengeSection?.title ?? "The Challenge"}
                    </h3>
                  </div>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed text-[15px]">
                  {resource.challengeSection?.summary ? (
                    <p>
                      {resource.challengeSection.summary}
                    </p>
                  ) : (
                    <>
                      <p>
                        Over the last five years, the client had invested heavily in standalone tools and
                        one-off campaigns. Channels, data, and teams were fragmented, which meant members
                        experienced the brand very differently depending on where they showed up—in the
                        branch, in the app, or on the website.
                      </p>
                      <p>
                        Operationally, core systems were still driving the experience. Launching even a
                        simple campaign required IT tickets, multi-week lead times, and manual list pulls.
                      </p>
                    </>
                  )}
                </div>
                {/* Pain points */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50 mb-4">Key pain points</p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {resource.challengeSection?.painPoints &&
                    resource.challengeSection.painPoints.length > 0 ? (
                      resource.challengeSection.painPoints.map((point, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-accent-primary mt-2" />
                          <span className="text-sm text-white/60">{point}</span>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="flex items-start gap-3">
                          <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-accent-primary mt-2" />
                          <span className="text-sm text-white/60">Member experience scores plateauing despite increased spend</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-accent-primary mt-2" />
                          <span className="text-sm text-white/60">Fragmented martech stack with inconsistent data</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-accent-primary mt-2" />
                          <span className="text-sm text-white/60">Limited capacity to launch test-and-learn experiments</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Solution Card - Clean white */}
            <div className="mb-6">
              <div className="bg-card rounded-[20px] p-8 lg:p-10 shadow-[0_4px_20px_rgba(15,23,42,0.06)]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-accent-primary" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-primary mb-0.5">
                      {resource.solutionSection?.eyebrow ?? "Our Approach"}
                    </p>
                    <h3 className="font-heading font-black text-xl text-primary">
                      {resource.solutionSection?.title ?? "The Solution"}
                    </h3>
                  </div>
                </div>
                {resource.solutionSection?.summary ? (
                  <p className="text-primary/70 leading-relaxed mb-6 text-[15px]">
                    {resource.solutionSection.summary}
                  </p>
                ) : (
                  <p className="text-primary/70 leading-relaxed mb-6 text-[15px]">
                    We structured the engagement around a four-phase delivery process—Discovery,
                    Strategy, Implementation, and Optimization.
                  </p>
                )}
                
                {/* Solution phases grid */}
                <div className="space-y-3">
                  {resource.solutionSection?.phases &&
                  resource.solutionSection.phases.length > 0 ? (
                    resource.solutionSection.phases.map((phase, index) => (
                      <div
                        key={index}
                        className="rounded-xl p-5"
                        style={{ backgroundColor: "hsl(var(--accent-primary) / 0.12)" }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="w-7 h-7 rounded-full bg-accent-primary text-white flex items-center justify-center text-xs font-bold shrink-0">
                            {index + 1}
                          </span>
                          <h4 className="font-heading font-bold text-sm text-primary">
                            {phase.title ?? `Phase ${index + 1}`}
                          </h4>
                        </div>
                        {phase.description && (
                          <p className="text-sm text-primary/60 leading-relaxed">
                            {phase.description}
                          </p>
                        )}
                      </div>
                    ))
                  ) : (
                    <>
                      <div
                        className="rounded-xl p-5"
                        style={{ backgroundColor: "hsl(var(--accent-primary) / 0.12)" }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="w-7 h-7 rounded-full bg-accent-primary text-white flex items-center justify-center text-xs font-bold shrink-0">1</span>
                          <h4 className="font-heading font-bold text-sm text-primary">Discovery & Diagnosis</h4>
                        </div>
                        <p className="text-sm text-primary/60 leading-relaxed">
                          Stakeholder interviews and data deep-dives to document journeys and drop-off points.
                        </p>
                      </div>
                      <div
                        className="rounded-xl p-5"
                        style={{ backgroundColor: "hsl(var(--accent-primary) / 0.12)" }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="w-7 h-7 rounded-full bg-accent-primary text-white flex items-center justify-center text-xs font-bold shrink-0">2</span>
                          <h4 className="font-heading font-bold text-sm text-primary">Strategy & Journey Design</h4>
                        </div>
                        <p className="text-sm text-primary/60 leading-relaxed">
                          Defined north-star experiences and aligned leadership on quarterly scope.
                        </p>
                      </div>
                      <div
                        className="rounded-xl p-5"
                        style={{ backgroundColor: "hsl(var(--accent-secondary) / 0.12)" }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="w-7 h-7 rounded-full bg-accent-secondary text-white flex items-center justify-center text-xs font-bold shrink-0">3</span>
                          <h4 className="font-heading font-bold text-sm text-primary">Implementation</h4>
                        </div>
                        <p className="text-sm text-primary/60 leading-relaxed">
                          Cross-functional squad and test-and-learn experiments launched safely at speed.
                        </p>
                      </div>
                      <div
                        className="rounded-xl p-5"
                        style={{ backgroundColor: "hsl(var(--accent-secondary) / 0.12)" }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="w-7 h-7 rounded-full bg-accent-secondary text-white flex items-center justify-center text-xs font-bold shrink-0">4</span>
                          <h4 className="font-heading font-bold text-sm text-primary">Optimization</h4>
                        </div>
                        <p className="text-sm text-primary/60 leading-relaxed">
                          Regular insights cadence and team enablement for ongoing evolution.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Results Card - Teal */}
            <div className="mb-8">
              <div
                className="rounded-[20px] p-8 lg:p-10 text-white shadow-[0_8px_24px_rgba(15,23,42,0.16)]"
                style={{ backgroundColor: "hsl(var(--accent-secondary))" }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 mb-0.5">
                      {resource.resultsSection?.eyebrow ?? "Measured Impact"}
                    </p>
                    <h3 className="font-heading font-black text-xl text-white">
                      {resource.resultsSection?.title ?? "The Results"}
                    </h3>
                  </div>
                </div>
                <div className="space-y-4 text-sm leading-relaxed mb-6 text-white/85">
                  {resource.resultsSection?.summary ? (
                    <p>{resource.resultsSection.summary}</p>
                  ) : (
                    <p>
                      Within the first two campaign cycles, the client began to see meaningful lift across
                      both acquisition and engagement metrics. Digital account opens accelerated as
                      friction was removed from the onboarding journey.
                    </p>
                  )}
                </div>
                {/* Outcomes */}
                <div className="pt-6 border-t border-white/15">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 mb-4">Key outcomes</p>
                  <div className="space-y-3">
                    {resource.resultsSection?.outcomes &&
                    resource.resultsSection.outcomes.length > 0 ? (
                      resource.resultsSection.outcomes.map((outcome, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="shrink-0 w-5 h-5 text-white mt-0.5" />
                          <span className="text-sm text-white/85">{outcome}</span>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="shrink-0 w-5 h-5 text-white mt-0.5" />
                          <span className="text-sm text-white/85">Leadership now receives a single, consolidated view of funnel performance</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="shrink-0 w-5 h-5 text-white mt-0.5" />
                          <span className="text-sm text-white/85">Front-line teams have clearer messaging aligned to each journey stage</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="shrink-0 w-5 h-5 text-white mt-0.5" />
                          <span className="text-sm text-white/85">Client positioned to scale personalization and automation</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div 
              className="relative rounded-[20px] p-8 lg:p-10 overflow-hidden"
              style={{ backgroundColor: "hsl(var(--accent-primary))" }}
            >
              {/* Decorative quote */}
              <Quote className="absolute top-6 right-6 w-20 h-20 text-white/10" />
              
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60 mb-4">
                  Client Perspective
                </p>
                <blockquote className="text-xl sm:text-2xl text-white font-medium leading-relaxed mb-8">
                  {resource.testimonial?.quote
                    ? `"${resource.testimonial.quote}"`
                    : "The digital transformation has completely changed how we serve our customers. We're now able to deliver the kind of experience they expect, while maintaining the personal touch that sets us apart."}
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-full overflow-hidden bg-white/20 flex items-center justify-center">
                    {resource.client?.contactAvatar ? (
                      <Image
                        src={resource.client.contactAvatar}
                        alt={resource.client.contactName ?? resource.client.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-white">
                      {resource.testimonial?.attributionName ??
                        resource.client?.contactName ??
                        "Chief Digital Officer"}
                    </div>
                    <div className="text-sm text-white/70">
                      {resource.testimonial?.attributionRole ?? resource.client?.name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tags */}
        <section className="pb-16">
          <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10">
            <div className="flex flex-wrap gap-3">
              {resource.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/resources?tag=${encodeURIComponent(tag)}`}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-card border border-standard text-primary text-sm font-medium hover:border-accent-primary/40 hover:bg-accent-primary/5 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Related Case Studies */}
        {relatedResources.length > 0 && (
          <section className="pb-16">
            <div className="w-full max-w-[1140px] mx-auto px-6 md:px-10">
              <RelatedInsightsSlider
                resources={relatedResources}
                title="Related success stories"
              />
            </div>
          </section>
        )}
      </main>
    );
  }

  // Render gated layout for tools, templates, and webinars (resources bucket)
  if (isResourcesBucket) {
    const isWebinar = resource.type === "Webinar";

    return (
      <main className="min-h-screen">
        {/* Resource Hero */}
        <section className="py-16 sm:py-20">
          <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-primary/60">
                <li>
                  <Link href="/resources" className="hover:text-accent-primary transition-colors">
                    Resources
                  </Link>
                </li>
                <ChevronRight className="h-3 w-3" />
                <li className="text-primary truncate">{resource.title}</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-10 lg:gap-12 items-start">
              {/* Left: asset + value prop */}
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-xs font-semibold uppercase tracking-[0.18em]">
                    {topicLabel}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-[0.18em]">
                    {getResourceTypeLabel(resource.type)}
                  </span>
                  {resource.featured && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-primary text-background text-xs font-semibold uppercase tracking-[0.18em]">
                      Featured
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <h1 className="font-heading font-black text-primary text-3xl sm:text-4xl lg:text-[40px] leading-tight">
                    {resource.title}
                  </h1>
                  <p className="text-sm sm:text-base text-primary/80 max-w-xl">
                    {resource.excerpt}
                  </p>
                </div>

                {resource.coverImage && (
                  <div className="mt-4">
                    <div className="relative max-w-md aspect-4/3 rounded-[24px] overflow-hidden border border-standard shadow-[0_10px_28px_rgba(0,0,0,0.14)]">
                      <Image
                        src={resource.coverImage}
                        alt={resource.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 480px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-standard/80 mt-4 space-y-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/60">
                    {isWebinar ? "In this session you'll:" : "You can use this resource to:"}
                  </p>
                  <ul className="space-y-2 text-sm text-primary/80">
                    <li>Turn high-level ideas into a concrete, shareable plan.</li>
                    <li>Align stakeholders around the same set of numbers and narratives.</li>
                    <li>Save time with a structure you can reuse across campaigns and quarters.</li>
                  </ul>
                </div>
              </div>

              {/* Right: lead capture */}
              <div className="lg:pl-4 xl:pl-6">
                <LeadCaptureForm
                  variant={isWebinar ? "webinar" : "template"}
                  aria-label={isWebinar ? "Webinar registration form" : "Resource download form"}
                />
              </div>
            </div>
          </div>
        </section>

        {/* What you'll find inside */}
        <section className="pb-20">
          <div className="w-full max-w-[960px] mx-auto px-6 md:px-10 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <h2 className="font-heading font-black text-xl sm:text-2xl text-primary">
                  What you'll find inside
                </h2>
                <p className="body-default text-primary/80">
                  Use this {isWebinar ? "session" : "resource"} as a plug-and-play starting point. Swap in
                  your own numbers, member insights, and timelines without having to build from scratch.
                </p>
                <ul className="space-y-2 text-sm text-primary/80">
                  <li>Clear sections that mirror how your growth team already works.</li>
                  <li>Prompts that make it easy to capture the right inputs from stakeholders.</li>
                  <li>Room for notes, experiments, and follow-up actions.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="font-heading font-black text-xl sm:text-2xl text-primary">
                  Who this is for
                </h2>
                <p className="body-default text-primary/80">
                  Built for marketing, growth, and product leaders at ambitious credit unions and
                  financial brands.
                </p>
                <ul className="space-y-2 text-sm text-primary/80">
                  <li>Marketing leaders who need a simple way to socialize plans internally.</li>
                  <li>Growth teams running experiments across channels and journeys.</li>
                  <li>Partners and agencies who want a shared source of truth for each initiative.</li>
                </ul>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-standard">
              <h3 className="text-sm font-medium text-primary/60 mb-3">Related topics</h3>
              <div className="flex flex-wrap gap-2">
                {resource.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/resources?tag=${tag}`}
                    className="inline-block px-4 py-2 bg-card border border-standard rounded-full text-sm text-primary hover:border-accent-primary/30 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related resources */}
        {relatedResources.length > 0 && (
          <section className="pb-20">
            <div className="w-full max-w-[1140px] mx-auto px-6 md:px-10 lg:px-16">
              <RelatedInsightsSlider
                resources={relatedResources}
                title={isWebinar ? "Related webinars & resources" : "More resources & templates"}
              />
            </div>
          </section>
        )}
      </main>
    );
  }

  // Default layout for non-insights (success stories, tools, etc.)
  return (
    <main className="min-h-screen">
      {/* Article Header */}
      <section className="py-16 sm:py-24">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-primary/60">
              <li>
                <Link href="/resources" className="hover:text-accent-primary transition-colors">
                  Resources
                </Link>
              </li>
              <ChevronRight className="h-3 w-3" />
              <li>
                <Link href={`/resources?category=${resource.category}`} className="hover:text-accent-primary transition-colors">
                  {resource.category}
                </Link>
              </li>
              <ChevronRight className="h-3 w-3" />
              <li className="text-primary truncate">{resource.title}</li>
            </ol>
          </nav>

          {/* Article Meta */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-block px-3 py-1 bg-accent-primary/10 text-accent-primary text-xs font-bold rounded-full">
                {topicLabel}
              </span>
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                {getResourceTypeLabel(resource.type)}
              </span>
              {resource.featured && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-accent-primary text-background text-xs font-bold rounded-full">
                  ⭐ Featured
                </span>
              )}
            </div>

            <h1 className="h1 text-primary mb-6">{resource.title}</h1>
            
            <p className="subtext-large text-primary/80 mb-8">{resource.excerpt}</p>

            {/* Author and metadata */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-standard">
              <div className="flex items-center gap-4">
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent-primary/20 flex items-center justify-center text-lg font-bold text-accent-primary">
                    {resource.author.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium text-primary">{resource.author.name}</div>
                    <div className="text-sm text-primary/60">{resource.author.role}</div>
                  </div>
                </div>
                
                {/* Date and read time */}
                <div className="flex items-center gap-4 text-sm text-primary/60">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {resource.publishedAt}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {resource.readTime} min read
                  </span>
                </div>
              </div>
              
              {/* Share & Save actions */}
              <ResourceActions
                resourceMeta={{ slug: resource.slug, title: resource.title }}
              />
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Cover Image */}
      {resource.coverImage && (
        <section className="pb-16">
          <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
            <div className="relative aspect-video rounded-[24px] overflow-hidden border border-standard bg-linear-to-br from-accent-primary/10 to-accent-secondary/10">
              <Image
                src={resource.coverImage}
                alt={resource.title}
                width={1200}
                height={675}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Article Content (Placeholder) */}
      <section className="pb-24">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-primary/80">
              <p className="body-default leading-relaxed">
                This is where the rich content would be rendered from Sanity CMS using PortableText or from MDX files.
                The content would include properly formatted paragraphs, headings, lists, images, code blocks, and other rich media elements.
              </p>
              
              <h2 className="h2 text-primary mt-10 mb-5">Key Insights</h2>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-accent-primary mt-1">•</span>
                  <span className="body-default">Comprehensive analysis of current market trends and their implications for financial institutions</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-primary mt-1">•</span>
                  <span className="body-default">Actionable strategies that can be implemented immediately to drive measurable results</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-primary mt-1">•</span>
                  <span className="body-default">Real-world success stories demonstrating successful implementations across various sectors</span>
                </li>
              </ul>

              <h2 className="h2 text-primary mt-10 mb-5">Implementation Strategy</h2>
              <p className="body-default leading-relaxed">
                The implementation of these strategies requires a systematic approach that considers both immediate needs
                and long-term objectives. Organizations should begin by assessing their current capabilities and identifying
                gaps that need to be addressed.
              </p>
              
              <div className="bg-accent-primary/5 border border-accent-primary/20 rounded-[24px] p-6 my-8">
                <h3 className="h3 text-primary mb-3">💡 Pro Tip</h3>
                <p className="body-default text-primary/80">
                  Start small with pilot programs to test new strategies before full-scale implementation.
                  This approach minimizes risk while providing valuable insights for refinement.
                </p>
              </div>

              <h2 className="h2 text-primary mt-10 mb-5">Next Steps</h2>
              <p className="body-default leading-relaxed mb-6">
                Ready to put these insights into action? Here's how to get started:
              </p>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-accent-primary font-bold">1.</span>
                  <span className="body-default">Evaluate your current position and identify priority areas for improvement</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-primary font-bold">2.</span>
                  <span className="body-default">Develop a phased implementation plan with clear milestones and success metrics</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-primary font-bold">3.</span>
                  <span className="body-default">Engage stakeholders early and maintain open communication throughout the process</span>
                </li>
              </ol>
            </div>
          </div>
          
          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-standard max-w-4xl mx-auto">
            <h3 className="text-sm font-medium text-primary/60 mb-3">Related Topics</h3>
            <div className="flex flex-wrap gap-2">
              {resource.tags.map(tag => (
                <Link
                  key={tag}
                  href={`/resources?tag=${tag}`}
                  className="inline-block px-4 py-2 bg-card border border-standard rounded-full text-sm text-primary hover:border-accent-primary/30 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Related Resources */}
      {relatedResources.length > 0 && (
        <section className="py-24">
          <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
            <div className="relative overflow-hidden rounded-[40px] border border-standard shadow-[0_8px_30px_rgba(0,0,0,0.12)] bg-card p-8 sm:p-12">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(800px_400px_at_50%_50%,hsl(var(--accent-primary)/0.04),transparent_70%)]"></div>
              </div>
              <div className="relative">
              <h2 className="h2 text-primary mb-8">Related content</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedResources.map(related => (
                  <Link
                    key={related.slug}
                    href={`/resources/${related.slug}`}
                    className="group block rounded-[24px] bg-card border border-standard p-6 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all"
                  >
                    <div className="mb-3 flex flex-wrap items-center gap-1.5">
                      <span className="inline-block px-3 py-1 bg-accent-primary/10 text-accent-primary text-xs font-medium rounded-full">
                        {getPrimaryTopicLabelForResource(related) ?? related.category}
                      </span>
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        {getResourceTypeLabel(related.type)}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-primary mb-2 group-hover:text-accent-primary transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-sm text-primary/70 line-clamp-2 mb-4">{related.excerpt}</p>
                    <div className="text-xs text-primary/60">
                      {related.readTime} min read
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          </div>
        </section>
      )}
    </main>
  );
}
