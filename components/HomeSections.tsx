import Link from "next/link";
import Image from "next/image";
import {
  Scale,
  Shield,
  Briefcase,
  Gavel,
  ArrowRight,
  CheckCircle2,
  Clock,
  Award,
  Users,
  BookOpen,
  Phone,
  Landmark,
  Building2,
  Zap,
  HeartHandshake,
  ShieldAlert,
  ChevronRight,
  Quote,
} from "lucide-react";
import ConsultationForm from "./ConsultationForm";

interface HomeSectionsProps {
  practiceAreas: any[];
  attorneys: any[];
  caseStudies: any[];
  articles: any[];
  testimonials: any[];
}

export default function HomeSections({
  practiceAreas,
  attorneys,
  caseStudies,
  articles,
  testimonials,
}: HomeSectionsProps) {
  return (
    <div className="space-y-0">
      {/* ========================================================= */}
      {/* 1. HERO SECTION                                           */}
      {/* ========================================================= */}
      <section className="relative bg-legal-navy-950 text-white overflow-hidden py-24 sm:py-32 border-b border-legal-navy-800">
        {/* Subtle Architectural Texture & Background Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-legal-navy-800 via-legal-navy-950 to-legal-charcoal-950 opacity-90" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-legal-gold-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-legal-navy-700/20 rounded-full blur-2xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-legal-navy-900/80 border border-legal-gold-500/30 px-3.5 py-1.5 rounded-sm">
                <Shield className="w-4 h-4 text-legal-gold-400" />
                <span className="text-xs font-semibold uppercase tracking-widest text-legal-gold-300">
                  American College of Trial Lawyers &bull; International Arbitrators
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                Strategic Legal Counsel For{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-legal-gold-300 via-legal-gold-400 to-legal-gold-600">
                  Complex Matters
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl font-light">
                Uncompromising trial advocacy, corporate restructuring, and high-stakes dispute resolution. Defending institutional capital, rescuing distressed businesses, and championing justice for catastrophic injury victims.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/consultation"
                  className="bg-gradient-to-r from-legal-gold-500 via-legal-gold-600 to-legal-gold-700 hover:from-legal-gold-600 hover:to-legal-gold-800 text-legal-navy-950 font-bold px-8 py-4 rounded-sm uppercase tracking-wider text-xs shadow-lg transition flex items-center justify-center group"
                >
                  <span>Request Case Evaluation</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/practice-areas"
                  className="bg-legal-navy-900/80 hover:bg-legal-navy-800 text-slate-200 hover:text-white border border-legal-navy-700 font-semibold px-8 py-4 rounded-sm uppercase tracking-wider text-xs transition flex items-center justify-center"
                >
                  Explore Practice Areas
                </Link>
              </div>

              {/* Verified Trust Badges */}
              <div className="pt-8 border-t border-legal-navy-800 grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <strong className="block font-serif text-2xl sm:text-3xl text-legal-gold-400 font-bold">
                    32+
                  </strong>
                  <span className="text-xs text-slate-400 uppercase tracking-wide">
                    Years of Advocacy
                  </span>
                </div>
                <div>
                  <strong className="block font-serif text-2xl sm:text-3xl text-legal-gold-400 font-bold">
                    $3.5B+
                  </strong>
                  <span className="text-xs text-slate-400 uppercase tracking-wide">
                    Transactions Structured
                  </span>
                </div>
                <div>
                  <strong className="block font-serif text-2xl sm:text-3xl text-legal-gold-400 font-bold">
                    140+
                  </strong>
                  <span className="text-xs text-slate-400 uppercase tracking-wide">
                    Appellate Precedents
                  </span>
                </div>
                <div>
                  <strong className="block font-serif text-2xl sm:text-3xl text-legal-gold-400 font-bold">
                    4
                  </strong>
                  <span className="text-xs text-slate-400 uppercase tracking-wide">
                    Global Chambers
                  </span>
                </div>
              </div>
            </div>

            {/* Right Hero Intake Quick Card */}
            <div className="lg:col-span-5">
              <div className="bg-legal-navy-900/90 border border-legal-gold-600/30 rounded-sm p-6 sm:p-8 shadow-2xl backdrop-blur">
                <div className="flex items-center justify-between border-b border-legal-navy-800 pb-4 mb-6">
                  <div>
                    <span className="text-[11px] font-semibold tracking-widest text-legal-gold-400 uppercase">
                      Chambers Direct Intake
                    </span>
                    <h3 className="font-serif text-xl text-white font-bold">
                      Immediate Legal Consultation
                    </h3>
                  </div>
                  <Scale className="w-7 h-7 text-legal-gold-400" />
                </div>

                <div className="space-y-4 text-xs text-slate-300 mb-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-legal-gold-400 flex-shrink-0 mt-0.5" />
                    <span>Direct review by Practice Group Leaders &amp; Senior Counsel.</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-legal-gold-400 flex-shrink-0 mt-0.5" />
                    <span>Emergency interim injunctions and creditor debt freezes.</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-legal-gold-400 flex-shrink-0 mt-0.5" />
                    <span>Strict confidentiality and conflict-of-interest screening.</span>
                  </div>
                </div>

                <Link
                  href="/consultation"
                  className="block w-full text-center bg-legal-gold-500 hover:bg-legal-gold-600 text-legal-navy-950 font-bold py-3.5 px-4 rounded-sm uppercase tracking-wider text-xs transition shadow-md"
                >
                  Open Confidential Intake Form
                </Link>

                <div className="mt-4 pt-4 border-t border-legal-navy-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center text-slate-300">
                    <Phone className="w-3.5 h-3.5 mr-1.5 text-legal-gold-400" />
                    (312) 736-8337
                  </span>
                  <span className="text-slate-400">Response within 2 hrs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. THE FIRM'S VALUE: MULTIDISCIPLINARY STRENGTH           */}
      {/* Inspired by reaveslee.com's "Through Bad Times" philosophy */}
      {/* ========================================================= */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-legal-gold-600 block">
                The Heritage of Crest &amp; Sterling Alliance
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-legal-navy-950 font-bold leading-tight">
                Navigating Unprecedented Challenges With Decisive Legal Precision
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                At Crest &amp; Sterling Alliance, our practice architecture reflects the harsh realities of commercial life: financial crises often trigger existential litigation, regulatory turbulence threatens viable enterprises, and catastrophic industrial accidents destabilize corporate and family legacies.
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                By uniting corporate restructuring, aggressive trial advocacy, and high-stakes tort recovery under one roof, our chambers provides full-spectrum relief. We halt aggressive creditor actions, fight multinational insurers, and structure multimillion-dollar transactions with equal mastery.
              </p>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center font-semibold text-xs uppercase tracking-wider text-legal-navy-950 hover:text-legal-gold-600 transition"
                >
                  <span>Learn About Our Firm &amp; Values</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-legal-cream-50 p-6 rounded-sm border border-slate-200 space-y-3">
                <ShieldAlert className="w-8 h-8 text-legal-gold-600" />
                <h3 className="font-serif text-lg font-bold text-legal-navy-950">
                  Immediate Debt &amp; Asset Protection
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We stop creditor harassment, challenge unlawful receivership takeovers under the U.S. Bankruptcy Code and UCC, and restructure corporate liabilities.
                </p>
              </div>

              <div className="bg-legal-cream-50 p-6 rounded-sm border border-slate-200 space-y-3">
                <Gavel className="w-8 h-8 text-legal-gold-600" />
                <h3 className="font-serif text-lg font-bold text-legal-navy-950">
                  Fierce Trial &amp; Appellate Advocacy
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Led by ABA-recognized Fellows and FACTL Members, we prepare every dispute for decisive victory before the courts and arbitral tribunals.
                </p>
              </div>

              <div className="bg-legal-cream-50 p-6 rounded-sm border border-slate-200 space-y-3">
                <HeartHandshake className="w-8 h-8 text-legal-gold-600" />
                <h3 className="font-serif text-lg font-bold text-legal-navy-950">
                  Catastrophic Injury Recovery
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Relentless pursuit of damages for industrial negligence, offshore casualties, and fatal accident victims across the United States.
                </p>
              </div>

              <div className="bg-legal-cream-50 p-6 rounded-sm border border-slate-200 space-y-3">
                <Briefcase className="w-8 h-8 text-legal-gold-600" />
                <h3 className="font-serif text-lg font-bold text-legal-navy-950">
                  Corporate Architecture &amp; M&amp;A
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Structuring complex syndicated credit, energy concessions, and FinTech market entries across the US and global markets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. THREE EASY STEPS TO RELIEF & ANSWERS (ReavesLee model) */}
      {/* ========================================================= */}
      <section className="py-20 bg-legal-navy-950 text-white border-b border-legal-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-legal-gold-400">
              Clear Guidance &bull; Fast Action &bull; Decisive Relief
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Get Answers in Three Straightforward Steps
            </h2>
            <p className="text-slate-300 text-sm font-light">
              We cut through bureaucratic legal jargon to evaluate your matter immediately and implement decisive legal protections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-legal-navy-900 border border-legal-navy-800 p-8 rounded-sm relative group hover:border-legal-gold-500/50 transition">
              <span className="text-4xl font-serif font-bold text-legal-gold-500/30 group-hover:text-legal-gold-400/50 transition">
                01
              </span>
              <h3 className="font-serif text-xl font-bold text-white mt-4 mb-3">
                Confidential Contact
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Call our direct chambers line at <strong className="text-white">(312) 736-8337</strong> or submit our secure intake evaluation form.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-legal-navy-900 border border-legal-navy-800 p-8 rounded-sm relative group hover:border-legal-gold-500/50 transition">
              <span className="text-4xl font-serif font-bold text-legal-gold-500/30 group-hover:text-legal-gold-400/50 transition">
                02
              </span>
              <h3 className="font-serif text-xl font-bold text-white mt-4 mb-3">
                Speak With a Senior Counsel
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Following swift conflict-of-interest clearance, you will consult directly with a specialized Practice Group Leader.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-legal-navy-900 border border-legal-navy-800 p-8 rounded-sm relative group hover:border-legal-gold-500/50 transition">
              <span className="text-4xl font-serif font-bold text-legal-gold-500/30 group-hover:text-legal-gold-400/50 transition">
                03
              </span>
              <h3 className="font-serif text-xl font-bold text-white mt-4 mb-3">
                Execute Tactical Legal Strategy
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                We move rapidly to stop creditor actions, obtain emergency court injunctions, or launch commercial claims.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/consultation"
              className="inline-flex items-center bg-legal-gold-500 hover:bg-legal-gold-600 text-legal-navy-950 font-bold px-8 py-3.5 rounded-sm uppercase tracking-wider text-xs shadow-md transition"
            >
              <span>Begin Your Case Evaluation</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. PRACTICE AREAS SHOWCASE                                */}
      {/* ========================================================= */}
      <section className="py-24 bg-legal-cream-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-legal-gold-600">
                Chambers Practice Groups
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-legal-navy-950 font-bold">
                Specialized Legal Disciplines Built For Complex Commercial Realities
              </h2>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                href="/practice-areas"
                className="text-xs uppercase font-bold tracking-wider text-legal-navy-950 hover:text-legal-gold-600 transition flex items-center"
              >
                <span>View All Practice Areas</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {practiceAreas.slice(0, 8).map((area) => (
              <div
                key={area.id}
                className="bg-white border border-slate-200 p-6 rounded-sm shadow-subtle legal-card-hover flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded bg-legal-navy-950 text-legal-gold-400 flex items-center justify-center mb-5">
                    <Scale className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-legal-navy-950 mb-2 leading-snug">
                    {area.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6 line-clamp-3">
                    {area.summary}
                  </p>
                </div>

                <Link
                  href={`/practice-areas/${area.slug}`}
                  className="text-xs uppercase font-bold tracking-wider text-legal-gold-700 hover:text-legal-navy-950 transition flex items-center pt-4 border-t border-slate-100"
                >
                  <span>Explore Practice</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. FEATURED ATTORNEYS                                     */}
      {/* ========================================================= */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-legal-gold-600">
              Chambers Leadership
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-legal-navy-950 font-bold">
              Meet Our Senior Partners &amp; Advocates
            </h2>
            <p className="text-slate-600 text-sm">
              Distinguished courtroom trial lawyers, ABA Fellows, and cross-border commercial advisors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {attorneys.slice(0, 3).map((attorney) => (
              <div
                key={attorney.id}
                className="bg-legal-cream-50 border border-slate-200 rounded-sm overflow-hidden legal-card-hover flex flex-col"
              >
                <div className="relative h-72 w-full bg-slate-200">
                  <Image
                    src={attorney.photoUrl}
                    alt={attorney.fullName}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-legal-navy-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[11px] font-semibold text-legal-gold-400 uppercase tracking-widest block">
                      {attorney.title}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white">
                      {attorney.fullName}
                    </h3>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-xs font-semibold text-legal-navy-800 block mb-2">
                      {attorney.designation}
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {attorney.bio}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                    <Link
                      href={`/people/${attorney.slug}`}
                      className="text-xs uppercase font-bold tracking-wider text-legal-navy-950 hover:text-legal-gold-600 transition flex items-center"
                    >
                      <span>Full Profile &amp; Matters</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/people"
              className="inline-flex items-center font-bold text-xs uppercase tracking-wider text-legal-navy-950 hover:text-legal-gold-600 transition"
            >
              <span>View All Attorneys &amp; Counsel</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. REPRESENTATIVE MATTERS / CASE STUDIES                  */}
      {/* ========================================================= */}
      <section className="py-24 bg-legal-navy-950 text-white border-b border-legal-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-legal-gold-400">
                Proven Track Record
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold">
                Representative Matters &amp; Decisive Victories
              </h2>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                href="/case-studies"
                className="text-xs uppercase font-bold tracking-wider text-legal-gold-400 hover:text-white transition flex items-center"
              >
                <span>View All Case Studies</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.slice(0, 4).map((cs) => (
              <div
                key={cs.id}
                className="bg-legal-navy-900 border border-legal-navy-800 p-8 rounded-sm space-y-4 hover:border-legal-gold-500/40 transition"
              >
                <div className="flex items-center justify-between text-xs text-legal-gold-400">
                  <span className="uppercase tracking-wider font-semibold">
                    {cs.practiceAreaName}
                  </span>
                  <span className="text-slate-400 font-mono">{cs.matterYear}</span>
                </div>

                <h3 className="font-serif text-xl font-bold text-white leading-snug">
                  {cs.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {cs.summary}
                </p>

                <div className="bg-legal-navy-950 p-4 rounded border-l-2 border-legal-gold-400 text-xs space-y-1">
                  <strong className="text-legal-gold-300 block">Decisive Outcome:</strong>
                  <p className="text-slate-300">{cs.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. CLIENT TESTIMONIALS (Inspired by reaveslee.com)        */}
      {/* ========================================================= */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-legal-gold-600">
              Client Endorsements
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-legal-navy-950 font-bold">
              What Our Clients Say
            </h2>
            <p className="text-slate-600 text-sm">
              Trusted by corporate boards, institutional financiers, and private clients through their most demanding challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-legal-cream-50 border border-slate-200 p-6 rounded-sm flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <Quote className="w-8 h-8 text-legal-gold-500 opacity-60" />
                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <strong className="font-serif font-bold text-legal-navy-950 block text-sm">
                    {t.clientName}
                  </strong>
                  <span className="text-[11px] text-slate-500 block">
                    {t.clientRole}, {t.company}
                  </span>
                  <span className="inline-block mt-2 text-[10px] font-semibold text-legal-gold-700 uppercase tracking-wider bg-legal-cream-200 px-2 py-0.5 rounded">
                    {t.caseType}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. LATEST LEGAL INSIGHTS & PUBLICATIONS                   */}
      {/* ========================================================= */}
      <section className="py-24 bg-legal-cream-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-legal-gold-600">
                Thought Leadership
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-legal-navy-950 font-bold">
                Articles, Regulatory Briefs &amp; Legal Updates
              </h2>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                href="/insights"
                className="text-xs uppercase font-bold tracking-wider text-legal-navy-950 hover:text-legal-gold-600 transition flex items-center"
              >
                <span>Browse All Publications</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(0, 3).map((art) => (
              <div
                key={art.id}
                className="bg-white border border-slate-200 rounded-sm overflow-hidden legal-card-hover flex flex-col justify-between"
              >
                <div className="relative h-48 w-full bg-slate-200">
                  <Image
                    src={art.coverImage}
                    alt={art.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-legal-navy-950/90 text-legal-gold-400 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                    {art.category.replace(/_/g, " ")}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[11px] text-slate-400 block font-mono">
                      {art.readTime} &bull; By {art.authorName}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-legal-navy-950 leading-snug line-clamp-2">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {art.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <Link
                      href={`/insights/${art.slug}`}
                      className="text-xs uppercase font-bold tracking-wider text-legal-gold-700 hover:text-legal-navy-950 transition flex items-center"
                    >
                      <span>Read Full Brief</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. BOTTOM CONSULTATION INTAKE CTA                         */}
      {/* ========================================================= */}
      <section className="py-24 bg-legal-navy-950 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-legal-gold-400 block">
                Take Immediate Action
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Let&rsquo;s Discuss Your Legal Needs
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Whether you are facing aggressive creditor enforcement, preparing for bet-the-company commercial litigation, or seeking counsel on a cross-border acquisition, our partners are ready to protect your interests.
              </p>

              <div className="space-y-4 text-xs text-slate-300 pt-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded bg-legal-navy-900 border border-legal-navy-700 flex items-center justify-center text-legal-gold-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-slate-400 text-[11px]">Direct Chambers Telephone</span>
                    <strong className="text-white text-sm font-mono">(312) 736-8337</strong>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded bg-legal-navy-900 border border-legal-navy-700 flex items-center justify-center text-legal-gold-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-slate-400 text-[11px]">Intake Review Protocol</span>
                    <strong className="text-white text-sm">Conflict check &amp; callback within 2 hours</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ConsultationForm isCompact={false} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
