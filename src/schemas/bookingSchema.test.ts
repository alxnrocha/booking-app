import { describe, it, expect } from 'vitest';
import { customerDetailsSchema } from './bookingSchema.ts';

describe('Customer Details Zod Validation', () => {
  it('should validate complete valid customer input', () => {
    const validData = {
      fullName: 'Emma Johnson',
      email: 'emma.johnson@email.com',
      phoneCountryCode: '+39',
      phoneNumber: '312 345 6789',
      specialRequests: 'I have sensitive skin, please use gentle products.',
      marketingConsent: true,
      paymentPreference: 'pay_now',
    };

    const result = customerDetailsSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject invalid email formats', () => {
    const invalidEmailData = {
      fullName: 'Emma Johnson',
      email: 'invalid-email-address',
      phoneCountryCode: '+39',
      phoneNumber: '312 345 6789',
      paymentPreference: 'pay_now',
    };

    const result = customerDetailsSchema.safeParse(invalidEmailData);
    expect(result.success).toBe(false);
  });

  it('should reject too short full name', () => {
    const shortNameData = {
      fullName: 'A',
      email: 'emma@test.com',
      phoneCountryCode: '+39',
      phoneNumber: '312 345 6789',
      paymentPreference: 'pay_now',
    };

    const result = customerDetailsSchema.safeParse(shortNameData);
    expect(result.success).toBe(false);
  });

  it('should reject invalid payment preference', () => {
    const badPaymentData = {
      fullName: 'Emma Johnson',
      email: 'emma@test.com',
      phoneCountryCode: '+39',
      phoneNumber: '312 345 6789',
      paymentPreference: 'bitcoin_unsupported',
    };

    const result = customerDetailsSchema.safeParse(badPaymentData);
    expect(result.success).toBe(false);
  });
});
