public class Javap1 {
    public int square(int x) {
        return x * x;
    }

    public static void main(String[] args) {
        Javap1 obj = new Javap1();
        System.out.println(obj.square(5));
    }
}
