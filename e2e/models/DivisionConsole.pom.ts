import { Page, Locator, expect } from '@playwright/test';

export class DivisionConsoleModel {
  readonly page: Page;
  readonly heroConsole: Locator;
  readonly divisionButtons: Locator;
  readonly activeDivisionLabel: Locator;
  readonly mobileAccordionCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heroConsole = page.locator('text=Interactive Plant Telemetry').locator('..');
    this.divisionButtons = page.locator('button[aria-label*="View DIV-"]');
    this.activeDivisionLabel = page.locator('text=Viewing DIV-');
    this.mobileAccordionCards = page.locator('.lg\\:hidden button[aria-expanded]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async selectDesktopDivision(code: string) {
    const btn = this.page.locator(`button[aria-label*="${code}"]`).first();
    await btn.click();
    await expect(btn).toHaveAttribute('aria-pressed', 'true');
  }

  async toggleMobileAccordion(index: number = 0) {
    const card = this.mobileAccordionCards.nth(index);
    await card.click();
    await expect(card).toHaveAttribute('aria-expanded', 'true');
  }

  async expectDivisionCapabilitiesVisible() {
    await expect(this.page.locator('text=Audited Production Tolerances & Equipment').or(this.page.locator('text=Audited Capabilities')).first()).toBeVisible();
  }
}
