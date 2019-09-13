import React, { useReducer } from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';

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

import axios from 'axios';

const ContactState = (props) => {
	const defaultState = {
		allcontacts: [],
		errors: [],
		cadded: false,
		isdeleted: [],
		loading: true,
		editContact: null
	};

	const [ state, dispatch ] = useReducer(contactReducer, defaultState);

	const getAllcontacts = async () => {
		try {
			const res = await axios.get('/api/contact', {
				headers: { 'content-type': 'application/json', 'jwt-auth-token': localStorage.getItem('utoken') }
			});
			const contacts = res.data;
			dispatch({ type: GET_ALL_CONTACTS, payload: contacts });
		} catch (error) {}
	};

	const addContact = async (contact) => {
		try {
			const res = await axios.post('/api/contact', contact, {
				headers: { 'content-type': 'application/json', 'jwt-auth-token': localStorage.getItem('utoken') }
			});
			const addedcontact = res.data;
			dispatch({ type: ADD_CONTACT, payload: addedcontact });
		} catch (error) {
			dispatch({ type: ADD_CONTACT_ERROR, payload: error.response.data.errors });
		}
	};

	const deleteContact = async (id) => {
		try {
			const req = await axios.delete(`/api/contact/${id}`, {
				headers: { 'jwt-auth-token': localStorage.getItem('utoken') }
			});
			dispatch({ type: DELETE_CONTACT, payload: { id, success: req.data.errors } });
		} catch (error) {
			dispatch({ type: DELETE_CONTACT_ERROR, payload: error.response.data.errors });
		}
	};

	const clearallcontacts = () => {
		dispatch({ type: RESET_ALL_CONTACTS });
	};

	const setEditContact = (id) => {
		dispatch({ type: SET_CONTACT, payload: id });
	};

	const updateContact = async (contact) => {
		try {
			const res = await axios.put(`/api/contact/${contact._id}`, contact, {
				headers: {
					'content-type': 'application/json',
					'jwt-auth-token': localStorage.getItem('utoken')
				}
			});

			dispatch({ type: UPDATE_CONTACT, payload: res.data });
			console.log(state.allcontacts);
		} catch (error) {
			//dispatch({ type: UPDATE_CONTACT_FAIL, payload: error.response.data.errors });
		}
	};

	return (
		<ContactContext.Provider
			value={{
				allcontacts: state.allcontacts,
				addContact,
				getAllcontacts,
				errors: state.errors,
				cadded: state.cadded,
				deleteContact,
				isdeleted: state.isdeleted,
				clearallcontacts,
				loading: state.loading,
				editContact: state.editContact,
				setEditContact,
				updateContact
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};
export default ContactState;
