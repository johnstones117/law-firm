import { z } from "zod";

// Consultation & Case Evaluation Request Schema
export const ConsultationSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(100, "Full name cannot exceed 100 characters"),
  email: z.string().email("Please provide a valid corporate or personal email address"),
  phone: z
    .string()
    .min(7, "Phone number is too short")
    .max(25, "Phone number is too long"),
  company: z.string().max(100).optional().nullable(),
  country: z.string().default("Nigeria"),
  matterType: z.string().min(2, "Please select the legal matter category"),
  preferredContact: z.enum(["Phone", "Email", "Virtual Meeting"]).default("Phone"),
  preferredDate: z.string().optional().nullable(),
  preferredTime: z.string().optional().nullable(),
  description: z
    .string()
    .min(20, "Please provide at least a brief summary of the matter (minimum 20 characters)")
    .max(3000, "Summary cannot exceed 3000 characters"),
  hasConsent: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge that this submission does not create an attorney-client relationship.",
  }),
});

// Contact Form Schema
export const ContactMessageSchema = z.object({
  fullName: z.string().min(2, "Name is required").max(100),
  email: z.string().email("Valid email required"),
  phone: z.string().max(25).optional().nullable(),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(150),
  message: z.string().min(10, "Message must be at least 10 characters").max(3000),
});

// Newsletter Subscription Schema
export const NewsletterSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  source: z.string().default("WEBSITE_FOOTER"),
});

// Career Application Schema
export const JobApplicationSchema = z.object({
  jobId: z.string().min(1, "Job ID is required"),
  fullName: z.string().min(3, "Full name is required").max(100),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(7, "Valid phone number required"),
  linkedinUrl: z.string().url("Valid URL required").optional().or(z.literal("")),
  coverLetter: z.string().min(30, "Please provide a brief cover letter or statement of interest"),
  resumeUrl: z.string().optional().nullable(),
});

// Admin Login Schema
export const AdminLoginSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
