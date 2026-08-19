import { describe, it, expect } from 'vitest';
import { MOCK_SERVICES, MOCK_SPECIALISTS, generateDailyTimeSlots, INITIAL_SAMPLE_BOOKING } from '../data/mockBookingData.ts';

describe('Domain Modeling & Fixtures', () => {
  it('should have valid mock services with duration, price and categories', () => {
    expect(MOCK_SERVICES.length).toBeGreaterThan(0);
    MOCK_SERVICES.forEach((service) => {
      expect(service.id).toBeDefined();
      expect(service.price).toBeGreaterThan(0);
      expect(service.durationMinutes).toBeGreaterThan(0);
      expect(['massage', 'hair', 'facial', 'wellness']).toContain(service.category);
    });
  });

  it('should have valid specialists with ratings and available days', () => {
    expect(MOCK_SPECIALISTS.length).toBeGreaterThan(0);
    MOCK_SPECIALISTS.forEach((spec) => {
      expect(spec.rating).toBeGreaterThanOrEqual(1);
      expect(spec.rating).toBeLessThanOrEqual(5);
      expect(spec.availableDays.length).toBeGreaterThan(0);
    });
  });

  it('should generate time slots with morning, afternoon and evening periods', () => {
    const slots = generateDailyTimeSlots('2025-05-15', 'spec-01');
    expect(slots.length).toBeGreaterThan(0);
    const periods = new Set(slots.map((s) => s.period));
    expect(periods.has('morning')).toBe(true);
    expect(periods.has('afternoon')).toBe(true);
    expect(periods.has('evening')).toBe(true);
  });

  it('should have a consistent sample booking with matching financial totals', () => {
    const b = INITIAL_SAMPLE_BOOKING;
    expect(b.bookingCode).toBe('#AUR-9482');
    const expectedSubtotal = b.summary.servicePrice + b.summary.serviceFee;
    expect(b.summary.subtotal).toBe(expectedSubtotal);
  });
});
