"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle, Send, Lock } from "lucide-react";
import { toast } from "sonner";

interface Props {
  jobId: string;
  jobTitle: string;
}

export default function JobApplicationForm({ jobId, jobTitle }: Props) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedinUrl: "",
    resumeUrl: "",
    coverLetter: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.coverLetter.trim().length < 30) {
      setError("Please provide a brief cover letter or statement of interest (min 30 characters).");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId,
          ...formData,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        toast.success("Application received successfully!");
      } else {
        setError(data.error || "Failed to submit application.");
        toast.error(data.error || "Submission error.");
      }
    } catch {
      setError("A network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white p-8 rounded border border-emerald-200 shadow-md text-center space-y-4">
        <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
        <h3 className="font-serif text-xl font-bold text-legal-navy-950">
          Application Transmitted
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Your credentials for <strong>{jobTitle}</strong> have been securely delivered to our Recruitment Committee. Shortlisted candidates are contacted within 10 business days.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-slate-200 p-6 sm:p-8 rounded-sm shadow-subtle space-y-5"
    >
      <div className="border-b border-slate-100 pb-3">
        <span className="text-[11px] font-bold text-legal-gold-600 uppercase tracking-wider block">
          Chambers Application
        </span>
        <h3 className="font-serif text-xl font-bold text-legal-navy-950">
          Apply for this Position
        </h3>
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
          placeholder="e.g. Adebayo Adeola"
          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 focus:border-legal-gold-500 rounded-sm text-sm outline-none"
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
            placeholder="you@email.com"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 focus:border-legal-gold-500 rounded-sm text-sm outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+234 800 000 0000"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 focus:border-legal-gold-500 rounded-sm text-sm outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
          LinkedIn Profile URL (Optional)
        </label>
        <input
          type="url"
          value={formData.linkedinUrl}
          onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
          placeholder="https://linkedin.com/in/username"
          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 focus:border-legal-gold-500 rounded-sm text-sm outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
          Resume / CV Cloud Link or Portfolio *
        </label>
        <input
          type="url"
          required
          value={formData.resumeUrl}
          onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
          placeholder="https://drive.google.com/... or dropbox link"
          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 focus:border-legal-gold-500 rounded-sm text-sm outline-none"
        />
        <span className="text-[11px] text-slate-400 block mt-1">
          Provide a link to your CV hosted on Google Drive, OneDrive, or Dropbox.
        </span>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
          Cover Letter &amp; Statement of Interest *
        </label>
        <textarea
          required
          rows={4}
          value={formData.coverLetter}
          onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
          placeholder="Highlight your advocacy experience, publications, or deal history..."
          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 focus:border-legal-gold-500 rounded-sm text-sm outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-legal-navy-950 hover:bg-legal-navy-800 text-legal-gold-400 font-bold py-3 rounded-sm uppercase tracking-wider text-xs shadow transition disabled:opacity-50 flex items-center justify-center space-x-2"
      >
        <Send className="w-4 h-4" />
        <span>{loading ? "Transmitting..." : "Submit Application"}</span>
      </button>

      <div className="flex items-center justify-center text-[11px] text-slate-400 pt-1">
        <Lock className="w-3 h-3 mr-1" />
        <span>Confidential recruitment screening</span>
      </div>
    </form>
  );
}
