public class MethodOverloading {
    
    public static int add(int a, int b) {
        return a + b;
    }


    public static double add(double a, double b) {
        return a + b;
    }

   
    public static int add(int a, int b, int c) {
        return a + b + c;
    }

    public static void main(String[] args) {
    
        System.out.println("Sum of 2 ints (5 + 10): " + add(5, 10));
        System.out.println("Sum of 2 doubles (3.5 + 4.8): " + add(3.5, 4.8));
        System.out.println("Sum of 3 ints (1 + 2 + 3): " + add(1, 2, 3));
    }
}
