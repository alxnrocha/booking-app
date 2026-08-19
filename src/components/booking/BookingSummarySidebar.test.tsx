import { describe, it, expect } from 'vitest';
import { MOCK_SERVICES } from '../../data/mockBookingData.ts';

describe('Booking Summary Financial Calculations', () => {
  it('should accurately calculate subtotal, VAT (22%) and total amount', () => {
    const service = MOCK_SERVICES[0]; // €120
    const serviceFee = 10.0;
    const promoDiscount = 25.0;

    const subtotal = service.price + serviceFee; // 130.00
    expect(subtotal).toBe(130.0);

    const vat = subtotal * 0.22; // 28.60
    expect(vat).toBeCloseTo(28.6, 2);

    const total = subtotal + vat - promoDiscount; // 133.60
    expect(total).toBeCloseTo(133.6, 2);
  });
});
