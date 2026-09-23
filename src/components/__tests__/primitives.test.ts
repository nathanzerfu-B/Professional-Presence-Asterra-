import { describe, it, expect } from 'vitest';
import * as UI from '../ui/Button';
import * as BadgeModule from '../ui/Badge';
import * as HeadingModule from '../ui/Heading';
import * as TextModule from '../ui/Text';
import * as DividerModule from '../ui/Divider';
import * as InputModule from '../ui/Input';
import * as SelectModule from '../ui/Select';
import * as TextareaModule from '../ui/Textarea';
import * as StatCardModule from '../shared/StatCard';
import * as SectionHeaderModule from '../shared/SectionHeader';
import * as BreadcrumbsModule from '../shared/Breadcrumbs';
import * as CTABannerModule from '../shared/CTABanner';
import * as PageHeaderModule from '../shared/PageHeader';

describe('Global UI Primitives and Shared Components Registry', () => {
  it('exports all foundational UI primitives correctly', () => {
    expect(UI.Button).toBeDefined();
    expect(BadgeModule.Badge).toBeDefined();
    expect(HeadingModule.Heading).toBeDefined();
    expect(TextModule.Text).toBeDefined();
    expect(DividerModule.Divider).toBeDefined();
    expect(InputModule.Input).toBeDefined();
    expect(SelectModule.Select).toBeDefined();
    expect(TextareaModule.Textarea).toBeDefined();
  });

  it('exports all shared composite components correctly', () => {
    expect(StatCardModule.StatCard).toBeDefined();
    expect(SectionHeaderModule.SectionHeader).toBeDefined();
    expect(BreadcrumbsModule.Breadcrumbs).toBeDefined();
    expect(CTABannerModule.CTABanner).toBeDefined();
    expect(PageHeaderModule.PageHeader).toBeDefined();
  });
});
