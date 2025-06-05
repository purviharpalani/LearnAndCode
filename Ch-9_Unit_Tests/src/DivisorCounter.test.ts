import { DivisorCounter } from './DivisorCounter';

describe("DivisorCounter", () => {
  test("should return 1 for n = 1", () => {
    expect(DivisorCounter.countDivisors(1)).toBe(1);
  });

  test("should return 2 for prime number n = 2", () => {
    expect(DivisorCounter.countDivisors(2)).toBe(2);
  });

  test("should return 3 for n = 4 (1, 2, 4)", () => {
    expect(DivisorCounter.countDivisors(4)).toBe(3);
  });

  test("should return 6 for n = 12 (1, 2, 3, 4, 6, 12)", () => {
    expect(DivisorCounter.countDivisors(12)).toBe(6);
  });

  test("should return 9 for perfect square n = 36", () => {
    expect(DivisorCounter.countDivisors(36)).toBe(9);
  });

  test("should return 0 for n = 0 (optional: edge case)", () => {
    expect(DivisorCounter.countDivisors(0)).toBe(0);
  });
});
