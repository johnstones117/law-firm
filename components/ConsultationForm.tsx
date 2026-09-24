"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  Lock,
  PhoneCall,
} from "lucide-react";
import { toast } from "sonner";

interface ConsultationFormProps {
  initialMatterType?: string;
  isCompact?: boolean;
}

export default function ConsultationForm({
  initialMatterType = "Commercial Litigation & Dispute Resolution",
  isCompact = false,
}: ConsultationFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    country: "Nigeria",
    matterType: initialMatterType,
    preferredContact: "Phone" as "Phone" | "Email" | "Virtual Meeting",
    preferredDate: "",
    preferredTime: "Morning (09:00 - 12:00)",
    description: "",
    hasConsent: false,
    honeypot: "", // Spam honeypot
  });

  const [loading, setLoading] = useState(false);
  const [submittedReference, setSubmittedReference] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const matterCategories = [
    "Commercial Litigation & Dispute Resolution",
    "Insolvency, Bankruptcy & Corporate Rescue",
    "Personal Injury & Complex Tort Litigation",
    "Corporate, M&A & Private Equity",
    "Banking, Finance & FinTech Regulatory",
    "Energy, Power & Natural Resources (PIA)",
    "Real Estate & Infrastructure Development",
    "Technology, Data Protection & Intellectual Property",
    "General Corporate Legal Advisory",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Spam honeypot verification
    if (formData.honeypot) {
      // Quietly reject automated bot
      setSubmittedReference("SC-CONFIRMED");
      return;
    }

    if (!formData.hasConsent) {
      setErrorMessage("Please acknowledge the legal disclaimer before submitting.");
      toast.error("Please acknowledge the legal disclaimer.");
      return;
    }

    if (formData.description.trim().length < 20) {
      setErrorMessage("Please provide a brief description of the legal matter (minimum 20 characters).");
      toast.error("Matter summary is too short.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company || null,
          country: formData.country,
          matterType: formData.matterType,
          preferredContact: formData.preferredContact,
          preferredDate: formData.preferredDate || null,
          preferredTime: formData.preferredTime || null,
          description: formData.description,
          hasConsent: formData.hasConsent,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmittedReference(result.referenceNumber);
        toast.success("Consultation request successfully submitted!");
      } else {
        setErrorMessage(result.error || "Failed to process request. Please review form entries.");
        toast.error(result.error || "Submission failed.");
      }
    } catch {
      setErrorMessage("A network error occurred while transmitting your request. Please try again or call our chambers directly.");
      toast.error("Network error.");
    } finally {
      setLoading(false);
    }
  };

  if (submittedReference) {
    return (
      <div className="bg-white border-2 border-legal-gold-500/50 p-8 sm:p-10 rounded shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
          <CheckCircle className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-legal-gold-600 block mb-1">
            Request Transmitted Securely
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-legal-navy-950 font-bold">
            Consultation Request Received
          </h3>
          <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
            Your legal evaluation request has been entered into our secure chambers intake system.
          </p>
        </div>

        <div className="bg-legal-cream-100 border border-legal-gold-200 p-4 rounded max-w-sm mx-auto">
          <span className="text-xs uppercase tracking-wider text-slate-500 block">Intake Reference Code</span>
          <strong className="text-lg font-mono text-legal-navy-900 tracking-wider">
            {submittedReference}
          </strong>
        </div>

        <div className="text-xs text-slate-600 space-y-2 max-w-md mx-auto text-left bg-slate-50 p-4 rounded border border-slate-200">
          <div className="flex items-center text-slate-800 font-semibold mb-1">
            <Lock className="w-3.5 h-3.5 text-legal-gold-600 mr-1.5" />
            Confidential Intake Protocol:
          </div>
          <p>&bull; A formal conflict-of-interest check has been initiated.</p>
          <p>&bull; Our Intake Coordinator will contact you via {formData.preferredContact.toLowerCase()} within 2 business hours.</p>
          <p>&bull; Confirmation has been dispatched to {formData.email}.</p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={() => {
              setSubmittedReference(null);
              setFormData({
                fullName: "",
                email: "",
                phone: "",
                company: "",
                country: "Nigeria",
                matterType: initialMatterType,
                preferredContact: "Phone",
                preferredDate: "",
                preferredTime: "Morning (09:00 - 12:00)",
                description: "",
                hasConsent: false,
                honeypot: "",
              });
            }}
            className="bg-legal-navy-900 hover:bg-legal-navy-800 text-white font-semibold text-xs tracking-wider uppercase px-6 py-3 rounded-sm transition"
          >
            Submit Another Request
          </button>
          <Link
            href="/"
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs tracking-wider uppercase px-6 py-3 rounded-sm transition flex items-center justify-center"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white border border-slate-200 rounded shadow-card p-6 sm:p-8 space-y-6 ${
        isCompact ? "max-w-xl mx-auto" : ""
      }`}
    >
      {/* Honeypot hidden input */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="firm_security_token"
          value={formData.honeypot}
          onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-legal-navy-950">
              Request a Legal Consultation
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Direct and confidential evaluation by our Practice Group Leaders.
            </p>
          </div>
          <Shield className="w-6 h-6 text-legal-gold-600 hidden sm:block" />
        </div>
      </div>

      {errorMessage && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3.5 rounded flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Row 1: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="e.g. Chief Adeleke Johnson"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-legal-gold-500 focus:bg-white focus:ring-1 focus:ring-legal-gold-500 text-sm rounded-sm outline-none transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Official / Personal Email <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="name@company.com"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-legal-gold-500 focus:bg-white focus:ring-1 focus:ring-legal-gold-500 text-sm rounded-sm outline-none transition"
          />
        </div>
      </div>

      {/* Row 2: Phone & Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Phone / WhatsApp Number <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+234 (0) 803 000 0000"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-legal-gold-500 focus:bg-white focus:ring-1 focus:ring-legal-gold-500 text-sm rounded-sm outline-none transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Company / Organization (Optional)
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="Entity or Corporate Name"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-legal-gold-500 focus:bg-white focus:ring-1 focus:ring-legal-gold-500 text-sm rounded-sm outline-none transition"
          />
        </div>
      </div>

      {/* Row 3: Matter Category */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
          Area of Legal Need / Matter Category <span className="text-rose-500">*</span>
        </label>
        <select
          value={formData.matterType}
          onChange={(e) => setFormData({ ...formData, matterType: e.target.value })}
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-legal-gold-500 focus:bg-white focus:ring-1 focus:ring-legal-gold-500 text-sm rounded-sm outline-none transition"
        >
          {matterCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Row 4: Preferred Contact & Preferred Schedule */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Contact Method
          </label>
          <select
            value={formData.preferredContact}
            onChange={(e) =>
              setFormData({
                ...formData,
                preferredContact: e.target.value as "Phone" | "Email" | "Virtual Meeting",
              })
            }
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 text-sm rounded-sm outline-none focus:border-legal-gold-500"
          >
            <option value="Phone">Phone Call</option>
            <option value="Virtual Meeting">Virtual Meeting (Zoom / Teams)</option>
            <option value="Email">Email Communication</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Target Date (Optional)
          </label>
          <input
            type="date"
            value={formData.preferredDate}
            onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 text-sm rounded-sm outline-none focus:border-legal-gold-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Preferred Time Window
          </label>
          <select
            value={formData.preferredTime}
            onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 text-sm rounded-sm outline-none focus:border-legal-gold-500"
          >
            <option value="Morning (09:00 - 12:00)">Morning (09:00 – 12:00)</option>
            <option value="Afternoon (13:00 - 16:00)">Afternoon (13:00 – 16:00)</option>
            <option value="Evening (16:00 - 18:00)">Evening (16:00 – 18:00)</option>
          </select>
        </div>
      </div>

      {/* Row 5: Matter Summary */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
          Summary of Your Legal Matter / Injunction Need <span className="text-rose-500">*</span>
        </label>
        <textarea
          required
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Please describe the core dispute, creditor action, injury details, or transaction parameters. Please do not submit confidential trade secrets until formal representation is confirmed."
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-legal-gold-500 focus:bg-white focus:ring-1 focus:ring-legal-gold-500 text-sm rounded-sm outline-none transition"
        />
        <span className="text-[11px] text-slate-400 block mt-1">Minimum 20 characters.</span>
      </div>

      {/* Legal Disclaimer Consent Checkbox */}
      <div className="bg-legal-cream-100/70 border border-legal-gold-300/60 p-4 rounded-sm space-y-2">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={formData.hasConsent}
            onChange={(e) => setFormData({ ...formData, hasConsent: e.target.checked })}
            className="mt-1 h-4 w-4 rounded border-slate-400 text-legal-gold-600 focus:ring-legal-gold-500"
          />
          <span className="text-xs text-slate-700 leading-relaxed">
            <strong className="text-legal-navy-950 font-semibold">Mandatory Legal Acknowledgment:</strong> I understand that submitting this inquiry or communicating with Sterling &amp; Crest Legal Practitioners through this website does not establish an attorney-client relationship. An attorney-client relationship is created solely upon the mutual execution of an Engagement Letter following conflict clearance.
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-legal-gold-500 via-legal-gold-600 to-legal-gold-700 hover:from-legal-gold-600 hover:to-legal-gold-800 text-legal-navy-950 font-bold py-3.5 px-6 rounded-sm uppercase tracking-wider text-xs shadow-md transition disabled:opacity-50 flex items-center justify-center space-x-2"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-legal-navy-950 border-t-transparent rounded-full animate-spin mr-2" />
            <span>Transmitting Intake Record...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Submit Consultation Request</span>
          </>
        )}
      </button>

      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
        <span className="flex items-center">
          <Lock className="w-3 h-3 mr-1 text-slate-400" />
          End-to-End SSL Encrypted Intake
        </span>
        <span className="flex items-center">
          <PhoneCall className="w-3 h-3 mr-1 text-slate-400" />
          Urgent Injunction Line: +234 (01) 453-8900
        </span>
      </div>
    </form>
  );
}
