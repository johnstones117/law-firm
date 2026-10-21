import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Clock, Calendar, Search } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Insights, Legal Updates & Publications",
  description:
    "Authoritative legal commentary, regulatory alerts, and judicial analysis from the partners of Crest & Sterling Alliance.",
};

interface Props {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export default async function InsightsPage({ searchParams }: Props) {
  const { category, q } = await searchParams;

  const whereClause: any = { isPublished: true };
  if (category && category !== "ALL") {
    whereClause.category = category;
  }
  if (q) {
    whereClause.OR = [
      { title: { contains: q } },
      { summary: { contains: q } },
    ];
  }

  const articles = await prisma.article.findMany({
    where: whereClause,
    orderBy: { publishedAt: "desc" },
  });

  const categories = [
    { label: "All Insights", value: "ALL" },
    { label: "Legal Updates", value: "LEGAL_UPDATE" },
    { label: "Articles", value: "ARTICLE" },
    { label: "Client Alerts", value: "CLIENT_ALERT" },
    { label: "Publications", value: "PUBLICATION" },
  ];

  return (
    <div className="bg-legal-cream-50 min-h-screen">
      {/* Header */}
      <section className="bg-legal-navy-950 text-white py-20 border-b border-legal-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-legal-gold-400">
              Thought Leadership &bull; Precedent Analysis
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Insights, Client Alerts &amp; Regulatory Briefs
            </h1>
            <p className="text-slate-300 text-base leading-relaxed font-light">
              Critical analysis of Supreme Court decisions, Central Bank directives, Petroleum Industry Act developments, and corporate restructuring mechanisms.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter Bar */}
      <div className="border-b border-slate-200 bg-white sticky top-20 z-30 shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between py-4 gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = (category || "ALL") === cat.value;
              return (
                <Link
                  key={cat.value}
                  href={cat.value === "ALL" ? "/insights" : `/insights?category=${cat.value}`}
                  className={`text-xs font-semibold px-3.5 py-1.5 rounded-sm uppercase tracking-wider transition ${
                    isActive
                      ? "bg-legal-navy-950 text-legal-gold-400 font-bold"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {cat.label}
                </Link>
              );
            })}
          </div>

          <form action="/insights" method="GET" className="flex items-center">
            <div className="relative">
              <input
                type="text"
                name="q"
                defaultValue={q || ""}
                placeholder="Search articles..."
                className="text-xs px-3.5 py-1.5 pr-8 bg-slate-50 border border-slate-300 rounded-sm focus:border-legal-gold-500 focus:outline-none w-48 sm:w-64"
              />
              <button
                type="submit"
                aria-label="Submit search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-legal-navy-950"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {articles.length === 0 ? (
            <div className="text-center py-20 bg-white rounded border border-slate-200 p-8">
              <p className="text-slate-500 text-sm">
                No legal insights match the selected filter.
              </p>
              <Link
                href="/insights"
                className="mt-4 inline-block text-xs uppercase font-bold text-legal-gold-700 underline"
              >
                Clear Filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((art) => (
                <div
                  key={art.id}
                  className="bg-white border border-slate-200 rounded-sm overflow-hidden legal-card-hover flex flex-col justify-between"
                >
                  <div className="relative h-52 w-full bg-slate-200">
                    <Image
                      src={art.coverImage}
                      alt={art.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-legal-navy-950/90 text-legal-gold-400 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                      {art.category.replace(/_/g, " ")}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                        <span>{formatDate(art.publishedAt)}</span>
                        <span>{art.readTime}</span>
                      </div>
                      <h2 className="font-serif text-lg font-bold text-legal-navy-950 leading-snug line-clamp-2">
                        {art.title}
                      </h2>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {art.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 font-medium">
                        By {art.authorName}
                      </span>
                      <Link
                        href={`/insights/${art.slug}`}
                        className="text-xs uppercase font-bold tracking-wider text-legal-gold-700 hover:text-legal-navy-950 transition flex items-center"
                      >
                        <span>Read</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
