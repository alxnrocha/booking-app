import React from 'react';
import { Specialist, TimeSlot, TimeSlotPeriod } from '../../types/booking.ts';
import { CalendarGrid } from './CalendarGrid.tsx';
import { TimeSlotPicker } from './TimeSlotPicker.tsx';
import { SpecialistCard } from './SpecialistCard.tsx';

interface DateTimeStepProps {
  selectedDate: string;
  selectedTimeSlot: string;
  selectedPeriod: TimeSlotPeriod;
  specialist: Specialist;
  allSpecialists: Specialist[];
  slots: TimeSlot[];
  onSelectDate: (date: string) => void;
  onSelectSlot: (slot: string) => void;
  onSelectPeriod: (period: TimeSlotPeriod) => void;
  onSelectSpecialist: (specialist: Specialist) => void;
}

export const DateTimeStep: React.FC<DateTimeStepProps> = ({
  selectedDate,
  selectedTimeSlot,
  selectedPeriod,
  specialist,
  allSpecialists,
  slots,
  onSelectDate,
  onSelectSlot,
  onSelectPeriod,
  onSelectSpecialist,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Calendar & Time Slots Section (8 cols on lg) */}
      <div className="lg:col-span-8 space-y-6">
        <CalendarGrid
          selectedDate={selectedDate}
          onSelectDate={onSelectDate}
          availableDays={specialist.availableDays}
        />
        <TimeSlotPicker
          slots={slots}
          selectedSlot={selectedTimeSlot}
          selectedPeriod={selectedPeriod}
          onSelectSlot={onSelectSlot}
          onSelectPeriod={onSelectPeriod}
        />
      </div>

      {/* Selected Specialist Profile Card (4 cols on lg) */}
      <div className="lg:col-span-4">
        <SpecialistCard
          specialist={specialist}
          allSpecialists={allSpecialists}
          selectedDate={selectedDate}
          selectedTime={selectedTimeSlot}
          onSelectSpecialist={onSelectSpecialist}
        />
      </div>
    </div>
  );
};
