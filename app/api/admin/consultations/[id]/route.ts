import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";
import { logAudit } from "@/lib/audit";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const updated = await prisma.consultationRequest.update({
    where: { id },
    data: {
      status: body.status,
      adminNotes: body.adminNotes,
    },
  });

  await logAudit({
    adminEmail: admin.email,
    action: "STATUS_CHANGE",
    entity: "CONSULTATION",
    entityId: id,
    details: `Updated consultation status to ${body.status}`,
  });

  return NextResponse.json({ success: true, consultation: updated });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.consultationRequest.delete({ where: { id } });

  await logAudit({
    adminEmail: admin.email,
    action: "DELETE",
    entity: "CONSULTATION",
    entityId: id,
    details: `Deleted consultation inquiry #${id}`,
  });

  return NextResponse.json({ success: true });
}
