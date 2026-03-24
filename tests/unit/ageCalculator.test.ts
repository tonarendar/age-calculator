import { calculateAge } from '../../src/utils/ageCalculator';

describe('calculateAge', () => {
  it('returns the full age when the birthday has already occurred this year', () => {
    const birthDate = new Date(1990, 2, 10);
    const today = new Date(2026, 2, 23);

    expect(calculateAge(birthDate, today)).toBe(36);
  });

  it('does not increment age before the birthday in the current year', () => {
    const birthDate = new Date(1990, 6, 15);
    const today = new Date(2026, 6, 14);

    expect(calculateAge(birthDate, today)).toBe(35);
  });

  it('increments age on the exact birthday', () => {
    const birthDate = new Date(2000, 2, 23);
    const today = new Date(2026, 2, 23);

    expect(calculateAge(birthDate, today)).toBe(26);
  });

  it('handles leap-day birthdays before March in a non-leap year', () => {
    const birthDate = new Date(2004, 1, 29);
    const today = new Date(2025, 1, 28);

    expect(calculateAge(birthDate, today)).toBe(20);
  });

  it('handles leap-day birthdays after February in a non-leap year', () => {
    const birthDate = new Date(2004, 1, 29);
    const today = new Date(2025, 2, 1);

    expect(calculateAge(birthDate, today)).toBe(21);
  });
});