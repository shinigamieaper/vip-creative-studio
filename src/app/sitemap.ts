import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getClient } from "@/lib/sanity/client";
import { resourceSlugsQuery } from "@/lib/sanity/queries";

// Service slugs - will be replaced with Sanity query when CMS is integrated
const servicesSlugs = [
  "branding-and-graphics",
  "seo-content-strategy",
  "paid-media-sem",
  "social-media-marketing",
  "email-marketing",
  "analytics-and-reporting",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/our-partnership-model`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Legal pages
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/accessibility`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Service detail pages
  const servicePages: MetadataRoute.Sitemap = servicesSlugs.map((slug) => ({
    url: `${baseUrl}/our-partnership-model/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Resource pages (from mock data - will be replaced with Sanity query)
  const resources = await getClient().fetch<{ slug: string; publishedAt?: string }[]>(
    resourceSlugsQuery
  );

  const resourcePages: MetadataRoute.Sitemap = (resources ?? []).map((resource) => ({
    url: `${baseUrl}/resources/${resource.slug}`,
    lastModified: resource.publishedAt ? new Date(resource.publishedAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...resourcePages];
}
