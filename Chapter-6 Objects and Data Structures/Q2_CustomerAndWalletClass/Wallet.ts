export class Wallet {
    private value: number;

    constructor(initialAmount: number) {
        this.value = initialAmount;
    }

    getTotalMoney(): number {
        return this.value;
    }

    deposit(amount: number): void {
        this.value += amount;
    }

    withdraw(amount: number): boolean {
        if (this.value >= amount) {
            this.value -= amount;
            return true;
        } else {
            console.log("Insufficient funds.");
            return false;
        }
    }
}