import React, { useState, useEffect, useContext } from 'react';
const AddContact = () => {
	const [ contact, setContact ] = useState({ name: '', email: '', phone: '' });
	const { name, email, phone } = contact;

	const setupContact = (e) => {
		setContact({ ...contact, [e.target.name]: e.target.value });
	};
	const saveContact = (e) => {
		e.preventDefault();
		console.log(contact);
	};
	return (
		<form onSubmit={saveContact}>
			<input
				type='text'
				name='name'
				id='name'
				value={name}
				placeholder='Please Enter Name'
				onChange={setupContact}
			/>
			<input
				type='email'
				name='email'
				id='email'
				value={email}
				placeholder='Please Enter email'
				onChange={setupContact}
			/>
			<input
				type='text'
				name='phone'
				id='phone'
				value={phone}
				placeholder='Please Enter Phone'
				onChange={setupContact}
			/>
			<input type='submit' value='Create Contact' />
		</form>
	);
};
export default AddContact;
