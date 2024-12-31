// def fun(s):
//     if s.isdigit() and 1<= int(s) <=100:
//         return True
//     else:
//         return False

// def main():
//     n=random.randint(1,100)
//     gn=False
//     g=input("Guess a number between 1 and 100:")
//     ng=0
//     while not gn:
//         if not fun(g):
//             g=input("I wont count this one Please enter a number between 1 to 100")
//             continue
//         else:
//             ng+=1
//             g=int(g)

//         if g<n:
//             g=input("Too low. Guess again")
//         elif g>n:
//             g=input("Too High. Guess again")
//         else:
//             print("You guessed it in",ng,"guesses!")
//             gn=True


// main()

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
