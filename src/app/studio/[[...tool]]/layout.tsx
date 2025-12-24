import type { ReactNode } from "react";

export const metadata = {
  title: "Sanity Studio | VIP Creative Studio",
  description: "Content management for VIP Creative Studio",
};

export default function StudioLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
