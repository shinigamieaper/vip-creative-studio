import type { Metadata } from "next";
import { HomepageHero, WhyChooseUs, Testimonials, ServicesShowcase, LatestInsights, NewsletterSignup } from "@/components";
import { getClient } from "@/lib/sanity/client";
import { homePageQuery, whyChooseUsSectionQuery, featuredTestimonialsQuery, servicesQuery } from "@/lib/sanity/queries";

const DEFAULT_HOME_METADATA: Metadata = {
  title: "Fractional Marketing for Credit Unions | VIP Creative Studio",
  description:
    "Your fractional partner for measurable member growth, higher loan conversions, and proven marketing ROI. We cut through the complexity of credit union marketing.",
  openGraph: {
    title: "Fractional Marketing for Credit Unions | VIP Creative Studio",
    description:
      "Your fractional partner for measurable member growth, higher loan conversions, and proven marketing ROI.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  try {
    const homePage = await getClient().fetch(homePageQuery);
    const seo = homePage?.seo;

    if (!seo) return DEFAULT_HOME_METADATA;

    return {
      ...DEFAULT_HOME_METADATA,
      title: seo.metaTitle ?? DEFAULT_HOME_METADATA.title,
      description: seo.metaDescription ?? DEFAULT_HOME_METADATA.description,
      openGraph: {
        ...(DEFAULT_HOME_METADATA.openGraph ?? {}),
        title: seo.metaTitle ?? DEFAULT_HOME_METADATA.openGraph?.title,
        description:
          seo.metaDescription ?? DEFAULT_HOME_METADATA.openGraph?.description,
      },
    };
  } catch {
    return DEFAULT_HOME_METADATA;
  }
}

export default async function Home() {
  const [homePage, whyChooseUsSection, featuredTestimonials, services] = await Promise.all([
    getClient().fetch(homePageQuery),
    getClient().fetch(whyChooseUsSectionQuery),
    getClient().fetch(featuredTestimonialsQuery),
    getClient().fetch(servicesQuery),
  ]);

  return (
    <main className="min-h-screen">
      <HomepageHero
        heroEyebrow={homePage?.heroEyebrow}
        heroTitle={homePage?.heroTitle}
        heroFlipWords={homePage?.heroFlipWords}
        heroSubtitle={homePage?.heroSubtitle}
        primaryCtaLabel={homePage?.primaryCta?.label}
        primaryCtaHref={homePage?.primaryCta?.href}
        secondaryCtaLabel={homePage?.secondaryCta?.label}
        secondaryCtaHref={homePage?.secondaryCta?.href}
      />

      <WhyChooseUs
        title={whyChooseUsSection?.title}
        subtitle={whyChooseUsSection?.subtitle}
        items={whyChooseUsSection?.items}
        highlightCard={whyChooseUsSection?.highlightCard}
      />
      
      <ServicesShowcase servicesFromCms={services} />

      <Testimonials sanityTestimonials={featuredTestimonials} />
      
      <LatestInsights />

      {/* Newsletter Signup */}
      <section className="py-16">
        <div className="w-full max-w-[800px] mx-auto px-6 md:px-10">
          <NewsletterSignup variant="dark" />
        </div>
      </section>
     
    </main>
  );
}