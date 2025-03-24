import java.util.ArrayList;
import java.util.List;

public class OrderProcessing {
    private List<String> orders = new ArrayList<>();

    public void orderDetails(User user, String itemName, int quantity, double pricePerUnit) {
        double total = quantity * pricePerUnit;
        if(quantity > 5){
            total *= 0.85;
        }

        orders.add(String.format("Item: %s, Qty: %d, Total: %.2f", itemName, quantity, total));

        System.out.println("Order Placed!");
        System.out.println(String.format("User: %s, Item: %s, Quantity: %d, Total: %.2f", user.getName(), itemName, quantity, total));

        if(quantity > 10) {
            System.out.println("Bulk Order Alert!");
        }

        sendEmail(user.getEmail(), String.format("Order placed for %s with total cost %.2f", itemName, total));
    }

    private void sendEmail(String email, String message) {
        System.out.println(String.format("Sending email to: %s Message: %s", email, message));
    }
}