import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const FundTransferForm = ({ open, onClose }) => {
    const [transferDetails, setTransferDetails] = useState({
        accountNumber: '',
        ifscCode: '',
        amount: '',
        remarks: '',
        currency: 'INR',
        paymentMethod: 'cash',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [stripe, setStripe] = useState(null);
    console.log(loading);
    // Load Stripe instance
    const initializeStripe = async () => {
        const stripeInstance = await loadStripe('pk_test_51OGEyFSDrJBc0PMT7YnkTkPKV4BAlhVEcsd5xvqeyB8GHuC8cNLzJTT4VhbBu0BH4aQYiEZcupUHw2JT7QSggTNG001fwkfnAI');
        setStripe(stripeInstance);
    };

    // Fetch the client secret from the server
    const createPaymentIntent = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/create-payment-intent', transferDetails, {
                withCredentials: true,
            });
            return response.data.clientSecret;
        } catch (error) {
            console.error('Error creating payment intent:', error);
            throw error;
        }
    };

    // Handle transfer and confirm Cash App payment
    const handleTransfer = async () => {
        setLoading(true);

        if (validateForm()) {
            try {
                // Ensure Stripe is loaded
                if (!stripe) {
                    await initializeStripe();
                }

                const clientSecret = await createPaymentIntent();

                // Confirm Cash App payment
                const result = await stripe.confirmCashappPayment(clientSecret, {
                    payment_method: {
                        type: 'cash',
                        cash: {
                            account_number: transferDetails.accountNumber,
                            ifsc_code: transferDetails.ifscCode,
                            amount: transferDetails.amount,
                            remarks: transferDetails.remarks,
                        },
                    },
                });
                console.log(result);

                // Handle result
                console.log('Payment successful');
            } catch (error) {
                console.error('Error:', error);
                // Handle error
            }

            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransferDetails({ ...transferDetails, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!transferDetails.accountNumber) {
            newErrors.accountNumber = 'Account Number is required';
        }
        if (!transferDetails.ifscCode) {
            newErrors.ifscCode = 'IFSC Code is required';
        }
        if (!transferDetails.amount) {
            newErrors.amount = 'Amount is required';
        }
        if (!transferDetails.remarks) {
            newErrors.remarks = 'Remarks is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleCancel = () => {
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Fund Transfer</DialogTitle>
            <DialogContent>
                <form>
                    <TextField
                        label="Account Number"
                        name="accountNumber"
                        value={transferDetails.accountNumber}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        size="small"
                        required
                        error={errors.accountNumber}
                        helperText={errors.accountNumber}
                    />
                    <TextField
                        label="Routing Number"
                        name="ifscCode"
                        value={transferDetails.ifscCode}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        size="small"
                        required
                        error={errors.ifscCode}
                        helperText={errors.ifscCode}
                    />
                    <TextField
                        label="Amount"
                        name="amount"
                        value={transferDetails.amount}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        type="number"
                        size="small"
                        required
                        error={errors.amount}
                        helperText={errors.amount}
                    />
                    <TextField
                        label="Remarks"
                        name="remarks"
                        value={transferDetails.remarks}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        size="small"
                        error={errors.remarks}
                        helperText={errors.remarks}
                        required
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <Button type="button" variant="contained" color="primary" onClick={handleTransfer}>
                            Transfer Funds
                        </Button>
                        <Button type="button" variant="contained" color="primary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default FundTransferForm;
