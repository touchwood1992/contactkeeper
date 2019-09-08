import React, { useContext, useEffect } from "react";
import AuthContext from "../context/Auth/authContext";
const Login = () => {
  const authContext = useContext(AuthContext);
  const { isRegistered, resetSignup } = authContext;
  useEffect(() => {
    if (isRegistered) {
      resetSignup();
    }
  }, [isRegistered]);
  return <div>Login</div>;
};

export default Login;
