import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Lock, Store, Check, User } from 'lucide-react';
import { CustomerDetailsFormData } from '../../schemas/bookingSchema.ts';
import { PaymentPreference } from '../../types/booking.ts';

interface CustomerDetailsStepProps {
  form: UseFormReturn<CustomerDetailsFormData>;
  paymentPreference: PaymentPreference;
  onSelectPaymentPreference: (pref: PaymentPreference) => void;
}

export const COUNTRY_CODES = [
  { code: '+39', label: 'Italy (+39)', flag: '🇮🇹' },
  { code: '+34', label: 'Spain (+34)', flag: '🇪🇸' },
  { code: '+33', label: 'France (+33)', flag: '🇫🇷' },
  { code: '+44', label: 'UK (+44)', flag: '🇬🇧' },
  { code: '+1', label: 'USA (+1)', flag: '🇺🇸' },
  { code: '+55', label: 'Brazil (+55)', flag: '🇧🇷' },
  { code: '+49', label: 'Germany (+49)', flag: '🇩🇪' },
];

export const CustomerDetailsStep: React.FC<CustomerDetailsStepProps> = ({
  form,
  paymentPreference,
  onSelectPaymentPreference,
}) => {
  const {
    register,
    formState: { errors },
    watch,
  } = form;

  const specialRequests = watch('specialRequests') || '';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      {/* Column 1: Your Information */}
      <div className="bg-[#121824]/90 p-6 rounded-2xl border border-slate-800 shadow-lg space-y-5">
        <div>
          <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-[#E5B56A]" />
            <span>Your Information</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Please enter your personal contact details for appointment confirmation.
          </p>
        </div>

        {/* Full Name Input */}
        <div className="space-y-1.5">
          <label htmlFor="fullName" className="block text-xs font-semibold text-slate-300">
            Full Name
          </label>
          <div className="relative">
            <input
              id="fullName"
              type="text"
              placeholder="e.g. Emma Johnson"
              {...register('fullName')}
              className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0B0E14] border text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all ${
                errors.fullName
                  ? 'border-rose-500/80 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                  : 'border-slate-800 focus:border-[#E5B56A] focus:ring-2 focus:ring-[#E5B56A]/20'
              }`}
            />
          </div>
          {errors.fullName && (
            <p className="text-[11px] text-rose-400 font-medium mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email Address Input */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-xs font-semibold text-slate-300">
            Email Address
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              placeholder="e.g. emma.johnson@email.com"
              {...register('email')}
              className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0B0E14] border text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all ${
                errors.email
                  ? 'border-rose-500/80 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                  : 'border-slate-800 focus:border-[#E5B56A] focus:ring-2 focus:ring-[#E5B56A]/20'
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-[11px] text-rose-400 font-medium mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone Number with Prefix */}
        <div className="space-y-1.5">
          <label htmlFor="phoneNumber" className="block text-xs font-semibold text-slate-300">
            Phone Number
          </label>
          <div className="flex gap-2">
            <select
              {...register('phoneCountryCode')}
              className="px-3 py-2.5 rounded-xl bg-[#0B0E14] border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-[#E5B56A] cursor-pointer"
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code}
                </option>
              ))}
            </select>
            <input
              id="phoneNumber"
              type="tel"
              placeholder="312 345 6789"
              {...register('phoneNumber')}
              className={`flex-1 px-3.5 py-2.5 rounded-xl bg-[#0B0E14] border text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all ${
                errors.phoneNumber
                  ? 'border-rose-500/80 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                  : 'border-slate-800 focus:border-[#E5B56A] focus:ring-2 focus:ring-[#E5B56A]/20'
              }`}
            />
          </div>
          {errors.phoneNumber && (
            <p className="text-[11px] text-rose-400 font-medium mt-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        {/* Special Requests Textarea */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="specialRequests" className="block text-xs font-semibold text-slate-300">
              Special Requests <span className="text-slate-500 font-normal">(Optional)</span>
            </label>
            <span className="text-[10px] text-slate-500 font-mono">
              {specialRequests.length}/250
            </span>
          </div>
          <textarea
            id="specialRequests"
            rows={3}
            maxLength={250}
            placeholder="e.g. I have sensitive skin, please use gentle organic products. Thank you!"
            {...register('specialRequests')}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0E14] border border-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#E5B56A] focus:ring-2 focus:ring-[#E5B56A]/20 transition-all resize-none"
          />
        </div>
      </div>

      {/* Column 2: Payment Preference & Marketing */}
      <div className="bg-[#121824]/90 p-6 rounded-2xl border border-slate-800 shadow-lg space-y-6">
        <div>
          <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#E5B56A]" />
            <span>Payment Preference</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Choose how you would like to settle your treatment balance.
          </p>
        </div>

        {/* Payment Options */}
        <div className="space-y-3" role="radiogroup" aria-label="Payment preference selection">
          {/* Option 1: Pay Now */}
          <div
            onClick={() => onSelectPaymentPreference('pay_now')}
            role="radio"
            aria-checked={paymentPreference === 'pay_now'}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectPaymentPreference('pay_now');
              }
            }}
            className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-200 ${
              paymentPreference === 'pay_now'
                ? 'bg-[#182030] border-2 border-[#E5B56A] shadow-[0_0_15px_rgba(229,181,106,0.15)]'
                : 'bg-[#0B0E14] border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#E5B56A]/10 text-[#E5B56A]">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Pay Now</div>
                <div className="text-xs text-slate-400">Secure online credit card payment</div>
              </div>
            </div>
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                paymentPreference === 'pay_now'
                  ? 'bg-[#E5B56A] text-[#0B0E14]'
                  : 'border border-slate-600'
              }`}
            >
              {paymentPreference === 'pay_now' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </div>

          {/* Option 2: Pay at Venue */}
          <div
            onClick={() => onSelectPaymentPreference('pay_at_venue')}
            role="radio"
            aria-checked={paymentPreference === 'pay_at_venue'}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectPaymentPreference('pay_at_venue');
              }
            }}
            className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-200 ${
              paymentPreference === 'pay_at_venue'
                ? 'bg-[#182030] border-2 border-[#E5B56A] shadow-[0_0_15px_rgba(229,181,106,0.15)]'
                : 'bg-[#0B0E14] border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-slate-800 text-slate-300">
                <Store className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Pay at Venue</div>
                <div className="text-xs text-slate-400">Settle your bill in person at arrival</div>
              </div>
            </div>
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                paymentPreference === 'pay_at_venue'
                  ? 'bg-[#E5B56A] text-[#0B0E14]'
                  : 'border border-slate-600'
              }`}
            >
              {paymentPreference === 'pay_at_venue' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </div>
        </div>

        {/* Marketing Consent & Security Guarantee */}
        <div className="pt-2 space-y-3 border-t border-slate-800">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              {...register('marketingConsent')}
              className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-[#0B0E14] text-[#E5B56A] focus:ring-[#E5B56A] focus:ring-offset-0 cursor-pointer"
            />
            <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
              Send me special offers, private VIP member invitations & seasonal updates.
            </span>
          </label>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>256-bit TLS encrypted transaction. Your reservation is immediately secured.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
