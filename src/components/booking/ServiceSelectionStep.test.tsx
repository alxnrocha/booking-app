import { describe, it, expect } from 'vitest';
import { MOCK_SERVICES } from '../../data/mockBookingData.ts';

describe('Service Selection Logic', () => {
  it('should filter services by category correctly', () => {
    const massageServices = MOCK_SERVICES.filter((s) => s.category === 'massage');
    expect(massageServices.length).toBeGreaterThan(0);
    massageServices.forEach((s) => expect(s.category).toBe('massage'));

    const hairServices = MOCK_SERVICES.filter((s) => s.category === 'hair');
    expect(hairServices.length).toBeGreaterThan(0);
    hairServices.forEach((s) => expect(s.category).toBe('hair'));
  });

  it('should have valid pricing and duration on each service', () => {
    MOCK_SERVICES.forEach((service) => {
      expect(service.price).toBeGreaterThan(0);
      expect(service.durationMinutes).toBeGreaterThanOrEqual(15);
      expect(service.imageUrl).toContain('http');
    });
  });
});
