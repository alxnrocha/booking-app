import { z } from 'zod';

export const customerDetailsSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must have at least 2 characters')
    .max(100, 'Full name must not exceed 100 characters')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Full name contains invalid characters'),
  email: z
    .string()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address'),
  phoneCountryCode: z
    .string()
    .min(1, 'Country code is required'),
  phoneNumber: z
    .string()
    .min(6, 'Phone number must have at least 6 digits')
    .max(20, 'Phone number must not exceed 20 digits')
    .regex(/^[\d\s\-().]+$/, 'Phone number must contain only numbers and formatting'),
  specialRequests: z
    .string()
    .max(250, 'Special requests cannot exceed 250 characters')
    .optional(),
  marketingConsent: z
    .boolean()
    .default(false),
  paymentPreference: z
    .enum(['pay_now', 'pay_at_venue'], {
      required_error: 'Please select a payment preference',
    }),
});

export type CustomerDetailsFormData = z.infer<typeof customerDetailsSchema>;
