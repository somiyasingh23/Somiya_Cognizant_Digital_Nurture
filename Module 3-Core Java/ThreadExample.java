class MessagePrinter implements Runnable {
    private String message;

    public MessagePrinter(String message) {
        this.message = message;
    }

    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(message + " - " + i);
        }
    }
}

public class ThreadExample {
    public static void main(String[] args) {
        Thread thread1 = new Thread(new MessagePrinter("Thread 1"));
        Thread thread2 = new Thread(new MessagePrinter("Thread 2"));

        thread1.start();
        thread2.start();
    }
}
