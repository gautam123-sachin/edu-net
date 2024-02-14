import React from 'react';
import { Box, Typography, Container } from '@mui/material';

import './style.css';

import ExpertInstructors from '../ExpertInstructors/index.jsx';
import WelcomeToElearning from '../WelcomeToElearning/index.jsx';
import SkilledInstructorsSection from '../SkilledInstructorsSection/index.jsx';

function About() {
    return (
        <>
            <Box className="container-fluid bg-primary py-5 mb-5 page-header">
                <Container>
                    <Box className="row justify-content-center">
                        <Box className="col-lg-10 text-center" sx={{ marginTop: '50px' }}>
                            <Typography variant="h3" component="h3" className="display-3 text-white animated slideInDown">About Us</Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>
            <SkilledInstructorsSection />
            <WelcomeToElearning />
            <ExpertInstructors />
        </>
    );
}

export default About;
