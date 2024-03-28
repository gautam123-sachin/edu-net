import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Container,
    Grid,
    Select,
    MenuItem,
    FormControl,
    Typography,
    Card,
    CardContent
} from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

import { generateReferralCode } from '../../Helper.jsx';

import './style.css';

const MembershipForm = ({ user }) => {
    const yourReferralCode = generateReferralCode();
    const { firstname, lastname, email } = user.user;
    const [formData, setFormData] = useState({
        name: `${firstname} ${lastname}`,
        address: '',
        phone: '',
        email: email,
        referralCode: '',
        position: 'left',
        amount: 299,
        paymentMethod: 'card',
        currency: 'INR',
        yourReferralCode: yourReferralCode,
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        document.body.classList.add('membership-bg');
        return () => {
            document.body.classList.remove('membership-bg');
        };
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Clearing the error when user inputs data
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const stripe = await loadStripe('pk_test_51OGEyFSDrJBc0PMT7YnkTkPKV4BAlhVEcsd5xvqeyB8GHuC8cNLzJTT4VhbBu0BH4aQYiEZcupUHw2JT7QSggTNG001fwkfnAI');
            try {
                const response = await axios.post('http://localhost:8000/v1/membership/payment', formData, {
                    withCredentials: true,
                });
                const { sessionId } = response.data;
                const result = await stripe.redirectToCheckout({ sessionId });
                if (result.error) {
                    console.error(result.error.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }

        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name) {
            errors.name = "Name is required";
        }
        if (!formData.address) {
            errors.address = "Address is required";
        }
        if (!formData.phone) {
            errors.phone = "Phone is required";
        } else if (!/^\d{10}$/.test(formData.phone)) {
            errors.phone = "Phone number must be 10 digits";
        }
        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
        }

        if (!formData.position) {
            errors.position = "Position is required";
        }

        if (!formData.referralCode) {
            errors.referralCode = "Referral Code is required";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (
        <Container style={{ paddingTop: '50px' }}>
            <Card style={{ maxWidth: '575px', margin: 'auto' }}>
                <CardContent>
                    <Typography variant="h4" align="center" gutterBottom>
                        Add Member
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    margin="normal"
                                    size="small"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    error={errors.name}
                                    helperText={errors.name}
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="Referral Code"
                                    name="referralCode"
                                    margin="normal"
                                    size="small"
                                    text="text"
                                    value={formData.referralCode}
                                    onChange={handleInputChange}
                                    error={errors.referralCode}
                                    helperText={errors.referralCode}
                                    required
                                />
                                <FormControl fullWidth margin="normal">
                                    <Select
                                        name="position"
                                        size="small"
                                        value={formData.position}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="left">Left</MenuItem>
                                        <MenuItem value="right">Right</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    fullWidth
                                    label="Phone"
                                    name="phone"
                                    margin="normal"
                                    size="small"
                                    type="number"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    error={errors.phone}
                                    helperText={errors.phone}
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    margin="normal"
                                    size="small"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    error={errors.email}
                                    helperText={errors.email}
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="Address"
                                    name="address"
                                    margin="normal"
                                    size="small"
                                    type="text"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    error={errors.address}
                                    helperText={errors.address}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <Button type="submit" variant="contained" color="primary">
                                    Add Member
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};

export default MembershipForm;
