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
    title: "Presidential Candidate Hon. Nathaniel Garang Wins International Peace Award 2025",
    excerpt: "Conferred by the International College of Peace Studies (ICOPS) at a ceremony in Karen, Nairobi  recognizing his outstanding commitment to faith-based leadership and non-violent conflict resolution.",
    date: "December 20, 2025",
    category: "Award",
    url: "https://ethioinsight.org/presidential-candidate-hon-nathaniel-garang-wins-international-peace-award-2025/",
  },
  {
    id: "p2",
    type: "press",
    title: "Presidential Candidate Nathaniel Garang Urges IGAD, AU, and UN to Address Autocratic Mathen Assassination",
    excerpt: "Following the brutal assassination of opposition MP Luka Mathen Toupiny Luk in Juba, Hon. Garang emerged as the most vocal voice demanding accountability and international investigation.",
    date: "December 14, 2025",
    category: "Justice",
    url: "https://ethioinsight.org/presidential-candidate-nathaniel-garang-urges-igad-au-and-un-to-address-autocratic-mathen-assassination-in-south-sudan/",
  },
  {
    id: "p3",
    type: "press",
    title: "AU Sets Firm Deadlines for South Sudan Transition; R-SPLM/F Candidate Nathaniel Garang Aduotdit Endorses Resolutions",
    excerpt: "Endorsed the African Union's C5 Committee resolutions demanding immediate ceasefire, release of political detainees, and no further election delays.",
    date: "February 17, 2026",
    category: "Diplomacy",
    url: "https://ethioinsight.org/au-sets-firm-deadlines-for-south-sudan-transition-r-splm-f-candidate-nathaniel-garang-aduotdit-endorses-resolutions/",
  },
  {
    id: "p4",
    type: "press",
    title: "Opposition Leader Condemns Barbaric Killing of 21 Unarmed Civilians in Jonglei State",
    excerpt: "As Chairman of R-SPLM/F, formally condemned the killing of 21 unarmed civilians in Pankhor village, Ayod County  and petitioned UNMISS, the AU, and IGAD to launch an immediate investigation.",
    date: "March 21, 2026",
    category: "Justice",
    url: "https://ethioinsight.org/opposition-leader-condemns-barbaric-killing-of-21-unarmed-civilians-in-jonglei-state/",
  },
  {
    id: "b1",
    type: "blog",
    title: "Why People First is a governing philosophy, not a slogan",
    excerpt: "A reflection on the moral architecture of leadership  and why every policy must be measured against its impact on the most vulnerable.",
    date: "Coming Soon",
    category: "Vision",
    author: "Hon. Nathaniel Garang Aduotdit",
    readTime: "5 min read",
  },
  {
    id: "b2",
    type: "blog",
    title: "The economics of dignity: jobs, not promises",
    excerpt: "How a 70% youth-focused economic agenda can transform South Sudan's productivity  and rebuild national confidence.",
    date: "Coming Soon",
    category: "Policy",
    author: "Campaign Policy Desk",
    readTime: "8 min read",
  },
  {
    id: "b3",
    type: "blog",
    title: "Land, water, and the future of food sovereignty",
    excerpt: "30 million arable hectares. The Nile basin. A plan to feed the nation and export to the region.",
    date: "Coming Soon",
    category: "Agriculture",
    author: "Campaign Policy Desk",
    readTime: "6 min read",
  },
];
export const CATEGORIES = ["All", "Campaign", "Diaspora", "Vision", "Policy", "Agriculture"] as const;