import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Donate  Fuel the Movement",
  description: "Support the R-SPLM/F People First campaign. 100% of donations fund grassroots mobilization, voter education, and agent training across South Sudan.",
  path: "/donate",
  images: [
    {
      url: "/images/nathaniel-portrait.jpg",
      alt: "Donate to Nathaniel Garang Aduotdit Campaign - People First Movement",
      width: 1200,
      height: 630,
    },
  ],
});