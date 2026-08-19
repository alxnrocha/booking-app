import { describe, it, expect, beforeEach } from 'vitest';
import { useBookingStore } from './useBookingStore.ts';
import { MOCK_SERVICES, MOCK_SPECIALISTS } from '../data/mockBookingData.ts';

describe('useBookingStore', () => {
  beforeEach(() => {
    useBookingStore.getState().resetDraft();
  });

  it('should initialize with default step 1 and default selected service', () => {
    const state = useBookingStore.getState();
    expect(state.currentStep).toBe(1);
    expect(state.selectedService?.id).toBe(MOCK_SERVICES[0].id);
    expect(state.selectedSpecialist?.id).toBe(MOCK_SPECIALISTS[0].id);
  });

  it('should transition steps forward and backward correctly', () => {
    useBookingStore.getState().nextStep();
    expect(useBookingStore.getState().currentStep).toBe(2);

    useBookingStore.getState().nextStep();
    expect(useBookingStore.getState().currentStep).toBe(3);

    useBookingStore.getState().prevStep();
    expect(useBookingStore.getState().currentStep).toBe(2);
  });

  it('should update service, specialist and calculate summary accurately', () => {
    const newService = MOCK_SERVICES[1]; // €85
    useBookingStore.getState().setService(newService);
    expect(useBookingStore.getState().selectedService?.id).toBe(newService.id);

    const summary = useBookingStore.getState().calculateSummary();
    expect(summary).not.toBeNull();
    if (summary) {
      expect(summary.servicePrice).toBe(85);
      expect(summary.subtotal).toBe(95); // 85 + 10 fee
    }
  });

  it('should allow confirming and cancelling bookings', () => {
    const store = useBookingStore.getState();
    const testCode = '#TEST-9999';
    const mockRecord = {
      ...store.confirmedBookings[0],
      id: 'test-id',
      bookingCode: testCode,
      status: 'confirmed' as const,
    };

    store.confirmBooking(mockRecord);
    expect(useBookingStore.getState().confirmedBookings.some((b) => b.bookingCode === testCode)).toBe(true);

    const cancelled = useBookingStore.getState().cancelBooking(testCode);
    expect(cancelled).toBe(true);
    const found = useBookingStore.getState().confirmedBookings.find((b) => b.bookingCode === testCode);
    expect(found?.status).toBe('cancelled');
  });
});
