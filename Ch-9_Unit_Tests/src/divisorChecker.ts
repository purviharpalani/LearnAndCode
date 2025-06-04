function countDivisors(n: number): number {
  let count = 0;
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      count += i * i === n ? 1 : 2;
    }
  }
  return count;
}

export function countConsecutiveMatchesWithSameDivisors(k: number): number {
  if (typeof k !== "number" || isNaN(k)) {
    throw new Error("Input must be a number");
  }

  if (k <= 1) return 0;

  let matchCount = 0;
  for (let n = 2; n <= k; n++) {
    if (countDivisors(n) === countDivisors(n - 1)) {
      matchCount++;
    }
  }
  return matchCount;
}
