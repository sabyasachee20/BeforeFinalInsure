import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import './guesfooter.css';
import insurance2 from '../images/userimages/landingsection.png';
import autoinsurance from '../images/userimages/autoinsurance.png';
import healthinsurance from '../images/userimages/healthinsurance.png';
import terminsurance from '../images/userimages/lifeinsurance.png';
import GuestNavbar from './guestnavbar';
import GuestMid from './guestmid';
import Calculator1 from '../Userinterface/premiumcalculator1';

Modal.setAppElement('#root');

function GuestFooter() {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const navigateToComponent = (path) => {
    openModal();
  };

  return (
    <div>
      <GuestNavbar />
      <GuestMid />
      <div className="section2-footer">
        <p className='section2-text-1'>
          <span style={{ fontWeight: 'bold' }}>Modern Solutions for</span> modern lives
        </p>
        <img src={insurance2} alt='insurance' className='section2-insurance2' />
        <div className="section2-card-1" onClick={() => navigateToComponent('/guestautoinsurance')}>
          <img src={autoinsurance} alt='autoinsurance' className='section2-autoimage' />
          <p className='section2-autotext'>Drive Worry-Free: Your Auto Insurance Solution Starts Here!</p>
        </div>
        <div className="section2-card-2" onClick={() => navigateToComponent('/healthinsurance')}>
          <img src={healthinsurance} alt='healthinsurance' className='section2-healthimage' />
          <p className='section2-healthtext'>Thriving Starts Here: Your Health Insurance Solution for a Brighter Tomorrow!</p>
        </div>
        <div className="section2-card-3" onClick={() => navigateToComponent('/lifeinsurance')}>
          <img src={terminsurance} alt='terminsurance' className='section2-termimage' />
          <p className='section2-termtext'>Life’s Safeguard: Your Journey to Financial Security Begins Here!</p>
        </div>
      </div>
      <Calculator1 />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Sign Up or Sign In"
        className="insurance-modal"
        overlayClassName="insurance-modal-overlay"
      >
        <button className="insurance-close-button" onClick={closeModal}>
          <FaTimes />
        </button>
        <div className="insurance-modal-content">
          <h2>Welcome to Your Insurance Portal</h2>
          <p>Secure your future with our comprehensive insurance solutions. Sign up or sign in to get started!</p>
          <blockquote>
            "I found the perfect insurance plan that fits my needs. The process was seamless and the support team was incredibly helpful."
            <cite>- Ganesh, Satisfied Customer</cite>
          </blockquote>
          <div className="insurance-modal-buttons">
            <button className="insurance-modal-button insurance-signup-button" onClick={() => navigate('/signup')}>Join Us Today!</button>
            <button className="insurance-modal-button insurance-signin-button" onClick={() => navigate('/user')}>Access Your Account</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default GuestFooter;
