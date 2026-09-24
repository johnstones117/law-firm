import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { Toaster } from "sonner";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Sterling & Crest Legal Practitioners",
    default: "Sterling & Crest Legal Practitioners | Commercial Litigation, Restructuring & Corporate Counsel",
  },
  description:
    "An elite international legal practice headquartered in Nigeria with chambers in Lagos, Abuja, London, and Texas. Renowned for strategic trial advocacy, complex debt restructuring, corporate M&A, and personal injury litigation.",
  keywords: [
    "Nigerian Law Firm",
    "Commercial Litigation Lagos",
    "Senior Advocate of Nigeria",
    "Corporate Restructuring",
    "Insolvency Lawyers Nigeria",
    "Arbitration London Lagos",
    "Personal Injury Attorneys",
    "Petroleum Industry Act Lawyers",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    title: "Sterling & Crest Legal Practitioners",
    description:
      "Strategic Legal Counsel for Complex Matters — Commercial Litigation, Insolvency, and Corporate Advisory.",
    type: "website",
    locale: "en_NG",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sterling & Crest Legal Practitioners",
    description: "Strategic Legal Counsel for Complex Matters.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-legal-cream-50 text-slate-900 selection:bg-legal-gold-200">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <CookieConsent />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
