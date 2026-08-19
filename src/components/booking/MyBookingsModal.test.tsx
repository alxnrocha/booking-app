import { describe, it, expect } from 'vitest';
import { useBookingStore } from '../../stores/useBookingStore.ts';
import { INITIAL_SAMPLE_BOOKING } from '../../data/mockBookingData.ts';

describe('MyBookingsModal & Store Integration', () => {
  it('should list confirmed bookings and allow search filtering by booking code', () => {
    const state = useBookingStore.getState();
    expect(state.confirmedBookings.length).toBeGreaterThan(0);

    const query = '#AUR-9482';
    const found = state.confirmedBookings.filter((b) => b.bookingCode.includes(query));
    expect(found.length).toBe(1);
    expect(found[0].customer.fullName).toBe('Emma Johnson');
  });

  it('should toggle myBookingsModalOpen state in store', () => {
    useBookingStore.getState().setMyBookingsModalOpen(true);
    expect(useBookingStore.getState().isMyBookingsModalOpen).toBe(true);

    useBookingStore.getState().setMyBookingsModalOpen(false);
    expect(useBookingStore.getState().isMyBookingsModalOpen).toBe(false);
  });

  it('should handle cancel booking and toggle status to cancelled', () => {
    const booking = {
      ...INITIAL_SAMPLE_BOOKING,
      bookingCode: '#CANCEL-TEST',
      status: 'confirmed' as const,
    };
    useBookingStore.getState().confirmBooking(booking);

    const cancelled = useBookingStore.getState().cancelBooking('#CANCEL-TEST');
    expect(cancelled).toBe(true);

    const updated = useBookingStore
      .getState()
      .confirmedBookings.find((b) => b.bookingCode === '#CANCEL-TEST');
    expect(updated?.status).toBe('cancelled');
  });
});
