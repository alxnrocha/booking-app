import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  Service,
  Specialist,
  StepNumber,
  TimeSlotPeriod,
  PaymentPreference,
  BookingRecord,
  CustomerDetails,
  BookingSummary,
} from '../types/booking.ts';
import {
  MOCK_SERVICES,
  MOCK_SPECIALISTS,
  INITIAL_SAMPLE_BOOKING,
  DEFAULT_SERVICE_FEE,
  DEFAULT_VAT_RATE,
  DEFAULT_PROMO_DISCOUNT,
} from '../data/mockBookingData.ts';

interface BookingStoreState {
  currentStep: StepNumber;
  selectedService: Service | null;
  selectedSpecialist: Specialist | null;
  selectedDate: string; // YYYY-MM-DD
  selectedTimeSlot: string; // e.g. "12:00 PM"
  selectedPeriod: TimeSlotPeriod;
  customerDetails: CustomerDetails;
  paymentPreference: PaymentPreference;
  confirmedBookings: BookingRecord[];
  activeBookingCode: string | null;
  isMyBookingsModalOpen: boolean;

  // Actions
  setStep: (step: StepNumber) => void;
  nextStep: () => void;
  prevStep: () => void;
  setService: (service: Service) => void;
  setSpecialist: (specialist: Specialist) => void;
  setDate: (date: string) => void;
  setTimeSlot: (timeSlot: string) => void;
  setPeriod: (period: TimeSlotPeriod) => void;
  setCustomerDetails: (details: Partial<CustomerDetails>) => void;
  setPaymentPreference: (pref: PaymentPreference) => void;
  confirmBooking: (booking: BookingRecord) => void;
  cancelBooking: (bookingCode: string) => boolean;
  setActiveBookingCode: (code: string | null) => void;
  setMyBookingsModalOpen: (isOpen: boolean) => void;
  resetDraft: () => void;

  // Computed / Helpers
  calculateSummary: () => BookingSummary | null;
}

const DEFAULT_CUSTOMER_DETAILS: CustomerDetails = {
  fullName: 'Emma Johnson',
  email: 'emma.johnson@email.com',
  phoneCountryCode: '+39',
  phoneNumber: '312 345 6789',
  specialRequests: 'I have sensitive skin, please use gentle products. Thank you!',
  marketingConsent: true,
  paymentPreference: 'pay_now',
};

const getSafeStorage = () => {
  if (typeof window !== 'undefined' && window.sessionStorage) {
    return window.sessionStorage;
  }
  const memoryStorage = new Map<string, string>();
  return {
    getItem: (key: string) => memoryStorage.get(key) || null,
    setItem: (key: string, value: string) => memoryStorage.set(key, value),
    removeItem: (key: string) => memoryStorage.delete(key),
    clear: () => memoryStorage.clear(),
    key: (index: number) => Array.from(memoryStorage.keys())[index] || null,
    length: memoryStorage.size,
  };
};

