import { Validator } from "./Validator";
import { DivisorCounter } from "./DivisorCounter";

export class MatchCalculator {
  static countConsecutiveNumbersWithSameDivisorCount(upperLimit: number): number {
    Validator.validatePositiveInteger(upperLimit);

    if (upperLimit <= 1) return 0;

    let consecutiveMatchCount = 0;

    for (let currentNumber = 2; currentNumber <= upperLimit; currentNumber++) {
      const currentDivisorCount = DivisorCounter.getDivisorCount(currentNumber);
      const previousDivisorCount = DivisorCounter.getDivisorCount(currentNumber - 1);

      if (currentDivisorCount === previousDivisorCount) {
        consecutiveMatchCount++;
      }
    }

    return consecutiveMatchCount;
  }
}
