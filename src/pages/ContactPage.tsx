import React from 'react';
import { getCompanyInfo } from '../data';
import {
  PageHeader,
  CorporateInquiryForm,
  Heading,
  Text,
  PageSeo,
} from '../components';
import {
  Building2,
  Factory,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const company = getCompanyInfo();

  return (
    <div className="w-full">
      <PageSeo
        title="Corporate & Commercial Inquiries Desk"
        description="Submit heavy manufacturing RFQ documents, schedule plant inspections, or contact Asterra Group executive directorates."
        ogType="website"
      />

      {/* 1. ARCHITECTURAL PAGE HEADER */}
      <PageHeader
        eyebrow="Corporate & Commercial Channels"
        title="Direct Contact & Commercial Inquiries Desk."
        description="Connect directly with our engineering estimation teams, procurement directorship, and executive secretariat across Addis Ababa facilities."
        breadcrumbs={[{ label: 'Contact', href: '/contact' }]}
        theme="evergreen"
      />

      {/* 2. CHANNELS SELECTOR & INQUIRY FORM */}
      <section className="py-12 sm:py-16 lg:py-24 bg-ivory-canvas border-b border-border">
        <div className="container-corporate">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Location & Contact Directory */}
            <div className="lg:col-span-5 space-y-6 sm:space-y-8">
              <div className="space-y-2.5">
                <span className="badge-mono">Direct Communication</span>
                <Heading as="h2" font="serif" size="display-md" color="evergreen" className="text-xl sm:text-3xl">
                  Headquarters & Production Complexes
                </Heading>
                <Text variant="body" color="body" className="text-xs sm:text-base">
                  Our corporate headquarters coordinates group contracts, while engineering estimation teams are stationed on-site at our 4 manufacturing facilities in Industrial Zone 4.
                </Text>
              </div>

              {/* Physical Facilities */}
              <div className="space-y-4">
                <div className="p-5 sm:p-6 bg-white border border-border space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-evergreen font-serif font-bold text-base">
                    <Building2 className="w-5 h-5 text-mineral-teal shrink-0" />
                    <h4>Corporate Executive Headquarters</h4>
                  </div>
                  <p className="text-xs text-charcoal-body font-mono">
                    {company.headquarters.address}, {company.headquarters.city}, {company.headquarters.country}
                  </p>
                  <div className="text-xs font-mono text-charcoal-muted pt-2 border-t border-border flex items-center justify-between">
                    <span>Executive Secretariat</span>
                    <a href={`tel:${company.contact.phonePrimary.replace(/\s+/g, '')}`} className="text-evergreen font-bold hover:underline py-1">
                      {company.contact.phonePrimary}
                    </a>
                  </div>
                </div>

                <div className="p-5 sm:p-6 bg-white border border-border space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-evergreen font-serif font-bold text-base">
                    <Factory className="w-5 h-5 text-mineral-teal shrink-0" />
                    <h4>Zone 4 Industrial Complexes (Plants 1–4)</h4>
                  </div>
                  <p className="text-xs text-charcoal-body font-mono">
                    Plot 12–18, Heavy Industrial Sector, Industrial Zone 4, Addis Ababa
                  </p>
                  <div className="text-xs font-mono text-charcoal-muted pt-2 border-t border-border flex items-center justify-between">
                    <span>Plant Dispatch Desk</span>
                    <a href="tel:+251116543211" className="text-evergreen font-bold hover:underline py-1">
                      +251 11 654 3211
                    </a>
                  </div>
                </div>
              </div>

              {/* Verified Direct Desks */}
              <div className="p-5 sm:p-6 bg-evergreen text-white border border-evergreen-hover space-y-4">
                <span className="font-mono text-xs uppercase text-mineral-teal font-bold tracking-wider block">
                  Directorate Direct Email Desks
                </span>
                <div className="space-y-2.5 text-xs font-mono">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-2 gap-1">
                    <span className="text-border">Structural Steel RFQs:</span>
                    <a href={`mailto:${company.contact.procurementEmail}`} className="text-white font-bold hover:text-mineral-teal transition-colors">
                      {company.contact.procurementEmail}
                    </a>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-2 gap-1">
                    <span className="text-border">General Corporate Desk:</span>
                    <a href={`mailto:${company.contact.generalEmail}`} className="text-white font-bold hover:text-mineral-teal transition-colors">
                      {company.contact.generalEmail}
                    </a>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-2 gap-1">
                    <span className="text-border">Talent & Careers:</span>
                    <a href={`mailto:${company.contact.careersEmail}`} className="text-white font-bold hover:text-mineral-teal transition-colors">
                      {company.contact.careersEmail}
                    </a>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-border">Media & Institutional:</span>
                    <a href={`mailto:${company.contact.mediaEmail}`} className="text-white font-bold hover:text-mineral-teal transition-colors">
                      {company.contact.mediaEmail}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Multi-Department RFQ Form */}
            <div className="lg:col-span-7 bg-white border border-border p-5 sm:p-8 lg:p-10 space-y-5 sm:space-y-6 shadow-xs">
              <div className="border-b border-border pb-4">
                <span className="font-mono text-xs text-mineral-teal uppercase font-bold tracking-wider block">
                  Interactive Submission Portal
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-evergreen mt-1">
                  Submit Technical Inquiries & Tender Documents
                </h3>
                <p className="text-xs text-charcoal-muted mt-1">
                  Requests are automatically routed to the corresponding engineering directorship with a guaranteed 48-hour response SLA.
                </p>
              </div>

              <CorporateInquiryForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
