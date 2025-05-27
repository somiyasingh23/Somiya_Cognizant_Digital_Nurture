public class Decompile {
    public String greet(String name) {
        return "Hello, " + name;
    }

    public static void main(String[] args) {
        Decompile d = new Decompile();
        System.out.println(d.greet("World"));
    }
}
