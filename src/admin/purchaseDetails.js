import React from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminNav from './adminnav';
 
function PurchaseDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPurchase } = location.state;
  const sendEmail = () => {
    const email = "k53064948@gmail.com";  // Replace with actual email
    const subject = "Purchase Request";
    const body = `Your policy purchase request has been ${selectedPurchase.userPolicy.status}`;
 
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
    const updatedPurchase = { ...selectedPurchase, status };
    try {
      const response = await axios.put(`http://localhost:7001/admin/purchases/${selectedPurchase.policyDetailsId}`, updatedPurchase);
 
      console.log('Purchase status updated successfully:', response.data);
      sendEmail();
      navigate('/buy'); // Redirect to purchases list page after updating
    } catch (error) {
      console.error('Error updating purchase status:', error);
    }
  };

  if (!selectedPurchase) {
    return <p>No purchase selected.</p>;
  }
 
 
  return (
    <div>
      <AdminNav/>
    
    <div className="purchase-details">
      <h1>Purchase Details</h1>
      <p>Policy Details ID: {selectedPurchase.policyDetailsId}</p>
      <p>Policy Type: {selectedPurchase.policyType}</p>
     
      {selectedPurchase.policyType === 'TERM' && (
        <>
          <p>Annual Income: {selectedPurchase.annualIncome}</p>
          <p>Any Disease: {selectedPurchase.anyDisease}</p>
          <p>Nominee Name: {selectedPurchase.nomineeName}</p>
          <p>Nominee Relation: {selectedPurchase.nomineeRelation}</p>
          <p>Nominee Email: {selectedPurchase.nomineeEmail}</p>
          <p>Nominee Proof:{selectedPurchase.nomineeProof && (<img src='{selectedPurchase.nomineeProof}'/>)}</p>
        
          <a href={selectedPurchase.nomineeProof} target="_blank" rel="noopener noreferrer">
  <button>View</button>
</a>
          </>
      )}
     
      {selectedPurchase.policyType === 'HEALTH' && (
        <>
          <p>Age: {selectedPurchase.age}</p>
          <p>Height: {selectedPurchase.height}</p>
          <p>Weight: {selectedPurchase.weight}</p>
          <p>Smoke: {selectedPurchase.smoke ? 'Yes' : 'No'}</p>
          <p>Alcohol: {selectedPurchase.alcohol ? 'Yes' : 'No'}</p>
          <p>Blood Pressure: {selectedPurchase.bp}</p>
          <p>Diabetics: {selectedPurchase.diabetics ? 'Yes' : 'No'}</p>
          <p>Critical Disease: {selectedPurchase.criticalDisease}</p>
          <p>Health Report: {selectedPurchase.healthReport}</p>
          <a href={selectedPurchase.healthReport} target="_blank" rel="noopener noreferrer">
  <button>View</button>
</a>


        </>
      )}
     
      {selectedPurchase.policyType === 'AUTO' && (
        <>
          <p>Vehicle Model No: {selectedPurchase.vehicleModelNo}</p>
          <p>License Plate No: {selectedPurchase.licensePlateNo}</p>
          <p>Vehicle Value: {selectedPurchase.vehicleValue}</p>
          <p>Primary Use: {selectedPurchase.primaryUse}</p>
          <p>Vehicle Type: {selectedPurchase.vehicleType}</p>
          <p>Driver Age: {selectedPurchase.driverAge}</p>
          <p>Cheat Sheet: {selectedPurchase.cheatSheet}</p>
          <a href={selectedPurchase.cheatSheet} target="_blank" rel="noopener noreferrer">
  <button>View</button>
</a>
        </>
      )}
      <div className="buttons-container">
      <button onClick={() => {handleStatusUpdate('Active');}} className="approve-button">Approve</button>
      <button onClick={() => {handleStatusUpdate('Rejected');}} className="reject-button">Reject</button>
      </div>
    </div>
    </div>
  );
}
export default PurchaseDetails;