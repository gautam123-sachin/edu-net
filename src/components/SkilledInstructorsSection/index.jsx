import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SchoolIcon from '@mui/icons-material/School';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import './style.css';

const ServiceItem = ({ icon, title, description }) => {
  const iconMapping = {
    'AccountBalanceIcon': <AccountBalanceIcon fontSize="large" />,
    'SchoolIcon': <SchoolIcon fontSize="large" />,
    'HomeWorkIcon': <HomeWorkIcon fontSize="large" />,
    'LocalLibraryIcon': <LocalLibraryIcon fontSize="large" />,
  };

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card className="service-card" sx={{ boxShadow:'none', backgroundColor: '#9ad9df', }}>
        <CardContent className="card-content">
          {iconMapping[icon]}
          <Typography variant="h5" component="h2" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" textAlign={'center'}>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

const SkilledInstructorsSection = () => {
    const services = [
        { 
          icon: 'AccountBalanceIcon', 
          title: 'Skilled Instructors', 
          description: 'Learn from experienced instructors who are experts in their fields. Our instructors are dedicated to helping you succeed and reach your goals.' 
        },
        { 
          icon: 'SchoolIcon', 
          title: 'Online Classes', 
          description: 'Access our comprehensive online classes from anywhere in the world. Study at your own pace and on your own schedule, with support from our team every step of the way.' 
        },
        { 
          icon: 'HomeWorkIcon', 
          title: 'Home Projects', 
          description: 'Apply what you learn in our classes to real-world projects that you can complete from the comfort of your own home. Gain practical experience and build your portfolio.' 
        },
        { 
          icon: 'LocalLibraryIcon', 
          title: 'Book Library', 
          description: 'Explore our extensive book library, filled with resources to supplement your learning journey. From textbooks to research papers, we have everything you need to expand your knowledge.' 
        }
      ];
      
  return (
    <div className="container-xxl py-5">
      <Grid container spacing={4}>
        {services.map((service, index) => (
          <ServiceItem key={index} icon={service.icon} title={service.title} description={service.description} />
        ))}
      </Grid>
    </div>
  );
};

export default SkilledInstructorsSection;
