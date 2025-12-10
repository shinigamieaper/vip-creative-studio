import { defineType, defineField } from "sanity";

export default defineType({
  name: "legalPage",
  title: "Legal Page",
  type: "document",
  fields: [
    defineField({
      name: "key",
      title: "Key",
      type: "string",
      description:
        "Internal key used to map this legal page to a specific route (e.g. 'privacy-policy').",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Privacy Policy", value: "privacy-policy" },
          { title: "Terms of Service", value: "terms-of-service" },
          { title: "Cookie Policy", value: "cookie-policy" },
          { title: "Accessibility", value: "accessibility" },
        ],
      },
    }),
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      description: "Main heading shown at the top of the page.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lastUpdated",
      title: "Last Updated",
      type: "date",
      description: "Date shown under the title.",
    }),
    defineField({
      name: "intro",
      title: "Intro Paragraph",
      type: "text",
      rows: 4,
      description:
        "Optional short introduction shown before the main legal content.",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      description: "Main legal content for this page.",
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
          description:
            "Browser tab title and default title for search results for this page.",
        },
        {
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          description:
            "Short description used by search engines and link previews.",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      key: "key",
    },
    prepare({ title, key }) {
      return {
        title: title || "Legal Page",
        subtitle: key,
      };
    },
  },
});
