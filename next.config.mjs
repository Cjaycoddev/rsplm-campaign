/** @type {import('next').NextConfig} */
function supabasePatterns() {
  const patterns = [{ protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" }];
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (raw) {
    try {
      const { hostname, protocol } = new URL(raw);
      patterns.push({
        protocol: protocol.replace(":", "") || "https",
        hostname,
        pathname: "/storage/v1/object/public/**",
      });
    } catch {
      /* ignore invalid URL */
    }
  }
  return patterns;
}

const nextConfig = {
  images: {
    qualities: [75, 85, 95, 100],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "cdn.pixabay.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      ...supabasePatterns(),
    ],
  },
};

export default nextConfig;
