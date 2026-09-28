import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { MapPin, Phone, Mail, Clock, ExternalLink, Shield } from "lucide-react";

export const metadata = {
  title: "Global Chambers & Office Locations",
  description:
    "Explore Sterling & Crest's principal chambers in Victoria Island Lagos and Abuja Central Business District, alongside our international liaison offices in London and Texas.",
};

export default async function OfficesPage() {
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
              International Chambers Directory
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Our Offices Across the United States &amp; Key Global Financial Centers
            </h1>
            <p className="text-slate-300 text-base leading-relaxed font-light">
              Connecting deep federal and state court expertise in New York, Washington D.C., Chicago, and Dallas with international cross-border commercial reach.
            </p>
          </div>
        </div>
      </section>

      {/* Offices Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offices.map((off) => (
              <div
                key={off.id}
                className="bg-white border border-slate-200 p-8 rounded-sm shadow-subtle space-y-6"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-legal-navy-950">
                      {off.city} Chambers
                    </h2>
                    <span className="text-xs text-slate-500 font-medium">
                      {off.country} {off.isPrimary && "• Principal Chambers"}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-legal-gold-700 uppercase tracking-widest bg-legal-cream-200 px-3 py-1 rounded">
                    {off.country}
                  </span>
                </div>

                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 mr-3 text-legal-gold-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block font-semibold mb-0.5">Address:</strong>
                      <span>
                        {off.addressLine1}
                        {off.addressLine2 && <>, {off.addressLine2}</>}
                        {off.postalCode && <>, {off.postalCode}</>}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="w-4 h-4 mr-3 text-legal-gold-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block font-semibold mb-0.5">Telephone:</strong>
                      <a href={`tel:${off.phone}`} className="font-mono text-legal-navy-950 hover:text-legal-gold-700 font-semibold">
                        {off.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="w-4 h-4 mr-3 text-legal-gold-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block font-semibold mb-0.5">Chambers Email:</strong>
                      <a href={`mailto:${off.email}`} className="text-legal-navy-950 hover:text-legal-gold-700">
                        {off.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-4 h-4 mr-3 text-legal-gold-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block font-semibold mb-0.5">Operating Hours:</strong>
                      <span>{off.hours}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={off.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase font-bold tracking-wider text-legal-navy-950 hover:text-legal-gold-600 transition inline-flex items-center"
                  >
                    <span>View Map Directions</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                  </a>

                  <Link
                    href={`/consultation?office=${encodeURIComponent(off.city)}`}
                    className="bg-legal-navy-950 hover:bg-legal-navy-800 text-legal-gold-400 font-bold px-4 py-2 rounded-sm uppercase tracking-wider text-xs transition"
                  >
                    Book at this Office
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
