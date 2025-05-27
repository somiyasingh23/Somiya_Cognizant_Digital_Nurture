public class VirtualThreadsSimple {
    public static void main(String[] args) throws InterruptedException {
        Thread[] threads = new Thread[1000];

        for (int i = 0; i < 1000; i++) {
            threads[i] = Thread.startVirtualThread(() -> {
                System.out.println("Hello from virtual thread " + Thread.currentThread().getName());
            });
        }

        for (Thread t : threads) {
            t.join();
        }

        System.out.println("All virtual threads finished.");
    }
}
