import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../context/Alert/alertContext';
import AuthContext from '../context/Auth/authContext';
const Signup = (props) => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);

	const { setAlerts } = alertContext;
	const { userSignup, token, signupMsg, isRegistered, resetSignupErrors } = authContext;

	useEffect(
		() => {
			if (signupMsg.length > 0) {
				signupMsg.map((error) => setAlerts(error.msg, 'danger'));
				resetSignupErrors();
			}
			if (isRegistered) {
				setAlerts('Signup successfully. Please Login here.', 'success', 5000);
				setSignup({
					name: '',
					email: '',
					password: '',
					rpassword: ''
				});
				props.history.push('/login');
			}
			if (token) {
				props.history.push('/');
			}
		},
		// eslint-disable-next-line
		[ isRegistered, signupMsg, props.history, token ]
	);

	const [ signup, setSignup ] = useState({
		name: '',
		email: '',
		password: '',
		rpassword: ''
	});

	const { name, email, password, rpassword } = signup;

	const setForm = (e) => {
		setSignup({ ...signup, [e.target.name]: e.target.value });
	};

	const signupNow = (e) => {
		e.preventDefault();
		if (name === '') return setAlerts('Please Enter Name', 'danger');
		if (email === '') return setAlerts('Please Enter Email', 'danger');
		if (password === '') return setAlerts('Please Enter Password', 'danger');
		if (password !== rpassword) return setAlerts('Password and confirm password not matching', 'danger');

		userSignup({ name, email, password });
	};
	return (
		<div className='row'>
			<div className='col-md-6 offset-md-3'>
				<h5 className='text-center mt-5'>Please Signup Here</h5>

				<form onSubmit={signupNow}>
					<div className='form-group'>
						<input
							type='text'
							name='name'
							id='name'
							className='form-control'
							placeholder='Please Enter Name'
							onChange={setForm}
							value={name}
						/>
					</div>
					<div className='form-group'>
						<input
							type='email'
							name='email'
							id='email'
							className='form-control'
							placeholder='Please Enter Email'
							onChange={setForm}
							value={email}
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							name='password'
							id='password'
							className='form-control'
							placeholder='Please Enter Password'
							onChange={setForm}
							value={password}
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							name='rpassword'
							id='rpassword'
							className='form-control'
							placeholder='Please Confirm Password'
							onChange={setForm}
							value={rpassword}
						/>
					</div>
					<div className='form-group'>
						<button type='submit' className='btn btn-danger'>
							Signup
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
