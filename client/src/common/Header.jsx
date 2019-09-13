import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
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
		// eslint-disable-next-line
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
						<NavLink exact activeClassName='is-active' to='/'>
							<i className='fa fa-home' />Keep Contacts
						</NavLink>
					</div>
					<div className='right_container'>
						<ul className='main_menu'>
							<li>
								<NavLink exact activeClassName='is-active' to='/'>
									Home
								</NavLink>
							</li>
							<li>
								<NavLink exact activeClassName='is-active' to='/about'>
									About
								</NavLink>
							</li>
							<li>
								<NavLink exact activeClassName='is-active' to='/contact'>
									Contact
								</NavLink>
							</li>
							{user === null && (
								<React.Fragment>
									<li>
										<NavLink exact activeClassName='is-active' to='/login'>
											Login
										</NavLink>
									</li>
									<li>
										<NavLink exact activeClassName='is-active' to='/signup'>
											Signup
										</NavLink>
									</li>
								</React.Fragment>
							)}

							{user !== null && (
								<React.Fragment>
									<li className='userdetail_container'>
										<i className='ml-2 mr-2 fa fa-user' />
										<span className='uname mr-2'>Hi, {user.name}</span>
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
