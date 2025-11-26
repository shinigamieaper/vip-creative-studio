import { Suspense } from "react";
import { getClient } from "@/lib/sanity/client";
import { resourcesPageQuery } from "@/lib/sanity/queries";
import ResourcesPageClient from "./ResourcesPageClient";

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
  const resourcesPageData: ResourcesPageData | null = await getClient().fetch(
    resourcesPageQuery
  );

  return (
    <Suspense fallback={null}>
      <ResourcesPageClient pageData={resourcesPageData} />
    </Suspense>
  );
}
