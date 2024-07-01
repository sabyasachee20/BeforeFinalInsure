import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNav from './adminnav';

function EditProfile() {
  const [formData, setFormData] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    // Fetch current user data
    axios.get(`http://localhost:7001/admin/admin`)
      .then(response => {
        setUser(response.data);
        // Initialize formData with fetched user data
        setFormData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          dob: response.data.dob,
          phoneNo: response.data.phoneNo,
          emailId: response.data.emailId,
          address: response.data.address
        });
      })
      .catch(error => {
        console.error('There was an error fetching the user data!', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update formData correctly
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Submit the updated user data
    axios.put(`http://localhost:7001/admin/update/${user.userId}`, formData)
      .then(response => {
        setUser(response.data); // Update user state if needed
        alert('Profile updated successfully!');
      })
      .catch(error => {
        console.error('There was an error updating the profile!', error);
      });
  };

  return (
    <div>
      <AdminNav/>
    
    <div className="edit-profile-container">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            First Name:
            <input type="text" name="firstName" value={formData.firstName || ''} onChange={handleChange} required />
          </label>
          <label>
            Last Name:
            <input type="text" name="lastName" value={formData.lastName || ''} onChange={handleChange} required />
          </label>
        </div>
        <div className="form-row">
          <label>
            Date of Birth:
            <input type="date" name="dob" value={formData.dob || ''} onChange={handleChange} required />
          </label>
          <label>
            Phone Number:
            <input type="tel" name="phoneNo" value={formData.phoneNo || ''} onChange={handleChange} required />
          </label>
        </div>
        <div className="form-row">
          <label>
            Email:
            <input type="email" name="emailId" value={formData.emailId || ''} onChange={handleChange} required />
          </label>
          <label>
            Address:
            <input type="text" name="address" value={formData.address || ''} onChange={handleChange} required />
          </label>
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
    </div>
  );
}

export default EditProfile;
