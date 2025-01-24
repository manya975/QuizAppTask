package com.registration;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.mindrot.jbcrypt.BCrypt;

@WebServlet("/register")
public class RegistrationServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String uname = request.getParameter("name");
        String uemail = request.getParameter("email");
        String upwd = request.getParameter("pass"); // Password entered by the user
        String urole = request.getParameter("role"); // User role (admin, user, etc.)
        
        RequestDispatcher rd = null;
        Connection con = null;

        // Hash the password using bcrypt
        String hashedPassword = BCrypt.hashpw(upwd, BCrypt.gensalt());

        try {
            // Load the MySQL JDBC driver and establish a connection
            Class.forName("com.mysql.cj.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/questiondb?useSSL=false", "root", "Manya@234");

            // Prepare the SQL statement to insert user data
            PreparedStatement pst = con.prepareStatement("INSERT INTO users(uname, uemail, upwd, urole) VALUES (?, ?, ?, ?)");
            pst.setString(1, uname);
            pst.setString(2, uemail);
            pst.setString(3, hashedPassword);  // Store the hashed password in the database
            pst.setString(4, urole);

            int rs = pst.executeUpdate();
            rd = request.getRequestDispatcher("registration.jsp");

            // Send status to the registration page
            if (rs > 0) {
                request.setAttribute("status", "success");
            } else {
                request.setAttribute("status", "failed");
            }

            rd.forward(request, response);

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (con != null) {
                    con.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
