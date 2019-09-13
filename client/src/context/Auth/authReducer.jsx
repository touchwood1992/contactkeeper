import {
	USER_SIGNUP,
	USER_SIGNUP_FAIL,
	RESET_SIGNUP,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	SET_USER,
	REMOVE_USER,
	LOGOUT_USER,
	RESET_LOGIN_ERRORS,
	RESET_SIGNUP_ERRORS
} from '../types';
export default (state, action) => {
	switch (action.type) {
		case USER_SIGNUP:
			return {
				...state,
				...action.payload,
				signupMsg: [],
				loginMsg: [],
				isRegistered: true,
				isLogout: false,
				user: null
			};
		case USER_SIGNUP_FAIL:
			return {
				...state,
				token: null,
				loginMsg: [],
				signupMsg: action.payload.errors,
				isRegistered: false,
				isLogout: false,
				user: null
			};
		case RESET_SIGNUP:
			return {
				...state,
				token: null,
				isRegistered: false,
				isLogout: false,
				signupMsg: [],
				loginMsg: []
			};
		case LOGIN_SUCCESS:
			localStorage.setItem('utoken', action.payload.token);
			return {
				...state,
				...action.payload,
				isRegistered: false,
				isLogout: false,
				signupMsg: [],
				loginMsg: []
			};
		case LOGIN_FAIL:
		case REMOVE_USER:
			localStorage.removeItem('utoken');
			return {
				...state,
				token: null,
				signupMsg: [],
				loginMsg: action.payload.errors,
				isRegistered: false,
				isLogout: false,
				user: null
			};
		case LOGOUT_USER:
			localStorage.removeItem('utoken');
			return {
				...state,
				token: null,
				signupMsg: [],
				loginMsg: [],
				isRegistered: false,
				isLogout: true,
				user: null
			};
		case SET_USER:
			return {
				...state,
				user: action.payload,
				token: localStorage.getItem('utoken'),
				signupMsg: [],
				loginMsg: [],
				isLogout: false
			};

		case RESET_LOGIN_ERRORS:
			return { ...state, loginMsg: [] };

		case RESET_SIGNUP_ERRORS:
			return { ...state, signupMsg: [] };

		default:
			return { ...state };
	}
};
