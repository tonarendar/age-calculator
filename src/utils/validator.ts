/**
 * Validates a birthdate string in `YYYY/MM/DD` format.
 *
 * @param input - Birthdate input string.
 * @returns Validation result with a boolean flag and optional error message.
 */
export function validate(input: string): { valid: boolean; error?: string } {
  const regex = /^\d{4}\/\d{2}\/\d{2}$/;

  if (!regex.test(input)) {
    return { valid: false, error: 'Error: Invalid format' };
  }

  const [y, m, d] = input.split('/').map(Number);
  const date = new Date(y, m - 1, d);

  if (
    date.getFullYear() !== y ||
    date.getMonth() !== m - 1 ||
    date.getDate() !== d
  ) {
    return { valid: false, error: 'Error: Invalid date' };
  }

  return { valid: true };
}