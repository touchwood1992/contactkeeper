import React, { useEffect, useContext } from 'react';
import AuthContext from '../context/Auth/authContext';
import AlertContext from '../context/Alert/alertContext';
import AddContact from '../components/AddContact';
const Home = (props) => {
	const authContext = useContext(AuthContext);
	const { setUser, user, errors } = authContext;
	const alertContext = useContext(AlertContext);
	useEffect(
		() => {
			if (errors.length > 0) {
				props.history.push('/login');
			} else {
				setUser();
			}
		},
		[ errors, props.history ]
	);

	return (
		user !== null && (
			<div className='row'>
				<div className='col-md-6'>
					<AddContact />
				</div>
				<div className='col-md-6'>Right part</div>
			</div>
		)
	);
};

export default Home;
