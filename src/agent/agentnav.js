import React from 'react';
import './AgentNavbar.css';

import logo from "../images/logosfolder/applogo.png";
import userlogo from "../images/logosfolder/userlogo.png";

function AgentNavbar() {
    return (
        <div className="agent-navbar">
            <div className="agent-navbar-left">
                <img src={logo} alt='userlogo' className='agent-logo' />
                <span className="agent-greeting">Inssure</span>
            </div>
            <div className="agent-navbar-middle"></div>
            <div className="agent-navbar-right">
                <img src={userlogo} alt='userloginlogo' className='agent-profile-image' />
                <h1 className="agent-name">Name</h1>
                <button className="agent-action-button">Logout</button>
            </div>
        </div>
    );
}

export default AgentNavbar;
