/**
 * Asterra Manufacturing Group — Core Type Definitions
 * Phase 6: Content Model & Data Architecture
 */

export interface CoreValue {
  title: string;
  description: string;
}

export interface Milestone {
  year: number;
  title: string;
  description: string;
}

export interface CertificationItem {
  code: string;
  title: string;
  issuer: string;
  year: number;
}

export interface SocialLinkItem {
  platform: 'linkedin' | 'twitter' | 'youtube' | 'facebook';
  url: string;
}

export interface CompanyInfo {
  name: string;
  legalName: string;
  tagline: string;
  foundingYear: number;
  overview: string;
  heritageStory: string;
  mission: string;
  vision: string;
  coreValues: CoreValue[];
  milestones: Milestone[];
  headquarters: {
    address: string;
    city: string;
    country: string;
    postalCode: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    generalEmail: string;
    procurementEmail: string;
    careersEmail: string;
    mediaEmail: string;
    phonePrimary: string;
    phoneSecondary?: string;
    operatingHours: string;
  };
  globalFootprint: {
    plantsCount: number;
    totalPlantAreaSqM: string;
    annualProductionCapacity: string;
    workforceTotal: string;
    exportCountriesCount: number;
    activeMarkets: string[];
  };
  certifications: CertificationItem[];
  socialLinks: SocialLinkItem[];
}

export interface CapabilityItem {
  id: string;
  title: string;
  description: string;
  technicalSpecs: string[];
}

export interface BusinessUnit {
  slug: string;
  divisionCode: string; // e.g. "DIV-01"
  name: string;
  tagline: string;
  heroImage: string;
  facilityImage: string;
  overview: string;
  facilityLocation: string;
  facilitySizeSqM: string;
  annualCapacity: string;
  workforceCount: string;
  certifications: string[];
  capabilities: CapabilityItem[];
  keyProducts: {
    name: string;
    category: string;
    specification: string;
  }[];
  featuredProjectSlugs: string[];
  downloadableBrochureUrl?: string;
}

export interface ProjectMetricResult {
  metric: string;
  label: string;
  context?: string;
}

export interface ProjectCaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  client: string;
  clientCategory: 'Municipal Infrastructure' | 'Heavy Industry' | 'Energy & Utilities' | 'Export Commercial';
  sector: string;
  year: number;
  location: string;
  businessUnitSlug: string;
  heroImage: string;
  galleryImages: string[];
  challenge: string;
  solution: string;
  engineeringExecution: string;
  results: ProjectMetricResult[];
  certificationsApplied: string[];
  isFlagship?: boolean;
}

export interface ExecutiveProfile {
  slug: string;
  name: string;
  role: string;
  department: 'Executive Committee' | 'Board of Directors' | 'Operational Leadership';
  photo: string;
  bio: string;
  governanceQuote: string;
  education: string[];
  credentials: string[];
  careerHighlights: string[];
  tenureYears: number;
  directorships?: string[];
  linkedInUrl?: string;
}

export interface InsightArticle {
  slug: string;
  title: string;
  subtitle: string;
  category: 'Industry Trends' | 'Engineering & Technical' | 'Sustainability & ESG' | 'Market Reports';
  publishedDate: string;
  readTimeMinutes: number;
  heroImage: string;
  summary: string;
  keyTakeaways: string[];
  contentSections: {
    heading: string;
    bodyMarkdown: string;
  }[];
  author: {
    name: string;
    role: string;
    photo: string;
  };
  downloadablePdfUrl?: string;
  relatedArticleSlugs?: string[];
}

export interface JobOpportunity {
  slug: string;
  title: string;
  division: string;
  department: 'Engineering' | 'Operations' | 'Supply Chain' | 'Quality Assurance' | 'Executive Management';
  location: string;
  employmentType: 'Full-time Permanent' | 'Contract' | 'Executive Appointment';
  experienceLevel: string;
  closingDate: string;
  summary: string;
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
}

export interface NavigationItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
  children?: {
    label: string;
    href: string;
    description?: string;
  }[];
}

export interface CorporateInquiry {
  id?: string;
  department: 'Procurement & Sales' | 'Partnerships & Joint Ventures' | 'Careers & Talent' | 'Media & Investor Relations' | 'General Inquiries';
  fullName: string;
  organization: string;
  jobTitle?: string;
  email: string;
  phone: string;
  country: string;
  subject: string;
  message: string;
  rfqDetails?: {
    estimatedVolume?: string;
    timeline?: string;
    preferredDivision?: string;
  };
  submittedAt?: string;
}

export interface SeoMetadata {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  schemaJsonLd?: Record<string, unknown>;
}
