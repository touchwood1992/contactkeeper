import React, { useReducer } from "react";
import authReducer from "./authReducer";
import AuthContext from "./authContext";
import axios from "axios";
import {
  USER_SIGNUP,
  USER_SIGNUP_FAIL,
  RESET_SIGNUP,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_USER
} from "../types";
const AuthState = props => {
  const defaultState = {
    token: null,
    errors: [],
    isRegistered: false,
    user: null
  };

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

  const loginUser = async userCredentials => {
    try {
      const response = await axios.post("/api/auth", userCredentials, {
        headers: { "content-type": "application/json" }
      });

      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data });
    }
  };

  const setUser = async () => {
    try {
      const user = await axios.get("/api/auth", {
        headers: {
          "content-type": "application/json",
          "jwt-auth-token": localStorage.getItem("utoken")
        }
      });
      dispatch({ type: SET_USER, payload: user.data });
    } catch (error) {}
    //dispatch({type:GET_USER,payload:user})
  };
  return (
    <AuthContext.Provider
      value={{
        userSignup,
        token: state.token,
        errors: state.errors,
        isRegistered: state.isRegistered,
        resetSignup,
        loginUser,
        setUser,
        user: state.user
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
