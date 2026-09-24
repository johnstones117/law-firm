# Sterling & Crest Legal Practitioners — Enterprise Law Firm Platform

A world-class, production-ready enterprise legal practice web application built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, **Prisma ORM**, and secure session-based authentication.

Inspired by the editorial elegance, strategic dual-practice architecture, and conversion-focused design of [Reaves & Lee, PLLC](https://reaveslee.com/), tailored for an international commercial law firm with chambers in **Lagos, Abuja, London, and Dallas**.

---

## 🏛️ System Architecture & Features

### 1. Public Firm Portals
- **Homepage (`/`)**: Hero with dual CTA, trust metrics, multidisciplinary legal strength overview, 3-step intake protocol, practice groups grid, featured Senior Advocates of Nigeria (SAN), high-value case studies, client testimonials, legal updates, and consultation intake.
- **About Our Firm (`/about`)**: History, founding principles, leadership, and chambers directory.
- **Attorneys Directory (`/people`) & Profiles (`/people/[slug]`)**: High-res portraits, titles, detailed biography, bar admissions, academic pedigree, qualifications, languages, linked practice areas, and direct consultation CTA.
- **Practice Areas (`/practice-areas`) & Deep Dives (`/practice-areas/[slug]`)**: 8 core commercial legal disciplines with practice overview, itemized legal services, relevant industries, leading counsel, representative matters, and FAQs.
- **Industry Focus (`/industries`)**: Specialized coverage across Energy & Utilities, Banking & FinTech, Real Estate, Manufacturing, Maritime, and Telecoms.
- **Representative Matters & Case Studies (`/case-studies`)**: Landmark commercial victories, CAMA debt restructurings, tort compensations, and arbitral outcomes.
- **Insights & Legal Updates (`/insights`) & Reader (`/insights/[slug]`)**: Publishing system with category filtering (Legal Updates, Articles, Client Alerts, Publications), reading times, and social sharing.
- **Careers & Pupillage (`/careers`) & Job Detail (`/careers/[slug]`)**: Live job postings with responsibilities, qualifications, and working application submission form.
- **Multi-Office Chambers (`/offices`) & Contact (`/contact`)**: Lagos Principal Chambers, Abuja FCT, London Mayfair, and Dallas Texas with phone numbers, hours, directions, and general contact form.
- **Consultation & Case Evaluation (`/consultation`)**: 3-step evaluation booking system with client/matter details, contact preference, schedule options, mandatory legal disclaimer consent, reference code generation, database storage, and email notifications.
- **Frequently Asked Questions (`/faq`)**: Interactive categories (General, Consultations, Litigation, Billing).
- **Site-Wide Search (`/search?q=`)**: Instant search across Attorneys, Practice Areas, Articles, Case Studies, and FAQs.
- **Legal Compliance Pages**: Full Privacy Policy (NDPA/GDPR), Terms of Use, Cookie Policy with user consent management, Formal Legal Disclaimer, and WCAG 2.2 AA Accessibility Statement.
- **Error Handling**: Custom 404 (`not-found.tsx`) and 500 error boundaries (`error.tsx`).

### 2. Administrative CMS (`/admin`)
- **Secure Authentication (`/admin/login`)**: High-speed, secure JWT session cookies with `bcryptjs` password hashing and RBAC protection.
- **Executive Dashboard (`/admin`)**: Live telemetry of total inquiries, new consultations, contact messages, active newsletter subscribers, published articles, attorneys, and practice areas.
- **Consultation Intake Manager**: View client information, matter summary, update status (`NEW`, `CONTACTED`, `IN_REVIEW`, `COMPLETED`, `ARCHIVED`), add internal admin notes, or delete.
- **Contact Inquiries Inbox**: Review and archive general messages.
- **Attorney Profiles Manager**: Add new legal counsel, publish/unpublish, or delete records.
- **Practice Areas & Articles CMS**: Manage legal disciplines and publications.
- **Global Chambers Settings**: Update firm name, official intake phone numbers, consultation email, and social media handles dynamically without code changes.
- **Administrative Audit Trail**: Every status change, creation, and deletion is recorded with admin email, timestamp, and IP address.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router, Server Components & Server Actions) |
| **Frontend** | React 19, TypeScript, Tailwind CSS, Lucide Icons, Sonner Toaster |
| **Database** | Prisma ORM 6 with SQLite (Development) / PostgreSQL (Neon / Supabase / Vercel Postgres) |
| **Authentication** | `jose` (HS256 JWT sessions), HttpOnly secure cookies, `bcryptjs` |
| **Form Validation** | Zod schemas with client and server-side verification |
| **Notifications** | Nodemailer with branded HTML legal templates & development fallback |
| **SEO & Standards** | Dynamic XML sitemap, `robots.txt`, OpenGraph metadata, WCAG 2.2 AA |

