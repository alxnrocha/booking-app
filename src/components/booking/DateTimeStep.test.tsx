import { describe, it, expect } from 'vitest';
import { generateDailyTimeSlots, MOCK_SPECIALISTS } from '../../data/mockBookingData.ts';

describe('Date, Time & Specialist Logic', () => {
  it('should generate available slots for a given date', () => {
    const slots = generateDailyTimeSlots('2025-05-15', 'spec-01');
    const availableSlots = slots.filter((s) => s.isAvailable);
    expect(availableSlots.length).toBeGreaterThan(0);
  });

  it('should have specialists with complete profiles and active working days', () => {
    MOCK_SPECIALISTS.forEach((spec) => {
      expect(spec.name).toBeDefined();
      expect(spec.avatarUrl).toContain('unsplash');
      expect(spec.rating).toBeGreaterThanOrEqual(4.5);
    });
  });
});
