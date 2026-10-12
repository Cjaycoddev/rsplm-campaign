export const SITE = {
  url: "https://nathanielgarang.com",
  name: "Hon. Nathaniel Garang Aduot",
  shortName: "Nathaniel Garang",
  alternateNames: [
    "Nathaniel Garang",
    "Hon. Nathaniel Garang",
    "Nathaniel Garang Aduot",
    "Hon. Nathaniel Garang Aduot",
  ],
  jobTitle: "Presidential Candidate, Republic of South Sudan",
  party: "Real People's Liberation Movement Forward (R-SPLM/F)",
  partyShort: "R-SPLM/F",
  election: "2026 South Sudan General Elections",
  tagline: "Serving with Honor. Leading with Heart.",
  description:
    "Official campaign website for Hon. Nathaniel Garang Aduot  R-SPLM/F candidate for President of South Sudan in the 2026 general elections. Chairman, ordained Anglican priest, International Peace Award Laureate 2025. Serving with Honor. Leading with Heart.",
  keywords: [
    "Nathaniel Garang",
    "Nathaniel Garang Aduot",
    "Hon. Nathaniel Garang",
    "Nathaniel Garang South Sudan",
    "R-SPLM/F",
    "Real People's Liberation Movement Forward",
    "South Sudan President 2026",
    "South Sudan elections 2026",
    "People First",
    "South Sudan candidate",
  ],
  socials: [] as string[],
  partyUrl: "",
  locale: "en_US",
  twitterHandle: "",
};

export function absoluteUrl(path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${clean}`;
}