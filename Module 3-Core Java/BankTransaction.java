import java.sql.*;

public class BankTransaction {
    static final String URL = "jdbc:mysql://localhost:3306/bank";
    static final String USER = "root";
    static final String PASS = "1920"; 

    public static void main(String[] args) {
        Connection conn = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(URL, USER, PASS);

            conn.setAutoCommit(false); 

            PreparedStatement debit = conn.prepareStatement("UPDATE accounts SET balance = balance - ? WHERE acc_no = ?");
            debit.setDouble(1, 1000.0);
            debit.setInt(2, 101); 
            debit.executeUpdate();

            PreparedStatement credit = conn.prepareStatement("UPDATE accounts SET balance = balance + ? WHERE acc_no = ?");
            credit.setDouble(1, 1000.0);
            credit.setInt(2, 102); 
            credit.executeUpdate();

            conn.commit(); 
            System.out.println("Transaction successful.");

        } catch (Exception e) {
            try {
                if (conn != null) {
                    conn.rollback(); 
                    System.out.println("Transaction failed. Rolled back.");
                }
            } catch (SQLException se) {
                System.out.println("Rollback failed: " + se.getMessage());
            }
            System.out.println("Error: " + e.getMessage());
        } finally {
            try {
                if (conn != null) conn.close();
            } catch (SQLException se) {
                System.out.println("Close failed: " + se.getMessage());
            }
        }
    }
}
