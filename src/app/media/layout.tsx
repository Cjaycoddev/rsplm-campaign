import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Press & Media  News and Coverage",
  description:
    "Press coverage, articles, and campaign updates for Hon. Nathaniel Garang Aduotdit and the R-SPLM/F People First movement.",
  alternates: { canonical: "/media" },
  openGraph: {
    title: "Press & Media  News and Coverage",
    description: "EthioInsight articles, campaign updates, and press releases.",
    url: "https://nathanielgarang.com/media",
  },
};

export default function MediaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}