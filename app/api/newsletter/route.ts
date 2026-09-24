import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { NewsletterSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = NewsletterSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    const { email, source } = validated.data;

    // Check existing
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existing) {
      if (!existing.isActive) {
        await prisma.newsletterSubscriber.update({
          where: { email },
          data: { isActive: true, unsubscribedAt: null },
        });
      }
      return NextResponse.json({
        success: true,
        message: "You are already subscribed to our legal publications.",
      });
    }

    await prisma.newsletterSubscriber.create({
      data: {
        email,
        source,
        isActive: true,
      },
    });

    return NextResponse.json(
      { success: true, message: "Subscription successful." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { error: "Could not complete subscription." },
      { status: 500 }
    );
  }
}
