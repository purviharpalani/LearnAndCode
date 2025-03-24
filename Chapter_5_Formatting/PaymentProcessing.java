public class PaymentProcessing {
    public void makePayment(String cardType, double amount, String cardNumber, String cardExpiry) {
        if(cardType.equals("Credit")) {
            System.out.println("Processing Credit Card payment of $" + amount);
        } else if(cardType.equals("Debit")) {
            System.out.println("Processing Debit Card payment of $" + amount);
        } else {
            System.out.println("Unknown Payment Method");
        }

        if(amount > 1000){
            System.out.println("High-value transaction alert!");
        }
        
        System.out.println(String.format("Payment Done for %s (Card Ending: %s)", cardNumber, cardExpiry.substring(cardExpiry.length() - 4)));
    }
}