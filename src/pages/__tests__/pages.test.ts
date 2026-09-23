import { describe, it, expect } from 'vitest';
import { HomePage } from '../HomePage';
import { AboutPage } from '../AboutPage';
import { BusinessListingPage } from '../BusinessListingPage';
import { BusinessUnitDetailPage } from '../BusinessUnitDetailPage';
import { ProjectsListingPage } from '../ProjectsListingPage';
import { ProjectDetailPage } from '../ProjectDetailPage';
import { LeadershipListingPage } from '../LeadershipListingPage';
import { ExecutiveProfilePage } from '../ExecutiveProfilePage';
import { InsightsListingPage } from '../InsightsListingPage';
import { InsightDetailPage } from '../InsightDetailPage';
import { CareersListingPage } from '../CareersListingPage';
import { JobDetailPage } from '../JobDetailPage';
import { ContactPage } from '../ContactPage';
import { LegalPage } from '../LegalPage';
import { NotFoundPage } from '../NotFoundPage';

describe('Asterra Full Page Views Component Registry', () => {
  it('exports all 15 page views correctly without missing references', () => {
    expect(HomePage).toBeDefined();
    expect(AboutPage).toBeDefined();
    expect(BusinessListingPage).toBeDefined();
    expect(BusinessUnitDetailPage).toBeDefined();
    expect(ProjectsListingPage).toBeDefined();
    expect(ProjectDetailPage).toBeDefined();
    expect(LeadershipListingPage).toBeDefined();
    expect(ExecutiveProfilePage).toBeDefined();
    expect(InsightsListingPage).toBeDefined();
    expect(InsightDetailPage).toBeDefined();
    expect(CareersListingPage).toBeDefined();
    expect(JobDetailPage).toBeDefined();
    expect(ContactPage).toBeDefined();
    expect(LegalPage).toBeDefined();
    expect(NotFoundPage).toBeDefined();
  });
});
