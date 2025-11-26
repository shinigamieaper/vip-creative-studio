"use client";

import React, { useState, useEffect } from "react";
import { Mail, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { cn } from "@/lib/utils";

export interface NewsletterSignupProps {
  /** Visual variant */
  variant?: "dark" | "light";
  /** Optional custom title */
  title?: string;
  /** Optional custom description */
  description?: string;
  /** Optional custom CTA label */
  ctaLabel?: string;
  /** Optional className for the wrapper */
  className?: string;
}

export function NewsletterSignup({
  variant = "dark",
  title = "Get insights delivered",
  description = "Join 2,000+ marketing leaders who receive our weekly digest of strategies, case studies, and industry trends.",
  ctaLabel = "Subscribe",
  className,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Log for backend integration
    console.log("Newsletter signup:", { email });

    // TODO: Send to backend API

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "relative rounded-2xl p-8 sm:p-10 text-center overflow-hidden",
        isDark ? "bg-primary" : "bg-card border border-standard",
        className
      )}
    >
      {/* Confetti celebration */}
      {submitted && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={250}
          gravity={0.25}
          colors={["#FF8C00", "#40E0D0", "#FFD700", "#FF6B6B", "#4ECDC4"]}
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
            className="py-4"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5, delay: 0.1 }}
              className="relative inline-block mb-4"
            >
              <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center",
                isDark ? "bg-accent-secondary/20" : "bg-accent-secondary/10"
              )}>
                <CheckCircle2 className="w-8 h-8 text-accent-secondary" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute -top-1 -right-1"
              >
                <Sparkles className="w-5 h-5 text-accent-primary" />
              </motion.div>
            </motion.div>

            {/* Success Message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className={cn(
                "font-heading font-bold text-xl sm:text-2xl mb-2",
                isDark ? "text-white" : "text-primary"
              )}>
                You're on the list!
              </h3>
              <p className={cn(
                "text-sm sm:text-base mb-4 max-w-sm mx-auto",
                isDark ? "text-white/70" : "text-primary/70"
              )}>
                Check your inbox for a welcome email. Get ready for actionable insights every week.
              </p>

              {/* Email confirmation */}
              <div className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm",
                isDark ? "bg-white/10 text-white/80" : "bg-accent-secondary/10 text-accent-secondary"
              )}>
                <Mail className="w-4 h-4" />
                <span>{email}</span>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Icon */}
            <div className={cn(
              "inline-flex items-center justify-center w-12 h-12 rounded-full mb-4",
              isDark ? "bg-accent-primary/20" : "bg-accent-primary/10"
            )}>
              <Mail className="w-6 h-6 text-accent-primary" />
            </div>

            {/* Title */}
            <h2 className={cn(
              "font-heading font-bold text-xl sm:text-2xl mb-2",
              isDark ? "text-white" : "text-primary"
            )}>
              {title}
            </h2>

            {/* Description */}
            <p className={cn(
              "text-sm sm:text-base mb-6 max-w-md mx-auto",
              isDark ? "text-white/70" : "text-primary/70"
            )}>
              {description}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={cn(
                  "flex-1 px-4 py-3 rounded-xl border focus:outline-none transition-colors",
                  isDark
                    ? "bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent-primary/50"
                    : "bg-card border-standard text-primary placeholder:text-primary/40 focus:border-accent-primary/50"
                )}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed",
                  isDark
                    ? "bg-accent-primary text-white hover:bg-accent-primary/90"
                    : "bg-primary text-white hover:bg-primary/90"
                )}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="inline-block"
                    >
                      <Mail className="w-4 h-4" />
                    </motion.span>
                    Subscribing...
                  </span>
                ) : (
                  <>
                    {ctaLabel}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Error */}
            {error && (
              <p className="text-red-400 text-sm mt-3">{error}</p>
            )}

            {/* Privacy note */}
            <p className={cn(
              "text-xs mt-4",
              isDark ? "text-white/40" : "text-primary/40"
            )}>
              No spam. Unsubscribe anytime.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NewsletterSignup;
