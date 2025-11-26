import type { Metadata } from "next";
import { BlurText } from "@/components";

export const metadata: Metadata = {
  title: "Terms of Service | VIP Creative Studio",
  description: "Website terms of use for VIP Creative Studio.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen">
      <section className="py-24 px-4">
        <div className="mx-auto max-w-3xl space-y-10">
          <h1 className="h1 text-primary">
            <BlurText
              as="span"
              text="Website Terms of Use"
              className="text-primary"
              textClassName="text-primary"
              animateBy="words"
              direction="top"
            />
          </h1>

          <p className="body-default text-primary/70">
            Last updated: November 25, 2025
          </p>

          <p className="body-default text-primary/80">
            These Terms of Use ("Terms") describe the rules that apply to your use of the
            VIP Creative Studio website (the "Site"). By accessing or using the Site,
            you agree to be bound by these Terms. If you do not agree, please do not use
            the Site.
          </p>

          <section className="space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl text-primary">
              1. Who we are
            </h2>
            <p className="body-default text-primary/80">
              VIP Creative Studio is a creative and marketing partner for financial
              services organizations. References to "we", "us", or "our" on this page
              refer to VIP Creative Studio.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl text-primary">
              2. Informational purposes only
            </h2>
            <p className="body-default text-primary/80">
              The content on this Site is provided for general informational and
              marketing purposes only. Nothing on the Site is intended to be, or should
              be taken as, legal, financial, tax, investment, or other professional
              advice. You should consult your own professional advisors before making
              decisions based on any information found here.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl text-primary">
              3. Use of the Site
            </h2>
            <p className="body-default text-primary/80">
              You may use the Site only for lawful purposes and in accordance with these
              Terms. You agree not to:
            </p>
            <ul className="body-default text-primary/80 list-disc space-y-2 pl-5">
              <li>
                use the Site in any way that violates applicable laws or regulations;
              </li>
              <li>
                attempt to gain unauthorized access to the Site, its systems, or
                related networks;
              </li>
              <li>
                use any automated means (including robots, spiders, or similar tools)
                to access, scrape, or copy Site content, except as permitted by
                standard search engine technologies;
              </li>
              <li>
                interfere with or disrupt the operation or security of the Site.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl text-primary">
              4. Intellectual property
            </h2>
            <p className="body-default text-primary/80">
              Unless otherwise noted, all content on the Site—including text, visuals,
              graphics, logos, and layouts—is owned by or licensed to VIP Creative
              Studio and is protected by copyright, trademark, and other intellectual
              property laws.
            </p>
            <p className="body-default text-primary/80">
              You may browse the Site and, where enabled, download or print a single
              copy of materials for your internal business use only. You may not copy,
              reproduce, modify, distribute, or create derivative works from any
              content on the Site without our prior written permission.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl text-primary">
              5. Case studies and results
            </h2>
            <p className="body-default text-primary/80">
              Any case studies, testimonials, performance metrics, or examples of
              results shown on the Site are illustrative of specific client
              engagements. They do not guarantee or predict future performance or
              outcomes for any other client. Your results will depend on many factors
              outside our control, including your market, strategy, and execution.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl text-primary">
              6. Third-party tools and links
            </h2>
            <p className="body-default text-primary/80">
              The Site may contain links to third-party websites and may use
              third-party tools, such as analytics and advertising platforms, to help
              us understand how visitors use the Site and to measure the effectiveness
              of our marketing. We do not control and are not responsible for the
              content, policies, or practices of any third-party websites or services.
            </p>
            <p className="body-default text-primary/80">
              For information on how we use tools like Google Analytics 4, Meta Pixel,
              and Microsoft Clarity, and how they collect and process data, please see
              our <a href="/privacy-policy" className="text-accent-primary underline-offset-2 hover:underline">Privacy Notice</a> and
              <a href="/cookie-policy" className="ml-1 text-accent-primary underline-offset-2 hover:underline">Cookie Policy</a>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl text-primary">
              7. Disclaimer of warranties
            </h2>
            <p className="body-default text-primary/80">
              The Site and all content are provided on an "as is" and "as available"
              basis, without warranties of any kind, either express or implied. To the
              fullest extent permitted by applicable law, we disclaim all warranties,
              including implied warranties of merchantability, fitness for a
              particular purpose, and non-infringement.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl text-primary">
              8. Limitation of liability
            </h2>
            <p className="body-default text-primary/80">
              To the fullest extent permitted by applicable law, VIP Creative Studio
              and its owners, employees, and partners will not be liable for any
              indirect, incidental, consequential, special, or punitive damages arising
              out of or related to your use of the Site, even if we have been advised
              of the possibility of such damages.
            </p>
            <p className="body-default text-primary/80">
              If we are found to be liable to you in connection with the Site, our
              total aggregate liability will be limited to an amount not exceeding one
              hundred U.S. dollars (USD $100).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl text-primary">
              9. Changes to these Terms
            </h2>
            <p className="body-default text-primary/80">
              We may update these Terms from time to time to reflect changes in our
              business, the Site, or applicable laws. When we do, we will update the
              "Last updated" date at the top of this page. Your continued use of the
              Site after any changes become effective constitutes your acceptance of
              the updated Terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl text-primary">
              10. Contact us
            </h2>
            <p className="body-default text-primary/80">
              If you have questions about these Terms or the Site, you can contact us
              at:
            </p>
            <p className="body-default text-primary/80">
              Email: {" "}
              <a
                href="mailto:hello@vipcreativestudio.com"
                className="text-accent-primary underline-offset-2 hover:underline"
              >
                hello@vipcreativestudio.com
              </a>
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
