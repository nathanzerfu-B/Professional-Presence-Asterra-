import React, { useState } from 'react';
import { getCareers } from '../data';
import {
  PageHeader,
  Heading,
  Text,
  Button,
  PageSeo,
} from '../components';
import {
  GraduationCap,
  ArrowRight,
  MapPin,
  Calendar,
} from 'lucide-react';

export const CareersListingPage: React.FC = () => {
  const allJobs = getCareers();
  const [selectedDept, setSelectedDept] = useState<string>('All');

  const departments = ['All', 'Engineering', 'Operations', 'Quality Assurance'];

  const filteredJobs =
    selectedDept === 'All'
      ? allJobs
      : allJobs.filter((j) => j.department === selectedDept);

  return (
    <div className="w-full">
      <PageSeo
        title="Engineering Careers & Apprenticeship Academy"
        description="Explore open engineering, quality assurance, and plant operations vacancies across Asterra Manufacturing Group facilities."
        ogType="website"
      />

      {/* 1. ARCHITECTURAL PAGE HEADER */}
      <PageHeader
        eyebrow="Talent & Engineering Careers"
        title="Build Industrial Infrastructure with Africa's Leading Manufacturers."
        description="Join a multidisciplinary team of 1,840+ metallurgical scientists, certified European Welding Engineers, automation specialists, and plant leaders."
        breadcrumbs={[{ label: 'Careers', href: '/careers' }]}
        theme="evergreen"
      />

      {/* 2. WORKING AT ASTERRA & APPRENTICESHIP ACADEMY */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white border-b border-border">
        <div className="container-corporate">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-6 space-y-5 sm:space-y-6">
              <span className="badge-mono">Workforce Excellence</span>
              <Heading as="h2" font="serif" size="display-md" color="evergreen" className="text-xl sm:text-3xl">
                A Culture Founded on Precision & Lifelong Craft Mastery.
              </Heading>
              <Text variant="body" color="body" className="text-xs sm:text-base leading-relaxed">
                At Asterra, we believe manufacturing greatness starts with rigorous engineering standards and continuous investment in human capability. Our employees operate 12 kW fiber lasers, computerized batching towers, and robotic welding cells under strict ISO 45001 safety governance.
              </Text>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
                <div className="p-3 sm:p-4 bg-ivory-canvas border border-border space-y-1">
                  <div className="font-serif text-xl sm:text-2xl font-bold text-evergreen">1,840</div>
                  <span className="font-mono text-[9px] sm:text-[10px] text-charcoal-muted uppercase">Active Workforce</span>
                </div>
                <div className="p-3 sm:p-4 bg-ivory-canvas border border-border space-y-1">
                  <div className="font-serif text-xl sm:text-2xl font-bold text-evergreen">100%</div>
                  <span className="font-mono text-[9px] sm:text-[10px] text-charcoal-muted uppercase">Certified PPE & Safety</span>
                </div>
              </div>
            </div>

            {/* Academy Showcase Card */}
            <div className="lg:col-span-6 bg-evergreen text-white p-6 sm:p-8 border border-evergreen-hover space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-mineral-teal text-white flex items-center justify-center shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-mineral-teal font-bold block">
                    Institutional Initiative
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                    Asterra Technical Apprenticeship Academy
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-border/90 leading-relaxed">
                Founded in 2016, our in-house academy has graduated over 800 certified welders, machinists, and NDT technicians through dual vocational-industrial curricula accredited to international DIN/EN benchmarks.
              </p>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4 border-t border-white/15">
                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-mineral-teal">800+</div>
                  <span className="font-mono text-[10px] uppercase text-border/70">Certified Graduates</span>
                </div>
                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-mineral-teal">100%</div>
                  <span className="font-mono text-[10px] uppercase text-border/70">Direct Full-Time Placement</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OPEN POSITIONS DIRECTORY & FILTER */}
      <section className="py-12 sm:py-16 lg:py-24 bg-ivory-canvas border-b border-border">
        <div className="container-corporate space-y-8 sm:space-y-10">
          <div className="space-y-6 border-b border-border pb-6 sm:pb-8">
            <div className="space-y-2 max-w-3xl">
              <span className="badge-mono">Open Vacancies</span>
              <Heading as="h2" font="serif" size="display-md" color="evergreen" className="text-xl sm:text-3xl">
                Current Engineering & Operational Roles.
              </Heading>
              <Text variant="body" color="body" className="text-xs sm:text-base">
                Explore open positions across our 4 manufacturing facilities in Industrial Zone 4, Addis Ababa.
              </Text>
            </div>

            {/* Department Filter Navigation (Placed below the description text) */}
            <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
              {departments.map((dept) => {
                const isActive = selectedDept === dept;
                return (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-4 py-2.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border shrink-0 min-h-[44px] flex items-center justify-center ${
                      isActive
                        ? 'bg-evergreen text-white border-evergreen font-bold shadow-xs ring-2 ring-mineral-teal/30 scale-[1.02]'
                        : 'bg-white text-charcoal-body border-border hover:border-evergreen active:scale-95'
                    }`}
                    aria-pressed={isActive}
                  >
                    {dept}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Job Vacancy Cards */}
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.slug}
                className="bg-white border border-border p-5 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 hover:border-evergreen transition-all shadow-xs"
              >
                <div className="space-y-2.5 sm:space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="badge-mono text-[9px] bg-ivory-canvas text-evergreen border-border">
                      {job.division}
                    </span>
                    <span className="text-xs font-mono text-charcoal-muted">
                      {job.employmentType} • {job.experienceLevel}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-evergreen">
                    {job.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-charcoal-body max-w-3xl leading-relaxed">
                    {job.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono text-charcoal-muted pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-mineral-teal" />
                      {job.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-mineral-teal" />
                      Closing: {job.closingDate}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 pt-2 md:pt-0">
                  <Button
                    to={`/careers/${job.slug}`}
                    variant="primary"
                    size="sm"
                    className="w-full md:w-auto justify-center"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5 ml-1" />}
                  >
                    View Job & Apply
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="py-12 sm:py-16 text-center space-y-3 bg-white border border-border">
              <p className="font-serif text-base sm:text-lg text-evergreen font-bold">No vacancies currently open in this department.</p>
              <button
                onClick={() => setSelectedDept('All')}
                className="text-xs font-mono text-mineral-teal underline uppercase font-bold cursor-pointer py-2 min-h-[44px]"
              >
                View All Departments
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
