import {
	GET_ALL_CONTACTS,
	ADD_CONTACT,
	ADD_CONTACT_ERROR,
	DELETE_CONTACT,
	RESET_ALL_CONTACTS,
	DELETE_CONTACT_ERROR,
	SET_CONTACT,
	UPDATE_CONTACT
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
				loading: false,
				editContact: null
			};
		case ADD_CONTACT:
			return {
				...state,
				allcontacts: [ ...state.allcontacts, action.payload ],
				errors: [],
				cadded: true,
				isdeleted: [],
				loading: false,
				editContact: null
			};
		case ADD_CONTACT_ERROR:
			return {
				...state,
				errors: action.payload,
				cadded: false,
				isdeleted: [],
				loading: false,
				editContact: null
			};

		case DELETE_CONTACT:
			return {
				...state,
				isdeleted: action.payload.success,
				allcontacts: state.allcontacts.filter((c) => c._id !== action.payload.id),
				cadded: false,
				errors: [],
				loading: false,
				editContact: null
			};
		case RESET_ALL_CONTACTS:
			return {
				allcontacts: [],
				errors: [],
				cadded: false,
				isdeleted: [],
				loading: true,
				editContact: null
			};
		case DELETE_CONTACT_ERROR:
			return {
				...state,
				errors: action.payload,
				cadded: false,
				isdeleted: [],
				loading: false,
				editContact: null
			};

		case SET_CONTACT:
			return {
				...state,
				errors: [],
				cadded: false,
				isdeleted: [],
				loading: false,
				editContact: state.allcontacts.find((contact) => contact._id === action.payload)
			};
		case UPDATE_CONTACT:
			return {
				...state,
				errors: [],
				cadded: false,
				isdeleted: [],
				loading: false,
				editContact: null,
				allcontacts: state.allcontacts.map((contact) => {
					if (contact._id === action.payload._id) {
						return action.payload;
					} else {
						return contact;
					}
				})
			};
		default:
			return { ...state };
	}
};
