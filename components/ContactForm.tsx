"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle, Send, Shield } from "lucide-react";
import { toast } from "sonner";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        toast.success("Message delivered to chambers.");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setError(data.error || "Failed to send message.");
        toast.error(data.error || "Submission failed.");
      }
    } catch {
      setError("A network error occurred. Please contact us by telephone.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white border border-emerald-200 p-8 rounded-sm shadow-subtle text-center space-y-4">
        <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
        <h3 className="font-serif text-2xl font-bold text-legal-navy-950">
          Message Received
        </h3>
        <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
          Thank you for writing to Sterling &amp; Crest. Your communication has been dispatched to our administrative registry and will be directed to the relevant practice committee.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="bg-legal-navy-950 text-legal-gold-400 font-bold px-6 py-2.5 rounded-sm uppercase tracking-wider text-xs transition"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-slate-200 p-8 rounded-sm shadow-subtle space-y-5"
    >
      <div className="border-b border-slate-100 pb-3">
        <span className="text-[11px] font-bold text-legal-gold-600 uppercase tracking-wider block">
          General Inquiry
        </span>
        <h2 className="font-serif text-2xl font-bold text-legal-navy-950">
          Write to Chambers
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          For confidential case evaluations or urgent injunctions, please use our Consultation Form instead.
        </p>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
          Full Name *
        </label>
        <input
          type="text"
          required
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          placeholder="Chief / Dr / Mr / Ms..."
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-legal-gold-500 rounded-sm text-sm outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="name@organization.com"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-legal-gold-500 rounded-sm text-sm outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            Telephone Number (Optional)
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+234..."
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-legal-gold-500 rounded-sm text-sm outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
          Subject / Matter Reference *
        </label>
        <input
          type="text"
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          placeholder="e.g. Inquiries regarding Commercial Arbitration Retainer"
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-legal-gold-500 rounded-sm text-sm outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
          Message *
        </label>
        <textarea
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Please articulate your inquiry..."
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-legal-gold-500 rounded-sm text-sm outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-legal-navy-950 hover:bg-legal-navy-800 text-legal-gold-400 font-bold py-3.5 rounded-sm uppercase tracking-wider text-xs transition shadow flex items-center justify-center space-x-2"
      >
        <Send className="w-4 h-4" />
        <span>{loading ? "Transmitting..." : "Send Message to Chambers"}</span>
      </button>
    </form>
  );
}
