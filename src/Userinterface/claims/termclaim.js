import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import claimimage from "../../images/userimages/claimpage.png";
import axios from "axios";
import "./termclaim.css";
import Navbar1 from "../Usernavbar";

function TermClaim() {
    const [dateOfDemise, setDateOfDemise] = useState('');
    const [deathCrt, setDeathCrt] = useState(null);
    const [nomineeProof, setNomineeProof] = useState(null);
    const [status, setStatus] = useState('Pending');
    const [errors, setErrors] = useState({});
    const [res, setRes] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const userpolicyId = localStorage.getItem('userpolicyId');

    const validateFields = () => {
        let newErrors = {};
        if (!dateOfDemise) newErrors.dateOfDemise = "Please fill it";
        if (!deathCrt) newErrors.deathCrt = "Please upload a file";
        if (!nomineeProof) newErrors.nomineeProof = "Please upload a file";
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

    const handleFileChange = (e, setter, fieldName) => {
        setter(e.target.files[0]);
        if (errors[fieldName]) {
            setErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                delete newErrors[fieldName];
                return newErrors;
            });
        }
    };

    const submitData = async (e) => {
        e.preventDefault(); // Ensure default form submission is prevented

        const validationErrors = validateFields();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const confirmation = window.confirm("Are you sure you want to submit?");
        if (confirmation) {
            const formData = new FormData();
            formData.append("dateofdemise", dateOfDemise);
            formData.append("deathProof", deathCrt);
            formData.append("nomineeProof", nomineeProof);
            formData.append("status", status);
            formData.append("userPolicyId", userpolicyId);

            try {
                const response = await axios.post(
                    "http://localhost:8008/term-claims/create",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
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
                    if (errorMsg.includes('Term claim date must be')) {
                        newErrors.dateOfDemise = "Date out of Range";
                    }
                    setErrors(newErrors);
                } else {
                    console.error("Claim submission failed:", error);
                    alert("Claim Request Failed");
                }
            }
        }
    };

    return (
        <div className="termclaimbody">
            <Navbar1 />
            <div className="term-claim-top">
                <div className="term-claim-text">
                    <p id="term-claim-title">Term Life Insurance</p>
                    <p id="term-claim-msg">Security that lasts a lifetime, for the ones you cherish</p>
                </div>
                <div className="term-claim-form">
                    <h4 style={{ marginTop: "5%", fontSize: "18px" }}>Claim Request</h4>
                    <img src={claimimage} alt="claimimage" className="claimimg"></img>
                    <div className="termmpart">
                        <div className="termclaimfield">
                            <label className="tl">Date of Demise *</label>
                            <input
                                type='date'
                                className='term-claim-textfield'
                                value={dateOfDemise}
                                onChange={(e) => handleInputChange(e, setDateOfDemise, 'dateOfDemise')}
                                required
                            />
                            {errors.dateOfDemise && <p className="mandatory">{errors.dateOfDemise}</p>}
                        </div>
                        <div className="termclaimfield">
                            <label className="tl"> Upload Death Certificate *</label>
                            <input className="termuploadfield"
                                type="file"
                                accept="image/*"
                                required
                                onChange={(e) => handleFileChange(e, setDeathCrt, 'deathCrt')}
                            />
                            {errors.deathCrt && <p className="mandatory">{errors.deathCrt}</p>}
                        </div>
                        <div className="termclaimfield">
                            <label className="tl"> Upload Nominee Id Proof *</label>
                            <input className="termuploadfield"
                                type="file"
                                accept="image/*"
                                required
                                onChange={(e) => handleFileChange(e, setNomineeProof, 'nomineeProof')}
                            />
                            {errors.nomineeProof && <p className="mandatory">{errors.nomineeProof}</p>}
                        </div>
                    </div>
                    <button className="termcbutton"
                        onClick={(e) => submitData(e)}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TermClaim;
