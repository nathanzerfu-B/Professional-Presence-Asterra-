import { describe, it, expect } from 'vitest';
import {
  company,
  businessUnits,
  projects,
  leadership,
  insights,
  careers,
  navigation,
  getBusinessUnitBySlug,
  getProjectBySlug,
  getFlagshipProject,
  getExecutiveBySlug,
  getInsightBySlug,
  getJobBySlug,
} from '../index';

describe('Asterra Content Data Layer', () => {
  describe('Company Information', () => {
    it('contains complete company metadata and global footprint', () => {
      expect(company.name).toBe('Asterra Manufacturing Group');
      expect(company.foundingYear).toBe(1998);
      expect(company.globalFootprint.plantsCount).toBe(4);
      expect(company.globalFootprint.annualProductionCapacity).toBe('120,000 MT');
      expect(company.certifications.length).toBeGreaterThan(0);
    });
  });

  describe('Business Units (DIV-01 to DIV-04)', () => {
    it('contains all 4 specialized manufacturing divisions', () => {
      expect(businessUnits).toHaveLength(4);
      const codes = businessUnits.map((u) => u.divisionCode);
      expect(codes).toContain('DIV-01');
      expect(codes).toContain('DIV-02');
      expect(codes).toContain('DIV-03');
      expect(codes).toContain('DIV-04');
    });

    it('retrieves individual divisions by slug with complete capability specs', () => {
      const div1 = getBusinessUnitBySlug('precision-metals-fabrication');
      expect(div1).toBeDefined();
      expect(div1?.capabilities.length).toBeGreaterThanOrEqual(3);
      expect(div1?.annualCapacity).toBe('85,000 MT');
    });
  });

  describe('Projects & Flagship Case Studies', () => {
    it('contains verified infrastructure case studies with measurable impact metrics', () => {
      expect(projects.length).toBeGreaterThanOrEqual(3);
      const flagship = getFlagshipProject();
      expect(flagship).toBeDefined();
      expect(flagship?.slug).toBe('awash-heavy-rail-overpass');
      expect(flagship?.results.length).toBeGreaterThanOrEqual(3);
    });

    it('retrieves project by slug', () => {
      const proj = getProjectBySlug('dire-dawa-industrial-steel-terminal');
      expect(proj).toBeDefined();
      expect(proj?.client).toBe('Industrial Parks Development Corporation (IPDC)');
    });
  });

  describe('Leadership Governance', () => {
    it('contains Executive Committee and Board members', () => {
      expect(leadership.length).toBeGreaterThanOrEqual(4);
      const ceo = getExecutiveBySlug('dr-samuel-bekele');
      expect(ceo).toBeDefined();
      expect(ceo?.role).toBe('Group Chief Executive Officer');
      expect(ceo?.credentials.length).toBeGreaterThan(0);
    });
  });

  describe('Insights & Careers', () => {
    it('contains technical whitepapers with key takeaways', () => {
      expect(insights.length).toBeGreaterThanOrEqual(3);
      const article = getInsightBySlug('high-tensile-steel-infrastructure');
      expect(article).toBeDefined();
      expect(article?.keyTakeaways.length).toBeGreaterThan(0);
    });

    it('contains verified open career positions', () => {
      expect(careers.length).toBeGreaterThanOrEqual(3);
      const job = getJobBySlug('senior-structural-welding-engineer');
      expect(job).toBeDefined();
      expect(job?.responsibilities.length).toBeGreaterThan(0);
    });
  });

  describe('Navigation Configuration', () => {
    it('contains primary routes and footer navigation matrix', () => {
      expect(navigation.primary.length).toBeGreaterThanOrEqual(6);
      expect(navigation.footer.organization.length).toBeGreaterThan(0);
      expect(navigation.footer.operations.length).toBeGreaterThan(0);
      expect(navigation.footer.connect.length).toBeGreaterThan(0);
    });
  });
});
