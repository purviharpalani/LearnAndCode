export class ErrorHandler {
    static handleError(error: Error): void {
      if (error.message.includes("Card blocked")) {
        console.log("Error: Your card is blocked after 3 invalid attempts.");
      } else if (error.message.includes("Incorrect PIN")) {
        console.log("Error: Incorrect PIN entered.");
      } else if (error.message.includes("Insufficient funds")) {
        console.log("Error: Insufficient funds in your account.");
      } else if (error.message.includes("Daily withdrawal limit exceeded")) {
        console.log("Error: You have exceeded your daily withdrawal limit.");
      } else {
        console.log("Unexpected error:", error.message);
      }
    }
  }
  