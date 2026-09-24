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
    const updated = await prisma.attorney.update({
      where: { id },
      data: {
        fullName: body.fullName,
        title: body.title,
        designation: body.designation,
        bio: body.bio,
        detailedBio: body.detailedBio,
        photoUrl: body.photoUrl,
        email: body.email,
        phone: body.phone,
        officeLocation: body.officeLocation,
        isPartner: Boolean(body.isPartner),
        isFeatured: Boolean(body.isFeatured),
        isPublished: Boolean(body.isPublished),
      },
    });

    await logAudit({
      adminEmail: admin.email,
      action: "UPDATE",
      entity: "ATTORNEY",
      entityId: id,
      details: `Updated attorney ${updated.fullName}`,
    });

    return NextResponse.json({ success: true, attorney: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update attorney" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.attorney.delete({ where: { id } });

  await logAudit({
    adminEmail: admin.email,
    action: "DELETE",
    entity: "ATTORNEY",
    entityId: id,
    details: `Deleted attorney ID ${id}`,
  });

  return NextResponse.json({ success: true });
}
