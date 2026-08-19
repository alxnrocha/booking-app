import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { MapPin, Calendar, Download, Wallet } from 'lucide-react';
import { BookingRecord } from '../../types/booking.ts';

interface VoucherTicketProps {
  booking: BookingRecord;
  onDownloadVoucher?: () => void;
  onAddToCalendar?: () => void;
  onAddToWallet?: () => void;
}

export const VoucherTicket: React.FC<VoucherTicketProps> = ({
  booking,
  onDownloadVoucher,
  onAddToCalendar,
  onAddToWallet,
}) => {
  const { bookingCode, summary, location, qrPayload } = booking;

  // Format date for readable display
  const dateObj = new Date(summary.bookingDate);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    weekday: 'long',
  };
  const formattedDate = !isNaN(dateObj.getTime())
    ? new Intl.DateTimeFormat('en-GB', options).format(dateObj)
    : summary.bookingDate;

  return (
    <div className="space-y-4">
      {/* Boarding Pass Ticket Container */}
      <div className="relative bg-[#121824] rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Top/Left Stub (Main Info) */}
        <div className="flex-1 p-6 sm:p-8 space-y-6">
          {/* Booking Reference Code */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Booking Reference
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-[#E5B56A] tracking-wider mt-0.5">
              {bookingCode}
            </div>
          </div>

          {/* Specialist */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Specialist
            </div>
            <div className="flex items-center gap-3">
              <img
                src={summary.specialistAvatar}
                alt={summary.specialistName}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#E5B56A]/50"
              />
              <div>
                <div className="text-sm font-bold text-white font-serif">
                  {summary.specialistName}
                </div>
                <div className="text-xs text-slate-300">
                  {summary.specialistTitle}
                </div>
              </div>
            </div>
          </div>

          {/* Date & Time Grid */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Date & Time
              </div>
              <div className="text-sm font-bold text-white mt-1">
                {formattedDate}
              </div>
            </div>
            <div>
              <div className="text-sm font-bold text-[#E5B56A] mt-4">
                {summary.bookingTime}
              </div>
              <div className="text-xs text-slate-400">
                {summary.durationMinutes} min
              </div>
            </div>
          </div>

          {/* Location with Dark Map Card */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Location
            </div>
            <div className="text-xs font-semibold text-white">
              {location.name}
            </div>
            <div className="text-[11px] text-slate-400">
              {location.address} · {location.city}
            </div>

            {/* Dark Styled Map Card */}
            <div className="relative h-24 rounded-xl overflow-hidden border border-slate-800 bg-[#0B0E14] group">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#E5B56A_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-2.5 rounded-full bg-[#E5B56A] text-[#0B0E14] shadow-[0_0_15px_rgba(229,181,106,0.6)] animate-pulse">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-[10px] text-slate-300 font-mono">
                Milan, IT
              </div>
            </div>
          </div>
        </div>

        {/* Perforated Divider (Visible on Desktop) */}
        <div className="relative hidden md:flex flex-col justify-between items-center py-4 w-6">
          <div className="w-5 h-5 rounded-full bg-[#0B0E14] -mt-6 border-b border-slate-700" />
          <div className="h-full border-r-2 border-dashed border-slate-700 my-2" />
          <div className="w-5 h-5 rounded-full bg-[#0B0E14] -mb-6 border-t border-slate-700" />
        </div>

        {/* Horizontal Perforated Divider (Mobile Only) */}
        <div className="relative flex md:hidden justify-between items-center px-4 h-6">
          <div className="w-5 h-5 rounded-full bg-[#0B0E14] -ml-6 border-r border-slate-700" />
          <div className="w-full border-t-2 border-dashed border-slate-700 mx-2" />
          <div className="w-5 h-5 rounded-full bg-[#0B0E14] -mr-6 border-l border-slate-700" />
        </div>

        {/* Right Stub (Check-In QR Code) */}
        <div className="w-full md:w-64 bg-[#0F1420] p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-4 border-t md:border-t-0 md:border-l border-slate-800">
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#E5B56A]">
            Scan to Check-In
          </div>

          {/* QR Code Container */}
          <div className="p-3.5 bg-white rounded-2xl shadow-xl ring-4 ring-[#E5B56A]/20">
            <QRCodeSVG
              value={qrPayload}
              size={130}
              level="H"
              includeMargin={false}
            />
          </div>

          <div className="space-y-1 text-center">
            <div className="text-xs font-semibold text-slate-300">
              Arrive 10 min early
            </div>
            <div className="text-[10px] text-slate-400">
              Bring a valid photo ID
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Below Ticket */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          type="button"
          onClick={onAddToWallet}
          className="py-2.5 px-4 rounded-xl text-xs font-bold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-[#E5B56A]/50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          <Wallet className="w-4 h-4 text-[#E5B56A]" />
          <span>Add to Apple Wallet</span>
        </button>

        <button
          type="button"
          onClick={onAddToCalendar}
          className="py-2.5 px-4 rounded-xl text-xs font-bold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-[#E5B56A]/50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          <Calendar className="w-4 h-4 text-cyan-400" />
          <span>Add to Google Calendar</span>
        </button>

        <button
          type="button"
          onClick={onDownloadVoucher}
          className="py-2.5 px-4 rounded-xl text-xs font-bold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-[#E5B56A]/50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Download PDF Voucher</span>
        </button>
      </div>
    </div>
  );
};
