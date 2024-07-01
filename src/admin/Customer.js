import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNav from './adminnav';

function Customers() {
  const [policyDetails, setPolicyDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 8;
  const navigate = useNavigate();

  // Fetch customers based on search term
  useEffect(() => {
    if (searchTerm === '') {
      axios.get('http://localhost:7001/admin/active')
        .then(response => {
          setPolicyDetails(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the policy details!', error);
        });
    } else {
      const fetchCustomers = async () => {
        try {
          const response = await axios.get('http://localhost:7001/admin/search', {
            params: { q: searchTerm }
          });
          setPolicyDetails(response.data);
        } catch (error) {
          console.error('There was an error fetching the posts!', error);
        }
      };
      fetchCustomers();
    }
  }, [searchTerm]);

  const handleViewClick = (customer) => {
    navigate(`/customer-details`, { state: { selectedCustomer: customer } });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const totalPages = Math.ceil(policyDetails.length / entriesPerPage);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = policyDetails.slice(indexOfFirstEntry, indexOfLastEntry);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
     <AdminNav/>
    <div className='maincontainer'>
      <div className='customerquote'>
        <h1>Active Customers</h1>
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
      <div>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>DOB</th>
              <th>Phone No</th>
              <th>Email</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map(policydetails => (
              <tr key={policydetails.userPolicyId}>
                <td>{policydetails.user.userId}</td>
                <td>{policydetails.user.firstName}</td>
                <td>{policydetails.user.lastName}</td>
                <td>{policydetails.user.dob}</td>
                <td>{policydetails.user.phoneNo}</td>
                <td>{policydetails.user.emailId}</td>
                <td>{policydetails.user.address}</td>
                <td><button onClick={() => handleViewClick(policydetails)}>View </button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination buttons */}
        <div className="pagination">
          {Array.from({ length: totalPages }).map((_, page) => (
            <button key={`page-${page + 1}`} onClick={() => paginate(page + 1)}>
              {page + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}

export default Customers;
