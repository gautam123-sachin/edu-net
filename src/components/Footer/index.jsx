import React from 'react';
import { Typography, Container, Grid, Button, IconButton, Divider, TextField } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import RoomIcon from '@mui/icons-material/Room';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Footer = () => {
  return (
    <div className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s" style={{ visibility: 'visible', animationDelay: '0.1s', animationName: 'fadeIn' }}>
      <Container>
        <Grid container spacing={5}>
          <Grid item xs={12} md={3}>
            <Typography variant="h4" className="text-white mb-3">Quick Links</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', cursor:'pointer'}}>
              <span className="btn-link"><ChevronRightIcon /> About Us</span>
              <span className="btn-link"><ChevronRightIcon /> Contact Us</span>
              <span className="btn-link"><ChevronRightIcon /> Privacy Policy</span>
              <span className="btn-link"><ChevronRightIcon /> Terms & Conditions</span>
              <span className="btn-link"><ChevronRightIcon /> FAQs & Help</span>
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h4" className="text-white mb-3">Contact</Typography>
            <Typography variant="body1" className="mb-2"><RoomIcon className="me-3" color="primary" />123 Street, New York, USA</Typography>
            <Typography variant="body1" className="mb-2"><PhoneIcon className="me-3" color="primary" />+012 345 67890</Typography>
            <Typography variant="body1" className="mb-2"><EmailIcon className='me-3' color="primary" />info@example.com</Typography>
            <div className="d-flex pt-2">
              <IconButton className="btn-outline-light btn-social"><TwitterIcon color="primary" /></IconButton>
              <IconButton className="btn-outline-light btn-social"><FacebookIcon color="primary" /></IconButton>
              <IconButton className="btn-outline-light btn-social"><YouTubeIcon color="primary" /></IconButton>
              <IconButton className="btn-outline-light btn-social"><LinkedInIcon color="primary" /></IconButton>
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h4" className="text-white mb-3">Gallery</Typography>
            <Grid container spacing={2}>
              {[1, 2, 3].map((index) => (
                <Grid item xs={4} key={index}>
                  <img className="img-fluid bg-light p-1" src={`course-${index}.jpg`} alt={`Course ${index}`} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h4" className="text-white mb-3">Newsletter</Typography>
            <Typography variant="body1">Subscribe to our newsletter for updates!</Typography>
            <div className="position-relative mx-auto" style={{ maxWidth: '400px', marginTop: '10px' }}>
              <TextField
                type="text"
                placeholder="Your email"
                size="small"
                sx={{ color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.1)', '& .MuiInputBase-input': { color: 'white' } }}
              />
              <Button variant="contained" color="primary" size='medium' sx={{width: '100px'}} className="py-2 position-absolute top-0">Sign Up</Button>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Divider color="white" />
      <Container>
        <div className="copyright">
          <Grid container>
            <Grid item xs={12} md={6} sx={{ display: 'flex', marginTop: '10px'}} className="text-center text-md-start mb-3 mb-md-0">
              <Typography variant="body2">&copy; Edu-Net.com, All Rights Reserved.</Typography>
              <Typography variant="body2">Designed By WebMobi Solutions</Typography>
            </Grid>
            <Grid item xs={12} md={6} className="text-center text-md-end">
              <div className="footer-menu">
                <Button variant="text">Home</Button>
                <Button variant="text">Cookies</Button>
                <Button variant="text">Help</Button>
                <Button variant="text">FAQs</Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
