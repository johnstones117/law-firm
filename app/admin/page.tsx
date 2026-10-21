"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Scale,
  Shield,
  Users,
  Briefcase,
  FileText,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  AlertCircle,
  LogOut,
  RefreshCw,
  Search,
  Plus,
  Trash2,
  Edit,
  Eye,
  Settings,
  ShieldAlert,
  Building,
  Activity,
  Layers,
  Archive,
} from "lucide-react";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";

export default function AdminDashboardPage() {
  const router = useRouter();

  // Authentication & Session
  const [admin, setAdmin] = useState<{ id: string; email: string; name: string; role: string } | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  // Active view tab
  const [activeTab, setActiveTab] = useState<
    "overview" | "consultations" | "messages" | "attorneys" | "practiceAreas" | "articles" | "settings" | "auditLogs"
  >("overview");

  // Dashboard Data
  const [data, setData] = useState<any>(null);
  const [loadingData, setLoadingData] = useState(false);

  // Consultations state
  const [consultations, setConsultations] = useState<any[]>([]);
  const [selectedConsultation, setSelectedConsultation] = useState<any>(null);

  // Contact messages state
  const [messages, setMessages] = useState<any[]>([]);

  // Attorneys state
  const [attorneys, setAttorneys] = useState<any[]>([]);
  const [showAttorneyModal, setShowAttorneyModal] = useState(false);
  const [newAttorney, setNewAttorney] = useState({
    fullName: "",
    title: "Partner",
    designation: "Head of Practice Group",
    bio: "",
    detailedBio: "",
    photoUrl: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80",
    email: "",
    phone: "+234 (01) 453-8900",
    officeLocation: "Lagos Principal Chambers",
    isPartner: true,
    isFeatured: false,
    isPublished: true,
  });

  // Practice Areas state
  const [practiceAreas, setPracticeAreas] = useState<any[]>([]);

  // Articles state
  const [articles, setArticles] = useState<any[]>([]);

  // Settings state
  const [settings, setSettings] = useState<any[]>([]);
  const [savingSettings, setSavingSettings] = useState(false);

  // Check auth session
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) {
          router.push("/admin/login");
          return null;
        }
        return res.json();
      })
      .then((resData) => {
        if (resData?.authenticated) {
          setAdmin(resData.admin);
          loadDashboardData();
        }
        setLoadingSession(false);
      })
      .catch(() => {
        router.push("/admin/login");
      });
  }, [router]);

  const loadDashboardData = async () => {
    setLoadingData(true);
    try {
      const res = await fetch("/api/admin/dashboard");
      if (res.ok) {
        const json = await res.json();
        setData(json);
        setConsultations(json.recentConsultations || []);
        setMessages(json.recentMessages || []);
      }
    } catch {
      toast.error("Failed to load dashboard metrics");
    } finally {
      setLoadingData(false);
    }
  };

  const loadConsultations = async () => {
    try {
      const res = await fetch("/api/admin/consultations");
      const json = await res.json();
      setConsultations(json.consultations || []);
    } catch {
      toast.error("Error loading consultations");
    }
  };

  const loadMessages = async () => {
    try {
      const res = await fetch("/api/admin/contact-messages");
      const json = await res.json();
      setMessages(json.messages || []);
    } catch {
      toast.error("Error loading messages");
    }
  };

  const loadAttorneys = async () => {
    try {
      const res = await fetch("/api/admin/attorneys");
      const json = await res.json();
      setAttorneys(json.attorneys || []);
    } catch {
      toast.error("Error loading attorneys");
    }
  };

  const loadPracticeAreas = async () => {
    try {
      const res = await fetch("/api/admin/practice-areas");
      const json = await res.json();
      setPracticeAreas(json.practiceAreas || []);
    } catch {
      toast.error("Error loading practice areas");
    }
  };

  const loadArticles = async () => {
    try {
      const res = await fetch("/api/admin/articles");
      const json = await res.json();
      setArticles(json.articles || []);
    } catch {
      toast.error("Error loading articles");
    }
  };

  const loadSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      const json = await res.json();
      setSettings(json.settings || []);
    } catch {
      toast.error("Error loading settings");
    }
  };

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    if (tab === "consultations") loadConsultations();
    if (tab === "messages") loadMessages();
    if (tab === "attorneys") loadAttorneys();
    if (tab === "practiceAreas") loadPracticeAreas();
    if (tab === "articles") loadArticles();
    if (tab === "settings") loadSettings();
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.success("Logged out successfully");
    router.push("/admin/login");
  };

  // Update Consultation Status
  const handleUpdateConsultationStatus = async (id: string, status: string, notes?: string) => {
    try {
      const res = await fetch(`/api/admin/consultations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, adminNotes: notes }),
      });
      if (res.ok) {
        toast.success(`Status updated to ${status}`);
        loadConsultations();
        if (selectedConsultation?.id === id) {
          setSelectedConsultation((prev: any) => ({ ...prev, status, adminNotes: notes }));
        }
      }
    } catch {
      toast.error("Failed to update consultation");
    }
  };

  // Delete Consultation
  const handleDeleteConsultation = async (id: string) => {
    if (!confirm("Are you sure you want to delete this consultation inquiry?")) return;
    try {
      const res = await fetch(`/api/admin/consultations/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Consultation record deleted");
        loadConsultations();
        setSelectedConsultation(null);
      }
    } catch {
      toast.error("Failed to delete record");
    }
  };

  // Create Attorney
  const handleCreateAttorney = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/attorneys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAttorney),
      });
      if (res.ok) {
        toast.success("Attorney profile created");
        setShowAttorneyModal(false);
        loadAttorneys();
      }
    } catch {
      toast.error("Error creating attorney");
    }
  };

  // Delete Attorney
  const handleDeleteAttorney = async (id: string) => {
    if (!confirm("Delete this attorney profile?")) return;
    try {
      const res = await fetch(`/api/admin/attorneys/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Attorney deleted");
        loadAttorneys();
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  // Delete Article
  const handleDeleteArticle = async (id: string) => {
    if (!confirm("Delete this publication brief?")) return;
    try {
      const res = await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Article deleted");
        loadArticles();
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  // Save Settings
  const handleSaveSettings = async () => {
    setSavingSettings(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });
      if (res.ok) {
        toast.success("Chambers settings saved successfully");
      }
    } catch {
      toast.error("Failed to update settings");
    } finally {
      setSavingSettings(false);
    }
  };

  if (loadingSession) {
    return (
      <div className="min-h-screen bg-legal-navy-950 flex items-center justify-center text-slate-300">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-legal-gold-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-widest font-mono">Verifying Counsel Credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Admin Nav */}
      <header className="bg-legal-navy-950 text-white border-b border-legal-navy-800 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-legal-gold-400 to-legal-gold-700 flex items-center justify-center">
            <Scale className="w-5 h-5 text-legal-navy-950" />
          </div>
          <div>
            <span className="font-serif text-lg font-bold text-white tracking-wide block leading-none">
              Crest &amp; Sterling Alliance
            </span>
            <span className="text-[10px] text-legal-gold-400 uppercase tracking-widest block font-medium">
              Chambers Administrative Console
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-xs">
          <div className="hidden sm:block text-right">
            <strong className="text-slate-200 block">{admin?.name}</strong>
            <span className="text-slate-400 text-[10px] font-mono">{admin?.role} &bull; {admin?.email}</span>
          </div>

          <button
            onClick={handleLogout}
            className="bg-legal-navy-900 hover:bg-rose-950/60 hover:text-rose-300 text-slate-300 border border-legal-navy-700 px-3 py-1.5 rounded-sm uppercase tracking-wider text-[11px] font-semibold transition flex items-center"
          >
            <LogOut className="w-3.5 h-3.5 mr-1.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Sidebar */}
        <aside className="w-full md:w-64 bg-legal-navy-900 text-slate-300 p-4 border-r border-legal-navy-800 flex-shrink-0">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-bold text-legal-gold-400 uppercase tracking-widest px-3 block mb-2">
                Executive Desk
              </span>
              <nav className="space-y-1">
                <button
                  onClick={() => handleTabChange("overview")}
                  className={`w-full text-left px-3 py-2 rounded text-xs font-medium flex items-center transition ${
                    activeTab === "overview"
                      ? "bg-legal-navy-800 text-legal-gold-400 font-bold border-l-2 border-legal-gold-500"
                      : "hover:bg-legal-navy-800 text-slate-300"
                  }`}
                >
                  <Activity className="w-4 h-4 mr-2.5 text-legal-gold-400" />
                  Dashboard Overview
                </button>
              </nav>
            </div>

            <div>
              <span className="text-[10px] font-bold text-legal-gold-400 uppercase tracking-widest px-3 block mb-2">
                Chambers Inbox
              </span>
              <nav className="space-y-1">
                <button
                  onClick={() => handleTabChange("consultations")}
                  className={`w-full text-left px-3 py-2 rounded text-xs font-medium flex items-center justify-between transition ${
                    activeTab === "consultations"
                      ? "bg-legal-navy-800 text-legal-gold-400 font-bold border-l-2 border-legal-gold-500"
                      : "hover:bg-legal-navy-800 text-slate-300"
                  }`}
                >
                  <span className="flex items-center">
                    <Shield className="w-4 h-4 mr-2.5 text-legal-gold-400" />
                    Consultations
                  </span>
                  {data?.metrics?.newConsultations > 0 && (
                    <span className="bg-legal-gold-500 text-legal-navy-950 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {data.metrics.newConsultations}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => handleTabChange("messages")}
                  className={`w-full text-left px-3 py-2 rounded text-xs font-medium flex items-center justify-between transition ${
                    activeTab === "messages"
                      ? "bg-legal-navy-800 text-legal-gold-400 font-bold border-l-2 border-legal-gold-500"
                      : "hover:bg-legal-navy-800 text-slate-300"
                  }`}
                >
                  <span className="flex items-center">
                    <Mail className="w-4 h-4 mr-2.5 text-legal-gold-400" />
                    Contact Inquiries
                  </span>
                  {data?.metrics?.unreadMessages > 0 && (
                    <span className="bg-legal-gold-500 text-legal-navy-950 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {data.metrics.unreadMessages}
                    </span>
                  )}
                </button>
              </nav>
            </div>

            <div>
              <span className="text-[10px] font-bold text-legal-gold-400 uppercase tracking-widest px-3 block mb-2">
                Content Management
              </span>
              <nav className="space-y-1">
                <button
                  onClick={() => handleTabChange("attorneys")}
                  className={`w-full text-left px-3 py-2 rounded text-xs font-medium flex items-center transition ${
                    activeTab === "attorneys"
                      ? "bg-legal-navy-800 text-legal-gold-400 font-bold border-l-2 border-legal-gold-500"
                      : "hover:bg-legal-navy-800 text-slate-300"
                  }`}
                >
                  <Users className="w-4 h-4 mr-2.5 text-legal-gold-400" />
                  Attorneys Directory
                </button>

                <button
                  onClick={() => handleTabChange("practiceAreas")}
                  className={`w-full text-left px-3 py-2 rounded text-xs font-medium flex items-center transition ${
                    activeTab === "practiceAreas"
                      ? "bg-legal-navy-800 text-legal-gold-400 font-bold border-l-2 border-legal-gold-500"
                      : "hover:bg-legal-navy-800 text-slate-300"
                  }`}
                >
                  <Layers className="w-4 h-4 mr-2.5 text-legal-gold-400" />
                  Practice Areas
                </button>

                <button
                  onClick={() => handleTabChange("articles")}
                  className={`w-full text-left px-3 py-2 rounded text-xs font-medium flex items-center transition ${
                    activeTab === "articles"
                      ? "bg-legal-navy-800 text-legal-gold-400 font-bold border-l-2 border-legal-gold-500"
                      : "hover:bg-legal-navy-800 text-slate-300"
                  }`}
                >
                  <FileText className="w-4 h-4 mr-2.5 text-legal-gold-400" />
                  Insights &amp; Briefs
                </button>
              </nav>
            </div>

            <div>
              <span className="text-[10px] font-bold text-legal-gold-400 uppercase tracking-widest px-3 block mb-2">
                Governance &amp; Controls
              </span>
              <nav className="space-y-1">
                <button
                  onClick={() => handleTabChange("settings")}
                  className={`w-full text-left px-3 py-2 rounded text-xs font-medium flex items-center transition ${
                    activeTab === "settings"
                      ? "bg-legal-navy-800 text-legal-gold-400 font-bold border-l-2 border-legal-gold-500"
                      : "hover:bg-legal-navy-800 text-slate-300"
                  }`}
                >
                  <Settings className="w-4 h-4 mr-2.5 text-legal-gold-400" />
                  Chambers Site Settings
                </button>

                <button
                  onClick={() => handleTabChange("auditLogs")}
                  className={`w-full text-left px-3 py-2 rounded text-xs font-medium flex items-center transition ${
                    activeTab === "auditLogs"
                      ? "bg-legal-navy-800 text-legal-gold-400 font-bold border-l-2 border-legal-gold-500"
                      : "hover:bg-legal-navy-800 text-slate-300"
                  }`}
                >
                  <ShieldAlert className="w-4 h-4 mr-2.5 text-legal-gold-400" />
                  Audit Trail Logs
                </button>
              </nav>
            </div>
          </div>
        </aside>

        {/* Right Workspace Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && data && (
            <div className="space-y-8">
              <div>
                <h1 className="font-serif text-2xl font-bold text-slate-900">
                  Chambers Executive Overview
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Live operational telemetry &bull; Intake pipeline &bull; Publications
                </p>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm">
                  <span className="text-xs text-slate-500 uppercase font-semibold block">Total Consultations</span>
                  <div className="flex items-baseline justify-between mt-2">
                    <strong className="text-3xl font-serif text-legal-navy-950 font-bold">{data.metrics.totalConsultations}</strong>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      {data.metrics.newConsultations} New
                    </span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm">
                  <span className="text-xs text-slate-500 uppercase font-semibold block">Contact Inquiries</span>
                  <div className="flex items-baseline justify-between mt-2">
                    <strong className="text-3xl font-serif text-legal-navy-950 font-bold">{data.metrics.totalMessages}</strong>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {data.metrics.unreadMessages} Unread
                    </span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm">
                  <span className="text-xs text-slate-500 uppercase font-semibold block">Subscribed Clients</span>
                  <div className="flex items-baseline justify-between mt-2">
                    <strong className="text-3xl font-serif text-legal-navy-950 font-bold">{data.metrics.totalSubscribers}</strong>
                    <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">Active</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm">
                  <span className="text-xs text-slate-500 uppercase font-semibold block">Attorneys &amp; Counsel</span>
                  <div className="flex items-baseline justify-between mt-2">
                    <strong className="text-3xl font-serif text-legal-navy-950 font-bold">{data.metrics.totalAttorneys}</strong>
                    <span className="text-xs text-slate-500 font-mono">8 Practices</span>
                  </div>
                </div>
              </div>

              {/* Recent Consultations Table */}
              <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                  <h2 className="font-serif text-lg font-bold text-legal-navy-950">
                    Recent Consultation Inquiries
                  </h2>
                  <button
                    onClick={() => handleTabChange("consultations")}
                    className="text-xs text-legal-gold-700 hover:underline font-bold uppercase tracking-wider"
                  >
                    View All &rarr;
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-6">Reference</th>
                        <th className="py-3 px-6">Client Name</th>
                        <th className="py-3 px-6">Matter Type</th>
                        <th className="py-3 px-6">Contact Preference</th>
                        <th className="py-3 px-6">Status</th>
                        <th className="py-3 px-6">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {consultations.slice(0, 5).map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50 transition">
                          <td className="py-3 px-6 font-mono font-bold text-legal-navy-950">{c.referenceNumber}</td>
                          <td className="py-3 px-6 font-medium text-slate-800">{c.fullName}</td>
                          <td className="py-3 px-6 text-slate-600">{c.matterType}</td>
                          <td className="py-3 px-6 text-slate-500">{c.preferredContact}</td>
                          <td className="py-3 px-6">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              c.status === "NEW" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                            }`}>
                              {c.status}
                            </span>
                          </td>
                          <td className="py-3 px-6 text-slate-400 font-mono">{formatDate(c.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CONSULTATIONS INBOX */}
          {activeTab === "consultations" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-serif text-2xl font-bold text-slate-900">
                    Consultation Requests Inbox
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage prospective client submissions, conflict reviews, and intake notes.
                  </p>
                </div>
                <button
                  onClick={loadConsultations}
                  className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs px-3 py-1.5 rounded flex items-center font-semibold"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1" />
                  Refresh
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* List Column */}
                <div className="lg:col-span-7 bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 flex justify-between">
                    <span>Inquiry Intake Records ({consultations.length})</span>
                  </div>

                  <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
                    {consultations.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => setSelectedConsultation(c)}
                        className={`p-4 cursor-pointer transition ${
                          selectedConsultation?.id === c.id
                            ? "bg-legal-cream-100 border-l-4 border-legal-gold-600"
                            : "hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-legal-gold-700">
                            {c.referenceNumber}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            c.status === "NEW" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                          }`}>
                            {c.status}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-legal-navy-950 text-sm mt-1">
                          {c.fullName}
                        </h4>
                        <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                          {c.matterType} &bull; {c.phone}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detail View Column */}
                <div className="lg:col-span-5">
                  {selectedConsultation ? (
                    <div className="bg-white rounded border border-slate-200 shadow-sm p-6 space-y-4">
                      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-legal-gold-700 font-bold block">
                            {selectedConsultation.referenceNumber}
                          </span>
                          <h3 className="font-serif text-xl font-bold text-legal-navy-950">
                            {selectedConsultation.fullName}
                          </h3>
                        </div>
                        <button
                          onClick={() => handleDeleteConsultation(selectedConsultation.id)}
                          className="text-rose-600 hover:text-rose-800 text-xs p-1"
                          title="Delete inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-2 text-xs text-slate-700">
                        <p><strong>Email:</strong> {selectedConsultation.email}</p>
                        <p><strong>Phone:</strong> {selectedConsultation.phone}</p>
                        <p><strong>Company:</strong> {selectedConsultation.company || "N/A"}</p>
                        <p><strong>Matter Category:</strong> {selectedConsultation.matterType}</p>
                        <p><strong>Contact Method:</strong> {selectedConsultation.preferredContact}</p>
                        <p><strong>Preferred Timing:</strong> {selectedConsultation.preferredDate || "Flexible"} ({selectedConsultation.preferredTime || "Anytime"})</p>
                      </div>

                      <div className="bg-slate-50 p-3 rounded border border-slate-200 text-xs space-y-1">
                        <strong className="block text-slate-900">Matter Description:</strong>
                        <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                          {selectedConsultation.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 space-y-3">
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                          Update Intake Status
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {["NEW", "CONTACTED", "IN_REVIEW", "COMPLETED", "ARCHIVED"].map((st) => (
                            <button
                              key={st}
                              onClick={() => handleUpdateConsultationStatus(selectedConsultation.id, st)}
                              className={`text-[10px] font-bold px-3 py-1.5 rounded transition ${
                                selectedConsultation.status === st
                                  ? "bg-legal-navy-950 text-legal-gold-400"
                                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded border border-dashed border-slate-300 p-12 text-center text-slate-400 text-xs">
                      Select a consultation record from the left to inspect details and modify status.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONTACT INQUIRIES */}
          {activeTab === "messages" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-serif text-2xl font-bold text-slate-900">
                    General Contact Inquiries
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Messages received through the /contact page form.
                  </p>
                </div>
                <button
                  onClick={loadMessages}
                  className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs px-3 py-1.5 rounded flex items-center font-semibold"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1" />
                  Refresh
                </button>
              </div>

              <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-6">Sender</th>
                      <th className="py-3 px-6">Subject</th>
                      <th className="py-3 px-6">Message</th>
                      <th className="py-3 px-6">Date</th>
                      <th className="py-3 px-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {messages.map((m) => (
                      <tr key={m.id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-6">
                          <strong className="text-slate-900 block">{m.fullName}</strong>
                          <span className="text-slate-400 text-[11px]">{m.email}</span>
                        </td>
                        <td className="py-3 px-6 font-medium text-slate-800">{m.subject}</td>
                        <td className="py-3 px-6 text-slate-600 max-w-xs truncate">{m.message}</td>
                        <td className="py-3 px-6 text-slate-400 font-mono">{formatDate(m.createdAt)}</td>
                        <td className="py-3 px-6">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                            {m.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: ATTORNEYS DIRECTORY MANAGEMENT */}
          {activeTab === "attorneys" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-serif text-2xl font-bold text-slate-900">
                    Attorneys &amp; Counsel Management
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage practitioner profiles, qualifications, and published directories.
                  </p>
                </div>
                <button
                  onClick={() => setShowAttorneyModal(true)}
                  className="bg-legal-navy-950 hover:bg-legal-navy-800 text-legal-gold-400 text-xs px-4 py-2 rounded-sm font-bold uppercase tracking-wider flex items-center transition"
                >
                  <Plus className="w-3.5 h-3.5 mr-1.5" />
                  Add Attorney Profile
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {attorneys.map((att) => (
                  <div
                    key={att.id}
                    className="bg-white border border-slate-200 rounded p-6 shadow-sm flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-legal-gold-700 block">
                        {att.title}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-legal-navy-950 mt-1">
                        {att.fullName}
                      </h3>
                      <p className="text-xs text-slate-500 mb-2">{att.designation}</p>
                      <p className="text-xs text-slate-600 line-clamp-3">{att.bio}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-emerald-700 font-semibold text-[11px]">
                        {att.isPublished ? "● Published" : "○ Draft"}
                      </span>
                      <button
                        onClick={() => handleDeleteAttorney(att.id)}
                        className="text-rose-600 hover:text-rose-800 text-xs font-semibold flex items-center"
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Attorney Modal */}
              {showAttorneyModal && (
                <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
                  <div className="bg-white max-w-lg w-full rounded p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
                    <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
                      <h3 className="font-serif text-xl font-bold text-legal-navy-950">Add Counsel Profile</h3>
                      <button onClick={() => setShowAttorneyModal(false)} className="text-slate-400 hover:text-slate-700">&times;</button>
                    </div>

                    <form onSubmit={handleCreateAttorney} className="space-y-3 text-xs">
                      <div>
                        <label className="font-semibold block mb-1">Full Name &amp; Post-Nominals *</label>
                        <input
                          type="text"
                          required
                          value={newAttorney.fullName}
                          onChange={(e) => setNewAttorney({ ...newAttorney, fullName: e.target.value })}
                          className="w-full px-3 py-2 border rounded"
                          placeholder="e.g. Chief Babatunde Cole SAN"
                        />
                      </div>

                      <div>
                        <label className="font-semibold block mb-1">Title *</label>
                        <input
                          type="text"
                          required
                          value={newAttorney.title}
                          onChange={(e) => setNewAttorney({ ...newAttorney, title: e.target.value })}
                          className="w-full px-3 py-2 border rounded"
                          placeholder="Senior Partner / Senior Advocate of Nigeria"
                        />
                      </div>

                      <div>
                        <label className="font-semibold block mb-1">Designation *</label>
                        <input
                          type="text"
                          required
                          value={newAttorney.designation}
                          onChange={(e) => setNewAttorney({ ...newAttorney, designation: e.target.value })}
                          className="w-full px-3 py-2 border rounded"
                          placeholder="Head of Appellate Advocacy"
                        />
                      </div>

                      <div>
                        <label className="font-semibold block mb-1">Executive Biography *</label>
                        <textarea
                          required
                          rows={3}
                          value={newAttorney.bio}
                          onChange={(e) => setNewAttorney({ ...newAttorney, bio: e.target.value })}
                          className="w-full px-3 py-2 border rounded"
                          placeholder="Short summary for directory cards..."
                        />
                      </div>

                      <div>
                        <label className="font-semibold block mb-1">Chambers Email *</label>
                        <input
                          type="email"
                          required
                          value={newAttorney.email}
                          onChange={(e) => setNewAttorney({ ...newAttorney, email: e.target.value })}
                          className="w-full px-3 py-2 border rounded"
                          placeholder="counsel@crestandsterling.com"
                        />
                      </div>

                      <div className="pt-2 flex justify-end space-x-2">
                        <button
                          type="button"
                          onClick={() => setShowAttorneyModal(false)}
                          className="px-4 py-2 bg-slate-100 rounded text-slate-700"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-legal-navy-950 text-legal-gold-400 font-bold rounded uppercase tracking-wider text-[11px]"
                        >
                          Save Profile
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: PRACTICE AREAS */}
          {activeTab === "practiceAreas" && (
            <div className="space-y-6">
              <h1 className="font-serif text-2xl font-bold text-slate-900">
                Practice Areas Management
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {practiceAreas.map((pa) => (
                  <div key={pa.id} className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-2">
                    <span className="text-[10px] font-bold text-legal-gold-700 uppercase tracking-widest">{pa.slug}</span>
                    <h3 className="font-serif text-lg font-bold text-legal-navy-950">{pa.name}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2">{pa.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: ARTICLES & INSIGHTS */}
          {activeTab === "articles" && (
            <div className="space-y-6">
              <h1 className="font-serif text-2xl font-bold text-slate-900">
                Published Insights &amp; Legal Updates
              </h1>
              <div className="space-y-3">
                {articles.map((art) => (
                  <div key={art.id} className="bg-white p-5 rounded border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-legal-gold-700 uppercase">{art.category}</span>
                      <h4 className="font-serif font-bold text-legal-navy-950 text-sm mt-0.5">{art.title}</h4>
                      <p className="text-xs text-slate-500 font-mono">By {art.authorName} &bull; {art.readTime}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteArticle(art.id)}
                      className="text-rose-600 hover:text-rose-800 text-xs font-semibold p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: SITE SETTINGS */}
          {activeTab === "settings" && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h1 className="font-serif text-2xl font-bold text-slate-900">
                  Global Site Configuration &amp; Contact Settings
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Adjust chambers name, official intake phone numbers, and notification emails.
                </p>
              </div>

              <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-4">
                {settings.map((item, idx) => (
                  <div key={item.id || item.key} className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      {item.key} <span className="text-[10px] text-slate-400 font-normal">({item.description})</span>
                    </label>
                    <input
                      type="text"
                      value={item.value}
                      onChange={(e) => {
                        const updated = [...settings];
                        updated[idx].value = e.target.value;
                        setSettings(updated);
                      }}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-legal-gold-500 outline-none"
                    />
                  </div>
                ))}

                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={handleSaveSettings}
                    disabled={savingSettings}
                    className="bg-legal-gold-500 hover:bg-legal-gold-600 text-legal-navy-950 font-bold px-6 py-2.5 rounded-sm uppercase tracking-wider text-xs transition disabled:opacity-50"
                  >
                    {savingSettings ? "Saving Settings..." : "Save Configuration"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: AUDIT LOGS */}
          {activeTab === "auditLogs" && (
            <div className="space-y-6">
              <h1 className="font-serif text-2xl font-bold text-slate-900">
                Administrative Audit Logs
              </h1>
              <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-6">Timestamp</th>
                      <th className="py-3 px-6">Admin User</th>
                      <th className="py-3 px-6">Action</th>
                      <th className="py-3 px-6">Entity</th>
                      <th className="py-3 px-6">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(data?.recentAuditLogs || []).map((l: any) => (
                      <tr key={l.id} className="hover:bg-slate-50 transition font-mono">
                        <td className="py-3 px-6 text-slate-400">{new Date(l.createdAt).toLocaleTimeString()}</td>
                        <td className="py-3 px-6 text-slate-700 font-sans font-medium">{l.adminEmail}</td>
                        <td className="py-3 px-6">
                          <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-bold">
                            {l.action}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-slate-600 font-sans">{l.entity}</td>
                        <td className="py-3 px-6 text-slate-500 font-sans">{l.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
