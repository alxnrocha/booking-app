import { Specialist, TimeSlot, BookingRecord } from '../types/booking.ts';

export function isDayAvailableForSpecialist(specialist: Specialist, dateString: string): boolean {
  const dateObj = new Date(dateString);
  if (isNaN(dateObj.getTime())) return false;
  const dayOfWeek = dateObj.getDay();
  return specialist.availableDays.includes(dayOfWeek);
}

export function parseTimeToMinutes(timeStr: string): number {
  // Parses "12:00 PM", "09:30 AM", "01:00 PM"
  const clean = timeStr.trim().toUpperCase();
  const isPM = clean.includes('PM');
  const isAM = clean.includes('AM');
  const [hourStr, minStr] = clean.replace(/(AM|PM)/g, '').trim().split(':');

  let hours = parseInt(hourStr, 10);
  const minutes = parseInt(minStr, 10) || 0;

  if (isPM && hours !== 12) {
    hours += 12;
  } else if (isAM && hours === 12) {
    hours = 0;
  }

  return hours * 60 + minutes;
}

export function formatMinutesToTime(totalMinutes: number): string {
  let hours = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  const period = hours >= 12 ? 'PM' : 'AM';

  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }

  const padMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const padHour = hours < 10 ? `0${hours}` : `${hours}`;
  return `${padHour}:${padMin} ${period}`;
}

export function calculateEndTime(startTimeStr: string, durationMinutes: number): string {
  const startMins = parseTimeToMinutes(startTimeStr);
  const endMins = startMins + durationMinutes;
  return formatMinutesToTime(endMins);
}

export function isSlotDoubleBooked(
  specialistId: string,
  date: string,
  time: string,
  confirmedBookings: BookingRecord[] = []
): boolean {
  return confirmedBookings.some((booking) => {
    if (booking.status === 'cancelled') return false;
    return (
      booking.summary.specialistId === specialistId &&
      booking.summary.bookingDate === date &&
      booking.summary.bookingTime === time
    );
  });
}

export function getAvailableSlotsForSpecialist(
  specialist: Specialist,
  dateString: string,
  confirmedBookings: BookingRecord[] = []
): TimeSlot[] {
  const isDayValid = isDayAvailableForSpecialist(specialist, dateString);

  const morningBaseTimes = ['09:00 AM', '10:00 AM', '11:00 AM'];
  const afternoonBaseTimes = ['12:00 PM', '01:30 PM', '03:00 PM', '04:30 PM'];
  const eveningBaseTimes = ['05:30 PM', '07:00 PM', '08:00 PM'];

  const slots: TimeSlot[] = [];

  morningBaseTimes.forEach((time, idx) => {
    const isBooked = isSlotDoubleBooked(specialist.id, dateString, time, confirmedBookings);
    slots.push({
      id: `slot-${specialist.id}-${dateString}-m-${idx}`,
      time,
      period: 'morning',
      isAvailable: isDayValid && !isBooked,
      professionalId: specialist.id,
      date: dateString,
    });
  });

  afternoonBaseTimes.forEach((time, idx) => {
    const isBooked = isSlotDoubleBooked(specialist.id, dateString, time, confirmedBookings);
    slots.push({
      id: `slot-${specialist.id}-${dateString}-a-${idx}`,
      time,
      period: 'afternoon',
      isAvailable: isDayValid && !isBooked,
      professionalId: specialist.id,
      date: dateString,
    });
  });

  eveningBaseTimes.forEach((time, idx) => {
    const isBooked = isSlotDoubleBooked(specialist.id, dateString, time, confirmedBookings);
    slots.push({
      id: `slot-${specialist.id}-${dateString}-e-${idx}`,
      time,
      period: 'evening',
      isAvailable: isDayValid && !isBooked,
      professionalId: specialist.id,
      date: dateString,
    });
  });

  return slots;
}
