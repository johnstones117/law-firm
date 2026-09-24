import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { HelpCircle, ArrowRight, Shield } from "lucide-react";

export const metadata = {
  title: "Frequently Asked Questions (FAQ)",
  description:
    "Common inquiries regarding legal retainers, court appearances, fee structures, emergency injunctions, and consultation procedures at Sterling & Crest.",
};

export default async function FaqPage() {
  const faqs = await prisma.faq.findMany({
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
              Clear &amp; Transparent Answers
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-slate-300 text-base leading-relaxed font-light">
              Clear explanations on our consultation protocols, emergency injunction timelines, billing models, and attorney-client engagement procedures.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs List */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white border border-slate-200 p-8 rounded-sm shadow-subtle space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-legal-gold-700 bg-legal-cream-200 px-2.5 py-0.5 rounded">
                  {faq.category}
                </span>
              </div>
              <h2 className="font-serif text-xl font-bold text-legal-navy-950">
                {faq.question}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {faq.answer}
              </p>
            </div>
          ))}

          {/* Unanswered question box */}
          <div className="mt-12 bg-legal-navy-950 text-white p-8 rounded-sm text-center space-y-4">
            <h3 className="font-serif text-2xl font-bold">
              Have a Specific Legal Question Not Addressed Above?
            </h3>
            <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
              Our Practice Intake Committee evaluates customized inquiries directly and coordinates consultation sessions with specialized partners.
            </p>
            <div className="pt-2">
              <Link
                href="/consultation"
                className="inline-flex items-center bg-legal-gold-500 hover:bg-legal-gold-600 text-legal-navy-950 font-bold px-6 py-3 rounded-sm uppercase tracking-wider text-xs transition"
              >
                <span>Request Case Evaluation</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
