export class Account {
    private balance: number;
    private dailyLimit: number;
    private withdrawnToday: number = 0;
  
    constructor(balance: number, dailyLimit: number) {
      this.balance = balance;
      this.dailyLimit = dailyLimit;
    }
  
    getBalance(): number {
      return this.balance;
    }
  
    withdraw(amount: number): void {
      if (amount > this.balance) {
        throw new Error("Insufficient funds in your account.");
      }
      if (this.withdrawnToday + amount > this.dailyLimit) {
        throw new Error("Daily withdrawal limit exceeded.");
      }
      this.balance -= amount;
      this.withdrawnToday += amount;
    }
  }
  