import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Snackbar } from '@mui/material';
import './style.css'; 

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

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
        if (!formData.firstname) {
            errors.firstname = "First Name is required";
        }
        if (!formData.lastname) {
            errors.lastname = "Last Name is required";
        }
        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }
        if (!formData.password) {
            errors.password = "Password is required";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const handleSignup = async () => {
        if (validateFormData()) {
            try {
                // Check if email already exists
                const checkExistingEmailResponse = await axios.get(`http://localhost:5000/users?email=${formData.email}`);
                if (checkExistingEmailResponse.data.length > 0) {
                    setOpenSnackbar(true);
                    setSnackbarMessage('Email already exists. Please use a different email address.');
                    return;
                }

                // Proceed with signup
                const response = await axios.post('http://localhost:5000/users', formData);
                if (response) {
                    setOpenSnackbar(true);
                    setSnackbarMessage('Signup successful!');
                    navigate('/dashboard');
                    setFormData({
                        firstname: '',
                        lastname: '',
                        email: '',
                        password: '',
                    })
                    
                }
            } catch (error) {
                console.error('Signup error:', error);
                setOpenSnackbar(true);
                setSnackbarMessage('Signup failed. Please try again later.');
                setFormData({
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: '',
                })
            }
        }
    }
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false); 
    };

    return (
        <div className="sign-container">
            <div className="sign-header">
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

                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    maxLength={20} // Set maximum length
                />
                {formErrors.password && <p className="error">{formErrors.password}</p>}

                <button type="submit" onClick={handleSignup}>Signup</button>
            </div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000} // Snackbar will be automatically hidden after 6 seconds
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            />
        </div>
    );
}

export default Signup;
