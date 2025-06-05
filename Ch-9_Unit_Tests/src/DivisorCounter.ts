export class DivisorCounter {
  static countDivisors(n: number): number {
    let count = 0;
    const sqrt = Math.floor(Math.sqrt(n));

    for (let i = 1; i <= sqrt; i++) {
      if (n % i === 0) {
        count += (i * i === n) ? 1 : 2;
      }
    }

    return count;
  }
}
