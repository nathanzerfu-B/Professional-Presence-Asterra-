import React, { useState } from 'react';
import { getProjects } from '../data';
import {
  PageHeader,
  Button,
  PageSeo,
} from '../components';
import { Award, Search, ArrowRight, MapPin, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProjectsListingPage: React.FC = () => {
  const allProjects = getProjects();
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const sectors = ['All', 'Transport & Rail', 'Industrial Logistics', 'Maritime & Dry Ports', 'Water Infrastructure'];

  const filteredProjects = allProjects.filter((p) => {
    const matchesSector = selectedSector === 'All' || p.sector === selectedSector;
    const matchesSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSector && matchesSearch;
  });

  const flagship = allProjects.find((p) => p.isFlagship) || allProjects[0];

  return (
    <div className="w-full">
      <PageSeo
        title="Industrial Projects & Case Studies Portfolio"
        description="Verified case studies of major rail bridges, dry port precast slabs, and industrial terminals fabricated and erected across regional export corridors."
        ogType="website"
      />

      {/* 1. ARCHITECTURAL PAGE HEADER */}
      <PageHeader
        eyebrow="Industrial Portfolio & Case Studies"
        title="Verified Infrastructure & Engineering Deliveries."
        description="A track record of high-yield structural steel, heavy precast elements, and municipal pipeline systems delivered on time and within strict dimensional tolerances."
        breadcrumbs={[{ label: 'Projects', href: '/projects' }]}
        theme="evergreen"
      />

      {/* 2. SEARCH & SECTOR FILTER BAR */}
      <section className="bg-white border-b border-border py-4 sm:py-6">
        <div className="container-corporate space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by project, client, or corridor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-ivory-canvas/60 border border-border text-xs text-charcoal-body placeholder-charcoal-muted/70 focus:outline-hidden focus:border-evergreen focus:bg-white transition-all font-mono min-h-[44px]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-muted hover:text-charcoal-body p-1"
                  aria-label="Clear Search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sector Filters (Horizontally scrollable on mobile/tablet) */}
            <div className="flex overflow-x-auto no-scrollbar gap-1.5 pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
              {sectors.map((sec) => {
                const isActive = selectedSector === sec;
                return (
                  <button
                    key={sec}
                    onClick={() => setSelectedSector(sec)}
                    className={`px-3.5 py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border shrink-0 min-h-[44px] flex items-center justify-center ${
                      isActive
                        ? 'bg-evergreen text-white border-evergreen font-bold shadow-xs ring-2 ring-mineral-teal/30 scale-[1.02]'
                        : 'bg-ivory-canvas/70 text-charcoal-body border-border hover:border-evergreen active:scale-95'
                    }`}
                    aria-pressed={isActive}
                  >
                    {sec}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-charcoal-muted pt-2 border-t border-border px-1">
            <span>● Showing {filteredProjects.length} Verified Case Studies</span>
            <span className="hidden sm:inline">All contracts verified to ISO & EN execution classes</span>
          </div>
        </div>
      </section>

      {/* 3. FLAGSHIP SHOWCASE (When Viewing All and no search) */}
      {selectedSector === 'All' && searchQuery === '' && flagship && (
        <section className="py-8 sm:py-12 bg-ivory-canvas border-b border-border">
          <div className="container-corporate space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-mineral-teal" />
              <span className="font-mono text-xs text-mineral-teal uppercase font-bold tracking-wider">
                Featured Flagship Delivery
              </span>
            </div>

            <div className="bg-white border border-border p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center shadow-xs">
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="badge-mono text-[10px] bg-ivory-canvas text-evergreen border-border">
                    {flagship.sector}
                  </span>
                  <span className="font-mono text-xs text-charcoal-muted">Delivered {flagship.year}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-evergreen">
                  {flagship.title}
                </h3>

                <p className="text-xs sm:text-sm text-charcoal-body leading-relaxed">
                  {flagship.subtitle}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  {flagship.results.map((r) => (
                    <div key={r.label} className="p-2.5 bg-ivory-canvas border border-border">
                      <div className="font-serif text-base font-bold text-evergreen">{r.metric}</div>
                      <span className="font-mono text-[9px] text-charcoal-muted uppercase">{r.label}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Button
                    to={`/projects/${flagship.slug}`}
                    variant="primary"
                    size="sm"
                    className="w-full sm:w-auto justify-center"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5 ml-1" />}
                  >
                    Explore Case Study & Execution Details
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="aspect-[16/10] overflow-hidden border border-border bg-ivory-canvas">
                  <img
                    src={flagship.heroImage}
                    alt={flagship.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. CASE STUDY PORTFOLIO GRID */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white border-b border-border">
        <div className="container-corporate space-y-8 sm:space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <Link
                key={project.slug}
                to={`/projects/${project.slug}`}
                className="bg-ivory-canvas/40 border border-border flex flex-col justify-between group hover:border-evergreen hover:bg-white transition-all duration-300 shadow-xs overflow-hidden"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-ivory-canvas border-b border-border">
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="badge-mono text-[9px] bg-evergreen text-white border-mineral-teal">
                        {project.sector}
                      </span>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-xs text-white px-2 py-0.5 text-[10px] font-mono">
                      {project.year}
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 space-y-2.5">
                    <div className="text-[11px] font-mono text-charcoal-muted flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-mineral-teal shrink-0" />
                      <span className="truncate">{project.location} • Client: {project.client}</span>
                    </div>

                    <h3 className="font-serif text-base sm:text-lg font-bold text-evergreen group-hover:text-mineral-teal transition-colors leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-xs text-charcoal-body line-clamp-2 leading-relaxed">
                      {project.subtitle}
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pt-0">
                  <div className="grid grid-cols-2 gap-2 p-2.5 bg-white border border-border mb-3">
                    {project.results.slice(0, 2).map((res) => (
                      <div key={res.label}>
                        <span className="font-serif text-sm font-bold text-evergreen block">{res.metric}</span>
                        <span className="font-mono text-[9px] text-charcoal-muted uppercase">{res.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-3 flex items-center justify-between text-xs font-mono text-evergreen font-bold group-hover:text-mineral-teal min-h-[32px]">
                    <span>Read Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-12 sm:py-16 text-center space-y-3 bg-ivory-canvas border border-border">
              <p className="font-serif text-base sm:text-lg text-evergreen font-bold">No case studies match your search criteria.</p>
              <button
                onClick={() => { setSelectedSector('All'); setSearchQuery(''); }}
                className="text-xs font-mono text-mineral-teal underline uppercase font-bold cursor-pointer py-2 min-h-[44px]"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 5. DIRECT TENDER INQUIRY CTA */}
      <section className="py-12 sm:py-16 bg-evergreen text-white border-b border-evergreen-hover">
        <div className="container-corporate flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-1 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-mineral-teal font-bold block">
              Contract Tenders & Feasibility
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Have an upcoming infrastructure or industrial facility project?
            </h3>
            <p className="text-xs text-border/80">Our directorship provides feasibility and structural steel shop drawing estimation.</p>
          </div>
          <Button
            to="/contact"
            variant="white"
            size="md"
            className="w-full md:w-auto justify-center"
            rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
          >
            Submit Project RFQ
          </Button>
        </div>
      </section>
    </div>
  );
};
