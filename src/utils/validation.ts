export const ALLOWED_DOMAINS = ['logichive.com', 'logichive.internal'];

export function isEmailFormat(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
  return re.test(email);
}

function isLikelyHumanLocalPart(localPart: string): boolean {
  if (localPart.length < 3) return false;
  if (!/[a-z]/i.test(localPart)) return false;

  const badPatterns = /(?:asdf|qwerty|zxcv|qaz|wsx|edc|1234|1111|test|demo|foo|bar|abc|xyz|random|admin|user|guest)/i;
  if (badPatterns.test(localPart)) return false;

  const consonantSeq = localPart.match(/[^aeiou\d@._-]{4,}/i);
  if (consonantSeq) return false;

  return true;
}

export function isAllowedCorporateEmail(email: string): boolean {
  if (!email) return false;
  const clean = email.trim().toLowerCase();
  if (!isEmailFormat(clean)) return false;
  const parts = clean.split('@');
  if (parts.length !== 2) return false;

  const localPart = parts[0];
  if (!isLikelyHumanLocalPart(localPart)) return false;

  const domain = parts[1];
  if (ALLOWED_DOMAINS.includes(domain)) return true;
  for (const d of ALLOWED_DOMAINS) {
    if (domain === d) return true;
    if (domain.endsWith('.' + d)) return true;
  }

  return false;
}
