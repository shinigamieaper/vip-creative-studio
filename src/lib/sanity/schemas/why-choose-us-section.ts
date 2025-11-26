import { defineType, defineField } from "sanity";

export default defineType({
  name: "whyChooseUsSection",
  title: "Why Choose Us Section",
  type: "document",
  initialValue: {
    title:
      "Why VIP Creative Studio is the right choice for growth-focused financial institutions",
    subtitle: "",
    items: [
      {
        eyebrow: "",
        title: "Strategic Vision",
        description:
          "We don't just execute tasks; we align every creative decision with your long-term business goals for sustainable growth.",
        iconKey: "strategy",
      },
      {
        eyebrow: "",
        title: "Data-Driven Insights",
        description:
          "Our approach combines creativity with rigorous analytics, ensuring your campaigns perform as good as they look.",
        iconKey: "data",
      },
      {
        eyebrow: "",
        title: "Comprehensive Capabilities",
        description:
          "From brand identity and high-end production to performance marketing and automation—we cover the entire digital ecosystem under one roof.",
        iconKey: "capabilities",
      },
    ],
    highlightCard: {
      eyebrow: "",
      title: "Flexible Partnership Models",
      body:
        "Whether you need an embedded team or focused project execution, we adapt to your rhythm. Get senior-level expertise without the agency bloat.",
      statLabel: "",
      statValue: "",
      ctaLabel: "Book a Discovery Call",
      ctaHref: "/contact",
    },
  },
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Main heading for the Why Choose Us section.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 3,
      description: "Short supporting copy explaining why clients choose you.",
    }),
    defineField({
      name: "items",
      title: "Feature Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "eyebrow",
              title: "Eyebrow",
              type: "string",
              description: "Small label above the feature title.",
            },
            {
              name: "title",
              title: "Title",
              type: "string",
              description: "Short, benefit-focused title for this feature.",
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              description: "1–3 sentences describing this advantage.",
            },
            {
              name: "iconKey",
              title: "Icon Key",
              type: "string",
              description:
                "Optional key used in the frontend to pick an icon (e.g. 'strategy', 'data', 'creative').",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "highlightCard",
      title: "Highlight Card",
      type: "object",
      fields: [
        {
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          description: "Small label above the highlight card title.",
        },
        {
          name: "title",
          title: "Title",
          type: "string",
          description: "Main headline inside the highlight card.",
        },
        {
          name: "body",
          title: "Body",
          type: "text",
          description: "Short paragraph summarizing the key benefit.",
        },
        {
          name: "statLabel",
          title: "Stat Label",
          type: "string",
          description: "Label describing the stat (e.g. 'Average ROAS').",
        },
        {
          name: "statValue",
          title: "Stat Value",
          type: "string",
          description: "The actual stat displayed (e.g. '320%').",
        },
        {
          name: "ctaLabel",
          title: "CTA Label",
          type: "string",
          description: "Button text for the call-to-action inside this card.",
        },
        {
          name: "ctaHref",
          title: "CTA URL",
          type: "string",
          description: "Internal path or full URL the CTA should link to.",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
    },
  },
});
