import { countConsecutiveMatchesWithSameDivisors } from './divisorChecker';

describe("Divisor Matching Function", () => {
  test("should return 2 for k=15 (matches at n = 2 and n = 14)", () => {
    const result = countConsecutiveMatchesWithSameDivisors(15);
    expect(result).toBe(2);
  });

  test("should return 15 for k=100", () => {
    expect(countConsecutiveMatchesWithSameDivisors(100)).toBe(15);
  });

  test("should return 0 for k=2 (edge case)", () => {
    expect(countConsecutiveMatchesWithSameDivisors(2)).toBe(0);
  });

  test("should return 0 for k=0 (invalid input)", () => {
    expect(countConsecutiveMatchesWithSameDivisors(0)).toBe(0);
  });

  test("should return 0 for negative k (invalid input)", () => {
    expect(countConsecutiveMatchesWithSameDivisors(-10)).toBe(0);
  });

  test("should throw error when input is not a number", () => {
  // @ts-ignore
    expect(() => countConsecutiveMatchesWithSameDivisors("abc")).toThrow("Input must be a number");
  });
});