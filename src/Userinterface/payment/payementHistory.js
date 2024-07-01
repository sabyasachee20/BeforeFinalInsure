import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './paymentHistory.css';

const PaymentHistory = () => {
  const [policy, setPolicy] = useState(null);
  const [filterYear, setFilterYear] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const location = useLocation();
  const { userpolicyId } = location.state || {};

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const response = await axios.get(`http://localhost:8008/user-policies/readOne/${userpolicyId}`);
        setPolicy(response.data);
      } catch (error) {
        console.error('Error fetching policy:', error);
      }
    };

    fetchPolicy();
  }, [userpolicyId]);

  const handleYearChange = (event) => {
    setFilterYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setFilterMonth(event.target.value);
  };

  const getPaymentDates = () => {
    if (!policy) return [];

    const { startDate, premiumTerm, premiumCount } = policy;
    const dates = [];
    let currentDate = new Date(startDate);

    switch (premiumTerm) {
      case 'monthly':
        for (let i = 0; i < premiumCount; i++) {
          dates.push(new Date(currentDate));
          currentDate.setMonth(currentDate.getMonth() + 1);
        }
        break;
      case 'quarterly':
        for (let i = 0; i < premiumCount; i++) {
          dates.push(new Date(currentDate));
          currentDate.setMonth(currentDate.getMonth() + 3);
        }
        break;
      case 'semi-annual':
        for (let i = 0; i < premiumCount; i++) {
          dates.push(new Date(currentDate));
          currentDate.setMonth(currentDate.getMonth() + 6);
        }
        break;
      case 'annually':
        for (let i = 0; i < premiumCount; i++) {
          dates.push(new Date(currentDate));
          currentDate.setFullYear(currentDate.getFullYear() + 1);
        }
        break;
      default:
        break;
    }
    return dates;
  };

  const filterPayments = (payments) => {
    return payments.filter((paymentDate) => {
      const paymentYear = paymentDate.getFullYear();
      const paymentMonth = paymentDate.getMonth() + 1; // getMonth() is zero-indexed
      const filterYearNumber = parseInt(filterYear);
      const filterMonthNumber = parseInt(filterMonth);

      if (filterYear && filterMonth) {
        return paymentYear === filterYearNumber && paymentMonth === filterMonthNumber;
      } else if (filterYear) {
        return paymentYear === filterYearNumber;
      } else if (filterMonth) {
        return paymentMonth === filterMonthNumber;
      } else {
        return true;
      }
    });
  };

  if (!policy) {
    return <div>Loading...</div>;
  }

  const paymentDates = getPaymentDates();
  const filteredPayments = filterPayments(paymentDates);

  return (
    <div className="payment-history-page">
      <div className="payment-history-container">
        <h1 className="payment-history-header">Payment History</h1>
        <div className="payment-history-filters">
          <label className="payment-history-filter-label">
            Filter by year:
            <input
              type="number"
              value={filterYear}
              onChange={handleYearChange}
              placeholder="Select a year"
              className="payment-history-filter-input"
            />
          </label>
          <label className="payment-history-filter-label">
            Filter by month:
            <input
              type="number"
              value={filterMonth}
              onChange={handleMonthChange}
              placeholder="Select a month"
              className="payment-history-filter-input"
            />
          </label>
        </div>
        <table className="payment-history-table">
          <thead>
            <tr>
              <th>Premium Term</th>
              <th>Premium Amount</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((date, index) => (
              <tr key={index}>
                <td>{policy.premiumTerm}</td>
                <td>₹{policy.premium}</td>
                <td>{date.toDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
