import ConsultationForm from "@/components/ConsultationForm";
import { Shield, Clock, Phone, Lock, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Request a Legal Consultation | Case Evaluation",
  description:
    "Schedule a confidential case evaluation with our Practice Group Leaders for commercial litigation, insolvency, corporate restructuring, or personal injury.",
};

interface Props {
  searchParams: Promise<{ matter?: string; practice?: string; attorney?: string }>;
}

export default async function ConsultationPage({ searchParams }: Props) {
  const { matter, practice, attorney } = await searchParams;
  const initialCategory = matter || practice || "Commercial Litigation & Dispute Resolution";

  return (
    <div className="bg-legal-cream-50 min-h-screen">
      {/* Header */}
      <section className="bg-legal-navy-950 text-white py-16 border-b border-legal-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase font-bold tracking-widest text-legal-gold-400">
              Confidential Chambers Intake
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Request a Formal Case Evaluation
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              Direct strategic assessment by Senior Partners. Our intake committee performs swift conflict clearance and responds within two business hours.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Consultation Form */}
            <div className="lg:col-span-8">
              {attorney && (
                <div className="mb-6 p-4 rounded bg-legal-navy-900 border border-legal-gold-500/40 text-xs text-slate-200 flex items-center justify-between">
                  <span>
                    Consultation requested directly with: <strong className="text-legal-gold-400">{attorney}</strong>
                  </span>
                </div>
              )}
              <ConsultationForm initialMatterType={initialCategory} />
            </div>

            {/* Right: What to Expect & Intake Protocol */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-subtle space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-legal-gold-600 block">
                  Intake Protocol
                </span>
                <h2 className="font-serif text-xl font-bold text-legal-navy-950">
                  What Happens Next?
                </h2>

                <div className="space-y-4 text-xs text-slate-600">
                  <div className="flex items-start space-x-3">
                    <span className="w-5 h-5 rounded-full bg-legal-navy-950 text-legal-gold-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <div>
                      <strong className="text-slate-900 block">Conflict-of-Interest Search:</strong>
                      <span>We ensure no adversarial conflicts exist with existing corporate retainers.</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <span className="w-5 h-5 rounded-full bg-legal-navy-950 text-legal-gold-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <div>
                      <strong className="text-slate-900 block">Senior Counsel Review:</strong>
                      <span>Your matter is reviewed directly by a Practice Group Leader in that subject area.</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <span className="w-5 h-5 rounded-full bg-legal-navy-950 text-legal-gold-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                      3
                    </span>
                    <div>
                      <strong className="text-slate-900 block">Strategic Evaluation Session:</strong>
                      <span>We schedule an in-person conference at chambers or secure encrypted video call.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Injunction Hotline */}
              <div className="bg-legal-navy-950 text-white p-6 rounded-sm border border-legal-navy-800 space-y-3">
                <div className="flex items-center space-x-2 text-legal-gold-400 text-xs font-bold uppercase tracking-widest">
                  <Clock className="w-4 h-4" />
                  <span>Time-Critical Injunctions</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-white">
                  Facing Immediate Asset Seizure or Foreclosure?
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  For emergency ex-parte applications, vessel arrests, or urgent creditor debt freezes, call our chambers priority desk directly:
                </p>
                <a
                  href="tel:+23414538900"
                  className="block text-center bg-legal-gold-500 hover:bg-legal-gold-600 text-legal-navy-950 font-bold py-3 rounded-sm uppercase tracking-wider text-xs transition font-mono"
                >
                  Call +234 (01) 453-8900
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
