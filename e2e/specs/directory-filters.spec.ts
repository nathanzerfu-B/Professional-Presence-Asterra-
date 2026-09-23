import { test, expect } from '@playwright/test';
import { DirectoryFiltersModel } from '../models/DirectoryFilters.pom';

test.describe('Directory Filters & Interactive Real-Time Search', () => {
  let filterPage: DirectoryFiltersModel;

  test('filters projects directory by sector pills and clears search input', async ({ page }) => {
    filterPage = new DirectoryFiltersModel(page);
    await page.goto('/projects');

    // Filter by Transport & Rail sector
    await filterPage.selectCategory('Transport & Rail');
    await expect(page.locator('text=Awash Heavy Rail Transit Overpass').first()).toBeVisible();

    // Reset to All and Search
    await filterPage.selectCategory('All');
    await filterPage.search('Dire Dawa');
    await expect(page.locator('text=Dire Dawa International Trade Terminal').first()).toBeVisible();

    // Clear search
    await filterPage.clearSearch();
    await expect(page.locator('text=Awash Heavy Rail Transit Overpass').first()).toBeVisible();
  });

  test('filters insights monographs by category', async ({ page }) => {
    filterPage = new DirectoryFiltersModel(page);
    await page.goto('/insights');

    await filterPage.selectCategory('Engineering & Technical');
    await expect(page.locator('text=Advanced High-Tensile Steel Adoption in African Infrastructure Corridors').first()).toBeVisible();
  });

  test('filters careers directory by department', async ({ page }) => {
    filterPage = new DirectoryFiltersModel(page);
    await page.goto('/careers');

    await filterPage.selectCategory('Engineering');
    await expect(page.locator('text=Senior Structural Welding Engineer (IWE/EWE)').first()).toBeVisible();
  });
});
