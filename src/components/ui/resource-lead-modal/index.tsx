"use client";

import React, { useState, useEffect } from "react";
import { X, Download, Users, Mail, Building2, CheckCircle2, PartyPopper } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PrimaryCtaButton } from "@/components";
import Confetti from "react-confetti";

export interface ResourceLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { email: string; companyName: string }) => void | Promise<void>;
  resourceTitle: string;
  resourceType: "download" | "webinar";
  /** Optional: The format of the download (e.g., "PDF", "Excel") */
  downloadFormat?: string;
}

export function ResourceLeadModal({
  isOpen,
  onClose,
  onSubmit,
  resourceTitle,
  resourceType,
  downloadFormat
}: ResourceLeadModalProps) {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const isDownload = resourceType === "download";

  // Get window size for confetti
  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setEmail("");
      setCompanyName("");
      setError("");
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!companyName.trim()) {
      setError("Please enter your company name");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = onSubmit({ email, companyName });
      if (result && typeof (result as any).then === "function") {
        await result;
      }
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting resource lead:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setEmail("");
    setCompanyName("");
    setError("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Confetti celebration */}
          {submitted && (
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              recycle={false}
              numberOfPieces={300}
              gravity={0.25}
              colors={["#FF8C00", "#40E0D0", "#FFD700", "#FF6B6B", "#4ECDC4"]}
              style={{ position: "fixed", top: 0, left: 0, zIndex: 60 }}
            />
          )}

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-background rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-standard overflow-hidden mx-4">
              {/* Success State */}
              {submitted ? (
                <div className="p-8 text-center">
                  {/* Success Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5, delay: 0.1 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent-secondary/10 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-10 h-10 text-accent-secondary" />
                  </motion.div>

                  {/* Success Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="font-heading font-bold text-2xl text-primary mb-3">
                      {isDownload ? "You're all set!" : "Seat reserved!"}
                    </h3>
                    <p className="text-primary/70 mb-6 leading-relaxed">
                      {isDownload ? (
                        <>
                          We've sent the download link to your email.
                          <br />
                          <span className="font-semibold text-primary">Check your inbox</span> (and spam folder, just in case).
                        </>
                      ) : (
                        <>
                          We've sent your calendar invite and confirmation.
                          <br />
                          <span className="font-semibold text-primary">Check your inbox</span> for all the details.
                        </>
                      )}
                    </p>

                    {/* Email reminder */}
                    <div className="bg-accent-secondary/5 rounded-xl p-4 mb-6 border border-accent-secondary/20">
                      <div className="flex items-center justify-center gap-2 text-accent-secondary">
                        <Mail className="w-5 h-5" />
                        <span className="font-medium">{email}</span>
                      </div>
                    </div>

                    <PrimaryCtaButton
                      type="button"
                      variant="primary"
                      onClick={handleClose}
                      className="w-full justify-center"
                    >
                      Done
                    </PrimaryCtaButton>
                  </motion.div>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="bg-primary p-6 relative">
                    <button
                      onClick={handleClose}
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>

                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-accent-secondary/20 flex items-center justify-center">
                        {isDownload ? (
                          <Download className="w-6 h-6 text-accent-secondary" />
                        ) : (
                          <Users className="w-6 h-6 text-accent-secondary" />
                        )}
                      </div>
                      <div>
                        <p className="text-white/60 text-xs uppercase tracking-wider">
                          {isDownload ? "Free Download" : "Save Your Seat"}
                        </p>
                        <p className="font-heading font-bold text-white">
                          {isDownload
                            ? downloadFormat || "Get Instant Access"
                            : "Register for Webinar"}
                        </p>
                      </div>
                    </div>

                    <p className="text-white/80 text-sm line-clamp-2">{resourceTitle}</p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <p className="text-sm text-primary/70 mb-4">
                      {isDownload
                        ? "Enter your details below and we'll send the download link to your email."
                        : "Enter your details to save your seat. We'll send you a calendar invite and reminder."}
                    </p>

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="lead-email"
                        className="block text-sm font-medium text-primary mb-1.5"
                      >
                        Work Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
                        <input
                          id="lead-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@company.com"
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-card border border-standard text-primary placeholder:text-primary/40 focus:outline-none focus:border-accent-secondary/50 focus:ring-2 focus:ring-accent-secondary/10 transition-all"
                        />
                      </div>
                    </div>

                    {/* Company Name Field */}
                    <div>
                      <label
                        htmlFor="lead-company"
                        className="block text-sm font-medium text-primary mb-1.5"
                      >
                        Company Name
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
                        <input
                          id="lead-company"
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Your credit union or company"
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-card border border-standard text-primary placeholder:text-primary/40 focus:outline-none focus:border-accent-secondary/50 focus:ring-2 focus:ring-accent-secondary/10 transition-all"
                        />
                      </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">
                        {error}
                      </p>
                    )}

                    {/* Submit Button */}
                    <PrimaryCtaButton
                      type="submit"
                      disabled={isSubmitting}
                      variant="primary"
                      withArrow={!isDownload}
                      className="w-full justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        "Processing..."
                      ) : isDownload ? (
                        <>
                          <Download className="w-5 h-5 mr-2" />
                          <span>Get Free Download</span>
                        </>
                      ) : (
                        <span>Save My Seat</span>
                      )}
                    </PrimaryCtaButton>

                    {/* Privacy Note */}
                    <p className="text-xs text-primary/50 text-center">
                      By submitting, you agree to receive occasional updates from us.
                      <br />
                      Unsubscribe anytime. No spam.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ResourceLeadModal;
