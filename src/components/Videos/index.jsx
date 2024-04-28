import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardMedia, CardContent, Typography, Button, InputLabel, FormControl, Input, InputAdornment } from '@mui/material';
import { Modal, Box, TextField, IconButton, CircularProgress } from '@mui/material';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ImageIcon from '@mui/icons-material/Image';
import VideoIcon from '@mui/icons-material/VideoLibrary';

import './style.css';

const Videos = () => {
    const navigate = useNavigate();

    const videos = [
        {
            id: 1,
            title: "Video 1",
            thumbnail: "https://images.unsplash.com/photo-1713283699002-ac9462cedf0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8",
            videoUrl: "https://www.youtube.com/watch?v=pgrTSTdVjBs"
        },

    ];

    const handleNavigate = (videoId) => {
        navigate(`/videos/${videoId}`);
    }
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        videoFile: '',
        thumbnailFile: '',
    });
    const [uploading, setUploading] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0],
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        try {
            setUploading(true);
            const formDataToSend = new FormData();
            formDataToSend.append('userId', 1);
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('video', formData.videoFile);
            formDataToSend.append('thumbnail', formData.thumbnailFile);

            const response = await fetch('http://localhost:8000/v1/add-courses', {
                method: 'POST',
                body: formDataToSend,
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error('Error uploading data');
            }

            console.log('Data uploaded successfully:', responseData);
            setUploading(false);
            handleClose();
        } catch (error) {
            console.error('Error:', error.message);
            setUploading(false);
        }
    };



    return (
        <>
            <Grid container spacing={2}>
                <Grid xs={12} className='upload-btn'>
                    <Button onClick={handleOpen} variant="outlined" startIcon={<VideoLibraryIcon />}>Upload Video</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: { xs: '90%', sm: '70%', md: '50%' },
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: '8px',
                            outline: 'none',
                            textAlign: 'center',
                        }}>
                            <Typography variant="h5" gutterBottom>
                                Upload Video
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <Box sx={{ mt: 2 }}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                    />
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                    <TextField
                                        required
                                        fullWidth
                                        multiline
                                        rows={4}
                                        label="Description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                    <FormControl>
                                        <InputLabel>Video</InputLabel>
                                        <Input
                                            type="file"
                                            accept="video/*"
                                            name="videoFile"
                                            onChange={handleFileChange}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <VideoIcon />
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                    <FormControl>
                                        <InputLabel>Thumbnail</InputLabel>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            name="thumbnailFile"
                                            onChange={handleFileChange}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <ImageIcon />
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                    <Button type="submit" variant="contained" disabled={uploading}>
                                        {uploading ? <CircularProgress color="success" size={24} /> : "Upload"}
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                    </Modal>
                </Grid>
            </Grid>
            <Grid container spacing={{ xs: 2, sm: 3, md: 4, lg: 6 }} className='video-container'>
                {videos.map((video) => (
                    <Grid item key={video.id} xs={12} sm={6} md={4} lg={3}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={video.thumbnail}
                                alt={video.title} />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {video.title}
                                </Typography>
                                <Button variant="contained" color="primary" onClick={() => handleNavigate(video.id)}>
                                    Watch Video
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default Videos;
