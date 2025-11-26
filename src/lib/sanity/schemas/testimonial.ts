import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      description: "Full testimonial quote as it should appear on the site.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author Name",
      type: "string",
      description: "Name of the person giving the testimonial.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Title",
      type: "string",
      description: "Their role or job title (e.g. 'CMO, Acme Bank').",
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
      description: "Company they represent in this testimonial.",
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Headshot image shown next to the quote.",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      description: "Show this testimonial on the homepage",
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
      description: "Optional button label (e.g. 'View case study').",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA URL",
      type: "string",
      description: "Optional URL for the testimonial CTA button.",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
      description: "Controls ordering when multiple testimonials are shown (lower numbers appear first).",
    }),
  ],
  preview: {
    select: {
      title: "author",
      subtitle: "company",
      media: "avatar",
    },
  },
});
