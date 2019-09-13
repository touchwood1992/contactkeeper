import React, { useEffect, useContext } from 'react';
import AuthContext from '../context/Auth/authContext';
import AddContact from '../components/AddContact';
import Contacts from '../components/Contacts';
const Home = (props) => {
	const authContext = useContext(AuthContext);
	const { setUser, user, errors } = authContext;

	useEffect(
		() => {
			if (errors.length > 0) {
				props.history.push('/login');
			} else if (!user) {
				setUser();
			}
		},
		// eslint-disable-next-line
		[ errors, user, props.history ]
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
