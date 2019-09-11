import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/Auth/authContext';
const Header = () => {
	const authContext = useContext(AuthContext);

	const { user } = authContext;

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
							<li>
								<Link to='/login'>Login</Link>
							</li>
							<li>
								<Link to='/signup'>Signup</Link>
							</li>
							{user !== null && (
								<li className='userdetail_container'>
									<i className='fa fa-user' />
									<span className='uname'>Hi, {user.name}</span>
								</li>
							)}
						</ul>
					</div>
				</div>
			</nav>
		</header>
	);
};
export default Header;
