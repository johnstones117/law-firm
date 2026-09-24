import Link from "next/link";
import { Zap, Landmark, Building2, Factory, Ship, Cpu, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Industry Focus & Sectors",
  description:
    "Tailored legal counsel for high-impact African and multinational industry sectors including Energy, FinTech, Real Estate, Manufacturing, and Maritime.",
};

export default async function IndustriesPage() {
  const industries = await prisma.industry.findMany({
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
              Sector Specialization
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Deep Industry Knowledge Across Africa&rsquo;s Growth Sectors
            </h1>
            <p className="text-slate-300 text-base leading-relaxed font-light">
              We understand the commercial rhythms, operational risks, and regulatory bodies governing the key drivers of West African and global trade.
            </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind) => (
              <div
                key={ind.id}
                className="bg-white border border-slate-200 p-8 rounded-sm shadow-subtle legal-card-hover flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded bg-legal-navy-950 text-legal-gold-400 flex items-center justify-center">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h2 className="font-serif text-xl font-bold text-legal-navy-950">
                    {ind.name}
                  </h2>
                  <p className="text-xs font-semibold text-legal-gold-700 uppercase tracking-wide">
                    {ind.summary}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {ind.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link
                    href={`/consultation?industry=${encodeURIComponent(ind.name)}`}
                    className="text-xs uppercase font-bold tracking-wider text-legal-navy-950 hover:text-legal-gold-600 transition flex items-center"
                  >
                    <span>Consult Industry Team</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
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
