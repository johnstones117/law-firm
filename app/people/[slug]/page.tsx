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
  Briefcase,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const attorneys = await prisma.attorney.findMany({
    where: { isPublished: true },
    select: { slug: true },
  });
  return attorneys.map((attorney) => ({
    slug: attorney.slug,
  }));
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
  const practiceAreaNames = attorney.practiceAreas.map(
    ({ practiceArea }) => practiceArea.name
  );

  // Fetch articles authored by this attorney or firm, and relevant case studies
  const [relatedArticles, relatedCaseStudies] = await Promise.all([
    prisma.article.findMany({
      where: {
        isPublished: true,
        OR: [
          { authorName: { contains: attorney.fullName } },
          { isFeatured: true },
        ],
      },
      take: 2,
    }),
    prisma.caseStudy.findMany({
      where: {
        isPublished: true,
        ...(practiceAreaNames.length > 0
          ? { practiceAreaName: { in: practiceAreaNames } }
          : {}),
      },
      orderBy: { displayOrder: "asc" },
      take: 2,
    }),
  ]);

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

              <p className="text-slate-300 text-sm leading-relaxed max-w-2xl pt-1">
                {attorney.bio}
              </p>

              <div className="flex flex-wrap gap-6 pt-2 text-xs text-slate-300">
                <span className="flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1.5 text-legal-gold-400" />
                  {attorney.officeLocation}
                </span>
                <a
                  href={`tel:${attorney.phone.replace(/[^+\d]/g, "")}`}
                  className="flex items-center font-mono hover:text-legal-gold-400 transition"
                >
                  <Phone className="w-3.5 h-3.5 mr-1.5 text-legal-gold-400" />
                  {attorney.phone}
                </a>
                <a
                  href={`mailto:${attorney.email}`}
                  className="flex items-center hover:text-legal-gold-400 transition"
                >
                  <Mail className="w-3.5 h-3.5 mr-1.5 text-legal-gold-400" />
                  {attorney.email}
                </a>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <Link
                  href={`/consultation?attorney=${encodeURIComponent(attorney.fullName)}`}
                  className="bg-legal-gold-500 hover:bg-legal-gold-600 text-legal-navy-950 font-bold px-6 py-3 rounded-sm uppercase tracking-wider text-xs transition shadow-md"
                >
                  Request Consultation With Counsel
                </Link>
                <a
                  href={`mailto:${attorney.email}`}
                  className="border border-legal-gold-500/50 hover:border-legal-gold-400 text-white font-semibold px-6 py-3 rounded-sm uppercase tracking-wider text-xs transition inline-flex items-center"
                >
                  <Mail className="w-3.5 h-3.5 mr-2 text-legal-gold-400" />
                  Direct Chambers Inquiry
                </a>
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

              {/* Honors & Professional Qualifications */}
              {qualifications.length > 0 && (
                <div className="bg-white p-8 rounded-sm border border-slate-200 shadow-subtle space-y-4">
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-legal-gold-600" />
                    <span className="text-xs font-bold uppercase tracking-widest text-legal-gold-600">
                      Distinctions &amp; Standing
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-legal-navy-950">
                    Honors, Recognition &amp; Leadership
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {qualifications.map((qual, idx) => (
                      <div
                        key={idx}
                        className="flex items-start space-x-3 p-4 rounded-sm bg-legal-cream-50 border border-legal-gold-200/60"
                      >
                        <Award className="w-4 h-4 text-legal-gold-600 flex-shrink-0 mt-0.5" />
                        <span className="text-xs font-semibold text-legal-navy-950 leading-snug">
                          {qual}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Representative Matters */}
              {relatedCaseStudies.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-2xl font-bold text-legal-navy-950 flex items-center">
                      <Briefcase className="w-5 h-5 mr-2 text-legal-gold-600" />
                      Representative Matters &amp; Case Highlights
                    </h3>
                    <Link
                      href="/case-studies"
                      className="text-xs font-bold uppercase tracking-wider text-legal-gold-700 hover:underline"
                    >
                      All Matters &rarr;
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {relatedCaseStudies.map((cs) => (
                      <div
                        key={cs.id}
                        className="bg-white p-6 rounded-sm border border-slate-200 shadow-subtle space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-legal-gold-700 bg-legal-cream-100 px-2.5 py-1 rounded">
                            {cs.practiceAreaName}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            {cs.matterYear} &bull; {cs.industry}
                          </span>
                        </div>
                        <h4 className="font-serif text-lg font-bold text-legal-navy-950">
                          {cs.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {cs.summary}
                        </p>
                        <div className="pt-2 border-t border-slate-100 text-xs text-legal-navy-900">
                          <strong className="text-legal-gold-700 uppercase tracking-wider text-[10px] mr-2">
                            Outcome:
                          </strong>
                          {cs.outcome}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Insights */}
              {relatedArticles.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl font-bold text-legal-navy-950 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-legal-gold-600" />
                    Publications &amp; Legal Insights
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
                    <span>Bar Admissions &amp; Courts</span>
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
                    <span>Academic Credentials</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-600">
                    {education.map((edu, i) => (
                      <li key={i} className="leading-snug flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-legal-gold-500 mt-1.5 flex-shrink-0" />
                        <span>{edu}</span>
                      </li>
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

              {/* Direct Chambers Card */}
              <div className="bg-legal-navy-950 text-white p-6 rounded-sm border border-legal-navy-800 space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-legal-gold-400 block">
                  Chambers Consultation
                </span>
                <h4 className="font-serif text-lg font-bold">
                  Engage {attorney.fullName}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  To instruct counsel on a commercial dispute, corporate transaction, or urgent legal matter, contact our intake desk directly.
                </p>
                <div className="space-y-2 text-xs text-slate-300 pt-1">
                  <div className="flex items-center">
                    <Phone className="w-3.5 h-3.5 mr-2 text-legal-gold-400" />
                    <span>{attorney.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-3.5 h-3.5 mr-2 text-legal-gold-400" />
                    <span>{attorney.email}</span>
                  </div>
                </div>
                <Link
                  href={`/consultation?attorney=${encodeURIComponent(attorney.fullName)}`}
                  className="w-full bg-legal-gold-500 hover:bg-legal-gold-600 text-legal-navy-950 font-bold py-2.5 px-4 rounded-sm uppercase tracking-wider text-xs transition block text-center"
                >
                  Schedule Case Evaluation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
