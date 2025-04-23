export class Account {
    private balance: number;
    private dailyWithdrawalLimit: number;
    private withdrawnToday: number = 0;
  
    constructor(balance: number, dailyWithdrawalLimit: number) {
      this.balance = balance;
      this.dailyWithdrawalLimit = dailyWithdrawalLimit;
    }
  
    getBalance(): number {
      return this.balance;
    }
  
    withdraw(amount: number): void {
      if (amount > this.balance) {
        throw new Error("Insufficient funds in your account.");
      }
      if (this.withdrawnToday + amount > this.dailyWithdrawalLimit) {
        throw new Error("Daily withdrawal limit exceeded.");
      }
      this.balance -= amount;
      this.withdrawnToday += amount;
    }
  }
  