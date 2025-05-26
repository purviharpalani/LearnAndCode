export function countDivisors(n: number): number {
  let count = 0;
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      count += (i * i === n) ? 1 : 2;
    }
  }
  return count;
}

export function countConsecutiveMatchesWithSameDivisors(k: number): number {
  if (k <= 2) return 0;

  let total = 0;
  for (let n = 2; n < k; n++) {
    if (countDivisors(n) === countDivisors(n + 1)) {
      total++;
    }
  }
  return total;
}
