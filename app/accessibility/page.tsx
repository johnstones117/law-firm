import { CheckCircle2, Shield } from "lucide-react";

export const metadata = {
  title: "Accessibility Statement (WCAG 2.2 AA)",
  description:
    "Crest & Sterling's commitment to digital accessibility, screen-reader compatibility, and WCAG 2.2 AA conformance.",
};

export default function AccessibilityPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-legal-navy-950 text-white py-16 border-b border-legal-navy-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase font-bold tracking-widest text-legal-gold-400 block mb-2">
            Inclusive Design &bull; WCAG 2.2 AA
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Accessibility Statement
          </h1>
          <p className="text-slate-400 text-xs mt-2">
            Crest &amp; Sterling Alliance &bull; Universal Web Standards
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate text-sm text-slate-700 leading-relaxed space-y-6">
          <p>
            Crest &amp; Sterling is committed to ensuring that our digital portal is accessible to all individuals, including persons with visual, auditory, cognitive, and motor impairments. We continually optimize our web presence in accordance with the <strong>Web Content Accessibility Guidelines (WCAG) 2.2 Level AA</strong> standards.
          </p>

          <h2 className="font-serif text-xl font-bold text-legal-navy-950">Measures Taken to Support Accessibility</h2>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-legal-gold-600 flex-shrink-0 mt-0.5" />
              <span><strong>Full Keyboard Navigation:</strong> All navigation menus, dropdowns, and form fields are operable via Tab and Shift+Tab key sequences.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-legal-gold-600 flex-shrink-0 mt-0.5" />
              <span><strong>High Contrast &amp; Typography:</strong> Text and visual elements meet or exceed the 4.5:1 contrast ratio against background surfaces.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-legal-gold-600 flex-shrink-0 mt-0.5" />
              <span><strong>Screen-Reader Compatibility:</strong> Semantic HTML landmarks (header, nav, main, footer, article) and descriptive ARIA labels for non-text media.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-legal-gold-600 flex-shrink-0 mt-0.5" />
              <span><strong>Accessible Forms:</strong> Clear visual labels, explicit error states, and high-visibility focus indicators across all consultation inputs.</span>
            </li>
          </ul>

          <h2 className="font-serif text-xl font-bold text-legal-navy-950">Feedback &amp; Assistance</h2>
          <p>
            If you encounter difficulty accessing any content on this website, please contact our Technical Desk at <a href="mailto:accessibility@crestandsterling.com" className="text-legal-gold-700 underline">accessibility@crestandsterling.com</a> or telephone chambers at +234 (01) 453-8900.
          </p>
        </div>
      </section>
    </div>
  );
}
