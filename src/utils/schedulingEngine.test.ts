import { describe, it, expect } from 'vitest';
import {
  parseTimeToMinutes,
  formatMinutesToTime,
  calculateEndTime,
  isSlotDoubleBooked,
  getAvailableSlotsForSpecialist,
} from './schedulingEngine.ts';
import { MOCK_SPECIALISTS, INITIAL_SAMPLE_BOOKING } from '../data/mockBookingData.ts';

describe('schedulingEngine', () => {
  it('should accurately convert time string to minutes and back', () => {
    expect(parseTimeToMinutes('12:00 PM')).toBe(720);
    expect(parseTimeToMinutes('09:30 AM')).toBe(570);
    expect(parseTimeToMinutes('01:00 PM')).toBe(780);

    expect(formatMinutesToTime(720)).toBe('12:00 PM');
    expect(formatMinutesToTime(570)).toBe('09:30 AM');
    expect(formatMinutesToTime(780)).toBe('01:00 PM');
  });

  it('should calculate treatment end times accurately', () => {
    expect(calculateEndTime('12:00 PM', 60)).toBe('01:00 PM');
    expect(calculateEndTime('09:00 AM', 45)).toBe('09:45 AM');
    expect(calculateEndTime('02:00 PM', 120)).toBe('04:00 PM');
  });

  it('should detect double booking conflict when a slot is already booked', () => {
    const isBooked = isSlotDoubleBooked(
      'spec-01',
      '2025-05-15',
      '12:00 PM',
      [INITIAL_SAMPLE_BOOKING]
    );
    expect(isBooked).toBe(true);

    const isDifferentTimeBooked = isSlotDoubleBooked(
      'spec-01',
      '2025-05-15',
      '03:00 PM',
      [INITIAL_SAMPLE_BOOKING]
    );
    expect(isDifferentTimeBooked).toBe(false);
  });

  it('should mark the booked slot as unavailable in getAvailableSlotsForSpecialist', () => {
    const specialist = MOCK_SPECIALISTS[0]; // Isabella Moretti
    const slots = getAvailableSlotsForSpecialist(specialist, '2025-05-15', [INITIAL_SAMPLE_BOOKING]);

    const noonSlot = slots.find((s) => s.time === '12:00 PM');
    expect(noonSlot).toBeDefined();
    expect(noonSlot?.isAvailable).toBe(false); // Booked by Emma Johnson

    const afternoonSlot = slots.find((s) => s.time === '01:30 PM');
    expect(afternoonSlot?.isAvailable).toBe(true);
  });
});
