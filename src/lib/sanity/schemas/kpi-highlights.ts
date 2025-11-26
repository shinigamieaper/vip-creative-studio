import { defineType, defineField } from "sanity";

export default defineType({
  name: "kpiHighlights",
  title: "KPI Highlights",
  type: "document",
  initialValue: {
    metrics: [
      {
        value: 250,
        suffix: "+",
        label: "Successful Campaigns",
        description: "Delivered across industries",
        iconKey: "campaigns",
      },
      {
        value: 4.9,
        suffix: "/5",
        label: "Partner Rating",
        description: "Average client satisfaction",
        iconKey: "rating",
      },
      {
        value: 320,
        suffix: "%",
        label: "Avg. ROAS Uplift",
        description: "Return on ad spend increase",
        iconKey: "roas",
      },
      {
        value: 45,
        prefix: "-",
        suffix: "%",
        label: "Reduced CAC",
        description: "Customer acquisition cost",
        iconKey: "cac",
      },
    ],
  },
  fields: [
    defineField({
      name: "metrics",
      title: "Metrics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "value",
              title: "Value",
              type: "number",
              description: "Numeric value for the KPI (e.g. 250, 4.9, 320).",
            },
            {
              name: "suffix",
              title: "Suffix",
              type: "string",
              description: "Optional suffix displayed after the value (e.g. '+', '%', '/5').",
            },
            {
              name: "prefix",
              title: "Prefix",
              type: "string",
              description: "Optional prefix displayed before the value (e.g. '-').",
            },
            {
              name: "label",
              title: "Label",
              type: "string",
              description: "Short label for the metric (e.g. 'Successful Campaigns').",
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
              description: "Short supporting description for this metric.",
            },
            {
              name: "iconKey",
              title: "Icon Key",
              type: "string",
              description:
                "Key used in the frontend to pick an icon (e.g. 'campaigns', 'rating', 'roas', 'cac').",
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "metrics.0.label",
      subtitle: "metrics.0.description",
    },
  },
});
