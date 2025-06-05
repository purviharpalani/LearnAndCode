export class DivisorCounter {
  static getDivisorCount(targetNumber: number): number {
    let divisorCount = 0;
    const squareRoot = Math.floor(Math.sqrt(targetNumber));

    for (let divisor = 1; divisor <= squareRoot; divisor++) {
      if (targetNumber % divisor === 0) {
        const isPerfectSquare = divisor * divisor === targetNumber;
        divisorCount += isPerfectSquare ? 1 : 2;
      }
    }

    return divisorCount;
  }
}
