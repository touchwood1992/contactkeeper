import React, { useState, Fragment, useContext, useEffect } from 'react';
import ContactContext from '../context/Contacts/contactContext';
import AlertContext from '../context/Alert/alertContext';
import Loading from './Loading';

const AddContact = () => {
	const contactContext = useContext(ContactContext);
	const alertContext = useContext(AlertContext);

	const { addContact, errors, cadded, editContact, updateContact, addContactLoading } = contactContext;
	const { setAlerts } = alertContext;

	const [ contact, setContact ] = useState({
		name: '',
		email: '',
		phone: '',
		file: ''
	});
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

	const setFile = (e) => {
		setContact({ ...contact, file: e.target.files[0] });

		document.getElementById('preview').innerHTML = '';
		const filesource = window.URL.createObjectURL(e.target.files[0]);
		document.getElementById('preview').innerHTML = `<img src="${filesource}" width=50 style="float:left"/>`;
	};

	const saveContact = (e) => {
		e.preventDefault();
		if (editContact !== null) {
			updateContact(contact);
			setAlerts('Contact Updated Successfully.', 'success');
			setContact({ name: '', email: '', phone: '', file: '' });
		} else {
			addContact(contact);
		}
	};

	if (addContactLoading) {
		return <Loading />;
	}

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

				<div className='custom-file' style={{ display: 'flex' }}>
					<input
						type='file'
						accept='image/*'
						name='cimage'
						id='customFile'
						className='custom-file-input'
						onChange={setFile}
					/>
					<label className='custom-file-label' htmlFor='customFile'>
						Choose file
					</label>
				</div>

				<div className='previewFile mt-2' id='preview'>
					{editContact !== null && editContact.cimage !== null && <img src={editContact.cimage} width='50' />}
				</div>

				<div className='form-group'>
					<input
						type='submit'
						value={editContact !== null ? 'Update Contact' : 'Add Contact'}
						className='btn btn-danger mt-2'
					/>
				</div>
			</form>
		</Fragment>
	);
};
export default AddContact;
