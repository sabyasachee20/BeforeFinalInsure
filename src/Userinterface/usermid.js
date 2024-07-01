import React from 'react';
 
import './usermid.css';
import family from '../images/userimages/landingsection1.png';
import autoinsurance from '../images/userimages/autoinsurance.png';
function Section1() {
    return (
        <div className='mid'>
         <p className="text-m">Protect Everything you love now!</p>
         <p className="text-l">Get Comprehensive Auto,Life, and
Health Insurance with Life Guard.</p>
<button class="get-started">Get Started</button>
<img src={family} alt='family-image' className='family'/>
 
        </div>
       
      );
}
 
export default Section1;