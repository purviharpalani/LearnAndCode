public class MainApp {
    public static void main(String[] args) { 
        User user = new User("John", "john@example.com"); 
        
        OrderProcessing orderProcessing = new OrderProcessing();
        orderProcessing.processOrder(user, "Laptop", 3, 700); 
    } 
}
