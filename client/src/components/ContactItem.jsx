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
			<div className='cname'>
				<i className='fa fa-user mr-2' />
				{contact.name}
			</div>
			<div className='cemail'>
				<i className='fa fa-envelope mr-2' />
				{contact.email}
			</div>
			<div className='cphone'>
				<i className='fa fa-phone mr-2' />
				{contact.phone}
			</div>
			{contact.cimage !== null && <img src={contact.cimage} width='50' className='mt-2' />}
			<div className='actionContainer mt-2'>
				<button onClick={deleteme} className='btn btn-danger '>
					Delete
				</button>
				<button onClick={updateme} className='btn btn-danger ml-2'>
					Update
				</button>
			</div>
		</div>
	);
};

ContactItem.propTypes = {
	contact: PropTypes.object.isRequired
};

export default ContactItem;
