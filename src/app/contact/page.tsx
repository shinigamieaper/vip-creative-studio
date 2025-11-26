import type { Metadata } from "next";
import { BlurText, ContactForm } from "@/components";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Book a discovery call with VIP Creative Studio. Let's discuss how our fractional partnership model can accelerate your credit union's growth.",
  openGraph: {
    title: "Contact VIP Creative Studio | Book a Discovery Call",
    description:
      "Book a discovery call to discuss how our fractional partnership model can accelerate your credit union's growth.",
  },
};

export default function ContactPage() {
  return (
    <section className="py-24 px-4">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-6">
          <h1 className="h1 text-primary">
            <BlurText
              as="span"
              text="Let's Build Your"
              className="text-primary"
              textClassName="text-primary"
              delay={30}
              animateBy="words"
              direction="top"
            />
            {" "}
            <BlurText
              as="span"
              text="Growth"
              className="text-accent-primary"
              textClassName="text-accent-primary"
              delay={30}
              animateBy="words"
              direction="top"
            />
            {" "}
            <BlurText
              as="span"
              text="Strategy"
              className="text-primary"
              textClassName="text-primary"
              delay={30}
              animateBy="words"
              direction="top"
            />
          </h1>
          <p className="body-default text-primary/80">
            We're excited to learn more about your goals and how we can help your financial institution thrive. Reach out to us today to discuss your specific needs and explore tailored solutions.
          </p>
          <p className="body-default text-primary/80">
            Email: {" "}
            <a
              className="text-accent-primary underline-offset-2 hover:underline"
              href="mailto:contact@vipcreativestudio.com"
            >
              contact@vipcreativestudio.com
            </a>
          </p>
        </div>

        <ContactForm
          title="Discovery Call Form"
          description=""
          nameLabel="Full Name"
          namePlaceholder="Enter your full name"
          emailLabel="Work Email"
          emailPlaceholder="Enter your work email"
          companyLabel="Company Name"
          companyPlaceholder="Enter your company name"
          messageLabel="How can we help?"
          messagePlaceholder="Describe your needs and goals"
          ctaLabel="Book a Discovery Call"
        />
      </div>
    </section>
  );
}
