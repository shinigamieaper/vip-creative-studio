import { defineType, defineField } from "sanity";

export default defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Brief summary for cards and previews",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "object",
      fields: [
        { name: "name", title: "Name", type: "string" },
        { name: "industry", title: "Industry", type: "string" },
        {
          name: "logo",
          title: "Logo",
          type: "image",
          options: { hotspot: true },
        },
        { name: "description", title: "Description", type: "text" },
      ],
    }),
    defineField({
      name: "challenge",
      title: "The Challenge",
      type: "blockContent",
    }),
    defineField({
      name: "solution",
      title: "The Solution",
      type: "blockContent",
    }),
    defineField({
      name: "results",
      title: "Results",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "metric", title: "Metric", type: "string" },
            { name: "value", title: "Value", type: "string" },
            { name: "description", title: "Description", type: "string" },
          ],
          preview: {
            select: {
              title: "metric",
              subtitle: "value",
            },
          },
        },
      ],
    }),
    defineField({
      name: "testimonial",
      title: "Client Testimonial",
      type: "object",
      fields: [
        { name: "quote", title: "Quote", type: "text" },
        { name: "author", title: "Author", type: "string" },
        { name: "role", title: "Role", type: "string" },
      ],
    }),
    defineField({
      name: "services",
      title: "Related Services",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
    defineField({
      name: "content",
      title: "Full Content",
      type: "blockContent",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        { name: "metaTitle", title: "Meta Title", type: "string" },
        { name: "metaDescription", title: "Meta Description", type: "text" },
        { name: "ogImage", title: "OG Image", type: "image" },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      client: "client.name",
      media: "coverImage",
    },
    prepare({ title, client, media }) {
      return {
        title,
        subtitle: client ? `Client: ${client}` : "",
        media,
      };
    },
  },
});
