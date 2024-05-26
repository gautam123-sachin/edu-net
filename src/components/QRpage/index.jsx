import React, { useEffect } from 'react';
import { Grid, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const QRpage = () => {
  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box sx={{ textAlign: 'center' }}>
          <img src="/QR_code.jpeg" alt="QR Code" style={{ maxWidth: '100%', height: 'auto' }} />
        </Box>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
        <Link to={"/success"} variant="contained" color="primary">Payment Done</Link>
      </Grid>
    </Grid>
  );
}

export default QRpage;
