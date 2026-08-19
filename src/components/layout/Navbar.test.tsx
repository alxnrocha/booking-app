import { describe, it, expect } from 'vitest';
import { STEPS } from '../booking/BookingStepper.tsx';

describe('Navbar and Stepper Definitions', () => {
  it('should have 4 predefined steps matching design requirements', () => {
    expect(STEPS).toHaveLength(4);
    expect(STEPS[0].title).toBe('Service');
    expect(STEPS[1].title).toBe('Professional & Time');
    expect(STEPS[2].title).toBe('Details');
    expect(STEPS[3].title).toBe('Confirmation');
  });
});
