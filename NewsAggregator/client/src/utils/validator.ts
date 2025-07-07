export class Validator {
  static isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  static isValidDate(dateStr: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateStr)) return false;
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
  }

static isPositiveNumber(input: string | number): boolean {
  const num = typeof input === 'string' ? parseInt(input, 10) : input;
  return !isNaN(num) && num > 0;
}


  static isNonEmptyString(value: string): boolean {
    return typeof value === 'string' && value.trim().length > 0;
  }

  static isValidCategory(category: string, validCategories: string[]): boolean {
    return validCategories.includes(category.toLowerCase());
  }

  static isDateRangeValid(start: string, end: string): boolean {
    return new Date(start) <= new Date(end);
  }

  static isNonEmpty(input: string): boolean {
    return input.trim().length > 0;
  }
}
