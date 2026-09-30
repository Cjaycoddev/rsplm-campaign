export type GalleryCategory = "All" | "People" | "Places" | "Culture" | "Press" | "Nation";

export interface GalleryItem {
  src: string;
  title: string;
  caption: string;
  span: "wide" | "tall" | "normal";
  category: Exclude<GalleryCategory, "All">;
  location?: string;
}

export const CATEGORIES: GalleryCategory[] = ["All", "Press", "People", "Places", "Culture", "Nation"];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    src: "/images/press/01_people_first_global.jpg",
    title: "People First Goes Global",
    caption: "Global recognition for the People First agenda",
    span: "wide",
    category: "Press",
    location: "Nairobi, Kenya",
  },
  {
    src: "/images/press/06_nairobi_honors.jpg",
    title: "Nairobi Honors",
    caption: "A South Sudanese peacebuilder honored in Kenya",
    span: "tall",
    category: "Press",
    location: "Karen, Nairobi",
  },
  {
    src: "/images/press/03_faith_to_peace.jpg",
    title: "From Faith Leader to Peace Icon",
    caption: "Bridging religious authority and reform",
    span: "normal",
    category: "Press",
  },
  {
    src: "/images/gallery/06_women_flag_bor.jpg",
    title: "Women of Bor",
    caption: "A new generation rising with the flag of South Sudan",
    span: "wide",
    category: "People",
    location: "Bor, Jonglei State",
  },
  {
    src: "/images/gallery/10_bor_market.jpg",
    title: "Merol Market",
    caption: "Commerce and community  the heartbeat of Jonglei",
    span: "tall",
    category: "Places",
    location: "Bor Town",
  },
  {
    src: "/images/gallery/01_mundari_camp.jpg",
    title: "Mundari Cattle Camp",
    caption: "Culture, heritage, and identity",
    span: "normal",
    category: "Culture",
    location: "Terekeka, Central Equatoria",
  },
  {
    src: "/images/gallery/11_market_women.jpg",
    title: "Market Day",
    caption: "Women preparing fresh produce  the backbone of local economy",
    span: "normal",
    category: "People",
    location: "Village Market",
  },
  {
    src: "/images/gallery/05_flag.jpg",
    title: "The Flag of South Sudan",
    caption: "One nation. One people. One future.",
    span: "normal",
    category: "Nation",
  },
  {
    src: "/images/press/02_icops_awards.jpg",
    title: "ICOPS Award Ceremony",
    caption: "International College of Peace Studies honors Hon. Garang",
    span: "normal",
    category: "Press",
    location: "Nairobi",
  },
  {
    src: "/images/gallery/03_laarim_portrait.jpg",
    title: "Portrait of the People",
    caption: "The Laarim community of Eastern Equatoria",
    span: "tall",
    category: "People",
    location: "Kimotong",
  },
  {
    src: "/images/gallery/09_imehejek_cattle.jpg",
    title: "Imehejek",
    caption: "Cattle, land, and legacy  the wealth of our nation",
    span: "wide",
    category: "Places",
    location: "Imehejek",
  },
  {
    src: "/images/press/07_democracy_threatened.jpg",
    title: "Democracy Threatened",
    caption: "Speaking truth to power on electoral integrity",
    span: "normal",
    category: "Press",
  },
  {
    src: "/images/gallery/04_laarim_group.jpg",
    title: "Laarim Community",
    caption: "Together, we are stronger",
    span: "normal",
    category: "People",
    location: "Kimotong",
  },
  {
    src: "/images/gallery/02_laarim_community.jpg",
    title: "Kimotong",
    caption: "The people who make South Sudan who she is",
    span: "normal",
    category: "Culture",
    location: "Eastern Equatoria",
  },
];

// Items for the orbit carousel  mixed press + people
export const ORBIT_ITEMS = [
  { src: "/images/press/01_people_first_global.jpg", title: "People First Goes Global", caption: "Nairobi" },
  { src: "/images/gallery/06_women_flag_bor.jpg",    title: "Women of Bor",             caption: "Jonglei" },
  { src: "/images/press/06_nairobi_honors.jpg",      title: "Nairobi Honors",           caption: "Kenya" },
  { src: "/images/gallery/10_bor_market.jpg",        title: "Merol Market",             caption: "Bor" },
  { src: "/images/press/03_faith_to_peace.jpg",      title: "Faith to Peace",           caption: "Global" },
  { src: "/images/gallery/01_mundari_camp.jpg",      title: "Mundari Cattle Camp",      caption: "Terekeka" },
  { src: "/images/press/02_icops_awards.jpg",        title: "ICOPS Award",              caption: "Nairobi" },
  { src: "/images/gallery/05_flag.jpg",              title: "The Flag",                 caption: "South Sudan" },
] as const;