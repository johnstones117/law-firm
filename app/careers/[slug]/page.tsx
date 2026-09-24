import { notFound } from "next/navigation";
import Link from "next/link";
import { Briefcase, MapPin, Clock, Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import JobApplicationForm from "@/components/JobApplicationForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const job = await prisma.jobPosting.findUnique({
    where: { slug },
  });

  if (!job) return { title: "Position Not Found" };

  return {
    title: `${job.title} | Careers`,
    description: job.summary,
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;

  const job = await prisma.jobPosting.findUnique({
    where: { slug },
  });

  if (!job || !job.isOpen) {
    notFound();
  }

  const responsibilities: string[] = JSON.parse(job.responsibilities || "[]");
  const requirements: string[] = JSON.parse(job.requirements || "[]");
  const benefits: string[] = JSON.parse(job.benefits || "[]");

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-legal-navy-950 text-white py-16 border-b border-legal-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/careers"
            className="text-xs text-legal-gold-400 hover:underline uppercase tracking-wider font-semibold inline-flex items-center mb-6"
          >
            &larr; Return to Open Positions
          </Link>

          <div className="max-w-3xl space-y-4">
            <span className="bg-legal-gold-500 text-legal-navy-950 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded inline-block">
              {job.department}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              {job.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-300">
              <span className="flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1.5 text-legal-gold-400" />
                {job.location}
              </span>
              <span className="flex items-center">
                <Briefcase className="w-3.5 h-3.5 mr-1.5 text-legal-gold-400" />
                {job.employmentType} ({job.experienceLevel})
              </span>
              {job.deadline && (
                <span className="flex items-center font-mono">
                  <Calendar className="w-3.5 h-3.5 mr-1.5 text-legal-gold-400" />
                  Apply by: {formatDate(job.deadline)}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Details & Application Grid */}
      <section className="py-16 bg-legal-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Job Specification */}
            <div className="lg:col-span-7 space-y-10">
              <div className="bg-white p-8 rounded-sm border border-slate-200 shadow-subtle space-y-4">
                <h2 className="font-serif text-2xl font-bold text-legal-navy-950">
                  Role Overview
                </h2>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {job.summary}
                </p>
              </div>

              {responsibilities.length > 0 && (
                <div className="bg-white p-8 rounded-sm border border-slate-200 shadow-subtle space-y-4">
                  <h3 className="font-serif text-xl font-bold text-legal-navy-950">
                    Key Responsibilities
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {responsibilities.map((res, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-legal-gold-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {requirements.length > 0 && (
                <div className="bg-white p-8 rounded-sm border border-slate-200 shadow-subtle space-y-4">
                  <h3 className="font-serif text-xl font-bold text-legal-navy-950">
                    Candidate Qualifications &amp; Standards
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {requirements.map((req, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-legal-gold-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {benefits.length > 0 && (
                <div className="bg-white p-8 rounded-sm border border-slate-200 shadow-subtle space-y-4">
                  <h3 className="font-serif text-xl font-bold text-legal-navy-950">
                    Compensation &amp; Professional Support
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {benefits.map((ben, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-legal-gold-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Application Form */}
            <div className="lg:col-span-5">
              <JobApplicationForm jobId={job.id} jobTitle={job.title} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
