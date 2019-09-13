import {
	USER_SIGNUP,
	USER_SIGNUP_FAIL,
	RESET_SIGNUP,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	SET_USER,
	REMOVE_USER,
	LOGOUT_USER
} from '../types';
export default (state, action) => {
	switch (action.type) {
		case USER_SIGNUP:
			return { ...state, ...action.payload, errors: [], isRegistered: true, isLogout: false, user: null };
		case USER_SIGNUP_FAIL:
			return {
				...state,
				token: null,
				errors: action.payload.errors,
				isRegistered: false,
				isLogout: false,
				user: null
			};
		case RESET_SIGNUP:
			return {
				...state,
				token: null,
				errors: [],
				isRegistered: false,
				isLogout: false
			};
		case LOGIN_SUCCESS:
			localStorage.setItem('utoken', action.payload.token);
			return {
				...state,
				...action.payload,
				errors: [],
				isRegistered: false,
				isLogout: false
			};
		case LOGIN_FAIL:
		case REMOVE_USER:
			localStorage.removeItem('utoken');
			return {
				...state,
				token: null,
				errors: action.payload.errors,
				isRegistered: false,
				isLogout: false,
				user: null
			};
		case LOGOUT_USER:
			localStorage.removeItem('utoken');
			return {
				...state,
				token: null,
				errors: [],
				isRegistered: false,
				isLogout: true,
				user: null
			};
		case SET_USER:
			return {
				...state,
				user: action.payload,
				token: localStorage.getItem('utoken'),
				errors: [],
				isLogout: false
			};
		default:
			return { ...state };
	}
};
