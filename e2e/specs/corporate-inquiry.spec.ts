import { test, expect } from '@playwright/test';
import { CorporateInquiryModel } from '../models/CorporateInquiry.pom';

test.describe('Corporate Inquiry & RFQ Form Validation', () => {
  let inquiry: CorporateInquiryModel;

  test.beforeEach(async ({ page }) => {
    inquiry = new CorporateInquiryModel(page);
    await inquiry.goto('/contact');
  });

  test('validates required fields and highlights error borders when submitted empty', async ({ page }) => {
    await inquiry.submit();
    
    // Expect error alert and highlighted border
    await expect(page.locator('text=Please correct the highlighted fields')).toBeVisible();
    await expect(page.locator('input[name="fullName"]')).toHaveClass(/border-state-error/);
    await expect(page.locator('input[name="email"]')).toHaveClass(/border-state-error/);
    await expect(page.locator('textarea[name="message"]')).toHaveClass(/border-state-error/);
  });

  test('clears field errors in real time when user inputs data', async ({ page }) => {
    await inquiry.submit();
    await expect(page.locator('input[name="fullName"]')).toHaveClass(/border-state-error/);

    await inquiry.fullNameInput.fill('Ato Yohannes Haile');
    await expect(page.locator('input[name="fullName"]')).not.toHaveClass(/border-state-error/);
  });

  test('submits valid RFQ form and displays confirmed reference badge', async ({ page }) => {
    await inquiry.fillInquiry({
      fullName: 'Dr. Michael Kebede',
      organization: 'Ethiopian Electric Power (EEP)',
      email: 'm.kebede@eep.gov.et',
      phone: '+251 91 100 2000',
      subject: 'Tender for Substation Structural Steel',
      message: 'Requesting formal quotation for 450 MT certified S355JR structural steel elements.',
    });

    await inquiry.submit();
    await inquiry.expectSuccess();
  });
});
