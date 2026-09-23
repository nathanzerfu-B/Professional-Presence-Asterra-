import { test, expect } from '@playwright/test';
import { ProjectCaseStudyModel } from '../models/ProjectCaseStudy.pom';

test.describe('Infrastructure Project Case Studies & Multi-Angle Telemetry', () => {
  let projectPage: ProjectCaseStudyModel;

  test.beforeEach(async ({ page }) => {
    projectPage = new ProjectCaseStudyModel(page);
    await projectPage.goto('awash-heavy-rail-overpass');
  });

  test('switches multi-angle photography using touch arrow controls', async ({ page }) => {
    await expect(page.locator('text=Photograph 1 of').first()).toBeVisible();

    await projectPage.nextImage();
    await expect(page.locator('text=Photograph 2 of').first()).toBeVisible();

    await projectPage.prevImage();
    await expect(page.locator('text=Photograph 1 of').first()).toBeVisible();
  });

  test('switches between Solution, Challenge, and Execution dimensions seamlessly', async ({ page }) => {
    await projectPage.selectTab('challenge');
    await expect(page.locator('text=Site Constraints & Engineering Demands').or(page.locator('text=Active Dimension: Project Constraints')).first()).toBeVisible();

    await projectPage.selectTab('execution');
    await expect(page.locator('text=Tolerances & Non-Destructive Examination').or(page.locator('text=Active Dimension: Non-Destructive Testing')).first()).toBeVisible();

    await projectPage.selectTab('solution');
    await expect(page.locator('text=Methodology & Pre-Assembly').or(page.locator('text=Active Dimension: Engineering Methodology')).first()).toBeVisible();
  });

  test('displays contractual performance outcome metrics', async ({ page }) => {
    await expect(page.locator('text=Contractual Performance Metrics').first()).toBeVisible();
    await expect(page.locator('text=14,200 MT').first()).toBeVisible();
  });
});
