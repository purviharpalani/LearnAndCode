import { countConsecutiveMatchesWithSameDivisors  } from './divisorChecker';

describe("Divisor Matching Function", () => {
  test("should return 2 for k=15 (matches at n = 2 and n = 14)", () => {
    const limit = 15;
    const result = countConsecutiveMatchesWithSameDivisors(limit);
    expect(countConsecutiveMatchesWithSameDivisors (result)).toBe(2);
  });

  test("should return 9 for k=100", () => {
    expect(countConsecutiveMatchesWithSameDivisors (100)).toBe(15);
  });

  test("should return 0 for k=2 (edge case)", () => {
    const result = countConsecutiveMatchesWithSameDivisors(2);
    expect(result).toBe(0);
  });

  test("should return 0 for k=0 (invalid input)", () => {
    const result = countConsecutiveMatchesWithSameDivisors(0);
    expect(result).toBe(0);
  });

  test("should return 0 for negative k (invalid input)", () => {
    expect(countConsecutiveMatchesWithSameDivisors (-10)).toBe(0);
  });
});
