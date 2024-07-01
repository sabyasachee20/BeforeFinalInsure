import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import claimimage from "../../images/userimages/claimpage.png";
import './userautoclaim.css';
import Navbar1 from '../Usernavbar';

function AutoClaim() {
    const [vehicleModelNo, setVehicleModelNo] = useState('');
    const [licensePlateNo, setLicensePlateNo] = useState('');
    const [exShowroomPrice, setExShowroomPrice] = useState('');
    const [vehicleAge, setVehicleAge] = useState('');
    const [driverAge, setDriverAge] = useState('');
    const [incidentDateTime, setIncidentDateTime] = useState('');
    const [damageDescription, setDamageDescription] = useState('');
    const [repairCost, setRepairCost] = useState('');
    const [photoOfDamage, setPhotoOfDamage] = useState(null);
    const [status, setStatus] = useState('Pending');
    const [errors, setErrors] = useState({});
    const [res, setRes] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const userpolicyId = localStorage.getItem('userpolicyId');

    const handleInputChange = (e, setter, fieldName) => {
        setter(e.target.value);
        if (errors[fieldName]) {
            setErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                delete newErrors[fieldName];
                return newErrors;
            });
        }
    };

    const handleFileChange = (event) => {
        setPhotoOfDamage(event.target.files[0]);
        if (errors.photoOfDamage) {
            setErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                delete newErrors.photoOfDamage;
                return newErrors;
            });
        }
    };

    const validateFields = () => {
        let newErrors = {};
        if (!vehicleModelNo) newErrors.vehicleModelNo = "Please fill it";
        if (!licensePlateNo) newErrors.licensePlateNo = "Please fill it";
        if (!exShowroomPrice) newErrors.exShowroomPrice = "Please fill it";
        if (!vehicleAge) newErrors.vehicleAge = "Please fill it";
        if (!driverAge) newErrors.driverAge = "Please fill it";
        if (!incidentDateTime) newErrors.incidentDateTime = "Please fill it";
        if (!damageDescription) newErrors.damageDescription = "Please fill it";
        if (!repairCost) newErrors.repairCost = "Please fill it";
        if (!photoOfDamage) newErrors.photoOfDamage = "Please upload a file";
        return newErrors;
    };

    const submitData = async (e) => {
        e.preventDefault();
        const validationErrors = validateFields();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formData = new FormData();
        formData.append('vehicleModelNo', vehicleModelNo);
        formData.append('licensePlateNo', licensePlateNo);
        formData.append('exShowroomPrice', exShowroomPrice);
        formData.append('vehicleAge', vehicleAge);
        formData.append('incidentTime', incidentDateTime);
        formData.append('driverAge', driverAge);
        formData.append('damageDescription', damageDescription);
        formData.append('damageCost', repairCost);
        formData.append('photoOfDamage', photoOfDamage);
        formData.append('status', status);
        formData.append('userPolicyId', userpolicyId);

        try {
            const response = await axios.post('http://localhost:8008/auto-claims/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response);
            setRes(response);
            if (response?.status === 201) {
                alert("Submitted Successfully");
                navigate('/policydetails');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                const errorMsg = error.response.data.message;
                const newErrors = {};
                if (errorMsg.includes('Damage cost exceeds the left coverage')) {
                    newErrors.repairCost = "Damage cost exceeds";
                }
                if (errorMsg.includes('Auto claim incident time must be on or before the end date')) {
                    newErrors.incidentDateTime = "IncidentDate out of Range";
                }
                if (errorMsg.includes('Auto claim incident time must be on or after the start date')) {
                    newErrors.incidentDateTime = "IncidentDate out of Range";
                }
                setErrors(newErrors);
            } else if (error.request) {
                console.error('No response received:', error.request);
                alert('No response received from server. Please try again later.');
            } else {
                console.error('Error setting up request:', error.message);
                alert('Error setting up request. Please try again later.');
            }
            console.error('Error submitting claim:', error);
        }
    };

    return (
        <div className='autoclaimbody'>
            <Navbar1 />
            <div className='auto-claim-top'>
                <div className='auto-claim-text'>
                    <p id='auto-claim-title'>Auto Insurance</p>
                    <p id='auto-claim-msg'>Shielding your Journey with reliable coverage</p>
                </div>
                <div className='auto-claim-form'>
                    <h4 style={{ textAlign: 'center' }}>Claim Request</h4>
                    <div className='auto-claim-formlevel0'>
                        <div className='auto-claim-formlevel1'>
                            <div className='auto-claim-formlevel2'>
                                <label className="al">Vehicle Model No *</label>
                                <input
                                    type='text'
                                    className='auto-claim-textfield'
                                    value={vehicleModelNo}
                                    onChange={(e) => handleInputChange(e, setVehicleModelNo, 'vehicleModelNo')}
                                />
                                {errors.vehicleModelNo && <p className="mandatory">{errors.vehicleModelNo}</p>}
                            </div>
                            <div className='auto-claim-formlevel2'>
                                <label className="al">License Plate No *</label>
                                <input
                                    type='text'
                                    className='auto-claim-textfield'
                                    value={licensePlateNo}
                                    onChange={(e) => handleInputChange(e, setLicensePlateNo, 'licensePlateNo')}
                                />
                                {errors.licensePlateNo && <p className="mandatory">{errors.licensePlateNo}</p>}
                            </div>
                        </div>
                        <div className='auto-claim-formlevel1'>
                            <div className='auto-claim-formlevel2'>
                                <label className="al">Ex-Showroom Price *</label>
                                <input
                                    type='number'
                                    className='auto-claim-textfield'
                                    value={exShowroomPrice}
                                    onChange={(e) => handleInputChange(e, setExShowroomPrice, 'exShowroomPrice')}
                                />
                                {errors.exShowroomPrice && <p className="mandatory">{errors.exShowroomPrice}</p>}
                            </div>
                            <div className='auto-claim-formlevel2'>
                                <label className="al">Vehicle Age *</label>
                                <input
                                    type='number'
                                    className='auto-claim-textfield'
                                    value={vehicleAge}
                                    onChange={(e) => handleInputChange(e, setVehicleAge, 'vehicleAge')}
                                />
                                {errors.vehicleAge && <p className="mandatory">{errors.vehicleAge}</p>}
                            </div>
                        </div>
                        <div className='auto-claim-formlevel1'>
                            <div className='auto-claim-formlevel2'>
                                <label className="al">Driver’s Age *</label>
                                <input
                                    type='number'
                                    className='auto-claim-textfield'
                                    value={driverAge}
                                    onChange={(e) => handleInputChange(e, setDriverAge, 'driverAge')}
                                />
                                {errors.driverAge && <p className="mandatory">{errors.driverAge}</p>}
                            </div>
                            <div className='auto-claim-formlevel2'>
                                <label className="al">Date of Incident *</label>
                                <input
                                    type='date'
                                    className='auto-claim-textfield'
                                    value={incidentDateTime}
                                    onChange={(e) => handleInputChange(e, setIncidentDateTime, 'incidentDateTime')}
                                />
                                {errors.incidentDateTime && <p className="mandatory">{errors.incidentDateTime}</p>}
                            </div>
                        </div>
                        <div className='auto-claim-formlevel1'>
                            <div className='auto-claim-formlevel2'>
                                <label className="al">Damage Description *</label>
                                <input
                                    type='text'
                                    className='auto-claim-textfield'
                                    value={damageDescription}
                                    onChange={(e) => handleInputChange(e, setDamageDescription, 'damageDescription')}
                                />
                                {errors.damageDescription && <p className="mandatory">{errors.damageDescription}</p>}
                            </div>
                            <div className='auto-claim-formlevel2'>
                                <label className="al">Repair Cost *</label>
                                <input
                                    type='number'
                                    className='auto-claim-textfield'
                                    value={repairCost}
                                    onChange={(e) => handleInputChange(e, setRepairCost, 'repairCost')}
                                />
                                {errors.repairCost && <p className="mandatory">{errors.repairCost}</p>}
                            </div>
                            <img src={claimimage} alt="claimimage" className="claimimg"></img>
                        </div>
                    </div>
                    <div className='auto-claim-formlevel222'>
                        <div className='autobill'>
                            <label className="al">Upload Proof Of Damage *</label>
                            <input type='file' onChange={handleFileChange} style={{ marginLeft: '1rem' }}></input>
                        </div>
                        {errors.photoOfDamage && <p className="mandatory">{errors.photoOfDamage}</p>}
                        <button className='autobutton' onClick={submitData} >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AutoClaim;
