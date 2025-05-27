public class OperatorPrecedence {
    public static void main(String[] args) {
        // Expression 1: Multiplication has higher precedence than addition
        int result1 = 10 + 5 * 2;
        System.out.println("Result 1 (10 + 5 * 2): " + result1);  // Output: 20

        // Expression 2: Parentheses change the precedence
        int result2 = (10 + 5) * 2;
        System.out.println("Result 2 ((10 + 5) * 2): " + result2);  // Output: 30

        // Expression 3: Mixed operators
        int result3 = 100 / 10 + 4 * 3 - 2;
        System.out.println("Result 3 (100 / 10 + 4 * 3 - 2): " + result3);  // Output: 20

        // Expression 4: Parentheses override precedence again
        int result4 = 100 / (10 + 4) * (3 - 2);
        System.out.println("Result 4 (100 / (10 + 4) * (3 - 2)): " + result4);  // Output: 7
    }
}
