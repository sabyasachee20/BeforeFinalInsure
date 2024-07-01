import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './closedticket.css';
import AgentNavbar from "./agentnav";
import Dasb from "./dashside";

function AgentClosedTicket() {
    const [tickets, setTickets] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTicketsSummary();
    }, []);

    const fetchTicketsSummary = async () => {
        try {
            const response = await axios.get('http://localhost:8008/api/tickets/closed');
            console.log('Response received:', response);
            setTickets(response.data);
            setFetchError(null);
        } catch (error) {
            console.error('Error fetching tickets summary:', error);
            setFetchError('Failed to fetch tickets summary. Please try again later.');
        }
    };

    const handleViewTicket = (ticketId) => {
        navigate(`/view-closed-ticket/${ticketId}`);
    };

    const tableHeadStyle = () => ({
        width: '20%',
    });

    return (
        <div>
            <AgentNavbar />
            <Dasb />
            <div className="agent-main-component">
                <div className="agent-table-container">
                    {fetchError ? (
                        <p>{fetchError}</p>
                    ) : (
                        <>
                            <h2>Ticket Summaries</h2>
                            <table className="agent-tickets-table">
                                <thead>
                                    <tr>
                                        <th style={tableHeadStyle()}>User ID</th>
                                        <th style={tableHeadStyle()}>Ticket ID</th>
                                        <th style={tableHeadStyle()}>Title</th>
                                        <th style={tableHeadStyle()}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets.map((ticket, index) => (
                                        <tr key={index}>
                                            <td>{ticket.user.userId}</td>
                                            <td>{ticket.id}</td>
                                            <td>{ticket.title}</td>
                                            <td>
                                                <button onClick={() => handleViewTicket(ticket.id)}>
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AgentClosedTicket;
