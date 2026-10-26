"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Scale,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Shield,
  CheckCircle,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "FOOTER_FORM" }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage("Thank you. You have been subscribed to our Legal Updates & Client Alerts.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Subscription failed. Please check your email address.");
      }
    } catch {
      setStatus("error");
      setMessage("A network error occurred. Please try again.");
    }
  };

  return (
    <footer className="bg-legal-navy-950 text-slate-300 border-t-2 border-legal-gold-600">
      {/* Newsletter & Thought Leadership Callout */}
      <div className="border-b border-legal-navy-800 bg-legal-navy-900/60 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-legal-gold-400 block mb-2">
              Legal Insights &bull; Client Alerts &bull; Regulatory Briefs
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold tracking-tight">
              Stay Informed on Critical Legal Precedents &amp; Market Directives
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Receive authoritative analysis from our Senior Partners directly to your inbox. No spam. Confidential and unsubscribe anytime.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your corporate or official email address"
                className="bg-legal-navy-950 border border-legal-navy-700 focus:border-legal-gold-400 focus:ring-1 focus:ring-legal-gold-400 px-4 py-3 rounded-sm text-sm text-white placeholder-slate-500 w-full outline-none transition"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-legal-gold-500 hover:bg-legal-gold-600 text-legal-navy-950 font-bold px-6 py-3 rounded-sm uppercase tracking-wider text-xs whitespace-nowrap transition disabled:opacity-50 flex items-center justify-center shadow-md"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </button>
            </form>

            {status === "success" && (
              <p className="mt-3 text-xs text-emerald-400 flex items-center font-medium">
                <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                {message}
              </p>
            )}
            {status === "error" && (
              <p className="mt-3 text-xs text-rose-400 font-medium">{message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Main Multi-Column Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-legal-gold-400 via-legal-gold-600 to-legal-gold-800 flex items-center justify-center p-1.5 shadow-md">
                <Scale className="w-6 h-6 text-legal-navy-950" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block leading-none">
                  Crest &amp; Sterling Alliance
                </span>
                <span className="text-[10px] tracking-[0.25em] text-legal-gold-400 uppercase font-medium block mt-1">
                  Legal Practitioners &bull; Arbitrators
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              An elite litigation and transactional law firm headquartered in New York, representing corporations, financial institutions, and private clients in high-stakes litigation, corporate restructurings, and cross-border transactions across the United States and internationally.
            </p>

            <div className="pt-2 flex items-center space-x-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-sm bg-legal-navy-900 border border-legal-navy-800 flex items-center justify-center text-slate-400 hover:text-legal-gold-400 hover:border-legal-gold-400 transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-sm bg-legal-navy-900 border border-legal-navy-800 flex items-center justify-center text-slate-400 hover:text-legal-gold-400 hover:border-legal-gold-400 transition"
                aria-label="X / Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-sm bg-legal-navy-900 border border-legal-navy-800 flex items-center justify-center text-slate-400 hover:text-legal-gold-400 hover:border-legal-gold-400 transition"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-sm bg-legal-navy-900 border border-legal-navy-800 flex items-center justify-center text-slate-400 hover:text-legal-gold-400 hover:border-legal-gold-400 transition"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Practice Areas */}
          <div>
            <h4 className="font-serif text-white font-bold text-base mb-4 tracking-wide border-b border-legal-navy-800 pb-2">
              Practice Areas
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/practice-areas/dispute-resolution-litigation" className="hover:text-legal-gold-300 transition block">
                  Dispute Resolution &amp; Litigation
                </Link>
              </li>
              <li>
                <Link href="/practice-areas/bankruptcy-insolvency-restructuring" className="hover:text-legal-gold-300 transition block">
                  Bankruptcy &amp; Debt Restructuring
                </Link>
              </li>
              <li>
                <Link href="/practice-areas/personal-injury-complex-torts" className="hover:text-legal-gold-300 transition block">
                  Personal Injury &amp; Complex Torts
                </Link>
              </li>
              <li>
                <Link href="/practice-areas/corporate-commercial" className="hover:text-legal-gold-300 transition block">
                  Corporate &amp; Commercial Law
                </Link>
              </li>
              <li>
                <Link href="/practice-areas/banking-finance-fintech" className="hover:text-legal-gold-300 transition block">
                  Banking, Finance &amp; FinTech
                </Link>
              </li>
              <li>
                <Link href="/practice-areas/energy-natural-resources" className="hover:text-legal-gold-300 transition block">
                  Energy &amp; Natural Resources
                </Link>
              </li>
              <li>
                <Link href="/practice-areas/real-estate-infrastructure" className="hover:text-legal-gold-300 transition block">
                  Real Estate &amp; Infrastructure
                </Link>
              </li>
              <li>
                <Link href="/practice-areas/technology-data-ip" className="hover:text-legal-gold-300 transition block">
                  Technology &amp; Data Protection
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: The Firm */}
          <div>
            <h4 className="font-serif text-white font-bold text-base mb-4 tracking-wide border-b border-legal-navy-800 pb-2">
              The Firm
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/about" className="hover:text-legal-gold-300 transition block">
                  About Our Firm &amp; Heritage
                </Link>
              </li>
              <li>
                <Link href="/people" className="hover:text-legal-gold-300 transition block">
                  Partners &amp; Legal Practitioners
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-legal-gold-300 transition block">
                  Representative Matters
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-legal-gold-300 transition block">
                  Industry Focus
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-legal-gold-300 transition block">
                  Insights &amp; Publications
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-legal-gold-300 transition block">
                  Careers &amp; Pupillage
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-legal-gold-300 transition block">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/offices" className="hover:text-legal-gold-300 transition block">
                  Chambers &amp; Global Offices
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Principal Chambers */}
          <div>
            <h4 className="font-serif text-white font-bold text-base mb-4 tracking-wide border-b border-legal-navy-800 pb-2">
              Principal Chambers
            </h4>
            <div className="space-y-4 text-xs text-slate-400">
              <div>
                <strong className="text-white block font-medium">Chicago Head Office</strong>
                <p className="mt-0.5">233 South Wacker Drive, 84th Floor, The Loop, Chicago, IL 60606</p>
                <p className="mt-0.5 text-legal-gold-400 font-mono">+1 (212) 900-4800</p>
              </div>

              <div>
                <strong className="text-white block font-medium">Toronto Head Office</strong>
                <p className="mt-0.5">1250 Bay Street, Suite 700, Toronto, Ontario M5R 2A5, Canada</p>
                <p className="mt-0.5 text-legal-gold-400 font-mono">+1 (202) 550-7700</p>
              </div>

              <div>
                <strong className="text-white block font-medium">Direct Inquiries</strong>
                <p className="mt-0.5 text-slate-300">counsel@crestwoodalliance.com</p>
                <p className="mt-0.5 text-slate-300">intake@crestwoodalliance.com</p>
              </div>

              <div className="pt-2">
                <Link
                  href="/consultation"
                  className="inline-block bg-legal-navy-800 hover:bg-legal-gold-500 hover:text-legal-navy-950 text-legal-gold-400 font-semibold px-4 py-2 rounded-sm uppercase tracking-wider text-[11px] transition border border-legal-gold-400/40"
                >
                  Schedule Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>



        {/* Bottom Bar: Copyright & Compliance Links */}
        <div className="mt-8 pt-6 border-t border-legal-navy-900 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 space-y-4 md:space-y-0">
          <div>
            &copy; 2026 Crest &amp; Sterling Alliance. All Rights Reserved.
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacy-policy" className="hover:text-legal-gold-300 transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-legal-gold-300 transition">
              Terms of Use
            </Link>
            <Link href="/cookie-policy" className="hover:text-legal-gold-300 transition">
              Cookie Policy
            </Link>
            <Link href="/disclaimer" className="hover:text-legal-gold-300 transition">
              Legal Disclaimer
            </Link>
            <Link href="/accessibility" className="hover:text-legal-gold-300 transition">
              Accessibility Statement
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
