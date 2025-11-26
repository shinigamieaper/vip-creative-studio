import { defineType, defineField } from "sanity";

export default defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  initialValue: {
    heroTitle: "More Than a Vendor. We're Your Fractional Partner for",
    heroSubtitle:
      "We don't just execute campaigns\u2014we become an integral part of your team, bringing strategic expertise and creative excellence to every initiative.",
    primaryCta: {
      label: "Book a Discovery Call",
      href: "/contact",
    },
    secondaryCta: {
      label: "Explore Our Services",
      href: "#services",
    },
  },
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
      description: "Small label above the main headline on the Services page hero.",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      description: "Main headline for the Services page hero.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 3,
      description: "Short supporting copy under the hero title.",
    }),
    defineField({
      name: "primaryCta",
      title: "Primary CTA",
      type: "object",
      fields: [
        {
          name: "label",
          title: "Label",
          type: "string",
          description: "Button text for the main call-to-action (e.g. 'Book a discovery call').",
        },
        {
          name: "href",
          title: "URL",
          type: "string",
          description: "Internal path or full URL the primary CTA should link to.",
        },
      ],
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "object",
      fields: [
        {
          name: "label",
          title: "Label",
          type: "string",
          description: "Button text for the secondary link (e.g. 'Explore all services').",
        },
        {
          name: "href",
          title: "URL",
          type: "string",
          description: "Internal path or full URL the secondary CTA should link to.",
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        {
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          description: "Browser tab title and default title for search results.",
        },
        {
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          description: "Short description used by search engines and link previews.",
        },
        {
          name: "ogImage",
          title: "OG Image",
          type: "image",
          description: "Social sharing image for the Services page (shown on platforms like LinkedIn).",
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Services Page",
      };
    },
  },
});
