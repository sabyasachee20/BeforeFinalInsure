import React, { useEffect, useState ,useContext} from 'react';
import './viewtickets.css';
import { AppContext } from '../AppContext';
import Navbar1 from '../Userinterface/Usernavbar';

function SolvedTickets() {
    const [tickets, setTickets] = useState([]);

    const user = JSON.parse(sessionStorage.getItem('user'));
  const userId = user.userId;

    useEffect(() => {
        fetchSolvedTickets();
    }, [ userId ]);

    const fetchSolvedTickets = async () => {
        try {
            const response = await fetch(`http://localhost:8008/api/tickets/user/${ userId }`);
            if (!response.ok) {
                throw new Error(`Failed to fetch solved tickets. Status: ${response.status}`);
            }
            const data = await response.json();
            setTickets(data);
        } catch (error) {
            console.error('Error fetching solved tickets:', error);
        }
    };

    return (
        <div>
        <Navbar1/>
            <div className="solved-tickets-mainbox">
                <h1 className="solved-tickets-heading">Solved Tickets</h1>
                <table className="solved-tickets-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Response</th>
                            <th>Response At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket => (
                            <tr key={ticket.id}>
                                <td>{ticket.id}</td>
                                <td>{ticket.title}</td>
                                <td>{ticket.description}</td>
                                <td>{ticket.responseTxt}</td>
                                <td>{ticket.responseAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SolvedTickets;
