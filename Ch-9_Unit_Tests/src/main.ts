import * as readline from "readline";
import { MatchCalculator } from "./MatchCalculator";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter a non-negative integer: ", (answer) => {
  try {
    const input = parseInt(answer, 10);
    const result = MatchCalculator.countConsecutiveMatchesWithSameDivisors(input);
    console.log(`Consecutive numbers with same number of divisors: ${result}`);
  } catch (error: any) {
    console.error("Error:", error.message);
  } finally {
    rl.close();
  }
});
