import { RouteObject } from 'react-router-dom';
import { SiteLayout } from '../layouts/SiteLayout';
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { LeadershipListingPage } from '../pages/LeadershipListingPage';
import { ExecutiveProfilePage } from '../pages/ExecutiveProfilePage';
import { BusinessListingPage } from '../pages/BusinessListingPage';
import { BusinessUnitDetailPage } from '../pages/BusinessUnitDetailPage';
import { ProjectsListingPage } from '../pages/ProjectsListingPage';
import { ProjectDetailPage } from '../pages/ProjectDetailPage';
import { InsightsListingPage } from '../pages/InsightsListingPage';
import { InsightDetailPage } from '../pages/InsightDetailPage';
import { CareersListingPage } from '../pages/CareersListingPage';
import { JobDetailPage } from '../pages/JobDetailPage';
import { ContactPage } from '../pages/ContactPage';
import { LegalPage } from '../pages/LegalPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <SiteLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'leadership', element: <LeadershipListingPage /> },
      { path: 'leadership/:slug', element: <ExecutiveProfilePage /> },
      { path: 'business', element: <BusinessListingPage /> },
      { path: 'business/:slug', element: <BusinessUnitDetailPage /> },
      { path: 'projects', element: <ProjectsListingPage /> },
      { path: 'projects/:slug', element: <ProjectDetailPage /> },
      { path: 'insights', element: <InsightsListingPage /> },
      { path: 'insights/:slug', element: <InsightDetailPage /> },
      { path: 'careers', element: <CareersListingPage /> },
      { path: 'careers/:slug', element: <JobDetailPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'privacy', element: <LegalPage /> },
      { path: 'terms', element: <LegalPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
