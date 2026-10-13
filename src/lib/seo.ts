export const SITE = {
  url: "https://nathanielgarang.com",
  name: "Hon. Nathaniel Garang Aduotdit",
  shortName: "Nathaniel Garang",
  alternateNames: [
    "Nathaniel Garang",
    "Hon. Nathaniel Garang",
    "Nathaniel Garang Aduotdit",
    "Hon. Nathaniel Garang Aduotdit",
  ],
  jobTitle: "Presidential Candidate, Republic of South Sudan",
  party: "Real People's Liberation Movement Forward (R-SPLM/F)",
  partyShort: "R-SPLM/F",
  election: "2026 South Sudan General Elections",
  tagline: "Serving with Honor. Leading with Heart.",
  description:
    "Official campaign website for Hon. Nathaniel Garang Aduotdit  R-SPLM/F candidate for President of South Sudan in the 2026 general elections. Chairman, ordained Anglican priest, International Peace Award Laureate 2025. Serving with Honor. Leading with Heart.",
  keywords: [
    "Nathaniel Garang",
    "Nathaniel Garang Aduotdit",
    "Hon. Nathaniel Garang",
    "Nathaniel Garang South Sudan",
    "R-SPLM/F",
    "Real People's Liberation Movement Forward",
    "South Sudan President 2026",
    "South Sudan elections 2026",
    "People First",
    "South Sudan candidate",
    "South Sudan presidential candidate",
    "Nathaniel Garang biography",
    "R-SPLM/F manifesto",
    "South Sudan political reform",
    "South Sudan 2026 elections",
  ],
  socials: [
    "https://twitter.com/nathanielgarang",
    "https://facebook.com/nathanielgarang",
    "https://instagram.com/nathanielgarang",
    "https://linkedin.com/in/nathanielgarang",
    "https://youtube.com/@nathanielgarang",
    "https://tiktok.com/@nathanielgarang",
  ],
  partyUrl: "",
  locale: "en_US",
  twitterHandle: "@nathanielgarang",
  ogImage: "/images/nathaniel-portrait.jpg",
  ogImageWidth: 1200,
  ogImageHeight: 630,
};

export function absoluteUrl(path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${clean}`;
}

export function generateMetadata({
  title,
  description,
  path,
  images,
  type = "website",
  noIndex = false,
  noFollow = false,
}: {
  title?: string;
  description?: string;
  path: string;
  images?: { url: string; alt: string; width?: number; height?: number }[];
  type?: "website" | "article";
  noIndex?: boolean;
  noFollow?: boolean;
}) {
  const fullTitle = title ? `${title} | ${SITE.name}` : `Hon. Nathaniel Garang Aduotdit | Next President  South Sudan 2026`;
  const fullDescription = description || SITE.description;
  const canonicalUrl = absoluteUrl(path);
  const ogImages = images || [
    {
      url: SITE.ogImage,
      width: SITE.ogImageWidth,
      height: SITE.ogImageHeight,
      alt: `Hon. Nathaniel Garang Aduotdit  R-SPLM/F Candidate for President, South Sudan 2026`,
    },
  ];

  return {
    metadataBase: new URL(SITE.url),
    title: fullTitle,
    description: fullDescription,
    keywords: [...SITE.keywords],
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    publisher: SITE.name,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type,
      locale: SITE.locale,
      url: canonicalUrl,
      siteName: `${SITE.name}  People First`,
      title: fullTitle,
      description: fullDescription,
      images: ogImages.map((img) => ({
        url: img.url.startsWith("http") ? img.url : absoluteUrl(img.url),
        width: img.width,
        height: img.height,
        alt: img.alt,
      })),
    },
    twitter: {
      card: "summary_large_image",
      site: SITE.twitterHandle,
      creator: SITE.twitterHandle,
      title: fullTitle,
      description: fullDescription,
      images: ogImages.map((img) => img.url.startsWith("http") ? img.url : absoluteUrl(img.url)),
    },
    robots: {
      index: !noIndex,
      follow: !noFollow,
      googleBot: {
        index: !noIndex,
        follow: !noFollow,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    category: "politics",
    other: {
      "google-site-verification": "",
    },
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    alternateName: [...SITE.alternateNames],
    jobTitle: SITE.jobTitle,
    description: SITE.description,
    url: SITE.url,
    image: `${SITE.url}${SITE.ogImage}`,
    affiliation: {
      "@type": "Organization",
      name: SITE.party,
      alternateName: SITE.partyShort,
    },
    nationality: {
      "@type": "Country",
      name: "South Sudan",
    },
    knowsAbout: [
      "Governance reform",
      "Peace and reconciliation",
      "Interfaith leadership",
      "South Sudanese politics",
      "Democratic transition",
    ],
    sameAs: SITE.socials,
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.party,
    alternateName: SITE.partyShort,
    url: SITE.url,
    logo: `${SITE.url}/logo-v2.png`,
    description: "R-SPLM/F  Real People's Liberation Movement Forward. People First.",
    sameAs: SITE.socials,
    foundingDate: "2025",
    founder: {
      "@type": "Person",
      name: SITE.name,
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${SITE.name}  People First`,
    url: SITE.url,
    description: SITE.description,
    publisher: {
      "@type": "Person",
      name: SITE.name,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function campaignSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Campaign",
    name: "People First Campaign",
    description: SITE.description,
    candidate: {
      "@type": "Person",
      name: SITE.name,
    },
    election: {
      "@type": "Event",
      name: SITE.election,
      startDate: "2026-12-01",
      location: {
        "@type": "Country",
        name: "South Sudan",
      },
    },
    party: {
      "@type": "Organization",
      name: SITE.party,
      alternateName: SITE.partyShort,
    },
    slogan: SITE.tagline,
    url: SITE.url,
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : absoluteUrl(item.url),
    })),
  };
}

export function articleSchema({
  title,
  description,
  path,
  datePublished,
  dateModified,
  author = SITE.name,
  images = [SITE.ogImage],
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  images?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    url: absoluteUrl(path),
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: author,
      url: SITE.url,
    },
    publisher: {
      "@type": "Person",
      name: SITE.name,
    },
    image: images.map((img) => (img.startsWith("http") ? img : absoluteUrl(img))),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(path),
    },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function speakableSchema(cssSelectors: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors,
    },
  };
}