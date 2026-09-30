"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Scale,
  Phone,
  Search,
  Menu,
  X,
  ChevronDown,
  Shield,
  ArrowRight,
  MapPin,
  Clock,
} from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPracticeMenuOpen, setIsPracticeMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on path change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsPracticeMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Attorneys", href: "/people" },
    {
      name: "Practice Areas",
      href: "/practice-areas",
      hasDropdown: true,
    },
    { name: "Industries", href: "/industries" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Insights", href: "/insights" },
    { name: "Offices", href: "/offices" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ];

  const featuredPractices = [
    { name: "Commercial Litigation & Dispute Resolution", href: "/practice-areas/dispute-resolution-litigation" },
    { name: "Insolvency, Bankruptcy & Corporate Rescue", href: "/practice-areas/bankruptcy-insolvency-restructuring" },
    { name: "Personal Injury & Complex Torts", href: "/practice-areas/personal-injury-complex-torts" },
    { name: "Corporate, M&A & Private Equity", href: "/practice-areas/corporate-commercial" },
    { name: "Banking, Finance & FinTech", href: "/practice-areas/banking-finance-fintech" },
    { name: "Energy, Power & Natural Resources", href: "/practice-areas/energy-natural-resources" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Utility & Priority Intake Bar */}
      <div className="bg-legal-navy-950 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-legal-navy-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-legal-gold-400 font-medium">
              <Shield className="w-3.5 h-3.5 mr-1.5 text-legal-gold-400" />
              New York &bull; Washington D.C. &bull; Chicago &bull; Dallas
            </span>
            <span className="flex items-center text-slate-300 hover:text-white">
              <Clock className="w-3 h-3 mr-1.5 text-legal-gold-400" />
              24/7 Emergency Legal Intake Available
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <Link
              href="tel:+12129004800"
              className="flex items-center font-medium text-slate-200 hover:text-legal-gold-400 transition"
            >
              <Phone className="w-3 h-3 mr-1.5 text-legal-gold-400" />
              Direct Chambers: +1 (212) 900-4800
            </Link>
            <Link
              href="/search"
              aria-label="Search website"
              className="flex items-center text-slate-300 hover:text-legal-gold-400 transition"
            >
              <Search className="w-3.5 h-3.5 mr-1" />
              <span>Search</span>
            </Link>

          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-legal-navy-900/98 backdrop-blur shadow-md py-3 border-b border-legal-navy-800"
            : "bg-legal-navy-900 py-4 border-b border-legal-navy-800/80"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Identity / Seal */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-legal-gold-400 via-legal-gold-600 to-legal-gold-800 flex items-center justify-center shadow-md p-1.5 transition-transform group-hover:scale-105">
              <Scale className="w-6 h-6 text-legal-navy-950" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white block leading-none">
                STERLING &amp; CREST
              </span>
              <span className="text-[10px] tracking-[0.25em] text-legal-gold-400 uppercase font-medium block mt-1">
                Legal Practitioners &bull; Arbitrators
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative group"
                    onMouseEnter={() => setIsPracticeMenuOpen(true)}
                    onMouseLeave={() => setIsPracticeMenuOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={`px-3 py-2 text-sm font-medium transition flex items-center rounded-sm ${
                        isActive
                          ? "text-legal-gold-400 font-semibold"
                          : "text-slate-200 hover:text-legal-gold-300 hover:bg-legal-navy-800/60"
                      }`}
                    >
                      {link.name}
                      <ChevronDown className="w-3.5 h-3.5 ml-1 text-slate-400 group-hover:text-legal-gold-400 transition-transform group-hover:rotate-180" />
                    </Link>

                    {/* Megamenu Dropdown */}
                    {isPracticeMenuOpen && (
                      <div className="absolute top-full left-0 w-80 bg-legal-navy-900 border border-legal-navy-700/80 rounded-sm shadow-2xl py-3 px-2 transition-all animate-in fade-in-50 slide-in-from-top-2">
                        <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider text-legal-gold-400 uppercase border-b border-legal-navy-800 mb-1">
                          Core Practice Areas
                        </div>
                        {featuredPractices.map((practice) => (
                          <Link
                            key={practice.href}
                            href={practice.href}
                            className="block px-3 py-2 text-xs text-slate-200 hover:text-legal-gold-300 hover:bg-legal-navy-800 rounded transition"
                          >
                            {practice.name}
                          </Link>
                        ))}
                        <div className="border-t border-legal-navy-800 mt-2 pt-2 px-3">
                          <Link
                            href="/practice-areas"
                            className="text-xs text-legal-gold-400 hover:underline flex items-center font-medium"
                          >
                            View All 8 Practice Areas
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium transition rounded-sm ${
                    isActive
                      ? "text-legal-gold-400 font-semibold bg-legal-navy-800/80"
                      : "text-slate-200 hover:text-legal-gold-300 hover:bg-legal-navy-800/50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Primary Action Button (Header CTA) */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/consultation"
              className="bg-gradient-to-r from-legal-gold-500 to-legal-gold-600 hover:from-legal-gold-600 hover:to-legal-gold-700 text-legal-navy-950 font-semibold text-xs tracking-wider uppercase px-4 py-2.5 rounded-sm shadow-md transition-all hover:shadow-lg flex items-center"
            >
              <span>Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="flex items-center space-x-3 lg:hidden">
            <Link
              href="/consultation"
              className="bg-legal-gold-500 text-legal-navy-950 text-xs font-semibold px-3 py-1.5 rounded-sm uppercase tracking-wide"
            >
              Consult
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-200 hover:text-legal-gold-400 p-1.5 focus:outline-none focus:ring-2 focus:ring-legal-gold-400"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-legal-navy-950 border-b border-legal-navy-800 px-6 py-6 space-y-4 max-h-[85vh] overflow-y-auto">
          <div className="border-b border-legal-navy-800 pb-3">
            <Link
              href="tel:+12129004800"
              className="flex items-center text-sm font-medium text-legal-gold-400"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Chambers: +1 (212) 900-4800
            </Link>
          </div>

          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base text-slate-200 hover:text-legal-gold-400 py-1.5 font-medium transition"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/search"
              className="text-base text-slate-200 hover:text-legal-gold-400 py-1.5 font-medium transition flex items-center"
            >
              <Search className="w-4 h-4 mr-2" />
              Search Directory &amp; Articles
            </Link>
          </div>

          <div className="pt-4 border-t border-legal-navy-800 flex flex-col space-y-3">
            <Link
              href="/consultation"
              className="w-full text-center bg-legal-gold-500 hover:bg-legal-gold-600 text-legal-navy-950 font-bold py-3 rounded-sm uppercase tracking-wider text-xs transition"
            >
              Request Free Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
