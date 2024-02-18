import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Snackbar } from '@mui/material';

import { login } from '../../redux/reducers/authReducer';

import './style.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        document.body.classList.add('login-bg');
        return () => {
            document.body.classList.remove('login-bg');
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

    const handleLogin = async () => {
        if (validateFormData()) {
            try {
                const response = await axios.get('https://my-json-server.typicode.com/gautam123-sachin/edunet/users?email=${formData.email}&password=${formData.password}');
                // const response = await axios.get(`http://localhost:5000/users?email=${formData.email}&password=${formData.password}`);
                if (response.data.length === 1) {
                    // Login successful
                    dispatch(login(response.data[0]));
                    setOpenSnackbar(true);
                    setSnackbarMessage('Login successful');
                    navigate('/dashboard'); // Navigate to Dashboard
                } else {
                    // Login failed
                    setOpenSnackbar(true);
                    setSnackbarMessage('Invalid email or password');
                }
            } catch (error) {
                console.error('Login error:', error);
                setOpenSnackbar(true);
                setSnackbarMessage('Login failed. Please try again.');
            }
        }
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div className="login-container">
            <div className="login-header">
                <h2>Login</h2>
            </div>
            <div className="login-form">
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your Email"
                    maxLength={50}
                />
                {formErrors.email && <span className="error">{formErrors.email}</span>}
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    maxLength={50}
                />
                {formErrors.password && <span className="error">{formErrors.password}</span>}

                <label htmlFor="forgot-password"><Link to="/forgot-password">Forgot Password?</Link></label>

                <button type="submit" onClick={handleLogin}>Login</button>

                <div className="additional-option">
                    <span>Don't have an account? <Link to="/signup">Signup</Link></span>
                </div>
            </div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
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

export default Login;
