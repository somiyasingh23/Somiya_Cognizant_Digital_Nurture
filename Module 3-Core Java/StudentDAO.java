
import java.sql.*;

public class StudentDAO {
    private static final String URL = "jdbc:mysql://localhost:3306/school";
    private static final String USER = "root";
    private static final String PASSWORD = "1920"; 

    Connection conn;

    public StudentDAO() throws SQLException {
        conn = DriverManager.getConnection(URL, USER, PASSWORD);
    }

    public void insertStudent(int id, String name, int age) throws SQLException {
        String sql = "INSERT INTO students (id, name, age) VALUES (?, ?, ?)";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setInt(1, id);
        pstmt.setString(2, name);
        pstmt.setInt(3, age);
        pstmt.executeUpdate();
        System.out.println("Student inserted.");
    }

    public void updateStudentAge(int id, int newAge) throws SQLException {
        String sql = "UPDATE students SET age = ? WHERE id = ?";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setInt(1, newAge);
        pstmt.setInt(2, id);
        int rowsUpdated = pstmt.executeUpdate();
        if (rowsUpdated > 0) {
            System.out.println("Student updated.");
        } else {
            System.out.println("Student not found.");
        }
    }

    public void close() throws SQLException {
        conn.close();
    }
}
