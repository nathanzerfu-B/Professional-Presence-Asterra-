import { test, expect } from '@playwright/test';
import { SiteNavigationModel } from '../models/SiteNavigation.pom';

test.describe('Asterra Site Navigation & Chrome', () => {
  let nav: SiteNavigationModel;

  test.beforeEach(async ({ page }) => {
    nav = new SiteNavigationModel(page);
    await nav.goto('/');
  });

  test('renders top utility bar with corporate identification and telephone link', async ({ page, isMobile }) => {
    if (isMobile) test.skip();
    await expect(page.locator('text=EST. 1998').first()).toBeVisible();
    await expect(page.locator('a[href^="tel:"]').first()).toBeVisible();
  });

  test('supports WCAG skip-to-content navigation', async ({ page }) => {
    await page.keyboard.press('Tab');
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#main-content')).toBeInViewport();
  });

  test('desktop header navigates to core business modules', async ({ page, isMobile }) => {
    if (isMobile) test.skip();
    
    await nav.navigateViaDesktop('About');
    await expect(page).toHaveURL(/.*about/);
    await expect(page.locator('h1').first()).toBeVisible();

    await nav.navigateViaDesktop('Projects');
    await expect(page).toHaveURL(/.*projects/);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('mobile navigation drawer opens, displays operating divisions, and closes cleanly', async ({ page, isMobile }) => {
    if (!isMobile) test.skip();

    await nav.openMobileMenu();
    await expect(nav.mobileDrawer).toBeVisible();
    await expect(nav.mobileDrawer.locator('text=Home Overview').first()).toBeVisible();

    await nav.closeMobileMenu();
    await expect(nav.mobileDrawer).toBeHidden();
  });

  test('handles 404 routes gracefully with portal gateway cards', async ({ page }) => {
    await page.goto('/unknown-subpage-path');
    await expect(page.locator('text=404').first()).toBeVisible();
    await expect(page.locator('main').locator('text=Operating Divisions').first()).toBeVisible();
    
    await page.locator('a:has-text("Return to Corporate Homepage")').first().click();
    await expect(page).toHaveURL('/');
  });
});
