import { defineType, defineField } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Name of this service. Shown on the services page and service detail hero.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL path segment for this service. Auto-generated from the title but can be adjusted.",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 2,
      description: "Short supporting line that appears under the service title.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Longer overview describing what this service includes and who it is for.",
    }),
    defineField({
      name: "icon",
      title: "Icon Name",
      type: "string",
      description: "Lucide icon name (e.g., 'Brush', 'Search', 'Rocket')",
    }),
    defineField({
      name: "heroFlipWords",
      title: "Hero Flip Words",
      type: "array",
      of: [{ type: "string" }],
      description: "Rotating words for the service hero section",
    }),
    defineField({
      name: "approach",
      title: "Approach",
      type: "object",
      fields: [
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
          description: "Narrative description of your overall approach for this service.",
        }),
        defineField({
          name: "outcomes",
          title: "Outcomes",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "title",
                  title: "Title",
                  type: "string",
                  description: "Short outcome label (e.g. 'Higher ROAS').",
                },
                {
                  name: "description",
                  title: "Description",
                  type: "text",
                  description: "1–3 sentences explaining this outcome in plain language.",
                },
                {
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  options: {
                    list: [
                      { title: "Chart", value: "chart" },
                      { title: "Users", value: "users" },
                      { title: "Shield", value: "shield" },
                      { title: "Layers", value: "layers" },
                    ],
                  },
                },
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "process",
      title: "Process",
      type: "object",
      fields: [
        defineField({
          name: "steps",
          title: "Steps",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "title",
                  title: "Title",
                  type: "string",
                  description: "Step name (e.g. 'Discovery', 'Strategy', 'Execution').",
                },
                {
                  name: "description",
                  title: "Description",
                  type: "text",
                  description: "Brief explanation of what happens in this step.",
                },
                {
                  name: "features",
                  title: "Features",
                  type: "array",
                  of: [{ type: "string" }],
                  description: "Bullet list of specific activities or deliverables in this step.",
                },
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "faqs",
      title: "Service FAQs",
      type: "array",
      description: "Questions specific to this service, shown on the service detail page.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "id",
              title: "ID (optional)",
              type: "string",
              description: "Stable identifier for this FAQ; if left empty it will be auto-generated.",
            },
            {
              name: "question",
              title: "Question",
              type: "string",
              description: "The FAQ question as it should appear on the site.",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 3,
              description: "Clear, helpful answer to the question.",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
      description: "Controls the ordering of services in lists (lower numbers appear first).",
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
          description: "Social sharing image for this service (shown on platforms like LinkedIn).",
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
