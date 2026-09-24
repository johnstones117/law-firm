"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("System Error caught by error boundary:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] bg-legal-cream-50 flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full bg-white border border-rose-200 rounded-sm shadow-subtle p-8 text-center space-y-6">
        <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
          <AlertCircle className="w-7 h-7" />
        </div>

        <div>
          <span className="text-xs uppercase tracking-widest font-mono text-rose-600 font-bold block mb-1">
            System Notice &bull; Application Error
          </span>
          <h2 className="font-serif text-2xl font-bold text-legal-navy-950">
            An Unexpected Problem Occurred
          </h2>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed">
            Our systems have logged this event. Please retry the request or contact chambers administration.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={() => reset()}
            className="bg-legal-navy-950 hover:bg-legal-navy-800 text-white font-bold px-5 py-2.5 rounded-sm uppercase tracking-wider text-xs transition flex items-center justify-center"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-2" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-5 py-2.5 rounded-sm uppercase tracking-wider text-xs transition flex items-center justify-center"
          >
            <Home className="w-3.5 h-3.5 mr-2" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
