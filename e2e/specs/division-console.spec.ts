import { test, expect } from '@playwright/test';
import { DivisionConsoleModel } from '../models/DivisionConsole.pom';

test.describe('Division Telemetry & Interactive Console', () => {
  let consoleModel: DivisionConsoleModel;

  test.beforeEach(async ({ page }) => {
    consoleModel = new DivisionConsoleModel(page);
    await consoleModel.goto();
  });

  test('switches division telemetry in desktop quick-view console', async ({ page, isMobile }) => {
    if (isMobile) test.skip();

    // Default is DIV-01
    await expect(page.locator('text=DIV-01').first()).toBeVisible();

    // Switch to DIV-02
    await consoleModel.selectDesktopDivision('DIV-02');
    await expect(page.locator('text=Industrial Materials & Building Products').first()).toBeVisible();

    // Switch to DIV-03
    await consoleModel.selectDesktopDivision('DIV-03');
    await expect(page.locator('text=Polymers & Engineered Composites').first()).toBeVisible();
  });

  test('supports in-place expandable accordion on mobile/tablet viewport', async ({ page, isMobile }) => {
    if (!isMobile) test.skip();

    await consoleModel.toggleMobileAccordion(0);
    await expect(page.locator('text=Audited Capabilities:').first()).toBeVisible();
  });
});
