import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './renew.css';
import Navbar1 from '../Usernavbar';

const PolicyRenewal = () => {
  const [newData, setNewData] = useState('');
  const [status, setStatus] = useState('');
  const [renew, setRenew] = useState(false);
  const location = useLocation();
  //const { userpolicyId } = location.state || {};
  const userpolicyId=localStorage.getItem('userpolicyId');

  const claim_type = localStorage.getItem('claim_type');

  const fetchUserPolicyData = async () => {
    try {
      const response = await axios.get(`http://localhost:8008/user-policies/readOne/${userpolicyId}`);
      setNewData(response.data); 
    } catch (error) {
      console.error('Error fetching user policy data:', error);
    }
  };

  const incrementedEndDate = new Date(newData.endDate);
  useEffect(() => { fetchUserPolicyData() }, [newData]);
  
  const submit1 = async () => {
    var confirmation = window.confirm('Are you sure you want to submit');
    if (confirmation) {
      try {
        const response = await axios.put(`http://localhost:8008/user-policies/renew/${userpolicyId}`);
        setStatus(response);
        const expireResponse = await axios.put(`http://localhost:8008/${claim_type}/expire/${userpolicyId}`);
        window.alert("Renewed Successfully");
      } catch (error) {

        console.error(error?.response?.data?.message);
        window.alert(error?.response?.data?.message);
      }
    }
  };

  incrementedEndDate.setFullYear(incrementedEndDate.getFullYear() + parseInt(newData.term));
  const incrementedEndDateString = `${incrementedEndDate.getFullYear()}-${String(incrementedEndDate.getMonth() + 1).padStart(2, '0')}-${String(incrementedEndDate.getDate()).padStart(2, '0')}`;

  const renewp = (e) => {
    if (!e) {
      setRenew(false);
    } else {
      setRenew(true);
    }
  };

  return (
    <div className='renewbody'>
    <Navbar1/>
    <div className='renewbase'>
      <div className="renewtop">
        <div className="renewcontent">
          <p className='renewheading'>Renew Your Policy</p>
          <div className="renew-details">
            <h2 className='renewelements' style={{ marginBottom: '0.5rem', marginTop: '0.5rem', textAlign: 'center' }}>Your Present Policy Details</h2>
            <div className='renewf1'>
              <p className='renewelements'><span style={{ fontWeight: 'bold' }}>Premium: </span>{newData.premium}</p>
              <p className='renewelements'><span style={{ fontWeight: 'bold' }}>Term Period: </span>{newData.term}</p>
            </div>
            <div className='renewf1'>
              <p className='renewelements'><span style={{ fontWeight: 'bold' }}>Coverage: </span>{newData.coverage}</p>
              <p className='renewelements'><span style={{ fontWeight: 'bold' }}>Left: </span>{newData.leftcoverage}</p>
            </div>
            <div className='renewf2'>
              <p className='renewelements'>StartDate: {newData.startDate}</p>
              <p className='renewelements'>EndDate: {newData.endDate}</p>
            </div>
            <p className='renewf3'>Want to renew your policy:
              <label className='renewelements'><input type="radio" name="renew" value="yes" onChange={() => renewp(true)} /> Yes</label>
              <label className='renewelements'><input type="radio" name="renew" value="no" onChange={() => renewp(false)} /> No</label>
            </p>
            {renew &&
              <div className='renewf6'>
                <h2 className='renewelements' style={{ marginBottom: '0.5rem' }}>Updated Policy Details</h2>
                <div className='renewf1'>
                  <p className='renewelements'><span style={{ fontWeight: 'bold' }}>Premium: </span>{newData.premium}</p>
                  <p className='renewelements'><span style={{ fontWeight: 'bold' }}>Term Period: </span>{newData.term}</p>
                </div>
                <div className='renewf1'>
                  <p className='renewelements'><span style={{ fontWeight: 'bold' }}>Coverage: </span>{newData.coverage}</p>
                  <p className='renewelements'><span style={{ fontWeight: 'bold' }}>Left: </span>{newData.coverage}</p>
                </div>
                <div className='renewf2'>
                  <p className='renewelements'>StartDate: {newData.endDate}</p>
                  <p className='renewelements'>EndDate: {incrementedEndDateString}</p>
                </div>
                <button className='renewbutton1' onClick={submit1}>Renew</button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PolicyRenewal;
