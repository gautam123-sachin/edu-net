import React from 'react';
import { Grid, Typography, Card, CardContent, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import { staticInstructors } from '../../Helper.jsx';

const InstructorItem = ({ id, imageSrc, name, designation, socialMediaLinks }) => {
  return (
    <Grid item xs={12} sm={6} md={3} className="wow fadeInUp" data-wow-delay="0.1s">
      <Card
        className="team-item bg-light"
        sx={{
          transition: '0.3s',
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          },
        }}
      >
        <div className="overflow-hidden">
          <img src={imageSrc} alt="" className="img-fluid" />
        </div>
        <div className="position-relative d-flex justify-content-center" style={{ marginTop: '-23px' }}>
          <div className="bg-light d-flex justify-content-center pt-2 px-1">
            {socialMediaLinks.map((link, index) => (
              <IconButton color="primary" className="btn-sm-square mx-1" key={index} href={link} target="_blank">
                {index === 0 ? <Facebook /> : index === 1 ? <Twitter /> : <Instagram />}
              </IconButton>
            ))}
          </div>
        </div>
        <CardContent className="text-center p-4">
          <Typography variant="h5" className="mb-0">{name}</Typography>
          <Typography variant="subtitle2">{designation}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

const ExpertInstructors = () => {
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <Typography variant="h6" className="section-title bg-white text-center text-primary px-3">Instructors</Typography>
          <Typography variant="h3" className="mb-5">Expert Instructors</Typography>
        </div>
        <Grid container spacing={4}>
          {staticInstructors.map(instructor => (
            <InstructorItem
              key={instructor.id}
              id={instructor.id}
              imageSrc={instructor.imageSrc}
              name={instructor.name}
              designation={instructor.designation}
              socialMediaLinks={instructor.socialMediaLinks}
            />
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default ExpertInstructors;

