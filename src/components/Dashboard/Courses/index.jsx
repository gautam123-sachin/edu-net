import React, { useState, useEffect } from 'react';
import {
    Grid,
    Card,
    Typography,
    CardContent,
    Divider,
    Box,
    Button,
    Pagination,
    Snackbar,
    useTheme,
    IconButton,
    Menu,
    MenuItem,
    useMediaQuery,
} from '@mui/material';
import Rating from '@mui/material/Rating';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link, useNavigate } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import { truncateText } from '../../../Helper';
// import AllCourse from '../AllCourse/index.jsx';

const Courses = ({ user }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [page, setPage] = useState(1);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [activeTab, setActiveTab] = useState('AllCourses');

    const coursesPerPage = 6;

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:8000/v1/courses-list`);
                if (!response.ok) {
                    throw new Error('Failed to fetch courses');
                }
                const data = await response.json();
                console.log('data', data);
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setSnackbarOpen(true);
                setSnackbarSeverity('error');
                setSnackbarMessage('Failed to fetch courses. Please try again.');
            }
            setLoading(false);
        };

        fetchCourses();
    }, []);

    const handleMenuOpen = (event, courseId) => {
        setAnchorEl(event.currentTarget);
        setSelectedCourseId(courseId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedCourseId(null);
    };

    const handleDeleteCourse = async () => {
        try {
            const response = await fetch(`http://localhost:5000/courses/${selectedCourseId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete course');
            }

            setCourses(prevCourses => prevCourses.filter(course => course._id !== selectedCourseId));

            setSnackbarOpen(true);
            setSnackbarSeverity('success');
            setSnackbarMessage('Course deleted successfully');
        } catch (error) {
            console.error('Error deleting course:', error);
            setSnackbarOpen(true);
            setSnackbarSeverity('error');
            setSnackbarMessage('Failed to delete course. Please try again.');
        } finally {
            handleMenuClose();
        }
    };

    const handleEditCourse = () => {
        navigate(`/dashboard/edit-course/${selectedCourseId}`);
        handleMenuClose();
    }

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

console.log('courses', courses);
    const getFilteredCourses = () => {
        switch (activeTab) {
            case 'AllCourses':
                return courses;
            case 'uploaded':
                return courses;
            default:
                return courses;
        }
    };

    const filteredCourses = getFilteredCourses();
    console.log('filteredCourses', filteredCourses.courses);
    const startIndex = (page - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    const paginatedCourses = Array.isArray(filteredCourses.courses) ? filteredCourses.courses.slice(startIndex, endIndex) : [];
console.log('paginatedCourses', paginatedCourses);
    return (
        <main style={isMobile ? {} : { width: '1064px' }}>
            <Box py={4} px={2} maxWidth="lg" margin="auto">
                <Box display="flex" alignItems="center" mb={2}>
                    <Typography variant="h4" component="h4" mr={1}>Courses</Typography>
                    <div style={{ marginLeft: 'auto' }}>
                        <Button variant="contained" color="primary" onClick={() => navigate('/dashboard/create-course')}>Add Course</Button>
                    </div>
                </Box>
                <Divider style={{ fontWeight: 'bold', borderColor: '#030404' }} />
                <Box mt={2} mb={2}>
                    <Typography
                        variant="button"
                        onClick={() => handleTabChange('AllCourses')}
                        style={{ marginLeft: '10px', fontWeight: 'bold', cursor: 'pointer', color: activeTab === 'AllCourses' ? '#06BBCC' : '#000' }}
                    >
                        All Courses
                    </Typography>
                    <Typography
                        variant="button"
                        onClick={() => handleTabChange('uploaded')}
                        style={{ marginLeft: '10px', fontWeight: 'bold', cursor: 'pointer', color: activeTab === 'uploaded' ? '#06BBCC' : '#000' }}
                    >
                        Uploaded
                    </Typography>
                </Box>
                <Divider style={{ fontWeight: 'bold', borderColor: '#030404' }} />
                {loading ? (
                    <Typography>Loading...</Typography>
                ) : courses.length === 0 ? (
                    <Typography>No courses available.</Typography>
                ) : (
                    <Grid container spacing={2}>
                        {paginatedCourses.map((course, index) => (
                            <Grid key={index} item xs={12} md={6} lg={4} sx={{ marginTop: '40px' }}>
                                <Card
                                    sx={{
                                        backgroundColor: '#f5f5f5',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',

                                    }}
                                >
                                    <CardContent>
                                        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            {course.title ? <Typography gutterBottom variant="body1">{truncateText(course.title, 40)}</Typography> : ''}
                                            {activeTab === 'AllCourses' ? null : (
                                                <>
                                                    <IconButton onClick={(event) => handleMenuOpen(event, course.id)}>
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                    <Menu
                                                        anchorEl={anchorEl}
                                                        open={Boolean(anchorEl && selectedCourseId === course.id)}
                                                        onClose={handleMenuClose}
                                                    >
                                                        <MenuItem onClick={handleDeleteCourse}>Delete</MenuItem>
                                                        <MenuItem onClick={handleEditCourse}>Edit</MenuItem>
                                                    </Menu>
                                                </>
                                            )}

                                        </Box>
                                        <Divider style={{ fontWeight: 'bold', borderColor: '#030404' }} />
                                        <Box mt={2} mb={2}>
                                            {course.thumbnailUrl ? <img src={course.thumbnailUrl} alt={course.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} /> : ''}
                                        </Box>
                                        <Box mb={2}>
                                            {course.teacher ? <Typography gutterBottom variant="subtitle1">Teacher: {course.teacher}</Typography> : ''}
                                            {course.categories ? <Typography gutterBottom variant="subtitle1">Categories: {course.categories}</Typography> : ''}
                                            {course.reviews ? <Typography gutterBottom variant="subtitle1">Reviews: {course.reviews}</Typography> : ''}
                                            {course.rating ? <Rating name={`rating-${index}`} value={course.rating} readOnly /> : ''}
                                        </Box>
                                        <Divider style={{ fontWeight: 'bold', borderColor: '#030404' }} />
                                        <Box mt={2}>
                                            {course.description ? <Typography variant="body2" color="textSecondary">{truncateText(course.description, 100)}</Typography> : ''}
                                        </Box>
                                    </CardContent>
                                    <Box mt="auto" p={2}>
                                        <Box display="flex" justifyContent="center" alignItems="center">
                                            <Button component={Link} to={`/dashboard/courses-details/${course._id}`} variant="contained" color="primary" size="small" className="radius-xl">View Course</Button>
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
            <Box mt={4} display="flex" justifyContent="center">
                <Pagination count={Math.ceil(filteredCourses.length / coursesPerPage)} page={page} onChange={handleChangePage} color="primary" />
            </Box>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </main>
    );
};

export default Courses;