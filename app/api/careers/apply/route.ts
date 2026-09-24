import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { JobApplicationSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = JobApplicationSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.errors[0]?.message || "Invalid application details" },
        { status: 400 }
      );
    }

    const { jobId, fullName, email, phone, linkedinUrl, coverLetter, resumeUrl } =
      validated.data;

    // Verify job exists and is open
    const job = await prisma.jobPosting.findUnique({
      where: { id: jobId },
    });

    if (!job || !job.isOpen) {
      return NextResponse.json(
        { error: "This position is no longer accepting new applications." },
        { status: 400 }
      );
    }

    const application = await prisma.jobApplication.create({
      data: {
        jobId,
        fullName,
        email,
        phone,
        linkedinUrl: linkedinUrl || null,
        coverLetter,
        resumeUrl: resumeUrl || null,
        status: "PENDING",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your application has been received by our Recruitment Committee.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Career application API error:", error);
    return NextResponse.json(
      { error: "Failed to process application. Please try again." },
      { status: 500 }
    );
  }
}
