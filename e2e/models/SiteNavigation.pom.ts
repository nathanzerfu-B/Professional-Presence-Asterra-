import { Page, Locator, expect } from '@playwright/test';

export class SiteNavigationModel {
  readonly page: Page;
  readonly skipToContentLink: Locator;
  readonly mainContent: Locator;
  readonly brandLogo: Locator;
  readonly desktopNav: Locator;
  readonly mobileMenuButton: Locator;
  readonly mobileDrawer: Locator;
  readonly mobileCloseButton: Locator;
  readonly footer: Locator;
  readonly backToTopButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.skipToContentLink = page.locator('a[href="#main-content"]');
    this.mainContent = page.locator('#main-content');
    this.brandLogo = page.locator('header a[href="/"]').first();
    this.desktopNav = page.locator('nav[aria-label="Main Navigation"]');
    this.mobileMenuButton = page.locator('header button[aria-label*="navigation menu"]').first();
    this.mobileDrawer = page.locator('div[role="dialog"][aria-label*="Mobile Navigation"]');
    this.mobileCloseButton = this.mobileDrawer.locator('button[aria-label*="Close Navigation Drawer"], button:has-text("CLOSE")').first();
    this.footer = page.locator('footer');
    this.backToTopButton = page.locator('button:has-text("↑"), button[aria-label="Back to Top"]');
  }

  async goto(path: string = '/') {
    await this.page.goto(path);
  }

  async navigateViaDesktop(label: string) {
    const slug = label.toLowerCase().replace(/\s+/g, '');
    const link = this.desktopNav.locator(`a[href*="${slug}"], a:has-text("${label}")`).first();
    await link.click();
  }

  async openMobileMenu() {
    await this.mobileMenuButton.click();
    await expect(this.mobileDrawer).toBeVisible();
  }

  async closeMobileMenu() {
    await this.mobileCloseButton.click();
    await expect(this.mobileDrawer).toBeHidden();
  }

  async navigateViaMobileMenu(label: string) {
    await this.openMobileMenu();
    await this.mobileDrawer.locator(`a:has-text("${label}")`).first().click();
  }

  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async clickBackToTop() {
    await expect(this.backToTopButton).toBeVisible();
    await this.backToTopButton.click();
  }
}
