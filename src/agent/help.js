import React, { useState, useContext } from "react";
import axios from 'axios';
import './help.css';
import helpme from "../images/userimages/helpme.png";
import { AppContext } from '../AppContext';
import Navbar1 from "../Userinterface/Usernavbar";

function Help() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { suserId } = useContext(AppContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const ticket = {
            title: title,
            description: description,
            user: { userId: 6} // assuming userId is 1 for this example
        };

        try {
            const response = await axios.post('http://localhost:8008/api/tickets/create', ticket, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response status:', response.status);
            console.log('Response data:', response.data);

            if (response.status !== 201) {
                throw new Error(`Error: ${response.status}`);
            }

            console.log('Ticket created successfully:', response.data);
        } catch (error) {
            console.error('Error creating ticket:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <Navbar1/>
            <div className="help-background">
                <div className="help-main-body">
                    <h1 className="help-upperhead">Need Assistance, User? Let’s Resolve It Together!</h1>
                    <div className="help-white-box">
                        <h2 className="help-box-heading">Raise a Ticket</h2>
                        <form className="help-ticket-form" onSubmit={handleSubmit}>
                            <div className="help-form-left">
                                <div className="help-form-group">
                                    <label htmlFor="title">Title:</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        className="help-text-box"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="help-form-group">
                                    <label htmlFor="description">Description:</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        className="help-text-boxx"
                                        rows="4"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="help-submittt-button">Submit</button>
                            </div>
                            <div className="help-form-right">
                                <img src={helpme} alt='userloginlogo' className='help-ag-image' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Help;
