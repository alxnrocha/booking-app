export type ServiceCategory = 'all' | 'massage' | 'hair' | 'facial' | 'wellness';

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  durationMinutes: number;
  price: number;
  description: string;
  imageUrl: string;
  badge?: string;
}

export interface Specialist {
  id: string;
  name: string;
  title: string;
  specialty: string;
  avatarUrl: string;
  rating: number;
  reviewsCount: number;
  bio: string;
  availableDays: number[]; // 0 = Sunday, 1 = Monday, ... 6 = Saturday
}

export type TimeSlotPeriod = 'morning' | 'afternoon' | 'evening';

export interface TimeSlot {
  id: string;
  time: string; // e.g. "09:00 AM", "12:00 PM"
  period: TimeSlotPeriod;
  isAvailable: boolean;
  professionalId?: string;
  date?: string; // YYYY-MM-DD
}

export type PaymentPreference = 'pay_now' | 'pay_at_venue';

export interface CustomerDetails {
  fullName: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  specialRequests?: string;
  marketingConsent: boolean;
  paymentPreference: PaymentPreference;
}

export type BookingStatus = 'confirmed' | 'pending' | 'cancelled' | 'completed';

export interface BookingSummary {
  serviceId: string;
  serviceName: string;
  serviceCategory: ServiceCategory;
  durationMinutes: number;
  servicePrice: number;
  serviceFee: number;
  subtotal: number;
  vatRate: number; // 0.22 = 22%
  vatAmount: number;
  promoDiscount: number;
  totalAmount: number;
  specialistId: string;
  specialistName: string;
  specialistTitle: string;
  specialistAvatar: string;
  specialistRating: number;
  bookingDate: string; // YYYY-MM-DD
  bookingTime: string; // e.g. "12:00 PM"
}

export interface BookingRecord {
  id: string;
  bookingCode: string; // e.g. "#AUR-9482"
  customer: CustomerDetails;
  summary: BookingSummary;
  status: BookingStatus;
  location: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    coordinates?: { lat: number; lng: number };
  };
  qrPayload: string;
  paymentMethodDetails?: {
    type: 'card' | 'apple_pay' | 'google_pay' | 'venue';
    brand?: string;
    last4?: string;
    status: 'paid' | 'pending';
  };
  createdAt: string;
}

export type StepNumber = 1 | 2 | 3 | 4;

export interface BookingState {
  currentStep: StepNumber;
  selectedService: Service | null;
  selectedSpecialist: Specialist | null;
  selectedDate: string; // YYYY-MM-DD
  selectedTimeSlot: string; // e.g. "12:00 PM"
  selectedPeriod: TimeSlotPeriod;
  customerDetails: CustomerDetails;
  confirmedBooking: BookingRecord | null;
}
