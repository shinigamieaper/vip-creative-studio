import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full-funnel marketing services for credit unions: branding, SEO, paid media, social, email marketing, and analytics. Senior expertise, fractional cost.",
  openGraph: {
    title: "Marketing Services for Credit Unions | VIP Creative Studio",
    description:
      "Full-funnel marketing services: branding, SEO, paid media, social, email, and analytics. Senior expertise at fractional cost.",
  },
};

export default function ServicesPage() {
  redirect("/our-partnership-model");
}
