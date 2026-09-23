import { describe, it, expect } from 'vitest';
import { routes } from '../routes';

describe('Asterra Routing Architecture', () => {
  it('defines the root SiteLayout at top level', () => {
    expect(routes).toHaveLength(1);
    expect(routes[0].path).toBe('/');
    expect(routes[0].children).toBeDefined();
  });

  it('contains all 8 required corporate modules plus detail and legal routes', () => {
    const childPaths = routes[0].children?.map((r) => r.path || (r.index ? '/' : ''));
    expect(childPaths).toContain('/');
    expect(childPaths).toContain('about');
    expect(childPaths).toContain('leadership');
    expect(childPaths).toContain('leadership/:slug');
    expect(childPaths).toContain('business');
    expect(childPaths).toContain('business/:slug');
    expect(childPaths).toContain('projects');
    expect(childPaths).toContain('projects/:slug');
    expect(childPaths).toContain('insights');
    expect(childPaths).toContain('insights/:slug');
    expect(childPaths).toContain('careers');
    expect(childPaths).toContain('careers/:slug');
    expect(childPaths).toContain('contact');
    expect(childPaths).toContain('privacy');
    expect(childPaths).toContain('terms');
    expect(childPaths).toContain('*');
  });
});
