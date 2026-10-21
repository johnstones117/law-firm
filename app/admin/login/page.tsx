"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Scale, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(`Welcome back, ${data.admin.name}`);
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Authentication failed.");
        toast.error(data.error || "Invalid login credentials.");
      }
    } catch {
      setError("An unexpected network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-legal-navy-950 flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-legal-navy-900 border border-legal-navy-800 rounded-sm shadow-2xl p-8 sm:p-10 space-y-6">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded bg-gradient-to-br from-legal-gold-400 to-legal-gold-700 flex items-center justify-center mx-auto shadow-md">
            <Scale className="w-6 h-6 text-legal-navy-950" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-white">
              Chambers Administrative CMS
            </h1>
            <span className="text-[11px] uppercase tracking-widest text-legal-gold-400 font-medium block mt-1">
              Authorized Counsel &bull; Super Admin Portal
            </span>
          </div>
        </div>

        {error && (
          <div className="bg-rose-950/50 border border-rose-800 text-rose-300 text-xs p-3 rounded flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Counsel / Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="senior.partner@crestandsterling.com"
                className="w-full px-3.5 py-2.5 pl-10 bg-legal-navy-950 border border-legal-navy-700 focus:border-legal-gold-400 text-white text-sm rounded-sm outline-none transition"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Secure Passphrase
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 pl-10 bg-legal-navy-950 border border-legal-navy-700 focus:border-legal-gold-400 text-white text-sm rounded-sm outline-none transition"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-legal-gold-500 hover:bg-legal-gold-600 text-legal-navy-950 font-bold py-3 px-4 rounded-sm uppercase tracking-wider text-xs shadow-md transition disabled:opacity-50 flex items-center justify-center space-x-2 mt-2"
          >
            <span>{loading ? "Authenticating Session..." : "Access Chambers Console"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-legal-navy-800 text-center text-[11px] text-slate-400 space-y-1">
          <div className="flex items-center justify-center text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-legal-gold-400 mr-1" />
            <span>Encrypted Session &bull; IP Logged &bull; RBAC Protected</span>
          </div>
          <p className="text-[10px] text-slate-500 font-mono">
            Default seed: senior.partner@crestandsterling.com / Sterling@Admin2026!
          </p>
        </div>
      </div>
    </div>
  );
}
