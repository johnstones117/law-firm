"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, Shield, Check, X } from "lucide-react";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("sterling_cookie_consent");
    if (!consent) {
      // Delay display slightly for smooth entrance
      const timer = setTimeout(() => setShowBanner(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(
      "sterling_cookie_consent",
      JSON.stringify({ essential: true, analytics: true, marketing: true, timestamp: new Date().toISOString() })
    );
    setShowBanner(false);
  };

  const handleRejectNonEssential = () => {
    localStorage.setItem(
      "sterling_cookie_consent",
      JSON.stringify({ essential: true, analytics: false, marketing: false, timestamp: new Date().toISOString() })
    );
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem(
      "sterling_cookie_consent",
      JSON.stringify({
        essential: true,
        analytics: analyticsConsent,
        marketing: marketingConsent,
        timestamp: new Date().toISOString(),
      })
    );
    setShowPreferences(false);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 md:left-8 md:max-w-xl z-50 bg-legal-navy-950/95 backdrop-blur border border-legal-gold-600/40 text-slate-200 p-6 rounded shadow-2xl animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start space-x-3.5">
        <div className="p-2 rounded bg-legal-navy-900 border border-legal-gold-500/30 text-legal-gold-400 flex-shrink-0">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="font-serif font-bold text-white text-base tracking-wide">
            Privacy &amp; Cookie Consent
          </h4>
          <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
            We use strictly necessary cookies to ensure our website operates securely, alongside optional analytical cookies to measure readership of legal updates. Read our{" "}
            <Link href="/cookie-policy" className="text-legal-gold-400 underline hover:text-legal-gold-300">
              Cookie Policy
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="text-legal-gold-400 underline hover:text-legal-gold-300">
              Privacy Policy
            </Link>
            .
          </p>

          {showPreferences ? (
            <div className="mt-4 pt-4 border-t border-legal-navy-800 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <strong className="text-white">Strictly Necessary Cookies</strong>
                  <p className="text-slate-400 text-[11px]">Required for website security and CSRF form tokens.</p>
                </div>
                <span className="text-[11px] font-semibold text-legal-gold-400 bg-legal-navy-900 px-2 py-1 rounded">
                  Always Active
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <strong className="text-white">Analytics Cookies</strong>
                  <p className="text-slate-400 text-[11px]">Help us analyze audience engagement with legal articles.</p>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsConsent}
                  onChange={(e) => setAnalyticsConsent(e.target.checked)}
                  className="rounded text-legal-gold-500 focus:ring-legal-gold-400 h-4 w-4 bg-legal-navy-900 border-slate-700"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <strong className="text-white">Marketing &amp; Social Cookies</strong>
                  <p className="text-slate-400 text-[11px]">For interactive maps and professional event notices.</p>
                </div>
                <input
                  type="checkbox"
                  checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                  className="rounded text-legal-gold-500 focus:ring-legal-gold-400 h-4 w-4 bg-legal-navy-900 border-slate-700"
                />
              </div>

              <div className="pt-2 flex space-x-2">
                <button
                  onClick={handleSavePreferences}
                  className="bg-legal-gold-500 hover:bg-legal-gold-600 text-legal-navy-950 font-bold px-4 py-2 rounded-sm text-xs tracking-wider uppercase transition"
                >
                  Save Preferences
                </button>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="bg-legal-navy-800 hover:bg-legal-navy-700 text-slate-300 px-3 py-2 rounded-sm text-xs transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-4 flex flex-wrap gap-2 pt-2">
              <button
                onClick={handleAcceptAll}
                className="bg-legal-gold-500 hover:bg-legal-gold-600 text-legal-navy-950 font-bold px-4 py-2 rounded-sm text-xs tracking-wider uppercase transition shadow-sm"
              >
                Accept All
              </button>
              <button
                onClick={handleRejectNonEssential}
                className="bg-legal-navy-800 hover:bg-legal-navy-700 text-slate-200 font-medium px-4 py-2 rounded-sm text-xs tracking-wider uppercase transition border border-legal-navy-700"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={() => setShowPreferences(true)}
                className="text-xs text-legal-gold-400 hover:underline px-2 py-2 font-medium"
              >
                Manage Preferences
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
