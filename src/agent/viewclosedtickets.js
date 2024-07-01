import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './viewclosedtickets.css';
import AgentNavbar from "./agentnav";
import Dasb from "./dashside";
 
function ViewClosedTickets() {
    const { ticketId } = useParams();
    const [ticket, setTicket] = useState({});
    const [fetchError, setFetchError] = useState(null);
 
    useEffect(() => {
        fetchTicketDetails();
    }, [ticketId]);
 
    const fetchTicketDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:7000/api/tickets/${ticketId}`);
            setTicket(response.data);
        } catch (error) {
            console.error('Error fetching ticket details:', error);
            setFetchError('Failed to fetch ticket details. Please try again later.');
        }
    };
 
    if (fetchError) {
        return (
            <div>
                <AgentNavbar />
                <Dasb />
                <div className="mainbox">
                    <h1 className="heading">Closed Ticket</h1>
                    <p>{fetchError}</p>
                </div>
            </div>
        );
    }
 
    return (
        <div>
            <AgentNavbar />
            <Dasb />
            <div className="mainbox">
                <h1 className="heading">Closed Ticket</h1>
                <div className="form-container">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" className="form-control" value={ticket.title || ''} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" id="description" className="form-control" value={ticket.description || ''} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="response">Response</label>
                        <input type="text" id="response" className="form-control" value={ticket.responseTxt || ''} readOnly />
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ViewClosedTickets;