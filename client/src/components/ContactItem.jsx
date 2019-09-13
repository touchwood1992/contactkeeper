import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../context/Contacts/contactContext';

const ContactItem = ({ contact }) => {
	const contactContext = useContext(ContactContext);

	const { deleteContact, setEditContact } = contactContext;

	const deleteme = () => {
		deleteContact(contact._id);
	};

	const updateme = () => {
		setEditContact(contact._id);
	};
	return (
		<div className='contactItem'>
			<div className='cname'>{contact.name}</div>
			<div className='cemail'>{contact.email}</div>
			<div className='cphone'>{contact.phone}</div>
			<button onClick={deleteme} className='btn btn-danger'>
				Delete
			</button>
			<button onClick={updateme} className='btn btn-danger ml-2'>
				Update
			</button>
		</div>
	);
};

ContactItem.propTypes = {
	contact: PropTypes.object.isRequired
};

export default ContactItem;
