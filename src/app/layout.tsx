import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { SITE } from "@/lib/seo";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0E6B2F",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Hon. Nathaniel Garang Aduot | Next President  South Sudan 2026",
    template: "%s | Hon. Nathaniel Garang Aduot",
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/logo-v2.png", type: "image/png" },
    ],
    apple: "/logo-v2.png",
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: `${SITE.name}  People First`,
    title: "Hon. Nathaniel Garang Aduot | Next President  South Sudan 2026",
    description: SITE.tagline + " Join the movement to unite, reform, and rebuild South Sudan.",
    images: [
      {
        url: "/images/nathaniel-portrait.jpg",
        width: 1200,
        height: 630,
        alt: "Hon. Nathaniel Garang Aduot  R-SPLM/F Candidate for President, South Sudan 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hon. Nathaniel Garang Aduot | Next President  South Sudan 2026",
    description: SITE.tagline + " Join the movement for a united South Sudan.",
    images: ["/images/nathaniel-portrait.jpg"],
    ...(SITE.twitterHandle ? { site: SITE.twitterHandle, creator: SITE.twitterHandle } : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "politics",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    alternateName: [...SITE.alternateNames],
    jobTitle: SITE.jobTitle,
    description: SITE.description,
    url: SITE.url,
    image: `${SITE.url}/images/nathaniel-portrait.jpg`,
    affiliation: {
      "@type": "Organization",
      name: SITE.party,
      alternateName: SITE.partyShort,
    },
    nationality: {
      "@type": "Country",
      name: "South Sudan",
    },
    knowsAbout: [
      "Governance reform",
      "Peace and reconciliation",
      "Interfaith leadership",
      "South Sudanese politics",
      "Democratic transition",
    ],
    ...(SITE.socials.length > 0 ? { sameAs: SITE.socials } : {}),
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.party,
    alternateName: SITE.partyShort,
    url: SITE.url,
    logo: `${SITE.url}/logo-v2.png`,
    description: "R-SPLM/F  Real People's Liberation Movement Forward. People First.",
    ...(SITE.socials.length > 0 ? { sameAs: SITE.socials } : {}),
  };

  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {children}
      </body>
    </html>
  );
}