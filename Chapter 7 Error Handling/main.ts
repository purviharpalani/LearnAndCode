import * as readline from 'node:readline';
import { ATMService } from './ATMService';
import { Account } from './Account';
import { ErrorHandler } from './ErrorHandler';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function askQuestion(query: string): Promise<string> {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  const account = new Account(10000, 5000);  
  const atmService = new ATMService("1234", account); 

  let isAuthenticated = false;

  // Authentication Loop
  while (!isAuthenticated) {
    const pin = await askQuestion("Enter your PIN: ");
    try {
      atmService.authenticate(pin);
      isAuthenticated = true;
      console.log("Authentication successful.");
    } catch (error: any) {
      ErrorHandler.handleError(error);
    }
  }

  // Main ATM interaction loop
  while (true) {
    console.log("\nATM Menu:");
    console.log("1. Check Balance");
    console.log("2. Withdraw Cash");
    console.log("3. Exit");

    const choice = await askQuestion("Select an option: ");
    if (choice === '1') {
      console.log("Current Balance:", atmService.getBalance());
    } else if (choice === '2') {
      await withdrawCash(atmService);
    } else if (choice === '3') {
      console.log("Thank you for using the ATM.");
      rl.close();
      return;
    } else {
      console.log("Invalid option.");
    }
  }
}

async function withdrawCash(atmService: ATMService) {
  while (true) {
    const isAuthenticated = await authenticateUser(atmService);
    if (!isAuthenticated) return;

    const amount = await getWithdrawalAmount();
    if (amount === null) continue;

    try {
      atmService.withdraw(amount);
      console.log("Withdrawal successful.");
      return;
    } catch (error: any) {
      ErrorHandler.handleError(error);
    }
  }
}

async function authenticateUser(atmService: ATMService): Promise<boolean> {
  const pin = await askQuestion("Re-enter PIN to proceed: ");
  try {
    atmService.authenticate(pin);
    return true;
  } catch (error: any) {
    ErrorHandler.handleError(error);
    if (error.message.includes("Card blocked")) {
      rl.close();
      return false;
    }
    return false;
  }
}

async function getWithdrawalAmount(): Promise<number | null> {
  const amountStr = await askQuestion("Enter amount to withdraw: ");
  const amount = parseInt(amountStr);

  if (isNaN(amount) || amount <= 0) {
    console.log("Invalid amount.");
    return null;
  }
  return amount;
}


main();
