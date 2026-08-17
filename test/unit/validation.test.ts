import { isEmailFormat, isAllowedCorporateEmail } from '../../src/utils/validation';

describe('validation utils', () => {
  test('isEmailFormat should validate basic emails', () => {
    expect(isEmailFormat('user@example.com')).toBe(true);
    expect(isEmailFormat('bad-email')).toBe(false);
    expect(isEmailFormat('a@b.c')).toBe(true);
  });

  test('isAllowedCorporateEmail should allow corporate domains and reject gibberish', () => {
    expect(isAllowedCorporateEmail('john.doe@logichive.com')).toBe(true);
    expect(isAllowedCorporateEmail('john@sub.logichive.com')).toBe(true);
    expect(isAllowedCorporateEmail('as@logichive.com')).toBe(false); // local part too short
    expect(isAllowedCorporateEmail('asdf123@logichive.com')).toBe(false); // gibberish localpart
    expect(isAllowedCorporateEmail('user@other.com')).toBe(false);
  });
});
