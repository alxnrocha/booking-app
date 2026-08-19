import React from 'react';
import { CreditCard, CheckCircle2, CalendarCheck, RotateCcw } from 'lucide-react';
import { BookingRecord } from '../../types/booking.ts';

interface PaymentSummaryProps {
  booking: BookingRecord;
  onViewMyBookings?: () => void;
  onBookAnother?: () => void;
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  booking,
  onViewMyBookings,
  onBookAnother,
}) => {
  const { summary, customer, paymentMethodDetails } = booking;

  return (
    <div className="bg-[#121824]/95 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
      {/* Title */}
      <div className="border-b border-slate-800 pb-3">
        <h3 className="text-base font-serif font-bold text-white tracking-wide">
          Payment Summary
        </h3>
      </div>

      {/* Breakdown Items */}
      <div className="space-y-3 text-xs">
        <div className="flex justify-between text-slate-200">
          <span>{summary.serviceName} ({summary.durationMinutes} min)</span>
          <span className="font-semibold text-white">€{summary.servicePrice.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-slate-400">
          <span>Service Fee</span>
          <span>€{summary.serviceFee.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-slate-400">
          <span>Subtotal</span>
          <span>€{summary.subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-slate-400">
          <span>VAT (22%)</span>
          <span>€{summary.vatAmount.toFixed(2)}</span>
        </div>

        {summary.promoDiscount > 0 && (
          <div className="flex justify-between text-emerald-400 font-semibold">
            <span>Promo Discount</span>
            <span>-€{summary.promoDiscount.toFixed(2)}</span>
          </div>
        )}

        {/* Total Paid in Prominent Gold */}
        <div className="flex justify-between items-baseline pt-3 border-t border-slate-800">
          <span className="text-sm font-bold text-white">Total Paid</span>
          <span className="text-2xl font-serif font-bold text-[#E5B56A]">
            €{summary.totalAmount.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Payment Method Badge */}
      <div className="space-y-2 pt-2 border-t border-slate-800">
        <span className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider">
          Payment Method
        </span>
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#0B0E14] border border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded bg-slate-800 text-slate-300">
              <CreditCard className="w-4 h-4 text-[#E5B56A]" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">
                {customer.paymentPreference === 'pay_now'
                  ? paymentMethodDetails?.brand
                    ? `${paymentMethodDetails.brand} •••• ${paymentMethodDetails.last4 || '4242'}`
                    : 'Mastercard •••• 4242'
                  : 'Pay in person at venue'}
              </div>
              <div className="text-[10px] text-slate-400">
                {customer.email}
              </div>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" />
            <span>{customer.paymentPreference === 'pay_now' ? 'Paid' : 'Reserved'}</span>
          </span>
        </div>
      </div>

      {/* Primary Actions */}
      <div className="pt-2 space-y-2.5">
        <button
          type="button"
          onClick={onViewMyBookings}
          className="w-full py-3 px-4 rounded-xl text-xs font-bold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-[#E5B56A]/50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          <CalendarCheck className="w-4 h-4 text-[#E5B56A]" />
          <span>View My Bookings</span>
        </button>

        <button
          type="button"
          onClick={onBookAnother}
          className="w-full py-3 px-4 rounded-xl text-xs font-bold text-[#0B0E14] bg-[#E5B56A] hover:bg-[#D99D48] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(229,181,106,0.3)]"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Book Another Treatment</span>
        </button>
      </div>
    </div>
  );
};
