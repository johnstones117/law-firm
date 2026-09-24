import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";
import { logAudit } from "@/lib/audit";

export async function GET() {
  const practiceAreas = await prisma.practiceArea.findMany({
    orderBy: { displayOrder: "asc" },
  });
  return NextResponse.json({ practiceAreas });
}

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const created = await prisma.practiceArea.create({
      data: {
        slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        name: body.name,
        tagline: body.tagline || "",
        summary: body.summary,
        overview: body.overview || body.summary,
        keyServices: JSON.stringify(body.keyServices || []),
        relevantIndustries: JSON.stringify(body.relevantIndustries || []),
        isFeatured: Boolean(body.isFeatured),
        isPublished: body.isPublished !== undefined ? Boolean(body.isPublished) : true,
      },
    });

    await logAudit({
      adminEmail: admin.email,
      action: "CREATE",
      entity: "PRACTICE_AREA",
      entityId: created.id,
      details: `Created practice area ${created.name}`,
    });

    return NextResponse.json({ success: true, practiceArea: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create practice area" }, { status: 500 });
  }
}
