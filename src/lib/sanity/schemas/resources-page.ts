import { defineType, defineField } from "sanity";

export default defineType({
  name: "resourcesPage",
  title: "Resources Page",
  type: "document",
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
      description: "Small label above the main headline.",
      initialValue: "Resources",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      description: "Main headline for the resources hub.",
      validation: (Rule) => Rule.required(),
      initialValue: "Content hub",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 3,
      description: "Short description under the hero title.",
      initialValue:
        "Search, filter, and explore everything in one place, from strategic insights and measurable success stories to practical templates and tools.",
    }),
    defineField({
      name: "heroFlipWords",
      title: "Hero Flip Words",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Words that rotate/animate after the main title (e.g. 'growth insights', 'client success stories').",
      initialValue: [
        "growth insights",
        "client success stories",
        "resources & tools",
      ],
    }),
    defineField({
      name: "bucketOptions",
      title: "Main View Options",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "key",
              title: "Key",
              type: "string",
              description:
                "Internal key used in the app (e.g. 'All', 'insights', 'success-stories', 'resources').",
            },
            {
              name: "label",
              title: "Label",
              type: "string",
              description: "Visible label in the 'View' dropdown (e.g. 'All content').",
            },
            {
              name: "description",
              title: "Description",
              type: "string",
              description: "Short helper text shown under the dropdown label.",
            },
            {
              name: "iconKey",
              title: "Icon Key",
              type: "string",
              description:
                "Name of an icon that the frontend knows how to map (e.g. 'sparkles', 'lightbulb', 'trophy', 'wrench').",
            },
            {
              name: "enabled",
              title: "Enabled",
              type: "boolean",
              initialValue: true,
            },
          ],
        },
      ],
      description: "Controls the main 'View' dropdown options on the resources page.",
      initialValue: [
        {
          key: "All",
          label: "All content",
          description: "Everything in one view",
          iconKey: "sparkles",
          enabled: true,
        },
        {
          key: "insights",
          label: "Insights",
          description: "Articles, guides, reports",
          iconKey: "lightbulb",
          enabled: true,
        },
        {
          key: "success-stories",
          label: "Success stories",
          description: "Client wins and results",
          iconKey: "trophy",
          enabled: true,
        },
        {
          key: "resources",
          label: "Resources & tools",
          description: "Templates, webinars, tools",
          iconKey: "wrench",
          enabled: true,
        },
      ],
    }),
    defineField({
      name: "topics",
      title: "Filter Topics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "id",
              title: "ID",
              type: "string",
              description:
                "Stable ID used in URLs (e.g. 'financial-foundations').",
            },
            {
              name: "label",
              title: "Label",
              type: "string",
              description: "Filter label shown as a pill under the dropdown.",
            },
            {
              name: "bucket",
              title: "Bucket",
              type: "string",
              description: "Which content bucket this topic belongs to (matches the 'View' dropdown).",
              options: {
                list: [
                  { title: "Insights", value: "insights" },
                  { title: "Success stories", value: "success-stories" },
                  { title: "Resources & tools", value: "resources" },
                ],
              },
            },
            {
              name: "categories",
              title: "Categories",
              type: "array",
              of: [{ type: "string" }],
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
              description: "Which resource categories this topic should include.",
            },
            {
              name: "types",
              title: "Resource Types",
              type: "array",
              of: [{ type: "string" }],
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
              description: "Optional: restrict this topic to specific resource types (leave empty to include all types in the selected categories).",
            },
          ],
        },
      ],
      description:
        "Controls the filters shown under the dropdown. Each topic can map to one or more categories and specific resource types.",
      initialValue: [
        { id: "financial-foundations", label: "Financial foundations", bucket: "insights", categories: ["Budgeting & Finance", "Savings & Investing"] },
        { id: "digital-experiences", label: "Digital experiences", bucket: "insights", categories: ["Payments & Digital Wallets", "App Updates"] },
        { id: "growth-strategy", label: "Growth strategy", bucket: "insights", categories: ["Marketing Strategy"] },
        { id: "market-intelligence", label: "Market intelligence", bucket: "insights", categories: ["Industry Reports"] },
        { id: "leadership-perspectives", label: "Leadership perspectives", bucket: "insights", categories: ["Industry Reports", "Marketing Strategy"] },
        { id: "launches-rebrands", label: "Launches & rebrands", bucket: "success-stories", categories: ["Marketing Strategy"] },
        { id: "acquisition-growth", label: "Acquisition & growth", bucket: "success-stories", categories: ["Marketing Strategy"] },
        { id: "retention-engagement", label: "Retention & engagement", bucket: "success-stories", categories: ["Marketing Strategy"] },
        { id: "product-adoption", label: "Product adoption", bucket: "success-stories", categories: ["App Updates", "Payments & Digital Wallets"] },
        { id: "playbooks-frameworks", label: "Playbooks & frameworks", bucket: "resources", categories: ["Marketing Strategy", "Budgeting & Finance"] },
        { id: "ebooks", label: "Ebooks", bucket: "resources", categories: ["Marketing Strategy", "Industry Reports"], types: ["Ebook"] },
        { id: "templates-checklists", label: "Templates & checklists", bucket: "resources", categories: ["Marketing Strategy", "Budgeting & Finance"] },
        { id: "webinars-training", label: "Webinars & training", bucket: "resources", categories: ["Industry Reports", "App Updates"] },
        { id: "tools-calculators", label: "Tools & calculators", bucket: "resources", categories: ["Savings & Investing", "Payments & Digital Wallets"] },
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
          description: "Browser tab title and default title for search results on the Resources hub.",
        },
        {
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          description: "Short description used by search engines and link previews for the Resources page.",
        },
        {
          name: "ogImage",
          title: "OG Image",
          type: "image",
          description: "Social sharing image for the Resources page (shown on platforms like LinkedIn).",
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Resources Page",
      };
    },
  },
});
