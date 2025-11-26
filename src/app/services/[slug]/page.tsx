import React from "react";
import { redirect } from "next/navigation";
import { getServiceSlugs, type ServiceSlug } from "@/lib/services/data";

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export default async function ServiceSlugPage({ params }: { params: Promise<{ slug: ServiceSlug }> }) {
  const { slug } = await params;
  redirect(`/our-partnership-model/${slug}`);
}

