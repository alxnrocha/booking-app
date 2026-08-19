import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarGridProps {
  selectedDate: string; // YYYY-MM-DD
  onSelectDate: (date: string) => void;
  availableDays?: number[]; // [1, 2, 3, 4, 5, 6]
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  selectedDate,
  onSelectDate,
  availableDays = [1, 2, 3, 4, 5, 6],
}) => {
  // Calendar fixed around May 2025 as featured in the design mockup, with full dynamic date support
  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  // Calendar cells for May 2025: May 1 is Thursday (index 3 in Mon-Sun)
  // Previous month overflow: April 28, 29, 30
  // Current month days: 1 to 31
  // Next month overflow: 1
  const calendarDays = [
    { day: 28, isCurrentMonth: false, date: '2025-04-28' },
    { day: 29, isCurrentMonth: false, date: '2025-04-29' },
    { day: 30, isCurrentMonth: false, date: '2025-04-30' },
    ...Array.from({ length: 31 }, (_, i) => {
      const dayNum = i + 1;
      const dayStr = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
      return {
        day: dayNum,
        isCurrentMonth: true,
        date: `2025-05-${dayStr}`,
      };
    }),
    { day: 1, isCurrentMonth: false, date: '2025-06-01' },
  ];

  return (
    <div className="bg-[#121824]/90 p-5 rounded-2xl border border-slate-800 shadow-lg">
      {/* Month Header Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-sm font-bold tracking-wide text-white font-serif">
          May 2025
        </span>
        <button
          type="button"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Days of Week Row */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {daysOfWeek.map((dow) => (
          <span key={dow} className="text-[10px] font-bold text-slate-400 tracking-wider">
            {dow}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {calendarDays.map((cell) => {
          const isSelected = selectedDate === cell.date;
          const dateObj = new Date(cell.date);
          const dayOfWeek = dateObj.getDay();
          const isDayAvailable = availableDays.includes(dayOfWeek);
          const isClickable = cell.isCurrentMonth && isDayAvailable;

          return (
            <button
              key={cell.date}
              type="button"
              disabled={!isClickable}
              onClick={() => isClickable && onSelectDate(cell.date)}
              className={`h-9 w-9 mx-auto rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200 ${
                isSelected
                  ? 'bg-[#E5B56A] text-[#0B0E14] font-bold shadow-[0_0_12px_rgba(229,181,106,0.6)] scale-105'
                  : isClickable
                    ? 'text-slate-200 hover:bg-slate-800/80 hover:text-[#E5B56A] cursor-pointer'
                    : 'text-slate-600 opacity-40 cursor-not-allowed'
              }`}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
    </div>
  );
};
