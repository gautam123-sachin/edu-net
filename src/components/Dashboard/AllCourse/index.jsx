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
    Pagination,
    TextField
} from '@mui/material';
import Rating from '@mui/material/Rating';
import VideoCreate from '../../Profile/VideoCreate';
import Courses1 from '../../../assets/Courses.png';

const AllCourse = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Sample data for courses
    const courses = [
        {
            id: 1,
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
    const [searchTerm, setSearchTerm] = useState('');
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

    const handleEnroll = (courseId) => {
        const courseToAdd = courses.find(course => course.id === courseId);
        setEnrolledCourses([...enrolledCourses, courseToAdd]);
    };

    const isEnrolled = (courseId) => {
        return enrolledCourses.some(course => course.id === courseId);
    };

    const filteredCourses = courses.filter(course => {
        return course.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const startIndex = (page - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

    const handleSearchInput = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        setPage(1); 
    };

    return (
        <main>
            <Box py={4} px={2} maxWidth="lg" margin="auto">
                <Box display="flex" alignItems="center" mb={2}>
                    <Typography variant="h4" component="h4" mr={1}>Courses</Typography>
                    <div style={{ marginLeft: 'auto' }}>
                        <TextField type="text" label="Search" size='small' onChange={handleSearchInput} />
                        <Button variant="contained" color="primary" sx={{ marginLeft: '10px' }} onClick={handleSearch}>Search</Button>
                    </div>
                </Box>
                <Grid container spacing={2}>
                    {paginatedCourses.map((course, index) => (
                        <Grid key={index} item xs={12} md={6} lg={4}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                                        {isEnrolled(course.id) ? (
                                            <Button variant="contained" color="primary" size="small" className="radius-xl" disabled>Enrolled</Button>
                                        ) : (
                                            <Button variant="contained" color="primary" size="small" className="radius-xl" onClick={() => handleEnroll(course.id)}>Enroll Now</Button>
                                        )}
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
            />
        </main>
    );
};

export default AllCourse;
