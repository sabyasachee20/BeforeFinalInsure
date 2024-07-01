import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logosfolder/applogo.png';
import './SignUpComponent.css';
import homeImage from '../../images/logosfolder/loginhomelogo.png'

const SignupComponent = () => {
  const [newSignup, setNewSignup] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    phoneNo: '',
    emailId: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [verificationCode, setVerificationCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handlehomeclick = () => {
    navigate("/");
  };

  const validateForm = () => {
    const errors = {};

    if (!newSignup.firstName.trim()) {
      errors.firstName = 'First Name is required';
    }

    if (!newSignup.lastName.trim()) {
      errors.lastName = 'Last Name is required';
    }

    if (!newSignup.dob.trim()) {
      errors.dob = 'Date of Birth is required';
    }

    

    if (!newSignup.phoneNo.trim()) {
      errors.phoneNo = 'Phone Number is required';
    } else if (!/^[6-9]\d{9}$/.test(newSignup.phoneNo)) {
      errors.phoneNo = 'Phone Number must be 10 digits and start with 6, 7, 8, or 9';
    }

    if (!newSignup.emailId.trim()) {
      errors.emailId = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(newSignup.emailId)) {
      errors.emailId = 'Email address is invalid';
    }

    if (!newSignup.address.trim()) {
      errors.address = 'Address is required';
    }

    if (!newSignup.password.trim()) {
      errors.password = 'Password is required';
    } else if (newSignup.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    } else if (!/[a-z]/.test(newSignup.password)) {
      errors.password = 'Password must contain at least one lowercase letter';
    } else if (!/[A-Z]/.test(newSignup.password)) {
      errors.password = 'Password must contain at least one uppercase letter';
    }

    if (!newSignup.confirmPassword.trim()) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (newSignup.password !== newSignup.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      setError('Please fill out all required fields correctly');
      return;
    }

    try {
      const response = await axios.post("http://localhost:8008/users/send-otp", null, {
        params: {
          email: newSignup.emailId,
          operation: 'signup'
        }
      });

      if (response.status === 200) {
        setVerificationSent(true);
        setVerificationCode(response.data.otp);
        setSuccess('Verification code sent to your email');
      } else {
        setError('Failed to send verification code. Please try again.');
      }
    } catch (error) {
      console.error('Error sending verification code:', error);
      if (error.response && error.response.status === 409) {
        setError('Email already exists in the database');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post("http://localhost:8008/users/validate-otp", null, {
        params: {
          email: newSignup.emailId,
          otp: enteredCode
        }
      });

      if (response.data === true) {
        await createUser();
      } else {
        setError('Invalid verification code. Please try again.');
      }
    } catch (error) {
      console.error('Error validating OTP:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  const createUser = async () => {
    try {
      await axios.post('http://localhost:8008/users/create', newSignup);
      setSuccess('User created successfully');
      navigate('/');
    } catch (error) {
      console.error('Error creating user:', error);
      setError('Failed to create user. Please try again.');
    }
  };

  const resendOtp = async () => {
    setError('');
    setSuccess('');

    try {
      const response = await axios.post("http://localhost:8008/users/send-otp", null, {
        params: {
          email: newSignup.emailId,
          operation: 'signup'
        }
      });

      if (response.status === 200) {
        setSuccess('Verification code resent to your email');
      } else {
        setError('Failed to resend verification code. Please try again.');
      }
    } catch (error) {
      console.error('Error resending verification code:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className='signupbody'>
      <div className='signup-top-total'>
        <div className='signup-top-le'>
          <img src={logo} alt="Logo" className="signup-logo" />
          <h1 id='signup-ins'>Insurre</h1>
        </div>
        <div className='signup-top-ri' onClick={handlehomeclick}>
          <img src={homeImage} alt="User" style={{ cursor: 'pointer' }} />
        </div>
      </div>

      <h1 id='signup-joinh1'>Join the Family, User! Your Adventure Starts Here.</h1>
      <div className='signup-middle'>
        <h2 className='signup-subheading'>Unlock Your Future: <span>Sign Up</span> and Begin Today!</h2>
        <form onSubmit={verificationSent ? handleOtpVerification : handleEmailSubmit}>
          <div className='signup-form'>
            <div className="signup-form-row">
              <div className='signup-inplbl'>
                <label>First Name:</label>
                <input className='signup-normalinp'
                  type="text"
                  value={newSignup.firstName}
                  onChange={(e) => {
                    setNewSignup({ ...newSignup, firstName: e.target.value });
                    if (errors.firstName) {
                      setErrors({ ...errors, firstName: '' });
                    }
                  }}
                  onBlur={() => {
                    if (!newSignup.firstName.trim()) {
                      setErrors({ ...errors, firstName: 'First Name is required' });
                    }
                  }}
                  placeholder="Type your First Name"
                  required
                />
                {errors.firstName && <p className="signup-error">{errors.firstName}</p>}
              </div>
              <div className='signup-inplbl' style={{ marginLeft: '30px' }}>
                <label>Last Name:</label>
                <input className='signup-normalinp'
                  type="text"
                  value={newSignup.lastName}
                  onChange={(e) => {
                    setNewSignup({ ...newSignup, lastName: e.target.value });
                    if (errors.lastName) {
                      setErrors({ ...errors, lastName: '' });
                    }
                  }}
                  onBlur={() => {
                    if (!newSignup.lastName.trim()) {
                      setErrors({ ...errors, lastName: 'Last Name is required' });
                    }
                  }}
                  placeholder="Type your Last Name"
                  required
                />
                {errors.lastName && <p className="signup-error">{errors.lastName}</p>}
              </div>
            </div>

            <div className="signup-form-row">
              <div className='signup-inplbldob'>
                <label>DOB:</label>
                <input
                  className='signup-normalinp'
                  type="date"
                  value={newSignup.dob}
                  onChange={(e) => setNewSignup({ ...newSignup, dob: e.target.value })}
                  onBlur={() => {
                    if (!newSignup.dob) {
                      setErrors({ ...errors, dob: 'Date of Birth is required' });
                    }
                  }}
                  placeholder="DD/MM/YYYY"
                  required
                />
                {errors.dob && <p className="signup-error">{errors.dob}</p>}
              </div>
              
              <div className='signup-inplbl1'>
                <label>Phone:</label>
                <input className='signup-normalinp'
                  type="text"
                  value={newSignup.phoneNo}
                  onChange={(e) => {
                    setNewSignup({ ...newSignup, phoneNo: e.target.value });
                    if (errors.phoneNo) {
                      setErrors({ ...errors, phoneNo: '' });
                    }
                  }}
                  onBlur={() => {
                    if (!newSignup.phoneNo.trim()) {
                      setErrors({ ...errors, phoneNo: 'Phone Number is required' });
                    } else if (!/^[6-9]\d{9}$/.test(newSignup.phoneNo)) {
                      setErrors({ ...errors, phoneNo: 'Phone Number must be 10 digits and start with 6, 7, 8, or 9' });
                    }
                  }}
                  placeholder="Phone"
                  required
                />
                {errors.phoneNo && <p className="signup-error">{errors.phoneNo}</p>}
              </div>
            </div>

            <div className="signup-form-row">
              <div className='signup-inplbl'>
                <label>Email:</label>
                <input className='signup-normalinp'
                  type="email"
                  value={newSignup.emailId}
                  onChange={(e) => {
                    setNewSignup({ ...newSignup, emailId: e.target.value });
                    if (errors.emailId) {
                      setErrors({ ...errors, emailId: '' });
                    }
                  }}
                  onBlur={() => {
                    if (!newSignup.emailId.trim()) {
                      setErrors({ ...errors, emailId: 'Email is required' });
                    } else if (!/\S+@\S+\.\S+/.test(newSignup.emailId)) {
                      setErrors({ ...errors, emailId: 'Email address is invalid' });
                    }
                  }}
                  placeholder="Type your Email ID"
                  required
                />
                {errors.emailId && <p className="signup-error">{errors.emailId}</p>}
              </div>
              <div className='signup-inplbl' style={{ marginLeft: '30px' }}>
                <label>Address:</label>
                <input className='signup-normalinp'
                  type="text"
                  value={newSignup.address}
                  onChange={(e) => {
                    setNewSignup({ ...newSignup, address: e.target.value });
                    if (errors.address) {
                      setErrors({ ...errors, address: '' });
                    }
                  }}
                  onBlur={() => {
                    if (!newSignup.address.trim()) {
                      setErrors({ ...errors, address: 'Address is required' });
                    }
                  }}
                  placeholder="Your Address"
                  required
                />
                {errors.address && <p className="signup-error">{errors.address}</p>}
              </div>
            </div>

            <div className="signup-form-row">
              <div className='signup-inplbl'>
                <label>Password:</label>
                <input className='signup-normalinp'
                  type="password"
                  value={newSignup.password}
                  onChange={(e) => {
                    setNewSignup({ ...newSignup, password: e.target.value });
                    if (errors.password) {
                      setErrors({ ...errors, password: '' });
                    }
                  }}
                  onBlur={() => {
                    if (!newSignup.password.trim()) {
                      setErrors({ ...errors, password: 'Password is required' });
                    } else if (newSignup.password.length < 8) {
                      setErrors({ ...errors, password: 'Password must be at least 8 characters long' });
                    } else if (!/[a-z]/.test(newSignup.password)) {
                      setErrors({ ...errors, password: 'Password must contain at least one lowercase letter' });
                    } else if (!/[A-Z]/.test(newSignup.password)) {
                      setErrors({ ...errors, password: 'Password must contain at least one uppercase letter' });
                    }
                  }}
                  placeholder="Type your Password"
                  required
                />
                {errors.password && <p className="signup-error">{errors.password}</p>}
              </div>
              <div className='signup-inplbl' style={{ marginLeft: '30px' }}>
                <label>ReEnter:</label>
                <input className='signup-normalinp'
                  type="password"
                  value={newSignup.confirmPassword}
                  onChange={(e) => {
                    setNewSignup({ ...newSignup, confirmPassword: e.target.value });
                    if (errors.confirmPassword) {
                      setErrors({ ...errors, confirmPassword: '' });
                    }
                  }}
                  onBlur={() => {
                    if (!newSignup.confirmPassword.trim()) {
                      setErrors({ ...errors, confirmPassword: 'Confirm Password is required' });
                    } else if (newSignup.password !== newSignup.confirmPassword) {
                      setErrors({ ...errors, confirmPassword: 'Passwords do not match' });
                    }
                  }}
                  placeholder="Type your Password Again"
                  required
                />
                {errors.confirmPassword && <p className="signup-error">{errors.confirmPassword}</p>}
              </div>
            </div>

            {verificationSent && (
              <div className="signup-form-row">
                <div className='signup-inplbl'>
                  <label>OTP:</label>
                  <input className='signup-normalinp'
                    type="text"
                    value={enteredCode}
                    onChange={(e) => setEnteredCode(e.target.value)}
                    placeholder="Enter your otp"
                    required
                  />
                </div>
              </div>
            )}
            <button type="submit" className='signup-formsbmtbtn'>
              {verificationSent ? 'Verify OTP' : 'Send OTP'}
            </button>
          </div>
          {error && <div className="signup-error-message">{error}</div>}
          {success && <div className="signup-success-message">{success}</div>}
        </form>
      </div>
    </div>
  );
};

export default SignupComponent;
