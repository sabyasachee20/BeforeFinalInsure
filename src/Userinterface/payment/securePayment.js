import React, { useState, useEffect } from 'react';
import './payment.css';
import creditCardIcon from '../../images/logosfolder/debit.png';
import debitCardIcon from '../../images/logosfolder/credit.png';
import upiIcon from '../../images/logosfolder/upi.png';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SecurePayment() {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [premiumCount, setPremiumCount] = useState(0);
    const [maxPayments, setMaxPayments] = useState(0);
    const [policy, setPolicy] = useState({});
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [upiId, setUpiId] = useState('');
    const [errors, setErrors] = useState({});
    
    const location = useLocation();
    const { userpolicyId } = location.state || {};
    
    const navigate = useNavigate();
    console.log(userpolicyId);

    useEffect(() => {
        axios.get(`http://localhost:8008/user-policies/readOne/${userpolicyId}`)
            .then(response => {
                const policyData = response.data;
                setPolicy(policyData);
                setPremiumCount(policyData.premiumCount);

                
                const startDate = new Date(policyData.startDate);
                const endDate = new Date(policyData.endDate);
                const premiumTerm = policyData.premiumTerm;

                let totalPayments = 0;
                const diffInMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
                if (premiumTerm === 'monthly') {
                    totalPayments = diffInMonths + 1;
                } else if (premiumTerm === 'quarterly') {
                    totalPayments = Math.floor(diffInMonths / 3) + 1;
                } else if (premiumTerm === 'semi-annually') {
                    totalPayments = Math.floor(diffInMonths / 6) + 1;
                } else if (premiumTerm === 'annually') {
                    totalPayments = Math.floor(diffInMonths / 12) + 1;
                }
               
                setMaxPayments(totalPayments);
            })
            .catch(error => {
                console.error('Error fetching policy data:', error);
            });
    }, [userpolicyId]);

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
        setErrors({});
    };

    const handleCompletePayment = () => {
        const validationErrors = validateFields();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (premiumCount >= maxPayments) {
            alert('You have completed paying all your premiums.');
            return;
        }

        axios.put(`http://localhost:8008/user-policies/increment/${userpolicyId}`)
            .then(response => {
                setPremiumCount(response.data.premiumCount);
                const nextDueDate = calculateNextDueDate(policy.premiumTerm);
                toast.success(`Payment completed successfully! Your next due date is ${nextDueDate}`, {
                    autoClose: 5000, 
                });
                setTimeout(() => {
                    navigate(`/payment-history`, { state: { userpolicyId } });
                }, 5000);
            })
            .catch(error => {
                console.error('Error completing payment:', error);
            });
    };

    const validateFields = () => {
        const errors = {};

        if (paymentMethod === 'credit' || paymentMethod === 'debit') {
            if (!/^\d{16}$/.test(cardNumber)) {
                errors.cardNumber = 'Card number must be 16 digits';
            }
            if (!/^[a-zA-Z\s]+$/.test(cardHolderName)) {
                errors.cardHolderName = 'Card holder name must contain only alphabets and spaces';
            }
            if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
                errors.expiryDate = 'Expiry date must be in MM/YY format';
            } else {
                const [month, year] = expiryDate.split('/');
                const expiry = new Date(`20${year}-${month}-01`);
                const now = new Date();
                if (expiry < now) {
                    errors.expiryDate = 'Expiry date must be a future date';
                }
            }
            if (!/^\d{3}$/.test(cvv)) {
                errors.cvv = 'CVV must be 3 digits';
            }
        } else if (paymentMethod === 'upi') {
            if (!/^[a-zA-Z0-9.\-]+@[a-zA-Z]+$/.test(upiId)) {
                errors.upiId = 'UPI ID must be in the format example@bank';
            }
        }

        return errors;
    };

    const calculateNextDueDate = (premiumTerm) => {
        const currentDate = new Date();
        let nextDueDate;

        if (premiumTerm === 'monthly') {
            nextDueDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
        } else if (premiumTerm === 'quarterly') {
            nextDueDate = new Date(currentDate.setMonth(currentDate.getMonth() + 3));
        } else if (premiumTerm === 'semi-annually') {
            nextDueDate = new Date(currentDate.setMonth(currentDate.getMonth() + 6));
        } else if (premiumTerm === 'annually') {
            nextDueDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));
        }

        return nextDueDate.toLocaleDateString();
    };

    return (
        <div className="secure-payment-page">
            <header></header>
            <main className="secure-payment-main">
                <h1 className="secure-payment-title">Secure Payment Gateway</h1>
                <p className="secure-payment-description">Complete your payment for your plan</p>
                <div className="secure-payment-methods">
                    <div className={`secure-payment-method ${paymentMethod === 'credit' ? 'selected' : ''}`} onClick={() => handlePaymentMethodChange('credit')}>
                        <img src={creditCardIcon} alt="Credit Card" />
                        <p>Credit Card</p>
                    </div>
                    <div className={`secure-payment-method ${paymentMethod === 'debit' ? 'selected' : ''}`} onClick={() => handlePaymentMethodChange('debit')}>
                        <img src={debitCardIcon} alt="Debit Card" />
                        <p>Debit Card</p>
                    </div>
                    <div className={`secure-payment-method ${paymentMethod === 'upi' ? 'selected' : ''}`} onClick={() => handlePaymentMethodChange('upi')}>
                        <img src={upiIcon} alt="UPI ID" />
                        <p>UPI ID</p>
                    </div>
                </div>
                <div className="secure-payment-form">
                    {paymentMethod === 'credit' || paymentMethod === 'debit' ? (
                        <>
                            <div className="secure-payment-form-group">
                                <label htmlFor="cardNumber">Card Number</label>
                                <input 
                                    type="text" 
                                    id="cardNumber" 
                                    name="cardNumber" 
                                    value={cardNumber} 
                                    onChange={(e) => setCardNumber(e.target.value)} 
                                />
                                {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}
                            </div>
                            <div className="secure-payment-form-group">
                                <label htmlFor="cardHolderName">Card Holder Name</label>
                                <input 
                                    type="text" 
                                    id="cardHolderName" 
                                    name="cardHolderName" 
                                    value={cardHolderName} 
                                    onChange={(e) => setCardHolderName(e.target.value)} 
                                />
                                {errors.cardHolderName && <p className="error">{errors.cardHolderName}</p>}
                            </div>
                            <div className="secure-payment-form-group">
                                <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
                                <input 
                                    type="text" 
                                    id="expiryDate" 
                                    name="expiryDate" 
                                    value={expiryDate} 
                                    onChange={(e) => setExpiryDate(e.target.value)} 
                                />
                                {errors.expiryDate && <p className="error">{errors.expiryDate}</p>}
                            </div>
                            <div className="secure-payment-form-group">
                                <label htmlFor="cvv">CVV</label>
                                <input 
                                    type="text" 
                                    id="cvv" 
                                    name="cvv" 
                                    value={cvv} 
                                    onChange={(e) => setCvv(e.target.value)} 
                                />
                                {errors.cvv && <p className="error">{errors.cvv}</p>}
                            </div>
                        </>
                    ) : paymentMethod === 'upi' ? (
                        <div className="secure-payment-form-group">
                            <label htmlFor="upiId">UPI ID</label>
                            <input 
                                type="text" 
                                id="upiId" 
                                name="upiId" 
                                value={upiId} 
                                onChange={(e) => setUpiId(e.target.value)} 
                            />
                            {errors.upiId && <p className="error">{errors.upiId}</p>}
                        </div>
                    ) : null}
                    <button className="secure-payment-complete-button" onClick={handleCompletePayment}>Complete Payment</button>
                </div>
                <div className="secure-payment-premium-count">
                    <h3>Premium Count: {premiumCount}/{maxPayments}</h3>
                </div>
                <ToastContainer autoClose={5000} />
            </main>
        </div>
    );
}

export default SecurePayment;
