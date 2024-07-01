import React from 'react';
import axios from 'axios';
import applogo from '../images/logosfolder/applogo.png';
import userlogo from '../images/logosfolder/userlogo.png';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaFileAlt, FaUsers, FaShoppingCart, FaHandsHelping, FaSignOutAlt, FaEdit } from 'react-icons/fa';

function AdminNav() {
    const [user, setUser] = useState({});

    useEffect(() => {
        // Fetch admin data
        axios.get(`http://localhost:7001/admin/admin`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the user data!', error);
            });
    }, []);

    return (
        <div>
            <div className='appheader'>
                <img className='applogo' src={applogo} alt="App Logo" />
                <h2>Insurre</h2>
                <div className='user-info'>
                    <img className='userlogo' src={userlogo} alt="User Logo" />
                    <p className='adminname'>{user.firstName}</p>
                </div>
            </div>
            <nav className="adminnavbar">
                <ul className="adminnavbar-list">
                    <li><FaHome /><Link to="/admindashboard">Dashboard</Link></li>
                    <li><FaUsers /><Link to="/customers">Customers</Link></li>
                    <li><FaShoppingCart /><Link to="/buy">Buy Request</Link></li>
                    <li><FaHandsHelping /><Link to="/claim">Claim Request</Link></li>
                    <li><FaEdit /><Link to="/edit">Edit Profile</Link></li>
                    <li><FaSignOutAlt /><Link to="/">Logout</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default AdminNav;
