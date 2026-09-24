import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";
import { logAudit } from "@/lib/audit";

export async function GET() {
  const attorneys = await prisma.attorney.findMany({
    orderBy: { displayOrder: "asc" },
  });
  return NextResponse.json({ attorneys });
}

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const attorney = await prisma.attorney.create({
      data: {
        slug: body.slug || body.fullName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        fullName: body.fullName,
        title: body.title,
        designation: body.designation,
        bio: body.bio,
        detailedBio: body.detailedBio || body.bio,
        photoUrl: body.photoUrl || "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80",
        email: body.email,
        phone: body.phone,
        officeLocation: body.officeLocation || "Lagos Principal Chambers",
        admissions: JSON.stringify(body.admissions || []),
        education: JSON.stringify(body.education || []),
        qualifications: JSON.stringify(body.qualifications || []),
        languages: JSON.stringify(body.languages || ["English"]),
        isPartner: Boolean(body.isPartner),
        isFeatured: Boolean(body.isFeatured),
        isPublished: body.isPublished !== undefined ? Boolean(body.isPublished) : true,
      },
    });

    await logAudit({
      adminEmail: admin.email,
      action: "CREATE",
      entity: "ATTORNEY",
      entityId: attorney.id,
      details: `Created attorney profile for ${attorney.fullName}`,
    });

    return NextResponse.json({ success: true, attorney }, { status: 201 });
  } catch (error) {
    console.error("Create attorney error:", error);
    return NextResponse.json({ error: "Failed to create attorney" }, { status: 500 });
  }
}
