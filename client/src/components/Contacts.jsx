import React, { useEffect, useContext } from 'react';
import ContactItem from './ContactItem';
import ContactContext from '../context/Contacts/contactContext';
import AlertContext from '../context/Alert/alertContext';
const Contacts = (props) => {
	const contactContext = useContext(ContactContext);
	const alertContext = useContext(AlertContext);

	const { allcontacts, getAllcontacts, isdeleted, loading } = contactContext;
	const { setAlerts } = alertContext;

	useEffect(
		() => {
			if (loading === true) {
				getAllcontacts();
			}
			if (isdeleted.length > 0) {
				isdeleted.map((del) => setAlerts(del.msg, 'success'));
			}
		},
		// eslint-disable-next-line
		[ loading, isdeleted ]
	);

	if (isdeleted.length > 0) {
		//console.log(isdeleted);
	}

	return allcontacts.length === 0 ? (
		<div className='text-center'>No contacts Found</div>
	) : (
		<div className='allContacts'>
			{allcontacts.map((contact) => <ContactItem contact={contact} key={contact._id} />)}
		</div>
	);
};
export default Contacts;
