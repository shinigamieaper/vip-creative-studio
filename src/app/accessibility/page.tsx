import type { Metadata } from "next";
import { BlurText, PortableTextRenderer } from "@/components";
import { getClient } from "@/lib/sanity/client";
import { legalPageByKeyQuery } from "@/lib/sanity/queries";

const DEFAULT_ACCESSIBILITY_METADATA: Metadata = {
  title: "Accessibility Statement | VIP Creative Studio",
  description: "Accessibility commitment for the VIP Creative Studio website.",
  openGraph: {
    title: "Accessibility Statement | VIP Creative Studio",
    description:
      "Accessibility commitment for the VIP Creative Studio website.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  try {
    const legalPage = await getClient().fetch(legalPageByKeyQuery, {
      key: "accessibility",
    });
    const seo = legalPage?.seo;

    if (!seo) return DEFAULT_ACCESSIBILITY_METADATA;

    return {
      ...DEFAULT_ACCESSIBILITY_METADATA,
      title: seo.metaTitle ?? DEFAULT_ACCESSIBILITY_METADATA.title,
      description:
        seo.metaDescription ?? DEFAULT_ACCESSIBILITY_METADATA.description,
      openGraph: {
        ...(DEFAULT_ACCESSIBILITY_METADATA.openGraph ?? {}),
        title: seo.metaTitle ?? DEFAULT_ACCESSIBILITY_METADATA.openGraph?.title,
        description:
          seo.metaDescription ??
          DEFAULT_ACCESSIBILITY_METADATA.openGraph?.description,
      },
    };
  } catch {
    return DEFAULT_ACCESSIBILITY_METADATA;
  }
}

interface LegalPage {
  title?: string;
  intro?: string;
  body?: any[];
}

async function getAccessibilityLegalPage(): Promise<LegalPage | null> {
  try {
    const legalPage = await getClient().fetch(legalPageByKeyQuery, {
      key: "accessibility",
    });
    return (legalPage as LegalPage) ?? null;
  } catch {
    return null;
  }
}

export default async function AccessibilityPage() {
  const legalPage = await getAccessibilityLegalPage();

  const title = legalPage?.title ?? "Accessibility Statement";

  const hasCmsBody = Array.isArray(legalPage?.body) && legalPage.body.length > 0;

  return (
    <main className="min-h-screen">
      <section className="py-24 px-4">
        <div className="mx-auto max-w-3xl space-y-10">
          <h1 className="h1 text-primary">
            <BlurText
              as="span"
              text={title}
              className="text-primary"
              textClassName="text-primary"
              animateBy="words"
              direction="top"
            />
          </h1>

          {legalPage?.intro ? (
            <p className="body-default text-primary/80">{legalPage.intro}</p>
          ) : (
            <p className="body-default text-primary/80">
              VIP Creative Studio is committed to providing a website experience that
              is accessible, inclusive, and usable for as many people as possible,
              including people with disabilities.
            </p>
          )}

          {hasCmsBody ? (
            <PortableTextRenderer value={legalPage!.body} />
          ) : (
            <>
          <section className="space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl text-primary">
              Our approach
            </h2>
            <p className="body-default text-primary/80">
              We aim to design and build our Site with accessibility in mind from the
              start. Our goal is to align with widely recognized best practices, such
              as the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA, over
              time.
            </p>
            <p className="body-default text-primary/80">
              This includes focusing on clear structure, readable typography,
              sufficient color contrast, keyboard navigation, semantic HTML, and
              support for assistive technologies where possible.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl text-primary">
              Ongoing improvements
            </h2>
            <p className="body-default text-primary/80">
              Accessibility is an ongoing process. As we add new content and
              functionality, we continue to review and refine the experience. We may
              also work with partners or tools to help us identify areas for
              improvement.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl text-primary">
              Feedback and support
            </h2>
            <p className="body-default text-primary/80">
              We welcome feedback about the accessibility of our Site. If you are
              having difficulty using or accessing any part of the Site, or if you
              have suggestions on how we can improve, please let us know so we can
              review and address the issue.
            </p>
            <p className="body-default text-primary/80">
              Email: {" "}
              <a
                href="mailto: hello@vipcreative.studio"
                className="text-accent-primary underline-offset-2 hover:underline"
              >
                 hello@vipcreative.studio
              </a>
            </p>
            <p className="body-default text-primary/80">
              When you contact us, please describe the issue you encountered and the
              assistive technology, browser, and device you were using, if applicable.
              This helps us investigate and resolve the issue more effectively.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl text-primary">
              Third-party content
            </h2>
            <p className="body-default text-primary/80">
              Our Site may include content or features provided by third parties, such
              as embedded media or links to other websites. While we strive to work
              with partners who share our commitment to accessibility, we do not
              control the accessibility of third-party content or services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl text-primary">
              Ongoing review
            </h2>
            <p className="body-default text-primary/80">
              We may update this Accessibility Statement from time to time as we
              evolve the Site and our practices. We encourage you to revisit this page
              periodically to see the latest information about our accessibility
              efforts.
            </p>
          </section>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
