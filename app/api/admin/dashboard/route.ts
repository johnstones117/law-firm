import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [
    totalConsultations,
    newConsultations,
    totalMessages,
    unreadMessages,
    totalSubscribers,
    totalArticles,
    totalAttorneys,
    totalPracticeAreas,
    totalJobs,
    recentConsultations,
    recentMessages,
    recentAuditLogs,
  ] = await Promise.all([
    prisma.consultationRequest.count(),
    prisma.consultationRequest.count({ where: { status: "NEW" } }),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { status: "UNREAD" } }),
    prisma.newsletterSubscriber.count({ where: { isActive: true } }),
    prisma.article.count(),
    prisma.attorney.count(),
    prisma.practiceArea.count(),
    prisma.jobPosting.count({ where: { isOpen: true } }),
    prisma.consultationRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
  ]);

  return NextResponse.json({
    metrics: {
      totalConsultations,
      newConsultations,
      totalMessages,
      unreadMessages,
      totalSubscribers,
      totalArticles,
      totalAttorneys,
      totalPracticeAreas,
      totalJobs,
    },
    recentConsultations,
    recentMessages,
    recentAuditLogs,
  });
}
