import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contactus from "./pages/Contactus";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
//import Logout from "./pages/Logout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Alert from "./components/Alert";
import AlertState from "./context/Alert/AlertState";
import AuthState from "./context/Auth/AuthState";
const App = () => {
  return (
    <AuthState>
      <AlertState>
        <Router>
          <Header />
          <div className='container mt-2 appalerts'>
            <Alert></Alert>
          </div>
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home}></Route>
              <Route exact path='/about' component={About}></Route>
              <Route exact path='/contact' component={Contactus}></Route>
              <Route exact path='/signup' component={Signup}></Route>
              <Route exact path='/login' component={Login}></Route>
            </Switch>
          </div>
          <Footer />
        </Router>
      </AlertState>
    </AuthState>
  );
};
export default App;
