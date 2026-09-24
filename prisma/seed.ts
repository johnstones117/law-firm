import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Sterling & Crest Law Firm database seed...");

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
      email: process.env.INITIAL_ADMIN_EMAIL || "senior.partner@sterlingcrestlaw.com",
      passwordHash,
      name: "Chief Adebayo Sterling SAN",
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
        "Recognized by domestic and international directories as one of West Africa's most formidable litigation practices, representing conglomerates, financial institutions, and sovereigns before all superior courts of record.",
      overview:
        "Our Dispute Resolution group combines fierce trial advocacy with pragmatic commercial acumen. We represent clients in high-stakes corporate disputes, breach of contract, shareholder actions, fraud recovery, and enforcement of foreign judgments. Our advocates are trusted for their intellectual rigor and decisive courtroom strategies.",
      keyServices: JSON.stringify([
        "Commercial Litigation before High Courts, Court of Appeal & Supreme Court",
        "Asset Tracing, Mareva Injunctions & Emergency Relief",
        "Shareholder & Boardroom Governance Disputes",
        "Enforcement of Foreign Judgments and Arbitral Awards",
        "White-Collar Defense & Financial Crime Representation",
      ]),
      relevantIndustries: JSON.stringify([
        "Banking & Financial Institutions",
        "Oil, Gas & Energy",
        "Telecommunications",
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
        "Providing counsel on market entry, multi-jurisdictional joint ventures, regulatory compliance, corporate governance, and complex commercial agreements across Africa and global markets.",
      overview:
        "We serve as trusted outside general counsel to leading indigenous corporations and multinational enterprises. From structuring foreign direct investment to navigating regulatory approvals with the SEC, CAC, and industry watchdogs, we ensure commercial ventures are legally resilient and tax-efficient.",
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
      name: "Insolvency, Bankruptcy & Corporate Restructuring",
      tagline: "Immediate debt relief, creditor negotiations, and corporate rescue solutions.",
      iconName: "ShieldAlert",
      summary:
        "Providing proactive legal interventions for distressed corporations, institutional lenders, and high-net-worth debtors to halt creditor enforcement, restructure liabilities, and safeguard essential assets.",
      overview:
        "Financial crises demand immediate, decisive legal intervention. Modeled on world-class debt restructuring frameworks, our team works to halt predatory creditor actions, stop foreclosures and receivership seizures, and negotiate manageable repayment moratoriums. We advise on Schemes of Arrangement, Administrations, Receiverships, and Chapter 11 / cross-border insolvency synchronizations.",
      keyServices: JSON.stringify([
        "Corporate Debt Restructuring & Creditor Standstill Agreements",
        "Receivership, Administration & Liquidation Management",
        "Defending Against Foreclosures and Asset Seizures",
        "Schemes of Arrangement under Companies and Allied Matters Act (CAMA)",
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
      tagline: "Structuring syndicated credit, capital markets offerings, and regulatory sandbox compliance.",
      iconName: "Landmark",
      summary:
        "Advising commercial banks, development finance institutions, and disruptive payment processors on syndicated facilities, asset-backed securities, and Central Bank regulatory frameworks.",
      overview:
        "Our finance group navigates the rapidly evolving nexus of traditional banking and financial technology. We advise lenders and borrowers on facility agreements, collateral perfection, project finance, debt syndication, and digital payment compliance with the Central Bank of Nigeria (CBN) and regional monetary authorities.",
      keyServices: JSON.stringify([
        "Syndicated Lending, Structured Finance & Security Creation",
        "FinTech Licensing (Payment Service Banks, Switch, Mobile Money)",
        "Project Finance & Public-Private Partnerships (PPP)",
        "Debt Capital Markets, Bond Issuances & Commercial Papers",
        "Anti-Money Laundering (AML) & Sanctions Compliance",
      ]),
      relevantIndustries: JSON.stringify([
        "Commercial & Investment Banks",
        "FinTech & Neo-banks",
        "Microfinance Institutions",
        "Multilateral Development Agencies",
      ]),
      displayOrder: 5,
      isFeatured: true,
    },
    {
      slug: "energy-natural-resources",
      name: "Energy, Power & Natural Resources",
      tagline: "Navigating the Petroleum Industry Act (PIA), renewable transitions, and upstream concessions.",
      iconName: "Zap",
      summary:
        "Counseling oil majors, independent producers, solar developers, and mining consortia on licensing, farm-ins, power purchase agreements (PPAs), and environmental compliance.",
      overview:
        "Our energy team delivers end-to-end legal solutions across the value chain, from upstream petroleum concessions and gas monetization under the Petroleum Industry Act (PIA) to off-grid solar mini-grids and IPP projects. We represent clients in negotiations with regulatory bodies, host communities, and international financiers.",
      keyServices: JSON.stringify([
        "Upstream Concession Licensing, Farm-in Agreements & JOAs",
        "Gas Sale and Aggregation Agreements (GSAA)",
        "Power Purchase Agreements (PPAs) & Grid Interconnection",
        "Mining Leases, Exploration Permits & Local Content Compliance",
        "Environmental Impact Assessment & Host Community Development Trusts",
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
        "Guiding institutional investors, real estate funds, and private developers through major acquisitions, construction contracts, Governor's consent perfection, and property dispute resolution.",
      overview:
        "Real estate in high-growth metropolitan centers like Lagos, Abuja, and Port Harcourt presents unique title and regulatory complexities. Our practice delivers meticulous due diligence, root-of-title verification, dispute management, and development agreements for commercial towers, residential estates, and industrial hubs.",
      keyServices: JSON.stringify([
        "Root-of-Title Investigation & Governor's Consent Perfection",
        "FIDIC Construction Contracts & EPC Agreements",
        "Commercial Leasing & Property Management Agreements",
        "Real Estate Investment Trusts (REITs) & Joint Development Agreements",
        "Land Title Litigation & Compulsory Acquisition Compensation",
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
      tagline: "Securing intellectual capital, software patents, and NDPR/GDPR compliance.",
      iconName: "Cpu",
      summary:
        "Advising venture-backed technology startups, digital platforms, and multinational brands on trademark portfolios, data privacy compliance, and software licensing.",
      overview:
        "We assist innovative enterprises in safeguarding their intellectual capital and establishing compliant data privacy governance frameworks. Our lawyers are certified data protection officers advising on the Nigeria Data Protection Act (NDPA), GDPR compliance, software escrow, SaaS terms of service, and brand anti-counterfeiting.",
      keyServices: JSON.stringify([
        "Trademark, Copyright & Patent Registration & Enforcement",
        "Data Protection Impact Assessments (DPIA) & Privacy Compliance",
        "SaaS Agreements, Software Licensing & IP Assignment",
        "Brand Protection, Cease & Desist Actions & Domain Disputes",
        "Technology Transfer Approvals (NOTAP Registration)",
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
      slug: "chief-adebayo-sterling-san",
      fullName: "Chief Adebayo Sterling SAN, FCIArb",
      title: "Founding & Senior Partner",
      designation: "Head of Dispute Resolution & Appellate Advocacy",
      bio: "Chief Adebayo Sterling is a Senior Advocate of Nigeria (SAN) with over 32 years of high-stakes courtroom and arbitration experience. He is revered for his strategic courtroom mastery in complex commercial, constitutional, and energy disputes.",
      detailedBio:
        "Chief Adebayo Sterling is one of West Africa's preeminent trial attorneys and commercial arbitrators. Appointed Senior Advocate of Nigeria in 2004, he has argued over 140 landmark appeals before the Nigerian Supreme Court and the Court of Appeal, setting vital precedents in corporate insolvency, petroleum tax concessions, and arbitral enforcement.\n\nHe serves as a Fellow of the Chartered Institute of Arbitrators (UK) and frequently sits as sole arbitrator and tribunal chairman in London, Paris, and Lagos arbitrations under ICC and LCIA rules. He advises multinational boards on existential regulatory crises and bet-the-company litigation.",
      photoUrl:
        "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80",
      email: "a.sterling@sterlingcrestlaw.com",
      phone: "+234 (01) 453-8901",
      officeLocation: "Lagos Principal Chambers",
      admissions: JSON.stringify([
        "Supreme Court of Nigeria (Barrister & Solicitor, 1991)",
        "Senior Advocate of Nigeria (SAN, 2004)",
        "Fellow, Chartered Institute of Arbitrators (FCIArb, UK)",
        "Honorary Bencher, Body of Benchers Nigeria",
      ]),
      education: JSON.stringify([
        "LL.M. in International Commercial Law, King's College London",
        "B.L. (Honours), Nigerian Law School",
        "LL.B. (First Class Honours), Obafemi Awolowo University",
      ]),
      qualifications: JSON.stringify([
        "Chambers Global Band 1 Senior Statesperson",
        "Legal 500 Hall of Fame: Commercial Litigation",
        "Past Chairman, NBA Section on Legal Practice",
      ]),
      languages: JSON.stringify(["English (Fluent)", "Yoruba (Native)"]),
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
      bio: "Victoria Crest is a distinguished corporate finance and cross-border M&A specialist. She has guided over $4.2B in strategic transactions across sub-Saharan Africa, the UK, and North America.",
      detailedBio:
        "Victoria oversees the firm's strategic operations while heading the premier Corporate & Commercial practice group. Prior to co-founding Sterling & Crest, she practiced with Magic Circle firms in London and New York. Victoria advises blue-chip conglomerates, private equity sponsors, and sovereign wealth entities on divestitures, corporate governance overhauls, and public-private partnerships.\n\nHer reputation for rigorous deal architecture and swift regulatory clearance makes her the advisor of choice for high-profile market entries and multi-jurisdictional acquisitions.",
      photoUrl:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      email: "v.crest@sterlingcrestlaw.com",
      phone: "+234 (01) 453-8902",
      officeLocation: "Lagos Principal Chambers",
      admissions: JSON.stringify([
        "Supreme Court of Nigeria (1998)",
        "New York State Bar Association (2002)",
        "International Bar Association (Corporate M&A Officer)",
      ]),
      education: JSON.stringify([
        "LL.M., Harvard Law School",
        "B.L., Nigerian Law School",
        "LL.B., University of Lagos",
      ]),
      qualifications: JSON.stringify([
        "IFLR1000 Women Leaders in Financial Law",
        "Chambers Global Leading Individual: Corporate/Commercial",
        "Director, Franco-Nigerian Chamber of Commerce",
      ]),
      languages: JSON.stringify(["English (Native)", "French (Professional)"]),
      isPartner: true,
      isFeatured: true,
      displayOrder: 2,
      practiceSlugs: ["corporate-commercial", "banking-finance-fintech"],
    },
    {
      slug: "jonathan-reaves-okonkwo",
      fullName: "Jonathan Reaves-Okonkwo, Esq.",
      title: "Partner",
      designation: "Head of Complex Torts & Catastrophic Injury Litigation",
      bio: "Jonathan is an aggressive, trial-tested courtroom advocate dedicated to representing victims of industrial negligence, catastrophic trucking collisions, and corporate safety breaches.",
      detailedBio:
        "Jonathan Reaves-Okonkwo combines twenty years of trial experience with an empathetic, client-centered approach. Having trained both in Texas and Nigeria, Jonathan brings relentless courtroom tenacity inspired by leading American plaintiff trial academies. He has recovered over ₦18 Billion in structured compensation and damages for injured workers, grieving families, and accident victims.\n\nHe operates with a strict guarantee: clients are never treated like numbers, and his trial team prepares every meritorious case for trial rather than settling for discount insurance payouts.",
      photoUrl:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
      email: "j.reaves@sterlingcrestlaw.com",
      phone: "+234 (01) 453-8903",
      officeLocation: "Lagos Principal Chambers",
      admissions: JSON.stringify([
        "Supreme Court of Nigeria (2004)",
        "State Bar of Texas (Special Out-of-State Consultant)",
        "Nigerian Bar Association (Section on Public Interest and Development Law)",
      ]),
      education: JSON.stringify([
        "LL.M. in Civil Litigation & Trial Advocacy, University of Houston Law Center",
        "B.L., Nigerian Law School",
        "LL.B., University of Benin",
      ]),
      qualifications: JSON.stringify([
        "Member, American Association for Justice",
        "Top 100 Civil Trial Lawyers Recognition",
        "Senior Fellow, Institute of Trial Advocacy",
      ]),
      languages: JSON.stringify(["English (Fluent)", "Igbo (Fluent)"]),
      isPartner: true,
      isFeatured: true,
      displayOrder: 3,
      practiceSlugs: ["personal-injury-complex-torts", "dispute-resolution-litigation"],
    },
    {
      slug: "marcus-sterling-llm",
      fullName: "Marcus Sterling, LL.M. (LSE)",
      title: "Senior Partner",
      designation: "Head of Insolvency, Corporate Rescue & Debt Restructuring",
      bio: "Marcus is an authority in business rescue, receiverships, creditor workouts, and debt renegotiations under CAMA and cross-border restructuring regimes.",
      detailedBio:
        "Marcus Sterling has spent over two decades navigating acute financial distress for major commercial borrowers and secured lenders. He is renowned for speaking in straight lines, dispelling confusion, and engineering swift, legally enforceable debt workouts.\n\nWhether stopping immediate bank repossessions, halting unlawful winding-up petitions, or restructuring corporate debentures, Marcus's team safeguards businesses and enables entrepreneurs to protect their livelihoods through challenging financial climates.",
      photoUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      email: "m.sterling@sterlingcrestlaw.com",
      phone: "+234 (01) 453-8904",
      officeLocation: "Lagos Principal Chambers",
      admissions: JSON.stringify([
        "Supreme Court of Nigeria (2001)",
        "Solicitor of the Senior Courts of England & Wales (2008)",
        "Business Recovery and Insolvency Practitioners Association of Nigeria (BRIPAN)",
        "INSOL International Fellow",
      ]),
      education: JSON.stringify([
        "LL.M. in Corporate and Insolvency Law, London School of Economics (LSE)",
        "B.L., Nigerian Law School",
        "LL.B., University of Ibadan",
      ]),
      qualifications: JSON.stringify([
        "Fellow, Business Recovery and Insolvency Practitioners Association of Nigeria",
        "Who's Who Legal: Restructuring & Insolvency Thought Leader",
      ]),
      languages: JSON.stringify(["English (Fluent)", "Yoruba (Fluent)"]),
      isPartner: true,
      isFeatured: true,
      displayOrder: 4,
      practiceSlugs: ["bankruptcy-insolvency-restructuring", "corporate-commercial"],
    },
    {
      slug: "folashade-balogun-acti",
      fullName: "Folashade Balogun, B.L., ACTI",
      title: "Partner",
      designation: "Head of Banking, Finance & FinTech Practice",
      bio: "Folashade is an acclaimed financial services lawyer advising tier-1 banks, payment operators, and venture funds on debt syndication, regulatory sandbox compliance, and CBN directives.",
      detailedBio:
        "Folashade advises local and international financial institutions, asset managers, and emerging FinTech unicorns. She has structured syndicated loans exceeding ₦650 Billion, designed regulatory compliance architectures for electronic money institutions, and assisted clients in obtaining critical licenses from the Central Bank of Nigeria and SEC.",
      photoUrl:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
      email: "f.balogun@sterlingcrestlaw.com",
      phone: "+234 (09) 291-4401",
      officeLocation: "Abuja Federal Capital Chambers",
      admissions: JSON.stringify([
        "Supreme Court of Nigeria (2006)",
        "Chartered Institute of Taxation of Nigeria (ACTI)",
        "Association of Certified Anti-Money Laundering Specialists (ACAMS)",
      ]),
      education: JSON.stringify([
        "LL.M., Queen Mary University of London",
        "B.L., Nigerian Law School",
        "LL.B., Ahmadu Bello University, Zaria",
      ]),
      qualifications: JSON.stringify([
        "Legal 500 Recommended Lawyer: Banking & Finance",
        "Member, Capital Market Solicitors Association",
      ]),
      languages: JSON.stringify(["English (Fluent)", "Hausa (Working)", "Yoruba (Native)"]),
      isPartner: true,
      isFeatured: true,
      displayOrder: 5,
      practiceSlugs: ["banking-finance-fintech", "corporate-commercial"],
    },
    {
      slug: "amina-bello-esq",
      fullName: "Amina Bello, Esq.",
      title: "Senior Associate",
      designation: "Head of Technology, Data Protection & Intellectual Property",
      bio: "Amina advises digital media, SaaS platforms, and enterprise software firms on NDPA data compliance, software licensing, and brand anti-counterfeiting.",
      detailedBio:
        "Amina is a certified data protection compliance expert (NDPR/NDPA) and intellectual property attorney. She has managed trademark portfolios across 16 African jurisdictions and drafted comprehensive enterprise agreements for high-growth tech enterprises.",
      photoUrl:
        "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=800&q=80",
      email: "a.bello@sterlingcrestlaw.com",
      phone: "+234 (09) 291-4402",
      officeLocation: "Abuja Federal Capital Chambers",
      admissions: JSON.stringify([
        "Supreme Court of Nigeria (2014)",
        "Certified Information Privacy Professional (CIPP/E)",
        "Intellectual Property Law Association of Nigeria (IPLAN)",
      ]),
      education: JSON.stringify([
        "LL.M. in Innovation, Technology and the Law, University of Edinburgh",
        "B.L., Nigerian Law School",
        "LL.B., University of Jos",
      ]),
      qualifications: JSON.stringify([
        "Licensed Data Protection Compliance Organization (DPCO) Lead Auditor",
        "WIPO Academy Alumnus",
      ]),
      languages: JSON.stringify(["English (Fluent)", "Hausa (Native)"]),
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
      description: "Navigating complex regulatory frameworks under the Petroleum Industry Act and power sector unbundling.",
      iconName: "Zap",
      displayOrder: 1,
    },
    {
      slug: "banking-fintech-financial-services",
      name: "Banking & Financial Technology",
      summary: "Advising institutional lenders, payment gateways, and venture-backed FinTech firms.",
      description: "Specialized in regulatory sandbox navigation, CBN compliance, and cross-border digital payment infrastructure.",
      iconName: "Landmark",
      displayOrder: 2,
    },
    {
      slug: "real-estate-construction",
      name: "Real Estate, Hospitality & Infrastructure",
      summary: "Root-of-title perfection, commercial leasing, and major construction contracts.",
      description: "Securing investments in commercial high-rises, logistics hubs, and industrial developments.",
      iconName: "Building2",
      displayOrder: 3,
    },
    {
      slug: "manufacturing-fmcg",
      name: "Manufacturing, FMCG & Industrial Conglomerates",
      summary: "Product liability defense, labour relations, supply chain contracts, and trade compliance.",
      description: "Protecting leading manufacturers from operational liabilities and regulatory disruptions.",
      iconName: "Factory",
      displayOrder: 4,
    },
    {
      slug: "transportation-maritime-aviation",
      name: "Transportation, Maritime & Aviation",
      summary: "Admiralty claims, aircraft leasing, vessel arrest, and cabotage compliance.",
      description: "Handling high-value shipping disputes, cargo damage claims, and aviation regulatory approvals.",
      iconName: "Ship",
      displayOrder: 5,
    },
    {
      slug: "technology-telecom-media",
      name: "Technology, Telecoms & Digital Media",
      summary: "Spectrum licensing, data privacy audits, software IP, and venture financings.",
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
        "Represented an indigenous oil and gas consortium in international commercial arbitration against a multinational operator concerning cost-recovery calculations and cash call defaults.",
      challenge:
        "The opposing party sought urgent forfeiture of our client's 40% participating interest in a prolific offshore oil block under alleged operational defaults.",
      solution:
        "Chief Adebayo Sterling SAN and our dispute team secured immediate emergency anti-arbitration and preservation injunctions before defeating the forfeiture petition before an ICC tribunal in London.",
      outcome:
        "Tribunal dismissed all forfeiture claims in their entirety, awarded our client $14.5M in counter-claim damages, and secured their long-term operational equity.",
      matterYear: "2024",
      displayOrder: 1,
    },
    {
      slug: "debt-restructuring-regional-aviation",
      title: "Comprehensive Restructuring of $45M Corporate Debt Facility for Regional Airline",
      practiceAreaName: "Insolvency, Bankruptcy & Corporate Restructuring",
      industry: "Transportation, Maritime & Aviation",
      summary:
        "Steered an urgent debt moratorium and asset rescue strategy for a major regional carrier facing immediate aircraft repossessions by international leasing syndicates.",
      challenge:
        "Three international aircraft lessors had filed ex-parte repossession motions in the Federal High Court, which would have permanently grounded the airline's fleet within 48 hours.",
      solution:
        "Marcus Sterling engaged the lenders in structured negotiations under CAMA Scheme of Arrangement provisions while filing counter-affidavits that stayed the repossession orders.",
      outcome:
        "Successfully converted $22M into structured convertible debt, rescheduled remaining amortizations over 7 years with interest relief, and kept all aircraft flying uninterrupted.",
      matterYear: "2023",
      displayOrder: 2,
    },
    {
      slug: "industrial-injury-catastrophic-recovery",
      title: "Landmark Compensation Recovery in Catastrophic Industrial Workplace Negligence Matter",
      practiceAreaName: "Personal Injury & Complex Tort Litigation",
      industry: "Manufacturing, FMCG & Industrial Conglomerates",
      summary:
        "Secured a record settlement for an industrial technician who suffered severe spinal injuries and permanent disability due to defective safety interlocks on heavy machinery.",
      challenge:
        "The multinational equipment manufacturer and employer denied liability, claiming employee error and asserting sovereign immunity clauses in third-party supply contracts.",
      solution:
        "Jonathan Reaves-Okonkwo mobilized forensic engineering experts, reconstructed the safety sequence failure, and initiated high-profile tort litigation.",
      outcome:
        "Secured a confidential multi-hundred-million-Naira structured settlement covering lifelong medical care, home modification, and financial security for the client's family.",
      matterYear: "2024",
      displayOrder: 3,
    },
    {
      slug: "fintech-regulatory-acquisition-clearance",
      title: "Regulatory Advisory & Closing of $85M FinTech Cross-Border Payment License & Financing",
      practiceAreaName: "Banking, Finance & FinTech",
      industry: "Banking & Financial Technology",
      summary:
        "Structured the corporate acquisition and multi-tier regulatory approval process for a premier African digital payment switch acquiring payment licenses across 4 jurisdictions.",
      challenge:
        "Overcoming stringent Central Bank capital adequacy requirements, complex shareholding disclosures, and foreign exchange repatriation regulations.",
      solution:
        "Victoria Crest and Folashade Balogun architected an innovative holding structure with SPVs and liaised directly with regulators to obtain unconditional approvals.",
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
      slug: "restructuring-vs-liquidation-under-cama-2020",
      title: "Corporate Rescue vs. Liquidation: How Nigerian Businesses Can Protect Assets During Debt Crises",
      summary:
        "A critical examination of the corporate rescue mechanisms introduced under the Companies and Allied Matters Act (CAMA) 2020, and practical steps directors must take when facing creditor pressure.",
      category: "LEGAL_UPDATE",
      authorName: "Marcus Sterling, LL.M. (LSE)",
      authorTitle: "Senior Partner, Head of Insolvency & Restructuring",
      readTime: "6 min read",
      coverImage:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      isPublished: true,
      isFeatured: true,
      publishedAt: new Date(),
      content: `
### The New Paradigm of Corporate Rescue

For decades, the legal regime governing corporate debt in Nigeria was heavily skewed toward aggressive liquidation and ruthless creditor asset seizures. The moment a business encountered operational cash-flow turbulence, debenture holders and secured creditors would install receivers whose sole mandate was to sell off assets at fire-sale discounts.

With the enactment of the **Companies and Allied Matters Act (CAMA) 2020**, Nigerian jurisprudence underwent a monumental shift toward modern corporate rescue paradigms, closely aligned with the UK Insolvency Act and the US Chapter 11 reorganization principles.

### Key Tools Available to Distressed Companies

#### 1. Company Voluntary Arrangements (CVA)
A CVA permits directors to propose a legally binding settlement plan to unsecured creditors. Once approved by 75% in value of creditors present and voting, it binds all creditors, offering immediate breathing space to renegotiate loan tenors without losing operational control.

#### 2. Administration Orders
Placing a company into Administration automatically creates a statutory moratorium against all legal proceedings, execution of court judgments, and landlord forfeiture actions. This allows an independent Administrator to either rescue the company as a going concern or achieve a more advantageous realization than immediate liquidation.

#### 3. Netting Provisions & Enforceability
CAMA 2020 explicitly recognizes qualified financial contracts and bilateral netting agreements, protecting financial institutions and corporate treasury desks from cascading insolvencies during market volatility.

### What Directors Must Do When Insolvency Looms

1. **Cease Incurring Further Credit Unlawfully:** Avoid fraudulent trading liability under Section 672 of CAMA.
2. **Engage Legal Counsel Early:** Do not wait until receiving a statutory 21-day winding-up notice or a Receiver's deed of appointment.
3. **Audit Collateral Perfectibility:** Frequently, creditor debentures contain procedural defects regarding registration at the Corporate Affairs Commission (CAC) that provide vital leverage in restructuring negotiations.

*For tailored advice on corporate debt workouts and emergency creditor freezes, contact our Insolvency & Restructuring team.*
      `,
    },
    {
      slug: "personal-injury-claims-in-workplace-accidents",
      title: "Navigating Industrial Accidents: Legal Rights of Injured Workers and Tort Recovery in Nigeria",
      summary:
        "Why workers injured on offshore platforms, construction sites, and factories are often entitled to substantial common law damages beyond statutory employee compensation caps.",
      category: "ARTICLE",
      authorName: "Jonathan Reaves-Okonkwo, Esq.",
      authorTitle: "Partner, Head of Complex Torts",
      readTime: "5 min read",
      coverImage:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
      isPublished: true,
      isFeatured: true,
      publishedAt: new Date(),
      content: `
### Beyond the Statutory Cap

When a worker suffers catastrophic injuries in an industrial accident—such as an explosion, crane collapse, chemical exposure, or fall from height—employers and their insurance underwriters quickly push to settle the matter under the Employees' Compensation Act (ECA) 2010.

While the ECA provides steady administrative compensation through the Nigeria Social Insurance Trust Fund (NSITF), the statutory payouts are often completely inadequate to cover lifelong specialized medical care, permanent disability modifications, and true loss of future earnings.

### Common Law Negligence vs. Statutory Claims

What many injured employees and their families do not realize is that the ECA does **not** extinguish a victim's constitutional and common law right to sue negligent third parties, equipment manufacturers, or contractors in a civil court of law for substantial damages.

#### Key Grounds for High-Value Tort Claims:
- **Defective Machinery & Products:** Suing the foreign or domestic manufacturer of faulty safety equipment or rigging gear under strict product liability.
- **Contractor Negligence:** Holding principal operators liable when safety protocols are deliberately bypassed to meet urgent construction deadlines.
- **Vicarious Liability for Gross Incompetence:** Where supervisors fail to enforce mandatory personal protective equipment (PPE) standards or safe operating procedures.

### Preserving Evidence Immediately After an Incident

The greatest risk to any personal injury claim is the destruction of evidence. Companies frequently scrub incident logs, alter equipment, and re-train witnesses within 72 hours of a major casualty.

**Crucial Steps for Victims and Families:**
1. Document the scene with photographs and video immediately.
2. Secure the names, phone numbers, and statements of eyewitnesses and co-workers.
3. Request complete copies of internal safety incident reports and medical triage notes.
4. Consult an experienced trial attorney before signing any employer release or waiver of claims.
      `,
    },
    {
      slug: "central-bank-fintech-regulatory-guidelines-2025",
      title: "Central Bank of Nigeria Regulatory Directives: Compliance Roadmap for Digital Payment Operators",
      summary:
        "An in-depth analysis of the latest CBN capital requirements, anti-money laundering (AML) mandates, and foreign currency settlement rules for African FinTechs.",
      category: "CLIENT_ALERT",
      authorName: "Folashade Balogun, B.L., ACTI",
      authorTitle: "Partner, Head of Banking & FinTech",
      readTime: "7 min read",
      coverImage:
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
      isPublished: true,
      isFeatured: false,
      publishedAt: new Date(),
      content: `
### Strategic Shifts in CBN Digital Banking Supervision

As digital financial services expand across Nigeria and the broader African continent, the Central Bank of Nigeria (CBN) has implemented stringent supervisory guidelines designed to bolster consumer protection, prevent systemic liquidity contagion, and curtail illicit capital flight.

### Core Regulatory Highlights for FinTech Boards:

1. **Enhanced KYC and Tiered Account Verification:** Stricter enforcement of Bank Verification Number (BVN) and National Identity Number (NIN) reconciliation across all customer wallet tiers.
2. **Capital Adequacy & Escrow Deposits:** Mandatory statutory deposits held at the CBN for Payment Terminal Service Providers (PTSPs), Mobile Money Operators (MMOs), and Switching Companies.
3. **Cross-Border Remittance Safeguards:** Strict oversight of International Money Transfer Operators (IMTOs) and mandatory real-time reporting of foreign exchange inflows.

Our Banking & FinTech practice routinely prepares digital operators for CBN regulatory examinations and sandbox licensing.
      `,
    },
    {
      slug: "arbitration-clause-drafting-international-contracts",
      title: "Drafting Bulletproof Arbitration Clauses in African Commercial Contracts: Avoiding Costly Pitfalls",
      summary:
        "How sophisticated commercial parties can avoid pathological dispute resolution clauses that lead to years of procedural delays before international tribunals.",
      category: "PUBLICATION",
      authorName: "Chief Adebayo Sterling SAN, FCIArb",
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
2. **Seat vs. Venue of Arbitration:** Understand that the seat of arbitration governs the procedural law (lex arbitri) and the supervisory court with jurisdiction to set aside or enforce the award.
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

  // 8. Testimonials (Inspired by reaveslee.com and elite African commercial practice)
  const testimonialsData = [
    {
      clientName: "Dr. Kalu Adeleke",
      clientRole: "Executive Vice-Chairman",
      company: "Trans-Sahara Energy Holdings",
      quote:
        "Sterling & Crest demonstrated unmatched tactical precision when our board was facing severe regulatory scrutiny and creditor threats in our oilfield concessions. Chief Adebayo Sterling and Victoria Crest stabilized our position within days. Their strategic litigation and commercial wisdom saved our operational license.",
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
        "When our interstate trucking fleet faced catastrophic multi-vehicle liability claims and aggressive creditor freezes, Jonathan Reaves-Okonkwo and his trial team fought relentlessly. They cut through the noise, protected our capital, and treated our leadership with unwavering professionalism.",
      rating: 5,
      caseType: "Complex Torts & Liability Defense",
      isFeatured: true,
      displayOrder: 2,
    },
    {
      clientName: "Tunde Bakare",
      clientRole: "Managing Director",
      company: "Apex Manufacturing Industries",
      quote:
        "Filing for debt restructuring is stressful, but Marcus Sterling and the team made the entire process disciplined and transparent. They kept us fully informed at every hearing, stopped aggressive bank enforcement, and negotiated sustainable repayment terms that enabled us to keep our 450 factory workers employed.",
      rating: 5,
      caseType: "Insolvency & Debt Restructuring",
      isFeatured: true,
      displayOrder: 3,
    },
    {
      clientName: "Sir Charles Egwu",
      clientRole: "Principal Trustee",
      company: "The Egwu Family Estates & Trusts",
      quote:
        "We were facing the potential loss of a historic family commercial compound in Victoria Island due to complex predatory claims and title disputes. Sterling & Crest not only halted unlawful seizures in their tracks but successfully overturned forty years of fraudulent registrations. I trust them completely.",
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
      city: "Lagos",
      country: "Nigeria",
      addressLine1: "18A Adeola Odeku Street",
      addressLine2: "Victoria Island, Lagos State",
      postalCode: "101241",
      phone: "+234 (01) 453-8900",
      email: "lagos@sterlingcrestlaw.com",
      hours: "Monday – Friday: 8:00 AM – 6:00 PM (WAT)",
      mapUrl: "https://maps.google.com/?q=Victoria+Island+Lagos",
      isPrimary: true,
      displayOrder: 1,
    },
    {
      city: "Abuja",
      country: "Nigeria",
      addressLine1: "Plot 1042 Kur Mohammed Avenue",
      addressLine2: "Central Business District, Abuja FCT",
      postalCode: "900211",
      phone: "+234 (09) 291-4400",
      email: "abuja@sterlingcrestlaw.com",
      hours: "Monday – Friday: 8:30 AM – 5:30 PM (WAT)",
      mapUrl: "https://maps.google.com/?q=Central+Business+District+Abuja",
      isPrimary: false,
      displayOrder: 2,
    },
    {
      city: "London",
      country: "United Kingdom",
      addressLine1: "45 Berkeley Square",
      addressLine2: "Mayfair, London",
      postalCode: "W1J 5AS",
      phone: "+44 (020) 7946-0812",
      email: "london@sterlingcrestlaw.com",
      hours: "Monday – Friday: 9:00 AM – 5:00 PM (GMT)",
      mapUrl: "https://maps.google.com/?q=Berkeley+Square+London",
      isPrimary: false,
      displayOrder: 3,
    },
    {
      city: "Dallas",
      country: "United States",
      addressLine1: "4228 North Central Expressway",
      addressLine2: "Suite 340, Dallas, Texas",
      postalCode: "75206",
      phone: "+1 (214) 440-1414",
      email: "dallas@sterlingcrestlaw.com",
      hours: "Monday – Friday: 8:30 AM – 5:00 PM (CST)",
      mapUrl: "https://maps.google.com/?q=4228+North+Central+Expy+Dallas+Texas",
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
        "You can schedule a consultation by completing our secure online Consultation Request form, calling our principal chambers directly at +234 (01) 453-8900, or emailing intake@sterlingcrestlaw.com. Our intake committee reviews all inquiries within two business hours and contacts you to confirm availability with the appropriate Practice Group Leader.",
      category: "CONSULTATIONS",
      displayOrder: 1,
    },
    {
      question: "What should I bring or prepare for my first legal consultation?",
      answer:
        "Please have ready all relevant contractual agreements, official correspondence, court processes (if litigation has already commenced), demand letters, and a chronological summary of key events. For personal injury or industrial accident claims, please prepare medical reports, accident site photographs, and correspondence from insurance adjusters.",
      category: "CONSULTATIONS",
      displayOrder: 2,
    },
    {
      question: "Can you stop bank foreclosures, asset freezes, and creditor seizures immediately?",
      answer:
        "Yes. Under Nigerian procedural rules and the Companies and Allied Matters Act (CAMA) 2020, our Insolvency and Dispute Resolution teams can file emergency motions for interim injunctions and orders maintaining the status quo within 24 to 48 hours to prevent unlawful asset dissipation or receivership takeover while debt restructuring negotiations proceed.",
      category: "LITIGATION",
      displayOrder: 3,
    },
    {
      question: "How does the firm structure its legal fees and billing?",
      answer:
        "Depending on the nature of the matter, we offer flexible billing arrangements including hourly rates, fixed retainers for corporate general counsel, milestone-based fees for transactions, and contingency / success-fee structures for select catastrophic personal injury and commercial debt recoveries where permitted by professional conduct rules.",
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
        "Extensively. Our partners are qualified in multiple jurisdictions (Nigeria, England & Wales, New York, and Texas) and regularly represent sovereigns, multinationals, and domestic champions before the LCIA, ICC International Court of Arbitration, and ICSID tribunals.",
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
      location: "Lagos Principal Chambers",
      employmentType: "Full-Time",
      experienceLevel: "6–9 Years Post-Call",
      summary:
        "Seeking an exceptional litigator with proven courtroom and appellate advocacy credentials to lead complex commercial disputes before the High Courts and Court of Appeal.",
      responsibilities: JSON.stringify([
        "Drafting originating processes, appellate briefs, and complex affidavits for high-value commercial actions.",
        "Conducting advocacy before superior courts of record in commercial, insolvency, and contract disputes.",
        "Managing client advisory relationships and coordinating junior counsel and paralegals.",
        "Leading witness depositions, legal research, and settlement negotiations.",
      ]),
      requirements: JSON.stringify([
        "LL.B. (Minimum Second Class Upper) and B.L. from recognized institutions.",
        "6–9 years active post-call commercial litigation experience at a premier commercial law practice.",
        "Demonstrated track record of drafting reported Supreme Court / Court of Appeal briefs.",
        "Exceptional analytical, written, and persuasive oral advocacy skills.",
      ]),
      benefits: JSON.stringify([
        "Top-tier compensation package competitive with Magic Circle regional benchmarks.",
        "Comprehensive health insurance for employee and immediate family.",
        "Annual international legal conference sponsorship.",
        "Clear path to partnership consideration.",
      ]),
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      isOpen: true,
    },
    {
      slug: "associate-corporate-mergers-acquisitions",
      title: "Associate — Corporate, M&A & Private Equity",
      department: "Corporate & Commercial",
      location: "Lagos Principal Chambers (Hybrid)",
      employmentType: "Full-Time",
      experienceLevel: "3–5 Years Post-Call",
      summary:
        "Join our market-leading corporate practice advising international private equity funds, sovereign investors, and tech pioneers on multi-million dollar acquisitions.",
      responsibilities: JSON.stringify([
        "Conducting legal due diligence audits and drafting comprehensive transaction memoranda.",
        "Drafting Share Purchase Agreements, Shareholders Agreements, and Disclosure Letters.",
        "Managing filings and interface with SEC, CAC, NOTAP, and Federal Competition and Consumer Protection Commission (FCCPC).",
        "Assisting partners in cross-border joint venture negotiations.",
      ]),
      requirements: JSON.stringify([
        "3–5 years post-call experience in corporate finance, M&A, or commercial transactions.",
        "Demonstrated grasp of Companies and Allied Matters Act 2020 and corporate governance codes.",
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
    { key: "FIRM_NAME", value: "Sterling & Crest Legal Practitioners", description: "Official firm name" },
    { key: "FIRM_TAGLINE", value: "Strategic Legal Counsel for Complex Matters", description: "Firm slogan" },
    { key: "PRIMARY_PHONE", value: "+234 (01) 453-8900", description: "Main phone line" },
    { key: "SECONDARY_PHONE", value: "+234 (09) 291-4400", description: "Abuja phone line" },
    { key: "PRIMARY_EMAIL", value: "counsel@sterlingcrestlaw.com", description: "Main inquiry email" },
    { key: "CONSULTATION_EMAIL", value: "intake@sterlingcrestlaw.com", description: "Direct intake email" },
    { key: "EMERGENCY_LINE", value: "+234 (0) 803-900-1122", description: "Emergency after-hours line" },
    { key: "LINKEDIN_URL", value: "https://linkedin.com/company/sterling-crest-law", description: "LinkedIn" },
    { key: "X_TWITTER_URL", value: "https://x.com/sterlingcrestlaw", description: "X (Twitter)" },
    { key: "FACEBOOK_URL", value: "https://facebook.com/sterlingcrestlaw", description: "Facebook" },
    { key: "INSTAGRAM_URL", value: "https://instagram.com/sterlingcrestlaw", description: "Instagram" },
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
