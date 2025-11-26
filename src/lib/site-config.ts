/**
 * Site configuration for SEO, metadata, and site-wide settings
 * Update these values for production deployment
 */

export const siteConfig = {
  name: "VIP Creative Studio",
  shortName: "VIP Creative",
  description:
    "Your fractional marketing partner for credit unions and financial institutions. We deliver measurable member growth, higher loan conversions, and proven marketing ROI.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://vipcreativestudio.com",
  ogImage: "/viplogotransparentblack.png",
  twitterHandle: "@vipcreative",
  creator: "VIP Creative Studio",
  keywords: [
    "credit union marketing",
    "financial institution marketing",
    "fractional CMO",
    "member growth",
    "loan growth marketing",
    "deposit growth",
    "credit union branding",
    "financial services marketing",
    "marketing ROI",
    "digital marketing for credit unions",
  ],
  authors: [
    {
      name: "VIP Creative Studio",
      url: "https://vipcreativestudio.com",
    },
  ],
  links: {
    twitter: "https://twitter.com/vipcreative",
    linkedin: "https://linkedin.com/company/vipcreativestudio",
    instagram: "https://instagram.com/vipcreativestudio",
  },
} as const;

export type SiteConfig = typeof siteConfig;
