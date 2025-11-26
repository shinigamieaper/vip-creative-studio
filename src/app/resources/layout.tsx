import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Hub",
  description:
    "Explore insights, success stories, and resources for credit union marketing. Industry trends, case studies, guides, and best practices from VIP Creative Studio.",
  openGraph: {
    title: "Content Hub | VIP Creative Studio",
    description:
      "Insights, success stories, and resources for credit union marketing. Industry trends, case studies, and best practices.",
  },
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
