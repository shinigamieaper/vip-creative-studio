import { defineType, defineArrayMember } from "sanity";

export default defineType({
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Underline", value: "underline" },
          { title: "Strike", value: "strike-through" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ["http", "https", "mailto", "tel"],
                  }),
              },
              {
                name: "blank",
                type: "boolean",
                title: "Open in new tab",
                initialValue: false,
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
          description: "Important for accessibility and SEO",
        },
        {
          name: "caption",
          type: "string",
          title: "Caption",
        },
      ],
    }),
    defineArrayMember({
      name: "callout",
      type: "object",
      title: "Callout",
      fields: [
        {
          name: "type",
          type: "string",
          title: "Type",
          options: {
            list: [
              { title: "Info", value: "info" },
              { title: "Warning", value: "warning" },
              { title: "Success", value: "success" },
              { title: "Tip", value: "tip" },
            ],
          },
        },
        {
          name: "content",
          type: "text",
          title: "Content",
        },
      ],
      preview: {
        select: {
          type: "type",
          content: "content",
        },
        prepare({ type, content }) {
          return {
            title: `${type?.toUpperCase() || "Callout"}`,
            subtitle: content?.slice(0, 50) + "...",
          };
        },
      },
    }),
  ],
});
