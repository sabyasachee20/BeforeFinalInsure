import React, { useState, useEffect } from 'react';
import './premiumcalculator.css';
import autoInsuranceImg from '../images/userimages/autoinsurancemain.png';
import termLifeInsuranceImg from '../images/userimages/terminsurancemain.png';
import healthInsuranceImg from '../images/userimages/healthinsurancemain.png';
import calculator from '../images/logosfolder/premiumcalculatorlogo.png';

const labelStyle = {
  marginRight: '50px'
};
const inputStyle = {
  marginTop: '20px'
};
const TermOccupation = {
  width: '250px',
  marginLeft: '50px'
};

const validateVehicleValue = (value) => {
  if (value < 30000) {
    return "Vehicle value must be more than ₹30,000.";
  }
  if (value % 100 !== 0) {
    return "Vehicle value must end with '00'.";
  }
  return "";
};

const calculateAutoPremium = (setPremiumResult, vehicleValue, coverageType) => {
  const validationMessage = validateVehicleValue(parseFloat(vehicleValue));
  const paymentFrequency = document.getElementById('paymentFrequency').value;

  if (validationMessage) {
    setPremiumResult(validationMessage);
    return;
  }

  let basePremium = 0;

  switch (coverageType) {
    case 'BASIC':
      basePremium = 5000;
      break;
    case 'STANDARD':
      basePremium = 15000;
      break;
    case 'COMPREHENSIVE':
      basePremium = 25000;
      break;
    default:
      break;
  }

  let adjustedPremium = basePremium;

  let frequencyMultiplier;
  switch (paymentFrequency) {
    case 'annually':
      frequencyMultiplier = 1;
      break;
    case 'half-yearly':
      frequencyMultiplier = 1 / 2;
      break;
    case 'quarterly':
      frequencyMultiplier = 1 / 4;
      break;
    case 'monthly':
      frequencyMultiplier = 1 / 12;
      break;
    default:
      frequencyMultiplier = 1;
  }

  const finalPremium = adjustedPremium * frequencyMultiplier;
  setPremiumResult(`Your ${paymentFrequency} Premium is ₹${finalPremium.toFixed(2)}`);
};

const AutoInsuranceForm = ({ setPremiumResult }) => {
  const [vehicleValue, setVehicleValue] = useState('');
  const [coverageType, setCoverageType] = useState('BASIC');

  return (
    <div className='autoform'>
      <h2 className='headingcal'>Premium Calculator</h2>
      <form onSubmit={(e) => { e.preventDefault(); calculateAutoPremium(setPremiumResult, vehicleValue, coverageType); }}>
        <div className='one'>
          <label style={labelStyle}>
            Vehicle Value(Rs): <br/>
            <input type="text" value={vehicleValue} onChange={(e) => setVehicleValue(e.target.value)} className="input1" style={inputStyle} required/>
          </label>
          <br />
          <label>
            Car Model:
            <input type="text" name="carModel" className="input1" style={inputStyle} />
          </label>
        </div>
        <div className='two'>
          <label style={labelStyle}>
            Driver Age: <br/>
            <input type="text" name="driverAge" className="input1" style={inputStyle} />
          </label>
          <br />
          <label>
            Primary Use:
            <select name="primaryUse" className='select1' style={inputStyle}>
              <option value="">Select</option>
              <option value="urban">Urban</option>
              <option value="rural">Rural</option>
            </select>
          </label>
        </div>
        <div className='three'>
          <label>
            Roadside Assistance
          </label>
          <input className="input1" type="checkbox" name="roadsideAssistance"/>
          <br />
          <label>
            Zero Depreciation
          </label>
          <input className="input1" type="checkbox" name="zeroDepreciation"/>
        </div>
        <div className='four'>
          <label>
            Engine Protection
          </label>
          <input className="input1" type="checkbox" name="engineProtection"/>
          <br />
          <label style={labelStyle}>
            Payment Option: <br/>
            <select name="paymentOption" id="paymentFrequency" className="select1" style={inputStyle}>
              <option value="">Select</option>
              <option value="annually">Annually</option>
              <option value="half-yearly">Half-Yearly</option>
              <option value="quarterly">Quarterly</option>
              <option value="monthly">Monthly</option>
            </select>
          </label>
        </div>
        <div className='four'>
          <label>
            Coverage Type:
          </label>
          <select value={coverageType} onChange={(e) => setCoverageType(e.target.value)} className="select1" style={inputStyle}>
            <option value="BASIC">Basic</option>
            <option value="STANDARD">Standard</option>
            <option value="COMPREHENSIVE">Comprehensive</option>
          </select>
        </div>
        <br />
        
        <button type="submit" className='premium'>Calculate Premium</button>
      </form>
    </div>
  );
};

