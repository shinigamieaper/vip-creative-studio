"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Label from "@/components/ui/label";
import Input from "@/components/ui/input";
import { PrimaryCtaButton } from "@/components";

export interface LeadCaptureFormProps extends React.ComponentPropsWithoutRef<"form"> {
  variant?: "template" | "webinar";
  title?: string;
  description?: string;
  ctaLabel?: string;
  disclaimer?: string;
}

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  className = "",
  variant = "template",
  title,
  description,
  ctaLabel,
  disclaimer,
  onSubmit,
  ...props
}) => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
    onSubmit?.(event);
  };

  const resolvedTitle =
    title ?? (variant === "webinar" ? "Save your seat" : "Download this free resource");

  const resolvedDescription =
    description ??
    (variant === "webinar"
      ? "Share your work email and company so we can send your calendar invite and joining details."
      : "Share your work email and company so we can send the download link straight to your inbox.");

  const resolvedCtaLabel =
    ctaLabel ?? (variant === "webinar" ? "Save my seat" : "Send me the download");

  const resolvedDisclaimer =
    disclaimer ??
    "We'll only use your details to share this resource and occasional content hub updates. No spam.";

  return (
    <div
      className={cn(
        "rounded-[32px] border border-standard bg-card p-6 sm:p-8 shadow-lg",
        className
      )}
    >
      <div className="mb-4 sm:mb-6">
        <h2 className="font-heading font-black text-primary text-xl sm:text-2xl mb-2">
          {resolvedTitle}
        </h2>
        <p className="body-default text-primary/80 text-sm sm:text-base">{resolvedDescription}</p>
      </div>

      {isSubmitted ? (
        <div className="rounded-2xl bg-accent-primary/5 border border-accent-primary/30 p-4 text-sm text-primary/80">
          <p className="font-semibold text-primary mb-1">You're in.</p>
          <p>
            Check your inbox for a confirmation email. If it doesn't arrive in a few minutes, please
            check your spam folder.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" {...props}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="company">Company name</Label>
            <Input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              required
              placeholder="Enter your company or credit union name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Work email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="name@company.com"
            />
          </div>

          <div className="pt-2">
            <PrimaryCtaButton
              type="submit"
              shimmer={false}
              withArrow
              className="w-full justify-center"
            >
              {resolvedCtaLabel}
            </PrimaryCtaButton>
          </div>

          <p className="mt-1 text-[11px] leading-snug text-primary/60">{resolvedDisclaimer}</p>
        </form>
      )}
    </div>
  );
};

export default LeadCaptureForm;
