import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ConsultationSchema } from "@/lib/validations";
import { generateReferenceCode } from "@/lib/utils";
import {
  sendEmail,
  consultationClientEmailTemplate,
  consultationAdminAlertTemplate,
} from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = ConsultationSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.errors[0]?.message || "Invalid input data" },
        { status: 400 }
      );
    }

    const {
      fullName,
      email,
      phone,
      company,
      country,
      matterType,
      preferredContact,
      preferredDate,
      preferredTime,
      description,
      hasConsent,
    } = validated.data;

    const referenceNumber = generateReferenceCode("SC");

    // 1. Save to Database
    const consultation = await prisma.consultationRequest.create({
      data: {
        referenceNumber,
        fullName,
        email,
        phone,
        company: company || null,
        country: country || "Nigeria",
        matterType,
        preferredContact,
        preferredDate: preferredDate || null,
        preferredTime: preferredTime || null,
        description,
        hasConsent,
        status: "NEW",
      },
    });

    // 2. Dispatch Confirmation Email to Client
    await sendEmail({
      to: email,
      subject: `[${referenceNumber}] Consultation Request Acknowledged — Crest & Sterling Alliance`,
      html: consultationClientEmailTemplate({
        fullName,
        referenceNumber,
        matterType,
      }),
    });

    // 3. Dispatch Intake Alert to Firm Admin Team
    const adminIntakeEmail =
      process.env.NEXT_PUBLIC_CONSULTATIONS_EMAIL || "intake@crestandsterling.com";
    await sendEmail({
      to: adminIntakeEmail,
      subject: `⚖️ NEW INTAKE: ${fullName} (${matterType}) [${referenceNumber}]`,
      html: consultationAdminAlertTemplate({
        fullName,
        email,
        phone,
        matterType,
        referenceNumber,
        description,
        preferredContact,
      }),
    });

    return NextResponse.json(
      {
        success: true,
        referenceNumber,
        message: "Your consultation request has been submitted successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Consultation submission error:", error);
    return NextResponse.json(
      { error: "Internal server error processing intake. Please contact chambers directly." },
      { status: 500 }
    );
  }
}
