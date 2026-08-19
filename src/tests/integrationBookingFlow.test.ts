import { describe, it, expect, beforeEach } from 'vitest';
import { useBookingStore } from '../stores/useBookingStore.ts';
import { MOCK_SERVICES, MOCK_SPECIALISTS, MOCK_SPA_LOCATION } from '../data/mockBookingData.ts';
import { customerDetailsSchema } from '../schemas/bookingSchema.ts';
import {
  getAvailableSlotsForSpecialist,
  calculateEndTime,
  isSlotDoubleBooked,
} from '../utils/schedulingEngine.ts';
import { BookingRecord } from '../types/booking.ts';

describe('Integration: End-to-End Booking Flow & Business Rules', () => {
  beforeEach(() => {
    useBookingStore.getState().resetDraft();
  });

  it('should complete the entire 4-step booking lifecycle', () => {
    const store = useBookingStore.getState();

    // Step 1: Service Selection
    expect(store.currentStep).toBe(1);
    const chosenService = MOCK_SERVICES.find((s) => s.id === 'srv-facial-01');
    expect(chosenService).toBeDefined();
    if (chosenService) {
      store.setService(chosenService);
    }
    expect(useBookingStore.getState().selectedService?.name).toBe('Facial Spa Deep Cleansing');
    store.nextStep();
    expect(useBookingStore.getState().currentStep).toBe(2);

    // Step 2: Date & Specialist Selection
    const chosenSpecialist = MOCK_SPECIALISTS.find((s) => s.id === 'spec-03'); // Sofia Laurent
    expect(chosenSpecialist).toBeDefined();
    if (chosenSpecialist) {
      store.setSpecialist(chosenSpecialist);
    }
    store.setDate('2025-05-20');
    store.setTimeSlot('03:00 PM');
    store.nextStep();
    expect(useBookingStore.getState().currentStep).toBe(3);

    // Step 3: Customer Details & Form Validation
    const customerPayload = {
      fullName: 'Lucas Silva',
      email: 'lucas.silva@luxuryclub.com',
      phoneCountryCode: '+55',
      phoneNumber: '11 98765 4321',
      specialRequests: 'Prefer natural fragrance oils.',
      marketingConsent: true,
      paymentPreference: 'pay_now' as const,
    };

    const zodValidation = customerDetailsSchema.safeParse(customerPayload);
    expect(zodValidation.success).toBe(true);

    store.setCustomerDetails(customerPayload);
    const summary = useBookingStore.getState().calculateSummary();
    expect(summary).not.toBeNull();

    // Step 4: Booking Confirmation & Ticket Generation
    if (summary && chosenService && chosenSpecialist) {
      const newBookingRecord: BookingRecord = {
        id: 'book-e2e-001',
        bookingCode: '#AUR-7788',
        customer: customerPayload,
        summary,
        status: 'confirmed',
        location: MOCK_SPA_LOCATION,
        qrPayload: 'AURA-RESERVATION:#AUR-7788:LUCAS_SILVA:2025-05-20:03:00',
        paymentMethodDetails: {
          type: 'card',
          brand: 'Visa',
          last4: '9988',
          status: 'paid',
        },
        createdAt: new Date().toISOString(),
      };

      store.confirmBooking(newBookingRecord);
    }

    expect(useBookingStore.getState().currentStep).toBe(4);
    expect(useBookingStore.getState().activeBookingCode).toBe('#AUR-7788');
    expect(
      useBookingStore.getState().confirmedBookings.some((b) => b.bookingCode === '#AUR-7788')
    ).toBe(true);
  });

  it('should calculate accurate end times for treatments of all durations', () => {
    expect(calculateEndTime('09:00 AM', 45)).toBe('09:45 AM'); // Hair
    expect(calculateEndTime('12:00 PM', 60)).toBe('01:00 PM'); // Massage
    expect(calculateEndTime('01:30 PM', 75)).toBe('02:45 PM'); // Body Wrap
    expect(calculateEndTime('03:00 PM', 120)).toBe('05:00 PM'); // VIP Deluxe
  });

  it('should lock booked slots and release them immediately when cancelled', () => {
    const specialist = MOCK_SPECIALISTS[0]; // Isabella Moretti
    const testDate = '2025-05-22'; // Thursday (working day)
    const testTime = '10:00 AM';

    const testBooking: BookingRecord = {
      id: 'book-concurrency-test',
      bookingCode: '#AUR-9900',
      customer: {
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        phoneCountryCode: '+1',
        phoneNumber: '555 123 4567',
        marketingConsent: false,
        paymentPreference: 'pay_now',
      },
      summary: {
        serviceId: 'srv-massage-01',
        serviceName: 'Massage Therapy',
        serviceCategory: 'massage',
        durationMinutes: 60,
        servicePrice: 120.0,
        serviceFee: 10.0,
        subtotal: 130.0,
        vatRate: 0.22,
        vatAmount: 28.6,
        promoDiscount: 25.0,
        totalAmount: 133.6,
        specialistId: specialist.id,
        specialistName: specialist.name,
        specialistTitle: specialist.title,
        specialistAvatar: specialist.avatarUrl,
        specialistRating: specialist.rating,
        bookingDate: testDate,
        bookingTime: testTime,
      },
      status: 'confirmed',
      location: MOCK_SPA_LOCATION,
      qrPayload: 'test-qr',
      createdAt: new Date().toISOString(),
    };

    useBookingStore.getState().confirmBooking(testBooking);

    // Verify slot is locked
    const activeBookings = useBookingStore.getState().confirmedBookings;
    const isLocked = isSlotDoubleBooked(specialist.id, testDate, testTime, activeBookings);
    expect(isLocked).toBe(true);

    const slotsBeforeCancel = getAvailableSlotsForSpecialist(specialist, testDate, activeBookings);
    const lockedSlot = slotsBeforeCancel.find((s) => s.time === testTime);
    expect(lockedSlot?.isAvailable).toBe(false);

    // Cancel reservation
    useBookingStore.getState().cancelBooking('#AUR-9900');

    // Verify slot is now unlocked and available again
    const bookingsAfterCancel = useBookingStore.getState().confirmedBookings;
    const isNowUnlocked = isSlotDoubleBooked(specialist.id, testDate, testTime, bookingsAfterCancel);
    expect(isNowUnlocked).toBe(false);

    const slotsAfterCancel = getAvailableSlotsForSpecialist(specialist, testDate, bookingsAfterCancel);
    const releasedSlot = slotsAfterCancel.find((s) => s.time === testTime);
    expect(releasedSlot?.isAvailable).toBe(true);
  });
});