export const useBookingStore = create<BookingStoreState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      selectedService: MOCK_SERVICES[0],
      selectedSpecialist: MOCK_SPECIALISTS[0],
      selectedDate: '2025-05-15',
      selectedTimeSlot: '12:00 PM',
      selectedPeriod: 'afternoon',
      customerDetails: DEFAULT_CUSTOMER_DETAILS,
      paymentPreference: 'pay_now',
      confirmedBookings: [INITIAL_SAMPLE_BOOKING],
      activeBookingCode: null,
      isMyBookingsModalOpen: false,

      setStep: (step) => set({ currentStep: step }),

      nextStep: () => {
        const { currentStep } = get();
        if (currentStep < 4) {
          set({ currentStep: (currentStep + 1) as StepNumber });
        }
      },

      prevStep: () => {
        const { currentStep } = get();
        if (currentStep > 1) {
          set({ currentStep: (currentStep - 1) as StepNumber });
        }
      },

      setService: (service) => set({ selectedService: service }),

      setSpecialist: (specialist) => set({ selectedSpecialist: specialist }),

      setDate: (date) => set({ selectedDate: date }),

      setTimeSlot: (timeSlot) => set({ selectedTimeSlot: timeSlot }),

      setPeriod: (period) => set({ selectedPeriod: period }),

      setCustomerDetails: (details) =>
        set((state) => ({
          customerDetails: { ...state.customerDetails, ...details },
        })),

      setPaymentPreference: (pref) =>
        set((state) => ({
          paymentPreference: pref,
          customerDetails: { ...state.customerDetails, paymentPreference: pref },
        })),

      confirmBooking: (booking) =>
        set((state) => ({
          confirmedBookings: [booking, ...state.confirmedBookings.filter((b) => b.bookingCode !== booking.bookingCode)],
          activeBookingCode: booking.bookingCode,
          currentStep: 4,
        })),

      cancelBooking: (bookingCode) => {
        const { confirmedBookings } = get();
        const existing = confirmedBookings.find((b) => b.bookingCode === bookingCode);
        if (!existing) return false;

        const updated = confirmedBookings.map((b) =>
          b.bookingCode === bookingCode ? { ...b, status: 'cancelled' as const } : b
        );
        set({ confirmedBookings: updated });
        return true;
      },

      setActiveBookingCode: (code) => set({ activeBookingCode: code }),

      setMyBookingsModalOpen: (isOpen) => set({ isMyBookingsModalOpen: isOpen }),

      resetDraft: () =>
        set({
          currentStep: 1,
          selectedService: MOCK_SERVICES[0],
          selectedSpecialist: MOCK_SPECIALISTS[0],
          selectedDate: '2025-05-15',
          selectedTimeSlot: '12:00 PM',
          selectedPeriod: 'afternoon',
          customerDetails: DEFAULT_CUSTOMER_DETAILS,
          paymentPreference: 'pay_now',
          activeBookingCode: null,
        }),

      calculateSummary: () => {
        const { selectedService, selectedSpecialist, selectedDate, selectedTimeSlot } = get();
        if (!selectedService || !selectedSpecialist) return null;

        const subtotal = selectedService.price + DEFAULT_SERVICE_FEE;
        const vatAmount = subtotal * DEFAULT_VAT_RATE;
        const totalAmount = Math.max(0, subtotal + vatAmount - DEFAULT_PROMO_DISCOUNT);

        return {
          serviceId: selectedService.id,
          serviceName: selectedService.name,
          serviceCategory: selectedService.category,
          durationMinutes: selectedService.durationMinutes,
          servicePrice: selectedService.price,
          serviceFee: DEFAULT_SERVICE_FEE,
          subtotal,
          vatRate: DEFAULT_VAT_RATE,
          vatAmount,
          promoDiscount: DEFAULT_PROMO_DISCOUNT,
          totalAmount,
          specialistId: selectedSpecialist.id,
          specialistName: selectedSpecialist.name,
          specialistTitle: selectedSpecialist.title,
          specialistAvatar: selectedSpecialist.avatarUrl,
          specialistRating: selectedSpecialist.rating,
          bookingDate: selectedDate,
          bookingTime: selectedTimeSlot,
        };
      },
    }),
    {
      name: 'aura_booking_draft',
      storage: createJSONStorage(() => getSafeStorage()),
      partialize: (state) => ({
        currentStep: state.currentStep,
        selectedService: state.selectedService,
        selectedSpecialist: state.selectedSpecialist,
        selectedDate: state.selectedDate,
        selectedTimeSlot: state.selectedTimeSlot,
        selectedPeriod: state.selectedPeriod,
        customerDetails: state.customerDetails,
        paymentPreference: state.paymentPreference,
        confirmedBookings: state.confirmedBookings,
        activeBookingCode: state.activeBookingCode,
      }),
    }
  )
);
