import * as promptSync from 'prompt-sync';
const prompt = promptSync();

function isValidGuess(input: string): boolean {
    const number = parseInt(input, 10);
    return !isNaN(number) && number >= 1 && number <= 100;
}

function getUserGuess(message: string): string | null {
    return prompt(message);
}

function parseGuess(userGuess: string): number {
    return parseInt(userGuess, 10);
}

function provideFeedback(guess: number, target: number): string {
    if (guess < target) return "Too low. Guess again:";
    if (guess > target) return "Too high. Guess again:";
    return "correct";
}

function generateRandomNumber(): number {
    return Math.floor(Math.random() * 100) + 1;
}

function runGameLoop(targetNumber: number): void {
    let guessedCorrectly = false;
    let attempts = 0;
    let userGuess: string | null = getUserGuess("Guess a number between 1 and 100:");

    while (!guessedCorrectly) {
        if (!userGuess || !isValidGuess(userGuess)) {
            userGuess = getUserGuess("Invalid input. Please enter a number between 1 and 100:");
            continue;
        }

        attempts++;
        const guessedNumber = parseGuess(userGuess);
        const feedback = provideFeedback(guessedNumber, targetNumber);

        if (feedback === "correct") {
            prompt(`You guessed it in ${attempts} attempts!`);
            guessedCorrectly = true;
        } else {
            userGuess = getUserGuess(feedback);
        }
    }
}

function playGuessingGame(): void {
    const targetNumber = generateRandomNumber();
    runGameLoop(targetNumber);
}

playGuessingGame();
