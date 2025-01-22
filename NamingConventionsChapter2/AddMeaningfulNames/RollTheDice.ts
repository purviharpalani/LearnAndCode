import * as promptSync from 'prompt-sync';
const prompt = promptSync();

function rollDice(sides: number): number {
    return Math.floor(Math.random() * sides) + 1; // Random number between 1 and sides
}

function main(): void {
    const sidesOfDice = 6;
    let userWantsToContinue = true;

    while (userWantsToContinue) {
        const userInput = prompt("Ready to roll? Enter Q to Quit");

        if (userInput && userInput.toLowerCase() !== "q") {
            const rollResult = rollDice(sidesOfDice);
            console.log(`You have rolled a ${rollResult}`);
        } else {
            userWantsToContinue = false;
        }
    }
}

main();
