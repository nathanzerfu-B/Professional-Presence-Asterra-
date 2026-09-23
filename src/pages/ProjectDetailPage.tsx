import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectBySlug, getBusinessUnitBySlug } from '../data';
import {
  PageHeader,
  Heading,
  Badge,
  Button,
  PageSeo,
} from '../components';
import {
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug || '');
  const relatedBusinessUnit = project ? getBusinessUnitBySlug(project.businessUnitSlug) : undefined;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'solution' | 'challenge' | 'execution'>('solution');

  if (!project) {
    return (
      <div className="w-full py-24 container-corporate text-center space-y-6">
        <Badge variant="status" statusType="error">Case Study Not Located</Badge>
        <Heading as="h1" font="serif" size="display-md" color="evergreen">
          Project Case Study Not Found
        </Heading>
        <p className="text-xs text-charcoal-muted">
          The requested project record is unavailable or has been archived.
        </p>
        <Button to="/projects" variant="primary" leftIcon={<ArrowLeft className="w-4 h-4 mr-1" />}>
          Return to All Projects
        </Button>
      </div>
    );
  }

  const allMedia = [project.heroImage, ...project.galleryImages];

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : allMedia.length - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev < allMedia.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="w-full">
      <PageSeo
        title={`${project.title} — Case Study`}
        description={project.subtitle}
        ogType="article"
      />

      {/* 1. ARCHITECTURAL PAGE HEADER */}
      <PageHeader
        eyebrow={`${project.sector} // CASE STUDY`}
        title={project.title}
        description={project.subtitle}
        breadcrumbs={[
          { label: 'Projects', href: '/projects' },
          { label: project.title, href: `/projects/${project.slug}` },
        ]}
        theme="evergreen"
      />

      {/* 2. PROJECT METRICS TELEMETRY STRIP */}
      <section className="bg-white border-b border-border py-6 sm:py-8">
        <div className="container-corporate">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-border">
            <div className="p-2 sm:px-4 first:pl-0">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase text-charcoal-muted font-bold block">Client Entity</span>
              <span className="font-serif text-xs sm:text-sm font-bold text-evergreen truncate block">{project.client}</span>
              <span className="text-[9px] sm:text-[10px] font-mono text-mineral-teal">{project.clientCategory}</span>
            </div>
            <div className="p-2 sm:px-4">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase text-charcoal-muted font-bold block">Project Location</span>
              <span className="font-serif text-xs sm:text-sm font-bold text-evergreen truncate block">{project.location}</span>
              <span className="text-[9px] sm:text-[10px] font-mono text-charcoal-muted">Corridor Route</span>
            </div>
            <div className="p-2 sm:px-4">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase text-charcoal-muted font-bold block">Delivery Year</span>
              <span className="font-serif text-xl sm:text-2xl font-bold text-evergreen">{project.year}</span>
              <span className="text-[9px] sm:text-[10px] font-mono text-charcoal-muted">Commissioned</span>
            </div>
            <div className="p-2 sm:px-4 last:pr-0">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase text-charcoal-muted font-bold block">Delivering Division</span>
              <span className="font-serif text-xs sm:text-sm font-bold text-evergreen truncate block">
                {relatedBusinessUnit?.name || 'Asterra Industrial'}
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono text-mineral-teal">{relatedBusinessUnit?.divisionCode}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HERO MEDIA & MULTI-ANGLE VIEWER (TOUCH & ARROW CONTROLS) */}
      <section className="py-8 sm:py-12 bg-ivory-canvas border-b border-border">
        <div className="container-corporate space-y-3 sm:space-y-4">
          <div className="aspect-[16/10] sm:aspect-[21/9] bg-white skeleton-shimmer border border-border overflow-hidden shadow-xs relative group">
            <img
              src={allMedia[activeImageIndex] || project.heroImage}
              alt={project.title}
              className="w-full h-full object-cover transition-all duration-300"
              loading="lazy"
            />
            
            {/* View Indicator Badge */}
            <div className="absolute bottom-3 left-3 bg-evergreen/90 text-white text-[10px] sm:text-xs font-mono px-3 py-1">
              Photograph {activeImageIndex + 1} of {allMedia.length}
            </div>

            {/* Navigation Arrows for Mobile & Tablet */}
            {allMedia.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-evergreen/80 hover:bg-evergreen text-white flex items-center justify-center border border-white/20 shadow-md cursor-pointer transition-colors"
                  aria-label="Previous Photograph"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-evergreen/80 hover:bg-evergreen text-white flex items-center justify-center border border-white/20 shadow-md cursor-pointer transition-colors"
                  aria-label="Next Photograph"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Strip (Touch Scrollable) */}
          {allMedia.length > 1 && (
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {allMedia.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-14 sm:w-24 sm:h-16 shrink-0 border-2 overflow-hidden transition-all cursor-pointer min-h-[44px] ${
                    activeImageIndex === idx ? 'border-evergreen ring-2 ring-evergreen/30 opacity-100' : 'border-border opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`Switch to Photo ${idx + 1}`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. TECHNICAL CASE STUDY BLUEPRINT */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white border-b border-border">
        <div className="container-corporate">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: Interactive Challenge / Solution Tabs */}
            <div className="lg:col-span-8 space-y-6 sm:space-y-8">
              {/* Touch Segmented Tab Selector */}
              <div className="grid grid-cols-3 gap-1 bg-ivory-canvas p-1 border border-border">
                <button
                  onClick={() => setActiveTab('solution')}
                  className={`py-3 px-2 text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all font-bold cursor-pointer text-center min-h-[48px] flex items-center justify-center ${
                    activeTab === 'solution'
                      ? 'bg-evergreen text-white shadow-xs'
                      : 'text-charcoal-muted hover:text-evergreen'
                  }`}
                  aria-pressed={activeTab === 'solution'}
                >
                  01 // Solution
                </button>
                <button
                  onClick={() => setActiveTab('challenge')}
                  className={`py-3 px-2 text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all font-bold cursor-pointer text-center min-h-[48px] flex items-center justify-center ${
                    activeTab === 'challenge'
                      ? 'bg-evergreen text-white shadow-xs'
                      : 'text-charcoal-muted hover:text-evergreen'
                  }`}
                  aria-pressed={activeTab === 'challenge'}
                >
                  02 // Challenge
                </button>
                <button
                  onClick={() => setActiveTab('execution')}
                  className={`py-3 px-2 text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all font-bold cursor-pointer text-center min-h-[48px] flex items-center justify-center ${
                    activeTab === 'execution'
                      ? 'bg-evergreen text-white shadow-xs'
                      : 'text-charcoal-muted hover:text-evergreen'
                  }`}
                  aria-pressed={activeTab === 'execution'}
                >
                  03 // Execution
                </button>
              </div>

              {/* Tab Content with Instant State Header */}
              <div className="space-y-4 min-h-[140px] bg-ivory-canvas/40 p-4 sm:p-6 border border-border">
                {activeTab === 'solution' && (
                  <div className="space-y-3 animate-fadeIn">
                    <span className="font-mono text-[10px] text-mineral-teal uppercase font-bold block">
                      ● Active Dimension: Engineering Methodology
                    </span>
                    <h3 className="font-serif text-lg sm:text-2xl font-bold text-evergreen">
                      Methodology & Pre-Assembly Laser Modeling
                    </h3>
                    <p className="text-xs sm:text-base text-charcoal-body leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                )}
                {activeTab === 'challenge' && (
                  <div className="space-y-3 animate-fadeIn">
                    <span className="font-mono text-[10px] text-mineral-teal uppercase font-bold block">
                      ● Active Dimension: Project Constraints
                    </span>
                    <h3 className="font-serif text-lg sm:text-2xl font-bold text-evergreen">
                      Site Constraints & Engineering Demands
                    </h3>
                    <p className="text-xs sm:text-base text-charcoal-body leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>
                )}
                {activeTab === 'execution' && (
                  <div className="space-y-3 animate-fadeIn">
                    <span className="font-mono text-[10px] text-mineral-teal uppercase font-bold block">
                      ● Active Dimension: Non-Destructive Testing
                    </span>
                    <h3 className="font-serif text-lg sm:text-2xl font-bold text-evergreen">
                      Tolerances & Non-Destructive Examination (NDE)
                    </h3>
                    <p className="text-xs sm:text-base text-charcoal-body leading-relaxed">
                      {project.engineeringExecution}
                    </p>
                  </div>
                )}
              </div>

              {/* Applied Quality Standards Badges */}
              <div className="p-4 sm:p-6 bg-ivory-canvas border border-border space-y-3">
                <span className="font-mono text-[10px] sm:text-xs uppercase font-bold text-evergreen tracking-wider block">
                  Applied Quality Standards on this Delivery:
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.certificationsApplied.map((cert) => (
                    <span
                      key={cert}
                      className="px-2.5 py-1 bg-white border border-border-strong text-[11px] font-mono font-bold text-evergreen flex items-center gap-1.5 shadow-2xs"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-mineral-teal" />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Quantitative Outcome Metrics Dashboard */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-ivory-canvas border border-border p-5 sm:p-8 space-y-5 shadow-xs">
                <div className="border-b border-border pb-3">
                  <span className="font-mono text-[10px] text-mineral-teal font-bold uppercase block">
                    VERIFIED RESULTS
                  </span>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-evergreen">
                    Contractual Performance Metrics
                  </h4>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {project.results.map((res) => (
                    <div key={res.label} className="p-3 sm:p-4 bg-white border border-border space-y-1">
                      <span className="font-serif text-xl sm:text-2xl font-bold text-evergreen block">
                        {res.metric}
                      </span>
                      <span className="font-mono text-[10px] sm:text-xs uppercase font-bold text-charcoal-muted block">
                        {res.label}
                      </span>
                      <p className="text-[11px] text-charcoal-body leading-snug">
                        {res.context}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {relatedBusinessUnit && (
                <div className="p-5 sm:p-6 bg-evergreen text-white border border-evergreen-hover space-y-3">
                  <span className="font-mono text-[10px] text-mineral-teal uppercase font-bold block">
                    Delivered by {relatedBusinessUnit.divisionCode}
                  </span>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-white">
                    {relatedBusinessUnit.name}
                  </h4>
                  <p className="text-xs text-border/80 leading-relaxed">
                    {relatedBusinessUnit.tagline}
                  </p>
                  <Link
                    to={`/business/${relatedBusinessUnit.slug}`}
                    className="inline-flex items-center text-xs font-mono uppercase text-mineral-teal hover:underline font-bold pt-2 py-2 min-h-[44px]"
                  >
                    <span>View Division Plant Specs</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. BACK TO PROJECTS & RFQ CTA */}
      <section className="py-8 sm:py-12 bg-ivory-canvas border-b border-border">
        <div className="container-corporate flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          <Button
            to="/projects"
            variant="secondary"
            size="sm"
            className="w-full sm:w-auto justify-center"
            leftIcon={<ArrowLeft className="w-4 h-4 mr-1" />}
          >
            Back to All Case Studies
          </Button>

          <Button
            to="/contact"
            variant="primary"
            size="sm"
            className="w-full sm:w-auto justify-center"
            rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
          >
            Submit RFQ for Similar Scope
          </Button>
        </div>
      </section>
    </div>
  );
};
