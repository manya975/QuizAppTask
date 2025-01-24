package com.login;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.mindrot.jbcrypt.BCrypt;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String uemail = request.getParameter("useremail");
        String upwd = request.getParameter("password");
        response.setContentType("application/json");
        HttpSession session = request.getSession();

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/questiondb?useSSL=false", "root", "Manya@234");

            String query = "SELECT uname, urole, upwd , uemail FROM users WHERE uemail = ?";
            PreparedStatement pst = con.prepareStatement(query);
            pst.setString(1, uemail);

            ResultSet rs = pst.executeQuery();

            if (rs.next()) {
                String uname = rs.getString("uname");
                String urole = rs.getString("urole");
                String email = rs.getString("uemail");
                System.out.println(email);
                String storedHashedPassword = rs.getString("upwd");

                // Verify the password using bcrypt
                if (BCrypt.checkpw(upwd, storedHashedPassword)) {
                    session.setAttribute("name", uname);
                    session.setAttribute("role", urole);
                    if ("admin".equals(urole))
                        response.sendRedirect("http://localhost:5173/admin");
                    else if ("student".equals(urole))
                        response.sendRedirect("http://localhost:5173/student?email=" + email + "&role=" + urole);
                } else {
                    session.setAttribute("loginError", "Invalid email or password.");
                    response.sendRedirect("http://localhost:3000/login?error=failed");
                }
            } else {
                session.setAttribute("loginError", "Invalid email or password.");
                response.sendRedirect("http://localhost:3000/login?error=failed");
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "An error occurred while processing your request.");
        }
    }
}
