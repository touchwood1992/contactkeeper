import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/Auth/authContext';
import ContactContext from '../context/Contacts/contactContext';
import AlertContext from '../context/Alert/alertContext';
import { Redirect } from 'react-router-dom';
const Header = () => {
	const authContext = useContext(AuthContext);
	const contactContext = useContext(ContactContext);
	const alertContext = useContext(AlertContext);

	const { user, logoutUser, isLogout, setUser, resetSignup } = authContext;
	const { clearallcontacts } = contactContext;
	const { setAlerts } = alertContext;

	useEffect(
		() => {
			if (isLogout === false) {
				setUser();
			}
		},
		[ isLogout ]
	);
	const logout = (e) => {
		e.preventDefault();
		logoutUser();
		clearallcontacts();
	};

	if (isLogout === true) {
		resetSignup();
		setAlerts('You are successfully logout.', 'success');
		return <Redirect to='/login' push={true} />;
	}
	return (
		<header>
			<nav className='navbar'>
				<div className='container'>
					<div className='logo_container'>
						<Link to='/'>
							<i className='fa fa-home' />Keep Contacts
						</Link>
					</div>
					<div className='right_container'>
						<ul className='main_menu'>
							<li>
								<Link to='/'>Home</Link>
							</li>
							<li>
								<Link to='/about'>About</Link>
							</li>
							<li>
								<Link to='/contact'>Contact</Link>
							</li>
							{user === null && (
								<React.Fragment>
									<li>
										<Link to='/login'>Login</Link>
									</li>
									<li>
										<Link to='/signup'>Signup</Link>
									</li>
								</React.Fragment>
							)}

							{user !== null && (
								<React.Fragment>
									<li className='userdetail_container'>
										<i className='fa fa-user' />
										<span className='uname'>Hi, {user.name}</span>
									</li>
									<li>
										<a href='/logout' onClick={logout}>
											<i className='fas fa-sign-out-alt' />Logout
										</a>
									</li>
								</React.Fragment>
							)}
						</ul>
					</div>
				</div>
			</nav>
		</header>
	);
};
export default Header;
