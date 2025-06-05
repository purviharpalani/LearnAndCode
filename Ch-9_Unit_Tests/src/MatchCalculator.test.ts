import { MatchCalculator } from './MatchCalculator';

describe("Divisor Matching Function", () => {
  test("should return 2 for k=15 (matches at n = 2 and n = 14)", () => {
    const result = MatchCalculator.countConsecutiveMatchesWithSameDivisors(15);
    expect(result).toBe(2);
  });

  test("should return 15 for k=100", () => {
    const result = MatchCalculator.countConsecutiveMatchesWithSameDivisors(100);
    expect(result).toBe(15);
  });

  test("should return 0 for k=2 (edge case)", () => {
    const result = MatchCalculator.countConsecutiveMatchesWithSameDivisors(2);
    expect(result).toBe(0);
  });

  test("should return 0 for k=0 (invalid input)", () => {
    const result = MatchCalculator.countConsecutiveMatchesWithSameDivisors(0);
    expect(result).toBe(0);
  });

  test("should throw error for negative k (invalid input)", () => {
  expect(() => MatchCalculator.countConsecutiveMatchesWithSameDivisors(-10))
    .toThrow("Input must be a non-negative integer");
});


  test("should throw error when input is not a number", () => {
    // @ts-ignore: intentionally testing invalid input
    expect(() => MatchCalculator.countConsecutiveMatchesWithSameDivisors("abc")).toThrow("Input must be a number");
  });
});
