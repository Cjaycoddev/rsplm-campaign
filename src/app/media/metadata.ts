import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Press & Media",
  description: "News, events, and ideas from the R-SPLM/F People First campaign. Press coverage, blog posts, policy articles, and campaign updates for Nathaniel Garang Aduotdit.",
  path: "/media",
  images: [
    {
      url: "/images/nathaniel-portrait.jpg",
      alt: "R-SPLM/F Press & Media - Nathaniel Garang Aduotdit Campaign",
      width: 1200,
      height: 630,
    },
  ],
});