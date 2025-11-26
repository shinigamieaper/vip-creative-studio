import { defineType, defineField } from "sanity";

export default defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Full name of the team member.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Title",
      type: "string",
      description: "Their primary role or title (e.g. 'Founder & Creative Director').",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
      description: "Short biography focusing on experience and strengths.",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Portrait photo used in team sections.",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      description: "Optional contact email for this team member.",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      description: "Optional contact phone number.",
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn URL",
      type: "url",
      description: "Link to their LinkedIn profile.",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
      description: "Controls ordering when listing team members (lower numbers appear first).",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "photo",
    },
  },
});
