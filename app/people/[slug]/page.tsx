import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Scale,
  Shield,
  Award,
  BookOpen,
  GraduationCap,
  Globe,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const attorney = await prisma.attorney.findUnique({
    where: { slug },
  });

  if (!attorney) return { title: "Attorney Not Found" };

  return {
    title: `${attorney.fullName} | ${attorney.title}`,
    description: attorney.bio,
  };
}

export default async function AttorneyProfilePage({ params }: Props) {
  const { slug } = await params;

  const attorney = await prisma.attorney.findUnique({
    where: { slug },
    include: {
      practiceAreas: {
        include: { practiceArea: true },
      },
    },
  });

  if (!attorney) {
    notFound();
  }

  const admissions: string[] = JSON.parse(attorney.admissions || "[]");
  const education: string[] = JSON.parse(attorney.education || "[]");
  const qualifications: string[] = JSON.parse(attorney.qualifications || "[]");
  const languages: string[] = JSON.parse(attorney.languages || "[]");

  // Fetch articles authored by this attorney or firm
  const relatedArticles = await prisma.article.findMany({
    where: {
      isPublished: true,
      OR: [
        { authorName: { contains: attorney.fullName } },
        { isFeatured: true },
      ],
    },
    take: 2,
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Header Profile Hero */}
      <section className="bg-legal-navy-950 text-white py-16 border-b border-legal-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/people"
            className="text-xs text-legal-gold-400 hover:underline uppercase tracking-wider font-semibold inline-flex items-center mb-8"
          >
            &larr; Return to Attorney Directory
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4">
              <div className="relative h-96 w-full rounded-sm overflow-hidden border-2 border-legal-gold-500/40 shadow-2xl">
                <Image
                  src={attorney.photoUrl}
                  alt={attorney.fullName}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs uppercase font-bold tracking-widest text-legal-gold-400">
                {attorney.title}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                {attorney.fullName}
              </h1>
              <p className="text-legal-gold-300 font-semibold text-sm">
                {attorney.designation}
              </p>

              <div className="flex flex-wrap gap-6 pt-2 text-xs text-slate-300">
                <span className="flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1.5 text-legal-gold-400" />
                  {attorney.officeLocation}
                </span>
                <span className="flex items-center font-mono">
                  <Phone className="w-3.5 h-3.5 mr-1.5 text-legal-gold-400" />
                  {attorney.phone}
                </span>
                <span className="flex items-center">
                  <Mail className="w-3.5 h-3.5 mr-1.5 text-legal-gold-400" />
                  {attorney.email}
                </span>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <Link
                  href={`/consultation?attorney=${encodeURIComponent(attorney.fullName)}`}
                  className="bg-legal-gold-500 hover:bg-legal-gold-600 text-legal-navy-950 font-bold px-6 py-3 rounded-sm uppercase tracking-wider text-xs transition shadow-md"
                >
                  Request Consultation With Counsel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Biography & Credentials */}
      <section className="py-16 bg-legal-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Biography Column */}
            <div className="lg:col-span-8 space-y-10">
              <div className="bg-white p-8 rounded-sm border border-slate-200 shadow-subtle space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-legal-gold-600 block">
                  Professional Biography
                </span>
                <h2 className="font-serif text-2xl font-bold text-legal-navy-950">
                  Advocacy &amp; Strategic Experience
                </h2>
                <div className="text-slate-700 text-sm leading-relaxed space-y-4 whitespace-pre-line">
                  {attorney.detailedBio || attorney.bio}
                </div>
              </div>

              {/* Related Insights */}
              {relatedArticles.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl font-bold text-legal-navy-950">
                    Publications &amp; Insights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedArticles.map((art) => (
                      <Link
                        key={art.id}
                        href={`/insights/${art.slug}`}
                        className="bg-white p-5 rounded-sm border border-slate-200 hover:border-legal-gold-500 transition block group"
                      >
                        <span className="text-[10px] font-bold uppercase tracking-wider text-legal-gold-700 block mb-1">
                          {art.category.replace(/_/g, " ")}
                        </span>
                        <strong className="font-serif text-base font-bold text-legal-navy-950 group-hover:text-legal-gold-700 transition line-clamp-2">
                          {art.title}
                        </strong>
                        <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                          {art.summary}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Credentials Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* Practice Areas */}
              {attorney.practiceAreas.length > 0 && (
                <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-subtle space-y-3">
                  <div className="flex items-center space-x-2 text-legal-navy-950 font-serif font-bold text-base">
                    <Scale className="w-4 h-4 text-legal-gold-600" />
                    <span>Practice Areas</span>
                  </div>
                  <ul className="space-y-2 text-xs">
                    {attorney.practiceAreas.map(({ practiceArea }) => (
                      <li key={practiceArea.id}>
                        <Link
                          href={`/practice-areas/${practiceArea.slug}`}
                          className="text-slate-700 hover:text-legal-gold-700 hover:underline flex items-center font-medium"
                        >
                          <ArrowRight className="w-3 h-3 mr-1.5 text-legal-gold-600" />
                          {practiceArea.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Bar Admissions */}
              {admissions.length > 0 && (
                <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-subtle space-y-3">
                  <div className="flex items-center space-x-2 text-legal-navy-950 font-serif font-bold text-base">
                    <Shield className="w-4 h-4 text-legal-gold-600" />
                    <span>Bar Admissions</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {admissions.map((adm, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-legal-gold-600 flex-shrink-0 mt-0.5" />
                        <span>{adm}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Education */}
              {education.length > 0 && (
                <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-subtle space-y-3">
                  <div className="flex items-center space-x-2 text-legal-navy-950 font-serif font-bold text-base">
                    <GraduationCap className="w-4 h-4 text-legal-gold-600" />
                    <span>Education</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {education.map((edu, i) => (
                      <li key={i} className="leading-snug">{edu}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Languages */}
              {languages.length > 0 && (
                <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-subtle space-y-3">
                  <div className="flex items-center space-x-2 text-legal-navy-950 font-serif font-bold text-base">
                    <Globe className="w-4 h-4 text-legal-gold-600" />
                    <span>Languages</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {languages.map((lang, i) => (
                      <span
                        key={i}
                        className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
