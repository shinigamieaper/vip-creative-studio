import type { Metadata } from "next";
import { BlurText } from "@/components";

export const metadata: Metadata = {
  title: "Cookie Policy | VIP Creative Studio",
  description: "How VIP Creative Studio uses cookies and similar technologies.",
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen">
      <section className="py-24 px-4">
        <div className="mx-auto max-w-3xl space-y-10">
          <h1 className="h1 text-primary">
            <BlurText
              as="span"
              text="Cookie Policy"
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
            This Cookie Policy explains how VIP Creative Studio ("we", "us", or
            "our") uses cookies and similar technologies when you visit our website
            (the "Site"). It should be read together with our
            {" "}
            <a
              href="/privacy-policy"
              className="text-accent-primary underline-offset-2 hover:underline"
            >
              Privacy Notice
            </a>
            , which provides more detail on how we handle personal information.
          </p>

          <section className="space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl text-primary">
              1. What are cookies?
            </h2>
            <p className="body-default text-primary/80">
              Cookies are small text files that are stored on your device by your web
              browser. They help websites remember your actions and preferences over
              time, and they enable certain features and functionality. Related
              technologies, such as pixels, tags, and local storage, work in a similar
              way and are collectively referred to in this Policy as "cookies".
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl text-primary">
              2. Types of cookies we use
            </h2>
            <p className="body-default text-primary/80">
              We use the following general categories of cookies:
            </p>
            <ul className="body-default text-primary/80 list-disc space-y-2 pl-5">
              <li>
                <span className="font-semibold">Essential cookies.</span>
                {" "}
                These cookies are necessary for the Site to function and cannot be
                switched off in our systems. They are typically set in response to
                actions you take, such as navigating between pages or submitting forms.
              </li>
              <li>
                <span className="font-semibold">Analytics cookies.</span>
                {" "}
                These cookies help us understand how visitors use the Site so we can
                improve it over time. For example, we use Google Analytics 4 (GA4) to
                measure traffic patterns, page performance, and engagement.
              </li>
              <li>
                <span className="font-semibold">Advertising and measurement cookies.</span>
                {" "}
                We use tools such as the Meta Pixel to understand how our advertising
                performs, to build audiences for our campaigns, and to measure
                conversions when someone interacts with our ads and later visits the
                Site.
              </li>
              <li>
                <span className="font-semibold">Experience and session insights.</span>
                {" "}
                We may use Microsoft Clarity or similar tools to gain high-level
                insights into how visitors navigate the Site. These tools can use
                cookies and similar technologies to collect usage information that
                helps us optimize the layout and experience.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl text-primary">
              3. How third parties use cookies
            </h2>
            <p className="body-default text-primary/80">
              In addition to cookies that we set directly, certain third parties may
              set cookies when you visit our Site. These providers may use the
              information collected through their cookies on this and other websites
              to provide analytics services, measure ad performance, and, in some
              cases, to personalize ads shown to you on other sites or platforms.
            </p>
            <p className="body-default text-primary/80">
              You can learn more about how these providers use cookies and how to
              exercise your choices by reviewing their individual privacy and cookie
              policies.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl text-primary">
              4. Your choices and controls
            </h2>
            <p className="body-default text-primary/80">
              You have several options for controlling or limiting how cookies are
              used on your device:
            </p>
            <ul className="body-default text-primary/80 list-disc space-y-2 pl-5">
              <li>
                <span className="font-semibold">Browser settings.</span>
                {" "}
                Most browsers allow you to block or delete cookies, or to receive
                alerts when cookies are being set. If you block all cookies, some
                parts of the Site may not function properly.
              </li>
              <li>
                <span className="font-semibold">Do Not Track and similar signals.</span>
                {" "}
                Your browser may offer a "Do Not Track" (DNT) or similar setting. At
                this time, we do not respond to DNT signals in a way that would affect
                the cookies used on the Site, but you can still use other controls
                described in this Policy.
              </li>
              <li>
                <span className="font-semibold">Third-party opt-outs.</span>
                {" "}
                Some analytics and advertising providers offer their own opt-out
                mechanisms or preference tools. You can refer to their documentation
                for more information.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl text-primary">
              5. Updates to this Policy
            </h2>
            <p className="body-default text-primary/80">
              We may update this Cookie Policy from time to time, for example to
              reflect changes in the cookies we use or applicable requirements. When
              we make changes, we will update the "Last updated" date at the top of
              this page.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl text-primary">
              6. Contact us
            </h2>
            <p className="body-default text-primary/80">
              If you have questions about this Cookie Policy or how we use cookies,
              you can contact us at:
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
