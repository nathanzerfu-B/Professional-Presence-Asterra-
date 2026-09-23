import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getJobBySlug } from '../data';
import {
  PageHeader,
  Heading,
  Text,
  Badge,
  Button,
  Input,
  Textarea,
  PageSeo,
} from '../components';
import {
  CheckCircle2,
  Send,
  ArrowLeft,
  GraduationCap,
  Briefcase,
  HeartHandshake,
  AlertCircle,
} from 'lucide-react';

export const JobDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const job = getJobBySlug(slug || '');

  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedIn: '',
    coverNote: '',
    honeypot: '',
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!job) {
    return (
      <div className="w-full py-24 container-corporate text-center space-y-6">
        <Badge variant="status" statusType="error">Vacancy Closed or Relocated</Badge>
        <Heading as="h1" font="serif" size="display-md" color="evergreen">
          Position Not Located
        </Heading>
        <Text variant="body" color="muted">
          The requested career vacancy is no longer accepting submissions.
        </Text>
        <Button to="/careers" variant="primary" leftIcon={<ArrowLeft className="w-4 h-4 mr-1" />}>
          Return to Careers Directory
        </Button>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (formState.honeypot) {
      setIsSubmitted(true);
      return;
    }

    const errors: Record<string, string> = {};
    if (!formState.fullName.trim()) {
      errors.fullName = 'Full applicant name is required.';
    }
    if (!formState.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      errors.email = 'Valid professional email address is required.';
    }
    if (!formState.phone.trim()) {
      errors.phone = 'Direct telephone number is required.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setErrorMessage('Please fill in the required candidate details.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="w-full">
      <PageSeo
        title={`${job.title} — Career Opportunity`}
        description={job.summary}
        ogType="website"
        schemaJsonLd={{
          '@context': 'https://schema.org',
          '@type': 'JobPosting',
          title: job.title,
          description: job.summary,
          datePosted: '2024-01-01',
          validThrough: job.closingDate,
          employmentType: 'FULL_TIME',
          hiringOrganization: {
            '@type': 'Organization',
            name: 'Asterra Manufacturing Group',
            sameAs: 'https://asterragroup.com',
          },
          jobLocation: {
            '@type': 'Place',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Addis Ababa',
              addressCountry: 'ET',
            },
          },
        }}
      />

      {/* 1. ARCHITECTURAL PAGE HEADER */}
      <PageHeader
        eyebrow={`${job.division} // VACANCY`}
        title={job.title}
        description={job.summary}
        breadcrumbs={[
          { label: 'Careers', href: '/careers' },
          { label: job.title, href: `/careers/${job.slug}` },
        ]}
        theme="evergreen"
      />

      {/* 2. JOB TELEMETRY STRIP */}
      <section className="bg-white border-b border-border py-4 sm:py-6">
        <div className="container-corporate">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-border">
            <div className="p-2 sm:px-4 first:pl-0">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase text-charcoal-muted font-bold block">Department</span>
              <span className="font-serif text-xs sm:text-sm font-bold text-evergreen truncate block">{job.department}</span>
            </div>
            <div className="p-2 sm:px-4">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase text-charcoal-muted font-bold block">Employment Type</span>
              <span className="font-serif text-xs sm:text-sm font-bold text-evergreen truncate block">{job.employmentType}</span>
            </div>
            <div className="p-2 sm:px-4">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase text-charcoal-muted font-bold block">Location</span>
              <span className="font-serif text-xs sm:text-sm font-bold text-evergreen truncate block">{job.location}</span>
            </div>
            <div className="p-2 sm:px-4 last:pr-0">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase text-charcoal-muted font-bold block">Application Deadline</span>
              <span className="font-serif text-xs sm:text-sm font-bold text-evergreen truncate block">{job.closingDate}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. JOB DETAILS & APPLICATION FORM */}
      <section className="py-12 sm:py-16 lg:py-24 bg-ivory-canvas border-b border-border">
        <div className="container-corporate">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Role Breakdown */}
            <div className="lg:col-span-7 space-y-8 sm:space-y-10">
              {/* Responsibilities */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-mineral-teal shrink-0" />
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-evergreen">
                    Primary Accountabilities & Scope
                  </h3>
                </div>
                <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-charcoal-body">
                  {job.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 p-3 bg-white border border-border">
                      <CheckCircle2 className="w-4 h-4 text-mineral-teal shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Qualifications */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-mineral-teal shrink-0" />
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-evergreen">
                    Required Credentials & Qualifications
                  </h3>
                </div>
                <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-charcoal-body">
                  {job.qualifications.map((qual, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 p-3 bg-white border border-border">
                      <CheckCircle2 className="w-4 h-4 text-mineral-teal shrink-0 mt-0.5" />
                      <span>{qual}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Compensation & Benefits */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5 text-mineral-teal shrink-0" />
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-evergreen">
                    Compensation, Training & Benefits Package
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {job.benefits.map((ben, idx) => (
                    <div key={idx} className="p-3 bg-white border border-border text-xs text-charcoal-body font-mono">
                      ✓ {ben}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Direct Candidate Submission Form (Sticky on Desktop) */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <div className="bg-white border border-border p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-xs">
                <div className="border-b border-border pb-3">
                  <span className="font-mono text-[10px] text-mineral-teal uppercase font-bold tracking-wider block">
                    Direct Application Desk
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-evergreen">
                    Submit Candidate Dossier
                  </h3>
                  <p className="text-xs text-charcoal-muted mt-1">
                    Apply directly for {job.title}.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="p-5 sm:p-6 bg-evergreen text-white text-center space-y-3 animate-fadeIn">
                    <CheckCircle2 className="w-10 h-10 text-mineral-teal mx-auto" />
                    <h4 className="font-serif text-lg font-bold">Dossier Received</h4>
                    <p className="text-xs text-border/90">
                      Our talent directorship has logged your submission for {job.title}. Shortlisted candidates will be contacted for technical assessments.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormState({
                          fullName: '',
                          email: '',
                          phone: '',
                          linkedIn: '',
                          coverNote: '',
                          honeypot: '',
                        });
                        setFieldErrors({});
                      }}
                      className="text-xs font-mono text-mineral-teal underline uppercase font-bold pt-2 cursor-pointer block mx-auto py-2 min-h-[44px]"
                    >
                      Submit Another Application
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    {/* Honeypot */}
                    <input
                      type="text"
                      name="website_url_hp"
                      value={formState.honeypot}
                      onChange={(e) => handleInputChange('honeypot', e.target.value)}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    {errorMessage && (
                      <div className="p-3 bg-red-50 border-l-4 border-state-error text-state-error text-xs flex items-center gap-2 animate-fadeIn">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <Input
                      label="Full Legal Name"
                      required
                      placeholder="Abebe Bikila"
                      value={formState.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      error={fieldErrors.fullName}
                    />

                    <Input
                      label="Corporate / Professional Email"
                      type="email"
                      required
                      placeholder="abebe@example.com"
                      value={formState.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      error={fieldErrors.email}
                    />

                    <Input
                      label="Direct Telephone"
                      type="tel"
                      required
                      placeholder="+251 91 123 4567"
                      value={formState.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      error={fieldErrors.phone}
                    />

                    <Input
                      label="LinkedIn Profile or Portfolio URL"
                      placeholder="https://linkedin.com/in/username"
                      value={formState.linkedIn}
                      onChange={(e) => handleInputChange('linkedIn', e.target.value)}
                    />

                    <Textarea
                      label="Summary of Relevant Industrial Experience"
                      rows={3}
                      placeholder="Highlight certifications (AWS, ISO, IWE), heavy CNC or precast experience..."
                      value={formState.coverNote}
                      onChange={(e) => handleInputChange('coverNote', e.target.value)}
                    />

                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      className="w-full justify-center"
                      isLoading={isSubmitting}
                      rightIcon={<Send className="w-4 h-4 ml-1" />}
                    >
                      {isSubmitting ? 'Verifying Dossier...' : 'Submit Job Application'}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
