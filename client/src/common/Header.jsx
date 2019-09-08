import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header>
      <nav className='navbar'>
        <div className='container'>
          <div className='logo_container'>
            <Link to='/'>
              <i className='fa fa-home'></i>Keep Contacts
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
              <li>
                <Link to='/logout'>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
