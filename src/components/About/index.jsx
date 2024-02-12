import React from 'react';
import { Typography, Grid, Button } from '@mui/material';

const About = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <img
          src="about.jpg"
          alt="Welcome to eLEARNING"
          width={500}
          height={300}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" gutterBottom>
          Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam
          amet diam et eos. Clita erat ipsum et lorem et sit. Tempor erat elitr rebum at clita.
          Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
          sed stet lorem sit clita duo justo magna dolore erat amet
        </Typography>
        <Typography variant="h5" gutterBottom>
          Our Advantages
        </Typography>
        <ul>
          <li>
            <Button href="#" variant="text">
              Skilled Instructors
            </Button>
          </li>
          <li>
            <Button href="#" variant="text">
              International Certificate
            </Button>
          </li>
          <li>
            <Button href="#" variant="text">
              Online Classes
            </Button>
          </li>
        </ul>
        <Button href="#" variant="outlined">
          Read More
        </Button>
      </Grid>
    </Grid>
  );
};

export default About;