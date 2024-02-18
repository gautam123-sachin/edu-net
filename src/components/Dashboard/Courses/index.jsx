import React, { useState } from 'react';
import {
    Grid,
    Card,
    Typography,
    CardContent,
    Divider,
    Box,
    useTheme,
    useMediaQuery,
    Button,
    Pagination
} from '@mui/material';
import Rating from '@mui/material/Rating';
import VideoCreate from '../../Profile/VideoCreate';
import Courses1 from '../../../assets/Courses.png';

const Courses = ({ user }) => {
    console.log(user);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [hovered, setHovered] = useState(false);

    // Sample data for courses
    const courses = [
        {
            title: "Become a PHP Master and Make Money",
            image: Courses1,
            teacher: "Keny White",
            categories: ["Backend"],
            reviews: 3,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            rating: 3
        },
        // Add more courses here
    ];

    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('uploaded');
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    const handleAddCourse = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const coursesPerPage = 6;

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleEnroll = (courseId) => {
        // Implement your logic to enroll in a course
    };
    
    const isEnrolled = (courseId) => {
        // Implement your logic to check if the course is enrolled
    };

    const getFilteredCourses = () => {
        switch (activeTab) {
            case 'enrolled':
                return courses.filter(course => isEnrolled(course.id));
            case 'uploaded':
                // Implement your logic to fetch uploaded courses
                return courses;
            default:
                return courses;
        }
    };

    const filteredCourses = getFilteredCourses();
    const startIndex = (page - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    const paginatedCourses = filteredCourses.slice(startIndex, endIndex);



    return (
        <main>
            <Box py={4} px={2} maxWidth="lg" margin="auto">
                <Box display="flex" alignItems="center" mb={2}>
                    <Typography variant="h4" component="h4" mr={1}>Courses</Typography>
                    <div style={{ marginLeft: 'auto' }}>
                        <Button variant="contained" color="primary" onClick={handleAddCourse}>Add Course</Button>
                    </div>
                </Box>
                <Divider style={{ fontWeight: 'bold', borderColor: '#030404' }} />
                <Box mt={2} mb={2}>
                    <Button onClick={() => handleTabChange('uploaded')}>Uploaded</Button>
                    <Button onClick={() => handleTabChange('enrolled')}>Enroll</Button>
                </Box>
                <Divider style={{ fontWeight: 'bold', borderColor: '#030404' }} />
                <Grid container spacing={2}>
                    {paginatedCourses.map((course, index) => (
                        <Grid key={index} item xs={12} md={6} lg={4} sx={{ marginTop: '40px' }}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: '0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.03)',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    },
                                }}
                                onMouseEnter={() => setHovered(true)}
                                onMouseLeave={() => setHovered(false)}
                            >
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">{course.title}</Typography>
                                    <Divider style={{ fontWeight: 'bold', borderColor: '#030404' }} />
                                    <Box mt={2} mb={2}>
                                        <img src={course.image} alt="Course" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </Box>
                                    <Box mb={2}>
                                        <Typography gutterBottom variant="subtitle1">Teacher: {course.teacher}</Typography>
                                        <Typography gutterBottom variant="subtitle1">Categories: {course.categories.join(', ')}</Typography>
                                        <Typography gutterBottom variant="subtitle1">Reviews: {course.reviews}</Typography>
                                        <Rating name={`rating-${index}`} value={course.rating} readOnly />
                                    </Box>
                                    <Divider style={{ fontWeight: 'bold', borderColor: '#030404' }} />
                                    <Box mt={2}>
                                        <Typography variant="body2" color="textSecondary">{course.description}</Typography>
                                    </Box>
                                </CardContent>
                                <Box mt="auto" p={2}>
                                    <Box display="flex" justifyContent="center" alignItems="center">
                                        <Button variant="contained" color="primary" size="small" className="radius-xl">View Course</Button>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box mt={4} display="flex" justifyContent="center">
                <Pagination count={Math.ceil(filteredCourses.length / coursesPerPage)} page={page} onChange={handleChangePage} color="primary" />
            </Box>
            <VideoCreate
                open={open}
                onClose={handleClose}
                user={user}
            />
        </main>
    );
};

export default Courses;
