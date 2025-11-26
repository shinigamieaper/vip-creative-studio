import service from "./service";
import resource from "./resource";
import testimonial from "./testimonial";
import teamMember from "./team-member";
import author from "./author";
import siteSettings from "./site-settings";
import blockContent from "./block-content";
import homePage from "./home-page";
import aboutPage from "./about-page";
import servicesPage from "./services-page";
import resourcesPage from "./resources-page";
import whyChooseUsSection from "./why-choose-us-section";
import globalProcess from "./global-process";
import faqGroup from "./faq-group";
import partnershipPhilosophy from "./partnership-philosophy";
import kpiHighlights from "./kpi-highlights";

export const schemaTypes = [
  // Document types
  service,
  resource,
  testimonial,
  teamMember,
  author,
  siteSettings,
  homePage,
  aboutPage,
  servicesPage,
  resourcesPage,
  whyChooseUsSection,
  globalProcess,
  faqGroup,
  partnershipPhilosophy,
  kpiHighlights,
  // Object types
  blockContent,
];