const calculateTermPremium = (setPremiumResult) => {
  const sumAssured = parseFloat(document.getElementById('sumAssured').value);
  const baseRate = 0.001;
  const age = parseInt(document.getElementById('age').value);
  const smoker = document.querySelector('input[name="smoker"]:checked')?.value === 'true';
  const occupation = document.querySelector('input[name="occupation"]:checked')?.value;
  const accidentalDeathBenefit = document.querySelector('input[name="accidentalDeathBenefit"]:checked')?.value === 'true';
  const criticalIllnessRider = document.querySelector('input[name="criticalIllnessRider"]:checked')?.value === 'true';
  const waiverOfPremium = document.querySelector('input[name="waiverOfPremium"]:checked')?.value === 'true';
  const paymentFrequency = document.getElementById('paymentFrequency').value;

  const basePremium = sumAssured * baseRate;
  const ageFactor = age > 45 ? 0.25 : 0.10;
  const healthFactor = smoker ? 0.20 : 0.10;
  const occupationFactor = occupation === 'high' ? 0.15 : 0.05;

  let adjustedPremium = basePremium + (basePremium * ageFactor) + (basePremium * healthFactor) + (basePremium * occupationFactor);

  if (accidentalDeathBenefit) adjustedPremium += 2000;
  if (criticalIllnessRider) adjustedPremium += 3000;
  if (waiverOfPremium) adjustedPremium += 1000;

  let frequencyMultiplier;
  switch (paymentFrequency) {
    case 'annually':
      frequencyMultiplier = 1;
      break;
    case 'half-yearly':
      frequencyMultiplier = 1 / 2;
      break;
    case 'quarterly':
      frequencyMultiplier = 1 / 4;
      break;
    case 'monthly':
      frequencyMultiplier = 1 / 12;
      break;
    default:
      frequencyMultiplier = 1;
  }

  const finalPremium = adjustedPremium * frequencyMultiplier;
  const frequencyText = {
    'annually': 'Annual',
    'half-yearly': 'Half-Yearly',
    'quarterly': 'Quarterly',
    'monthly': 'Monthly'
  }[paymentFrequency];

  setPremiumResult(`Your ${frequencyText} Premium is ₹${finalPremium.toFixed(2)}`);
};

