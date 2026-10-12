import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery  Moments of Unity",
  description:
    "Snapshots of the R-SPLM/F People First movement  from Juba to the diaspora, and every community in between.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery  Moments of Unity",
    description: "The people, places, and pride of South Sudan.",
    url: "https://nathanielgarang.com/gallery",
    images: ["/images/gallery/06_women_flag_bor.jpg"],
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}