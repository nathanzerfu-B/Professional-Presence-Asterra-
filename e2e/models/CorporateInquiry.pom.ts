import { Page, Locator, expect } from '@playwright/test';

export class CorporateInquiryModel {
  readonly page: Page;
  readonly form: Locator;
  readonly departmentSelect: Locator;
  readonly fullNameInput: Locator;
  readonly organizationInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly subjectInput: Locator;
  readonly messageTextarea: Locator;
  readonly honeypotInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessageAlert: Locator;
  readonly successHeading: Locator;
  readonly referenceBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.form = page.locator('form:has-text("Corporate RFQ"), form:has-text("Scope of Inquiry")').first();
    this.departmentSelect = page.locator('select[name="department"]');
    this.fullNameInput = page.locator('input[name="fullName"]');
    this.organizationInput = page.locator('input[name="organization"]');
    this.emailInput = page.locator('input[name="email"]');
    this.phoneInput = page.locator('input[name="phone"]');
    this.subjectInput = page.locator('input[name="subject"]');
    this.messageTextarea = page.locator('textarea[name="message"]');
    this.honeypotInput = page.locator('input[name="honeypot"]');
    this.submitButton = page.locator('button[type="submit"]:has-text("Corporate RFQ"), button[type="submit"]:has-text("Transmit")').first();
    this.errorMessageAlert = page.locator('.text-state-error');
    this.successHeading = page.locator('h3:has-text("Corporate Inquiry Transmitted")');
    this.referenceBadge = page.locator('text=Inquiry Ref: AST-RFQ-');
  }

  async goto(path: string = '/contact') {
    await this.page.goto(path);
  }

  async fillInquiry({
    fullName,
    organization,
    email,
    phone,
    subject,
    message,
  }: {
    fullName: string;
    organization: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
  }) {
    if (fullName) await this.fullNameInput.fill(fullName);
    if (organization) await this.organizationInput.fill(organization);
    if (email) await this.emailInput.fill(email);
    if (phone) await this.phoneInput.fill(phone);
    if (subject) await this.subjectInput.fill(subject);
    if (message) await this.messageTextarea.fill(message);
  }

  async submit() {
    await this.submitButton.click();
  }

  async expectSuccess() {
    await expect(this.successHeading).toBeVisible({ timeout: 10000 });
    await expect(this.referenceBadge).toBeVisible();
  }

  async expectFieldError(fieldName: string, messageSubstring?: string) {
    const errorText = this.page.locator(`p.text-state-error`);
    await expect(errorText.first()).toBeVisible();
    if (messageSubstring) {
      await expect(this.page.locator(`text=${messageSubstring}`).first()).toBeVisible();
    }
  }
}
