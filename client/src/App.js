import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './common/Header';
import Footer from './common/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contactus from './pages/Contactus';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ErrorPage from './pages/404';
//import Logout from "./pages/Logout";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Alert from './components/Alert';
import AlertState from './context/Alert/AlertState';
import AuthState from './context/Auth/AuthState';
import PrivateRoute from './privateroute/PrivateRoute';
import ContactState from './context/Contacts/ContactState';
const App = () => {
	return (
		<AuthState>
			<ContactState>
				<AlertState>
					<Router>
						<Header />
						<div className='container mt-2 appalerts'>
							<Alert />
						</div>
						<div className='container'>
							<Switch>
								<PrivateRoute exact path='/' component={Home} />
								<Route exact path='/about' component={About} />
								<Route exact path='/contact' component={Contactus} />
								<Route exact path='/signup' component={Signup} />
								<Route exact path='/login' component={Login} />
								<Route component={ErrorPage} />
							</Switch>
						</div>
						<Footer />
					</Router>
				</AlertState>
			</ContactState>
		</AuthState>
	);
};
export default App;
