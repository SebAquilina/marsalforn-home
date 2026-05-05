import type { MetadataRoute } from "next";
export const runtime = "edge";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://marsalforn-home-web.pages.dev";
  const now = new Date();
  return [
    "/", "/kitchen", "/bath", "/linen", "/lighting",
    "/sale", "/journal", "/brand", "/contact", "/faq",
    "/shipping", "/returns", "/cart", "/account/save-list",
    "/concept", "/privacy", "/terms", "/checkout",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1.0 : 0.7,
  }));
}
