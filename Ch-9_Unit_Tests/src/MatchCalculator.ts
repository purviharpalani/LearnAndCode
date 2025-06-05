import { Validator } from "./Validator";
import { DivisorCounter } from "./DivisorCounter";

export class MatchCalculator {
  static countConsecutiveMatchesWithSameDivisors(limit: number): number {
    Validator.validatePositiveInteger(limit);

    if (limit <= 1) return 0;

    let matchCount = 0;

    for (let n = 2; n <= limit; n++) {
      const current = DivisorCounter.countDivisors(n);
      const previous = DivisorCounter.countDivisors(n - 1);

      if (current === previous) {
        matchCount++;
      }
    }

    return matchCount;
  }
}
