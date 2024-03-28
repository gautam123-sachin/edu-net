import React, { useState } from 'react';
import { Grid, Typography, Button, TextField, Snackbar } from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const ContactForAnyQuery = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Perform client-side validation
    const errors = {};
    if (!formData.name) {
      errors.name = 'Name is required';
    }
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.subject) {
      errors.subject = 'Subject is required';
    }
    if (!formData.message) {
      errors.message = 'Message is required';
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Submit the form data to the API
      try {
        const response = await fetch('http://localhost:5000/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (response.ok) {
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
          });
          setSnackbarMessage('Message sent successfully');
          setSnackbarOpen(true);
        } else {
          // Handle error responses from the API
          // For example, setSubmitSuccess(false) and display an error message
          setSnackbarMessage('Failed to send message');
          setSnackbarOpen(true);
          console.error('Error:', data.message);
        }
      } catch (error) {
        setSnackbarMessage('Failed to send message');
        setSnackbarOpen(true);
        console.error('Error:', error);
        // Handle network errors
      }
    }

    setIsSubmitting(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <Typography variant="h6" className="section-title bg-white text-center text-primary px-3">Contact Us</Typography>
          <Typography variant="h3" className="mb-5">Contact For Any Query</Typography>
        </div>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} className="wow fadeInUp" data-wow-delay="0.1s">
            <div>
              <h5>Get In Touch</h5>
              <p className="mb-4">Feel free to get in touch with us for any queries or assistance.</p>
              <div className="d-flex align-items-center mb-3">
                <div className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary" style={{ width: '50px', height: '50px' }}>
                  <RoomIcon />
                </div>
                <div className="ms-3">
                  <h5 className="text-primary">Office</h5>
                  <a href="https://www.google.com/maps?q=456+Main+Road,+Ludhiana,+Punjab,+India"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: 'none',
                      color: 'black',
                    }}
                  >
                    <p className="mb-0">456 Main Road, Ludhiana, Punjab, India</p>
                  </a>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary" style={{ width: '50px', height: '50px' }}>
                  <PhoneIcon />
                </div>
                <div className="ms-3">
                  <h5 className="text-primary">Mobile</h5>
                  <p className="mb-0">
                    <a href="tel:+919888911531" style={{ textDecoration: 'none', color: 'black' }}>+91 988-891-1531</a>
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary" style={{ width: '50px', height: '50px' }}>
                  <EmailIcon />
                </div>
                <div className="ms-3">
                  <h5 className="text-primary">Email</h5>
                  <p className="mb-0">
                    <a href="mailto:oneplacetogether0@gmail.com" style={{ textDecoration: 'none', color: 'black' }}>oneplacetogether0@gmail.com</a>
                  </p>
                </div>  
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={4} className="wow fadeInUp" data-wow-delay="0.3s">
            <iframe
              title="Google Maps"
              className="position-relative rounded w-100 h-100"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd"
              frameborder="0"
              style={{ minHeight: '300px', border: '0' }}
              allowfullscreen=""
              aria-hidden="false"
              tabindex="0"
            >
            </iframe>
          </Grid>
          <Grid item xs={12} md={4} className="wow fadeInUp" data-wow-delay="0.5s">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Your Name"
                    variant="outlined"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={!!formErrors.name}
                    helperText={formErrors.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Your Email"
                    variant="outlined"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="subject"
                    name="subject"
                    label="Subject"
                    variant="outlined"
                    value={formData.subject}
                    onChange={handleInputChange}
                    error={!!formErrors.subject}
                    helperText={formErrors.subject}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    id="message"
                    name="message"
                    label="Message"
                    variant="outlined"
                    value={formData.message}
                    onChange={handleInputChange}
                    error={!!formErrors.message}
                    helperText={formErrors.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        />
      </div>
    </div>
  );
};

export default ContactForAnyQuery;
