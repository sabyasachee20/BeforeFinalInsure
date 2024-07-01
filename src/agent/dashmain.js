import React, { useState, useEffect } from "react";
import './dh.css';
import axios from 'axios';

import AgentNavbar from "./agentnav";
import Dasb from "./dashside";
 
function Dashmain() {
    const [closedTicketsCount, setClosedTicketsCount] = useState(0);
    const [openTicketsCount, setOpenTicketsCount] = useState(0);
 
    useEffect(() => {
        fetchClosedTicketsCount();
    }, []);
 
    useEffect(() => {
      fetchOpenTicketsCount();
  }, []);
 
    const fetchClosedTicketsCount = async () => {
        try {
            const response = await axios.get('http://localhost:8008/api/tickets/closed');
            setClosedTicketsCount(response.data);
        } catch (error) {
            console.error('Error fetching closed tickets count:', error);
        }
    };
 
    const fetchOpenTicketsCount = async () => {
      try {
          const response = await axios.get('http://localhost:8008/api/tickets/open');
          setOpenTicketsCount(response.data);
      } catch (error) {
          console.error('Error fetching open tickets count:', error);
      }
  };
 
    return (
        <div>
            <AgentNavbar/>
            <Dasb/>
           
            <div className="rightside-div">
                <h1 className='tiy'> Welcome Back Agent</h1>
                <p>We're glad to see you. Let's continue providing excellent support and making a difference for our users today!</p>
            </div>
            <div className='asa'>
                <h1 className='sam'>Open Tickets</h1>
                <p>{openTicketsCount.length}</p>
            </div>
            <div className='chala'>
                <h1 className='ana'>Closed Tickets</h1>
                <p>{closedTicketsCount.length}</p>
            </div>
        </div>
    );
}
 
export default Dashmain;