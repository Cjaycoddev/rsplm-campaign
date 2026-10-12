import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate  Fuel the Movement",
  description:
    "Contribute to the R-SPLM/F campaign. Every contribution powers grassroots mobilization, voter education, and agent training across all 64 counties of South Sudan.",
  alternates: { canonical: "/donate" },
  openGraph: {
    title: "Donate  Fuel the Movement",
    description: "Every contribution powers our mission to unite, reform, and rebuild South Sudan.",
    url: "https://nathanielgarang.com/donate",
  },
};

export default function DonateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}