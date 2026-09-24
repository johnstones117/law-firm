import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Scale,
  Shield,
  ArrowRight,
  CheckCircle2,
  Users,
  Building2,
  FileText,
  Phone,
  HelpCircle,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import ConsultationForm from "@/components/ConsultationForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const practiceArea = await prisma.practiceArea.findUnique({
    where: { slug },
  });

  if (!practiceArea) return { title: "Practice Area Not Found" };

  return {
    title: `${practiceArea.name} | Practice Group`,
    description: practiceArea.summary,
  };
}

export default async function PracticeAreaDetailPage({ params }: Props) {
  const { slug } = await params;

  const practiceArea = await prisma.practiceArea.findUnique({
    where: { slug },
    include: {
      attorneys: {
        include: { attorney: true },
      },
    },
  });

  if (!practiceArea) {
    notFound();
  }

  const services: string[] = JSON.parse(practiceArea.keyServices || "[]");
  const industries: string[] = JSON.parse(practiceArea.relevantIndustries || "[]");

  // Fetch relevant articles & case studies
  const [relatedArticles, caseStudies, faqs] = await Promise.all([
    prisma.article.findMany({
      where: { isPublished: true },
      take: 2,
    }),
    prisma.caseStudy.findMany({
      where: { isPublished: true, practiceAreaName: { contains: practiceArea.name } },
      take: 2,
    }),
    prisma.faq.findMany({
      where: { isPublished: true },
      take: 3,
    }),
  ]);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-legal-navy-950 text-white py-20 border-b border-legal-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <Link
              href="/practice-areas"
              className="text-xs text-legal-gold-400 hover:underline uppercase tracking-wider font-semibold inline-flex items-center"
            >
              &larr; Return to Practice Directory
            </Link>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              {practiceArea.name}
            </h1>
            <p className="text-legal-gold-300 text-sm font-semibold tracking-wide uppercase">
              {practiceArea.tagline}
            </p>
            <p className="text-slate-300 text-base leading-relaxed font-light">
              {practiceArea.summary}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-16 bg-legal-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-12">
              {/* Practice Overview */}
              <div className="bg-white p-8 rounded-sm border border-slate-200 shadow-subtle space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-legal-gold-600 block">
                  Practice Group Overview
                </span>
                <h2 className="font-serif text-2xl font-bold text-legal-navy-950">
                  Comprehensive Strategic Counsel
                </h2>
                <div className="text-slate-700 text-sm leading-relaxed space-y-4 whitespace-pre-line">
                  {practiceArea.overview}
                </div>
              </div>

              {/* Core Legal Services */}
              {services.length > 0 && (
                <div className="bg-white p-8 rounded-sm border border-slate-200 shadow-subtle space-y-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-legal-gold-600 block">
                    Core Capabilities &amp; Services
                  </span>
                  <h3 className="font-serif text-xl font-bold text-legal-navy-950">
                    What We Do For Our Clients
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {services.map((srv, idx) => (
                      <div
                        key={idx}
                        className="flex items-start space-x-3 p-3 rounded bg-legal-cream-50 border border-slate-200"
                      >
                        <CheckCircle2 className="w-5 h-5 text-legal-gold-600 flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-800 font-medium leading-relaxed">
                          {srv}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Relevant Industries */}
              {industries.length > 0 && (
                <div className="bg-white p-8 rounded-sm border border-slate-200 shadow-subtle space-y-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-legal-gold-600 block">
                    Industry Sectors
                  </span>
                  <h3 className="font-serif text-xl font-bold text-legal-navy-950">
                    Sectors We Routinely Advise
                  </h3>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {industries.map((ind, idx) => (
                      <span
                        key={idx}
                        className="bg-legal-navy-900 text-legal-gold-400 text-xs px-3.5 py-1.5 rounded-sm font-medium"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Representative Matters for this area */}
              {caseStudies.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl font-bold text-legal-navy-950">
                    Representative Matters &amp; Outcomes
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {caseStudies.map((cs) => (
                      <div
                        key={cs.id}
                        className="bg-white p-6 rounded-sm border border-slate-200 shadow-subtle space-y-3"
                      >
                        <span className="text-xs font-mono text-legal-gold-700 font-semibold">
                          {cs.matterYear} &bull; {cs.industry}
                        </span>
                        <h4 className="font-serif text-lg font-bold text-legal-navy-950">
                          {cs.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{cs.summary}</p>
                        <div className="bg-emerald-50 text-emerald-800 text-xs p-3 rounded border border-emerald-200">
                          <strong>Outcome:</strong> {cs.outcome}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Practice Area FAQs */}
              {faqs.length > 0 && (
                <div className="bg-white p-8 rounded-sm border border-slate-200 shadow-subtle space-y-6">
                  <h3 className="font-serif text-xl font-bold text-legal-navy-950">
                    Frequently Asked Questions Regarding {practiceArea.name}
                  </h3>
                  <div className="space-y-4">
                    {faqs.map((f) => (
                      <div key={f.id} className="border-b border-slate-100 pb-4">
                        <strong className="text-sm text-legal-navy-950 block mb-1">
                          {f.question}
                        </strong>
                        <p className="text-xs text-slate-600 leading-relaxed">{f.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar: Leading Attorneys & Consultation CTA */}
            <div className="lg:col-span-4 space-y-8">
              {/* Practice Group Leaders */}
              <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-subtle space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-legal-gold-600 block">
                  Chambers Advocates
                </span>
                <h3 className="font-serif text-lg font-bold text-legal-navy-950">
                  Leading Counsel in This Area
                </h3>

                <div className="space-y-4">
                  {practiceArea.attorneys.map(({ attorney }) => (
                    <Link
                      key={attorney.id}
                      href={`/people/${attorney.slug}`}
                      className="flex items-center space-x-3 p-2 rounded hover:bg-slate-50 transition group"
                    >
                      <div className="relative w-12 h-12 rounded overflow-hidden bg-slate-200 flex-shrink-0">
                        <Image
                          src={attorney.photoUrl}
                          alt={attorney.fullName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <strong className="font-serif text-sm font-bold text-legal-navy-950 group-hover:text-legal-gold-700 block transition">
                          {attorney.fullName}
                        </strong>
                        <span className="text-[11px] text-slate-500 block">
                          {attorney.title}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Consultation Intake Card */}
              <div className="bg-legal-navy-950 text-white p-6 rounded-sm border border-legal-navy-800 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-legal-gold-400 block">
                  Intake Evaluation
                </span>
                <h3 className="font-serif text-xl font-bold text-white">
                  Discuss Your Matter With This Practice Group
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Submit a confidential evaluation request. Our Practice Leader will review your matter and contact you within 2 business hours.
                </p>
                <Link
                  href={`/consultation?matter=${encodeURIComponent(practiceArea.name)}`}
                  className="block text-center bg-legal-gold-500 hover:bg-legal-gold-600 text-legal-navy-950 font-bold py-3 rounded-sm uppercase tracking-wider text-xs transition"
                >
                  Schedule Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
