import React from 'react';
import { useNavigate } from 'react-router-dom';
import './dh.css';

function Dasb() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="dash-body">
            <div className="left-side-div">
                <h4 className='dashboard-nav' onClick={() => handleNavigation('/agentdashboard')}>Dashboard</h4>
                <h4 className='open-tickets-nav' onClick={() => handleNavigation('/open-tickets')}>Open Tickets</h4>
                <h4 className='closed-tickets-nav' onClick={() => handleNavigation('/closed-tickets')}>Closed Tickets</h4>
            </div>
        </div>
    );
}

export default Dasb;
