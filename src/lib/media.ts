export interface MediaItem {
  id: string;
  type: "press" | "blog";
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author?: string;
  readTime?: string;
}

export const MEDIA_ITEMS: MediaItem[] = [
  {
    id: "p1",
    type: "press",
    title: "Campaign updates coming soon",
    excerpt:
      "Rallies, town halls, and community engagements across all ten states. Stay tuned for the next big announcement.",
    date: "Coming Soon",
    category: "Campaign",
  },
  {
    id: "p2",
    type: "press",
    title: "Diaspora engagement tour",
    excerpt:
      "Hon. Nathaniel Garang' Aduotdit is meeting South Sudanese communities across global hubs to build the Diaspora Investment Compact.",
    date: "Coming Soon",
    category: "Diaspora",
  },
  {
    id: "b1",
    type: "blog",
    title: "Why People First is a governing philosophy, not a slogan",
    excerpt:
      "A reflection on the moral architecture of leadership  and why every policy must be measured against its impact on the most vulnerable.",
    date: "Coming Soon",
    category: "Vision",
    author: "Hon. Nathaniel Garang' Aduotdit",
    readTime: "5 min read",
  },
  {
    id: "b2",
    type: "blog",
    title: "The economics of dignity: jobs, not promises",
    excerpt:
      "How a 70% youth-focused economic agenda can transform South Sudan's productivity  and rebuild national confidence.",
    date: "Coming Soon",
    category: "Policy",
    author: "Campaign Policy Desk",
    readTime: "8 min read",
  },
  {
    id: "b3",
    type: "blog",
    title: "Land, water, and the future of food sovereignty",
    excerpt:
      "30 million arable hectares. The Nile basin. A plan to feed the nation and export to the region.",
    date: "Coming Soon",
    category: "Agriculture",
    author: "Campaign Policy Desk",
    readTime: "6 min read",
  },
];

export const CATEGORIES = ["All", "Campaign", "Diaspora", "Vision", "Policy", "Agriculture"] as const;