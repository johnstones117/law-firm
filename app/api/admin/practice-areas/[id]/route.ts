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
    const updated = await prisma.practiceArea.update({
      where: { id },
      data: {
        name: body.name,
        tagline: body.tagline,
        summary: body.summary,
        overview: body.overview,
        isFeatured: Boolean(body.isFeatured),
        isPublished: Boolean(body.isPublished),
      },
    });

    await logAudit({
      adminEmail: admin.email,
      action: "UPDATE",
      entity: "PRACTICE_AREA",
      entityId: id,
      details: `Updated practice area ${updated.name}`,
    });

    return NextResponse.json({ success: true, practiceArea: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update practice area" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.practiceArea.delete({ where: { id } });

  await logAudit({
    adminEmail: admin.email,
    action: "DELETE",
    entity: "PRACTICE_AREA",
    entityId: id,
    details: `Deleted practice area #${id}`,
  });

  return NextResponse.json({ success: true });
}
