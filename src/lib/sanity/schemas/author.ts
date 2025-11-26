import { defineType, defineField } from "sanity";

export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Full name of the author.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL path segment for this author profile. Auto-generated from the name but can be adjusted.",
      options: {
        source: "name",
        maxLength: 96,
      },
    }),
    defineField({
      name: "role",
      title: "Role / Title",
      type: "string",
      description: "Their role or title as it should appear on author bylines.",
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Headshot image shown in author cards and bylines.",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
      description: "Short author biography used on profiles and resource pages.",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "avatar",
    },
  },
});
