import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import "./healthclaim.css";
import axios from "axios";
import claimimage from "../../images/userimages/claimpage.png";
import Navbar1 from "../Usernavbar";

function HealthClaim() {
    const [diseaseOccured, setdiseaseOccured] = useState("");
    const [dateOfService, setdateOfService] = useState("");
    const [hospName, sethospName] = useState("");
    const [drCharge, setdrCharge] = useState("");
    const [hostAdd, sethostAdd] = useState("");
    const [claimAmt, setclaimAmt] = useState("");
    const [medicalBill, setmedicalBill] = useState(null);
    const [status, setStatus] = useState('Pending');
    const [res, setRes] = useState("");
    const [errors, setErrors] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const userpolicyId = localStorage.getItem('userpolicyId');

    const validateFields = () => {
        let newErrors = {};
        if (!diseaseOccured) newErrors.diseaseOccured = "Please fill it";
        if (!dateOfService) newErrors.dateOfService = "Please fill it";
        if (!hospName) newErrors.hospName = "Please fill it";
        if (!drCharge) newErrors.drCharge = "Please fill it";
        if (!hostAdd) newErrors.hostAdd = "Please fill it";
        if (!claimAmt) newErrors.claimAmt = "Please fill it";
        if (!medicalBill) newErrors.medicalBill = "Please upload a file";
        return newErrors;
    };

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

    const handleFileChange = (e) => {
        setmedicalBill(e.target.files[0]);
        if (errors.medicalBill) {
            setErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                delete newErrors.medicalBill;
                return newErrors;
            });
        }
    };

    const submitdata = async (e) => {
        e.preventDefault(); 
        const validationErrors = validateFields();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        var confirmation = window.confirm('Are you sure you want to submit?');
        if (confirmation) {
            const formData = new FormData();
            formData.append('disease', diseaseOccured);
            formData.append('dateOfService', dateOfService);
            formData.append('hospitalName', hospName);
            formData.append('doctorInCharge', drCharge);
            formData.append('address', hostAdd);
            formData.append('claimAmt', claimAmt);
            formData.append('status', status);
            formData.append('userPolicyId', userpolicyId);
            formData.append('medicalBill', medicalBill);

            try {
                const response = await axios.post(
                    "http://localhost:8008/health-claims/create",
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
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
                    if (errorMsg.includes('Claim amount exceeds')) {
                        newErrors.claimAmt = "Claim amount exceeds";
                    }
                    if (errorMsg.includes('Health claim date must be on or before the end date')) {
                        newErrors.dateOfService = "DOS out of range";
                    }
                    if (errorMsg.includes('Health claim date must be on or after the start date')) {
                        newErrors.dateOfService = "DOS out of range";
                    }
                    setErrors(newErrors);
                } else {
                    console.error('Claim submission failed:', error);
                    window.alert("Claim Request Failed");
                }
            }
        }
    };

    return (
        <div className="healthclaimbody">
            <Navbar1 />
            <div className="health-claim-top">
                <div className="health-claim-text">
                    <p id="health-claim-title">Health Insurance</p>
                    <p id="health-claim-msg">Peace of mind that never expires, with every heartbeat</p>
                </div>
                <div className="health-claim-form">
                    <h4>Claim Request</h4>
                    <div className="health-claim-form-level1">
                        <div className="health-claim-form-level2">
                            <label className="hl">Disease Occurred *</label>
                            <input
                                type="text"
                                className="health-claim-textfield"
                                value={diseaseOccured}
                                onChange={(e) => handleInputChange(e, setdiseaseOccured, 'diseaseOccured')}
                            />
                            {errors.diseaseOccured && <p className="mandatory">{errors.diseaseOccured}</p>}
                        </div>
                        <div className="health-claim-form-level2">
                            <label className="hl">Date Of Service *</label>
                            <input
                                type="date"
                                className="health-claim-textfield"
                                value={dateOfService}
                                onChange={(e) => handleInputChange(e, setdateOfService, 'dateOfService')}
                            />
                            {errors.dateOfService && <p className="mandatory">{errors.dateOfService}</p>}
                        </div>
                    </div>
                    <div className="health-claim-form-level1">
                        <div className="health-claim-fl">
                            <div className="health-claim-form-level2">
                                <label className="hl">Hospital Name *</label>
                                <input
                                    type="text"
                                    className="health-claim-textfield"
                                    value={hospName}
                                    onChange={(e) => handleInputChange(e, sethospName, 'hospName')}
                                />
                                {errors.hospName && <p className="mandatory">{errors.hospName}</p>}
                            </div>
                            <div className="health-claim-form-level2">
                                <label className="hl">Doctor Incharge *</label>
                                <input
                                    type="text"
                                    className="health-claim-textfield"
                                    value={drCharge}
                                    onChange={(e) => handleInputChange(e, setdrCharge, 'drCharge')}
                                />
                                {errors.drCharge && <p className="mandatory">{errors.drCharge}</p>}
                            </div>
                            <div className="health-claim-form-level2">
                                <label className="hl">Claim Amount *</label>
                                <input
                                    type="number"
                                    className="health-claim-textfield"
                                    value={claimAmt}
                                    onChange={(e) => handleInputChange(e, setclaimAmt, 'claimAmt')}
                                />
                                {errors.claimAmt && <p className="mandatory">{errors.claimAmt}</p>}
                            </div>
                        </div>
                        <div className="health-claim-form-level2">
                            <label className="hl">Hospital Address *</label>
                            <textarea
                                className="health-claim-textarea"
                                value={hostAdd}
                                onChange={(e) => handleInputChange(e, sethostAdd, 'hostAdd')}
                            />
                            {errors.hostAdd && <p className="mandatory">{errors.hostAdd}</p>}
                        </div>
                    </div>
                    <img src={claimimage} alt="claimimage" className="claimimg"></img>
                    <div className="health-claim-but">
                        <div>
                            <label className="hl">Upload Medical Bill *</label>
                            <input type='file' style={{ marginLeft: '1rem' }} onChange={handleFileChange} accept="image/*"></input>
                            {errors.medicalBill && <p className="mandatory">{errors.medicalBill}</p>}
                        </div>
                        <button className="hclaimbutton" onClick={submitdata}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HealthClaim;
