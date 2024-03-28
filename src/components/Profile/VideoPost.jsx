import React, { useState, useEffect } from 'react';
import {
    Grid,
    Card,
    Box,
    CardContent,
    Typography,
    Divider,
    useTheme,
    useMediaQuery
} from '@mui/material';
import Rating from '@mui/material/Rating';
import { truncateText } from '../../Helper';

const VideoPost = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [topCourses, setTopCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data from API and set top courses
        fetchTopCourses();
    }, []);

    const fetchTopCourses = async () => {
        try {
            // Make API request to get courses data
            const response = await fetch('http://localhost:5000/courses');
            const data = await response.json();
            // Filter top-rated courses (adjust rating threshold as needed)
            const topRatedCourses = data.filter(course => course.rating >= 4.5);

            // Filter top-reviewed courses (adjust review count threshold as needed)
            const topReviewedCourses = data.filter(course => course.reviews >= 100);

            // Find intersection of top-rated and top-reviewed courses
            const topCourses = topRatedCourses.filter(course => topReviewedCourses.includes(course));

            setTopCourses(topCourses);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching top courses:', error);
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? (
                <Typography>Loading...</Typography>
            ) : topCourses.length === 0 ? (
                <Typography>No top-rated and reviewed courses available.</Typography>
            ) : (
                <Grid container spacing={isMobile ? 2 : 4}>
                    {topCourses.map((course, index) => (
                        <Grid key={index} item xs={12} sx={isMobile ? {} : { paddingRight: '30px' }}>
                            <Card
                                elevation={3}
                                sx={{
                                    marginTop: '20px',
                                    backgroundColor: '#f5f5f5',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <CardContent>
                                    <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        {course.title && <Typography gutterBottom variant="body1">{truncateText(course.title, 40)}</Typography>}
                                    </Box>
                                    <Divider style={{ fontWeight: 'bold', borderColor: '#030404' }} />
                                    <Box mt={2} mb={2}>
                                        {course.thumbnailUrl && <img src={course.thumbnailUrl} alt={course.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />}
                                    </Box>
                                    <Box mb={2}>
                                        {course.teacher && <Typography gutterBottom variant="subtitle1">Teacher: {course.teacher}</Typography>}
                                        {course.categories && <Typography gutterBottom variant="subtitle1">Categories: {course.categories}</Typography>}
                                        {course.reviews && <Typography gutterBottom variant="subtitle1">Reviews: {course.reviews}</Typography>}
                                        {course.rating && <Rating name={`rating-${index}`} value={course.rating} readOnly />}
                                    </Box>
                                    <Divider style={{ fontWeight: 'bold', borderColor: '#030404' }} />
                                    <Box mt={2}>
                                        {course.description && <Typography variant="body2" color="textSecondary">{truncateText(course.description, 100)}</Typography>}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
};

export default VideoPost;
