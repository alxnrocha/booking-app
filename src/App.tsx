import React, { useState, useEffect } from 'react';
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
  MOCK_SPA_LOCATION,
} from './data/mockBookingData.ts';
import { getAvailableSlotsForSpecialist } from './utils/schedulingEngine.ts';
import { StepNumber, BookingRecord } from './types/booking.ts';
import { customerDetailsSchema, CustomerDetailsFormData } from './schemas/bookingSchema.ts';
import { useBookingStore } from './stores/useBookingStore.ts';

export default function App(): React.JSX.Element {
  const {
    currentStep,
    selectedService,
    selectedSpecialist,
    selectedDate,
    selectedTimeSlot,
    selectedPeriod,
    customerDetails,
    paymentPreference,
    confirmedBookings,
    activeBookingCode,
    setStep,
    setService,
    setSpecialist,
    setDate,
    setTimeSlot,
    setPeriod,
    setPaymentPreference,
    confirmBooking,
    resetDraft,
    calculateSummary,
    setMyBookingsModalOpen,
  } = useBookingStore();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const slots = selectedSpecialist
    ? getAvailableSlotsForSpecialist(selectedSpecialist, selectedDate, confirmedBookings)
    : [];

  const form = useForm<CustomerDetailsFormData>({
    resolver: zodResolver(customerDetailsSchema),
    defaultValues: customerDetails,
    mode: 'onChange',
  });

  // Sync form values if store customerDetails changes
  useEffect(() => {
    form.reset(customerDetails);
  }, [customerDetails, form]);

  const activeBooking = confirmedBookings.find((b) => b.bookingCode === activeBookingCode) || confirmedBookings[0];

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!selectedService) return;
      setStep(2);
    } else if (currentStep === 2) {
      if (!selectedTimeSlot) return;
      setStep(3);
    } else if (currentStep === 3) {
      form.handleSubmit(onSubmitForm)();
    }
  };

  const handleBack = () => {
    if (currentStep === 4) {
      resetDraft();
    } else if (currentStep > 1) {
      setStep((currentStep - 1) as StepNumber);
    }
  };

  const onSubmitForm = (data: CustomerDetailsFormData) => {
    const summary = calculateSummary();
    if (!summary || !selectedService || !selectedSpecialist) return;
    setIsSubmitting(true);

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const bookingCode = `#AUR-${randomNum}`;

    const newBooking: BookingRecord = {
      id: `book-${Date.now()}`,
      bookingCode,
      customer: data,
      summary,
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
      confirmBooking(newBooking);
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-100 flex flex-col selection:bg-[#E5B56A]/20 selection:text-[#E5B56A]">
      {/* 1. Luxury Brand Navbar */}
      <Navbar
        onNavigateHome={() => setStep(1)}
        onOpenMyBookings={() => setMyBookingsModalOpen(true)}
      />

      {/* 2. Stepper Progress Bar */}
      <BookingStepper
        currentStep={currentStep}
        onStepClick={(step) => setStep(step)}
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
                  onSelectService={(srv) => setService(srv)}
                />
              )}

              {currentStep === 2 && selectedSpecialist && (
                <DateTimeStep
                  selectedDate={selectedDate}
                  selectedTimeSlot={selectedTimeSlot}
                  selectedPeriod={selectedPeriod}
                  specialist={selectedSpecialist}
                  allSpecialists={MOCK_SPECIALISTS}
                  slots={slots}
                  onSelectDate={setDate}
                  onSelectSlot={setTimeSlot}
                  onSelectPeriod={setPeriod}
                  onSelectSpecialist={setSpecialist}
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
                onEditStep={(step) => setStep(step)}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        ) : (
          /* Step 4: Full Confirmation & Ticket View */
          activeBooking && (
            <ConfirmationStep
              booking={activeBooking}
              onViewMyBookings={() => setMyBookingsModalOpen(true)}
              onBookAnother={() => resetDraft()}
            />
          )
        )}
      </main>
    </div>
  );
}
