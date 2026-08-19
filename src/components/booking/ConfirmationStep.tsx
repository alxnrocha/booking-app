import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Check } from 'lucide-react';
import { BookingRecord } from '../../types/booking.ts';
import { VoucherTicket } from './VoucherTicket.tsx';
import { PaymentSummary } from './PaymentSummary.tsx';

interface ConfirmationStepProps {
  booking: BookingRecord;
  onViewMyBookings?: () => void;
  onBookAnother?: () => void;
}

export const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  booking,
  onViewMyBookings,
  onBookAnother,
}) => {
  // Trigger luxury celebration confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.3 },
        colors: ['#E5B56A', '#D99D48', '#FCF9F2', '#10B981'],
        disableForReducedMotion: true,
      });
    } catch {
      // Ignore if in test runner without canvas
    }
  }, []);

  const handleDownloadVoucher = () => {
    window.print();
  };

  const handleAddToCalendar = () => {
    const { summary } = booking;
    const title = encodeURIComponent(`Aura Spa: ${summary.serviceName}`);
    const details = encodeURIComponent(
      `Reservation code: ${booking.bookingCode}\nSpecialist: ${summary.specialistName}\nLocation: ${booking.location.address}, ${booking.location.city}`
    );
    const location = encodeURIComponent(`${booking.location.name}, ${booking.location.address}`);
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(gCalUrl, '_blank', 'noopener,noreferrer');
  };

  const handleAddToWallet = () => {
    alert(`Pass ${booking.bookingCode} sent to your registered digital pass repository.`);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Success Banner */}
      <div className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#182030] via-[#121824] to-[#0B0E14] border border-[#E5B56A]/30 shadow-[0_0_25px_rgba(229,181,106,0.15)]">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#E5B56A] to-[#FCF9F2] text-[#0B0E14] flex items-center justify-center shadow-[0_0_15px_rgba(229,181,106,0.6)] shrink-0">
          <Check className="w-7 h-7 stroke-[3]" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
            Booking Confirmed!
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Your appointment is all set. We look forward to welcoming you at{' '}
            <span className="text-[#E5B56A] font-semibold">Aura Wellness & Spa</span>.
          </p>
        </div>
      </div>

      {/* Main Grid: Ticket + Financial Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Boarding Pass Ticket (7 cols) */}
        <div className="lg:col-span-7">
          <VoucherTicket
            booking={booking}
            onDownloadVoucher={handleDownloadVoucher}
            onAddToCalendar={handleAddToCalendar}
            onAddToWallet={handleAddToWallet}
          />
        </div>

        {/* Payment Summary (5 cols) */}
        <div className="lg:col-span-5">
          <PaymentSummary
            booking={booking}
            onViewMyBookings={onViewMyBookings}
            onBookAnother={onBookAnother}
          />
        </div>
      </div>
    </div>
  );
};
