import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './admin.css'
import AdminNav from './adminnav';

function Buy() {
  const [purchases, setPurchases] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'pending', 'approved', 'rejected'
  const entriesPerPage = 10;
  const navigate = useNavigate();

  // Fetch All Purchases
  const fetchPurchases = async () => {
    try {
      const response = await axios.get('http://localhost:7001/admin/allpurchase');
      setPurchases(response.data);
    } catch (error) {
      console.error('Error fetching purchases:', error);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  // Handle Search
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle View Click
  const handleViewClick = (purchase) => {
    navigate(`/purchase-details`, { state: { selectedPurchase: purchase } });
  };

  useEffect(() => {
    const fetchPurchaseRequest = async () => {
      try {
        const response = await axios.get('http://localhost:7001/admin/purchase/search', {
          params: { q: searchTerm }
        });
        setPurchases(response.data);
      } catch (error) {
        console.error('There was an error fetching the posts!', error);
      }
    };

    if (searchTerm.trim() !== '') {
      fetchPurchaseRequest();
    } else {
      // If search term is empty, fetch all purchases
      fetchPurchases();
    }
  }, [searchTerm]);

  // Filtered purchases based on current statusFilter
  const filteredPurchases = purchases.filter(purchase => {
    if (statusFilter === 'all') {
      return true;
    } else {
      return purchase.userPolicy.status.toLowerCase() === statusFilter;
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredPurchases.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredPurchases.slice(indexOfFirstEntry, indexOfLastEntry);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <AdminNav/>
      <div className='customerquote'>
        <h1>Purchase Requests</h1>
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
      <div className=''>
        <div className='filteroptions'>
          <button onClick={() => setStatusFilter('all')}>All</button>
          <button onClick={() => setStatusFilter('pending')}>Pending</button>
          <button onClick={() => setStatusFilter('active')}>Active</button>
          <button onClick={() => setStatusFilter('rejected')}>Rejected</button>
        </div>
        <div >
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
              {currentEntries.map(purchase => (
                <tr key={purchase.policyDetailsId}>
                  <td>{purchase.userPolicy.user.userId}</td>
                  <td>{purchase.userPolicy.user.firstName}</td>
                  <td>{purchase.userPolicy.user.lastName}</td>
                  <td>{purchase.policyType}</td>
                  <td>{purchase.userPolicy.user.phoneNo}</td>
                  <td>{purchase.userPolicy.user.emailId}</td>
                  <td>{purchase.userPolicy.status}</td>
                  <td><button onClick={() => handleViewClick(purchase)}>View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

export default Buy;
