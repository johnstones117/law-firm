import { prisma } from "@/lib/prisma";

interface LogAuditOptions {
  adminEmail: string;
  action: string;
  entity: string;
  entityId?: string;
  details?: string;
  ipAddress?: string;
}

export async function logAudit({
  adminEmail,
  action,
  entity,
  entityId,
  details,
  ipAddress,
}: LogAuditOptions) {
  try {
    await prisma.auditLog.create({
      data: {
        adminEmail,
        action,
        entity,
        entityId,
        details,
        ipAddress: ipAddress || "127.0.0.1",
      },
    });
  } catch (error) {
    console.error("Failed to write audit log entry:", error);
  }
}
