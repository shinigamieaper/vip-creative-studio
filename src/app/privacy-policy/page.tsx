import type { Metadata } from "next";
import { BlurText } from "@/components";

export const metadata: Metadata = {
  title: "Privacy Notice | VIP Creative Studio",
  description: "How VIP Creative Studio collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen">
      <section className="py-24 px-4">
        <div className="mx-auto max-w-3xl space-y-10">
          <h1 className="h1 text-primary">
            <BlurText
              as="span"
              text="Privacy Notice"
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
            This Privacy Notice explains how VIP Creative Studio ("we", "us", or
            "our") collects, uses, and shares information when you visit our website
            or contact us. We are a U.S.-based studio and this Notice is intended for
            visitors located in the United States.
          </p>

          <section className="space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl text-primary">
              1. Information we collect
            </h2>
            <p className="body-default text-primary/80">
              We collect information in three main ways:
            </p>
            <ul className="body-default text-primary/80 list-disc space-y-2 pl-5">
              <li>
                <span className="font-semibold">Information you provide directly.</span>
                {" "}
                When you fill out our contact or discovery call forms, we collect
                information such as your name, work email, company name, and any
                details you choose to share in your message.
              </li>
              <li>
                <span className="font-semibold">Automatic usage data.</span>
                {" "}
                When you visit the Site, we automatically collect certain technical
                information such as your IP address, browser type, device identifiers,
                pages viewed, and the date and time of your visit.
              </li>
              <li>
                <span className="font-semibold">Cookies and similar technologies.</span>
                {" "}
                We use cookies, pixels, and similar tools to help operate the Site,
                understand how it is used, and measure the effectiveness of our
                marketing. For more details, see our
                {" "}
                <a
                  href="/cookie-policy"
                  className="text-accent-primary underline-offset-2 hover:underline"
                >
                  Cookie Policy
                </a>
                .
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl text-primary">
              2. How we use your information
            </h2>
            <p className="body-default text-primary/80">
              We use the information we collect for purposes including:
            </p>
            <ul className="body-default text-primary/80 list-disc space-y-2 pl-5">
              <li>Responding to your inquiries and communicating with you;</li>
              <li>
                Providing, operating, and improving our Site, services, and user
                experience;
              </li>
              <li>
                Understanding how visitors use the Site so we can refine our content
                and positioning;
              </li>
              <li>
                Measuring and improving the performance of our marketing campaigns;
              </li>
              <li>
                Protecting the security and integrity of the Site and our business;
              </li>
              <li>
                Complying with applicable laws and responding to lawful requests.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl text-primary">
              3. Analytics, advertising, and session insights
            </h2>
            <p className="body-default text-primary/80">
              We use third-party tools to help us understand how visitors interact
              with the Site and to support our marketing. These tools include, for
              example:
            </p>
            <ul className="body-default text-primary/80 list-disc space-y-2 pl-5">
              <li>
                <span className="font-semibold">Google Analytics 4 (GA4)</span>
                {" "}
                to measure traffic patterns and engagement;
              </li>
              <li>
                <span className="font-semibold">Meta Pixel</span>
                {" "}
                to understand how our Meta (Facebook/Instagram) ads perform and to
                build audiences for our campaigns;
              </li>
              <li>
                <span className="font-semibold">Microsoft Clarity</span>
                {" "}
                to gain high-level insights into how visitors navigate the Site (for
                example, through heatmaps and session analytics).
              </li>
            </ul>
            <p className="body-default text-primary/80">
              These providers may set their own cookies or use similar technologies to
              collect information about your device and browsing activity on this and
              other sites over time. They use this information to provide analytics and
              to help us understand the effectiveness of our content and campaigns.
              You can learn more about how these providers use data by reviewing their
              respective privacy policies.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl text-primary">
              4. How we share information
            </h2>
            <p className="body-default text-primary/80">
              We do not sell your personal information. We may share information in
              the following situations:
            </p>
            <ul className="body-default text-primary/80 list-disc space-y-2 pl-5">
              <li>
                <span className="font-semibold">Service providers.</span>
                {" "}
                We work with trusted vendors that provide services such as website
                hosting, analytics, email delivery, and customer relationship
                management. They may process information on our behalf in accordance
                with our instructions.
              </li>
              <li>
                <span className="font-semibold">Legal, safety, and protection.</span>
                {" "}
                We may disclose information if we believe it is required or
                appropriate to comply with law, respond to legal requests, or protect
                our rights, property, or safety, or that of our clients or others.
              </li>
              <li>
                <span className="font-semibold">Business transfers.</span>
                {" "}
                In connection with a merger, acquisition, financing, or sale of all or
                a portion of our business, information may be transferred as part of
                that transaction.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl text-primary">
              5. Data retention
            </h2>
            <p className="body-default text-primary/80">
              We retain information for as long as reasonably necessary to fulfill the
              purposes described in this Notice, including to provide services,
              communicate with you, comply with our legal obligations, resolve
              disputes, and enforce our agreements. The specific retention period can
              vary depending on the type of data and context of our interactions with
              you.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl text-primary">
              6. Your choices
            </h2>
            <p className="body-default text-primary/80">
              Depending on your location and applicable law, you may have certain
              rights related to your personal information, such as the ability to
              request access, correction, or deletion.
            </p>
            <p className="body-default text-primary/80">
              Even where specific legal rights do not apply, we aim to handle requests
              about your information in a reasonable and transparent way. You can
              contact us using the details below to ask questions or make a request
              related to your information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl text-primary">
              7. Cookies and tracking technologies
            </h2>
            <p className="body-default text-primary/80">
              You can control certain cookies through your browser settings, including
              by blocking or deleting them. However, if you disable cookies, some parts
              of the Site may not function properly. For more detail on the types of
              cookies we use and how to manage them, please read our
              {" "}
              <a
                href="/cookie-policy"
                className="text-accent-primary underline-offset-2 hover:underline"
              >
                Cookie Policy
              </a>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl text-primary">
              8. Data security
            </h2>
            <p className="body-default text-primary/80">
              We use reasonable administrative, technical, and physical safeguards to
              help protect the information we collect. No method of transmission or
              storage is perfectly secure, so we cannot guarantee absolute security,
              but we strive to protect your information in a way that is appropriate
              for the nature of the data and our business.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl text-primary">
              9. Children's privacy
            </h2>
            <p className="body-default text-primary/80">
              The Site is intended for business and professional use and is not
              directed to children under the age of 13. We do not knowingly collect
              personal information from children under 13. If you believe a child has
              provided us with personal information, please contact us so we can take
              appropriate steps.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl text-primary">
              10. Changes to this Notice
            </h2>
            <p className="body-default text-primary/80">
              We may update this Privacy Notice from time to time. When we do, we will
              update the "Last updated" date at the top of this page. We encourage you
              to review this page periodically to stay informed about how we handle
              your information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl text-primary">
              11. Contact us
            </h2>
            <p className="body-default text-primary/80">
              If you have questions about this Privacy Notice or how we handle your
              information, you can contact us at:
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
