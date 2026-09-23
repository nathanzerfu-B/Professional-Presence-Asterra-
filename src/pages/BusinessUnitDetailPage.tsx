import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBusinessUnitBySlug, getProjects } from '../data';
import {
  PageHeader,
  Heading,
  Text,
  Badge,
  Button,
  ProjectCard,
  CorporateInquiryForm,
  PageSeo,
} from '../components';
import {
  CheckCircle2,
  ArrowLeft,
  Cog,
  ShieldCheck,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const BusinessUnitDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const unit = getBusinessUnitBySlug(slug || '');
  const allProjects = getProjects();
  const relatedProjects = allProjects.filter((p) =>
    unit?.featuredProjectSlugs.includes(p.slug)
  );

  const [activeTab, setActiveTab] = useState<'capabilities' | 'products' | 'qa'>('capabilities');

  if (!unit) {
    return (
      <div className="w-full py-24 container-corporate text-center space-y-6">
        <Badge variant="status" statusType="error">Division Not Located</Badge>
        <Heading as="h1" font="serif" size="display-md" color="evergreen">
          Operating Division Not Found
        </Heading>
        <Text variant="body" color="muted">
          The requested manufacturing unit does not exist in our corporate directory.
        </Text>
        <Button to="/business" variant="primary" leftIcon={<ArrowLeft className="w-4 h-4 mr-1" />}>
          Return to All Business Units
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <PageSeo
        title={`${unit.name} (${unit.divisionCode})`}
        description={unit.tagline}
        ogType="website"
      />

      {/* 1. ARCHITECTURAL PAGE HEADER */}
      <PageHeader
        eyebrow={`${unit.divisionCode} // OPERATING DIVISION`}
        title={unit.name}
        description={unit.tagline}
        breadcrumbs={[
          { label: 'Business Units', href: '/business' },
          { label: unit.name, href: `/business/${unit.slug}` },
        ]}
        theme="evergreen"
      />

      {/* 2. DIVISION TELEMETRY STRIP */}
      <section className="bg-white border-b border-border py-6 sm:py-8">
        <div className="container-corporate">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-border">
            <div className="p-2 sm:px-4 first:pl-0">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase text-charcoal-muted font-bold block">Annual Capacity</span>
              <span className="font-serif text-xl sm:text-2xl font-bold text-evergreen">{unit.annualCapacity}</span>
            </div>
            <div className="p-2 sm:px-4">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase text-charcoal-muted font-bold block">Covered Area</span>
              <span className="font-serif text-xl sm:text-2xl font-bold text-evergreen">{unit.facilitySizeSqM}</span>
            </div>
            <div className="p-2 sm:px-4">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase text-charcoal-muted font-bold block">Workforce</span>
              <span className="font-serif text-xl sm:text-2xl font-bold text-evergreen">{unit.workforceCount}</span>
            </div>
            <div className="p-2 sm:px-4 last:pr-0">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase text-charcoal-muted font-bold block">Plant Location</span>
              <span className="font-serif text-xs sm:text-base font-bold text-evergreen truncate block">{unit.facilityLocation}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DIVISION BLUEPRINT: OVERVIEW & SPECIFICATION TABS */}
      <section className="py-12 sm:py-16 lg:py-24 bg-ivory-canvas border-b border-border">
        <div className="container-corporate space-y-8 sm:space-y-12">
          {/* Overview & Facility Photo */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-2">
                <span className="badge-mono">{unit.divisionCode} Infrastructure</span>
                <Heading as="h2" font="serif" size="display-md" color="evergreen" className="text-xl sm:text-3xl">
                  Production Capabilities & Machine Infrastructure.
                </Heading>
                <Text variant="lead" color="body" className="text-xs sm:text-base">
                  {unit.overview}
                </Text>
              </div>

              {/* Accreditations list */}
              <div className="pt-1">
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-charcoal-muted font-bold block mb-2">
                  Division Standards & Certified Execution Classes:
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {unit.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="px-2.5 py-1 bg-white border border-border-strong text-[11px] font-mono font-bold text-evergreen shadow-2xs"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[4/3] bg-white skeleton-shimmer border border-border p-2 shadow-xs overflow-hidden">
                <img
                  src={unit.facilityImage}
                  alt={`${unit.name} Production Floor`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Interactive Specification Tabs (Mobile & Touch Optimized) */}
          <div className="bg-white border border-border p-4 sm:p-8 lg:p-10 space-y-6 sm:space-y-8 shadow-xs">
            {/* Tab Selector Buttons */}
            <div className="grid grid-cols-3 gap-1 bg-ivory-canvas p-1 border border-border">
              <button
                onClick={() => setActiveTab('capabilities')}
                className={`py-3 px-2 text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all font-bold cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1.5 min-h-[48px] text-center ${
                  activeTab === 'capabilities'
                    ? 'bg-evergreen text-white shadow-xs'
                    : 'text-charcoal-muted hover:text-evergreen'
                }`}
                aria-pressed={activeTab === 'capabilities'}
              >
                <Cog className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>Capabilities ({unit.capabilities.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`py-3 px-2 text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all font-bold cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1.5 min-h-[48px] text-center ${
                  activeTab === 'products'
                    ? 'bg-evergreen text-white shadow-xs'
                    : 'text-charcoal-muted hover:text-evergreen'
                }`}
                aria-pressed={activeTab === 'products'}
              >
                <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>Products ({unit.keyProducts.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('qa')}
                className={`py-3 px-2 text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all font-bold cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1.5 min-h-[48px] text-center ${
                  activeTab === 'qa'
                    ? 'bg-evergreen text-white shadow-xs'
                    : 'text-charcoal-muted hover:text-evergreen'
                }`}
                aria-pressed={activeTab === 'qa'}
              >
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>Quality & QA</span>
              </button>
            </div>

            {/* Tab 1: Capabilities */}
            {activeTab === 'capabilities' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 animate-fadeIn">
                {unit.capabilities.map((cap, idx) => (
                  <div key={cap.id} className="p-4 bg-ivory-canvas/60 border border-border space-y-2">
                    <span className="font-mono text-[10px] text-mineral-teal font-bold block">
                      CAPABILITY 0{idx + 1}
                    </span>
                    <h4 className="font-serif text-base font-bold text-evergreen">{cap.title}</h4>
                    <p className="text-xs text-charcoal-body leading-relaxed">{cap.description}</p>
                    {cap.technicalSpecs && (
                      <div className="pt-2 border-t border-border flex flex-wrap gap-1.5">
                        {cap.technicalSpecs.map((spec) => (
                          <span key={spec} className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-white border border-border-strong text-charcoal-body shadow-2xs">
                            {spec}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Key Products */}
            {activeTab === 'products' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 animate-fadeIn">
                {unit.keyProducts.map((prod) => (
                  <div key={prod.name} className="p-4 bg-ivory-canvas/60 border border-border space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-mineral-teal uppercase font-bold">{prod.category}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-mineral-teal shrink-0" />
                    </div>
                    <h4 className="font-serif text-sm sm:text-base font-bold text-evergreen">{prod.name}</h4>
                    <p className="text-xs text-charcoal-body font-mono font-medium bg-white p-2.5 border border-border-strong">{prod.specification}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: QA & Compliance */}
            {activeTab === 'qa' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                  <div className="p-4 bg-ivory-canvas/60 border border-border space-y-1">
                    <span className="font-mono text-[10px] text-mineral-teal font-bold">WELDING & MIX INSPECTION</span>
                    <div className="font-serif text-base font-bold text-evergreen">100% NDT & Batch Lab</div>
                    <p className="text-xs text-charcoal-body">Ultrasonic, radiographic, and compressive strength testing before corridor dispatch.</p>
                  </div>
                  <div className="p-4 bg-ivory-canvas/60 border border-border space-y-1">
                    <span className="font-mono text-[10px] text-mineral-teal font-bold">MATERIAL TRACEABILITY</span>
                    <div className="font-serif text-base font-bold text-evergreen">Heat Number Tracking</div>
                    <p className="text-xs text-charcoal-body">Full chemical & tensile mill test certs provided with every delivery.</p>
                  </div>
                  <div className="p-4 bg-ivory-canvas/60 border border-border space-y-1">
                    <span className="font-mono text-[10px] text-mineral-teal font-bold">DEFLECTION TOLERANCES</span>
                    <div className="font-serif text-base font-bold text-evergreen">Sub-Millimeter CNC</div>
                    <p className="text-xs text-charcoal-body">Continuous calibration on all high-torque plasma, fiber laser, and extrusion tooling.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. DELIVERED INFRASTRUCTURE CASE STUDIES */}
      {relatedProjects.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-24 bg-white border-b border-border">
          <div className="container-corporate space-y-8 sm:space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-4 sm:pb-6">
              <div className="space-y-1">
                <span className="badge-mono">Delivered Projects</span>
                <Heading as="h2" font="serif" size="display-md" color="evergreen" className="text-xl sm:text-3xl">
                  Representative Deliveries by {unit.name}.
                </Heading>
              </div>
              <Link
                to="/projects"
                className="text-xs font-mono uppercase tracking-wider text-evergreen hover:text-mineral-teal font-bold py-2 min-h-[44px] flex items-center"
              >
                <span>View Full Project Archive</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {relatedProjects.map((proj) => (
                <ProjectCard key={proj.slug} project={proj} layout="grid" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. DIRECT DIVISION RFQ FORM */}
      <section className="py-12 sm:py-16 lg:py-24 bg-ivory-canvas border-b border-border">
        <div className="container-corporate max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <div className="text-center space-y-2">
            <span className="badge-mono">Tender & Procurement Channel</span>
            <Heading as="h2" font="serif" size="display-md" color="evergreen" className="text-xl sm:text-3xl">
              Request Technical Allocation for {unit.name}
            </Heading>
            <Text variant="body" color="body" className="text-xs sm:text-sm">
              Submit your engineering drawings, bill of quantities (BOQ), or annual supply volume requirements directly to this division.
            </Text>
          </div>

          <CorporateInquiryForm
            initialDepartment="Procurement & Sales"
            initialDivision={unit.name}
          />
        </div>
      </section>
    </div>
  );
};
