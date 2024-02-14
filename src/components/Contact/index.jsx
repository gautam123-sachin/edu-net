import React from 'react';
import { Box, Typography, Container } from '@mui/material';

import '../About/style.css';

import ContactForAnyQuery from './ContactForAnyQuery.jsx';

const Contact = () => {
    return(
       <>
         <Box className="container-fluid bg-primary py-5 mb-5 page-header">
                <Container>
                    <Box className="row justify-content-center">
                        <Box className="col-lg-10 text-center" sx={{ marginTop: '50px' }}>
                            <Typography variant="h3" component="h3" className="display-3 text-white animated slideInDown">Contact Us</Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>
            <ContactForAnyQuery />
       </>
    )
}
export default Contact;