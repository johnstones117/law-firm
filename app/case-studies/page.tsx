import Link from "next/link";
import { Scale, ArrowRight, Shield, Award, CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Representative Matters & Case Studies",
  description:
    "Explore landmark dispute outcomes, multimillion-dollar debt restructurings, and precedent-setting corporate transactions handled by Sterling & Crest.",
};

export default async function CaseStudiesPage() {
  const caseStudies = await prisma.caseStudy.findMany({
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
              Proven Courtroom &amp; Commercial Track Record
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Representative Matters &amp; Strategic Case Studies
            </h1>
            <p className="text-slate-300 text-base leading-relaxed font-light">
              From emergency creditor moratoria under CAMA 2020 to multinational arbitral awards in London and Paris, our track record reflects decisive trial advocacy and deal discipline.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {caseStudies.map((cs) => (
            <div
              key={cs.id}
              className="bg-white border border-slate-200 rounded-sm shadow-subtle p-8 space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-2">
                <div className="flex items-center space-x-3">
                  <span className="bg-legal-navy-950 text-legal-gold-400 font-semibold text-xs px-3 py-1 rounded">
                    {cs.practiceAreaName}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Sector: {cs.industry}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-slate-400">
                  Matter Year: {cs.matterYear}
                </span>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-legal-navy-950 leading-snug">
                  {cs.title}
                </h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {cs.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded border border-slate-200">
                <div>
                  <strong className="text-xs uppercase tracking-wider text-slate-700 block mb-1.5 font-bold">
                    The Legal Challenge &amp; Risk:
                  </strong>
                  <p className="text-xs text-slate-600 leading-relaxed">{cs.challenge}</p>
                </div>

                <div>
                  <strong className="text-xs uppercase tracking-wider text-slate-700 block mb-1.5 font-bold">
                    The Chambers Tactical Strategy:
                  </strong>
                  <p className="text-xs text-slate-600 leading-relaxed">{cs.solution}</p>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded text-xs text-emerald-900 flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold">Decisive Resolution &amp; Commercial Outcome:</strong>
                  <span className="leading-relaxed mt-0.5 block">{cs.outcome}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
