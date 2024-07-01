import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar1 from '../Userinterface/Usernavbar';
import './Dashboard.css';

const DashboardComponent1 = () => {
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('user'));
    
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [address, setAddress] = useState(user ? user.address : '');
    const [phoneNumber, setPhoneNumber] = useState(user ? user.phone_no : '');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Password fields state
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleLogout = () => {
        sessionStorage.removeItem('user');
        navigate('/'); 
    };

    const handleEditProfile = async (e) => {
        e.preventDefault();

        try {
            const params = new URLSearchParams();
            params.append('emailId', user.emailId);
            if (address !== '') {
                params.append('address', address);
            }
            if (phoneNumber !== '') {
                params.append('phoneNumber', phoneNumber);
            }

            const response = await fetch('http://localhost:8008/users/editprofile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params.toString()
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const updatedUser = await response.json();
            sessionStorage.setItem('user', JSON.stringify(updatedUser));
            setSuccess('Profile updated successfully');
            setError('');
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again later.');
            setSuccess('');
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            setError('New passwords do not match');
            setSuccess('');
            return;
        }

        try {
            const params = new URLSearchParams();
            params.append('emailId', user.emailId);
            params.append('oldPassword', currentPassword);
            params.append('newPassword', newPassword);

            const response = await fetch('http://localhost:8008/users/changepassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params.toString()
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            if (result) {
                setSuccess('Password changed successfully');
                setError('');
            } else {
                setError('Failed to change password. Please check your current password.');
                setSuccess('');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again later.');
            setSuccess('');
        }
    };

    return (
        <div className="dashboard-container">
            <Navbar1/>
            {user ? (
                <div className="dashboard-content">
                    <h1 className="dashboard-header">Hello, User</h1>
                    <h2 className="dashboard-welcome">Welcome, {user.firstName}</h2>
                    
                
                    <div className="dashboard-buttons">
                        <button className="dashboard-button logout-button" onClick={handleLogout}>Logout</button>
                        <button className="dashboard-button edit-button" onClick={() => setShowEditProfile(true)}>Edit Profile</button>
                        <button className="dashboard-button change-password-button" onClick={() => setShowChangePassword(true)}>Change Password</button>
                    </div>
                    {showEditProfile && (
                        <form className="edit-profile-form" onSubmit={handleEditProfile}>
                            <div className="form-group">
                                <label>Address:</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number:</label>
                                <input
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                            <button className="form-button" type="submit">Update Profile</button>
                            {error && <div className="error-message">{error}</div>}
                            {success && <div className="success-message">{success}</div>}
                        </form>
                    )}
                    {showChangePassword && (
                        <form className="change-password-form" onSubmit={handleChangePassword}>
                            <div className="form-group">
                                <label>Current Password:</label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>New Password:</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirm New Password:</label>
                                <input
                                    type="password"
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                />
                            </div>
                            <button className="form-button" type="submit">Change Password</button>
                            {error && <div className="error-message">{error}</div>}
                            {success && <div className="success-message">{success}</div>}
                        </form>
                    )}
                </div>
            ) : (
                <div className="no-user-data">
                    <p>No user data available.</p>
                </div>
            )}
        </div>
    );
};

export default DashboardComponent1;
