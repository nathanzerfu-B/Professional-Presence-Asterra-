import { Page, Locator, expect } from '@playwright/test';

export class DirectoryFiltersModel {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly clearSearchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('main input[type="text"]');
    this.clearSearchButton = page.locator('main button[aria-label="Clear Search"]');
  }

  async search(query: string) {
    await this.searchInput.fill(query);
  }

  async clearSearch() {
    await this.clearSearchButton.click();
    await expect(this.searchInput).toHaveValue('');
  }

  async selectCategory(categoryName: string) {
    const pill = this.page.locator('main').locator(`button:has-text("${categoryName}")`).first();
    await pill.click();
    await expect(pill).toHaveAttribute('aria-pressed', 'true');
  }
}