---

## 🚀 Quick Start & Local Setup

### 1. Prerequisites
- **Node.js**: v18.18+ or v20+ (Tested on Node.js v24.20.0)
- **npm**: 10+ (Tested on npm 11.7.0)

### 2. Installation
```bash
# Install dependencies
npm install

# Push database schema (creates local dev.db)
npx prisma db push

# Seed rich initial legal data (attorneys, practice areas, articles, offices, admin)
npx tsx prisma/seed.ts
```

### 3. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🔑 Default Credentials (Development Seed)

| Portal | URL | Email | Password |
|---|---|---|---|
| **Chambers Administrative CMS** | `/admin/login` | `senior.partner@sterlingcrestlaw.com` | `Sterling@Admin2026!` |

---

## 🌐 Production Deployment to Vercel

### Step 1: Push to GitHub
```bash
git add .
git commit -m "feat: complete world-class law firm website production build"
git branch -M main
git remote add origin https://github.com/YourUsername/your-repo.git
git push -u origin main
```

### Step 2: Import into Vercel
1. In the [Vercel Dashboard](https://vercel.com), click **Add New Project** and import the GitHub repository.
2. Under **Environment Variables**, configure the variables from `.env.example`:
   - `DATABASE_URL`: Your production PostgreSQL URL (e.g. Neon.tech, Supabase, or Vercel Postgres).
   - `AUTH_SECRET`: A secure 32+ character random string.
   - `NEXT_PUBLIC_APP_URL`: Your custom production domain (e.g. `https://sterlingcrestlaw.com`).
   - `EMAIL_HOST`, `EMAIL_USER`, `EMAIL_PASS`: SMTP credentials for live email delivery.
3. Deploy!

---

## 🔒 PRIVACY, ANONYMITY & OPSEC GUIDE (UPLOADING SAFELY)

When publishing and uploading this project while protecting your personal identity and minimizing your digital footprint, follow these critical checkpoints:

### 1. Local Git Author Identity (Already Enforced)
Git embeds your author name and email into every commit hash.
- In this repository, Git has been configured locally with a pseudonymous identity:
  ```bash
  git config user.name "SterlingLegalDev"
  git config user.email "legal-dev@users.noreply.github.com"
  ```
- Before pushing to any public remote, verify that your personal email (`priyeston@mail.com`) is **not** present:
  ```bash
  git log -n 1 --format="Author: %an <%ae>"
  ```

### 2. GitHub Account Separation
- Use a dedicated, pseudonymous GitHub account created with a clean email address.
- In GitHub **Settings** → **Emails**:
  - Check **"Keep my email addresses private"**.
  - Check **"Block command line pushes that expose my email"**.

### 3. Sanitized Codebase & Environment Files
- The `.gitignore` is pre-configured to strictly ignore `.env`, `.env.local`, `dev.db`, and local editor files (`.vscode`, `.idea`).
- Ensure no personal API keys, private corporate emails, or local computer file paths are hardcoded in any component or `package.json`.

### 4. Domain & WHOIS Privacy
- If attaching a custom domain, register it with a provider that includes **free WHOIS Privacy Protection** (e.g., Cloudflare Registrar or Namecheap WhoisGuard) so your name, address, and telephone are never exposed in public ICANN WHOIS directories.
- Proxy your DNS through Cloudflare to mask your origin server IP.

### 5. Platform Terms of Service
- Ensure the website complies with platform Acceptable Use Policies. Centralized platforms (GitHub, Vercel, Cloudflare) operate automated abuse detection systems and comply with legal takedowns for fraudulent schemes or brand impersonation.
