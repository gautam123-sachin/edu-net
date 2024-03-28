import React, { useState, useEffect } from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    TextField,
    Typography,
    useTheme,
    useMediaQuery,
    Snackbar,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import MuiAlert from '@mui/material/Alert';
import CloudUpload from '@mui/icons-material/CloudUpload';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import axios from 'axios'; // Import axios

import { Link, useNavigate, useParams } from 'react-router-dom';

import Preview from './Preview.jsx';
import { courseCategory } from '../../Helper.jsx';

const CreateCourseForm = ({ user }) => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [courseForm, setCourseForm] = useState({
        title: '',
        userId: user.user._id,
        teacherId: uuidv4(),
        teacherName: '',
        description: '',
        category: courseCategory[0].value,
        video: '',
        thumbnailUrl: '',
    });
    const [errors, setErrors] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try{
                const response = await axios.get(`http://localhost:8000/courses/${courseId}`);
                const { title, teacherName, description, category, video, thumbnailUrl } = response.data;
                setCourseForm({ title, teacherName, description, category, video, thumbnailUrl });
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        };
        if (courseId) {
            fetchCourseDetails();
        }
    }, [courseId])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCourseForm({
            ...courseForm,
            [name]: value
        });
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Read file as base64
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setCourseForm({
                    ...courseForm,
                    video: reader.result,
                });
                setErrors({
                    ...errors,
                    video: ''
                });
            };
        } else {
            setCourseForm({
                ...courseForm,
                video: '',
            });
            setErrors({
                ...errors,
                video: 'Please select a video file'
            });
        }
    }
    
    const handleFileChangeImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Read file as base64
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setCourseForm({
                    ...courseForm,
                    thumbnailUrl: reader.result,
                });
                setErrors({
                    ...errors,
                    thumbnailUrl: ''
                });
            };
        } else {
            setCourseForm({
                ...courseForm,
                thumbnailUrl: '',
            });
            setErrors({
                ...errors,
                thumbnailUrl: 'Please select a thumbnail'
            });
        }
    }    

    const validateCourseForm = () => {
        const newErrors = {};
        if (!courseForm.title.trim()) {
            newErrors.title = 'Please enter a title';
        }
        if (!courseForm.teacherName.trim()) {
            newErrors.teacherName = 'Please enter a teacher name';
        }
        if (!courseForm.description.trim()) {
            newErrors.description = 'Please enter a description';
        }
        if (!courseForm.category) {
            newErrors.category = 'Please select a category';
        }
        if (!courseForm.video) {
            newErrors.video = 'Please upload a video';
        }
        if (courseForm.video && !courseForm.thumbnailUrl) {
            newErrors.thumbnailUrl = 'Please upload a thumbnail';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleAddCourse = async () => {
        if (validateCourseForm()) {

            try {
                const response = await axios.post('http://localhost:8000/v1/add-courses', {
                    ...courseForm,
                    video: courseForm.video,
                    thumbnailUrl: courseForm.thumbnailUrl
                });

                console.log('response', response);
                if (response.status === 201) {
                    setSnackbarSeverity('success');
                    setSnackbarMessage('Course added successfully');
                    setSnackbarOpen(true);
                    navigate('/dashboard/courses');
                    setCourseForm({
                        title: '',
                        teacherName: '',
                        description: '',
                        category: courseCategory[0].value,
                        video: '',
                        thumbnailUrl: '',
                    });
                } else {
                    setSnackbarSeverity('error');
                    setSnackbarMessage(`Error: ${response.statusText}`);
                    setSnackbarOpen(true);
                    setCourseForm({
                        title: '',
                        teacherName: '',
                        description: '',
                        category: courseCategory[0].value,
                        video: '',
                        thumbnailUrl: '',
                    })
                }

            } catch (error) {
                if (error.response) {
                    if (error.response.status === 404) {
                        setSnackbarSeverity('error');
                        setSnackbarMessage('Error: Course not found');
                    } else if (error.response.status === 500) {
                        setSnackbarSeverity('error');
                        setSnackbarMessage('Error: Internal Server Error');
                    } else {
                        setSnackbarSeverity('error');
                        setSnackbarMessage(`Error: ${error.response.statusText}`);
                    }
                } else if (error.request) {
                    setSnackbarSeverity('error');
                    setSnackbarMessage('Error: No response from server');
                } else {
                    setSnackbarSeverity('error');
                    setSnackbarMessage(`Error: ${error.message}`);
                }
                setSnackbarOpen(true);
            }
        }
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };

    return (
        <>
            <Typography variant="h4" className="mb-4">Create Course</Typography>
            <div style={isMobile ? {} : { display: 'flex', gap: '15px' }}>
                <Card className="w-full max-w-lg" style={{ backgroundColor: '#f5f5f5' }}>
                    <div className="flex items-center" style={{ padding: '15px' }}>
                        <Link to="/dashboard/courses" className="text-indigo-500 hover:text-indigo-600" style={{ textDecoration: 'none' }}>
                            <ChevronLeftIcon className="w-4 h-4" />
                            Back
                        </Link>
                    </div>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id="course-title"
                                    label="Course Title"
                                    fullWidth
                                    variant="outlined"
                                    margin='normal'
                                    size='small'
                                    onChange={handleInputChange}
                                    name='title'
                                    value={courseForm.title}
                                    error={errors.title}
                                    helperText={errors.title}
                                    required
                                    autoFocus
                                    InputProps={{
                                        maxLength: 250
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="teacher-name"
                                    label="Teacher Name"
                                    fullWidth
                                    variant="outlined"
                                    margin='normal'
                                    size='small'
                                    onChange={handleInputChange}
                                    name='teacherName'
                                    value={courseForm.teacherName}
                                    error={errors.teacherName}
                                    helperText={errors.teacherName}
                                    required
                                    InputProps={{
                                        maxLength: 100
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="description"
                                    label="Description"
                                    multiline
                                    minRows={3}
                                    maxRows={5}
                                    fullWidth
                                    variant="outlined"
                                    margin='normal'
                                    size='small'
                                    onChange={handleInputChange}
                                    name='description'
                                    value={courseForm.description}
                                    error={errors.description}
                                    helperText={errors.description}
                                    required
                                    InputProps={{
                                        maxLength: 3000
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="course-category"
                                    select
                                    label="Course Category"
                                    fullWidth
                                    variant="outlined"
                                    margin='normal'
                                    size='small'
                                    onChange={handleInputChange}
                                    name='category'
                                    value={courseForm.category}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    error={errors.category}
                                    helperText={errors.category}
                                    required
                                    InputProps={{
                                        maxLength: 100
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                >
                                    {courseCategory.map((option, index) => (
                                        <option key={index} value={option.label}>{option.label}</option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <div style={{ marginTop: '20px', background: 'aquamarine', height: '100px', borderRadius: '10px', paddingTop: '20px', display: 'flex', justifyContent: 'center' }}>
                                    <label htmlFor="video-uploader-input" style={{ cursor: 'pointer' }}>
                                        <div style={{ display: 'flex', justifyContent: 'center', color: '#007bff' }}>
                                            <CloudUpload />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'center', color: '#007bff' }}>
                                            <Typography variant="body2">
                                                Browse Video
                                            </Typography>
                                        </div>
                                        <input
                                            className="hidden"
                                            name="video"
                                            type="file"
                                            accept="video/*"
                                            id="video-uploader-input"
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </div>
                                {errors.video && (
                                    <Typography variant="body2" color="error">
                                        {errors.video}
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <div style={{ marginTop: '20px', background: 'aquamarine', height: '100px', borderRadius: '10px', paddingTop: '20px', display: 'flex', justifyContent: 'center' }}>
                                    <label htmlFor="thumbnail-uploader-input" style={{ cursor: 'pointer' }}>
                                        <div style={{ display: 'flex', justifyContent: 'center', color: '#007bff' }}>
                                            <CloudUpload />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'center', color: '#007bff' }}>
                                            <Typography variant="body2">
                                                Browse Thumbnail
                                            </Typography>
                                        </div>
                                        <input
                                            className="hidden"
                                            name="thumbnail"
                                            type="file"
                                            accept="image/*"
                                            id="thumbnail-uploader-input"
                                            style={{ display: 'none' }}
                                            onChange={handleFileChangeImage}
                                        />
                                    </label>
                                </div>
                                {errors.thumbnailUrl && (
                                    <Typography variant="body2" color="error">
                                        {errors.thumbnailUrl}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions className="flex justify-content-center items-center">
                        <Button variant="contained" color="primary" onClick={handleAddCourse}>
                            Add Course
                        </Button>
                    </CardActions>

                </Card>

                <Grid container spacing={2} style={isMobile ? { marginTop: '15px' } : {}}>
                    <Grid item xs={12}>
                        <Preview
                            course={courseForm}
                        />
                    </Grid>
                </Grid>
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleCloseSnackbar}
                    severity={snackbarSeverity} // Use dynamic severity
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>

        </>
    );
}

export default CreateCourseForm;

