import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Snackbar
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Preview = ({ course, openPreview, onClosePreview, handleClose }) => {
    const [posting, setPosting] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleCloseDialog = () => {
        onClosePreview();
    };

    const handlePost = async () => {
        if (!course) {
            console.error('No course data provided.');
            return;
        }

        setPosting(true);
        try {
            const formData = new FormData();
            formData.append('teacherId', course.teacherId);
            formData.append('title', course.title);
            formData.append('description', course.description);
            formData.append('teacher', course.teacher);
            formData.append('categories', JSON.stringify(course.categories));
            formData.append('videoFile', course.videoFile); // Append the videoFile here

            const response = await fetch('http://localhost:5000/courses', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Failed to post course');
            }
            // Course successfully posted
            console.log('Course posted:', course);
            setSnackbarMessage('Course posted successfully.');
            handleCloseDialog();
            handleClose(true);
        } catch (error) {
            console.error('Error posting course:', error.message);
            setSnackbarMessage('Failed to post course. Please try again.');
            setSnackbarOpen(true);
        } finally {
            setPosting(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <Dialog open={openPreview} onClose={onClosePreview}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Button onClick={handleCloseDialog} startIcon={<ArrowBackIcon />}>Back</Button>
                    <DialogTitle sx={{ marginLeft: 'auto' }}>Preview</DialogTitle>
                </div>
                <DialogContent>
                    {course ? (
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow:'none' }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">{course.title}</Typography>
                                <Divider style={{ fontWeight: 'bold', borderColor: '#030404' }} />
                                <Box mt={2} mb={2}>
                                    {course.videoFile && (
                                        <video controls style={{ width: '100%', height: 'auto', objectFit: 'cover' }}>
                                            <source src={URL.createObjectURL(course.videoFile)} type="video/mp4" />
                                        </video>
                                    )}
                                    <Box mb={2}>
                                        <Typography gutterBottom variant="subtitle1">Teacher: {course.teacher}</Typography>
                                        <Typography gutterBottom variant="subtitle1">Categories: {course.categories}</Typography>
                                    </Box>
                                    <Divider style={{ fontWeight: 'bold', borderColor: '#030404' }} />
                                    <Box mt={2}>
                                        <Typography variant="body2" color="textSecondary">{course.description}</Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    ) : (
                        <Typography variant="body1">No course data available.</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Close</Button>
                    <Button onClick={handlePost} color="primary" disabled={!course || posting}>
                        {posting ? 'Posting...' : 'Post'}
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            />
        </>
    );
};

export default Preview;
