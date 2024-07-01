import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNav from './adminnav';

function Claim() {
  const [autoclaims, setAutoClaims] = useState([]);
  const [termclaims, setTermClaims] = useState([]);
  const [healthclaims, setHealthClaims] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    fetchAutoClaims();
    fetchHealthClaims();
    fetchTermClaims();
  }, []);

  const fetchAutoClaims = async () => {
    try {
      const response = await axios.get('http://localhost:7001/admin/auto/claim');
      setAutoClaims(response.data);
    } catch (error) {
      console.error('Error fetching claims:', error);
    }
  };

  const fetchHealthClaims = async () => {
    try {
      const response = await axios.get('http://localhost:7001/admin/health/claim');
      setHealthClaims(response.data);
    } catch (error) {
      console.error('Error fetching claims:', error);
    }
  };

  const fetchTermClaims = async () => {
    try {
      const response = await axios.get('http://localhost:7001/admin/term/claim');
      setTermClaims(response.data);
    } catch (error) {
      console.error('Error fetching claims:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleViewClick = (claim) => {
    navigate(`/claim-details`, { state: { selectedClaim: claim } });
  };

  const filterClaims = (claims) => {
    return claims.filter(
      (claim) =>
        (statusFilter === 'All' || claim.status.toLowerCase() === statusFilter.toLowerCase()) &&
        (claim.userPolicy.user.userId.toString().includes(searchTerm) ||
          claim.userPolicy.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          claim.userPolicy.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const filteredAutoClaims = filterClaims(autoclaims);
  const filteredTermClaims = filterClaims(termclaims);
  const filteredHealthClaims = filterClaims(healthclaims);

  const totalEntries = filteredAutoClaims.length + filteredTermClaims.length + filteredHealthClaims.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;

  const currentEntries = [
    ...filteredAutoClaims.slice(indexOfFirstEntry, indexOfLastEntry),
    ...filteredTermClaims.slice(indexOfFirstEntry, indexOfLastEntry),
    ...filteredHealthClaims.slice(indexOfFirstEntry, indexOfLastEntry),
  ].slice(0, entriesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <AdminNav/>
      <div className='customerquote'>
        <h1>Claim Requests</h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search by User ID or Name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div className='filteroptions'>
        <button onClick={() => handleStatusFilterChange('All')}>All</button>
        <button onClick={() => handleStatusFilterChange('pending')}>Pending</button>
        <button onClick={() => handleStatusFilterChange('Accepted')}>Accepted</button>
        <button onClick={() => handleStatusFilterChange('Rejected')}>Rejected</button>
      </div>
      <div className='sidecontent'>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Policy Name</th>
              <th>Phone No</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((claim) => (
              <tr key={claim.claimId}>
                <td>{claim.userPolicy.user.userId}</td>
                <td>{claim.userPolicy.user.firstName}</td>
                <td>{claim.userPolicy.user.lastName}</td>
                <td>{claim.userPolicy.policy.policyName}</td>
                <td>{claim.userPolicy.user.phoneNo}</td>
                <td>{claim.userPolicy.user.emailId}</td>
                <td>{claim.status}</td>
                <td>
                  <button onClick={() => handleViewClick(claim)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({ length: totalPages }).map((_, page) => (
            <button key={`page-${page + 1}`} onClick={() => paginate(page + 1)}>
              {page + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Claim;
