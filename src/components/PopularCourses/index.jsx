import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Grid, Typography, Card, CardContent, Button } from '@mui/material';
import { Rating } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ScheduleIcon from '@mui/icons-material/Schedule';
import GroupIcon from '@mui/icons-material/Group';

import { courses } from '../../Helper.jsx';

const PopularCourses = () => {
  const navigate = useNavigate();

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <Typography variant="h6" className="section-title bg-white text-center text-primary px-3">Courses</Typography>
          <Typography variant="h3" className="mb-5">Popular Courses</Typography>
        </div>
        <Grid container spacing={4} justifyContent="center">
          {courses.map(course => (
            <Grid item xs={12} sm={6} md={4} key={course.id} className="wow fadeInUp" data-wow-delay="0.1s">
              <Card
                className="course-item bg-light"
                sx={{
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div className="position-relative overflow-hidden" style={{ flex: 1 }}>
                  <img src={course.imageSrc} alt={course.title} className="img-fluid" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                  <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                    <Button
                      variant="contained"
                      color="primary"
                      className="flex-shrink-0 btn-sm px-3 border-end"
                      sx={{
                        borderRadius: '30px 0 0 30px'
                      }}
                      onClick={() => navigate('/login')} // Corrected function name
                    >
                      Read More
                    </Button>
                    <Button 
                     variant="contained"
                      color="primary" 
                      className="flex-shrink-0 btn-sm px-3"
                       sx={{ 
                        borderRadius: '0 30px 30px 0'
                       }}
                       onClick={() => navigate('/login')} // Corrected function name
                       >
                        Join Now
                        </Button>
                  </div>
                </div>
                <CardContent className="text-center p-4 pb-0" style={{ flex: 1 }}>
                  <Typography variant="h5" className="mb-0">Free</Typography>
                  <div className="mb-3">
                    <Rating value={course.rating} readOnly max={5} />
                  </div>
                  <Typography variant="h5" className="mb-4">{course.title}</Typography>
                </CardContent>
                <div className="d-flex border-top">
                  <Typography variant="body2" className="flex-fill text-center border-end py-2"><PersonIcon color="primary" sx={{ fontSize: 18, marginRight: 1 }} />{course.instructor}</Typography>
                  <Typography variant="body2" className="flex-fill text-center border-end py-2"><ScheduleIcon color="primary" sx={{ fontSize: 18, marginRight: 1 }} />{course.duration}</Typography>
                  <Typography variant="body2" className="flex-fill text-center py-2"><GroupIcon color="primary" sx={{ fontSize: 18, marginRight: 1 }} />{course.studentCount} Students</Typography>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default PopularCourses;
