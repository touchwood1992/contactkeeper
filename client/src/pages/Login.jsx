import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/Auth/authContext";
import AlertContext from "../context/Alert/alertContext";
const Login = props => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { isRegistered, resetSignup, errors, loginUser, token } = authContext;
  const { setAlerts } = alertContext;

  useEffect(() => {
    if (isRegistered) {
      resetSignup();
    }
    if (errors.length > 0) {
      errors.map(error => setAlerts(error.msg, "danger"));
    }
    if (token) {
      setAlerts("Signin Successful", "success");
      props.history.push("/");
    }
  }, [isRegistered, errors, token, props.history]);

  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const { email, password } = loginDetails;
  const setForm = e => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const loginNow = e => {
    e.preventDefault();
    loginUser(loginDetails);
  };
  return (
    <div className='row'>
      <div className='col-md-6 offset-md-3'>
        <h5 className='text-center mt-5'>Please Signin Here</h5>
        <form onSubmit={loginNow}>
          <div className='form-group'>
            <input
              type='text'
              name='email'
              id='email'
              placeholder='Enter you email'
              onChange={setForm}
              value={email}
              className='form-control'
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Enter your password'
              onChange={setForm}
              value={password}
              className='form-control'
            />
          </div>
          <div className='form-group'>
            <input type='submit' value='Login' className='btn btn-danger' />
            <a
              href='#'
              className='signup_link ml-2'
              onClick={() => props.history.push("/signup")}
            >
              Signup?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