const TermLifeInsuranceForm = ({ setPremiumResult }) => (
  <div className='healthform'>
    <h2 className='headingcal'>Premium Calculator</h2>
    <form onSubmit={(e) => { e.preventDefault(); calculateTermPremium(setPremiumResult); }}>
      <div className='one'>
        <label style={labelStyle}>
          Age: <br/>
          <input className="input1" type="text" name="age" id="age" style={inputStyle} required/>
        </label>
        <br />
        <label>
          Term Period:
          <select name="term period" className="select1" style={inputStyle}>
            <option value="">Select</option>
            <option value="five">5</option>
            <option value="ten">10</option>
            <option value="fifteen">15</option>
          </select>
        </label>
      </div>
      <div className='two'>
        <label>
          Sum Insured:
          <select name="sumAssured" className="select1" id="sumAssured" style={inputStyle}>
            <option value="">Select</option>
            <option value="2500000">₹25 lakh</option>
            <option value="5000000">₹50 lakh</option>
            <option value="10000000">₹1 crore</option>
          </select>
        </label>
        <br/>
        <label style={TermOccupation}>
          High Risk of Job
        </label>
        <input className="input1" type="checkbox" name="occupation" value="high"/>
        <label style={TermOccupation}>
          Do you smoke
        </label>
        <input className="input1" type="checkbox" name="smoker" value="true"/>
      </div>
      <div className='three'>
        <label>
          Premium Waiver
        </label>
        <input className="input1" type="checkbox" name="waiverOfPremium" value="true"/>
        <br />
        <label>
          Critical Illness
        </label>
        <input className="input1" type="checkbox" name="criticalIllnessRider" value="true"/>
      </div>
      <div className='four'>
        <label>
          Accidental Death
        </label>
        <input className="input1" type="checkbox" name="accidentalDeathBenefit" value="true"/>
        <br />
        <label style={labelStyle}>
          Payment Option: <br/>
          <select name="paymentOption" id="paymentFrequency" className="select1" style={inputStyle}>
            <option value="">Select</option>
            <option value="annually">Annually</option>
            <option value="half-yearly">Half-Yearly</option>
            <option value="quarterly">Quarterly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>
      </div>
      <br />
      
      <button type="submit" className='premium'>Calculate Premium</button>
    </form>
  </div>
);

const calculateHealthPremium = (setPremiumResult, sumInsured, age, location, criticalIllnessCover, maternityCover, dailyHospitalCash) => {
  const sumInsuredValue = parseFloat(sumInsured);
  const ageValue = parseInt(age);

  const baseRate = 0.001;
  const basePremium = sumInsuredValue * baseRate;
  const ageFactor = ageValue > 45 ? 0.20 : 0.10;
  const locationFactor = location === "urban" ? 0.10 : 0.05;

  let adjustedPremium = basePremium + (basePremium * ageFactor) + (basePremium * locationFactor);

  if (criticalIllnessCover) {
    adjustedPremium += 3000;
  }
  if (maternityCover) {
    adjustedPremium += 2000;
  }
  if (dailyHospitalCash) {
    adjustedPremium += 500;
  }

  setPremiumResult(adjustedPremium.toFixed(2));
};

const HealthInsuranceForm = ({ setPremiumResult }) => {
  const [sumInsured, setSumInsured] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('urban');
  const [criticalIllnessCover, setCriticalIllnessCover] = useState(false);
  const [maternityCover, setMaternityCover] = useState(false);
  const [dailyHospitalCash, setDailyHospitalCash] = useState(false);

  return (
    <div className='healthform'>
      <h2 className='headingcal'>Premium Calculator</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        calculateHealthPremium(setPremiumResult, sumInsured, age, location, criticalIllnessCover, maternityCover, dailyHospitalCash);
      }}>
        <div className='one'>
          <label style={labelStyle}>
            Age: <br/>
            <input className="input1" type="text" value={age} onChange={(e) => setAge(e.target.value)} style={inputStyle} required/>
          </label>
          <br />
          <label>
            Term Period:
            <select className="select1" name="term period" style={inputStyle}>
              <option value="">Select</option>
              <option value="five">5</option>
              <option value="ten">10</option>
              <option value="fifteen">15</option>
            </select>
          </label>
        </div>
        <div className='two'>
          <label style={labelStyle}>
            Location: <br/>
            <select className="select1" value={location} onChange={(e) => setLocation(e.target.value)} style={inputStyle}>
              <option value="urban">Urban</option>
              <option value="rural">Rural</option>
            </select>
          </label>
          <br />
          <label>
            Sum Insured:
            <input className="input1" type="text" value={sumInsured} onChange={(e) => setSumInsured(e.target.value)} style={inputStyle} required/>
          </label>
        </div>
        <div className='three'>
          <label>
            Critical Illness
          </label>
          <input className="input1" type="checkbox" checked={criticalIllnessCover} onChange={(e) => setCriticalIllnessCover(e.target.checked)}/>
          <br />
          <label>
            Maternity Cover
          </label>
          <input className="input1" type="checkbox" checked={maternityCover} onChange={(e) => setMaternityCover(e.target.checked)}/>
        </div>
        <div className='four'>
          <label>
            Daily Hospital Cash
          </label>
          <input className="input1" type="checkbox" checked={dailyHospitalCash} onChange={(e) => setDailyHospitalCash(e.target.checked)}/>
          <br />
          <label style={labelStyle}>
            Payment Option: <br/>
            <select name="paymentOption" id="paymentFrequency" className="select1" style={inputStyle}>
              <option value="">Select</option>
              <option value="annually">Annually</option>
              <option value="half-yearly">Half-Yearly</option>
              <option value="quarterly">Quarterly</option>
              <option value="monthly">Monthly</option>
            </select>
          </label>
        </div>
        <br />
      
        <button type="submit" className='premium'>Calculate Premium</button>
      </form>
    </div>
  );
};

