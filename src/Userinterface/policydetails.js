import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './policydetails.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar1 from './Usernavbar';

function PolicyDetails() {
    const [newData, setNewData] = useState(null);
    const [claimData, setClaimData] = useState([]);
    const [claim_type, setClaimType] = useState('');
    const [renewEnable, setRenewEnable] = useState(false);
    const [claimEnable, setClaimEnable] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('All'); // State for status filter
    const navigate = useNavigate();
    const location = useLocation();
    const userpolicyId = localStorage.getItem('userpolicyId');

    const rowsPerPage = 4;

    const fetchUserPolicyData = async () => {
        try {
            const response = await axios.get(`http://localhost:8008/user-policies/readOne/${userpolicyId}`);
            setNewData(response?.data);
            switch (response?.data?.policy?.policyId) {
                case 1:
                    setClaimType('auto-claims');
                    break;
                case 2:
                    setClaimType('term-claims');
                    break;
                case 3:
                    setClaimType('health-claims');
                    break;
                default:
                    throw new Error('No Claim found');
            }

            const date = new Date(Date.now());
            const formattedDate = date.toISOString().split('T')[0];

            if (response?.data?.endDate === formattedDate) {
                setRenewEnable(true);
            }
            if (response?.data?.leftcoverage !== 0) {
                setClaimEnable(true);
            }
        } catch (error) {
            console.error('Error fetching user policy data:', error);
        }
    };

    const claimclick = () => {
        switch (newData?.policy?.policyId) {
            case 1:
                navigate('/autoclaim');
                break;
            case 2:
                navigate('/termclaim');
                break;
            case 3:
                navigate('/healthclaim');
                break;
            default:
                console.error('Invalid policy ID');
        }
    };

    const fetchClaimData = async () => {
        try {
            const response = await axios.get(`http://localhost:8008/${claim_type}/user-policies/${userpolicyId}`);
            setClaimData(response.data);

            // Check if there is an accepted claim for term claims
            if (claim_type === 'term-claims' && response.data.some(claim => claim.status === 'Accepted')) {
                setClaimEnable(false);
            }
        } catch (error) {
            console.error('Error fetching claim data:', error);
        }
    };

    useEffect(() => { fetchUserPolicyData() }, []);
    useEffect(() => { if (claim_type) fetchClaimData() }, [claim_type]);

    const handlePageChange = (direction) => {
        if (direction === 'next' && currentPage < Math.ceil(filteredClaims.length / rowsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
        if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
        setCurrentPage(1); // Reset to first page when filter changes
    };

    const filteredClaims = claimData.filter(claim =>
        statusFilter === 'All' || claim.status === statusFilter
    );

    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentClaims = filteredClaims.slice(startIndex, startIndex + rowsPerPage);

    return (
        <div className='base-policy'>
            <Navbar1 />
            <div className='base'>
                <div className="top-policy">
                    <div className="content-policy">
                        <p className='heading-policy'>Policy Details</p>
                        <div className="policy-details">
                            <h2 className='elements-policy'>Your Present Policy Details</h2>
                            <div className='f1-policy'>
                                <p className='elements-policy'><span style={{ fontWeight: 'bold' }}>Premium: </span>{newData?.premium}</p>
                                <p className='elements-policy'><span style={{ fontWeight: 'bold' }}>Term Period: </span>{newData?.term}</p>
                            </div>
                            <div className='f1-policy'>
                                <p className='elements-policy'><span style={{ fontWeight: 'bold' }}>Coverage: </span>{newData?.coverage}</p>
                                <p className='elements-policy'><span style={{ fontWeight: 'bold' }}>Left: </span>{newData?.leftcoverage}</p>
                            </div>
                            <div className='pdf2'>
                                <p className='elements-policy'>StartDate: {newData?.startDate}</p>
                                <p className='elements-policy'>EndDate: {newData?.endDate}</p>
                            </div>
                        </div>
                        {claimData.length > 0 ? (
                            <div>
                                <h2 className='elements-policy'>Your Claims</h2>
                                <div className='policyfilter-container'>
                                    <label htmlFor="statusFilterpolicy">Filter by Status:</label>
                                    <select id="statusFilterpolicy" className='statusoption' value={statusFilter} onChange={handleStatusFilterChange}>
                                        <option value="All">All</option>
                                        <option value="Accepted">Accepted</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </div>
                                <div className='claimtableembedded'>
                                    <table className="claim-table-unique">
                                        <thead>
                                            <tr>
                                                <th className="ctable-header-unique">Claim No</th>
                                                <th className="ctable-header-unique">Amount</th>
                                                <th className="ctable-header-unique">Date of Service</th>
                                                <th className="ctable-header-unique">Status</th>
                                            </tr>
                                        </thead>
                                        {currentClaims.length === 0 ? (
                                            <tbody>
                                                <tr>
                                                    <td colSpan='4' className="no-claimsintable">No claims available</td>
                                                </tr>
                                            </tbody>
                                        ) : (
                                            <tbody>
                                                {currentClaims.map((claim, index) => (
                                                    <tr key={index}>
                                                        {claim_type === 'auto-claims' && (
                                                            <>
                                                                <td className="ctable-cell-unique">{startIndex + index + 1}</td>
                                                                <td className="ctable-cell-unique">{claim.damageCost}</td>
                                                                <td className="ctable-cell-unique">{claim.incidentTime}</td>
                                                                <td className="ctable-cell-unique">{claim.status}</td>
                                                            </>
                                                        )}
                                                        {claim_type === 'health-claims' && (
                                                            <>
                                                                <td className="ctable-cell-unique">{startIndex + index + 1}</td>
                                                                <td className="ctable-cell-unique">{claim.claimamt}</td>
                                                                <td className="ctable-cell-unique">{claim.dateofservice}</td>
                                                                <td className="ctable-cell-unique">{claim.status}</td>
                                                            </>
                                                        )}
                                                        {claim_type === 'term-claims' && (
                                                            <>
                                                                <td className="ctable-cell-unique">{startIndex + index + 1}</td>
                                                                <td className="ctable-cell-unique">{claim.userPolicy?.coverage}</td>
                                                                <td className="ctable-cell-unique">{claim.dateofdemise}</td>
                                                                <td className="ctable-cell-unique">{claim.status}</td>
                                                            </>
                                                        )}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        )}
                                    </table>
                                </div>
                                <div className="pagination-unique">
                                    <button
                                        className="pagination-button-unique"
                                        onClick={() => handlePageChange('prev')}
                                        disabled={currentPage === 1}
                                    >
                                        &lt;
                                    </button>
                                    <button
                                        className="pagination-button-unique"
                                        onClick={() => handlePageChange('next')}
                                        disabled={currentPage === Math.ceil(filteredClaims.length / rowsPerPage)}
                                    >
                                        &gt;
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p className="no-claims">No claims available.</p>
                        )}
                        <div className='buttt'>
                            {renewEnable ? (
                                <button className='button1-policy' onClick={() => navigate('/renew')}>Renew</button>
                            ) : (
                                <button className='button1-policy-disabled' onClick={() => navigate('/renew')} disabled={!renewEnable}>Renew</button>
                            )}
                            {claimEnable ? (
                                <button className='button1-policy' onClick={claimclick}>Claim</button>
                            ) : (
                                <button className='button2-policy-disabled' onClick={claimclick} disabled={!claimEnable}>Claim</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PolicyDetails;
