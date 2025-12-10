"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PrimaryCtaButton, BlurText } from "@/components";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Sparkles, PartyPopper, ArrowRight, Mail, Calendar } from "lucide-react";
import Confetti from "react-confetti";

export interface ContactFormProps extends React.ComponentPropsWithoutRef<"form"> {
  title?: string;
  description?: string;
  nameLabel?: string;
  namePlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  companyLabel?: string;
  companyPlaceholder?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  ctaLabel?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  className = "",
  title = "Get in touch",
  description = "Tell us about your project and we'll reply within 1 business day.",
  nameLabel = "Full Name",
  namePlaceholder = "Enter your full name",
  emailLabel = "Work Email",
  emailPlaceholder = "Enter your work email",
  companyLabel = "Company Name",
  companyPlaceholder = "Enter your company name",
  messageLabel = "How can we help?",
  messagePlaceholder = "Describe your needs and goals",
  ctaLabel = "Send message",
  onSubmit,
  ...props
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Get window size for confetti
  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          source: "contact_page",
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        const message = data?.error || "Unable to submit right now. Please try again later.";
        if (typeof window !== "undefined") {
          alert(message);
        }
        return;
      }

      // Log form data - backend integration will handle actual submission
      console.log("Contact form submitted:", formData);

      // TODO: Send to backend API

      setSubmitted(true);
      onSubmit?.(e);

      if (typeof window !== "undefined" && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: "form_submit",
          form_type: "contact",
          source: "contact_page",
        });
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      if (typeof window !== "undefined") {
        alert("Unable to submit right now. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  return (
    <div
      className={cn(
        "relative rounded-[40px] border-2 border-standard bg-card p-8 md:p-10 shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition-all duration-300 hover:shadow-[0_12px_32px_rgba(15,23,42,0.12)] overflow-hidden",
        className,
      )}
    >

      {/* Confetti celebration */}
      {submitted && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={400}
          gravity={0.2}
          colors={["#FF8C00", "#40E0D0", "#FFD700", "#FF6B6B", "#4ECDC4", "#FF9F43"]}
          style={{ position: "fixed", top: 0, left: 0, zIndex: 60, pointerEvents: "none" }}
        />
      )}

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="py-8 text-center"
          >
            {/* Animated rocket icon */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", duration: 0.6, delay: 0.1 }}
              className="relative mx-auto mb-6"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-24 h-24 mx-auto rounded-full bg-linear-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-[0_8px_30px_rgba(255,140,0,0.4)]"
              >
                <div className="w-16 h-16 rounded-full bg-card/95 flex items-center justify-center shadow-[0_0_25px_rgba(15,23,42,0.18)]">
                  <Rocket className="w-9 h-9 text-accent-primary -rotate-45" />
                </div>
              </motion.div>
              
              {/* Sparkle decorations */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
                className="absolute -top-2 -right-2"
              >
                <Sparkles className="w-6 h-6 text-accent-primary" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
                className="absolute -bottom-1 -left-3"
              >
                <Sparkles className="w-5 h-5 text-accent-secondary" />
              </motion.div>
            </motion.div>

            {/* Success heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-heading font-black text-3xl md:text-4xl text-primary mb-3">
                You're on our radar!
              </h3>
              <p className="text-lg text-primary/70 mb-2">
                <PartyPopper className="inline w-5 h-5 text-accent-primary mr-1" />
                Message received loud and clear
              </p>
            </motion.div>

            {/* What happens next */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-8 space-y-4"
            >
              <p className="text-sm font-semibold text-primary/50 uppercase tracking-wider">
                What happens next
              </p>
              
              <div className="flex flex-col gap-3 max-w-sm mx-auto">
                <div className="flex items-center gap-3 text-left bg-accent-secondary/5 rounded-xl p-4 border border-accent-secondary/20">
                  <div className="w-10 h-10 rounded-full bg-accent-secondary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-accent-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary text-sm">Check your inbox</p>
                    <p className="text-xs text-primary/60">We'll send a confirmation email shortly</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-left bg-accent-primary/5 rounded-xl p-4 border border-accent-primary/20">
                  <div className="w-10 h-10 rounded-full bg-accent-primary/10 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-accent-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary text-sm">Expect a reply within 24h</p>
                    <p className="text-xs text-primary/60">Often much sooner!</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Reset button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 text-sm text-primary/50 hover:text-accent-primary transition-colors"
              >
                Send another message
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-8 md:mb-10">
              <BlurText
                as="h2"
                text={title}
                className="h3 text-primary"
                textClassName="text-primary"
                delay={30}
                animateBy="words"
                direction="top"
              />
              {description && <p className="mt-3 body-default text-primary/80">{description}</p>}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" {...props}>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="flex flex-col">
                  <Label htmlFor="name">{nameLabel}</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder={namePlaceholder}
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="flex flex-col">
                  <Label htmlFor="email">{emailLabel}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={emailPlaceholder}
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <Label htmlFor="company">{companyLabel}</Label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  placeholder={companyPlaceholder}
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              <div className="flex flex-col">
                <Label htmlFor="message">{messageLabel}</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={messagePlaceholder}
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <div className="pt-2 space-y-2">
                <PrimaryCtaButton
                  type="submit"
                  withArrow
                  disabled={isSubmitting}
                  className="w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="inline-block"
                      >
                        <Rocket className="w-5 h-5 -rotate-45" />
                      </motion.span>
                      Sending...
                    </span>
                  ) : (
                    ctaLabel
                  )}
                </PrimaryCtaButton>
                <p className="text-xs text-primary/50 text-center">
                  No spam, no pressure. Just a real conversation about whether we're a fit.
                </p>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
