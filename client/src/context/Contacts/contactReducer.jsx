import {
	GET_ALL_CONTACTS,
	ADD_CONTACT,
	ADD_CONTACT_ERROR,
	DELETE_CONTACT,
	RESET_ALL_CONTACTS,
	DELETE_CONTACT_ERROR
} from '../types';
export default (state, action) => {
	switch (action.type) {
		case GET_ALL_CONTACTS:
			return {
				...state,
				allcontacts: action.payload,
				errors: [],
				cadded: false,
				isdeleted: [],
				loading: false
			};
		case ADD_CONTACT:
			return {
				...state,
				allcontacts: [ ...state.allcontacts, action.payload ],
				errors: [],
				cadded: true,
				isdeleted: [],
				loading: false
			};
		case ADD_CONTACT_ERROR:
			return { ...state, errors: action.payload, cadded: false, isdeleted: [], loading: false };

		case DELETE_CONTACT:
			return {
				...state,
				isdeleted: action.payload.success,
				allcontacts: state.allcontacts.filter((c) => c._id !== action.payload.id),
				errors: [],
				loading: false
			};
		case RESET_ALL_CONTACTS:
			return {
				allcontacts: [],
				errors: [],
				cadded: false,
				isdeleted: [],
				loading: true
			};
		case DELETE_CONTACT_ERROR:
			return { ...state, errors: action.payload, cadded: false, isdeleted: [], loading: false };

		default:
			return { ...state };
	}
};
