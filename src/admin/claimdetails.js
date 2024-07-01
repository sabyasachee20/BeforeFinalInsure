import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminNav from './adminnav';
 
function ClaimDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedClaim } = location.state;
 
  const sendEmail = () => {
    const email = "k53064948@gmail.com";  // Replace with actual email
    const subject = "Claim Request";
    const body = `Your policy claim request has been ${selectedClaim.status}`;
 
    const emailData = {
      to: email,
      subject: subject,
      body: body
    };
 
    axios.post('http://localhost:7001/admin/send-email', emailData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error sending email: ', error);
      });
  };
 
  const handleStatusUpdate = async (status) => {
    try {
      const updatedClaim = { ...selectedClaim, status }; // Create a new claim object with updated status
      let apiEndpoint = '';
 
      switch (selectedClaim.userPolicy.policy.policyName) {
        case 'Auto Insurance Policy':
          apiEndpoint = `http://localhost:7001/admin/auto/status/${selectedClaim.autoClaimId}`;
          break;
        case 'Health Insurance Policy':
          apiEndpoint = `http://localhost:7001/admin/health/status/${selectedClaim.healthClaimId}`;
          break;
        case 'Life Insurance Policy':
          apiEndpoint = `http://localhost:7001/admin/term/status/${selectedClaim.termClaimId}`;
          break;
        default:
          throw new Error('Unknown claim type');
      }
 
      const response = await axios.put(apiEndpoint, updatedClaim);
      console.log('Claim status updated successfully:', response.data);
      sendEmail();
      navigate('/claim'); // Redirect to claims list page after updating
    } catch (error) {
      console.error('Error updating claim status:', error);
    }
  };
 
  return (
    <div>
      <AdminNav/>
    
    <div className="purchase-details">
      <h2>Claim Details</h2>
      {selectedClaim.userPolicy.policy.policyName === 'Auto Insurance Policy' && (
        <>
          <p>Auto Claim Id: {selectedClaim.autoClaimId}</p>
          <p>Incident Time: {selectedClaim.incidentTime}</p>
          <p>Damage Description: {selectedClaim.damageDescription}</p>
          <p>Damage Cost: {selectedClaim.damageCost}</p>
          <p>Photo of Damage: {selectedClaim.photoOfDamage}</p>
          <a href={selectedClaim.photoOfDamage} target="_blank" rel="noopener noreferrer">
  <button>View</button>
</a>
        </>
      )}
      {selectedClaim.userPolicy.policy.policyName === 'Health Insurance Policy' && (
        <>
           <p>Health Claim Id: {selectedClaim.healthClaimId}</p>
          <p>Disease: {selectedClaim.disease}</p>
          <p>Hospital Name: {selectedClaim.hospitalname}</p>
         
          <p>Doctor in Charge: {selectedClaim.doctorincharge}</p>
          <p>Date Of Service: {selectedClaim.dateofservice}</p>
          <p>Medical Bill: {selectedClaim.medicalbill}</p>
          <a href={selectedClaim.photoOfDamage} target="_blank" rel="noopener noreferrer">
  <button>View</button>
</a>
        </>
      )}
      {selectedClaim.userPolicy.policy.policyName === 'Life Insurance Policy' && (
        <>
          <p>Term Claim Id: {selectedClaim.termClaimId}</p>
          <p>Death Proof: {selectedClaim.deathProof}</p>
          <a href={selectedClaim.deathProof} target="_blank" rel="noopener noreferrer">
  <button>View</button>
</a>
          <p>Nominee Proof: {selectedClaim.nomineeProof}</p>
          <a href={selectedClaim.nomineeProof} target="_blank" rel="noopener noreferrer">
  <button>View</button>
</a>
         
        </>
      )}
      <div className="buttons-container">
        <button onClick={() => {handleStatusUpdate('Accepted'); }} className="approve-button">Approve</button>
        <button onClick={() => {handleStatusUpdate('Rejected'); }} className="reject-button">Reject</button>
      </div>
    </div>
    </div>
  );
}
 
export default ClaimDetails;