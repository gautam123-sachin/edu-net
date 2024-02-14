import React, { useState, useEffect } from 'react';
import { Grid, Typography, Card, CardContent } from '@mui/material';

const CourseCategoryItem = ({ id, imageSrc, title, courseCount, onClick }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} className="wow zoomIn" key={id} onClick={() => onClick(id)}>
      <Card
        className="position-relative"
        sx={{
          height: '100%',
          transition: '0.3s',
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          },
          cursor: 'pointer',
        }}
      >
        <img src={imageSrc} alt={title} className="img-fluid" style={{ objectFit: 'cover', height: '100%' }} />
        <CardContent className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', width: '100%' }}>
          <Typography variant="h5" gutterBottom>{title}</Typography>
          <Typography variant="body2" color="primary">{courseCount} Courses</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

const CoursesCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/categories')
      .then(response => response.json())
      .then(data => {
        setCategories(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleClick = (categoryId) => {
    // Handle click event, e.g., redirect to a specific category page
    console.log('Category clicked:', categoryId);
  };

  return (
    <div className="container-xxl py-5 category">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <Typography variant="h6" className="section-title bg-white text-center text-primary px-3">Categories</Typography>
          <Typography variant="h3" className="mb-5">Courses Categories</Typography>
        </div>
        <Grid container spacing={3}>
          {categories.map(category => (
            <CourseCategoryItem
              key={category.id}
              id={category.id}
              imageSrc={category.imageSrc}
              title={category.title}
              courseCount={category.courseCount}
              onClick={handleClick}
            />
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default CoursesCategories;
