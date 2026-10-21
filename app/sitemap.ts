import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://crestwoodalliance.com";

  const [practiceAreas, attorneys, articles] = await Promise.all([
    prisma.practiceArea.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.attorney.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.article.findMany({ select: { slug: true, updatedAt: true } }),
  ]);

  const staticRoutes = [
    "",
    "/about",
    "/practice-areas",
    "/people",
    "/industries",
    "/case-studies",
    "/insights",
    "/careers",
    "/contact",
    "/consultation",
    "/offices",
    "/faq",
    "/privacy-policy",
    "/terms",
    "/cookie-policy",
    "/disclaimer",
    "/accessibility",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const practiceAreaRoutes = practiceAreas.map((pa) => ({
    url: `${baseUrl}/practice-areas/${pa.slug}`,
    lastModified: pa.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const attorneyRoutes = attorneys.map((att) => ({
    url: `${baseUrl}/people/${att.slug}`,
    lastModified: att.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const articleRoutes = articles.map((art) => ({
    url: `${baseUrl}/insights/${art.slug}`,
    lastModified: art.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...practiceAreaRoutes, ...attorneyRoutes, ...articleRoutes];
}
