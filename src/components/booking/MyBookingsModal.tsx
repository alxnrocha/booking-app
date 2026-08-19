import React, { useState } from 'react';
import {
  CalendarCheck,
  Search,
  X,
  Clock,
  MapPin,
  AlertCircle,
  Eye,
  Trash2,
  CheckCircle2,
  Ban,
} from 'lucide-react';
import { useBookingStore } from '../../stores/useBookingStore.ts';
import { BookingRecord } from '../../types/booking.ts';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBookingForView: (booking: BookingRecord) => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  onSelectBookingForView,
}) => {
  const { confirmedBookings, cancelBooking } = useBookingStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'confirmed' | 'cancelled'>('all');
  const [cancellationTarget, setCancellationTarget] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredBookings = confirmedBookings.filter((booking) => {
    const matchesSearch =
      booking.bookingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.summary.serviceName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === 'all' || booking.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleConfirmCancel = (code: string) => {
    cancelBooking(code);
    setCancellationTarget(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#121824] border border-slate-700/80 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#E5B56A]/10 text-[#E5B56A] border border-[#E5B56A]/30">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-white">
                My Reservations
              </h3>
              <p className="text-xs text-slate-400">
                Track, view and manage your Aura VIP spa appointments.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Status Filters */}
        <div className="space-y-3 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by code (e.g. #AUR-9482), name, service or email..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B0E14] border border-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#E5B56A] transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            {(['all', 'confirmed', 'cancelled'] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  filterStatus === status
                    ? 'bg-[#E5B56A] text-[#0B0E14] font-bold shadow-sm'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-2xl bg-[#0B0E14]/80 border border-slate-800/90 hover:border-slate-700 transition-all space-y-3"
              >
                {/* Top Row: Code + Status Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-[#E5B56A]">
                      {b.bookingCode}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      • {b.customer.fullName}
                    </span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      b.status === 'confirmed'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    }`}
                  >
                    {b.status === 'confirmed' ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <Ban className="w-3 h-3" />
                    )}
                    <span className="capitalize">{b.status}</span>
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 pt-1 border-t border-slate-800/60">
                  <div>
                    <span className="text-white font-semibold block">
                      {b.summary.serviceName}
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      with {b.summary.specialistName}
                    </span>
                  </div>
                  <div className="sm:text-right">
                    <div className="flex items-center sm:justify-end gap-1 text-slate-300">
                      <Clock className="w-3 h-3 text-[#E5B56A]" />
                      <span>
                        {b.summary.bookingDate} at {b.summary.bookingTime}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#E5B56A]">
                      €{b.summary.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <MapPin className="w-3 h-3" />
                    <span>{b.location.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {b.status === 'confirmed' && (
                      <button
                        type="button"
                        onClick={() => setCancellationTarget(b.bookingCode)}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Cancel</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        onSelectBookingForView(b);
                        onClose();
                      }}
                      className="px-3 py-1 rounded-lg text-xs font-semibold text-slate-900 bg-[#E5B56A] hover:bg-[#D99D48] transition-colors flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>View Voucher</span>
                    </button>
                  </div>
                </div>

                {/* Cancellation Confirmation Prompt */}
                {cancellationTarget === b.bookingCode && (
                  <div className="mt-2 p-3 rounded-xl bg-rose-950/40 border border-rose-800/80 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-rose-300 font-semibold">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>Are you sure you want to cancel reservation {b.bookingCode}?</span>
                    </div>
                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setCancellationTarget(null)}
                        className="px-2.5 py-1 rounded-lg text-xs text-slate-400 hover:text-white bg-slate-800"
                      >
                        Keep Booking
                      </button>
                      <button
                        type="button"
                        onClick={() => handleConfirmCancel(b.bookingCode)}
                        className="px-3 py-1 rounded-lg text-xs font-bold text-white bg-rose-600 hover:bg-rose-500"
                      >
                        Confirm Cancellation
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 rounded-2xl bg-[#0B0E14] border border-slate-800 space-y-2">
              <CalendarCheck className="w-10 h-10 text-slate-600 mx-auto" />
              <div className="text-sm font-semibold text-slate-300">
                No reservations found
              </div>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                We could not find any active bookings matching your search query.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
