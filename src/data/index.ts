import companyData from './company.json';
import businessUnitsData from './businessUnits.json';
import projectsData from './projects.json';
import leadershipData from './leadership.json';
import insightsData from './insights.json';
import careersData from './careers.json';
import navigationData from './navigation.json';

import type {
  CompanyInfo,
  BusinessUnit,
  ProjectCaseStudy,
  ExecutiveProfile,
  InsightArticle,
  JobOpportunity,
} from '../types';

export const company: CompanyInfo = companyData as CompanyInfo;
export const businessUnits: BusinessUnit[] = businessUnitsData as BusinessUnit[];
export const projects: ProjectCaseStudy[] = projectsData as ProjectCaseStudy[];
export const leadership: ExecutiveProfile[] = leadershipData as ExecutiveProfile[];
export const insights: InsightArticle[] = insightsData as InsightArticle[];
export const careers: JobOpportunity[] = careersData as JobOpportunity[];
export const navigation = navigationData;

// Helper getters with type safety
export const getCompanyInfo = (): CompanyInfo => company;

export const getBusinessUnits = (): BusinessUnit[] => businessUnits;
export const getBusinessUnitBySlug = (slug: string): BusinessUnit | undefined =>
  businessUnits.find((u) => u.slug === slug);

export const getProjects = (): ProjectCaseStudy[] => projects;
export const getProjectBySlug = (slug: string): ProjectCaseStudy | undefined =>
  projects.find((p) => p.slug === slug);
export const getFlagshipProject = (): ProjectCaseStudy | undefined =>
  projects.find((p) => p.isFlagship) || projects[0];

export const getLeadership = (): ExecutiveProfile[] => leadership;
export const getExecutiveBySlug = (slug: string): ExecutiveProfile | undefined =>
  leadership.find((l) => l.slug === slug);

export const getInsights = (): InsightArticle[] => insights;
export const getInsightBySlug = (slug: string): InsightArticle | undefined =>
  insights.find((i) => i.slug === slug);

export const getCareers = (): JobOpportunity[] => careers;
export const getJobBySlug = (slug: string): JobOpportunity | undefined =>
  careers.find((j) => j.slug === slug);
