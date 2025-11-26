import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      initialValue: "VIP Creative Studio",
      description: "Brand name used in meta tags and global UI.",
    }),
    defineField({
      name: "siteDescription",
      title: "Site Description",
      type: "text",
      rows: 3,
      description: "Default description used in some layouts if a page does not override it.",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      description: "Primary contact email shown in global contact areas.",
    }),
    defineField({
      name: "contactPhone",
      title: "Contact Phone",
      type: "string",
      description: "Primary contact phone number.",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 3,
      description: "Mailing or office address shown in the footer/contact sections.",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        {
          name: "twitter",
          title: "Twitter",
          type: "url",
          description: "Link to your Twitter/X profile.",
        },
        {
          name: "linkedin",
          title: "LinkedIn",
          type: "url",
          description: "Link to your main LinkedIn company page.",
        },
        {
          name: "instagram",
          title: "Instagram",
          type: "url",
          description: "Link to your Instagram profile.",
        },
        {
          name: "facebook",
          title: "Facebook",
          type: "url",
          description: "Link to your Facebook page.",
        },
        {
          name: "youtube",
          title: "YouTube",
          type: "url",
          description: "Link to your YouTube channel.",
        },
      ],
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      description: "Content and links used in the global site footer.",
      initialValue: {
        linkGroups: [
          {
            title: "Explore",
            links: [
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
              { label: "Content hub", href: "/resources" },
              { label: "Our Partnership Model", href: "/our-partnership-model" },
              { label: "Contact", href: "/contact" },
            ],
          },
          {
            title: "Fine Print",
            links: [
              { label: "Terms & Conditions", href: "/terms-of-service" },
              { label: "Privacy Notice", href: "/privacy-policy" },
              { label: "Cookie Policy", href: "/cookie-policy" },
              { label: "Accessibility Statement", href: "/accessibility" },
            ],
          },
        ],
        socialIcons: [
          {
            platform: "linkedin",
            label: "Visit VIP Creative Studio on LinkedIn",
            url: "https://linkedin.com",
          },
          {
            platform: "twitter",
            label: "Visit VIP Creative Studio on Twitter",
            url: "https://twitter.com",
          },
          {
            platform: "instagram",
            label: "Visit VIP Creative Studio on Instagram",
            url: "https://instagram.com",
          },
        ],
        bottomText:
          "\u00A9 2025 VIP Creative Studio \u00A0 Crafting exceptional brand experiences for financial services",
      },
      fields: [
        defineField({
          name: "linkGroups",
          title: "Link Groups",
          type: "array",
          description: "Groups of links shown in footer columns (e.g. Company, Services, Resources).",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "title",
                  title: "Group Title",
                  type: "string",
                  description: "Heading for this column of links (e.g. 'Company').",
                },
                {
                  name: "links",
                  title: "Links",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      fields: [
                        {
                          name: "label",
                          title: "Label",
                          type: "string",
                          description: "Link text shown in the footer.",
                        },
                        {
                          name: "href",
                          title: "URL",
                          type: "string",
                          description: "Internal path or full URL this link should go to.",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        }),
        defineField({
          name: "socialIcons",
          title: "Footer Social Icons",
          type: "array",
          description:
            "Social links specifically for the footer. The platform/icon key tells the frontend which icon to render.",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "platform",
                  title: "Platform Key",
                  type: "string",
                  description:
                    "Key used by the frontend to choose an icon (e.g. 'twitter', 'linkedin', 'instagram', 'youtube').",
                },
                {
                  name: "label",
                  title: "Accessible Label",
                  type: "string",
                  description: "Screen-reader label for this icon (e.g. 'Visit our LinkedIn').",
                },
                {
                  name: "url",
                  title: "URL",
                  type: "url",
                  description: "Destination URL for this social icon.",
                },
              ],
            },
          ],
        }),
        defineField({
          name: "bottomText",
          title: "Bottom Bar Text",
          type: "string",
          description: "Optional text for the very bottom of the footer (e.g. copyright).",
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "Default SEO",
      type: "object",
      fields: [
        {
          name: "metaTitle",
          title: "Default Meta Title",
          type: "string",
          description: "Fallback meta title used when a page does not define its own.",
        },
        {
          name: "metaDescription",
          title: "Default Meta Description",
          type: "text",
          description: "Fallback meta description used when a page does not define its own.",
        },
        {
          name: "ogImage",
          title: "Default OG Image",
          type: "image",
          options: { hotspot: true },
          description: "Default social sharing image used when a page does not define its own.",
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
});
