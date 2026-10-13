"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { breadcrumbSchema, absoluteUrl } from "@/lib/seo";

const routeLabels: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/manifesto": "Manifesto",
  "/analytics": "Analytics",
  "/media": "Media",
  "/gallery": "Gallery",
  "/join": "Join",
  "/donate": "Donate",
  "/contact": "Contact",
  "/admin": "Admin",
  "/admin/login": "Admin Login",
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  
  const segments = pathname.split("/").filter(Boolean);
  
  const breadcrumbs = [
    { name: "Home", url: absoluteUrl("/") },
    ...segments.map((segment, index) => {
      const path = "/" + segments.slice(0, index + 1).join("/");
      return {
        name: routeLabels[path] || segment.charAt(0).toUpperCase() + segment.slice(1),
        url: absoluteUrl(path),
      };
    }),
  ];

  return (
    <>
      <nav className="container-x px-4 py-3 text-sm" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 flex-wrap">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.url} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-ink/30 flex-shrink-0" aria-hidden="true" />
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="font-medium text-green-deep" aria-current="page">{crumb.name}</span>
              ) : (
                <Link
                  href={crumb.url}
                  className="text-ink/50 hover:text-gold transition-colors font-medium"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbs)) }}
      />
    </>
  );
}