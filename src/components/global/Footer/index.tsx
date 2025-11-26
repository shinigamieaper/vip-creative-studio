"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Instagram } from "lucide-react";
import { BlurText, PrimaryCtaButton } from "@/components";

type FooterLink = {
  label: string;
  href: string;
};

type FooterLinkGroup = {
  title: string;
  links: FooterLink[];
};

type FooterSocialIcon = {
  platform: string;
  label: string;
  url: string;
};

interface FooterProps {
  footer?: {
    linkGroups?: FooterLinkGroup[];
    socialIcons?: FooterSocialIcon[];
    bottomText?: string;
  };
}

const defaultLinkGroups: FooterLinkGroup[] = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Content hub", href: "/resources" },
      { label: "Our Partnership Model", href: "/our-partnership-model" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Fine Print",
    links: [
      { label: "Terms & Conditions", href: "/terms-of-service" },
      { label: "Privacy Notice", href: "/privacy-policy" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "Accessibility Statement", href: "/accessibility" },
    ],
  },
];

const defaultSocialIcons: FooterSocialIcon[] = [
  {
    platform: "linkedin",
    label: "Visit VIP Creative Studio on LinkedIn",
    url: "https://linkedin.com",
  },
  {
    platform: "twitter",
    label: "Visit VIP Creative Studio on Twitter",
    url: "https://twitter.com",
  },
  {
    platform: "instagram",
    label: "Visit VIP Creative Studio on Instagram",
    url: "https://instagram.com",
  },
];

const socialIconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
};

const getDefaultBottomText = (year: number) =>
  `© ${year} VIP Creative Studio — Crafting exceptional brand experiences for financial services`;

const Footer: React.FC<FooterProps> = ({ footer }) => {
  const currentYear = new Date().getFullYear();
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);
  const router = useRouter();

   const linkGroups =
    footer?.linkGroups && footer.linkGroups.length > 0
      ? footer.linkGroups
      : defaultLinkGroups;

  const socialIcons =
    footer?.socialIcons && footer.socialIcons.length > 0
      ? footer.socialIcons
      : defaultSocialIcons;

  const bottomText = footer?.bottomText ?? getDefaultBottomText(currentYear);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    router.push("/contact");
  };

  return (
    <footer className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 sm:mt-10 mb-16">
        <div className="relative overflow-hidden rounded-[32px] border border-standard p-5 sm:p-6 lg:p-8 bg-card shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-shadow duration-300">
          {/* Decorative Background Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-20%,hsl(var(--accent-primary)/0.04),transparent_60%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_80%_120%,hsl(var(--accent-secondary)/0.03),transparent_60%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--text-primary)/0.03)_1px,transparent_1px)] bg-size-[20px_20px] opacity-[0.4]"></div>
          </div>

          {/* Content */}
          <div className="relative">
            {/* Hero Headline */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading font-black text-[14vw] sm:text-[10vw] lg:text-[7vw] leading-[0.9] tracking-tighter"
            >
              <BlurText as="span" text="Ready to elevate" animateBy="words" className="block text-primary" textClassName="text-primary" />
              <BlurText as="span" text="your brand story?" animateBy="words" className="block text-accent-primary" textClassName="text-accent-primary" />
            </motion.h2>


            {/* CTA Row */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
            >
              {/* Email */}
              <a
                href="mailto:hello@vipcreativestudio.com"
                className="inline-flex items-center gap-2 text-base sm:text-lg font-heading font-semibold tracking-tight text-primary hover:text-accent-primary transition-colors duration-300 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform duration-300"
                >
                  <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                </svg>
                <span>hello@vipcreativestudio.com</span>
              </a>

              {/* Schedule Call */}
              <PrimaryCtaButton
                onClick={handleClick}
                shimmer
                shimmerSpeedSeconds={1.6}
                variant="orangeTeal"
                className="rounded-full h-14 px-8 text-base font-medium"
                withArrow
              >
                Book a Discovery Call
              </PrimaryCtaButton>
            </motion.div>

            {/* Divider */}
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 sm:mt-8 border-t border-standard origin-left"
            ></motion.div>

            {/* Navigation, Legal & Social */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-5 sm:mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 items-start"
            >
              {/* Link groups from CMS with fallbacks */}
              {linkGroups.map((group, groupIndex) => (
                <div key={group.title || groupIndex}>
                  <p className="font-body text-xs text-primary/60 mb-2">{group.title}</p>
                  <div className="flex flex-col gap-1">
                    {group.links?.map((link, linkIndex) => (
                      <Link
                        key={`${group.title}-${link.label}-${linkIndex}`}
                        href={link.href}
                        className="font-heading font-medium tracking-tight text-primary hover:text-accent-primary transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {/* Social */}
              <div>
                <p className="font-body text-xs text-primary/60 mb-2">Connect</p>
                <div className="flex items-center gap-3">
                  {socialIcons.map((icon, index) => {
                    const IconComponent =
                      socialIconComponents[icon.platform.toLowerCase()] ?? Linkedin;

                    return (
                      <a
                        key={`${icon.platform}-${index}`}
                        href={icon.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={icon.label}
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-standard/60 text-primary/70 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:text-accent-primary hover:border-accent-primary/70 hover:-translate-y-0.5 hover:shadow-md ${
                          hoveredSocial === index
                            ? "text-accent-primary border-accent-primary/70 shadow-md -translate-y-0.5"
                            : ""
                        }`}
                        onMouseEnter={() => setHoveredSocial(index)}
                        onMouseLeave={() => setHoveredSocial(null)}
                      >
                        <IconComponent className="h-5 w-5" aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Copyright */}
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-5 sm:mt-6 text-center font-body text-xs text-primary/60"
            >
              {bottomText}
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
