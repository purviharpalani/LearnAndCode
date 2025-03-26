import { Wallet } from "./wallet";

export class Customer {
    private firstName: string;
    private lastName: string;
    private myWallet: Wallet;

    constructor(firstName: string, lastName: string, initialBalance: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.myWallet = new Wallet(initialBalance);
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getTotalMoney(): number {
        return this.myWallet.getTotalMoney();
    }

    addMoney(amount: number): void {
        this.myWallet.deposit(amount);
    }

    makePayment(amount: number): boolean {
        return this.myWallet.withdraw(amount);
    }
}