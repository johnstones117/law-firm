import Link from "next/link";
import Image from "next/image";
import { Scale, ArrowRight, Shield, MapPin, Mail, Phone } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Partners & Advocates | Our People",
  description:
    "Meet the Senior Advocates of Nigeria, Managing Partners, and specialized courtroom advocates of Crest & Sterling Alliance.",
};

export default async function PeoplePage() {
  const attorneys = await prisma.attorney.findMany({
    where: { isPublished: true },
    orderBy: { displayOrder: "asc" },
    include: {
      practiceAreas: {
        include: { practiceArea: true },
      },
    },
  });

  return (
    <div className="bg-legal-cream-50 min-h-screen">
      {/* Header */}
      <section className="bg-legal-navy-950 text-white py-20 border-b border-legal-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-legal-gold-400">
              Chambers Directory &bull; Legal Counsel
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Our Partners &amp; Senior Counsel
            </h1>
            <p className="text-slate-300 text-base leading-relaxed font-light">
              Distinguished Senior Advocates of Nigeria (SAN), commercial arbitrators, and battle-tested trial advocates dedicated to protecting sovereign and commercial interests.
            </p>
          </div>
        </div>
      </section>

      {/* Directory Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {attorneys.map((attorney) => (
              <div
                key={attorney.id}
                className="bg-white border border-slate-200 rounded-sm overflow-hidden legal-card-hover flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-80 w-full bg-slate-200">
                    <Image
                      src={attorney.photoUrl}
                      alt={attorney.fullName}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-legal-navy-950/85 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-[11px] font-semibold text-legal-gold-400 uppercase tracking-widest block">
                        {attorney.title}
                      </span>
                      <h2 className="font-serif text-xl font-bold text-white leading-snug">
                        {attorney.fullName}
                      </h2>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <span className="text-xs font-semibold text-legal-navy-800 block mb-1">
                        {attorney.designation}
                      </span>
                      <span className="text-[11px] text-slate-500 flex items-center font-medium">
                        <MapPin className="w-3 h-3 mr-1 text-legal-gold-600" />
                        {attorney.officeLocation}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {attorney.bio}
                    </p>

                    {attorney.practiceAreas.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {attorney.practiceAreas.map(({ practiceArea }) => (
                          <span
                            key={practiceArea.id}
                            className="bg-legal-cream-100 text-legal-navy-900 border border-legal-gold-200/80 text-[10px] font-medium px-2 py-0.5 rounded"
                          >
                            {practiceArea.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100">
                  <div className="pt-4 flex items-center justify-between">
                    <Link
                      href={`/people/${attorney.slug}`}
                      className="text-xs uppercase font-bold tracking-wider text-legal-navy-950 hover:text-legal-gold-600 transition flex items-center"
                    >
                      <span>View Full Profile</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>

                    <Link
                      href={`mailto:${attorney.email}`}
                      className="text-slate-400 hover:text-legal-gold-600 transition"
                      aria-label={`Email ${attorney.fullName}`}
                    >
                      <Mail className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
