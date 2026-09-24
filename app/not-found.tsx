import Link from "next/link";
import { Scale, ArrowRight, ShieldAlert, Home, Phone } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-legal-cream-50 flex items-center justify-center py-20 px-4">
      <div className="max-w-xl w-full bg-white border border-slate-200 rounded-sm shadow-subtle p-8 sm:p-12 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-legal-cream-100 border border-legal-gold-300 text-legal-gold-700 flex items-center justify-center mx-auto">
          <Scale className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs uppercase tracking-widest font-mono text-legal-gold-700 font-bold block mb-1">
            404 Error &bull; Route Not Found
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-legal-navy-950">
            Page Not Found
          </h1>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            The requested legal directory entry, publication brief, or document route does not exist or has been relocated to another chambers archive.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/"
            className="bg-legal-navy-950 hover:bg-legal-navy-800 text-white font-bold px-6 py-3 rounded-sm uppercase tracking-wider text-xs transition flex items-center justify-center"
          >
            <Home className="w-3.5 h-3.5 mr-2" />
            <span>Return Home</span>
          </Link>

          <Link
            href="/practice-areas"
            className="bg-legal-gold-500 hover:bg-legal-gold-600 text-legal-navy-950 font-bold px-6 py-3 rounded-sm uppercase tracking-wider text-xs transition flex items-center justify-center"
          >
            <span>Explore Practice Areas</span>
          </Link>

          <Link
            href="/contact"
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-3 rounded-sm uppercase tracking-wider text-xs transition flex items-center justify-center"
          >
            <Phone className="w-3.5 h-3.5 mr-2" />
            <span>Contact Us</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
