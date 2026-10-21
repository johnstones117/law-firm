import Link from "next/link";
import { Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy & Data Protection",
  description:
    "Crest & Sterling Privacy Policy explaining our data protection protocols under the Nigeria Data Protection Act (NDPA) and global privacy standards.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-legal-navy-950 text-white py-16 border-b border-legal-navy-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase font-bold tracking-widest text-legal-gold-400 block mb-2">
            Legal Compliance &bull; NDPA &bull; GDPR
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Privacy Policy &amp; Data Protection Protocol
          </h1>
          <p className="text-slate-400 text-xs mt-2">
            Last Updated: January 2026 &bull; Crest &amp; Sterling Alliance
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate text-sm text-slate-700 leading-relaxed space-y-6">
          <p>
            Crest &amp; Sterling Alliance (&ldquo;the Firm&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is committed to preserving the confidentiality, integrity, and security of all personal and corporate information entrusted to our chambers. This Privacy Policy outlines our procedures for collecting, processing, and safeguarding data pursuant to the <strong>Nigeria Data Protection Act (NDPA) 2023</strong> and international data protection standards.
          </p>

          <h2 className="font-serif text-xl font-bold text-legal-navy-950">1. Information We Collect</h2>
          <p>
            When you interact with our website, request a consultation, or communicate with our attorneys, we may collect:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li><strong>Identification &amp; Contact Details:</strong> Full name, professional title, corporate affiliation, official email address, and telephone number.</li>
            <li><strong>Intake &amp; Case Matter Summaries:</strong> Preliminary details submitted voluntarily via our evaluation forms for conflict-of-interest screening.</li>
            <li><strong>Technical Telemetry:</strong> Anonymized browser version, device type, and visit duration used strictly to optimize site performance.</li>
          </ul>

          <h2 className="font-serif text-xl font-bold text-legal-navy-950">2. Legal Privilege &amp; Confidentiality</h2>
          <p>
            All information provided during the formal consultation or representation phase is safeguarded by strict attorney-client confidentiality rules and the Rules of Professional Conduct in the Legal Profession. We do not disclose, sell, or rent your personal information to third parties or marketing brokers.
          </p>

          <h2 className="font-serif text-xl font-bold text-legal-navy-950">3. Purpose of Processing</h2>
          <p>
            We process data exclusively to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>Perform mandatory legal conflict-of-interest checks.</li>
            <li>Evaluate and respond to consultation and legal inquiry submissions.</li>
            <li>Deliver requested legal updates, newsletters, and client alerts.</li>
            <li>Comply with regulatory obligations under the Legal Practitioners Act and Central Bank AML directives.</li>
          </ul>

          <h2 className="font-serif text-xl font-bold text-legal-navy-950">4. Your Data Protection Rights</h2>
          <p>
            Under the NDPA, you have the right to request access to your personal data, rectify inaccurate records, request deletion where retention is no longer mandated by law, and withdraw consent for newsletters at any time.
          </p>

          <h2 className="font-serif text-xl font-bold text-legal-navy-950">5. Contact Our Data Protection Officer</h2>
          <p>
            For privacy inquiries or rights enforcement, contact:
            <br />
            <strong>Data Protection Desk</strong>
            <br />
            Crest &amp; Sterling Alliance
            <br />
            18A Adeola Odeku Street, Victoria Island, Lagos
            <br />
            Email: <a href="mailto:privacy@crestwoodalliance.com" className="text-legal-gold-700 underline">privacy@crestwoodalliance.com</a>
          </p>
        </div>
      </section>
    </div>
  );
}
