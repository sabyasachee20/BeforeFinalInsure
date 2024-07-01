import React from 'react';
import logo from '../images/logosfolder/applogo.png';
import { useNavigate } from 'react-router-dom';
import imageUrl from '../images/userimages/lifeinsurance.png';
import './aboutus.css';
import GuestNavbar from './guestnavbar';

const AboutUs = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate("/"); 
    };

    return (
        <div>
            <GuestNavbar/>

            <div className='body-abt'>
                <div className='abt-cont'>
                    <p className='abtusp'>
                        Established in 2024, Insurre is dedicated to providing comprehensive insurance solutions that meet the needs of our clients. We focus on honesty and putting our customers first, offering a variety of insurance products like health, auto, and term insurance.<br/><br/> Our team of experienced professionals is here to give personalized guidance and support, ensuring you make informed decisions about your insurance needs. At Insurre, we're committed to protecting what matters most to you, delivering peace of mind through reliability and security in today's ever-changing world.
                    </p>
                </div>
                <img src={imageUrl} alt="Illustration" className="abt-im" />
            </div>
        </div>
    );
};

export default AboutUs;