function Calculator1() {
  const [showForm, setShowForm] = useState(false);
  const [termPremiumResult, setTermPremiumResult] = useState('');
  const [autoPremiumResult, setAutoPremiumResult] = useState('');
  const [healthPremiumResult, setHealthPremiumResult] = useState('');
  const [selectedForm, setSelectedForm] = useState(() => <AutoInsuranceForm setPremiumResult={setAutoPremiumResult} />);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleFormSelection = (formComponent, resetResult) => {
    setSelectedForm(() => formComponent);
    resetResult('');
  };

  useEffect(() => {
    let timer;
    if (termPremiumResult || autoPremiumResult || healthPremiumResult) {
      timer = setTimeout(() => {
        setTermPremiumResult('');
        setAutoPremiumResult('');
        setHealthPremiumResult('');
      }, 10000); // Set the text to disappear after 10 seconds
    }
    return () => clearTimeout(timer);
  }, [termPremiumResult, autoPremiumResult, healthPremiumResult]);

  return (
    <div>
      <img src={calculator} alt="premium calculator" className='calculator-s' onClick={toggleForm} />
      {showForm && (
        <div className="popup-overlay" onClick={toggleForm}>
          <div className="popup-form" onClick={(e) => e.stopPropagation()}>
            <div className="form-containercal">
              {selectedForm}
              {autoPremiumResult && <div className="premium-result">{autoPremiumResult}</div>}
              {termPremiumResult && <div className="premium-result">{termPremiumResult}</div>}
              {healthPremiumResult && <div className="premium-result">{healthPremiumResult}</div>}
            </div>
            <div className="image-container">
              <p className='choose'>Choose Option</p>
              <div className="autocard" onClick={() => handleFormSelection(<AutoInsuranceForm setPremiumResult={setAutoPremiumResult} />, setAutoPremiumResult)}>
                <img src={autoInsuranceImg} alt="Auto Life Insurance"/>
                <p className='autocardt'>Auto Insurance</p>
              </div>
              <div className="autocard1" onClick={() => handleFormSelection(<TermLifeInsuranceForm setPremiumResult={setTermPremiumResult} />, setTermPremiumResult)}>
                <img src={termLifeInsuranceImg} alt="Term Life Insurance"/>
                <p className='autocardt'>Term Insurance</p>
              </div>
              <div className="autocard2" onClick={() => handleFormSelection(<HealthInsuranceForm setPremiumResult={setHealthPremiumResult} />, setHealthPremiumResult)}>
                <img src={healthInsuranceImg} alt="Health Insurance"/>
                <p className='autocardt'>Health Insurance</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calculator1;
