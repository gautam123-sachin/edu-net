import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import './style.css';

import { signup } from '../../redux/reducers/authReducer';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone_no: '',
        password: '',
        referral_code: '',
    });
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        document.body.classList.add('signup-bg');
        return () => {
            document.body.classList.remove('signup-bg');
        };
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateFormData = () => {
        const errors = {};
        if (!formData.firstname.trim()) {
            errors.firstname = "First Name is required";
        }
        if (!formData.lastname.trim()) {
            errors.lastname = "Last Name is required";
        }
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }
        if (!formData.phone_no.trim()) {
            errors.phone_no = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phone_no)) {
            errors.phone_no = 'Phone number is invalid. Please enter a 10-digit number without spaces or special characters.';
        }
        if (!formData.password.trim()) {
            errors.password = "Password is required";
        }
        if (!formData.referral_code.trim()) {
            errors.referral_code = "Referral code is required";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const handleSignup = async () => {
        if (validateFormData()) {
            setLoading(true);
            try {
                const response = await axios.post('http://localhost:8000/v1/signup', formData);
                console.log("response", response);
                if (response.status === 200) {

                    setOpenSnackbar(true);
                    dispatch(signup(response.data));
                    setSnackbarSeverity('success');
                    setSnackbarMessage(response.data.message);
                    // navigate('/membership');
                    setTimeout(() => {
                        navigate('/otp');
                    }, 200)
                    setFormData({
                        firstname: '',
                        lastname: '',
                        email: '',
                        phone_no: '',
                        password: '',
                        referral_code: '',
                    })
                }
            } catch (error) {
                console.log('error?.response?.data?.error', error);
                setOpenSnackbar(true);
                setSnackbarSeverity('error');
                setSnackbarMessage(error?.response?.data?.error || 'An error occurred'); // Providing a fallback message if data.error is not available
                setFormData({
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: '',
                });
            } finally {
                setLoading(false);
            }

        }
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div className="sign-container mt-3">
            <div className="sign-header mt-5 p-2">
                <h2>Signup</h2>
            </div>
            <div className="sign-form">
                <label htmlFor="firstname">First Name:</label>
                <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleInputChange}
                    placeholder="Enter your First Name"
                    maxLength={50} // Set maximum length
                />
                {formErrors.firstname && <p className="error">{formErrors.firstname}</p>}

                <label htmlFor="lastname">Last Name:</label>
                <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    placeholder="Enter your Last Name"
                    maxLength={50} // Set maximum length
                />
                {formErrors.lastname && <p className="error">{formErrors.lastname}</p>}

                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your Email"
                    maxLength={100} // Set maximum length
                />
                {formErrors.email && <p className="error">{formErrors.email}</p>}

                <label htmlFor="phone_no">Phone No.</label>
                <input
                    type="text"
                    id="phone_no"
                    name="phone_no"
                    value={formData.phone_no}
                    onChange={handleInputChange}
                    placeholder="Enter your phone"
                    maxLength={13}
                />
                {formErrors.phone_no && <p className="error">{formErrors.phone_no}</p>}

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.Aw}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    maxLength={20} // Set maximum length
                />
                {formErrors.password && <p className="error">{formErrors.password}</p>}
                <label htmlFor="referral_code">Referral Code</label>
                <input
                    type="referral_code"
                    id="referral_code"
                    name="referral_code"
                    value={formData.referral_code}
                    onChange={handleInputChange}
                    placeholder="Enter your referral codes"
                    maxLength={10} // Set maximum length
                />
                {formErrors.referral_code && <p className="error">{formErrors.referral_code}</p>}
                <button type="submit" className={`signup-button ${loading ? 'loading' : ''}`} disabled={loading} onClick={handleSignup}>
                    {loading ? 'Signing up...' : 'Signup'}
                </button>
            </div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleCloseSnackbar}
                    severity={snackbarSeverity}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    );
}

export default Signup;
