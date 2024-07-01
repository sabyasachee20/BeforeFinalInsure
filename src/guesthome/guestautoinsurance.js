import React from 'react';
import './guestautoinsurance.css';
import GuestNavbar from './guestnavbar';
import Calculator1 from '../premiumcalculator1';

const GuestAutoPolicy = () => {
  return (
    <div>
      <GuestNavbar />
      <div className="auto-insurance-form-page">
        <div className="auto-insurance-form-container">
          <div className="insurance-header">
            <h2 className="insurance-form-title">Auto Insurance Shield</h2>
            <p className="insurance-form-subtitle">Shielding your journey with reliable coverage</p>
            <p className="insurance-form-description">
              It provides financial protection against physical damage or bodily injury resulting from traffic collisions and against liability that could also arise from incidents in a vehicle.
            </p>
            <div className="insurance-badges">
              <div className="insurance-badge trending">TRENDING</div>
              <div className="insurance-badge">Tax Saver</div>
            </div>
          </div>
          <div className="insurance-content">
            <h3 className="insurance-terms-title">Terms and Conditions:</h3>
            <ul className="insurance-terms-list">
              <li>Term Period: Typically choose up the period to shield your vehicle (vary based on policy).</li>
              <li>Coverage: Comprehensive coverage including damage to the insured vehicle, liability for bodily injury or property damage and more.</li>
              <li>Premium: Determined based on factors such as the type of vehicle, vehicle cost, driver's age, driving record, coverage limits, and Optional Riders.</li>
              <li>Renewals: Renew your policy towards the end of term life for continued protection and peace of mind.</li>
            </ul>
            <h3 className="insurance-optional-riders-title">Optional Riders:</h3>
            <ul className="insurance-optional-riders-list">
              <li>Roadside Assistance</li>
              <li>Zero Depreciation Cover</li>
              <li>Engine Protection</li>
            </ul>
          </div>
          <button className="insurance-buy-now-button">Buy Now</button>
        </div>
      </div>
      <Calculator1 />
    </div>
  );
};

export default GuestAutoPolicy;
