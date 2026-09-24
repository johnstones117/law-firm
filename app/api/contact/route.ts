import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ContactMessageSchema } from "@/lib/validations";
import { sendEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = ContactMessageSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.errors[0]?.message || "Invalid contact input" },
        { status: 400 }
      );
    }

    const { fullName, email, phone, subject, message } = validated.data;

    const contact = await prisma.contactMessage.create({
      data: {
        fullName,
        email,
        phone: phone || null,
        subject,
        message,
        status: "UNREAD",
      },
    });

    // Notify firm admin
    await sendEmail({
      to: process.env.NEXT_PUBLIC_PRIMARY_EMAIL || "counsel@sterlingcrestlaw.com",
      subject: `📬 New General Message: ${subject} (From: ${fullName})`,
      html: `
        <h3>New Contact Message Received</h3>
        <p><strong>From:</strong> ${fullName} (${email}${phone ? ` | ${phone}` : ""})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <div style="background:#f4f6f8; padding:15px; border-left:4px solid #0b192c;">${message}</div>
      `,
    });

    return NextResponse.json(
      { success: true, message: "Your message has been delivered to chambers." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please contact us by telephone." },
      { status: 500 }
    );
  }
}
