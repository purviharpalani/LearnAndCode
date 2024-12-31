import * as promptSync from 'prompt-sync';
const prompt = promptSync();

function isValidGuess(guess: string): boolean {
    const number = parseInt(guess, 10);
    return !isNaN(number) && number >= 1 && number <= 100;
}

function main(): void {
    const targetNumber = Math.floor(Math.random() * 100) + 1;
    let isGuessed = false;
    let attempts = 0;

    let userGuessString = prompt("Guess a number between 1 and 100:");

    while (!isGuessed) {
        if (!userGuessString || !isValidGuess(userGuessString)) {
            userGuessString = prompt("I won't count this one. Please enter a number between 1 and 100:");
            continue;
        }

        attempts++;
        const userGuessNumeric = parseInt(userGuessString, 10);

        if (userGuessNumeric < targetNumber) {
            userGuessString = prompt("Too low. Guess again:");
        } else if (userGuessNumeric > targetNumber) {
            userGuessString = prompt("Too high. Guess again:");
        } else {
            console.log(`You guessed it in ${attempts} guesses!`);
            isGuessed = true;
        }
    }
}

main();
