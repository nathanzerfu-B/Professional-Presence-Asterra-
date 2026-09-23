import React, { useState } from 'react';
import { getBusinessUnits } from '../data';
import {
  PageHeader,
  Button,
  PageSeo,
} from '../components';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const BusinessListingPage: React.FC = () => {
  const businessUnits = getBusinessUnits();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filterCategories = [
    { label: 'All 4 Divisions', value: 'All' },
    { label: 'Structural Steel (DIV-01)', value: 'DIV-01' },
    { label: 'Precast Infrastructure (DIV-02)', value: 'DIV-02' },
    { label: 'Pressure Polymers (DIV-03)', value: 'DIV-03' },
    { label: 'Contract Assemblies (DIV-04)', value: 'DIV-04' },
  ];

  const filteredUnits =
    selectedFilter === 'All'
      ? businessUnits
      : businessUnits.filter((u) => u.divisionCode === selectedFilter);

  return (
    <div className="w-full">
      <PageSeo
        title="Operating Divisions & Industrial Ecosystem"
        description="Four specialized manufacturing divisions covering heavy structural steel, UHPC precast materials, HDPE pressure pipes, and automated contract assemblies."
        ogType="website"
      />

      {/* 1. ARCHITECTURAL PAGE HEADER */}
      <PageHeader
        eyebrow="Operating Divisions & Ecosystem"
        title="Four Specialized Industrial Divisions."
        description="From high-yield CNC metal profiling to automated cementitious batching, polymer piping, and contract assemblies, Asterra Group operates integrated production lines designed for scale."
        breadcrumbs={[{ label: 'Business Units', href: '/business' }]}
        theme="evergreen"
      />

      {/* 2. OPERATIONAL TELEMETRY & FILTER BAR */}
      <section className="bg-white border-b border-border py-6 sm:py-8">
        <div className="container-corporate space-y-6">
          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-border">
            <div className="space-y-1">
              <span className="font-mono text-[9px] sm:text-[10px] text-charcoal-muted uppercase font-bold">Covered Footprint</span>
              <div className="font-serif text-xl sm:text-2xl font-bold text-evergreen">68,000 m²</div>
              <p className="text-[10px] sm:text-[11px] text-charcoal-body">Four plant facilities</p>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-[9px] sm:text-[10px] text-charcoal-muted uppercase font-bold">Annual Volume</span>
              <div className="font-serif text-xl sm:text-2xl font-bold text-evergreen">120,000 MT</div>
              <p className="text-[10px] sm:text-[11px] text-charcoal-body">Certified output</p>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-[9px] sm:text-[10px] text-charcoal-muted uppercase font-bold">Quality Standard</span>
              <div className="font-serif text-xl sm:text-2xl font-bold text-evergreen">EN 1090-2</div>
              <p className="text-[10px] sm:text-[11px] text-charcoal-body">EXC3 certified</p>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-[9px] sm:text-[10px] text-charcoal-muted uppercase font-bold">Traceability</span>
              <div className="font-serif text-xl sm:text-2xl font-bold text-evergreen">100% Heat Lot</div>
              <p className="text-[10px] sm:text-[11px] text-charcoal-body">Lab tested</p>
            </div>
          </div>

          {/* Touch-Friendly Horizontally Scrollable Division Filter Tabs */}
          <div className="space-y-2">
            <div className="flex overflow-x-auto no-scrollbar gap-1.5 pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
              {filterCategories.map((cat) => {
                const isActive = selectedFilter === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedFilter(cat.value)}
                    className={`px-3.5 py-2.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border shrink-0 min-h-[44px] flex items-center justify-center ${
                      isActive
                        ? 'bg-evergreen text-white border-evergreen font-bold shadow-xs ring-2 ring-mineral-teal/30 scale-[1.02]'
                        : 'bg-ivory-canvas/70 text-charcoal-body border-border hover:border-evergreen active:scale-95'
                    }`}
                    aria-pressed={isActive}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-charcoal-muted px-1">
              <span>Showing {filteredUnits.length} of {businessUnits.length} Divisions</span>
              <span className="text-mineral-teal font-bold hidden sm:inline">Tap any card for plant blueprint</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BESPOKE INDUSTRIAL DIVISION BLUEPRINT CARDS */}
      <section className="py-12 sm:py-16 lg:py-24 bg-ivory-canvas border-b border-border">
        <div className="container-corporate space-y-8 sm:space-y-10">
          <div className="space-y-6 sm:space-y-8">
            {filteredUnits.map((unit) => (
              <div
                key={unit.slug}
                className="bg-white border border-border overflow-hidden hover:border-evergreen transition-all shadow-xs"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* Left Media Plane */}
                  <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-ivory-canvas">
                    <img
                      src={unit.heroImage}
                      alt={unit.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                      <span className="badge-mono bg-evergreen text-white border-mineral-teal">
                        {unit.divisionCode}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-evergreen/90 text-white p-2.5 sm:p-3 text-xs font-mono flex items-center justify-between">
                      <span className="truncate mr-2">{unit.facilityLocation}</span>
                      <span className="text-mineral-teal font-bold shrink-0">{unit.facilitySizeSqM}</span>
                    </div>
                  </div>

                  {/* Right Specification Profile */}
                  <div className="lg:col-span-7 p-5 sm:p-8 lg:p-10 flex flex-col justify-between space-y-5 sm:space-y-6">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                        <span className="font-mono text-xs font-bold text-mineral-teal uppercase">
                          Annual Output: {unit.annualCapacity}
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {unit.certifications.map((c) => (
                            <span key={c} className="text-[10px] font-mono px-2 py-0.5 bg-ivory-canvas border border-border text-evergreen">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-evergreen">
                        {unit.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-charcoal-body leading-relaxed">
                        {unit.overview}
                      </p>

                      {/* Equipment Capabilities Matrix */}
                      <div className="pt-1">
                        <h4 className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-charcoal-muted font-bold mb-2">
                          Key Production Capabilities & Tolerances:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-charcoal-body">
                          {unit.capabilities.map((cap) => (
                            <div key={cap.id} className="flex items-start gap-2 bg-ivory-canvas/60 p-2 sm:p-2.5 border border-border">
                              <CheckCircle2 className="w-3.5 h-3.5 text-mineral-teal shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold text-evergreen block">{cap.title}</span>
                                <span className="text-[11px] text-charcoal-muted">{cap.description}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 sm:pt-6 border-t border-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      <span className="font-mono text-xs text-charcoal-muted">
                        Personnel: {unit.workforceCount}
                      </span>
                      <Button
                        to={`/business/${unit.slug}`}
                        variant="primary"
                        size="sm"
                        className="w-full sm:w-auto justify-center"
                        rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
                      >
                        Detailed Plant Specs & Machinery &rarr;
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DIRECT RFQ ROUTING ACTION */}
      <section className="py-12 sm:py-16 bg-white border-b border-border">
        <div className="container-corporate flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-mineral-teal uppercase block">
              Direct Technical Inquiries
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-evergreen">
              Require engineering proposals or plant capacity reservations?
            </h3>
          </div>
          <Button
            to="/contact"
            variant="primary"
            size="md"
            className="w-full md:w-auto justify-center"
            rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
          >
            Submit Corporate RFQ
          </Button>
        </div>
      </section>
    </div>
  );
};
