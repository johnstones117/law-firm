import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";
import { logAudit } from "@/lib/audit";

export async function GET() {
  const articles = await prisma.article.findMany({
    orderBy: { publishedAt: "desc" },
  });
  return NextResponse.json({ articles });
}

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const article = await prisma.article.create({
      data: {
        slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        title: body.title,
        summary: body.summary,
        content: body.content,
        category: body.category || "ARTICLE",
        authorName: body.authorName || "Crest & Sterling Editorial Board",
        authorTitle: body.authorTitle || "Senior Counsel",
        readTime: body.readTime || "5 min read",
        coverImage: body.coverImage || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
        isPublished: body.isPublished !== undefined ? Boolean(body.isPublished) : true,
        isFeatured: Boolean(body.isFeatured),
      },
    });

    await logAudit({
      adminEmail: admin.email,
      action: "CREATE",
      entity: "ARTICLE",
      entityId: article.id,
      details: `Published article ${article.title}`,
    });

    return NextResponse.json({ success: true, article }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
  }
}
