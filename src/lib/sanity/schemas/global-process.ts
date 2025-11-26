import { defineType, defineField } from "sanity";

export default defineType({
  name: "globalProcess",
  title: "Global Process",
  type: "document",
  initialValue: {
    title: "Our Process in 4 Steps",
    subtitle: "A proven approach to transform your marketing strategy",
    steps: [
      {
        title: "Discovery",
        description:
          "Deep dive into your brand, market position, and growth objectives. We analyze competitors, identify opportunities, and define success metrics.",
        duration: "1–2 weeks",
      },
      {
        title: "Strategy",
        description:
          "Craft a tailored roadmap combining creative vision with data-driven insights. Every tactic aligns with your business goals and budget.",
        duration: "2–3 weeks",
      },
      {
        title: "Execution",
        description:
          "Launch campaigns with precision and agility. Our fractional experts integrate seamlessly with your team for maximum impact.",
        duration: "Ongoing",
      },
      {
        title: "Optimization",
        description:
          "Continuously refine based on real-time data. A/B test, iterate, and scale what works to maximize ROI and minimize waste.",
        duration: "Ongoing",
      },
    ],
  },
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Main heading for the global process section.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 3,
      description: "Short explanation of how your process works overall.",
    }),
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
              name: "duration",
              title: "Approximate Duration",
              type: "string",
              description: "e.g. '2–3 weeks', 'Ongoing', etc.",
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
