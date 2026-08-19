import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Navbar } from './components/layout/Navbar.tsx';
import { BookingStepper } from './components/booking/BookingStepper.tsx';
import { ServiceSelectionStep } from './components/booking/ServiceSelectionStep.tsx';
import { DateTimeStep } from './components/booking/DateTimeStep.tsx';
import { CustomerDetailsStep } from './components/booking/CustomerDetailsStep.tsx';
import { BookingSummarySidebar } from './components/booking/BookingSummarySidebar.tsx';
import { ConfirmationStep } from './components/booking/ConfirmationStep.tsx';
import {
  MOCK_SERVICES,
  MOCK_SPECIALISTS,
  generateDailyTimeSlots,
  MOCK_SPA_LOCATION,
  DEFAULT_SERVICE_FEE,
  DEFAULT_PROMO_DISCOUNT,
} from './data/mockBookingData.ts';
import {
  Service,
  Specialist,
  StepNumber,
  TimeSlotPeriod,
  PaymentPreference,
  BookingRecord,
} from './types/booking.ts';
import { customerDetailsSchema, CustomerDetailsFormData } from './schemas/bookingSchema.ts';

export default function App(): React.JSX.Element {
  const [currentStep, setCurrentStep] = useState<StepNumber>(1);
  const [selectedService, setSelectedService] = useState<Service | null>(MOCK_SERVICES[0]);
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist>(MOCK_SPECIALISTS[0]);
  const [selectedDate, setSelectedDate] = useState<string>('2025-05-15');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('12:00 PM');
  const [selectedPeriod, setSelectedPeriod] = useState<TimeSlotPeriod>('afternoon');
  const [paymentPreference, setPaymentPreference] = useState<PaymentPreference>('pay_now');
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const slots = generateDailyTimeSlots(selectedDate, selectedSpecialist.id);

  const form = useForm<CustomerDetailsFormData>({
    resolver: zodResolver(customerDetailsSchema),
    defaultValues: {
      fullName: 'Emma Johnson',
      email: 'emma.johnson@email.com',
      phoneCountryCode: '+39',
      phoneNumber: '312 345 6789',
      specialRequests: 'I have sensitive skin, please use gentle products. Thank you!',
      marketingConsent: true,
      paymentPreference: 'pay_now',
    },
    mode: 'onChange',
  });

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!selectedService) return;
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!selectedTimeSlot) return;
      setCurrentStep(3);
    } else if (currentStep === 3) {
      form.handleSubmit(onSubmitForm)();
    }
  };

  const handleBack = () => {
    if (currentStep === 4) {
      // Reset flow
      setCurrentStep(1);
      setConfirmedBooking(null);
    } else if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as StepNumber);
    }
  };

  const onSubmitForm = (data: CustomerDetailsFormData) => {
    if (!selectedService || !selectedSpecialist) return;
    setIsSubmitting(true);

    const subtotal = selectedService.price + DEFAULT_SERVICE_FEE;
    const vatRate = 0.22;
    const vatAmount = subtotal * vatRate;
    const totalAmount = Math.max(0, subtotal + vatAmount - DEFAULT_PROMO_DISCOUNT);

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const bookingCode = `#AUR-${randomNum}`;

    const newBooking: BookingRecord = {
      id: `book-${Date.now()}`,
      bookingCode,
      customer: {
        fullName: data.fullName,
        email: data.email,
        phoneCountryCode: data.phoneCountryCode,
        phoneNumber: data.phoneNumber,
        specialRequests: data.specialRequests,
        marketingConsent: data.marketingConsent,
        paymentPreference: data.paymentPreference,
      },
      summary: {
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        serviceCategory: selectedService.category,
        durationMinutes: selectedService.durationMinutes,
        servicePrice: selectedService.price,
        serviceFee: DEFAULT_SERVICE_FEE,
        subtotal,
        vatRate,
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
      },
      status: 'confirmed',
      location: MOCK_SPA_LOCATION,
      qrPayload: `AURA-RESERVATION:${bookingCode}:${data.fullName.replace(/\s+/g, '_')}:${selectedDate}:${selectedTimeSlot}`,
      paymentMethodDetails: {
        type: 'card',
        brand: 'Mastercard',
        last4: '4242',
        status: data.paymentPreference === 'pay_now' ? 'paid' : 'pending',
      },
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      setConfirmedBooking(newBooking);
      setIsSubmitting(false);
      setCurrentStep(4);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-100 flex flex-col selection:bg-[#E5B56A]/20 selection:text-[#E5B56A]">
      {/* 1. Luxury Brand Navbar */}
      <Navbar
        onNavigateHome={() => setCurrentStep(1)}
        onOpenMyBookings={() => {
          if (confirmedBooking) setCurrentStep(4);
          else alert('No active confirmed booking yet. Complete your reservation first!');
        }}
      />

      {/* 2. Stepper Progress Bar */}
      <BookingStepper
        currentStep={currentStep}
        onStepClick={(step) => setCurrentStep(step)}
        onBack={handleBack}
      />

      {/* 3. Main Dynamic Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep < 4 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Steps Area (8 cols on lg) */}
            <div className="lg:col-span-8 space-y-6">
              {currentStep === 1 && (
                <ServiceSelectionStep
                  services={MOCK_SERVICES}
                  selectedService={selectedService}
                  onSelectService={(srv) => setSelectedService(srv)}
                />
              )}

              {currentStep === 2 && (
                <DateTimeStep
                  selectedDate={selectedDate}
                  selectedTimeSlot={selectedTimeSlot}
                  selectedPeriod={selectedPeriod}
                  specialist={selectedSpecialist}
                  allSpecialists={MOCK_SPECIALISTS}
                  slots={slots}
                  onSelectDate={setSelectedDate}
                  onSelectSlot={setSelectedTimeSlot}
                  onSelectPeriod={setSelectedPeriod}
                  onSelectSpecialist={setSelectedSpecialist}
                />
              )}

              {currentStep === 3 && (
                <CustomerDetailsStep
                  form={form}
                  paymentPreference={paymentPreference}
                  onSelectPaymentPreference={(pref) => {
                    setPaymentPreference(pref);
                    form.setValue('paymentPreference', pref);
                  }}
                />
              )}
            </div>

            {/* Right Sticky Summary Sidebar (4 cols on lg) */}
            <div className="lg:col-span-4">
              <BookingSummarySidebar
                currentStep={currentStep}
                service={selectedService}
                specialist={selectedSpecialist}
                selectedDate={selectedDate}
                selectedTime={selectedTimeSlot}
                onContinue={handleNextStep}
                onEditStep={(step) => setCurrentStep(step)}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        ) : (
          /* Step 4: Full Confirmation & Ticket View */
          confirmedBooking && (
            <ConfirmationStep
              booking={confirmedBooking}
              onViewMyBookings={() => alert(`Showing active reservation ${confirmedBooking.bookingCode}`)}
              onBookAnother={() => {
                setCurrentStep(1);
                setConfirmedBooking(null);
              }}
            />
          )
        )}
      </main>
    </div>
  );
}
