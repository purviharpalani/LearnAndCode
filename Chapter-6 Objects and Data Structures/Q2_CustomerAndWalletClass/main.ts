import { Customer } from "./customer";

const myCustomer = new Customer("Purvi", "Harpalani", 10.00);

const payment = 2.00;
console.log("I want my two dollars!");

if (myCustomer.makePayment(payment)) {
    console.log("Payment received!");
} else {
    console.log("Come back later and get my money.");
}
