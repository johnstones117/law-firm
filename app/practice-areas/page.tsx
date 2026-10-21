import Link from "next/link";
import { Scale, ArrowRight, Shield, ChevronRight, CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Practice Areas & Legal Disciplines",
  description:
    "Explore Crest & Sterling's 8 core practice areas spanning Commercial Litigation, Corporate Restructuring, Personal Injury, FinTech, and Energy Law.",
};

export default async function PracticeAreasPage() {
  const practiceAreas = await prisma.practiceArea.findMany({
    where: { isPublished: true },
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="bg-legal-cream-50 min-h-screen">
      {/* Header */}
      <section className="bg-legal-navy-950 text-white py-20 border-b border-legal-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-legal-gold-400">
              Areas of Legal Specialization
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Multidisciplinary Legal Counsel Built for Sovereign &amp; Corporate Champions
            </h1>
            <p className="text-slate-300 text-base leading-relaxed font-light">
              From the Supreme Court of Nigeria to international arbitral tribunals in London and Paris, our specialized practice groups deliver relentless advocacy and structural certainty.
            </p>
          </div>
        </div>
      </section>

      {/* Practice Areas Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {practiceAreas.map((area) => {
              const services = JSON.parse(area.keyServices || "[]");

              return (
                <div
                  key={area.id}
                  className="bg-white border border-slate-200 p-8 rounded-sm shadow-subtle legal-card-hover flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded bg-legal-navy-950 text-legal-gold-400 flex items-center justify-center shadow">
                        <Scale className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold text-legal-gold-700 uppercase tracking-widest bg-legal-cream-200 px-3 py-1 rounded">
                        Core Discipline
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl font-bold text-legal-navy-950 leading-snug">
                      {area.name}
                    </h2>

                    <p className="text-xs text-legal-gold-700 font-semibold tracking-wide uppercase">
                      {area.tagline}
                    </p>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {area.summary}
                    </p>

                    {services.length > 0 && (
                      <div className="pt-2">
                        <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-2">
                          Key Capabilities &bull; Representation:
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-600">
                          {services.slice(0, 3).map((srv: string, idx: number) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-legal-gold-600 flex-shrink-0 mt-0.5" />
                              <span>{srv}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/practice-areas/${area.slug}`}
                      className="text-xs uppercase font-bold tracking-wider text-legal-navy-950 hover:text-legal-gold-600 transition flex items-center"
                    >
                      <span>Explore Practice Group Details</span>
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Link>

                    <Link
                      href={`/consultation?practice=${encodeURIComponent(area.name)}`}
                      className="text-xs text-legal-gold-700 hover:underline font-semibold"
                    >
                      Consult Counsel
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
