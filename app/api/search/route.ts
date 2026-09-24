import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() || "";

  if (!q || q.length < 2) {
    return NextResponse.json({
      query: q,
      totalCount: 0,
      results: {
        attorneys: [],
        practiceAreas: [],
        articles: [],
        caseStudies: [],
        faqs: [],
      },
    });
  }

  try {
    const [attorneys, practiceAreas, articles, caseStudies, faqs] =
      await Promise.all([
        prisma.attorney.findMany({
          where: {
            isPublished: true,
            OR: [
              { fullName: { contains: q } },
              { designation: { contains: q } },
              { bio: { contains: q } },
            ],
          },
          select: {
            id: true,
            slug: true,
            fullName: true,
            title: true,
            designation: true,
            photoUrl: true,
          },
        }),

        prisma.practiceArea.findMany({
          where: {
            isPublished: true,
            OR: [
              { name: { contains: q } },
              { summary: { contains: q } },
              { tagline: { contains: q } },
            ],
          },
          select: {
            id: true,
            slug: true,
            name: true,
            tagline: true,
            summary: true,
          },
        }),

        prisma.article.findMany({
          where: {
            isPublished: true,
            OR: [
              { title: { contains: q } },
              { summary: { contains: q } },
              { category: { contains: q } },
            ],
          },
          select: {
            id: true,
            slug: true,
            title: true,
            summary: true,
            category: true,
            readTime: true,
            authorName: true,
          },
        }),

        prisma.caseStudy.findMany({
          where: {
            isPublished: true,
            OR: [
              { title: { contains: q } },
              { summary: { contains: q } },
              { practiceAreaName: { contains: q } },
            ],
          },
          select: {
            id: true,
            slug: true,
            title: true,
            practiceAreaName: true,
            summary: true,
            outcome: true,
          },
        }),

        prisma.faq.findMany({
          where: {
            isPublished: true,
            OR: [
              { question: { contains: q } },
              { answer: { contains: q } },
            ],
          },
          select: {
            id: true,
            question: true,
            answer: true,
            category: true,
          },
        }),
      ]);

    const totalCount =
      attorneys.length +
      practiceAreas.length +
      articles.length +
      caseStudies.length +
      faqs.length;

    return NextResponse.json({
      query: q,
      totalCount,
      results: {
        attorneys,
        practiceAreas,
        articles,
        caseStudies,
        faqs,
      },
    });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Failed to execute search query" },
      { status: 500 }
    );
  }
}
