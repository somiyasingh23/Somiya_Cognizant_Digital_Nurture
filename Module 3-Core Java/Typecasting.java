public class Typecasting{
    public static void main(String[] args) {
        double myDouble = 9.75;

        int myInt = (int) myDouble;

        System.out.println("Original double value: " + myDouble);
        System.out.println("After casting to int: " + myInt);
        int anotherInt = 7;
        double anotherDouble = anotherInt;
        System.out.println("Original int value: " + anotherInt);
        System.out.println("After casting to double: " + anotherDouble);
    }
}
