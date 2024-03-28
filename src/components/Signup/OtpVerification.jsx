

import React, { useState } from 'react';
import {
    Grid,
    Card,
    CardContent,
    Button,
    Snackbar,
    useTheme,
    useMediaQuery
} from '@mui/material';
import axios from 'axios';
import OtpInput from 'react-otp-input'
import { useNavigate } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';


const OtpVerification = ({ user }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const rootStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    };

    const buttonStyle = {
        margin: '8px',
        width: '25ch',
    };

    console.log("user", user.user._id);

    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleOtpChange = (otp) => {
        setOtp(otp);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await axios.post('http://localhost:8000/v1/verify-otp', { otp, userId: user.user._id });
            console.log('OTP verification response:', response.data);
            setOpenSnackbar(true);
            setSnackbarSeverity('success');
            setSnackbarMessage('OTP verified successfully');
            setTimeout(() => {
                navigate('/membership');
            }, 200); 
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setOpenSnackbar(true);
            setSnackbarSeverity('error');
            setSnackbarMessage('Error verifying OTP');
        }
    };

    return (
        <>
            <Grid container specing={3} sx={isMobile ? { padding: '12px', paddingTop: "100px" } : { padding: '100px' }}>
                <Grid items xs={12}>
                    <Card className="mx-auto max-w-sm" sx={{ backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <CardContent>
                            <div style={rootStyle}>
                                <div>
                                    <h2 className="text-3xl font-bold">Verify Your Identity</h2>
                                    <p className="text-gray-500 dark:text-gray-400">Enter the OTP sent to your registered email address</p>
                                </div>
                                <div>
                                    <div style={{marginLeft:'60px'}}>
                                        <OtpInput
                                            value={otp}
                                            onChange={handleOtpChange}
                                            numInputs={6}
                                            separator={<span>-</span>}
                                            inputStyle={{ width: '2rem', height: '2rem', margin: '0 1rem' }}
                                            renderInput={(props, index) => (
                                                <input
                                                    type="text"
                                                    maxLength="1"
                                                    {...props}
                                                    key={index}
                                                    style={{ width: '2rem', height: '2rem', margin: '0 0.5rem', textAlign: 'center', fontSize: '1.2rem' }}
                                                />
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <Button variant="outlined" className="w-full" style={buttonStyle} onClick={() => setOtp('')}>
                                            Clear
                                        </Button>
                                        <Button variant="contained" color="primary" className="w-full" style={buttonStyle} onClick={handleVerifyOtp}>
                                            Verify OTP
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
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
        </>
    );
};

export default OtpVerification;
