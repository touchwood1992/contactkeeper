import {
	USER_SIGNUP,
	USER_SIGNUP_FAIL,
	RESET_SIGNUP,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	SET_USER,
	REMOVE_USER
} from '../types';
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
		case LOGIN_SUCCESS:
			localStorage.setItem('utoken', action.payload.token);
			return {
				...state,
				...action.payload,
				errors: [],
				isRegistered: false
			};
		case LOGIN_FAIL:
		case REMOVE_USER:
			localStorage.removeItem('utoken');
			return {
				...state,
				token: null,
				errors: action.payload.errors,
				isRegistered: false
			};
		case SET_USER:
			return { ...state, user: action.payload, token: localStorage.getItem('utoken') };
		default:
			return { ...state };
	}
};
