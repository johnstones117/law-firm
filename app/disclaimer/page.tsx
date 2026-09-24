import Link from "next/link";
import { ShieldAlert, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Formal Legal Disclaimer & Professional Notice",
  description:
    "Formal attorney advertising notice, conflict-of-interest disclaimer, and legal representation guidelines for Sterling & Crest Legal Practitioners.",
};

export default function DisclaimerPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-legal-navy-950 text-white py-16 border-b border-legal-navy-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase font-bold tracking-widest text-legal-gold-400 block mb-2">
            Professional Ethics &bull; Attorney Notice
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Formal Legal Disclaimer &amp; Notice
          </h1>
          <p className="text-slate-400 text-xs mt-2">
            Sterling &amp; Crest Legal Practitioners &bull; Senior Advocates of Nigeria
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate text-sm text-slate-700 leading-relaxed space-y-6">
          <div className="p-6 rounded bg-legal-cream-100 border border-legal-gold-300 text-slate-800">
            <h3 className="font-serif text-lg font-bold text-legal-navy-950 mb-2">
              General Informational Notice Only
            </h3>
            <p className="text-xs leading-relaxed">
              The contents of this website are published solely for general informational, educational, and professional awareness purposes. No information on this website constitutes, or is intended to constitute, formal legal advice, tax opinion, or the establishment of legal representation.
            </p>
          </div>

          <h2 className="font-serif text-xl font-bold text-legal-navy-950">1. No Attorney-Client Relationship</h2>
          <p>
            Visiting this website, sending emails, or submitting information through our online evaluation forms does not establish an attorney-client relationship. Confidential representation begins solely when our chambers has formally conducted a comprehensive conflict-of-interest check and an official Engagement Letter has been executed by both parties.
          </p>

          <h2 className="font-serif text-xl font-bold text-legal-navy-950">2. Prior Results Do Not Guarantee Future Outcomes</h2>
          <p>
            Case studies, representative matters, and arbitration summaries described on this website reflect past matters handled by our advocates. Every legal matter depends on specific evidentiary facts, statutes, and judicial discretion. Prior success does not guarantee a similar result in future actions.
          </p>

          <h2 className="font-serif text-xl font-bold text-legal-navy-950">3. Non-Disclosure of Confidential Trade Secrets</h2>
          <p>
            Please do not send unsolicited confidential trade secrets, internal memos, or sensitive corporate documents through public inquiry forms until formal representation is confirmed.
          </p>

          <div className="pt-6 border-t border-slate-200">
            <Link
              href="/consultation"
              className="inline-flex items-center bg-legal-navy-950 hover:bg-legal-navy-800 text-legal-gold-400 font-bold px-6 py-3 rounded-sm uppercase tracking-wider text-xs transition"
            >
              <span>Initiate Formal Intake Protocol</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
