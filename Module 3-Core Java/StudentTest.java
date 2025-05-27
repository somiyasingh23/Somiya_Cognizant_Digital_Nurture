import java.sql.*;

public class StudentTest {
    public static void main(String[] args) {
        try {
            StudentDAO dao = new StudentDAO();

            dao.insertStudent(101, "Alice", 20);
            dao.insertStudent(102, "Bob", 22);

            dao.updateStudentAge(101, 21);

            dao.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
