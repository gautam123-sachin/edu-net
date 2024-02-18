import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    DialogActions,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Snackbar
} from '@mui/material';
import Preview from '../../Preview';
import { CloudUpload } from '@mui/icons-material';

const VideoCreate = ({ open, onClose, user }) => {
    const generateTeacherId = () => {
        return Math.random().toString(36).substr(2, 9);
    };
    const getFullName = () => {
        if (user && user.firstname && user.lastname) {
            const { firstname, lastname } = user;
            return `${firstname} ${lastname}`;
        } else {
            return '';
        }
    };  

    const [videoForm, setVideoForm] = useState({
        teacherId: generateTeacherId(),
        title: '',
        description: '',
        teacher: getFullName(),
        categories: [],
        videoFile: null,
    });

    const [errors, setErrors] = useState({});
    const [openPreview, setOpenPreview] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleClosePreview = () => {
        setOpenPreview(false);
    };

    const validateVideoCreateForm = () => {
        const errors = {};
        if (videoForm.title.trim() === '') {
            errors.title = 'Please enter a title';
        }
        if (videoForm.description.trim() === '') {
            errors.description = 'Please enter a description';
        }
        if (videoForm.teacher.trim() === '') {
            errors.teacher = 'Please enter a teacher';
        }
        if (videoForm.categories.length === 0) {
            errors.categories = 'Please select at least one category';
        }
        if (!videoForm.videoFile) {
            errors.videoFile = 'Please upload a video file';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handlePreview = async () => {
        // Validate the input fields
        if (!validateVideoCreateForm()) {
            return;
        }

        // Open the Preview component
        setOpenPreview(true);
    };

    const handleFileChange = (e) => {
        if (e.target && e.target.files && e.target.files.length > 0) {
            // Update the corresponding file state based on the type
            const file = e.target.files[0];
            setVideoForm({
                ...videoForm,
                videoFile: file,
            });
        } else {
            setSnackbarMessage('Invalid event object or no files selected');
            setSnackbarOpen(true);
        }
    };

    const handleClose = () => {
        // Clear the input fields
        setVideoForm({
            teacherId: generateTeacherId(),
            title: '',
            description: '',
            teacher: '',
            categories: [],
            videoFile: null,
        });

        // Reset validation errors
        setErrors({});

        // Close the dialog
        onClose();
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Create Video</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        fullWidth
                        size='small'
                        value={videoForm.title}
                        onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                        error={!!errors.title}
                        helperText={errors.title}
                        inputProps={{ maxLength: 100 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        value={videoForm.description}
                        onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                        error={!!errors.description}
                        helperText={errors.description}
                        inputProps={{ maxLength: 300 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Teacher"
                        fullWidth
                        size='small'
                        name='teacher'
                        value={videoForm.teacher}
                        onChange={(e) => setVideoForm({ ...videoForm, teacher: e.target.value })}
                        error={!!errors.teacher}
                        helperText={errors.teacher}
                        inputProps={{ maxLength: 50 }}
                      
                    />

                    <FormControl fullWidth size='small' error={!!errors.categories} sx={{ marginTop: '10px' }}>
                        <InputLabel id='demo-multiple-name-label'>Categories</InputLabel>
                        <Select
                            labelId='demo-multiple-name-label'
                            id='demo-multiple-name'
                            label='Categories'
                            value={videoForm.categories}
                            multiple
                            onChange={(e) => setVideoForm({ ...videoForm, categories: e.target.value })}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            <MenuItem value="Backend">Backend</MenuItem>
                            <MenuItem value="Frontend">Frontend</MenuItem>
                            <MenuItem value="Fullstack">Fullstack</MenuItem>
                            <MenuItem value="Mobile Development">Mobile Development</MenuItem>
                        </Select>
                        {errors.categories && <Typography color="error">{errors.categories}</Typography>}
                    </FormControl>
                    <div style={{ marginTop: '10px' }}>
                        {videoForm.videoFile ? (
                            <video
                                width={320}
                                height={240}
                                controls
                            >
                                <source src={URL.createObjectURL(videoForm.videoFile)} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            'No file selected'
                        )}

                    </div>
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
                                type="file"
                                accept="video/*"
                                id="video-uploader-input"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>
                    {errors.videoFile && <Typography color="error">{errors.videoFile}</Typography>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handlePreview} color="primary">Preview</Button>
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
            <Preview
                openPreview={openPreview}
                handleClose={handleClose}
                onClosePreview={handleClosePreview}
                course={videoForm} // Pass the videoForm to the Preview component
            />
        </>
    );
};

export default VideoCreate;
