import { validate } from '../../src/utils/validator';

describe('validate', () => {
  it('accepts a valid birthdate in YYYY/MM/DD format', () => {
    expect(validate('2000/12/31')).toEqual({ valid: true });
  });

  it('rejects values that do not match the required format', () => {
    expect(validate('2000-12-31')).toEqual({
      valid: false,
      error: 'Error: Invalid format',
    });
  });

  it('rejects values with missing zero padding', () => {
    expect(validate('2000/2/09')).toEqual({
      valid: false,
      error: 'Error: Invalid format',
    });
  });

  it('rejects impossible calendar dates', () => {
    expect(validate('0001/02/29')).toEqual({
      valid: false,
      error: 'Error: Invalid date',
    });
  });

  it('rejects dates with invalid day and month combinations', () => {
    expect(validate('2024/04/31')).toEqual({
      valid: false,
      error: 'Error: Invalid date',
    });
  });

  it('accepts leap-day dates in leap years', () => {
    expect(validate('2024/02/29')).toEqual({ valid: true });
  });
});