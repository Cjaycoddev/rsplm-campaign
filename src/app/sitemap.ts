import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "",           priority: 1.0, changeFrequency: "weekly"  },
    { path: "/about",     priority: 0.9, changeFrequency: "monthly" },
    { path: "/manifesto", priority: 0.9, changeFrequency: "monthly" },
    { path: "/analytics", priority: 0.7, changeFrequency: "weekly"  },
    { path: "/media",     priority: 0.7, changeFrequency: "weekly"  },
    { path: "/gallery",   priority: 0.6, changeFrequency: "monthly" },
    { path: "/join",      priority: 0.8, changeFrequency: "monthly" },
    { path: "/donate",    priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact",   priority: 0.5, changeFrequency: "yearly"  },
    { path: "/legal/privacy",   priority: 0.3, changeFrequency: "yearly" },
    { path: "/legal/terms",     priority: 0.3, changeFrequency: "yearly" },
    { path: "/legal/donations", priority: 0.3, changeFrequency: "yearly" },
  ];

  return routes.map((r) => ({
    url: `${SITE.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}