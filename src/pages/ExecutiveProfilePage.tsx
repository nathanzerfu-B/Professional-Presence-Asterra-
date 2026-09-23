import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getExecutiveBySlug, getLeadership } from '../data';
import {
  PageHeader,
  Heading,
  Text,
  Badge,
  Button,
  PageSeo,
} from '../components';
import {
  GraduationCap,
  Award,
  Briefcase,
  Quote,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

export const ExecutiveProfilePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const executive = getExecutiveBySlug(slug || '');
  const allLeaders = getLeadership();
  const otherLeaders = allLeaders.filter((l) => l.slug !== slug).slice(0, 3);

  if (!executive) {
    return (
      <div className="w-full py-24 container-corporate text-center space-y-6">
        <Badge variant="status" statusType="error">Profile Not Located</Badge>
        <Heading as="h1" font="serif" size="display-md" color="evergreen">
          Executive Profile Not Found
        </Heading>
        <Text variant="body" color="muted">
          The requested leadership profile does not exist or has been updated.
        </Text>
        <Button to="/leadership" variant="primary" leftIcon={<ArrowLeft className="w-4 h-4 mr-1" />}>
          Return to Leadership Directory
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <PageSeo
        title={`${executive.name} — ${executive.role}`}
        description={executive.bio}
        ogType="profile"
      />

      {/* 1. ARCHITECTURAL PAGE HEADER */}
      <PageHeader
        eyebrow={`${executive.department} // PROFILE`}
        title={executive.name}
        description={executive.role}
        breadcrumbs={[
          { label: 'Leadership', href: '/leadership' },
          { label: executive.name, href: `/leadership/${executive.slug}` },
        ]}
        theme="evergreen"
      />

      {/* 2. EXECUTIVE DOSSIER HERO */}
      <section className="py-16 lg:py-24 bg-white border-b border-border">
        <div className="container-corporate">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Portrait & Quick Facts */}
            <div className="lg:col-span-5 space-y-6">
              <div className="aspect-[4/5] bg-ivory-canvas border border-border p-2 shadow-xs overflow-hidden">
                <img
                  src={executive.photo}
                  alt={executive.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="bg-ivory-canvas border border-border p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <span className="font-mono text-xs text-charcoal-muted uppercase">Tenure with Group</span>
                  <span className="font-serif text-lg font-bold text-evergreen">{executive.tenureYears}+ Years</span>
                </div>
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <span className="font-mono text-xs text-charcoal-muted uppercase">Directorate</span>
                  <span className="font-mono text-xs font-bold text-evergreen">{executive.department}</span>
                </div>
                {executive.directorships && (
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-charcoal-muted uppercase font-bold block">Board Directorships:</span>
                    <ul className="text-xs text-charcoal-body space-y-1">
                      {executive.directorships.map((d) => (
                        <li key={d} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-mineral-teal shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Right Biography, Quote & Qualifications */}
            <div className="lg:col-span-7 space-y-8">
              {/* Signed Governance Statement */}
              <div className="p-6 sm:p-8 bg-ivory-canvas border-l-4 border-evergreen space-y-3 relative">
                <Quote className="w-8 h-8 text-mineral-teal/30 absolute top-4 right-4" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-mineral-teal font-bold block">
                  Governance Statement
                </span>
                <p className="font-serif text-lg text-evergreen italic leading-relaxed">
                  &ldquo;{executive.governanceQuote}&rdquo;
                </p>
                <div className="text-xs font-mono text-charcoal-muted pt-1">
                  — {executive.name}, {executive.role}
                </div>
              </div>

              {/* Biography */}
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-evergreen">Executive Biography</h3>
                <Text variant="body" color="body" className="leading-relaxed text-sm sm:text-base">
                  {executive.bio}
                </Text>
              </div>

              {/* Education & Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-border">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-evergreen font-serif font-bold text-base">
                    <GraduationCap className="w-4 h-4 text-mineral-teal" />
                    <h4>Academic Credentials</h4>
                  </div>
                  <ul className="space-y-2 text-xs text-charcoal-body">
                    {executive.education.map((edu) => (
                      <li key={edu} className="p-2.5 bg-ivory-canvas/60 border border-border">
                        {edu}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-evergreen font-serif font-bold text-base">
                    <Award className="w-4 h-4 text-mineral-teal" />
                    <h4>Professional Fellowships</h4>
                  </div>
                  <ul className="space-y-2 text-xs text-charcoal-body">
                    {executive.credentials.map((cred) => (
                      <li key={cred} className="p-2.5 bg-ivory-canvas/60 border border-border">
                        {cred}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Career Highlights */}
              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-evergreen font-serif font-bold text-base">
                  <Briefcase className="w-4 h-4 text-mineral-teal" />
                  <h4>Industrial Career Milestones</h4>
                </div>
                <ul className="space-y-2 text-xs text-charcoal-body">
                  {executive.careerHighlights.map((hl) => (
                    <li key={hl} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-mineral-teal shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PEER DIRECTORS CAROUSEL */}
      <section className="py-16 bg-ivory-canvas border-b border-border">
        <div className="container-corporate space-y-8">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h3 className="font-serif text-xl font-bold text-evergreen">
              Other Members of Executive Leadership
            </h3>
            <Link to="/leadership" className="text-xs font-mono uppercase text-evergreen hover:text-mineral-teal font-bold">
              View All Directory &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherLeaders.map((leader) => (
              <Link
                key={leader.slug}
                to={`/leadership/${leader.slug}`}
                className="bg-white border border-border p-4 group hover:border-evergreen transition-all flex items-center gap-4"
              >
                <img
                  src={leader.photo}
                  alt={leader.name}
                  className="w-14 h-14 object-cover border border-border shrink-0"
                />
                <div className="truncate">
                  <h4 className="font-serif text-sm font-bold text-evergreen group-hover:text-mineral-teal transition-colors truncate">
                    {leader.name}
                  </h4>
                  <p className="text-[11px] font-mono text-charcoal-muted truncate">{leader.role}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
