import { defineType, defineField } from "sanity";

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
      description: "Small label above the main headline.",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      description: "Main headline for the homepage hero.",
      validation: (Rule) => Rule.required(),
      initialValue: "VIP Creative Studio, your fractional partner for",
    }),
    defineField({
      name: "heroFlipWords",
      title: "Hero Rotating Words",
      type: "array",
      of: [{ type: "string" }],
      description: "Words used in the rotating hero text animation.",
      initialValue: [
        "measurable member growth.",
        "higher loan growth.",
        "increased deposits.",
        "stronger member retention.",
        "proven marketing ROI.",
      ],
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 3,
      description: "Short supporting copy under the homepage hero title.",
      initialValue:
        "We cut through the complexity of credit union marketing, delivering quantifiable results by becoming a seamless extension of your team.",
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
      initialValue: {
        label: "Book a Discovery Call",
        href: "/contact",
      },
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
          description: "Button text for the secondary link (e.g. 'Explore our services').",
        },
        {
          name: "href",
          title: "URL",
          type: "string",
          description: "Internal path or full URL the secondary CTA should link to.",
        },
      ],
      initialValue: {
        label: "Our Partnership Models",
        href: "/our-partnership-model",
      },
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
          description: "Social sharing image for the homepage (shown on platforms like LinkedIn).",
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Home Page",
      };
    },
  },
});
