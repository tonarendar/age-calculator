/**
 * Calculates the age in complete years based on a birth date and a reference date.
 *
 * @param birthDate - The user's date of birth.
 * @param today - The reference date used for age calculation.
 * @returns The age in full years.
 */
export function calculateAge(birthDate: Date, today: Date): number {
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}