import { defineType, defineField } from "sanity";

export default defineType({
  name: "faqGroup",
  title: "FAQ Group",
  type: "document",
  initialValue: {
    key: "",
    title: "Frequently Asked Questions",
    subtitle:
      "Everything you need to know about partnering with VIP Creative Studio",
    items: [
      {
        id: "scope",
        question: "What exactly does a fractional partnership include?",
        answer:
          "Our fractional partnerships provide senior-level expertise without the full-time commitment. You get access to our entire team of specialists—from creative directors to data analysts—who integrate seamlessly with your existing team. Services typically include strategy development, campaign execution, performance analytics, and ongoing optimization, all tailored to your specific needs and budget.",
      },
      {
        id: "availability",
        question: "How quickly can you start working with us?",
        answer:
          "We can typically begin within 5-7 business days of signing. Our onboarding process is streamlined: Day 1-2 for discovery calls and access setup, Day 3-4 for initial audit and strategy outline, and by Day 5 we're ready to execute. For urgent projects, we offer expedited onboarding within 48 hours.",
      },
      {
        id: "commitment",
        question: "What's the minimum commitment required?",
        answer:
          "We offer flexible engagement models starting from 3-month partnerships. This gives us enough time to implement strategies, measure impact, and optimize for results. Many partners choose quarterly renewals, though we also offer month-to-month arrangements after the initial period for maximum flexibility.",
      },
      {
        id: "results",
        question: "How do you measure and report on performance?",
        answer:
          "Transparency is core to our approach. You'll receive weekly performance snapshots, detailed monthly reports with actionable insights, and quarterly business reviews. We track both leading indicators (engagement, reach) and lagging metrics (conversions, ROI), with real-time dashboards accessible 24/7.",
      },
      {
        id: "industries",
        question: "Do you specialize in specific industries?",
        answer:
          "While we have deep expertise in financial services, healthcare, and B2B SaaS, our frameworks adapt across industries. Our fractional model means we can assemble the right team for your specific sector, bringing both fresh perspectives and relevant experience to drive results.",
      },
      {
        id: "handoff",
        question: "What happens when our partnership ends?",
        answer:
          "We ensure smooth transitions with complete knowledge transfer. You'll receive all creative assets, campaign templates, documented strategies, and access credentials. We also offer a 30-day post-engagement support period to answer questions and ensure your team can maintain momentum independently.",
      },
    ],
  },
  fields: [
    defineField({
      name: "key",
      title: "Group Key",
      type: "string",
      description:
        "Identifier used in code to select this FAQ group (e.g. 'about', 'services', 'partnership').",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Heading shown above this FAQ group.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 3,
      description: "Optional short description shown under the FAQ heading.",
    }),
    defineField({
      name: "items",
      title: "FAQ Items",
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
                "Stable ID used in the frontend (e.g. 'engagement-length'). If empty, one can be generated from the question.",
            },
            {
              name: "question",
              title: "Question",
              type: "string",
              description: "FAQ question text shown in the accordion header.",
            },
            {
              name: "answer",
              title: "Answer",
              type: "text",
              description: "Answer text shown when the accordion item is expanded.",
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "key",
    },
  },
});
