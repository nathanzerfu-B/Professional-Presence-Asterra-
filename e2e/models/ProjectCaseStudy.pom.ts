import { Page, Locator, expect } from '@playwright/test';

export class ProjectCaseStudyModel {
  readonly page: Page;
  readonly prevImageButton: Locator;
  readonly nextImageButton: Locator;
  readonly photographBadge: Locator;
  readonly solutionTab: Locator;
  readonly challengeTab: Locator;
  readonly executionTab: Locator;
  readonly outcomeMetrics: Locator;

  constructor(page: Page) {
    this.page = page;
    this.prevImageButton = page.locator('button[aria-label="Previous Photograph"]');
    this.nextImageButton = page.locator('button[aria-label="Next Photograph"]');
    this.photographBadge = page.locator('text=Photograph');
    this.solutionTab = page.locator('button:has-text("Solution")').first();
    this.challengeTab = page.locator('button:has-text("Challenge")').first();
    this.executionTab = page.locator('button:has-text("Execution")').or(page.locator('button:has-text("Specs")')).first();
    this.outcomeMetrics = page.locator('text=Contractual Performance Metrics').or(page.locator('text=VERIFIED RESULTS')).first();
  }

  async goto(slug: string = 'awash-heavy-rail-overpass') {
    await this.page.goto(`/projects/${slug}`);
  }

  async nextImage() {
    await this.nextImageButton.click();
  }

  async prevImage() {
    await this.prevImageButton.click();
  }

  async selectTab(tab: 'solution' | 'challenge' | 'execution') {
    if (tab === 'solution') await this.solutionTab.click();
    if (tab === 'challenge') await this.challengeTab.click();
    if (tab === 'execution') await this.executionTab.click();
  }
}
