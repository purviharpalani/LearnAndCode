import * as readline from "readline";
import { MatchCalculator } from "./MatchCalculator";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter a non-negative integer: ", (userInput) => {
  try {
    const parsedInput = parseInt(userInput, 10);
    const result = MatchCalculator.countConsecutiveNumbersWithSameDivisorCount(parsedInput);
    console.log(`Consecutive numbers with the same number of divisors: ${result}`);
  } catch (error: any) {
    console.error("Error:", error.message);
  } finally {
    rl.close();
  }
});
