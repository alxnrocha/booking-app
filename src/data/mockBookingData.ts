import { Service, Specialist, TimeSlot, BookingRecord } from '../types/booking.ts';

export const MOCK_SERVICES: Service[] = [
  {
    id: 'srv-massage-01',
    name: 'Massage Therapy',
    category: 'massage',
    durationMinutes: 60,
    price: 120.0,
    description: 'Relaxing & therapeutic massage with organic aromatic oils to ease tension and restore balance.',
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
    badge: 'Popular',
  },
  {
    id: 'srv-hair-01',
    name: 'Hair Styling & Cut',
    category: 'hair',
    durationMinutes: 45,
    price: 85.0,
    description: 'Precision cut, bespoke style & premium blowout with botanical hair revitalizing treatments.',
    imageUrl: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'srv-facial-01',
    name: 'Facial Spa Deep Cleansing',
    category: 'facial',
    durationMinutes: 60,
    price: 110.0,
    description: 'Deep pore cleansing, ultrasonic hydration, and antioxidant facial massage for glowing skin.',
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    badge: 'Signature',
  },
  {
    id: 'srv-wellness-01',
    name: 'Aromatherapy Body Wrap',
    category: 'wellness',
    durationMinutes: 75,
    price: 145.0,
    description: 'Detoxifying volcanic mud wrap paired with lavender and eucalyptus warm steam immersion.',
    imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'srv-wellness-02',
    name: 'VIP Deluxe Head-to-Toe Retreat',
    category: 'wellness',
    durationMinutes: 120,
    price: 220.0,
    description: 'Full body signature massage, gold mask facial and custom botanical scalp therapy.',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    badge: 'VIP Exclusive',
  },
  {
    id: 'srv-facial-02',
    name: 'Cryo-Glow Lift & Tone',
    category: 'facial',
    durationMinutes: 50,
    price: 95.0,
    description: 'Cold therapy stimulation to boost collagen production, refine pores and reduce inflammation.',
    imageUrl: 'https://images.unsplash.com/photo-1512290900672-1f4a9b6c005e?auto=format&fit=crop&w=800&q=80',
  },
];

export const MOCK_SPECIALISTS: Specialist[] = [
  {
    id: 'spec-01',
    name: 'Isabella Moretti',
    title: 'Senior Wellness Therapist',
    specialty: 'Holistic Massage & Cryo Spa',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    rating: 4.9,
    reviewsCount: 128,
    bio: 'Over 9 years of luxury resort experience in Milan and Zurich specializing in deep restorative touch.',
    availableDays: [1, 2, 3, 4, 5, 6], // Mon - Sat
  },
  {
    id: 'spec-02',
    name: 'Matteo Rossi',
    title: 'Master Hair Stylist & Director',
    specialty: 'Precision Cuts & Color Couture',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    rating: 4.95,
    reviewsCount: 210,
    bio: 'Former editorial stylist for Milan Fashion Week, expert in custom textures and effortless elegance.',
    availableDays: [2, 3, 4, 5, 6], // Tue - Sat
  },
  {
    id: 'spec-03',
    name: 'Sofia Laurent',
    title: 'Advanced Esthetician',
    specialty: 'Dermatological Facials & Glow Lift',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    rating: 4.88,
    reviewsCount: 94,
    bio: 'Certified master in French lymphatic drainage and advanced non-invasive skin regeneration.',
    availableDays: [1, 2, 3, 4, 5], // Mon - Fri
  },
  {
    id: 'spec-04',
    name: 'Elena Vance',
    title: 'Holistic Body Specialist',
    specialty: 'Aromatherapy & Stress Relief',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    rating: 4.92,
    reviewsCount: 115,
    bio: 'Dedicated to mind-body equilibrium utilizing ancient herbal botanical infusions and pressure therapy.',
    availableDays: [1, 3, 4, 5, 6],
  },
];

export const MOCK_SPA_LOCATION = {
  name: 'Aura Wellness & Spa',
  address: '123 Luxury Avenue, Quadrilatero della Moda',
  city: 'Milan, Italy',
  postalCode: '20121',
  coordinates: { lat: 45.4685, lng: 9.1978 },
};

export const DEFAULT_SERVICE_FEE = 10.0;
export const DEFAULT_VAT_RATE = 0.22; // 22%
export const DEFAULT_PROMO_DISCOUNT = 25.0;

export function generateDailyTimeSlots(dateString: string, specialistId?: string): TimeSlot[] {
  const morningTimes = ['09:00 AM', '10:00 AM', '11:00 AM'];
  const afternoonTimes = ['12:00 PM', '01:30 PM', '03:00 PM', '04:30 PM'];
  const eveningTimes = ['05:30 PM', '07:00 PM', '08:00 PM'];

  const slots: TimeSlot[] = [];

  morningTimes.forEach((time, index) => {
    slots.push({
      id: `slot-${dateString}-m-${index}`,
      time,
      period: 'morning',
      isAvailable: index !== 1, // e.g. 10:00 AM booked
      professionalId: specialistId,
      date: dateString,
    });
  });

  afternoonTimes.forEach((time, index) => {
    slots.push({
      id: `slot-${dateString}-a-${index}`,
      time,
      period: 'afternoon',
      isAvailable: true,
      professionalId: specialistId,
      date: dateString,
    });
  });

  eveningTimes.forEach((time, index) => {
    slots.push({
      id: `slot-${dateString}-e-${index}`,
      time,
      period: 'evening',
      isAvailable: index !== 2, // e.g. 08:00 PM booked
      professionalId: specialistId,
      date: dateString,
    });
  });

  return slots;
}

export const INITIAL_SAMPLE_BOOKING: BookingRecord = {
  id: 'book-sample-01',
  bookingCode: '#AUR-9482',
  customer: {
    fullName: 'Emma Johnson',
    email: 'emma.johnson@email.com',
    phoneCountryCode: '+39',
    phoneNumber: '312 345 6789',
    specialRequests: 'I have sensitive skin, please use gentle products. Thank you!',
    marketingConsent: true,
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
    specialistId: 'spec-01',
    specialistName: 'Isabella Moretti',
    specialistTitle: 'Senior Wellness Therapist',
    specialistAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    specialistRating: 4.9,
    bookingDate: '2025-05-15',
    bookingTime: '12:00 PM',
  },
  status: 'confirmed',
  location: MOCK_SPA_LOCATION,
  qrPayload: 'AURA-RESERVATION:AUR-9482:EMMA_JOHNSON:2025-05-15:12:00',
  paymentMethodDetails: {
    type: 'card',
    brand: 'Mastercard',
    last4: '4242',
    status: 'paid',
  },
  createdAt: '2025-05-10T14:32:00.000Z',
};
