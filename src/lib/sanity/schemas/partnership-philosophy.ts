import { defineType, defineField } from "sanity";

export default defineType({
  name: "partnershipPhilosophy",
  title: "Partnership Philosophy",
  type: "document",
  initialValue: {
    title: "Our Partnership Philosophy",
    subtitle: "The creative minds and strategic thinkers behind your success",
    items: [
      {
        title: "Collaboration",
        description:
          "We believe in working closely with our clients, fostering open communication and mutual respect throughout the partnership.",
        iconKey: "collaboration",
      },
      {
        title: "Client-Centric Approach",
        description:
          "Your success is our priority. We tailor our strategies to meet your specific goals and challenges, ensuring a personalized experience.",
        iconKey: "client-centric",
      },
      {
        title: "Results-Driven",
        description:
          "We're committed to delivering measurable results. Our data-driven approach ensures that every campaign contributes to your bottom line.",
        iconKey: "results",
      },
    ],
  },
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Main heading for the Partnership Philosophy section.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 3,
      description: "Short supporting copy shown under the heading.",
    }),
    defineField({
      name: "items",
      title: "Philosophy Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
              description: "Short principle title (e.g. 'Collaboration').",
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              description: "1–3 sentences describing this principle.",
            },
            {
              name: "iconKey",
              title: "Icon Key",
              type: "string",
              description:
                "Key used in the frontend to pick an icon (e.g. 'collaboration', 'client-centric', 'results').",
            },
          ],
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
