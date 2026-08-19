import { describe, it, expect } from 'vitest';
import { INITIAL_SAMPLE_BOOKING } from '../../data/mockBookingData.ts';

describe('Confirmation Step and Voucher', () => {
  it('should have valid voucher code and qr payload', () => {
    const booking = INITIAL_SAMPLE_BOOKING;
    expect(booking.bookingCode).toMatch(/^#AUR-\d{4}$/);
    expect(booking.qrPayload).toContain('AURA-RESERVATION');
    expect(booking.location.name).toBe('Aura Wellness & Spa');
  });
});
