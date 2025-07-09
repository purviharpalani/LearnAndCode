export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function isValidDate(input: string): boolean {
  return !isNaN(Date.parse(input));
}
