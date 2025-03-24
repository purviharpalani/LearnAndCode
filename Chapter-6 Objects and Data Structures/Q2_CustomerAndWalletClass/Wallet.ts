export class Wallet {
    private value: number;

    constructor(initialAmount: number) {
        this.value = initialAmount;
    }

    getTotalMoney(): number {
        return this.value;
    }

    addMoney(deposit: number): void {
        this.value += deposit;
    }

    subtractMoney(debit: number): boolean {
        if (this.value >= debit) {
            this.value -= debit;
            return true;
        } else {
            console.log("Insufficient funds.");
            return false;
        }
    }
}