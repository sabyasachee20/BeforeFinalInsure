import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UserNavbar.css';
import logo from '../images/logosfolder/applogo.png';

function Navbar1() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleConfirmLogout = () => {
    setShowModal(false);
    navigate('/');
  };

  const handleCancelLogout = () => {
    setShowModal(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="logo-name">Insurre</h1>
        </div>
        <ul className="navbar-links">
          <li className="navbar-item"><Link to="/section2">Home</Link></li>
          <li className="navbar-item"><Link to="/useredit">Username</Link></li>
          <li className="navbar-item"><Link to="/mypolicies">My Policies</Link></li>
          <li className="navbar-item"><Link to="/viewTickets">View Tickets</Link></li>
          <li className="navbar-item"><Link to="/helpme">Help Me</Link></li>
          {/* <li className="navbar-item"><Link to="/" onClick={handleLogoutClick}>Logout</Link></li> */}
        </ul>
      </nav>

      {showModal && (
        <div className="logout-modal-overlay">
          <div className="logout-modal">
            <div className="logout-modal-header">
              <h2>Are you sure you want to logout?</h2>
              <button className="close-button" onClick={handleCancelLogout}>&times;</button>
            </div>
            <div className="logout-modal-body">
              <button className="confirm-button" onClick={handleConfirmLogout}>Yes</button>
              <button className="cancel-button" onClick={handleCancelLogout}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar1;
