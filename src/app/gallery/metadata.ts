import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Gallery",
  description: "Campaign gallery showcasing the People First movement across South Sudan. Photos from rallies, community events, cultural moments, and the faces of change.",
  path: "/gallery",
  images: [
    {
      url: "/images/nathaniel-portrait.jpg",
      alt: "R-SPLM/F Campaign Gallery - Nathaniel Garang Aduotdit",
      width: 1200,
      height: 630,
    },
  ],
});