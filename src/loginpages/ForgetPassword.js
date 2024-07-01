import React, { useState } from 'react';
import axios from 'axios';
import GuestNavbar from '../guesthome/guestnavbar';
 
const ForgetPasswordComponent = () => {
  const [step, setStep] = useState(1);
  const [emailId, setEmailId] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
 
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
 
    if (!validateEmail(emailId)) {
      setError('Please enter a valid email address');
      return;
    }
 
    try {
      const response = await axios.post("http://localhost:8008/users/send-otp", null, {
        params: {
          email: emailId,
          operation: 'forget_password'
        }
      });
 
      if (response.status === 200) {
        setStep(2);
        setSuccess('OTP sent to your email');
      } else {
        setError('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError('An error occurred. Please try again later.');
    }
  };
 
  const handleOtpVerification = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
 
    if (!enteredOtp.trim()) {
      setError('Please enter the OTP');
      return;
    }
 
    try {
      console.log(emailId)
      console.log(enteredOtp)
      const response = await axios.post("http://localhost:9998/users/validate-otp", null, {
        params: {
          email: emailId,
          otp: enteredOtp
        }
      });
 
      if (response.data === true) {
        setStep(3);
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error validating OTP:', error);
      setError('An error occurred. Please try again later.');
    }
  };
 
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
 
    if (!validatePassword(newPassword)) {
        return;
    }
 
    if (newPassword !== confirmPassword) {
        setError('Passwords do not match');
        return;
    }
 
    try {
        console.log('EmailId:', emailId);
        console.log('New Password:', newPassword);
        const response = await axios.post("http://localhost:9998/users/reset-password", null, {
            params: {
                emailId: emailId,
                newPassword: newPassword
            }
        });
 
        if (response.data.startsWith('Password reset')) {
            setSuccess('Password reset successfully');
            setStep(4); // Move to success step
        } else {
            setError('Failed to reset password');
        }
    } catch (error) {
        console.error('Error resetting password:', error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
            setError(`An error occurred: ${error.response.data}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Request data:', error.request);
            setError('No response received from server. Please try again later.');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
            setError('An error occurred. Please try again later.');
        }
    }
};
 
  const resendOtp = async () => {
    setError('');
    setSuccess('');
 
    try {
      const response = await axios.post("http://localhost:9998/users/send-otp", null, {
        params: {
          email: emailId,
          operation: 'forget_password'
        }
      });
 
      if (response.status === 200) {
        setSuccess('OTP resent to your email');
      } else {
        setError('Failed to resend OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      setError('An error occurred. Please try again later.');
    }
  };
 
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
 
  const validatePassword = (password) => {
    const errors = {};
    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    } else if (!/[a-z]/.test(password)) {
      errors.password = 'Password must contain at least one lowercase letter';
    } else if (!/[A-Z]/.test(password)) {
      errors.password = 'Password must contain at least one uppercase letter';
    }
    if (Object.keys(errors).length > 0) {
      setError(Object.values(errors).join('. '));
      return false;
    }
    return true;
  };
 
  return (
    <div>
    <GuestNavbar/>
    <div className="forgot-password-container">
      {step === 1 && (
        <div>
          <h1>Forgot Password</h1>
          <form onSubmit={handleEmailSubmit}>
            <div>
              <label>Email:</label>
              <br />
              <input
                type="email"
                placeholder="Type your Email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                required
              />
            </div>
            <button type="submit">Next</button>
          </form>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          {success && <div style={{ color: 'green' }}>{success}</div>}
        </div>
      )}
 
      {step === 2 && (
        <div>
          <h1>Enter OTP</h1>
          <form onSubmit={handleOtpVerification}>
            <div>
              <label>OTP:</label>
              <br />
              <input
                type="text"
                placeholder="Enter OTP"
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                required
              />
            </div>
            <button type="submit">Verify OTP</button>
          </form>
          <button type="button" onClick={resendOtp}>Resend OTP</button>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          {success && <div style={{ color: 'green' }}>{success}</div>}
        </div>
      )}
 
      {step === 3 && (
        <div>
          <h1>Reset Password</h1>
          <form onSubmit={handlePasswordReset}>
            <div>
              <label>New Password:</label>
              <br />
              <input
                type="password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Confirm Password:</label>
              <br />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Reset Password</button>
          </form>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          {success && <div style={{ color: 'green' }}>{success}</div>}
        </div>
      )}
 
      {step === 4 && (
        <div>
          <h1>Password Reset Successfully</h1>
          <p>Your password has been reset. You can now log in with your new password.</p>
        </div>
      )}
    </div>
    </div>
  );
};
 
export default ForgetPasswordComponent;