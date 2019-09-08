import React, { useReducer } from "react";
import authReducer from "./authReducer";
import AuthContext from "./authContext";
import axios from "axios";
import { USER_SIGNUP, USER_SIGNUP_FAIL, RESET_SIGNUP } from "../types";
const AuthState = props => {
  const defaultState = { token: null, errors: [], isRegistered: false };

  const [state, dispatch] = useReducer(authReducer, defaultState);
  const userSignup = async userObject => {
    try {
      const response = await axios.post("/api/user", userObject, {
        headers: { "content-type": "application/json" }
      });
      dispatch({ type: USER_SIGNUP, payload: response.data });
    } catch (error) {
      dispatch({ type: USER_SIGNUP_FAIL, payload: error.response.data });
    }
  };
  const resetSignup = () => {
    dispatch({ type: RESET_SIGNUP });
  };
  return (
    <AuthContext.Provider
      value={{
        userSignup,
        token: state.token,
        errors: state.errors,
        isRegistered: state.isRegistered,
        resetSignup
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
