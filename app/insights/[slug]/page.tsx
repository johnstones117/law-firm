import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  User,
  Share2,
  ArrowRight,
  Shield,
  Linkedin,
  Twitter,
  Mail,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug },
  });

  if (!article) return { title: "Insight Not Found" };

  return {
    title: `${article.title} | Legal Insights`,
    description: article.summary,
  };
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params;

  const article = await prisma.article.findUnique({
    where: { slug },
  });

  if (!article) {
    notFound();
  }

  const relatedArticles = await prisma.article.findMany({
    where: {
      isPublished: true,
      NOT: { id: article.id },
    },
    take: 3,
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Article Header */}
      <section className="bg-legal-navy-950 text-white py-16 border-b border-legal-navy-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/insights"
            className="text-xs text-legal-gold-400 hover:underline uppercase tracking-wider font-semibold inline-flex items-center mb-6"
          >
            &larr; Return to All Insights
          </Link>

          <div className="space-y-4">
            <span className="bg-legal-gold-500 text-legal-navy-950 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded inline-block">
              {article.category.replace(/_/g, " ")}
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-300">
              <span className="flex items-center">
                <User className="w-3.5 h-3.5 mr-1.5 text-legal-gold-400" />
                {article.authorName} &bull; {article.authorTitle}
              </span>
              <span className="flex items-center font-mono">
                <Calendar className="w-3.5 h-3.5 mr-1.5 text-legal-gold-400" />
                {formatDate(article.publishedAt)}
              </span>
              <span className="flex items-center font-mono">
                <Clock className="w-3.5 h-3.5 mr-1.5 text-legal-gold-400" />
                {article.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cover Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="relative h-72 sm:h-96 w-full rounded overflow-hidden shadow-2xl border-2 border-white">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Article Body */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-slate lg:prose-lg max-w-none text-slate-700 leading-relaxed font-light space-y-6">
          <div className="bg-legal-cream-50 p-6 rounded border-l-4 border-legal-gold-500 text-sm font-medium text-slate-800 not-italic">
            {article.summary}
          </div>

          <div className="whitespace-pre-line text-base text-slate-800 leading-relaxed space-y-4">
            {article.content}
          </div>
        </div>

        {/* Share & Legal Notice */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-xs text-slate-600 font-semibold">
            <Share2 className="w-4 h-4 text-legal-navy-950" />
            <span>Share This Legal Update:</span>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.href : ""
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-legal-navy-950 transition"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-legal-navy-950 transition"
              aria-label="Share on X"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href={`mailto:?subject=${encodeURIComponent(article.title)}`}
              className="text-slate-400 hover:text-legal-navy-950 transition"
              aria-label="Share via Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <Link
            href="/consultation"
            className="bg-legal-navy-950 hover:bg-legal-navy-800 text-legal-gold-400 font-bold px-4 py-2 rounded-sm uppercase tracking-wider text-xs transition"
          >
            Consult Author on This Matter
          </Link>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-8 p-4 rounded bg-slate-50 border border-slate-200 text-xs text-slate-500 leading-relaxed">
          <strong>Notice:</strong> This article is published for general educational purposes only and does not constitute formal legal opinion or create an attorney-client relationship. Please seek specific professional legal counsel before taking action on matters discussed herein.
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-legal-cream-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="font-serif text-2xl font-bold text-legal-navy-950 mb-8">
              Related Legal Insights &amp; Briefs
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/insights/${rel.slug}`}
                  className="bg-white p-6 rounded-sm border border-slate-200 hover:border-legal-gold-500 transition block group"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-legal-gold-700 block mb-1">
                    {rel.category.replace(/_/g, " ")}
                  </span>
                  <strong className="font-serif text-base font-bold text-legal-navy-950 group-hover:text-legal-gold-700 transition line-clamp-2">
                    {rel.title}
                  </strong>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                    {rel.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
