import React, { useState } from 'react';
import { CorporateInquiry } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { CheckCircle2, Send, ShieldCheck, AlertCircle } from 'lucide-react';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';

export interface CorporateInquiryFormProps {
  initialDepartment?: CorporateInquiry['department'];
  initialDivision?: string;
  className?: string;
}

export const CorporateInquiryForm: React.FC<CorporateInquiryFormProps> = ({
  initialDepartment = 'Procurement & Sales',
  initialDivision = '',
  className = '',
}) => {
  const [formData, setFormData] = useState<Partial<CorporateInquiry> & { honeypot?: string; estimatedVolume?: string; timeline?: string; preferredDivision?: string }>({
    department: initialDepartment,
    fullName: '',
    organization: '',
    jobTitle: '',
    email: '',
    phone: '',
    country: 'Ethiopia',
    subject: '',
    message: '',
    preferredDivision: initialDivision,
    estimatedVolume: '',
    timeline: 'Within 3 Months',
    honeypot: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [referenceNumber, setReferenceNumber] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear individual field error when user types
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.fullName?.trim()) {
      errors.fullName = 'Full legal or corporate officer name is required.';
    }
    if (!formData.organization?.trim()) {
      errors.organization = 'Company, institution, or client name is required.';
    }
    if (!formData.email?.trim()) {
      errors.email = 'Corporate email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please provide a valid corporate email address.';
    }
    if (!formData.message?.trim()) {
      errors.message = 'Please provide specifications, BOQ summary, or scope details.';
    }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Honeypot spam check: If filled, quietly pretend success without sending
    if (formData.honeypot) {
      setIsSubmitted(true);
      return;
    }

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setErrorMessage('Please correct the highlighted fields before transmitting.');
      return;
    }

    setIsSubmitting(true);

    // Simulate enterprise backend dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedRef = `AST-RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
      setReferenceNumber(generatedRef);
      setIsSubmitted(true);
    }, 600);
  };

  if (isSubmitted) {
    return (
      <div className={`bg-white p-6 sm:p-12 border border-border text-center space-y-6 shadow-xs ${className}`}>
        <div className="w-16 h-16 bg-evergreen-subtle text-evergreen flex items-center justify-center mx-auto border border-border">
          <CheckCircle2 className="w-10 h-10 text-mineral-teal" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-mineral-teal font-semibold">
            Inquiry Ref: {referenceNumber || 'AST-RFQ-849102'}
          </span>
          <Heading as="h3" font="serif" size="heading-lg" color="evergreen">
            Corporate Inquiry Transmitted
          </Heading>
          <Text variant="body" color="body" className="max-w-md mx-auto text-xs sm:text-sm">
            Your technical request has been routed to the <strong>{formData.department}</strong> directorate. A designated engineering or procurement officer will respond within one business day (48-hour SLA).
          </Text>
        </div>

        <div className="pt-4 border-t border-border max-w-sm mx-auto flex items-center justify-center gap-2 text-xs font-mono text-charcoal-muted">
          <ShieldCheck className="w-4 h-4 text-mineral-teal" />
          <span>Encrypted Industrial Data Transmission</span>
        </div>

        <div className="pt-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                department: initialDepartment,
                fullName: '',
                organization: '',
                jobTitle: '',
                email: '',
                phone: '',
                country: 'Ethiopia',
                subject: '',
                message: '',
                preferredDivision: '',
                estimatedVolume: '',
                timeline: 'Within 3 Months',
                honeypot: '',
              });
              setFieldErrors({});
            }}
          >
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  const isProcurement = formData.department === 'Procurement & Sales';

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white p-5 sm:p-10 border border-border space-y-6 shadow-xs ${className}`}
      noValidate
    >
      {/* Hidden Honeypot Field */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-50 border-l-4 border-state-error text-state-error text-xs flex items-center gap-2 animate-fadeIn">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span className="font-semibold">{errorMessage}</span>
        </div>
      )}

      {/* 1. Department Routing Selector */}
      <div>
        <Select
          label="Designated Department Directorate"
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
          options={[
            { value: 'Procurement & Sales', label: 'Procurement & High-Volume Supply Sales' },
            { value: 'Partnerships & Joint Ventures', label: 'Partnerships, Distribution & Joint Ventures' },
            { value: 'Careers & Talent', label: 'Human Resources & Engineering Talent' },
            { value: 'Media & Investor Relations', label: 'Media, Press & Institutional Stakeholders' },
            { value: 'General Inquiries', label: 'General Corporate Management' },
          ]}
        />
      </div>

      {/* 2. Contact Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          name="fullName"
          placeholder="e.g. Samuel Yohannes"
          value={formData.fullName}
          onChange={handleChange}
          error={fieldErrors.fullName}
          required
        />

        <Input
          label="Company / Contracting Entity"
          name="organization"
          placeholder="e.g. Ethiopian Railways Corp / Private Enterprise"
          value={formData.organization}
          onChange={handleChange}
          error={fieldErrors.organization}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Corporate Email Address"
          name="email"
          type="email"
          placeholder="samuel@enterprise.com"
          value={formData.email}
          onChange={handleChange}
          error={fieldErrors.email}
          required
        />

        <Input
          label="Direct Telephone / Extension"
          name="phone"
          type="tel"
          placeholder="+251 91 123 4567"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      {/* 3. Procurement Specific Fields */}
      {isProcurement && (
        <div className="p-4 sm:p-5 bg-ivory-canvas/60 border border-border space-y-4 animate-fadeIn">
          <span className="font-mono text-[10px] uppercase font-bold text-mineral-teal tracking-wider block">
            Procurement Scope Specifications (Optional)
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Preferred Plant Division"
              name="preferredDivision"
              value={formData.preferredDivision}
              onChange={handleChange}
              options={[
                { value: '', label: 'Select Target Plant Division' },
                { value: 'DIV-01: Structural Steel & Heavy Metallurgy', label: 'DIV-01: Structural Steel' },
                { value: 'DIV-02: Precast & High-Performance Concrete', label: 'DIV-02: UHPC Precast' },
                { value: 'DIV-03: Industrial Polymers & Pressure Piping', label: 'DIV-03: Polymers & Piping' },
                { value: 'DIV-04: Precision Machining & Assemblies', label: 'DIV-04: Precision Assemblies' },
              ]}
            />

            <Input
              label="Estimated Tonnage / Linear Volume"
              name="estimatedVolume"
              placeholder="e.g. 500 MT / 12,000 meters"
              value={formData.estimatedVolume}
              onChange={handleChange}
            />

            <Select
              label="Target Delivery Timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              options={[
                { value: 'Immediate (Under 30 Days)', label: 'Immediate (< 30 Days)' },
                { value: 'Within 3 Months', label: 'Within 3 Months' },
                { value: '3 to 6 Months', label: '3 to 6 Months' },
                { value: 'Q3/Q4 Capital Project', label: 'Q3/Q4 Capital Project' },
              ]}
            />
          </div>
        </div>
      )}

      {/* 4. Subject & Message Details */}
      <Input
        label="Inquiry Subject / Tender Reference"
        name="subject"
        placeholder="e.g. Inquiry regarding EN 1090 Bridge Girder Allocation"
        value={formData.subject}
        onChange={handleChange}
      />

      <Textarea
        label="Scope of Inquiry / Bill of Quantities Summary"
        name="message"
        rows={4}
        placeholder="Provide material grade requirements (e.g. S355JR, PE100), dimensional tolerances, execution class, or tender timelines..."
        value={formData.message}
        onChange={handleChange}
        error={fieldErrors.message}
        required
      />

      <div className="pt-2 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-[11px] font-mono text-charcoal-muted">
          All technical drawings and specifications are processed under strict NDA.
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isSubmitting}
          className="w-full sm:w-auto"
          rightIcon={<Send className="w-4 h-4 ml-1" />}
        >
          {isSubmitting ? 'Transmitting Transmission...' : 'Transmit Corporate RFQ'}
        </Button>
      </div>
    </form>
  );
};
