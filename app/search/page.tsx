"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Search as SearchIcon, X, ArrowRight, User, Scale, BookOpen, HelpCircle } from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{
    totalCount: number;
    results: {
      attorneys: any[];
      practiceAreas: any[];
      articles: any[];
      caseStudies: any[];
      faqs: any[];
    };
  } | null>(null);

  const fetchResults = async (searchQ: string) => {
    if (!searchQ || searchQ.trim().length < 2) {
      setData(null);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQ)}`);
      const json = await res.json();
      setData(json);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      fetchResults(initialQuery);
    }
  }, [initialQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
    fetchResults(query);
  };

  const handleClear = () => {
    setQuery("");
    setData(null);
    router.push("/search");
  };

  return (
    <>
      {/* Header */}
      <section className="bg-legal-navy-950 text-white py-16 border-b border-legal-navy-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase font-bold tracking-widest text-legal-gold-400 block mb-2">
            Chambers Directory &bull; Publications &bull; Precedents
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
            Site-Wide Legal Search
          </h1>

          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search attorneys, practice areas, articles, case studies..."
              className="w-full px-5 py-4 pl-12 pr-28 rounded-sm bg-legal-navy-900 border border-legal-gold-600/40 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-legal-gold-400 focus:ring-1 focus:ring-legal-gold-400 transition"
            />
            <SearchIcon className="w-5 h-5 text-legal-gold-400 absolute left-4" />

            <div className="absolute right-3 flex items-center space-x-2">
              {query && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1 rounded text-slate-400 hover:text-white"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="bg-legal-gold-500 hover:bg-legal-gold-600 text-legal-navy-950 font-bold px-4 py-2 rounded-sm uppercase tracking-wider text-xs transition"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Results Container */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="text-center py-12 text-slate-500 text-sm">
              <div className="w-8 h-8 border-2 border-legal-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              Searching chambers registry...
            </div>
          )}

          {!loading && data && data.totalCount === 0 && (
            <div className="bg-white border border-slate-200 p-8 rounded-sm text-center space-y-3">
              <h3 className="font-serif text-xl font-bold text-legal-navy-950">
                No Results Found
              </h3>
              <p className="text-xs text-slate-600">
                No attorneys, practice areas, or publications matched your query &ldquo;{query}&rdquo;.
              </p>
              <div className="pt-2">
                <Link
                  href="/consultation"
                  className="text-xs font-bold text-legal-gold-700 hover:underline uppercase tracking-wider"
                >
                  Contact Chambers Directly for Assistance &rarr;
                </Link>
              </div>
            </div>
          )}

          {!loading && data && data.totalCount > 0 && (
            <div className="space-y-10">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between text-xs text-slate-600">
                <span>
                  Found <strong>{data.totalCount}</strong> matching entries for &ldquo;{query}&rdquo;
                </span>
              </div>

              {/* Practice Areas */}
              {data.results.practiceAreas.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-lg font-bold text-legal-navy-950 flex items-center">
                    <Scale className="w-4 h-4 mr-2 text-legal-gold-600" />
                    Practice Areas ({data.results.practiceAreas.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.results.practiceAreas.map((pa: any) => (
                      <Link
                        key={pa.id}
                        href={`/practice-areas/${pa.slug}`}
                        className="bg-white p-5 rounded-sm border border-slate-200 hover:border-legal-gold-500 transition block group"
                      >
                        <strong className="font-serif text-base font-bold text-legal-navy-950 group-hover:text-legal-gold-700 transition block">
                          {pa.name}
                        </strong>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{pa.summary}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Attorneys */}
              {data.results.attorneys.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-lg font-bold text-legal-navy-950 flex items-center">
                    <User className="w-4 h-4 mr-2 text-legal-gold-600" />
                    Attorneys &amp; Counsel ({data.results.attorneys.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.results.attorneys.map((att: any) => (
                      <Link
                        key={att.id}
                        href={`/people/${att.slug}`}
                        className="bg-white p-5 rounded-sm border border-slate-200 hover:border-legal-gold-500 transition block group"
                      >
                        <span className="text-[10px] text-legal-gold-700 font-bold uppercase tracking-wider block">
                          {att.title}
                        </span>
                        <strong className="font-serif text-base font-bold text-legal-navy-950 group-hover:text-legal-gold-700 transition block">
                          {att.fullName}
                        </strong>
                        <span className="text-xs text-slate-500 block mt-1">{att.designation}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles & Publications */}
              {data.results.articles.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-lg font-bold text-legal-navy-950 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-legal-gold-600" />
                    Insights &amp; Publications ({data.results.articles.length})
                  </h3>
                  <div className="space-y-3">
                    {data.results.articles.map((art: any) => (
                      <Link
                        key={art.id}
                        href={`/insights/${art.slug}`}
                        className="bg-white p-5 rounded-sm border border-slate-200 hover:border-legal-gold-500 transition block group"
                      >
                        <span className="text-[10px] font-bold text-legal-gold-700 uppercase tracking-wider block mb-1">
                          {art.category.replace(/_/g, " ")} &bull; By {art.authorName}
                        </span>
                        <strong className="font-serif text-base font-bold text-legal-navy-950 group-hover:text-legal-gold-700 transition block">
                          {art.title}
                        </strong>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2">{art.summary}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs */}
              {data.results.faqs.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-lg font-bold text-legal-navy-950 flex items-center">
                    <HelpCircle className="w-4 h-4 mr-2 text-legal-gold-600" />
                    FAQs ({data.results.faqs.length})
                  </h3>
                  <div className="space-y-3">
                    {data.results.faqs.map((f: any) => (
                      <div key={f.id} className="bg-white p-5 rounded-sm border border-slate-200">
                        <strong className="text-sm text-legal-navy-950 block mb-1">
                          {f.question}
                        </strong>
                        <p className="text-xs text-slate-600">{f.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="bg-legal-cream-50 min-h-screen">
      <Suspense
        fallback={
          <div className="text-center py-20 text-slate-500">
            <div className="w-8 h-8 border-2 border-legal-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            Loading search index...
          </div>
        }
      >
        <SearchContent />
      </Suspense>
    </div>
  );
}
