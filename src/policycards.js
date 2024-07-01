import React, { useState } from 'react';
import './policycards.css'; // Import the CSS file
import Navbar1 from './Userinterface/Usernavbar';


const Policies = () => {
  const policies = [
    { name: 'Auto Insurance', status: 'Active' },
    { name: 'Home Insurance', status: 'Active' },
    { name: 'Health Insurance', status: 'Pending' },
    { name: 'Life Insurance', status: 'Active' },
    { name: 'Travel Insurance', status: 'Pending' },
    { name: 'Pet Insurance', status: 'Active' },
    { name: 'Business Insurance', status: 'Pending' },
    { name: 'Disability Insurance', status: 'Active' },
    { name: 'Boat Insurance', status: 'Pending' },
    { name: 'Flood Insurance', status: 'Active' },
    { name: 'Renters Insurance', status: 'Pending' },
    { name: 'Umbrella Insurance', status: 'Active' }
    // Add more static policy data here
  ];

  // Repeat the policies array to have more than 12 items for demonstration
  const repeatedPolicies = Array(2).fill(policies).flat();

  const [currentPage, setCurrentPage] = useState(1);
  const policiesPerPage = 12;

  const indexOfLastPolicy = currentPage * policiesPerPage;
  const indexOfFirstPolicy = indexOfLastPolicy - policiesPerPage;
  const currentPolicies = repeatedPolicies.slice(indexOfFirstPolicy, indexOfLastPolicy);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='policies-body'>
      <Navbar1/>
      <div className="policies-header">
        <h1>Active Policies</h1>
        <input
          type="text"
          className="policies-search"
          placeholder="Search by policy name"
        />
      </div>
      <div className="policies-container-wrapper">
        <div className="policies-container">
          {currentPolicies.map((policy, index) => (
            <div className="policy-card" key={index}>
              <h3>{policy.name}</h3>
              <button style={{ backgroundColor: policy.status === 'Active' ? '#5353FF' : '#FF5353' }}>
                {policy.status === 'Active' ? 'Buy Again' : 'Status Pending'}
              </button>
              {policy.status === 'Active' && <button>Pay Premium</button>}
            </div>
          ))}
        </div>
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(repeatedPolicies.length / policiesPerPage) }, (_, i) => (
          <button key={i + 1} onClick={() => paginate(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Policies;
