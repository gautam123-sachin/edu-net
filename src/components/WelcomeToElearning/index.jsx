import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { ArrowRight } from '@mui/icons-material';

const WelcomeToElearning = () => {
  return (
    <div className="container-xxl py-5">
      <Grid container spacing={5}>
        <Grid item xs={12} lg={6}>
          <img src="about.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h6" className="section-title bg-white text-start text-primary" sx={{ py: 1, px: 3 }}>About Us</Typography>
          <Typography variant="h3" gutterBottom>Edu Net with Learning with Earning</Typography>
          <Typography variant="body1" paragraph>
            Edu Net with Learning with Earning is an innovative platform that allows you to learn new skills while earning money. 
            Our mission is to provide accessible education to everyone, regardless of their background or financial status.
          </Typography>
          <Typography variant="body1" paragraph>
            With our platform, you can enroll in various online courses taught by skilled instructors, participate in interactive classes, 
            and earn rewards for your achievements. Whether you want to enhance your skills for personal development or pursue a new career path, 
            Edu Net with Learning with Earning has something for everyone.
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" display="flex" alignItems="center">
                <ArrowRight sx={{ mr: 1 }} /> Skilled Instructors
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" display="flex" alignItems="center">
                <ArrowRight sx={{ mr: 1 }} /> Online Classes
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" display="flex" alignItems="center">
                <ArrowRight sx={{ mr: 1 }} /> Interactive Learning
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" display="flex" alignItems="center">
                <ArrowRight sx={{ mr: 1 }} /> Earn Rewards
              </Typography>
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }}>Explore Courses</Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default WelcomeToElearning;
