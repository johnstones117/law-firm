import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";
import { logAudit } from "@/lib/audit";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const settings = await prisma.siteSetting.findMany({
    orderBy: { key: "asc" },
  });

  return NextResponse.json({ settings });
}

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { settings } = await req.json(); // array of { key, value }

    for (const item of settings) {
      await prisma.siteSetting.upsert({
        where: { key: item.key },
        update: { value: item.value },
        create: { key: item.key, value: item.value },
      });
    }

    await logAudit({
      adminEmail: admin.email,
      action: "UPDATE",
      entity: "SITE_SETTINGS",
      details: `Updated ${settings.length} site settings.`,
    });

    return NextResponse.json({ success: true, message: "Settings updated successfully." });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
