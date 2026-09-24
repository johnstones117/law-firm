import Link from "next/link";
import { Briefcase, MapPin, Clock, ArrowRight, Shield, Award } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Careers & Pupillage | Join Chambers",
  description:
    "Explore career opportunities, associate counsel positions, and pupillage programs at Sterling & Crest Legal Practitioners.",
};

export default async function CareersPage() {
  const jobs = await prisma.jobPosting.findMany({
    where: { isOpen: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-legal-cream-50 min-h-screen">
      {/* Header */}
      <section className="bg-legal-navy-950 text-white py-20 border-b border-legal-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-legal-gold-400">
              Join Our Legal Practice
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Careers, Associateships &amp; Pupillage
            </h1>
            <p className="text-slate-300 text-base leading-relaxed font-light">
              We recruit exceptional legal minds committed to rigorous intellectual standards, decisive trial advocacy, and the highest standards of professional ethics.
            </p>
          </div>
        </div>
      </section>

      {/* Values & Culture */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded border border-slate-200 bg-legal-cream-50 space-y-3">
              <Award className="w-8 h-8 text-legal-gold-600" />
              <h2 className="font-serif text-lg font-bold text-legal-navy-950">
                Meritocratic Culture
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clear and transparent pathways to partnership based entirely on advocacy excellence, deal leadership, and client dedication.
              </p>
            </div>

            <div className="p-6 rounded border border-slate-200 bg-legal-cream-50 space-y-3">
              <Shield className="w-8 h-8 text-legal-gold-600" />
              <h2 className="font-serif text-lg font-bold text-legal-navy-950">
                High-Stakes Precedents
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Work directly with Senior Advocates of Nigeria on reported appellate appeals and multi-billion-Naira cross-border arbitrations.
              </p>
            </div>

            <div className="p-6 rounded border border-slate-200 bg-legal-cream-50 space-y-3">
              <Briefcase className="w-8 h-8 text-legal-gold-600" />
              <h2 className="font-serif text-lg font-bold text-legal-navy-950">
                Continuous Education
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Firm-sponsored international legal conferences (IBA, LCIA, NBA) and advanced trial advocacy masterclasses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-legal-navy-950 mb-8">
            Current Openings in Chambers
          </h2>

          <div className="space-y-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-slate-200 rounded-sm p-8 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-6 legal-card-hover"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="bg-legal-navy-950 text-legal-gold-400 font-bold px-2.5 py-0.5 rounded">
                      {job.department}
                    </span>
                    <span className="text-slate-500 font-medium flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-legal-gold-600" />
                      {job.location}
                    </span>
                    <span className="text-slate-500 font-medium">
                      {job.employmentType}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-legal-navy-950">
                    {job.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {job.summary}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {job.deadline && (
                    <span className="text-xs text-slate-400 font-mono">
                      Deadline: {formatDate(job.deadline)}
                    </span>
                  )}
                  <Link
                    href={`/careers/${job.slug}`}
                    className="bg-legal-navy-900 hover:bg-legal-navy-800 text-legal-gold-400 font-bold px-6 py-3 rounded-sm uppercase tracking-wider text-xs transition flex items-center"
                  >
                    <span>View &amp; Apply</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
