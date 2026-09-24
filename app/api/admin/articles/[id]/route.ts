import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";
import { logAudit } from "@/lib/audit";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const body = await req.json();
    const updated = await prisma.article.update({
      where: { id },
      data: {
        title: body.title,
        summary: body.summary,
        content: body.content,
        category: body.category,
        authorName: body.authorName,
        isPublished: Boolean(body.isPublished),
        isFeatured: Boolean(body.isFeatured),
      },
    });

    await logAudit({
      adminEmail: admin.email,
      action: "UPDATE",
      entity: "ARTICLE",
      entityId: id,
      details: `Updated article ${updated.title}`,
    });

    return NextResponse.json({ success: true, article: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.article.delete({ where: { id } });

  await logAudit({
    adminEmail: admin.email,
    action: "DELETE",
    entity: "ARTICLE",
    entityId: id,
    details: `Deleted article ID ${id}`,
  });

  return NextResponse.json({ success: true });
}
