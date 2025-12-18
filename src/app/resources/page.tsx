import { Suspense } from "react";
import { getClient } from "@/lib/sanity/client";
import { resourcesPageQuery, resourcesQuery } from "@/lib/sanity/queries";
import ResourcesPageClient from "./ResourcesPageClient";
import type { Resource } from "@/lib/resources/data";

export type ResourcesPageData = {
  heroTitle?: string;
  heroSubtitle?: string;
  heroFlipWords?: string[];
  bucketOptions?: {
    key: string;
    label: string;
    description: string;
    iconKey: string;
    enabled?: boolean;
  }[];
  topics?: {
    id: string;
    label: string;
    bucket: string;
    categories: string[];
    types?: string[];
  }[];
};

export default async function ResourcesPage() {
  const [resourcesPageData, resources] = await Promise.all([
    getClient().fetch<ResourcesPageData | null>(resourcesPageQuery),
    getClient().fetch<Resource[]>(resourcesQuery),
  ]);

  return (
    <Suspense fallback={null}>
      <ResourcesPageClient pageData={resourcesPageData} resources={resources ?? []} />
    </Suspense>
  );
}
