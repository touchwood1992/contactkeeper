import React, { useState, Fragment, useContext, useEffect } from 'react';
import ContactContext from '../context/Contacts/contactContext';
import AlertContext from '../context/Alert/alertContext';

const AddContact = () => {
	const contactContext = useContext(ContactContext);
	const alertContext = useContext(AlertContext);

	const { addContact, errors, cadded, editContact, updateContact } = contactContext;
	const { setAlerts } = alertContext;

	const [ contact, setContact ] = useState({ name: '', email: '', phone: '', file: '' });
	const { name, email, phone, file } = contact;

	useEffect(
		() => {
			if (editContact !== null) {
				setContact(editContact);
			}
			if (errors.length > 0) {
				errors.map((er) => setAlerts(er.msg, 'danger'));
			}
			if (cadded === true) {
				setAlerts('Contact Added Successfully.', 'success');
				setContact({ name: '', email: '', phone: '' });
			}
		},
		// eslint-disable-next-line
		[ errors, cadded, editContact ]
	);

	const setupContact = (e) => {
		setContact({ ...contact, [e.target.name]: e.target.value });
	};

	const saveContact = (e) => {
		console.log(contact);
		e.preventDefault();
		if (editContact !== null) {
			updateContact(contact);
			setAlerts('Contact Updated Successfully.', 'success');
			setContact({ name: '', email: '', phone: '' });
		} else {
			addContact(contact);
		}
	};

	const setFile = (e) => {
		setContact({ ...contact, file: e.target.files[0] });

		document.getElementById('preview').innerHTML = '';
		const filesource = window.URL.createObjectURL(e.target.files[0]);
		document.getElementById('preview').innerHTML = `<img src="${filesource}" width=50 style="float:left"/>`;
	};

	return (
		<Fragment>
			<h5 className='text-center mt-5'>{editContact !== null ? 'Update Contact' : 'Add Contact'}</h5>
			<form onSubmit={saveContact}>
				<div className='form-group'>
					
					<input
						type='text'
						name='name'
						id='name'
						value={name}
						placeholder='Please Enter Name'
						onChange={setupContact}
						className='form-control'
					/>
				</div>
				<div className='form-group'>
					<input
						type='email'
						name='email'
						id='email'
						value={email}
						placeholder='Please Enter email'
						onChange={setupContact}
						className='form-control'
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						name='phone'
						id='phone'
						value={phone}
						placeholder='Please Enter Phone'
						onChange={setupContact}
						className='form-control'
					/>
				</div>

				<div className='form-group' style={{ display: 'flex' }}>
					<input
						type='file'
						accept='images/*'
						name='cimage'
						id='cimage'
						className='form-cotrol'
						onChange={setFile}
					/>
					<div className='preview' id='preview' />
				</div>

				<div className='form-group'>
					<input
						type='submit'
						value={editContact !== null ? 'Update Contact' : 'Add Contact'}
						className='btn btn-danger'
					/>
				</div>
			</form>
		</Fragment>
	);
};
export default AddContact;
