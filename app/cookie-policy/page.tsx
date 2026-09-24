export const metadata = {
  title: "Cookie Policy",
  description:
    "Information regarding our use of strictly necessary, analytical, and functional cookies at Sterling & Crest.",
};

export default function CookiePolicyPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-legal-navy-950 text-white py-16 border-b border-legal-navy-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase font-bold tracking-widest text-legal-gold-400 block mb-2">
            Transparency &bull; Cookies
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Cookie Policy
          </h1>
          <p className="text-slate-400 text-xs mt-2">
            Last Updated: January 2026 &bull; Sterling &amp; Crest Legal Practitioners
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate text-sm text-slate-700 leading-relaxed space-y-6">
          <h2 className="font-serif text-xl font-bold text-legal-navy-950">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files placed on your device by websites you visit. They are widely used to ensure websites function securely and efficiently, as well as to provide reporting insights to site administrators.
          </p>

          <h2 className="font-serif text-xl font-bold text-legal-navy-950">2. Categories of Cookies We Use</h2>
          <ul className="list-disc pl-5 space-y-2 text-xs">
            <li><strong>Strictly Necessary Cookies:</strong> Essential for secure navigation, form submission tokens, and administrative session management. These cannot be disabled.</li>
            <li><strong>Analytical Cookies:</strong> Help us measure readership of legal publications and evaluate which practice areas receive the most interest.</li>
            <li><strong>Functional Cookies:</strong> Store your user preferences such as dismissed announcements or font sizing.</li>
          </ul>

          <h2 className="font-serif text-xl font-bold text-legal-navy-950">3. Managing Your Preferences</h2>
          <p>
            You can configure your browser to decline all non-essential cookies. You can also adjust your consent choices at any time through our on-site cookie consent preferences panel.
          </p>
        </div>
      </section>
    </div>
  );
}
