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
	UPDATE_CONTACT,
	SET_LOADING,
	SET_ALLCONTENT_LOADING
} from '../types';

import axios from 'axios';

const ContactState = (props) => {
	const defaultState = {
		allcontacts: [],
		errors: [],
		cadded: false,
		isdeleted: [],
		loading: true,
		editContact: null,
		addContactLoading: false,
		getAllContactsLoading: false
	};

	const [ state, dispatch ] = useReducer(contactReducer, defaultState);

	const getAllcontacts = async () => {
		dispatch({ type: SET_ALLCONTENT_LOADING });
		try {
			const res = await axios.get('/api/contact', {
				headers: { 'content-type': 'application/json', 'jwt-auth-token': localStorage.getItem('utoken') }
			});
			const contacts = res.data;
			dispatch({ type: GET_ALL_CONTACTS, payload: contacts });
		} catch (error) {}
	};

	const addContact = async (contact) => {
		dispatch({ type: SET_LOADING });
		try {
			const bodyFormData = new FormData();
			bodyFormData.append('name', contact.name);
			bodyFormData.append('email', contact.email);
			bodyFormData.append('phone', contact.phone);
			if (contact.file !== '') {
				bodyFormData.append('cimage', contact.file);
			}

			const res = await axios.post('/api/contact', bodyFormData, {
				headers: {
					//'content-type': 'application/json',
					'Content-Type': 'multipart/form-data',
					'jwt-auth-token': localStorage.getItem('utoken')
				}
			});
			const addedcontact = res.data;
			dispatch({ type: ADD_CONTACT, payload: addedcontact });
		} catch (error) {
			dispatch({ type: ADD_CONTACT_ERROR, payload: error.response.data.errors });
		}
	};

	const deleteContact = async (id) => {
		dispatch({ type: SET_ALLCONTENT_LOADING });
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
		dispatch({ type: SET_LOADING });
		try {
			const bodyFormData = new FormData();
			bodyFormData.append('name', contact.name);
			bodyFormData.append('email', contact.email);
			bodyFormData.append('phone', contact.phone);
			if (typeof contact.file === 'object') {
				bodyFormData.append('cimage', contact.file);
			}

			const res = await axios.put(`/api/contact/${contact._id}`, bodyFormData, {
				headers: {
					'content-type': 'multipart/form-data',
					'jwt-auth-token': localStorage.getItem('utoken')
				}
			});

			dispatch({ type: UPDATE_CONTACT, payload: res.data });
		} catch (error) {
			console.log(error);
			//dispatch({ type: UPDATE_CONTACT_FAIL, payload: error.response.data.errors });
		}
	};

	const resetContactState = () => {
		dispatch({ type: RESET_ALL_CONTACTS });
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
				updateContact,
				resetContactState,
				addContactLoading: state.addContactLoading,
				getAllContactsLoading: state.getAllContactsLoading
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};
export default ContactState;
