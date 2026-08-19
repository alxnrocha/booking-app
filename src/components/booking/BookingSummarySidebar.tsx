import React from 'react';
import { Calendar, ArrowRight, Star, ShieldCheck, Tag } from 'lucide-react';
import { Service, Specialist, StepNumber } from '../../types/booking.ts';

interface BookingSummarySidebarProps {
  currentStep: StepNumber;
  service: Service | null;
  specialist: Specialist | null;
  selectedDate: string;
  selectedTime: string;
  serviceFee?: number;
  promoDiscount?: number;
  onContinue: () => void;
  onEditStep?: (step: StepNumber) => void;
  isSubmitting?: boolean;
}

export const BookingSummarySidebar: React.FC<BookingSummarySidebarProps> = ({
  currentStep,
  service,
  specialist,
  selectedDate,
  selectedTime,
  serviceFee = 10.0,
  promoDiscount = 25.0,
  onContinue,
  onEditStep,
  isSubmitting = false,
}) => {
  if (!service) {
    return (
      <div className="bg-[#121824]/90 p-6 rounded-2xl border border-slate-800 shadow-lg text-center space-y-3">
        <div className="text-slate-400 text-sm font-medium">
          Select a service to view your live reservation summary.
        </div>
      </div>
    );
  }

  const subtotal = service.price + serviceFee;
  const vatRate = 0.22;
  const vatAmount = subtotal * vatRate;
  const totalAmount = Math.max(0, subtotal + vatAmount - promoDiscount);

  // Format date for readable display (e.g. "15 May 2025, Thursday")
  const dateObj = new Date(selectedDate);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    weekday: 'long',
  };
  const formattedDate = !isNaN(dateObj.getTime())
    ? new Intl.DateTimeFormat('en-GB', options).format(dateObj)
    : selectedDate;

  return (
    <div className="bg-[#121824]/95 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-5 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-base font-serif font-bold text-white tracking-wide">
          Booking Summary
        </h3>
        {currentStep > 1 && onEditStep && (
          <button
            type="button"
            onClick={() => onEditStep(1)}
            className="text-xs font-semibold text-[#E5B56A] hover:underline cursor-pointer"
          >
            Edit
          </button>
        )}
      </div>

      {/* Chosen Service Card */}
      <div className="flex items-center gap-3.5 p-3 rounded-xl bg-[#0B0E14]/80 border border-slate-800/80">
        <img
          src={service.imageUrl}
          alt={service.name}
          className="w-14 h-14 rounded-lg object-cover ring-1 ring-slate-700 shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="text-xs font-bold text-white truncate">
            {service.name}
          </div>
          <div className="text-[11px] text-slate-400 truncate">
            {service.description}
          </div>
          <div className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
            {service.durationMinutes} min
          </div>
        </div>
      </div>

      {/* Chosen Specialist */}
      {specialist && (
        <div className="space-y-1.5 pt-1">
          <span className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider">
            Specialist
          </span>
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0B0E14]/60 border border-slate-800">
            <div className="flex items-center gap-2.5">
              <img
                src={specialist.avatarUrl}
                alt={specialist.name}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-[#E5B56A]/60"
              />
              <div>
                <div className="text-xs font-bold text-white">{specialist.name}</div>
                <div className="text-[10px] text-slate-400">{specialist.title}</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#E5B56A] font-bold">
              <Star className="w-3 h-3 fill-[#E5B56A]" />
              <span>{specialist.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Date & Time Badge */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider">
          Date & Time
        </span>
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0B0E14]/60 border border-slate-800 text-xs text-white">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#E5B56A]" />
            <span className="font-medium text-slate-200">{formattedDate}</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E5B56A]/10 text-[#E5B56A] border border-[#E5B56A]/30">
            {selectedTime}
          </span>
        </div>
      </div>

      {/* Pricing Breakdown */}
      <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
        <div className="flex justify-between text-slate-300">
          <span>{service.name} ({service.durationMinutes} min)</span>
          <span className="font-semibold text-white">€{service.price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span>Service Fee</span>
          <span>€{serviceFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span>Subtotal</span>
          <span>€{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span>VAT (22%)</span>
          <span>€{vatAmount.toFixed(2)}</span>
        </div>
        {promoDiscount > 0 && (
          <div className="flex justify-between text-emerald-400 font-semibold">
            <span className="inline-flex items-center gap-1">
              <Tag className="w-3 h-3" />
              <span>Promo Discount</span>
            </span>
            <span>-€{promoDiscount.toFixed(2)}</span>
          </div>
        )}

        {/* Total Amount in Gold */}
        <div className="flex justify-between items-baseline pt-3 border-t border-slate-800">
          <span className="text-sm font-bold text-white">Total Amount</span>
          <span className="text-xl font-serif font-bold text-[#E5B56A]">
            €{totalAmount.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Main CTA Button */}
      <div className="pt-2 space-y-2">
        <button
          type="button"
          onClick={onContinue}
          disabled={isSubmitting}
          className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-[#0B0E14] bg-gradient-to-r from-[#E5B56A] via-[#D99D48] to-[#FCF9F2] hover:shadow-[0_0_25px_rgba(229,181,106,0.5)] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {currentStep === 1 && (
            <>
              <span>Continue to Schedule</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
          {currentStep === 2 && (
            <>
              <span>Continue to Details</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
          {currentStep === 3 && (
            <>
              <span>{isSubmitting ? 'Confirming...' : 'Confirm Booking'}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
          {currentStep === 4 && (
            <>
              <span>Book Another Treatment</span>
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>You won't be charged yet</span>
        </div>
      </div>
    </div>
  );
};
