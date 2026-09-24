import Link from "next/link";
import Image from "next/image";
import {
  Scale,
  Shield,
  Award,
  Users,
  Building2,
  CheckCircle2,
  ArrowRight,
  Gavel,
  BookOpen,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "About Our Firm & Heritage",
  description:
    "Discover the history, leadership, and unyielding principles that define Sterling & Crest Legal Practitioners across Lagos, Abuja, London, and Texas.",
};

export default async function AboutPage() {
  const offices = await prisma.office.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="bg-white">
      {/* Editorial Header */}
      <section className="bg-legal-navy-950 text-white py-20 border-b border-legal-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 bg-legal-navy-900 border border-legal-gold-500/30 px-3 py-1 rounded-sm">
              <Shield className="w-3.5 h-3.5 text-legal-gold-400" />
              <span className="text-xs uppercase tracking-widest text-legal-gold-300 font-semibold">
                Established 1994 &bull; Global Chambers
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              A Legacy of Uncompromising Trial Advocacy and Commercial Wisdom
            </h1>
            <p className="text-slate-300 text-base leading-relaxed font-light">
              Founded over three decades ago, Sterling &amp; Crest has grown into one of Africa&rsquo;s most formidable legal practices, combining ruthless courtroom tenacity with deep cross-border transactional acumen.
            </p>
          </div>
        </div>
      </section>

      {/* Narrative & Philosophy */}
      <section className="py-20 bg-legal-cream-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-legal-gold-600 block">
                Founding Principles
              </span>
              <h2 className="font-serif text-3xl font-bold text-legal-navy-950 leading-snug">
                Built to Protect Sovereign Capital, Safeguard Enterprises, and Champion Victims
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Under the visionary leadership of Chief Adebayo Sterling SAN and Victoria Crest, the firm was established with a singular directive: to provide clients in West Africa and international investors with the same caliber of representation found in London, New York, or Paris.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Unlike traditional, fragmented law offices, our chambers operates as an integrated multidisciplinary force. When a corporate borrower faces unexpected receivership, our dispute resolution team stays bank enforcement while our restructuring partners renegotiate facility covenants. When an industrial casualty harms livelihoods, our trial lawyers pursue justice with uncompromising rigor.
              </p>

              <div className="pt-2">
                <Link
                  href="/people"
                  className="inline-flex items-center font-bold text-xs uppercase tracking-wider text-legal-navy-950 hover:text-legal-gold-600 transition"
                >
                  <span>Meet Our Partners &amp; Advocates</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="bg-white p-8 border border-slate-200 rounded-sm shadow-subtle space-y-4">
                <div className="w-10 h-10 rounded bg-legal-navy-950 text-legal-gold-400 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-legal-navy-950">
                  The Sterling &amp; Crest Guarantees
                </h3>
                <ul className="space-y-3 text-xs text-slate-600">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-legal-gold-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Direct Partner Accessibility:</strong> Clients communicate directly with seasoned partners, never being handed off to unsupervised juniors.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-legal-gold-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Trial-Ready Philosophy:</strong> We prepare every single case for trial from day one, forcing opposing parties into positions of weakness.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-legal-gold-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Straight Lines, Not Circles:</strong> We give unvarnished, strategic truth rather than burying clients in evasive legal jargon.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Chambers Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-legal-gold-600">
              International Reach
            </span>
            <h2 className="font-serif text-3xl font-bold text-legal-navy-950">
              Chambers &amp; Referral Destinations
            </h2>
            <p className="text-slate-600 text-sm">
              Headquartered in Lagos with strategic chambers in Abuja, London, and Dallas, Texas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((off) => (
              <div
                key={off.id}
                className="bg-legal-cream-50 border border-slate-200 p-6 rounded-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-legal-navy-950">
                    {off.city}
                  </h3>
                  <span className="text-[10px] font-semibold text-legal-gold-700 uppercase tracking-widest bg-legal-cream-200 px-2 py-0.5 rounded">
                    {off.country}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {off.addressLine1}
                  {off.addressLine2 && <>, {off.addressLine2}</>}
                </p>
                <p className="text-xs font-mono text-legal-navy-900 font-semibold pt-1">
                  {off.phone}
                </p>
                <p className="text-[11px] text-slate-500">{off.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
