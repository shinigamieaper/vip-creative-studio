import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/lib/sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "vip-creative-studio",
  title: "VIP Creative Studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Pages")
              .child(
                S.list()
                  .title("Pages")
                  .items([
                    S.listItem()
                      .title("Home")
                      .child(
                        S.document()
                          .schemaType("homePage")
                          .documentId("homePage")
                      ),
                    S.listItem()
                      .title("About")
                      .child(
                        S.document()
                          .schemaType("aboutPage")
                          .documentId("aboutPage")
                      ),
                    S.listItem()
                      .title("Services")
                      .child(
                        S.document()
                          .schemaType("servicesPage")
                          .documentId("servicesPage")
                      ),
                    S.listItem()
                      .title("Resources")
                      .child(
                        S.document()
                          .schemaType("resourcesPage")
                          .documentId("resourcesPage")
                      ),
                  ])
              ),
            S.divider(),
            S.listItem()
              .title("Legal Pages")
              .child(
                S.documentTypeList("legalPage").title("Legal Pages")
              ),
            S.listItem()
              .title("Services")
              .child(
                S.documentTypeList("service").title("Services")
              ),
            S.listItem()
              .title("Resources")
              .child(
                S.documentTypeList("resource").title("Resources")
              ),
            S.divider(),
            S.listItem()
              .title("Testimonials")
              .child(
                S.documentTypeList("testimonial").title("Testimonials")
              ),
            S.listItem()
              .title("Team Members")
              .child(
                S.documentTypeList("teamMember").title("Team Members")
              ),
            S.listItem()
              .title("Authors")
              .child(
                S.documentTypeList("author").title("Authors")
              ),
            S.divider(),
            S.listItem()
              .title("Sections")
              .child(
                S.list()
                  .title("Sections")
                  .items([
                    S.listItem()
                      .title("Why Choose Us")
                      .child(
                        S.document()
                          .schemaType("whyChooseUsSection")
                          .documentId("whyChooseUsSection")
                      ),
                    S.listItem()
                      .title("Global Process")
                      .child(
                        S.document()
                          .schemaType("globalProcess")
                          .documentId("globalProcess")
                      ),
                    S.listItem()
                      .title("FAQ Groups")
                      .child(
                        S.documentTypeList("faqGroup").title("FAQ Groups")
                      ),
                  ])
              ),
            S.divider(),
            S.listItem()
              .title("Site Settings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
          ]),
    }),
    visionTool({ defaultApiVersion: "2024-01-01" }),
  ],
  schema: {
    types: schemaTypes,
  },
});
