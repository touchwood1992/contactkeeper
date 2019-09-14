import React, { useEffect, useContext } from 'react';
import AuthContext from '../context/Auth/authContext';
import AddContact from '../components/AddContact';
import Contacts from '../components/Contacts';

import ContactContext from '../context/Contacts/contactContext';

const Home = (props) => {
	const authContext = useContext(AuthContext);
	const { user, errors, setUser } = authContext;

	const contactContext = useContext(ContactContext);
	const { resetContactState } = contactContext;

	useEffect(
		() => {
			setUser();

			return () => {
				resetContactState();
			};
		},
		// eslint-disable-next-line
		[]
	);

	return (
		user !== null && (
			<div className='row'>
				<div className='col-md-6'>
					<AddContact />
				</div>
				<div className='col-md-6'>
					<h5 className='text-center mt-5'>Your Contacts</h5>
					<Contacts />
				</div>
			</div>
		)
	);
};

export default Home;
