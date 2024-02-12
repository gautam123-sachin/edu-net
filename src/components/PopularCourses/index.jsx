import React, { useState } from 'react';
import { Grid, Typography, Card, CardContent, Button } from '@mui/material';
import { Rating } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ScheduleIcon from '@mui/icons-material/Schedule';
import GroupIcon from '@mui/icons-material/Group';

const PopularCourseItem = ({ imageSrc, price, rating, title, instructor, duration, studentCount }) => {
  const [hovered, setHovered] = useState(false);
console.log(hovered);
  return (
    <Grid item xs={12} sm={6} md={4} className="wow fadeInUp" data-wow-delay="0.1s">
      <Card
        className="course-item bg-light"
        sx={{
          transition: '0.3s',
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          },
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="position-relative overflow-hidden">
          <img src={imageSrc} alt="" className="img-fluid" />
          <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
            <Button variant="contained" color="primary" className="flex-shrink-0 btn-sm px-3 border-end" sx={{ borderRadius: '30px 0 0 30px' }}>Read More</Button>
            <Button variant="contained" color="primary" className="flex-shrink-0 btn-sm px-3" sx={{ borderRadius: '0 30px 30px 0' }}>Join Now</Button>
          </div>
        </div>
        <CardContent className="text-center p-4 pb-0">
          <Typography variant="h5" className="mb-0">${price}</Typography>
          <div className="mb-3">
            <Rating value={rating} readOnly max={5} />
          </div>
          <Typography variant="h5" className="mb-4">{title}</Typography>
        </CardContent>
        <div className="d-flex border-top">
          <Typography variant="body2" className="flex-fill text-center border-end py-2"><PersonIcon color="primary" sx={{ fontSize: 18, marginRight: 1 }} />{instructor}</Typography>
          <Typography variant="body2" className="flex-fill text-center border-end py-2"><ScheduleIcon color="primary" sx={{ fontSize: 18, marginRight: 1 }} />{duration}</Typography>
          <Typography variant="body2" className="flex-fill text-center py-2"><GroupIcon color="primary" sx={{ fontSize: 18, marginRight: 1 }} />{studentCount} Students</Typography>
        </div>
      </Card>
    </Grid>
  );
};

const PopularCourses = () => {
    return (
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <Typography variant="h6" className="section-title bg-white text-center text-primary px-3">Courses</Typography>
            <Typography variant="h3" className="mb-5">Popular Courses</Typography>
          </div>
          <Grid container spacing={4} justifyContent="center">
            <PopularCourseItem imageSrc="course-1.jpg" price="149.00" rating={4.5} title="Web Design & Development Course for Beginners" instructor="John Doe" duration="1.49 Hrs" studentCount={30} />
            <PopularCourseItem imageSrc="course-2.jpg" price="149.00" rating={3.8} title="Web Design & Development Course for Beginners" instructor="John Doe" duration="1.49 Hrs" studentCount={30} />
            <PopularCourseItem imageSrc="course-3.jpg" price="149.00" rating={4.2} title="Web Design & Development Course for Beginners" instructor="John Doe" duration="1.49 Hrs" studentCount={30} />
          </Grid>
        </div>
      </div>
    );
};

export default PopularCourses;
