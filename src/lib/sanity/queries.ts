import { groq } from "next-sanity";

// ============================================================================
// SERVICE QUERIES
// ============================================================================

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    subtitle,
    description,
    icon,
    heroFlipWords,
    approach {
      description,
      outcomes[] {
        title,
        description,
        icon
      }
    },
    process {
      steps[] {
        title,
        description,
        features
      }
    }
  }
`;

export const partnershipPhilosophyQuery = groq`
  *[_type == "partnershipPhilosophy"][0] {
    title,
    subtitle,
    items[] {
      title,
      description,
      iconKey
    }
  }
`;

export const kpiHighlightsQuery = groq`
  *[_type == "kpiHighlights"][0] {
    metrics[] {
      value,
      suffix,
      prefix,
      label,
      description,
      iconKey
    }
  }
`;

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    subtitle,
    description,
    icon,
    heroFlipWords,
    approach {
      description,
      outcomes[] {
        title,
        description,
        icon
      }
    },
    process {
      steps[] {
        title,
        description,
        features
      }
    },
    faqs[] {
      id,
      question,
      answer
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

export const resourcesPageQuery = groq`
  *[_type == "resourcesPage"][0] {
    heroEyebrow,
    heroTitle,
    heroSubtitle,
    heroFlipWords,
    bucketOptions[] {
      key,
      label,
      description,
      iconKey,
      enabled
    },
    topics[] {
      id,
      label,
      bucket,
      categories,
      types
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

export const serviceSlugsQuery = groq`
  *[_type == "service"] { "slug": slug.current }
`;

// ============================================================================
// RESOURCE QUERIES
// ============================================================================

export const resourcesQuery = groq`
  *[_type == "resource"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "coverImage": coverImage.asset->url,
    "galleryImages": galleryImages[].asset->url,
    category,
    type,
    tags,
    author-> {
      name,
      role,
      "avatar": avatar.asset->url
    },
    publishedAt,
    readTime,
    featured,
    keyPoints,
    webinar {
      date,
      time,
      duration,
      registrationUrl,
      recordingUrl,
      isLive,
      speakers[] {
        name,
        role,
        "avatar": avatar.asset->url
      }
    },
    downloadable {
      format,
      fileSize,
      downloadUrl
    }
  }
`;

export const featuredResourcesQuery = groq`
  *[_type == "resource" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "coverImage": coverImage.asset->url,
    category,
    type,
    tags,
    author-> {
      name,
      role,
      "avatar": avatar.asset->url
    },
    publishedAt,
    readTime,
    keyPoints,
    webinar {
      date,
      time,
      duration,
      isLive
    },
    downloadable {
      format
    }
  }
`;

export const latestInsightsResourcesQuery = groq`
  *[_type == "resource" && type in ["Article", "Guide", "Report"]] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "coverImage": coverImage.asset->url,
    category,
    type,
    tags,
    author-> {
      name,
      role,
      "avatar": avatar.asset->url
    },
    publishedAt,
    readTime,
    featured,
    keyPoints
  }
`;

export const relatedResourcesQuery = groq`
  *[_type == "resource" && slug.current != $slug && (
    ($group == "insights" && type in ["Article", "Guide", "Report"]) ||
    ($group == "success-stories" && type == "Case Study") ||
    ($group == "resources" && type in ["Webinar", "Template", "Tool", "Ebook"] && category == $category)
  )] | order(publishedAt desc)[0...6] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "coverImage": coverImage.asset->url,
    category,
    type,
    tags,
    author-> {
      name,
      role,
      "avatar": avatar.asset->url
    },
    publishedAt,
    readTime,
    featured
  }
`;

export const resourceBySlugQuery = groq`
  *[_type == "resource" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "coverImage": coverImage.asset->url,
    "galleryImages": galleryImages[].asset->url,
    category,
    type,
    tags,
    author-> {
      name,
      role,
      "avatar": avatar.asset->url,
      bio
    },
    publishedAt,
    readTime,
    keyPoints,
    tableOfContents[] {
      id,
      title,
      level
    },
    webinar {
      date,
      time,
      duration,
      registrationUrl,
      recordingUrl,
      isLive,
      speakers[] {
        name,
        role,
        "avatar": avatar.asset->url
      }
    },
    downloadable {
      format,
      fileSize,
      downloadUrl,
      file,
      "previewImages": previewImages[].asset->url,
      features
    },
    client {
      name,
      industry,
      "logo": logo.asset->url,
      description,
      contactName,
      contactRole,
      "contactAvatar": contactAvatar.asset->url
    },
    resultsMetrics[] {
      label,
      value,
      unit,
      description
    },
    challengeSection {
      eyebrow,
      title,
      summary,
      painPoints
    },
    solutionSection {
      eyebrow,
      title,
      summary,
      phases[] {
        title,
        description
      }
    },
    resultsSection {
      eyebrow,
      title,
      summary,
      outcomes
    },
    testimonial {
      quote,
      attributionName,
      attributionRole
    },
    content,
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

export const resourceSlugsQuery = groq`
  *[_type == "resource"] { "slug": slug.current, publishedAt }
`;

export const legalPageByKeyQuery = groq`
  *[_type == "legalPage" && key == $key][0] {
    key,
    title,
    lastUpdated,
    intro,
    body,
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

// ============================================================================
// TESTIMONIAL QUERIES
// ============================================================================

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc) {
    _id,
    quote,
    author,
    role,
    company,
    avatar,
    featured,
    ctaLabel,
    ctaHref
  }
`;

export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && featured == true] | order(order asc) {
    _id,
    quote,
    author,
    role,
    company,
    avatar,
    ctaLabel,
    ctaHref
  }
`;

// ============================================================================
// TEAM MEMBER QUERIES
// ============================================================================

export const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    bio,
    photo,
    email,
    phone,
    linkedin,
    order
  }
`;

// ============================================================================
// SITE SETTINGS QUERIES
// ============================================================================

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    siteDescription,
    contactEmail,
    contactPhone,
    address,
    socialLinks {
      twitter,
      linkedin,
      instagram,
      facebook,
      youtube
    },
    footer {
      linkGroups[] {
        title,
        links[] {
          label,
          href
        }
      },
      socialIcons[] {
        platform,
        label,
        url
      },
      bottomText
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

// ============================================================================
// AUTHOR QUERIES
// ============================================================================

export const authorsQuery = groq`
  *[_type == "author"] | order(name asc) {
    _id,
    name,
    role,
    avatar,
    bio
  }
`;

// ============================================================================
// PAGE & SECTION QUERIES
// ============================================================================

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    heroEyebrow,
    heroTitle,
    heroFlipWords,
    heroSubtitle,
    primaryCta,
    secondaryCta,
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    heroEyebrow,
    heroTitle,
    heroSubtitle,
    primaryCta,
    secondaryCta,
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

export const servicesPageQuery = groq`
  *[_type == "servicesPage"][0] {
    heroEyebrow,
    heroTitle,
    heroSubtitle,
    primaryCta,
    secondaryCta,
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

export const whyChooseUsSectionQuery = groq`
  *[_type == "whyChooseUsSection"][0] {
    title,
    subtitle,
    items[] {
      eyebrow,
      title,
      description,
      iconKey
    },
    highlightCard {
      eyebrow,
      title,
      body,
      statLabel,
      statValue,
      ctaLabel,
      ctaHref
    }
  }
`;

export const globalProcessQuery = groq`
  *[_type == "globalProcess"][0] {
    title,
    subtitle,
    steps[] {
      title,
      description,
      duration
    }
  }
`;

export const faqGroupByKeyQuery = groq`
  *[_type == "faqGroup" && key == $key][0] {
    key,
    title,
    subtitle,
    items[] {
      id,
      question,
      answer
    }
  }
`;

export const faqGroupsQuery = groq`
  *[_type == "faqGroup"] | order(title asc) {
    key,
    title,
    subtitle,
    items[] {
      id,
      question,
      answer
    }
  }
`;
