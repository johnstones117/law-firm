import { prisma } from "@/lib/prisma";
import ContactForm from "@/components/ContactForm";
import { Phone, Mail, MapPin, Clock, Shield, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Contact Chambers | Principal & International Offices",
  description:
    "Direct contact details, telephone numbers, physical addresses, and interactive inquiry form for Crest & Sterling Alliance.",
};

export default async function ContactPage() {
  const offices = await prisma.office.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="bg-legal-cream-50 min-h-screen">
      {/* Header */}
      <section className="bg-legal-navy-950 text-white py-20 border-b border-legal-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-legal-gold-400">
              Direct Chambers Engagement
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Contact Our Principal &amp; International Chambers
            </h1>
            <p className="text-slate-300 text-base leading-relaxed font-light">
              We maintain principal litigation chambers in New York and Washington D.C., with additional offices in Chicago and Dallas. 24/7 emergency intake available for time-sensitive court matters.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Form Column */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* Offices Column */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="font-serif text-2xl font-bold text-legal-navy-950">
                Chambers Locations
              </h2>

              <div className="space-y-4">
                {offices.map((off) => (
                  <div
                    key={off.id}
                    className="bg-white border border-slate-200 p-6 rounded-sm shadow-subtle space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <h3 className="font-serif text-lg font-bold text-legal-navy-950">
                        {off.city} {off.isPrimary && <span className="text-xs text-legal-gold-600 font-sans font-normal">(Principal Chambers)</span>}
                      </h3>
                      <span className="text-[10px] font-semibold text-legal-navy-900 bg-legal-cream-200 px-2 py-0.5 rounded">
                        {off.country}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 space-y-1.5">
                      <p className="flex items-start">
                        <MapPin className="w-3.5 h-3.5 mr-2 text-legal-gold-600 flex-shrink-0 mt-0.5" />
                        <span>
                          {off.addressLine1}
                          {off.addressLine2 && <>, {off.addressLine2}</>}
                          {off.postalCode && <>, {off.postalCode}</>}
                        </span>
                      </p>
                      <p className="flex items-center">
                        <Phone className="w-3.5 h-3.5 mr-2 text-legal-gold-600 flex-shrink-0" />
                        <a href={`tel:${off.phone}`} className="hover:text-legal-gold-700 font-mono">
                          {off.phone}
                        </a>
                      </p>
                      <p className="flex items-center">
                        <Mail className="w-3.5 h-3.5 mr-2 text-legal-gold-600 flex-shrink-0" />
                        <a href={`mailto:${off.email}`} className="hover:text-legal-gold-700">
                          {off.email}
                        </a>
                      </p>
                      <p className="flex items-center text-slate-500">
                        <Clock className="w-3.5 h-3.5 mr-2 text-legal-gold-600 flex-shrink-0" />
                        <span>{off.hours}</span>
                      </p>
                    </div>

                    <div className="pt-2">
                      <a
                        href={off.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-legal-gold-700 hover:text-legal-navy-950 font-bold uppercase tracking-wider inline-flex items-center"
                      >
                        <span>Open Directions in Google Maps</span>
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
