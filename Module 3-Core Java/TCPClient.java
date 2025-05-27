import java.io.*;
import java.net.*;

public class TCPClient {
    public static void main(String[] args) {
        try (Socket socket = new Socket("localhost", 12345)) {
            BufferedReader input = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            BufferedReader console = new BufferedReader(new InputStreamReader(System.in));
            PrintWriter output = new PrintWriter(socket.getOutputStream(), true);

            String clientMsg, serverMsg;

            while (true) {
                System.out.print("Client: ");
                clientMsg = console.readLine();
                output.println(clientMsg);

                if (clientMsg.equalsIgnoreCase("exit")) {
                    System.out.println("Client terminated chat.");
                    break;
                }

                serverMsg = input.readLine();
                if (serverMsg == null || serverMsg.equalsIgnoreCase("exit")) {
                    System.out.println("Server disconnected.");
                    break;
                }
                System.out.println("Server: " + serverMsg);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
