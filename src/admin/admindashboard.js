import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import AdminNav from './adminnav';

// Register the components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

function Admindashboard() {
  const [custs, setCusts] = useState('');
  const [approve, setApprove] = useState([]);
  const [reject, setReject] = useState([]);
  const [buyingrequest, setBuyingRequest] = useState([]);
  const [termclaimrequest, setTermClaimRequest] = useState([]);
  const [healthclaimrequest, setHealthClaimRequest] = useState([]);
  const [autoclaimrequest, setAutoClaimRequest] = useState([]);

  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7001/admin/activeuserspermonth');
        const data = response.data;

        // Extract the months and active user counts
        const months = data.map(d => d.month);
        const activeUsers = data.map(d => d.activeUsers);

        setChartData({
          labels: months,
          datasets: [
            {
              label: 'Active Users',
              data: activeUsers,
              fill: false,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Active Users',
        },
        beginAtZero: true,
      },
    },
  };

  // Fetch active customers
  useEffect(() => {
    axios.get('http://localhost:7001/admin/active')
      .then(response => {
        setCusts(response.data); // Ensure response.data is an array or default to empty array
        console.log(custs);
      })
      .catch(error => {
        console.error('There was an error fetching the custs!', error);
      })
  }, []);

  // Fetch approved status
  useEffect(() => {
    axios.get('http://localhost:7001/admin/approved')
      .then(response => {
        setApprove(response.data || []); // Ensure response.data is an array or default to empty array
      })
      .catch(error => {
        console.error('There was an error fetching the approved count!', error);
      });
  }, []);

  // Fetch rejected status
  useEffect(() => {
    axios.get('http://localhost:7001/admin/rejected')
      .then(response => {
        setReject(response.data || []); // Ensure response.data is an array or default to empty array
      })
      .catch(error => {
        console.error('There was an error fetching the rejected count!', error);
      });
  }, []);

  // Fetch count of Buying Request
  useEffect(() => {
    axios.get('http://localhost:7001/admin/buyingrequest')
      .then(response => {
        setBuyingRequest(response.data || []); // Ensure response.data is an array or default to empty array
      })
      .catch(error => {
        console.error('There was an error fetching the buying request count!', error);
      });
  }, []);

  // Fetch count of term claim request
  useEffect(() => {
    axios.get('http://localhost:7001/admin/term/claimrequest')
      .then(response => {
        setTermClaimRequest(response.data || []); // Ensure response.data is an array or default to empty array
      })
      .catch(error => {
        console.error('There was an error fetching the term claim request count!', error);
      });
  }, []);

  // Fetch count of auto claim request
  useEffect(() => {
    axios.get('http://localhost:7001/admin/auto/claimrequest')
      .then(response => {
        setAutoClaimRequest(response.data || []); // Ensure response.data is an array or default to empty array
      })
      .catch(error => {
        console.error('There was an error fetching the auto claim request count!', error);
      });
  }, []);

  // Fetch count of health claim request
  useEffect(() => {
    axios.get('http://localhost:7001/admin/health/claimrequest')
      .then(response => {
        setHealthClaimRequest(response.data || []); // Ensure response.data is an array or default to empty array
      })
      .catch(error => {
        console.error('There was an error fetching the health claim request count!', error);
      });
  }, []);

  return (
    <div>
    <AdminNav/>
    <div className='sidecontent'>
        <h1>Welcome back Admin</h1>
      <div className='counts'>
        <div className='box'>
          Active Customer:
          <div>{custs.length}</div>
        </div>
        <div className='box'>
          Approved Policy:
          <div>{approve.length}</div>
        </div>
        <div className='box'>
          Disapproved Policy:
          <div>{reject.length}</div>
        </div>
        <div className='box'>
          Buying Request:
          <div>{buyingrequest.length}</div>
        </div>
        <div className='box'>
          Claim Request:
          <div>{termclaimrequest.length + healthclaimrequest.length + autoclaimrequest.length}</div>
        </div>
      </div>
      <div className='chart'>
        <Line data={chartData} options={options} />
      </div>
    </div>
    </div>
  );
}

export default Admindashboard;
