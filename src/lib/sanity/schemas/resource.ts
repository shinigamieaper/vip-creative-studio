import { defineType, defineField } from "sanity";

export default defineType({
  name: "resource",
  title: "Resource",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Main title shown on resource cards and the detail page hero.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL path segment for this resource. Auto-generated from the title but can be adjusted.",
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
      description: "Main hero image for this resource. Used on cards and at the top of the detail page.",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image" }],
      description: "Optional image gallery for case studies and downloadable resources.",
      options: {
        layout: "grid",
      },
      hidden: ({ document }) =>
        document?.type !== "Case Study" &&
        document?.type !== "Template" &&
        document?.type !== "Tool" &&
        document?.type !== "Ebook",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "High-level topic for this resource. Used for grouping and filters.",
      options: {
        list: [
          { title: "Budgeting & Finance", value: "Budgeting & Finance" },
          { title: "Savings & Investing", value: "Savings & Investing" },
          { title: "Payments & Digital Wallets", value: "Payments & Digital Wallets" },
          { title: "App Updates", value: "App Updates" },
          { title: "Marketing Strategy", value: "Marketing Strategy" },
          { title: "Industry Reports", value: "Industry Reports" },
        ],
      },
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      description: "Controls which layout this resource uses (insight, case study, webinar, template, etc.).",
      options: {
        list: [
          { title: "Article", value: "Article" },
          { title: "Guide", value: "Guide" },
          { title: "Case Study", value: "Case Study" },
          { title: "Report", value: "Report" },
          { title: "Webinar", value: "Webinar" },
          { title: "Template", value: "Template" },
          { title: "Tool", value: "Tool" },
          { title: "Ebook", value: "Ebook" },
        ],
      },
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      description: "Free-form keywords used for search and tag filters (e.g. 'webinar', 'member-growth').",
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      description: "Person who created this resource. Shown in the header and author card.",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      description: "Publication date shown in the meta row. Can also be used for sorting.",
    }),
    defineField({
      name: "readTime",
      title: "Read Time (minutes)",
      type: "number",
      description: "Approximate minutes to read or consume this resource.",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Mark as featured to surface this resource in hero sliders and highlighted areas.",
      initialValue: false,
    }),
    defineField({
      name: "keyPoints",
      title: "Key Points",
      type: "array",
      of: [{ type: "string" }],
      description: "TL;DR bullet points shown at the top of the resource.",
      hidden: ({ document }) => document?.type === "Case Study",
    }),
    defineField({
      name: "tableOfContents",
      title: "Table of Contents",
      type: "array",
      description: "Optional manual table of contents for long-form content. Each entry links to a section in the article.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "id",
              title: "Anchor ID",
              type: "string",
              description: "ID that matches a heading in the content (e.g. 'results').",
            },
            {
              name: "title",
              title: "Heading",
              type: "string",
              description: "Label shown in the table of contents list.",
            },
            {
              name: "level",
              title: "Level",
              type: "number",
              description: "Use 2 for H2, 3 for H3, etc.",
            },
          ],
        },
      ],
      hidden: ({ document }) =>
        document?.type !== "Article" &&
        document?.type !== "Guide" &&
        document?.type !== "Report" &&
        document?.type !== "Ebook",
    }),
    defineField({
      name: "webinar",
      title: "Webinar Details",
      type: "object",
      fields: [
        { name: "date", title: "Date", type: "string", description: "Display date for the live webinar (e.g. 'Dec 15, 2024')." },
        { name: "time", title: "Time", type: "string", description: "Display time including timezone (e.g. '2:00 PM EST')." },
        {
          name: "duration",
          title: "Duration (minutes)",
          type: "number",
          description: "Length of the session in minutes.",
        },
        {
          name: "registrationUrl",
          title: "Registration URL",
          type: "url",
          description: "Link to the registration page for upcoming webinars.",
        },
        {
          name: "recordingUrl",
          title: "Recording URL",
          type: "url",
          description: "Link to the on-demand recording for past webinars.",
        },
        {
          name: "isLive",
          title: "Is Live Event?",
          type: "boolean",
          initialValue: true,
          description: "If checked, treat this as an upcoming live webinar. If unchecked, treat as on-demand.",
        },
        {
          name: "speakers",
          title: "Speakers",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "name",
                  title: "Name",
                  type: "string",
                  description: "Speaker's full name.",
                },
                {
                  name: "role",
                  title: "Role",
                  type: "string",
                  description: "Speaker's title or role.",
                },
                {
                  name: "avatar",
                  title: "Avatar",
                  type: "image",
                  options: { hotspot: true },
                  description: "Headshot image for this speaker.",
                },
              ],
            },
          ],
        },
      ],
      hidden: ({ document }) => document?.type !== "Webinar",
    }),
    defineField({
      name: "downloadable",
      title: "Downloadable Asset",
      type: "object",
      fields: [
        {
          name: "format",
          title: "Format",
          type: "string",
          description: 'e.g. "PDF", "Excel", "Google Sheets", "Figma"',
        },
        {
          name: "fileSize",
          title: "File Size",
          type: "string",
          description: 'e.g. "2.4 MB"',
        },
        {
          name: "downloadUrl",
          title: "Download URL",
          type: "url",
          description: "Direct download URL if you are not using the file field.",
        },
        {
          name: "file",
          title: "File",
          type: "file",
          options: {
            storeOriginalFilename: true,
          },
          description: "Upload the actual downloadable file here.",
        },
        {
          name: "previewImages",
          title: "Preview Images",
          type: "array",
          of: [{ type: "image" }],
          options: { layout: "grid" },
          description: "Optional preview or sample pages shown next to the download CTA.",
        },
        {
          name: "features",
          title: "Features / What's Included",
          type: "array",
          of: [{ type: "string" }],
          description: "Bullet list of what is included in this asset.",
        },
      ],
      hidden: ({ document }) =>
        document?.type !== "Template" &&
        document?.type !== "Tool" &&
        document?.type !== "Ebook",
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "object",
      fields: [
        {
          name: "name",
          title: "Name",
          type: "string",
          description: "Client or organization name featured in this case study.",
        },
        {
          name: "industry",
          title: "Industry",
          type: "string",
          description: "Client's primary industry (e.g. 'Banking', 'FinTech').",
        },
        {
          name: "logo",
          title: "Logo",
          type: "image",
          description: "Client logo shown in the case study header.",
          options: { hotspot: true },
        },
        {
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
          description: "Short overview of who this client is and who they serve.",
        },
        {
          name: "contactName",
          title: "Primary Contact Name",
          type: "string",
          description: "Name for the person you quote in the testimonial (if different from client name).",
        },
        {
          name: "contactRole",
          title: "Primary Contact Role",
          type: "string",
          description: "Their role or title at the client organization.",
        },
        {
          name: "contactAvatar",
          title: "Primary Contact Avatar",
          type: "image",
          description: "Photo used for the case study testimonial card.",
          options: { hotspot: true },
        },
      ],
      hidden: ({ document }) => document?.type !== "Case Study",
    }),
    defineField({
      name: "resultsMetrics",
      title: "Results Metrics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
              description: "Short label for this metric (e.g. 'Increase in ROAS').",
            },
            {
              name: "value",
              title: "Value",
              type: "number",
              description: "Numeric value for the metric (e.g. 220).",
            },
            {
              name: "unit",
              title: "Unit",
              type: "string",
              description: "Displayed unit (e.g. '%', 'in 6 months').",
            },
            {
              name: "description",
              title: "Description",
              type: "string",
              description: "Optional one-line explanation to add more context.",
            },
          ],
        },
      ],
      hidden: ({ document }) => document?.type !== "Case Study",
    }),
    defineField({
      name: "challengeSection",
      title: "Challenge Section",
      type: "object",
      fields: [
        {
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          description: "Small label above the title (e.g. 'Problem Context').",
        },
        {
          name: "title",
          title: "Title",
          type: "string",
          description: "Main heading (e.g. 'The Challenge').",
        },
        {
          name: "summary",
          title: "Summary",
          type: "text",
          rows: 4,
          description: "Short paragraph describing the overall challenge.",
        },
        {
          name: "painPoints",
          title: "Key Pain Points",
          type: "array",
          of: [{ type: "string" }],
          description: "Bullet list of the main issues the client was facing.",
        },
      ],
      hidden: ({ document }) => document?.type !== "Case Study",
    }),
    defineField({
      name: "solutionSection",
      title: "Solution Section",
      type: "object",
      fields: [
        {
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          description: "Small label above the title (e.g. 'Our Approach').",
        },
        {
          name: "title",
          title: "Title",
          type: "string",
          description: "Main heading (e.g. 'The Solution').",
        },
        {
          name: "summary",
          title: "Summary",
          type: "text",
          rows: 4,
          description: "Short paragraph explaining the solution at a high level.",
        },
        {
          name: "phases",
          title: "Phases",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "title",
                  title: "Title",
                  type: "string",
                  description: "Phase title (e.g. 'Discovery & audit', 'Optimization').",
                },
                {
                  name: "description",
                  title: "Description",
                  type: "text",
                  description: "Brief description of what happened in this phase.",
                },
              ],
            },
          ],
        },
      ],
      hidden: ({ document }) => document?.type !== "Case Study",
    }),
    defineField({
      name: "resultsSection",
      title: "Results Section",
      type: "object",
      fields: [
        {
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          description: "Small label above the title (e.g. 'Measured Impact').",
        },
        {
          name: "title",
          title: "Title",
          type: "string",
          description: "Main heading (e.g. 'The Results').",
        },
        {
          name: "summary",
          title: "Summary",
          type: "text",
          rows: 4,
          description: "Short narrative summarizing the overall impact.",
        },
        {
          name: "outcomes",
          title: "Key Outcomes",
          type: "array",
          of: [{ type: "string" }],
          description: "Bullet list of specific outcomes to highlight.",
        },
      ],
      hidden: ({ document }) => document?.type !== "Case Study",
    }),
    defineField({
      name: "testimonial",
      title: "Case Study Testimonial",
      type: "object",
      fields: [
        {
          name: "quote",
          title: "Quote",
          type: "text",
          rows: 4,
          description: "Client quote to feature in the case study.",
        },
        {
          name: "attributionName",
          title: "Attribution Name",
          type: "string",
          description: "Name of the person being quoted.",
        },
        {
          name: "attributionRole",
          title: "Attribution Role / Title",
          type: "string",
          description: "Their role or title at the client organization.",
        },
      ],
      hidden: ({ document }) => document?.type !== "Case Study",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "blockContent",
      description: "Main body content of the resource, including headings, paragraphs, and rich media.",
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
          description: "Browser tab title and default title for search results for this resource.",
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
          description: "Social sharing image for this resource (shown on platforms like LinkedIn).",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      type: "type",
      media: "coverImage",
    },
    prepare({ title, author, type, media }) {
      return {
        title,
        subtitle: `${type || "Resource"}${author ? ` by ${author}` : ""}`,
        media,
      };
    },
  },
});
