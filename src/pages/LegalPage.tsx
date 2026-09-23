import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  PageHeader,
  Heading,
  Text,
  PageSeo,
} from '../components';
import { ShieldCheck, Lock, FileText, CheckCircle2, Download, Scale } from 'lucide-react';

export const LegalPage: React.FC = () => {
  const location = useLocation();
  const isPrivacy = location.pathname.includes('privacy');

  const title = isPrivacy ? 'Privacy & Data Protection Policy' : 'Terms of Corporate Engagement & RFQ';
  const eyebrow = isPrivacy ? 'LEGAL & COMPLIANCE // PRIVACY' : 'LEGAL & COMPLIANCE // TERMS';
  const description = isPrivacy
    ? 'How Asterra Manufacturing Group protects, processes, and safeguards corporate, partner, and tender confidential information.'
    : 'Standard contractual framework, engineering drawings confidentiality, and procurement terms governing Asterra Group engagements.';

  return (
    <div className="w-full">
      <PageSeo
        title={title}
        description={description}
        ogType="website"
      />

      {/* 1. ARCHITECTURAL PAGE HEADER */}
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        breadcrumbs={[
          { label: 'Legal & Governance', href: isPrivacy ? '/privacy' : '/terms' },
          { label: isPrivacy ? 'Privacy Policy' : 'Terms of Engagement' },
        ]}
        theme="evergreen"
      />

      {/* 2. STATUTORY SWITCHER & TELEMETRY BAR */}
      <section className="bg-white border-b border-border py-4 sm:py-6">
        <div className="container-corporate flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Policy Switcher Tabs */}
          <div className="flex gap-2">
            <Link
              to="/privacy"
              className={`px-4 py-2.5 text-xs font-mono uppercase tracking-wider font-bold border transition-all min-h-[44px] flex items-center ${
                isPrivacy
                  ? 'bg-evergreen text-white border-evergreen shadow-xs'
                  : 'bg-ivory-canvas text-charcoal-body border-border hover:border-evergreen'
              }`}
            >
              Privacy & Data Policy
            </Link>
            <Link
              to="/terms"
              className={`px-4 py-2.5 text-xs font-mono uppercase tracking-wider font-bold border transition-all min-h-[44px] flex items-center ${
                !isPrivacy
                  ? 'bg-evergreen text-white border-evergreen shadow-xs'
                  : 'bg-ivory-canvas text-charcoal-body border-border hover:border-evergreen'
              }`}
            >
              Terms of Engagement
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert(`Official signed legal document for ${title} initiated for download.`)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-ivory-canvas border border-border text-evergreen hover:border-evergreen font-mono text-xs font-bold uppercase transition-colors min-h-[44px] cursor-pointer"
            >
              <Download className="w-4 h-4 text-mineral-teal" />
              <span>Download PDF Policy Document</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. MAIN LEGAL CONTENT */}
      <section className="py-12 sm:py-16 lg:py-24 bg-ivory-canvas border-b border-border">
        <div className="container-corporate max-w-4xl mx-auto space-y-8 sm:space-y-12">
          {/* Legal Institutional Seal Callout */}
          <div className="p-5 sm:p-8 bg-white border border-border flex items-start gap-4 shadow-xs">
            <Scale className="w-8 h-8 text-mineral-teal shrink-0 mt-1" />
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-mineral-teal uppercase font-bold tracking-wider">
                Corporate Statutory Governance Seal
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-evergreen">
                Enacted by the Asterra Group Secretariat & Legal Directorate
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Registered under Share Company Registration No. 09-412, Ministry of Trade and Industry, Federal Democratic Republic of Ethiopia.
              </p>
            </div>
          </div>

          <div className="bg-white border border-border p-6 sm:p-10 space-y-8 sm:space-y-10 shadow-xs">
            {isPrivacy ? (
              <>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-mineral-teal" />
                    <Heading as="h2" font="serif" size="heading-lg" color="evergreen" className="text-lg sm:text-xl">
                      1. Corporate Data & RFQ Confidentiality
                    </Heading>
                  </div>
                  <Text variant="body" color="body" className="leading-relaxed text-xs sm:text-sm">
                    Asterra Manufacturing Group ("Asterra", "the Group") is committed to safeguarding the confidentiality, integrity, and security of all engineering specifications, tender documents, proprietary CAD/BIM models, and commercial communications submitted via our digital channels or direct executive office correspondence.
                  </Text>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-mineral-teal" />
                    <Heading as="h2" font="serif" size="heading-lg" color="evergreen" className="text-lg sm:text-xl">
                      2. Processing of Technical & Contractual Data
                    </Heading>
                  </div>
                  <Text variant="body" color="body" className="leading-relaxed text-xs sm:text-sm">
                    Technical drawings, WPS/PQR specifications, and bill-of-quantity documents are processed strictly within Asterra’s secure internal enterprise network. Such documents are accessible only to qualified engineering estimators, quality assurance auditors, and authorized executive committee members.
                  </Text>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-mineral-teal" />
                    <Heading as="h2" font="serif" size="heading-lg" color="evergreen" className="text-lg sm:text-xl">
                      3. No Third-Party Commercial Exploitation
                    </Heading>
                  </div>
                  <Text variant="body" color="body" className="leading-relaxed text-xs sm:text-sm">
                    Under no circumstances does Asterra sell, trade, license, or transfer client, tender, or candidate data to external commercial brokers or unauthorized third parties. All employee applicant data is managed in strict compliance with applicable labor statutes and ISO 27001 data governance.
                  </Text>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-mineral-teal" />
                    <Heading as="h2" font="serif" size="heading-lg" color="evergreen" className="text-lg sm:text-xl">
                      1. Scope of Quotations & Technical Feasibility
                    </Heading>
                  </div>
                  <Text variant="body" color="body" className="leading-relaxed text-xs sm:text-sm">
                    All preliminary quotations, capacity allocations, and lead time estimates generated through this website represent commercial indications subject to formal technical review, raw material mill cert availability, and executed contract bilaterally signed by Asterra Group authorized officers.
                  </Text>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-mineral-teal" />
                    <Heading as="h2" font="serif" size="heading-lg" color="evergreen" className="text-lg sm:text-xl">
                      2. Quality Benchmarks & Warranty Terms
                    </Heading>
                  </div>
                  <Text variant="body" color="body" className="leading-relaxed text-xs sm:text-sm">
                    Every fabricated structural member, precast concrete panel, and polymer piping system is manufactured strictly in conformance with ISO 9001:2015, EN 1090-2 (EXC3), AWS D1.1, and EN 12201 standards. Material Test Certificates (EN 10204 3.1) are issued with all delivered lots.
                  </Text>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-mineral-teal" />
                    <Heading as="h2" font="serif" size="heading-lg" color="evergreen" className="text-lg sm:text-xl">
                      3. Intellectual Property
                    </Heading>
                  </div>
                  <Text variant="body" color="body" className="leading-relaxed text-xs sm:text-sm">
                    All technical whitepapers, architectural case study photographs, brand trademarks, and proprietary mix designs displayed on this website remain the sole intellectual property of Asterra Manufacturing Group S.C.
                  </Text>
                </div>
              </>
            )}

            <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 text-xs font-mono text-charcoal-muted">
              <div>
                <span>Last Updated: Fiscal Year 2026 // Secretariat Desk</span>
              </div>
              <a
                href="mailto:legal@asterragroup.com"
                className="text-evergreen font-bold hover:underline"
              >
                Inquiries: legal@asterragroup.com &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
