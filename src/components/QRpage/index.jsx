import React, { useState } from 'react';
import { Grid, Box, Button, TextField } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { data } from 'jquery';

const QRpage = () => {
  const [transactionId, setTransactionId] = useState('');
  const navigate = useNavigate();
  const {state} = useLocation();
  const user = state?.user;

  const handleTransactionIdChange = (event) => {
    const value = event.target.value;
    setTransactionId(value);
  };

  console.log(user)

  const handlePaymentDoneButtonClick =async () => {
    const data = {
      payloadId: user?._id,
      transactionId: transactionId,
      username: user?.firstname,
      phoneNo: user?.phone_no
    }
    try {
      if (transactionId) {
        const response = await axios.post('http://localhost:8000/v1/payments', data);
        if (response?.status === 200) {
          console.log(response)
          navigate("/success");
        }
      }
    } catch (error) {
      
    }
  }

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box sx={{ textAlign: 'center' }}>
          <img src="/QR_code.jpeg" alt="QR Code" style={{ maxWidth: '100%', height: 'auto' }} />
        </Box>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'center', mt: 1 }}>
        <TextField
          label="Transaction ID"
          variant="outlined"
          value={transactionId}
          onChange={handleTransactionIdChange}
        />
        {/* Uncomment the Link component and wrap the Button if you want to navigate to a success page */}
        {/* <Link to="/success" style={{ textDecoration: 'none' }}> */}
          <Button
            sx={{m:1}}
            variant="contained"
            color="primary"
            disabled={!transactionId}
            onClick={handlePaymentDoneButtonClick}
          >
            Payment Done
          </Button>
        {/* </Link> */}
      </Grid>
    </Grid>
  );
};

export default QRpage;
