import { USER_SIGNUP, USER_SIGNUP_FAIL, RESET_SIGNUP } from "../types";
export default (state, action) => {
  switch (action.type) {
    case USER_SIGNUP:
      return { ...state, ...action.payload, errors: [], isRegistered: true };
    case USER_SIGNUP_FAIL:
      return {
        ...state,
        token: null,
        errors: action.payload.errors,
        isRegistered: false
      };
    case RESET_SIGNUP:
      return {
        ...state,
        token: null,
        errors: [],
        isRegistered: false
      };
    default:
      return { ...state };
  }
};
