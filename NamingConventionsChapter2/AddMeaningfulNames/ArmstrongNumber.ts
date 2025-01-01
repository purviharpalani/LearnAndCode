import promptSync from 'prompt-sync';
const prompt = promptSync();

function calculateArmstrongNumber(originalNumber: number): number {
    let sum = 0;
    let digitCount = 0;

    // Calculate the number of digitCount in the number
    let remainingNumber = originalNumber;
    while (remainingNumber > 0) {
        digitCount++;
        remainingNumber = Math.floor(remainingNumber / 10);
    }

    // Calculate the Armstrong number
    remainingNumber = originalNumber;
    while (remainingNumber > 0) {
        const currentDigit = remainingNumber % 10;
        sum += Math.pow(currentDigit, digitCount);
        remainingNumber = Math.floor(remainingNumber / 10);
    }

    return sum;
}

// User Input
const userInput = prompt("Please enter the number to check for Armstrong:");
if (userInput) {
    const numberToCheck = parseInt(userInput, 10);

    if (numberToCheck === calculateArmstrongNumber(numberToCheck)) {
        console.log(`${numberToCheck} is an Armstrong number.`);
    } else {
        console.log(`${numberToCheck} is not an Armstrong number.`);
    }
}
