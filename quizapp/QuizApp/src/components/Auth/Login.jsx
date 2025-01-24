import { useEffect } from "react";

function Login() {
  useEffect(() => {
    window.location.href = "http://localhost:8787/basicLoginSignupProject/login.jsp";
  }, []);

  return null; 
}

export default Login;
