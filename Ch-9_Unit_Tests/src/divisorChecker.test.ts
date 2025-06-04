import { countConsecutiveMatchesWithSameDivisors } from './divisorChecker';

describe("Divisor Matching Function", () => {
  test("should return 2 for k=15 (matches at n = 2 and n = 14)", () => {
    const result = countConsecutiveMatchesWithSameDivisors(15);
    expect(result).toBe(2);
  });
});