import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Snackbar } from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import MuiAlert from '@mui/material/Alert';

import { login } from '../../redux/reducers/authReducer';

import './style.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');


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
            setLoading(true);
            try {
                const response = await axios.post(`http://localhost:8000/v1/login`, formData, {
                    withCredentials: true,
                })
                  if(response.status === 200){
                    setOpenSnackbar(true);
                    dispatch(login(response.data));
                    setSnackbarSeverity('success');
                    setSnackbarMessage(response.data.message);
                    setTimeout(() => {
                        navigate('/dashboard'); 
                    }, 200);
                    setFormData({
                        email: '',
                        password: '',
                    })
                } 
            } catch (error) {
                console.log('error', error);
                setOpenSnackbar(true);
                setSnackbarSeverity('error');
                setSnackbarMessage(error.response.data.error);
                setFormData({
                    email: '',
                    password: '',
                });
            } finally {
                setLoading(false); // Stop loading
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

                <button type="submit" onClick={handleLogin}>{loading ? <SyncIcon size={24} /> : 'Login'}</button>

                <div className="additional-option">
                    <span>Don't have an account? <Link to="/signup">Signup</Link></span>
                </div>
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

export default Login;
