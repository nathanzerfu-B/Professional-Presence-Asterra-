import { describe, it, expect } from 'vitest';
import {
  BusinessUnitCard,
  ProjectCard,
  ExecutiveCard,
  ArticleCard,
  JobCard,
  CorporateInquiryForm,
} from '../index';

describe('Domain Components Registry', () => {
  it('exports all domain component modules correctly', () => {
    expect(BusinessUnitCard).toBeDefined();
    expect(ProjectCard).toBeDefined();
    expect(ExecutiveCard).toBeDefined();
    expect(ArticleCard).toBeDefined();
    expect(JobCard).toBeDefined();
    expect(CorporateInquiryForm).toBeDefined();
  });
});