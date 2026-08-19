import { describe, it, expect } from 'vitest';
import { STEPS } from '../components/booking/BookingStepper.tsx';
import { COUNTRY_CODES } from '../components/booking/CustomerDetailsStep.tsx';

describe('Accessibility & Standards Verification', () => {
  it('should have properly sequenced steps for screen readers', () => {
    expect(STEPS.map((s) => s.number)).toEqual([1, 2, 3, 4]);
    STEPS.forEach((step) => {
      expect(step.title.length).toBeGreaterThan(0);
    });
  });

  it('should provide complete country codes and labels for accessible phone inputs', () => {
    expect(COUNTRY_CODES.length).toBeGreaterThan(0);
    COUNTRY_CODES.forEach((c) => {
      expect(c.code).toMatch(/^\+\d+$/);
      expect(c.flag).toBeDefined();
      expect(c.label).toContain(c.code);
    });
  });
});
