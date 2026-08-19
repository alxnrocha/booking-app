import React from 'react';
import { Globe, Clock } from 'lucide-react';
import { TimeSlot, TimeSlotPeriod } from '../../types/booking.ts';

interface TimeSlotPickerProps {
  slots: TimeSlot[];
  selectedSlot: string; // e.g. "12:00 PM"
  selectedPeriod: TimeSlotPeriod;
  onSelectSlot: (slotTime: string) => void;
  onSelectPeriod: (period: TimeSlotPeriod) => void;
}

export const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  slots,
  selectedSlot,
  selectedPeriod,
  onSelectSlot,
  onSelectPeriod,
}) => {
  const periods: { id: TimeSlotPeriod; title: string; range: string }[] = [
    { id: 'morning', title: 'Morning', range: '09:00 - 12:00' },
    { id: 'afternoon', title: 'Afternoon', range: '12:00 - 17:00' },
    { id: 'evening', title: 'Evening', range: '17:00 - 21:00' },
  ];

  const currentSlots = slots.filter((slot) => slot.period === selectedPeriod);

  return (
    <div className="bg-[#121824]/90 p-5 rounded-2xl border border-slate-800 shadow-lg space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Clock className="w-4 h-4 text-[#E5B56A]" />
          <span>Available Time Slots</span>
        </div>
        <div className="inline-flex items-center gap-1 text-[11px] text-slate-400 bg-slate-800/60 px-2.5 py-1 rounded-full border border-slate-700/50">
          <Globe className="w-3 h-3 text-[#E5B56A]" />
          <span>Timezone: Local Time</span>
        </div>
      </div>

      {/* Period Selector Tabs (Morning, Afternoon, Evening) */}
      <div className="grid grid-cols-3 gap-2">
        {periods.map((p) => {
          const isActive = selectedPeriod === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelectPeriod(p.id)}
              className={`p-2.5 rounded-xl text-center transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#182030] border-2 border-[#E5B56A] text-[#E5B56A] shadow-[0_0_12px_rgba(229,181,106,0.15)]'
                  : 'bg-slate-800/40 hover:bg-slate-800/70 border border-slate-800 text-slate-300'
              }`}
            >
              <div className="text-xs font-bold">{p.title}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{p.range}</div>
            </button>
          );
        })}
      </div>

      {/* Slots Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
        {currentSlots.map((slot) => {
          const isSelected = selectedSlot === slot.time;
          return (
            <button
              key={slot.id}
              type="button"
              disabled={!slot.isAvailable}
              onClick={() => slot.isAvailable && onSelectSlot(slot.time)}
              className={`py-2 px-3 rounded-xl text-xs font-semibold text-center transition-all duration-200 ${
                isSelected
                  ? 'bg-[#E5B56A] text-[#0B0E14] font-bold shadow-[0_0_10px_rgba(229,181,106,0.4)] scale-105'
                  : slot.isAvailable
                    ? 'bg-slate-800/70 hover:bg-slate-700/80 text-slate-200 hover:text-white border border-slate-700/60 cursor-pointer'
                    : 'bg-slate-900/40 text-slate-600 border border-slate-800/40 line-through opacity-40 cursor-not-allowed'
              }`}
            >
              {slot.time}
            </button>
          );
        })}
      </div>
    </div>
  );
};
