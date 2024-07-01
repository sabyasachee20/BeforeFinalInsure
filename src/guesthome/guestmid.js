import React from 'react';
import './guestmid.css';
import family from '../images/userimages/landingsection1.png';

function GuestMid() {
    return (
        <div className='section1-mid'>
            <p className="section1-text-m">Protect Everything you love now!</p>
            <p className="section1-text-l">Get Comprehensive Auto,Life, and Health Insurance with Life Guard.</p>
            <button className="section1-get-started">Get Started</button>
            <img src={family} alt='family-image' className='section1-family' />
        </div>
    );
}

export default GuestMid;
