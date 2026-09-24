export const metadata = {
  title: "Terms of Use",
  description:
    "Terms and conditions governing the use of the Sterling & Crest website and electronic consultation portals.",
};

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-legal-navy-950 text-white py-16 border-b border-legal-navy-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase font-bold tracking-widest text-legal-gold-400 block mb-2">
            Chambers Terms
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Terms of Website Use
          </h1>
          <p className="text-slate-400 text-xs mt-2">
            Last Updated: January 2026 &bull; Sterling &amp; Crest Legal Practitioners
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate text-sm text-slate-700 leading-relaxed space-y-6">
          <h2 className="font-serif text-xl font-bold text-legal-navy-950">1. Acceptance of Terms</h2>
          <p>
            By accessing or browsing this website, you agree to comply with and be bound by these Terms of Use. If you do not accept these terms, you should discontinue using this site immediately.
          </p>

          <h2 className="font-serif text-xl font-bold text-legal-navy-950">2. No Legal Advice or Attorney-Client Relationship</h2>
          <p>
            The materials, articles, and insights contained on this website are provided for general educational purposes only. They do not constitute legal advice and must not be relied upon as such. Receipt of information through this site or submission of an online consultation form does not create an attorney-client relationship. An attorney-client relationship is strictly established only upon the formal execution of an Engagement Letter following a completed conflict-of-interest check.
          </p>

          <h2 className="font-serif text-xl font-bold text-legal-navy-950">3. Intellectual Property Rights</h2>
          <p>
            All text, branding, graphics, publication texts, case analyses, and logos on this website are the proprietary intellectual property of Sterling &amp; Crest Legal Practitioners and are protected under Nigerian copyright laws and international treaties. No portion may be reproduced without prior written consent.
          </p>

          <h2 className="font-serif text-xl font-bold text-legal-navy-950">4. Limitation of Liability</h2>
          <p>
            Under no circumstances shall Sterling &amp; Crest Legal Practitioners, its Senior Partners, or associate counsel be held liable for any damages, losses, or legal consequences arising from the use or inability to use the information published on this website.
          </p>
        </div>
      </section>
    </div>
  );
}
