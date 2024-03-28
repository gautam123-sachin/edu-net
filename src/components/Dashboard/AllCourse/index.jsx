import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Divider,
    TextField,
    useTheme,
    useMediaQuery,
    Grid,
    Card,
    CardContent,
    Rating,
    Snackbar,
    Alert as MuiAlert
} from '@mui/material';
import { Link } from 'react-router-dom';
import { truncateText } from '../../../Helper.jsx';

const AllCourse = ({ user }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost:8000/v1/courses-list');
                if (!response.ok) {
                    throw new Error('Failed to fetch courses');
                }
                const data = await response.json();
                console.log('data', data);
                setCourses(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching courses:', error.message);
                setSnackbarSeverity('error');
                setSnackbarMessage('Failed to fetch courses');
                setSnackbarOpen(true);
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <main style={isMobile ? {} : { width: '1064px' }}>
                <Box py={4} px={2} maxWidth="lg" margin="auto">
                    <Box display="flex" alignItems="center" mb={2}>
                        <Typography variant="h4" component="h4" mr={1}>All Courses</Typography>
                    </Box>
                    <Divider style={{ fontWeight: 'bold', borderColor: '#030404' }} />
                    <Box mt={2} mb={2}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <TextField type="text" label="Search" size='small' />
                            <Button variant="contained" color="primary" sx={{ marginLeft: '10px' }}>Search</Button>
                        </div>
                    </Box>
                    <Divider style={{ fontWeight: 'bold', borderColor: '#030404' }} />
                    <Grid container spacing={2} sx={{ paddingLeft: '25px', paddingTop: '17px' }}>
                        {loading ? (
                            <Typography>Loading...</Typography>
                        ) : courses.length === 0 ? (
                            <Typography>No courses available.</Typography>
                        ) : (
                            courses.map((course, index) => (
                                <Grid key={index} item xs={12} md={6} lg={4}>
                                    <Card
                                        sx={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            backgroundColor: '#f5f5f5'
                                        }}
                                    >
                                        <CardContent>
                                            <Typography gutterBottom variant="body1">{truncateText(course.title, 40)}</Typography>
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
                                                {course.description && <Typography variant="body2" color="textSecondary">{truncateText(course.description, 70)}</Typography>}
                                            </Box>
                                        </CardContent>
                                        <Box mt="auto" p={2}>
                                            <Box display="flex" justifyContent="center" alignItems="center">
                                                <Button component={Link} to={`/dashboard/courses-details/${course.id}`} variant="contained" color="primary" size="small" className="radius-xl">View Course</Button>
                                            </Box>
                                        </Box>
                                    </Card>
                                </Grid>
                            ))
                        )}
                    </Grid>
                </Box>
            </main>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </>
    );
}

export default AllCourse;
