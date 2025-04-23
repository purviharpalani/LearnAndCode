import { Account } from './Account';

export class ATMService {
  private correctPin: string;
  private pinAttempts: number = 0;
  private isBlocked: boolean = false;
  private account: Account;

  constructor(pin: string, account: Account) {
    this.correctPin = pin;
    this.account = account;
  }

  authenticate(pin: string): void {
    if (this.isBlocked) {
      throw new Error("Card is blocked.");
    }

    if (pin !== this.correctPin) {
      this.pinAttempts++;
      if (this.pinAttempts >= 3) {
        this.isBlocked = true;
        throw new Error("Card blocked after 3 invalid attempts.");
      }
      throw new Error("Incorrect PIN.");
    }

    this.pinAttempts = 0; 
  }

  getBalance(): number {
    return this.account.getBalance();
  }

  withdraw(amount: number): void {
    this.account.withdraw(amount);
  }

  isCardBlocked(): boolean {
    return this.isBlocked;
  }
}
