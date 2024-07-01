 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './guestnavbar.css';
import logo from '../images/logosfolder/applogo.png';
 
const GuestNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
 
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
 
  const handleDropdownItemClick = () => {
    setIsDropdownOpen(false);
  };
 
  const handleSignupClick = () => {
    navigate('/signup');
  };
 
  const handleAboutUsClick = () => {
    navigate('/aboutus');
  };

  return (
    <nav className="guestnavbar">
      <div className="guestnavbar-left">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className='guestheading'>Insurre</h1>
        </div>
      </div>
      <div className="guestnavbar-right">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/aboutus" onClick={handleAboutUsClick}>About</a></li>
          <li className="dropdown" onClick={handleDropdownToggle}>
            <a href="#">Login</a>
            <div className={isDropdownOpen ? "dropdown-menu open" : "dropdown-menu"}>
              <a href="/admin" onClick={handleDropdownItemClick}>Admin</a>
              <a href="/user" onClick={handleDropdownItemClick}>User</a>
              <a href="/agent" onClick={handleDropdownItemClick}>Agent</a>
            </div>
          </li>
          <li><a href="/signup" onClick={handleSignupClick}>Signup</a></li>
        </ul>
      </div>
    </nav>
  );
};
 
export default GuestNavbar;
 