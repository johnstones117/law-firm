import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Crest & Sterling Law Firm database seed...");

  // 1. Clear existing records to ensure clean state
  await prisma.auditLog.deleteMany();
  await prisma.jobApplication.deleteMany();
  await prisma.jobPosting.deleteMany();
  await prisma.consultationRequest.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.newsletterSubscriber.deleteMany();
  await prisma.faq.deleteMany();
  await prisma.siteSetting.deleteMany();
  await prisma.office.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.caseStudy.deleteMany();
  await prisma.article.deleteMany();
  await prisma.industry.deleteMany();
  await prisma.attorneyPracticeArea.deleteMany();
  await prisma.attorney.deleteMany();
  await prisma.practiceArea.deleteMany();
  await prisma.adminUser.deleteMany();

  // 2. Create Super Admin
  const adminSalt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(
    process.env.INITIAL_ADMIN_PASS || "Sterling@Admin2026!",
    adminSalt
  );

  const superAdmin = await prisma.adminUser.create({
    data: {
      email: process.env.INITIAL_ADMIN_EMAIL || "senior.partner@crestwoodalliance.com",
      passwordHash,
      name: "James A. Sterling, Esq.",
      role: "SUPER_ADMIN",
      isActive: true,
    },
  });
  console.log(`✓ Admin created: ${superAdmin.email}`);

  // 3. Practice Areas
  const practiceAreasData = [
    {
      slug: "dispute-resolution-litigation",
      name: "Dispute Resolution & Commercial Litigation",
      tagline: "Uncompromising trial advocacy and strategic courtroom representation.",
      iconName: "Scale",
      summary:
        "Recognized by domestic and international directories as one of the nation's most formidable litigation practices, representing corporations, financial institutions, and government entities before all federal and state courts.",
      overview:
        "Our Dispute Resolution group combines fierce trial advocacy with pragmatic commercial acumen. We represent clients in high-stakes corporate disputes, breach of contract, shareholder actions, fraud recovery, and enforcement of foreign judgments. Our attorneys are trusted for their intellectual rigor and decisive courtroom strategies.",
      keyServices: JSON.stringify([
        "Commercial Litigation before Federal District Courts, Circuit Courts & U.S. Supreme Court",
        "Asset Tracing, Temporary Restraining Orders & Emergency Injunctive Relief",
        "Shareholder & Corporate Governance Disputes",
        "Enforcement of Foreign Judgments and Arbitral Awards",
        "White-Collar Defense & Financial Crime Representation",
      ]),
      relevantIndustries: JSON.stringify([
        "Banking & Financial Institutions",
        "Oil, Gas & Energy",
        "Technology & Telecommunications",
        "Manufacturing & Conglomerates",
      ]),
      displayOrder: 1,
      isFeatured: true,
    },
    {
      slug: "corporate-commercial",
      name: "Corporate & Commercial Law",
      tagline: "Strategic legal architecture for mergers, acquisitions, and cross-border expansion.",
      iconName: "Briefcase",
      summary:
        "Providing counsel on market entry, multi-jurisdictional joint ventures, regulatory compliance, corporate governance, and complex commercial agreements across the US and global markets.",
      overview:
        "We serve as trusted outside general counsel to leading domestic corporations and multinational enterprises. From structuring foreign direct investment to navigating regulatory approvals with the SEC, FTC, and industry watchdogs, we ensure commercial ventures are legally resilient and tax-efficient.",
      keyServices: JSON.stringify([
        "Mergers, Acquisitions & Corporate Restructuring",
        "Foreign Direct Investment & Market Entry Strategy",
        "Corporate Governance, Board Advisory & Compliance Audits",
        "Joint Venture, Consortium & Shareholder Agreements",
        "Commercial Contracts, Distribution & Licensing",
      ]),
      relevantIndustries: JSON.stringify([
        "Private Equity & Venture Capital",
        "FinTech & Digital Commerce",
        "Consumer Goods & Retail",
        "Healthcare & Pharmaceuticals",
      ]),
      displayOrder: 2,
      isFeatured: true,
    },
    {
      slug: "bankruptcy-insolvency-restructuring",
      name: "Bankruptcy, Insolvency & Corporate Restructuring",
      tagline: "Immediate debt relief, creditor negotiations, and corporate rescue solutions.",
      iconName: "ShieldAlert",
      summary:
        "Providing proactive legal interventions for distressed corporations, institutional lenders, and high-net-worth debtors to halt creditor enforcement, restructure liabilities, and safeguard essential assets.",
      overview:
        "Financial crises demand immediate, decisive legal intervention. Our team works to halt predatory creditor actions, stop foreclosures and receivership seizures, and negotiate manageable repayment moratoriums. We advise on Chapter 11 reorganizations, Chapter 7 liquidations, out-of-court workouts, and cross-border insolvency proceedings under the U.S. Bankruptcy Code.",
      keyServices: JSON.stringify([
        "Chapter 11 Reorganization & Corporate Debt Restructuring",
        "Receivership, Administration & Liquidation Management",
        "Defending Against Foreclosures and Asset Seizures",
        "Out-of-Court Workouts & Creditor Standstill Agreements",
        "Cross-Border Insolvency & Asset Protection",
      ]),
      relevantIndustries: JSON.stringify([
        "Aviation & Maritime Logistics",
        "Real Estate Development",
        "Hospitality & Commercial Services",
        "Industrial Manufacturing",
      ]),
      displayOrder: 3,
      isFeatured: true,
    },
    {
      slug: "personal-injury-complex-torts",
      name: "Personal Injury & Complex Tort Litigation",
      tagline: "Relentless pursuit of justice and maximum recovery for catastrophic injury victims.",
      iconName: "HeartHandshake",
      summary:
        "Championing the rights of individuals and families who have suffered catastrophic harm from vehicular crashes, workplace accidents, maritime disasters, and corporate negligence.",
      overview:
        "When catastrophic physical injury collides with mounting medical expenses and loss of livelihood, victims face immense trauma. Our personal injury trial team fights against insurance companies and corporate wrongdoers. We operate with relentless dedication to secure full compensation for medical care, lost earnings, and emotional distress.",
      keyServices: JSON.stringify([
        "Catastrophic Motor Vehicle & Interstate Trucking Accidents",
        "Industrial, Offshore & Construction Site Injuries",
        "Wrongful Death & Fatal Accident Claims",
        "Product Liability & Defective Medical Device Litigation",
        "Insurance Bad Faith & Structured Settlements",
      ]),
      relevantIndustries: JSON.stringify([
        "Transportation & Haulage",
        "Construction & Infrastructure",
        "Maritime & Offshore Operations",
        "Insurance Underwriting",
      ]),
      displayOrder: 4,
      isFeatured: true,
    },
    {
      slug: "banking-finance-fintech",
      name: "Banking, Finance & FinTech",
      tagline: "Structuring syndicated credit, capital markets offerings, and regulatory compliance.",
      iconName: "Landmark",
      summary:
        "Advising commercial banks, development finance institutions, and disruptive payment processors on syndicated facilities, asset-backed securities, and Federal Reserve & SEC regulatory frameworks.",
      overview:
        "Our finance group navigates the rapidly evolving nexus of traditional banking and financial technology. We advise lenders and borrowers on facility agreements, collateral perfection, project finance, debt syndication, and digital payment compliance with the Federal Reserve, OCC, CFPB, and FinCEN.",
      keyServices: JSON.stringify([
        "Syndicated Lending, Structured Finance & Security Creation",
        "FinTech Licensing (Money Transmitter, Payment Facilitator, BNPL)",
        "Project Finance & Public-Private Partnerships (PPP)",
        "Debt Capital Markets, Bond Issuances & Commercial Papers",
        "Anti-Money Laundering (AML) & OFAC Sanctions Compliance",
      ]),
      relevantIndustries: JSON.stringify([
        "Commercial & Investment Banks",
        "FinTech & Neo-banks",
        "Credit Unions & Community Banks",
        "Multilateral Development Agencies",
      ]),
      displayOrder: 5,
      isFeatured: true,
    },
    {
      slug: "energy-natural-resources",
      name: "Energy, Power & Natural Resources",
      tagline: "Navigating federal energy regulations, renewable transitions, and upstream concessions.",
      iconName: "Zap",
      summary:
        "Counseling oil majors, independent producers, solar developers, and mining consortia on licensing, farm-ins, power purchase agreements (PPAs), and environmental compliance.",
      overview:
        "Our energy team delivers end-to-end legal solutions across the value chain, from upstream petroleum concessions and gas monetization under FERC and DOE regulations to off-grid solar projects and IPP power generation. We represent clients in negotiations with regulatory agencies, state utility commissions, and international financiers.",
      keyServices: JSON.stringify([
        "Upstream Concession Licensing, Farm-in Agreements & JOAs",
        "Gas Sale and Aggregation Agreements (GSAA)",
        "Power Purchase Agreements (PPAs) & Grid Interconnection",
        "Mining Leases, Exploration Permits & NEPA Compliance",
        "Environmental Impact Assessment & CERCLA/Clean Air Act Compliance",
      ]),
      relevantIndustries: JSON.stringify([
        "Oil & Gas Exploration & Production",
        "Renewable Energy & Solar IPPs",
        "Solid Minerals & Mining",
        "Offshore Marine Services",
      ]),
      displayOrder: 6,
      isFeatured: true,
    },
    {
      slug: "real-estate-infrastructure",
      name: "Real Estate & Infrastructure Development",
      tagline: "Strategic land acquisition, title perfection, and commercial property development.",
      iconName: "Building2",
      summary:
        "Guiding institutional investors, real estate funds, and private developers through major acquisitions, construction contracts, title insurance, and property dispute resolution.",
      overview:
        "Real estate in high-growth metropolitan markets presents unique title and regulatory complexities. Our practice delivers meticulous due diligence, title verification, dispute management, and development agreements for commercial towers, residential estates, and industrial hubs across New York, Texas, and beyond.",
      keyServices: JSON.stringify([
        "Title Investigation & Title Insurance Coordination",
        "AIA Construction Contracts & EPC Agreements",
        "Commercial Leasing & Property Management Agreements",
        "Real Estate Investment Trusts (REITs) & Joint Development Agreements",
        "Land Use Litigation & Eminent Domain Compensation",
      ]),
      relevantIndustries: JSON.stringify([
        "Property Developers & REITs",
        "Hospitality & Commercial Centers",
        "Industrial Logistics Parks",
        "Private High-Net-Worth Estates",
      ]),
      displayOrder: 7,
      isFeatured: false,
    },
    {
      slug: "technology-data-ip",
      name: "Technology, Data Protection & Intellectual Property",
      tagline: "Securing intellectual capital, software patents, and CCPA/GDPR compliance.",
      iconName: "Cpu",
      summary:
        "Advising venture-backed technology startups, digital platforms, and multinational brands on trademark portfolios, data privacy compliance, and software licensing.",
      overview:
        "We assist innovative enterprises in safeguarding their intellectual capital and establishing compliant data privacy governance frameworks. Our attorneys advise on CCPA, GDPR, HIPAA compliance, software licensing, SaaS terms of service, and brand anti-counterfeiting before the USPTO and federal courts.",
      keyServices: JSON.stringify([
        "Trademark, Copyright & Patent Registration & Enforcement before USPTO",
        "Data Protection Impact Assessments (DPIA) & CCPA/GDPR Privacy Compliance",
        "SaaS Agreements, Software Licensing & IP Assignment",
        "Brand Protection, Cease & Desist Actions & Domain Disputes",
        "Technology Transfer & ITAR/EAR Export Control Compliance",
      ]),
      relevantIndustries: JSON.stringify([
        "SaaS & Enterprise Software",
        "E-Commerce & Digital Media",
        "Telecommunications & ISP Providers",
        "Creative Arts, Fashion & Entertainment",
      ]),
      displayOrder: 8,
      isFeatured: false,
    },
  ];

  const createdPracticeAreas = [];
  for (const pa of practiceAreasData) {
    const created = await prisma.practiceArea.create({ data: pa });
    createdPracticeAreas.push(created);
  }
  console.log(`✓ Created ${createdPracticeAreas.length} practice areas`);

  // 4. Attorneys
  const attorneysData = [
    {
      slug: "james-sterling-esq",
      fullName: "James A. Sterling, Esq.",
      title: "Founding & Senior Partner",
      designation: "Head of Dispute Resolution & Appellate Advocacy",
      bio: "James A. Sterling is a nationally recognized trial attorney with over 32 years of high-stakes courtroom and arbitration experience. He is celebrated for his strategic mastery in complex commercial, constitutional, and energy disputes before federal and state courts.",
      detailedBio:
        "James A. Sterling is one of America's preeminent trial attorneys and commercial arbitrators. A Fellow of the American College of Trial Lawyers, he has argued over 140 landmark appeals before the U.S. Courts of Appeals and the Supreme Court, setting vital precedents in corporate insolvency, energy regulation, and arbitral enforcement.\n\nHe serves as a Fellow of the Chartered Institute of Arbitrators (UK) and frequently sits as sole arbitrator and tribunal chairman in New York, London, and Paris under ICC, AAA/ICDR, and JAMS rules. He advises corporate boards on existential regulatory crises and bet-the-company litigation.",
      photoUrl:
        "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80",
      email: "j.sterling@crestwoodalliance.com",
      phone: "+1 (212) 900-4801",
      officeLocation: "New York Principal Chambers",
      admissions: JSON.stringify([
        "New York State Bar (1991)",
        "U.S. District Court, Southern & Eastern Districts of New York",
        "U.S. Court of Appeals, Second Circuit",
        "U.S. Supreme Court",
        "Fellow, American College of Trial Lawyers (FACTL)",
        "Fellow, Chartered Institute of Arbitrators (FCIArb, UK)",
      ]),
      education: JSON.stringify([
        "LL.M. in International Commercial Law, Columbia Law School",
        "J.D. (magna cum laude), New York University School of Law",
        "B.A. (Political Science), Yale University",
      ]),
      qualifications: JSON.stringify([
        "Chambers USA Band 1 Senior Statesperson",
        "Legal 500 US Hall of Fame: Commercial Litigation",
        "Past Chair, ABA Section on Litigation",
      ]),
      languages: JSON.stringify(["English (Native)", "French (Professional)"]),
      isPartner: true,
      isFeatured: true,
      displayOrder: 1,
      practiceSlugs: ["dispute-resolution-litigation", "energy-natural-resources"],
    },
    {
      slug: "victoria-crest-llm",
      fullName: "Victoria Crest, LL.M. (Harvard)",
      title: "Managing Partner",
      designation: "Head of Corporate, M&A & Private Equity",
      bio: "Victoria Crest is a distinguished corporate finance and cross-border M&A specialist. She has guided over $4.2B in strategic transactions across North America, Europe, and emerging markets.",
      detailedBio:
        "Victoria oversees the firm's strategic operations while heading the premier Corporate & Commercial practice group. Prior to co-founding Crest & Sterling, she practiced with Am Law 100 firms in New York and London. Victoria advises blue-chip conglomerates, private equity sponsors, and sovereign wealth entities on divestitures, corporate governance overhauls, and public-private partnerships.\n\nHer reputation for rigorous deal architecture and swift regulatory clearance makes her the advisor of choice for high-profile market entries and multi-jurisdictional acquisitions.",
      photoUrl:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      email: "v.crest@crestwoodalliance.com",
      phone: "+1 (212) 900-4802",
      officeLocation: "New York Principal Chambers",
      admissions: JSON.stringify([
        "New York State Bar (1998)",
        "International Bar Association (Corporate M&A Officer)",
        "New York State Bar Association",
      ]),
      education: JSON.stringify([
        "LL.M., Harvard Law School",
        "J.D. (cum laude), Georgetown University Law Center",
        "B.S. (Economics), University of Pennsylvania, Wharton",
      ]),
      qualifications: JSON.stringify([
        "IFLR1000 Women Leaders in Financial Law",
        "Chambers USA Leading Individual: Corporate/Commercial",
        "Director, US Chamber of Commerce Legal Advisory Board",
      ]),
      languages: JSON.stringify(["English (Native)", "Spanish (Professional)"]),
      isPartner: true,
      isFeatured: true,
      displayOrder: 2,
      practiceSlugs: ["corporate-commercial", "banking-finance-fintech"],
    },
    {
      slug: "jonathan-reaves-esq",
      fullName: "Jonathan Reaves, Esq.",
      title: "Partner",
      designation: "Head of Complex Torts & Catastrophic Injury Litigation",
      bio: "Jonathan is an aggressive, trial-tested courtroom advocate dedicated to representing victims of industrial negligence, catastrophic trucking collisions, and corporate safety breaches across the United States.",
      detailedBio:
        "Jonathan Reaves combines twenty years of trial experience with an empathetic, client-centered approach. Having trained at the nation's leading plaintiff trial academies in Texas and New York, Jonathan brings relentless courtroom tenacity to every case. He has recovered over $180 million in structured compensation and damages for injured workers, grieving families, and accident victims.\n\nHe operates with a strict guarantee: clients are never treated like numbers, and his trial team prepares every meritorious case for trial rather than settling for discount insurance payouts.",
      photoUrl:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
      email: "j.reaves@crestwoodalliance.com",
      phone: "+1 (212) 900-4803",
      officeLocation: "New York Principal Chambers",
      admissions: JSON.stringify([
        "New York State Bar (2004)",
        "Texas State Bar",
        "U.S. District Court, Southern District of Texas",
        "American Association for Justice",
      ]),
      education: JSON.stringify([
        "LL.M. in Civil Litigation & Trial Advocacy, University of Houston Law Center",
        "J.D. (with honors), University of Texas School of Law",
        "B.A. (Political Science), Tulane University",
      ]),
      qualifications: JSON.stringify([
        "Member, American Association for Justice",
        "Top 100 Civil Trial Lawyers — National Trial Lawyers Association",
        "Super Lawyers — Personal Injury (New York)",
      ]),
      languages: JSON.stringify(["English (Native)", "Spanish (Conversational)"]),
      isPartner: true,
      isFeatured: true,
      displayOrder: 3,
      practiceSlugs: ["personal-injury-complex-torts", "dispute-resolution-litigation"],
    },
    {
      slug: "marcus-sterling-llm",
      fullName: "Marcus Sterling, LL.M. (LSE)",
      title: "Senior Partner",
      designation: "Head of Bankruptcy, Corporate Rescue & Debt Restructuring",
      bio: "Marcus is an authority in business rescue, receiverships, creditor workouts, and debt renegotiations under the U.S. Bankruptcy Code and cross-border restructuring regimes.",
      detailedBio:
        "Marcus Sterling has spent over two decades navigating acute financial distress for major commercial borrowers and secured lenders. He is renowned for speaking in straight lines, dispelling confusion, and engineering swift, legally enforceable debt workouts.\n\nWhether stopping immediate bank repossessions, halting unlawful foreclosure proceedings, or restructuring corporate debentures, Marcus's team safeguards businesses and enables entrepreneurs to protect their livelihoods through challenging financial climates.",
      photoUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      email: "m.sterling@crestwoodalliance.com",
      phone: "+1 (212) 900-4804",
      officeLocation: "New York Principal Chambers",
      admissions: JSON.stringify([
        "New York State Bar (2001)",
        "Solicitor of the Senior Courts of England & Wales (2008)",
        "American Bankruptcy Institute (ABI) Member",
        "INSOL International Fellow",
      ]),
      education: JSON.stringify([
        "LL.M. in Corporate and Insolvency Law, London School of Economics (LSE)",
        "J.D., Fordham University School of Law",
        "B.A. (Economics), Boston College",
      ]),
      qualifications: JSON.stringify([
        "Fellow, American Bankruptcy Institute",
        "Who's Who Legal: Restructuring & Insolvency Thought Leader",
        "Chambers USA Recommended: Bankruptcy/Restructuring",
      ]),
      languages: JSON.stringify(["English (Native)", "German (Working)"]),
      isPartner: true,
      isFeatured: true,
      displayOrder: 4,
      practiceSlugs: ["bankruptcy-insolvency-restructuring", "corporate-commercial"],
    },
    {
      slug: "ashley-morgan-jd-cpa",
      fullName: "Ashley Morgan, J.D., CPA",
      title: "Partner",
      designation: "Head of Banking, Finance & FinTech Practice",
      bio: "Ashley Morgan is an acclaimed financial services attorney advising tier-1 banks, payment operators, and venture funds on debt syndication, regulatory compliance, and Federal Reserve and SEC directives.",
      detailedBio:
        "Ashley advises domestic and international financial institutions, asset managers, and emerging FinTech companies. She has structured syndicated loans exceeding $3.5 billion, designed regulatory compliance architectures for electronic money institutions, and assisted clients in obtaining critical licenses from the OCC, Federal Reserve, and SEC.",
      photoUrl:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
      email: "a.morgan@crestwoodalliance.com",
      phone: "+1 (202) 550-7701",
      officeLocation: "Washington D.C. Chambers",
      admissions: JSON.stringify([
        "District of Columbia Bar (2006)",
        "New York State Bar",
        "Certified Public Accountant (CPA)",
        "Association of Certified Anti-Money Laundering Specialists (ACAMS)",
      ]),
      education: JSON.stringify([
        "LL.M., Georgetown University Law Center",
        "J.D. (cum laude), American University Washington College of Law",
        "B.S. (Accounting), University of Maryland",
      ]),
      qualifications: JSON.stringify([
        "Legal 500 US Recommended Lawyer: Banking & Finance",
        "Member, DC Bar Financial Services Committee",
        "Super Lawyers — Banking & Finance (DC)",
      ]),
      languages: JSON.stringify(["English (Native)", "Mandarin (Working)"]),
      isPartner: true,
      isFeatured: true,
      displayOrder: 5,
      practiceSlugs: ["banking-finance-fintech", "corporate-commercial"],
    },
    {
      slug: "amina-bell-esq",
      fullName: "Amina Bell, Esq.",
      title: "Senior Associate",
      designation: "Head of Technology, Data Protection & Intellectual Property",
      bio: "Amina advises digital media, SaaS platforms, and enterprise software firms on CCPA/GDPR data compliance, software licensing, and brand anti-counterfeiting before the USPTO and federal courts.",
      detailedBio:
        "Amina is a certified data protection compliance expert and intellectual property attorney. She has managed trademark portfolios across 20 jurisdictions and drafted comprehensive enterprise agreements for high-growth tech companies. Her clients include Series A through Series D startups and Fortune 500 technology divisions.",
      photoUrl:
        "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=800&q=80",
      email: "a.bell@crestwoodalliance.com",
      phone: "+1 (312) 480-9902",
      officeLocation: "Chicago Chambers",
      admissions: JSON.stringify([
        "Illinois State Bar (2014)",
        "New York State Bar",
        "Certified Information Privacy Professional (CIPP/US, CIPP/E)",
        "International Trademark Association (INTA)",
      ]),
      education: JSON.stringify([
        "LL.M. in Innovation, Technology and the Law, University of Edinburgh",
        "J.D., Northwestern Pritzker School of Law",
        "B.S. (Computer Science), Northwestern University",
      ]),
      qualifications: JSON.stringify([
        "IAPP Certified Privacy Professional (CIPP/US)",
        "WIPO Academy Alumnus",
        "Super Lawyers Rising Star — Intellectual Property",
      ]),
      languages: JSON.stringify(["English (Native)", "French (Fluent)"]),
      isPartner: false,
      isFeatured: false,
      displayOrder: 6,
      practiceSlugs: ["technology-data-ip", "corporate-commercial"],
    },
  ];

  for (const att of attorneysData) {
    const { practiceSlugs, ...attData } = att;
    const attorney = await prisma.attorney.create({
      data: attData,
    });

    for (const slug of practiceSlugs) {
      const pa = createdPracticeAreas.find((p) => p.slug === slug);
      if (pa) {
        await prisma.attorneyPracticeArea.create({
          data: {
            attorneyId: attorney.id,
            practiceAreaId: pa.id,
          },
        });
      }
    }
  }
  console.log(`✓ Created ${attorneysData.length} attorneys and linked practice areas`);

  // 5. Industries
  const industriesData = [
    {
      slug: "energy-power-infrastructure",
      name: "Energy, Power & Utilities",
      summary: "Comprehensive counsel for upstream operators, gas monetization, IPPs, and grid operators.",
      description: "Navigating complex regulatory frameworks under FERC, DOE, and state public utility commissions.",
      iconName: "Zap",
      displayOrder: 1,
    },
    {
      slug: "banking-fintech-financial-services",
      name: "Banking & Financial Technology",
      summary: "Advising institutional lenders, payment gateways, and venture-backed FinTech firms.",
      description: "Specialized in regulatory navigation, Federal Reserve & OCC compliance, and cross-border digital payment infrastructure.",
      iconName: "Landmark",
      displayOrder: 2,
    },
    {
      slug: "real-estate-construction",
      name: "Real Estate, Hospitality & Infrastructure",
      summary: "Title perfection, commercial leasing, and major construction contracts.",
      description: "Securing investments in commercial high-rises, logistics hubs, and industrial developments across the United States.",
      iconName: "Building2",
      displayOrder: 3,
    },
    {
      slug: "manufacturing-fmcg",
      name: "Manufacturing, Consumer Goods & Industrial Conglomerates",
      summary: "Product liability defense, labor relations, supply chain contracts, and trade compliance.",
      description: "Protecting leading manufacturers from operational liabilities and regulatory disruptions.",
      iconName: "Factory",
      displayOrder: 4,
    },
    {
      slug: "transportation-maritime-aviation",
      name: "Transportation, Maritime & Aviation",
      summary: "Admiralty claims, aircraft leasing, vessel arrest, and FMCSA/FAA compliance.",
      description: "Handling high-value shipping disputes, cargo damage claims, and aviation regulatory approvals.",
      iconName: "Ship",
      displayOrder: 5,
    },
    {
      slug: "technology-telecom-media",
      name: "Technology, Telecoms & Digital Media",
      summary: "FCC spectrum licensing, data privacy audits, software IP, and venture financings.",
      description: "Strategic legal architecture for tech giants, telecom carriers, and digital creators.",
      iconName: "Cpu",
      displayOrder: 6,
    },
  ];

  for (const ind of industriesData) {
    await prisma.industry.create({ data: ind });
  }
  console.log(`✓ Created ${industriesData.length} industry sectors`);

  // 6. Case Studies / Representative Matters
  const caseStudiesData = [
    {
      slug: "defense-cross-border-energy-arbitration",
      title: "Successful Defense in $120M Cross-Border Oil & Gas Joint Venture Dispute",
      practiceAreaName: "Dispute Resolution & Commercial Litigation",
      industry: "Energy, Power & Utilities",
      summary:
        "Represented a domestic oil and gas consortium in international commercial arbitration against a multinational operator concerning cost-recovery calculations and cash call defaults.",
      challenge:
        "The opposing party sought urgent forfeiture of our client's 40% participating interest in a productive offshore oil block under alleged operational defaults.",
      solution:
        "James A. Sterling and our dispute team secured immediate emergency anti-arbitration and preservation injunctions before defeating the forfeiture petition before an AAA/ICDR tribunal in New York.",
      outcome:
        "Tribunal dismissed all forfeiture claims in their entirety, awarded our client $14.5M in counter-claim damages, and secured their long-term operational equity.",
      matterYear: "2024",
      displayOrder: 1,
    },
    {
      slug: "debt-restructuring-regional-aviation",
      title: "Comprehensive Chapter 11 Restructuring of $45M Corporate Debt Facility for Regional Airline",
      practiceAreaName: "Bankruptcy, Insolvency & Corporate Restructuring",
      industry: "Transportation, Maritime & Aviation",
      summary:
        "Steered an urgent debt moratorium and asset rescue strategy for a major regional carrier facing immediate aircraft repossessions by international leasing syndicates.",
      challenge:
        "Three international aircraft lessors had filed emergency repossession motions in the U.S. Bankruptcy Court, which would have permanently grounded the airline's fleet within 48 hours.",
      solution:
        "Marcus Sterling engaged the lenders in structured Chapter 11 plan negotiations while filing first-day motions and automatic stay orders that halted all repossession proceedings.",
      outcome:
        "Successfully converted $22M into structured convertible debt, rescheduled remaining amortizations over 7 years with interest relief, and kept all aircraft flying uninterrupted.",
      matterYear: "2023",
      displayOrder: 2,
    },
    {
      slug: "industrial-injury-catastrophic-recovery",
      title: "Landmark Compensation Recovery in Catastrophic Industrial Workplace Negligence Matter",
      practiceAreaName: "Personal Injury & Complex Tort Litigation",
      industry: "Manufacturing, Consumer Goods & Industrial Conglomerates",
      summary:
        "Secured a record settlement for an industrial technician who suffered severe spinal injuries and permanent disability due to defective safety interlocks on heavy machinery.",
      challenge:
        "The multinational equipment manufacturer and employer denied liability, claiming employee error and asserting indemnification clauses in third-party supply contracts.",
      solution:
        "Jonathan Reaves mobilized forensic engineering experts, reconstructed the safety sequence failure, and initiated high-profile tort litigation in federal court.",
      outcome:
        "Secured a confidential multi-million-dollar structured settlement covering lifelong medical care, home modification, and financial security for the client's family.",
      matterYear: "2024",
      displayOrder: 3,
    },
    {
      slug: "fintech-regulatory-acquisition-clearance",
      title: "Regulatory Advisory & Closing of $85M FinTech Cross-Border Payment License & Financing",
      practiceAreaName: "Banking, Finance & FinTech",
      industry: "Banking & Financial Technology",
      summary:
        "Structured the corporate acquisition and multi-tier regulatory approval process for a premier digital payment company acquiring money transmitter licenses across 4 states.",
      challenge:
        "Overcoming stringent state and federal capital adequacy requirements, complex ownership disclosure rules, and FinCEN anti-money laundering mandates.",
      solution:
        "Victoria Crest and Ashley Morgan architected an innovative holding structure with SPVs and liaised directly with state regulators and FinCEN to obtain unconditional approvals.",
      outcome:
        "The acquisition closed smoothly on schedule, enabling the platform to process over $2B in annualized transactional volume.",
      matterYear: "2025",
      displayOrder: 4,
    },
  ];

  for (const cs of caseStudiesData) {
    await prisma.caseStudy.create({ data: cs });
  }
  console.log(`✓ Created ${caseStudiesData.length} case studies`);

  // 7. Insights & Articles
  const articlesData = [
    {
      slug: "restructuring-vs-liquidation-under-us-bankruptcy-code",
      title: "Chapter 11 Reorganization vs. Liquidation: How U.S. Businesses Can Protect Assets During Debt Crises",
      summary:
        "A critical examination of the corporate rescue mechanisms under the U.S. Bankruptcy Code, and practical steps directors must take when facing creditor pressure.",
      category: "LEGAL_UPDATE",
      authorName: "Marcus Sterling, LL.M. (LSE)",
      authorTitle: "Senior Partner, Head of Bankruptcy & Restructuring",
      readTime: "6 min read",
      coverImage:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      isPublished: true,
      isFeatured: true,
      publishedAt: new Date(),
      content: `
### The New Paradigm of Corporate Rescue

For decades, when American businesses encountered acute financial distress, secured creditors moved swiftly to enforce loan covenants, appoint receivers, and liquidate assets at fire-sale prices. The result: viable businesses were shuttered and thousands of employees displaced.

Chapter 11 of the **U.S. Bankruptcy Code** offers a powerful alternative — a court-supervised reorganization process that places an automatic stay on all creditor enforcement while management works to restructure debts and emerge as a going concern.

### Key Restructuring Tools Available to Distressed Companies

#### 1. Chapter 11 Plan of Reorganization
A Chapter 11 plan permits the debtor-in-possession (DIP) to propose a legally binding restructuring plan to creditors. Once approved by the requisite creditor classes and confirmed by the Bankruptcy Court, it binds all creditors and provides the company with a clean balance sheet.

#### 2. Automatic Stay
Upon filing for Chapter 11, an automatic stay immediately halts all collection actions, lawsuits, foreclosures, and wage garnishments. This breathing room is critical to allowing management to negotiate with creditors from a position of stability.

#### 3. DIP Financing
Distressed companies can obtain debtor-in-possession financing that carries super-priority status, enabling continued operations while the reorganization plan is developed.

### What Directors Must Do When Insolvency Looms

1. **Evaluate Fiduciary Duties:** Directors must shift focus from shareholder value to the interests of all creditors once insolvency is imminent.
2. **Engage Legal Counsel Early:** Do not wait until receiving a foreclosure notice or judgment lien filing.
3. **Audit Debt Covenants & Security Interests:** Frequently, creditor security interests contain perfection defects under the UCC that provide vital leverage in restructuring negotiations.

*For tailored advice on corporate debt workouts and emergency creditor freezes, contact our Bankruptcy & Restructuring team.*
      `,
    },
    {
      slug: "personal-injury-claims-in-workplace-accidents",
      title: "Navigating Industrial Accidents: Legal Rights of Injured Workers and Tort Recovery in the United States",
      summary:
        "Why workers injured on offshore platforms, construction sites, and factories are often entitled to substantial common law damages beyond workers' compensation caps.",
      category: "ARTICLE",
      authorName: "Jonathan Reaves, Esq.",
      authorTitle: "Partner, Head of Complex Torts",
      readTime: "5 min read",
      coverImage:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
      isPublished: true,
      isFeatured: true,
      publishedAt: new Date(),
      content: `
### Beyond the Workers' Compensation Cap

When a worker suffers catastrophic injuries in an industrial accident—such as an explosion, crane collapse, chemical exposure, or fall from height—employers and their insurance underwriters quickly push to settle the matter under state workers' compensation statutes.

While workers' compensation provides steady administrative compensation, the statutory payouts are often completely inadequate to cover lifelong specialized medical care, permanent disability modifications, and true loss of future earnings.

### Common Law Negligence vs. Statutory Claims

What many injured employees and their families do not realize is that workers' compensation does **not** extinguish a victim's right to sue negligent third parties, equipment manufacturers, or contractors in civil court for substantial damages.

#### Key Grounds for High-Value Tort Claims:
- **Defective Machinery & Products:** Suing the manufacturer of faulty safety equipment or rigging gear under strict product liability (Restatement Third of Torts).
- **Contractor Negligence:** Holding general contractors and project owners liable when OSHA safety protocols are deliberately bypassed to meet urgent construction deadlines.
- **Employer Intentional Tort:** In states recognizing this doctrine, employers who knowingly expose workers to hazardous conditions may face uncapped civil liability.

### Preserving Evidence Immediately After an Incident

The greatest risk to any personal injury claim is the destruction of evidence. Companies frequently alter equipment, retrain witnesses, and purge incident logs within 72 hours of a major casualty.

**Crucial Steps for Victims and Families:**
1. Document the scene with photographs and video immediately.
2. Secure the names, phone numbers, and statements of eyewitnesses and co-workers.
3. Request complete copies of internal safety incident reports, OSHA 300 logs, and medical triage notes.
4. Consult an experienced trial attorney before signing any employer release or waiver of claims.
      `,
    },
    {
      slug: "federal-reserve-fintech-regulatory-guidelines-2025",
      title: "Federal Reserve & OCC Regulatory Directives: Compliance Roadmap for Digital Payment Operators",
      summary:
        "An in-depth analysis of the latest Federal Reserve capital requirements, FinCEN anti-money laundering mandates, and CFPB oversight rules for U.S. FinTechs.",
      category: "CLIENT_ALERT",
      authorName: "Ashley Morgan, J.D., CPA",
      authorTitle: "Partner, Head of Banking & FinTech",
      readTime: "7 min read",
      coverImage:
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
      isPublished: true,
      isFeatured: false,
      publishedAt: new Date(),
      content: `
### Strategic Shifts in Federal Financial Services Supervision

As digital financial services expand across the United States, the Federal Reserve, OCC, and CFPB have implemented stringent supervisory guidelines designed to bolster consumer protection, prevent systemic liquidity contagion, and curtail illicit capital flows.

### Core Regulatory Highlights for FinTech Boards:

1. **Enhanced KYC and Beneficial Ownership Requirements:** Stricter enforcement of FinCEN's Customer Due Diligence (CDD) Rule, including beneficial ownership identification for legal entity customers.
2. **Capital Adequacy & Reserve Requirements:** Mandatory capital buffers and consumer fund segregation requirements for Payment Service Providers and Money Transmitters operating under state licenses.
3. **Cross-Border Remittance Safeguards:** Heightened OFAC screening obligations and real-time SAR reporting requirements for International Money Transfer Operators.

Our Banking & FinTech practice routinely prepares digital operators for regulatory examinations, state money transmitter license applications, and federal sandbox program applications.
      `,
    },
    {
      slug: "arbitration-clause-drafting-international-contracts",
      title: "Drafting Bulletproof Arbitration Clauses in U.S. and International Commercial Contracts",
      summary:
        "How sophisticated commercial parties can avoid pathological dispute resolution clauses that lead to years of procedural delays before international tribunals.",
      category: "PUBLICATION",
      authorName: "James A. Sterling, Esq.",
      authorTitle: "Founding & Senior Partner",
      readTime: "8 min read",
      coverImage:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
      isPublished: true,
      isFeatured: false,
      publishedAt: new Date(),
      content: `
### The Cost of the "Midnight Clause"

Too often in multi-million-dollar cross-border commercial transactions, the dispute resolution clause is negotiated at 2:00 AM immediately before closing—a so-called "midnight clause." Parties copy standard clauses from unrelated contracts, creating what arbitration practitioners term "pathological clauses."

### Five Vital Elements of an Enforceable Arbitration Clause:

1. **Clear and Unequivocal Agreement to Arbitrate:** Avoid contradictory language such as "the parties may submit disputes to the courts or to arbitration."
2. **Seat vs. Venue of Arbitration:** Understand that the seat of arbitration governs the procedural law (lex arbitri) and the supervisory court under the Federal Arbitration Act (FAA) or applicable state law.
3. **Number and Method of Appointing Arbitrators:** Specify a sole arbitrator for lower-value disputes and a three-member tribunal for complex commercial ventures.
4. **Governing Substantive Law:** Explicitly designate the substantive law governing the contract separate from the law of the arbitration agreement.
5. **Language of Proceedings:** Always specify the official language of pleadings and hearings to prevent expensive multi-lingual translation disputes.
      `,
    },
  ];

  for (const art of articlesData) {
    await prisma.article.create({ data: art });
  }
  console.log(`✓ Created ${articlesData.length} insights & publications`);

  // 8. Testimonials
  const testimonialsData = [
    {
      clientName: "Dr. Robert Kellerman",
      clientRole: "Executive Vice-Chairman",
      company: "Keystone Energy Holdings",
      quote:
        "Crest & Sterling demonstrated unmatched tactical precision when our board was facing severe regulatory scrutiny and creditor threats in our oilfield concessions. James Sterling and Victoria Crest stabilized our position within days. Their strategic litigation and commercial wisdom saved our operational license.",
      rating: 5,
      caseType: "Energy Dispute & Regulatory Defense",
      isFeatured: true,
      displayOrder: 1,
    },
    {
      clientName: "Elena Vance",
      clientRole: "General Counsel",
      company: "Global Freight & Haulage Logistics",
      quote:
        "When our interstate trucking fleet faced catastrophic multi-vehicle liability claims and aggressive creditor freezes, Jonathan Reaves and his trial team fought relentlessly. They cut through the noise, protected our capital, and treated our leadership with unwavering professionalism.",
      rating: 5,
      caseType: "Complex Torts & Liability Defense",
      isFeatured: true,
      displayOrder: 2,
    },
    {
      clientName: "Thomas Bakare",
      clientRole: "Managing Director",
      company: "Apex Manufacturing Industries",
      quote:
        "Filing for debt restructuring is stressful, but Marcus Sterling and the team made the entire process disciplined and transparent. They kept us fully informed at every hearing, stopped aggressive bank enforcement, and negotiated sustainable repayment terms that enabled us to keep our 450 factory workers employed.",
      rating: 5,
      caseType: "Bankruptcy & Debt Restructuring",
      isFeatured: true,
      displayOrder: 3,
    },
    {
      clientName: "Sir Charles Egerton",
      clientRole: "Principal Trustee",
      company: "The Egerton Family Estates & Trusts",
      quote:
        "We were facing the potential loss of a historic family commercial property in Manhattan due to complex predatory claims and title disputes. Crest & Sterling not only halted unlawful seizures in their tracks but successfully overturned decades of fraudulent encumbrances. I trust them completely.",
      rating: 5,
      caseType: "Real Estate & Title Litigation",
      isFeatured: true,
      displayOrder: 4,
    },
  ];

  for (const test of testimonialsData) {
    await prisma.testimonial.create({ data: test });
  }
  console.log(`✓ Created ${testimonialsData.length} client testimonials`);

  // 9. Offices (Multi-Office Directory)
  const officesData = [
    {
      city: "New York",
      country: "United States",
      addressLine1: "425 Lexington Avenue, 12th Floor",
      addressLine2: "Midtown Manhattan, New York, NY",
      postalCode: "10017",
      phone: "(312) 736-8337",
      email: "newyork@crestwoodalliance.com",
      hours: "Monday – Friday: 8:00 AM – 6:00 PM (EST)",
      mapUrl: "https://maps.google.com/?q=425+Lexington+Avenue+New+York+NY",
      isPrimary: true,
      displayOrder: 1,
    },
    {
      city: "Washington",
      country: "United States",
      addressLine1: "1250 Connecticut Avenue NW, Suite 700",
      addressLine2: "Washington, D.C.",
      postalCode: "20036",
      phone: "+1 (202) 550-7700",
      email: "dc@crestwoodalliance.com",
      hours: "Monday – Friday: 8:30 AM – 5:30 PM (EST)",
      mapUrl: "https://maps.google.com/?q=1250+Connecticut+Avenue+NW+Washington+DC",
      isPrimary: false,
      displayOrder: 2,
    },
    {
      city: "Chicago",
      country: "United States",
      addressLine1: "300 N. LaSalle Street, Suite 4900",
      addressLine2: "Chicago, IL",
      postalCode: "60654",
      phone: "+1 (312) 480-9900",
      email: "chicago@crestwoodalliance.com",
      hours: "Monday – Friday: 8:30 AM – 5:30 PM (CST)",
      mapUrl: "https://maps.google.com/?q=300+N+LaSalle+Street+Chicago+IL",
      isPrimary: false,
      displayOrder: 3,
    },
    {
      city: "Dallas",
      country: "United States",
      addressLine1: "2200 Ross Avenue, Suite 4700",
      addressLine2: "Dallas, TX",
      postalCode: "75201",
      phone: "+1 (214) 440-1414",
      email: "dallas@crestwoodalliance.com",
      hours: "Monday – Friday: 8:00 AM – 5:00 PM (CST)",
      mapUrl: "https://maps.google.com/?q=2200+Ross+Avenue+Dallas+Texas",
      isPrimary: false,
      displayOrder: 4,
    },
  ];

  for (const off of officesData) {
    await prisma.office.create({ data: off });
  }
  console.log(`✓ Created ${officesData.length} global office chambers`);

  // 10. FAQs
  const faqsData = [
    {
      question: "How do I schedule an initial consultation or case evaluation?",
      answer:
        "You can schedule a consultation by completing our secure online Consultation Request form, calling our principal chambers directly at (312) 736-8337, or emailing intake@crestwoodalliance.com. Our intake committee reviews all inquiries within two business hours and contacts you to confirm availability with the appropriate Practice Group Leader.",
      category: "CONSULTATIONS",
      displayOrder: 1,
    },
    {
      question: "What should I bring or prepare for my first legal consultation?",
      answer:
        "Please have ready all relevant contractual agreements, official correspondence, court processes (if litigation has already commenced), demand letters, and a chronological summary of key events. For personal injury or industrial accident claims, please prepare medical reports, accident site photographs, and correspondence from insurance adjusters or OSHA investigators.",
      category: "CONSULTATIONS",
      displayOrder: 2,
    },
    {
      question: "Can you stop bank foreclosures, asset freezes, and creditor seizures immediately?",
      answer:
        "Yes. Under the U.S. Bankruptcy Code and applicable federal and state procedural rules, our Bankruptcy and Dispute Resolution teams can file emergency motions for temporary restraining orders, automatic stays, and preliminary injunctions to prevent unlawful asset dissipation or foreclosure within 24 to 48 hours while debt restructuring negotiations proceed.",
      category: "LITIGATION",
      displayOrder: 3,
    },
    {
      question: "How does the firm structure its legal fees and billing?",
      answer:
        "Depending on the nature of the matter, we offer flexible billing arrangements including hourly rates, fixed retainers for corporate general counsel, milestone-based fees for transactions, and contingency / success-fee structures for select catastrophic personal injury and commercial debt recoveries where permitted by applicable state bar rules.",
      category: "BILLING",
      displayOrder: 4,
    },
    {
      question: "Does submitting an online inquiry form create an attorney-client relationship?",
      answer:
        "No. Communication through this website or preliminary evaluation forms does not establish an attorney-client relationship. Confidential attorney-client representation only commences after our formal conflict-of-interest check has cleared and an engagement letter is duly executed by both parties.",
      category: "GENERAL",
      displayOrder: 5,
    },
    {
      question: "Do you handle cross-border disputes and international arbitrations?",
      answer:
        "Extensively. Our partners are admitted in multiple jurisdictions (New York, Texas, Illinois, District of Columbia, and England & Wales) and regularly represent corporations, sovereigns, and private parties before AAA/ICDR, JAMS, ICC International Court of Arbitration, and ICSID tribunals.",
      category: "LITIGATION",
      displayOrder: 6,
    },
  ];

  for (const f of faqsData) {
    await prisma.faq.create({ data: f });
  }
  console.log(`✓ Created ${faqsData.length} FAQs`);

  // 11. Career Postings
  const jobsData = [
    {
      slug: "senior-associate-commercial-litigation",
      title: "Senior Associate — Dispute Resolution & Commercial Litigation",
      department: "Dispute Resolution",
      location: "New York Principal Chambers",
      employmentType: "Full-Time",
      experienceLevel: "6–9 Years Post-J.D.",
      summary:
        "Seeking an exceptional litigator with proven courtroom and appellate advocacy credentials to lead complex commercial disputes before federal and state courts.",
      responsibilities: JSON.stringify([
        "Drafting complaints, appellate briefs, and complex affidavits for high-value commercial actions.",
        "Conducting advocacy before federal district courts and courts of appeals in commercial, bankruptcy, and contract disputes.",
        "Managing client advisory relationships and coordinating junior associates and paralegals.",
        "Leading depositions, expert witness preparation, and settlement negotiations.",
      ]),
      requirements: JSON.stringify([
        "J.D. from an ABA-accredited law school (Top 20 preferred) with strong academic record.",
        "6–9 years active post-J.D. commercial litigation experience at an Am Law 100/200 firm.",
        "Demonstrated track record of federal court and appellate brief writing.",
        "Exceptional analytical, written, and persuasive oral advocacy skills.",
      ]),
      benefits: JSON.stringify([
        "Top-tier compensation package competitive with Am Law 100 market rates.",
        "Comprehensive health, dental, and vision insurance for employee and immediate family.",
        "Annual CLE and international legal conference sponsorship.",
        "Clear path to partnership consideration.",
      ]),
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      isOpen: true,
    },
    {
      slug: "associate-corporate-mergers-acquisitions",
      title: "Associate — Corporate, M&A & Private Equity",
      department: "Corporate & Commercial",
      location: "New York Principal Chambers (Hybrid)",
      employmentType: "Full-Time",
      experienceLevel: "3–5 Years Post-J.D.",
      summary:
        "Join our market-leading corporate practice advising international private equity funds, sovereign investors, and tech pioneers on multi-million dollar acquisitions.",
      responsibilities: JSON.stringify([
        "Conducting legal due diligence audits and drafting comprehensive transaction memoranda.",
        "Drafting Stock Purchase Agreements, Merger Agreements, Shareholders Agreements, and Disclosure Schedules.",
        "Managing SEC, FTC, and DOJ HSR pre-merger notification filings.",
        "Assisting partners in cross-border joint venture negotiations.",
      ]),
      requirements: JSON.stringify([
        "3–5 years post-J.D. experience in corporate finance, M&A, or commercial transactions.",
        "Demonstrated grasp of Delaware corporation law, Securities Act, and Exchange Act compliance.",
        "Impeccable drafting precision and deal execution discipline.",
      ]),
      benefits: JSON.stringify([
        "Competitive performance-linked compensation and bonuses.",
        "Flexible hybrid working arrangement.",
        "Continuous professional development through firm-sponsored masterclasses.",
      ]),
      deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      isOpen: true,
    },
  ];

  for (const j of jobsData) {
    await prisma.jobPosting.create({ data: j });
  }
  console.log(`✓ Created ${jobsData.length} career postings`);

  // 12. Site Settings
  const defaultSettings = [
    { key: "FIRM_NAME", value: "Crest & Sterling Alliance", description: "Official firm name" },
    { key: "FIRM_TAGLINE", value: "Strategic Legal Counsel for Complex Matters", description: "Firm slogan" },
    { key: "PRIMARY_PHONE", value: "(312) 736-8337", description: "Main phone line" },
    { key: "SECONDARY_PHONE", value: "+1 (202) 550-7700", description: "Washington D.C. phone line" },
    { key: "PRIMARY_EMAIL", value: "counsel@crestwoodalliance.com", description: "Main inquiry email" },
    { key: "CONSULTATION_EMAIL", value: "intake@crestwoodalliance.com", description: "Direct intake email" },
    { key: "EMERGENCY_LINE", value: "+1 (212) 900-4899", description: "Emergency after-hours line" },
    { key: "LINKEDIN_URL", value: "https://linkedin.com/company/sterling-crest-law", description: "LinkedIn" },
    { key: "X_TWITTER_URL", value: "https://x.com/crestwoodalliance", description: "X (Twitter)" },
    { key: "FACEBOOK_URL", value: "https://facebook.com/crestwoodalliance", description: "Facebook" },
    { key: "INSTAGRAM_URL", value: "https://instagram.com/crestwoodalliance", description: "Instagram" },
    { key: "ANALYTICS_GA4_ID", value: "", description: "Google Analytics 4 Measurement ID" },
    { key: "LEGAL_DISCLAIMER_TEXT", value: "Information provided on this website is for general informational purposes and does not constitute formal legal advice. Communication through this website does not establish an attorney-client relationship.", description: "Standard disclaimer text" },
  ];

  for (const s of defaultSettings) {
    await prisma.siteSetting.create({ data: s });
  }
  console.log(`✓ Created ${defaultSettings.length} site settings`);

  // 13. Audit Log Initial Entry
  await prisma.auditLog.create({
    data: {
      adminEmail: superAdmin.email,
      action: "INITIAL_DATABASE_SEED",
      entity: "SYSTEM",
      details: "Initial comprehensive legal directory seed completed successfully.",
      ipAddress: "127.0.0.1",
    },
  });

  console.log("✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
