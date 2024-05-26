import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardMedia, CardContent, Typography, Button, InputLabel, FormControl, Input, InputAdornment } from '@mui/material';
import { Modal, Box, TextField, IconButton, CircularProgress } from '@mui/material';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ImageIcon from '@mui/icons-material/Image';
import VideoIcon from '@mui/icons-material/VideoLibrary';

import './style.css';
import axios from 'axios';

const Videos = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/v1/courses-list');
            if (!response.ok) {
                throw new Error('Failed to fetch courses');
            }
            const data = await response.json();
            setCourses(data?.courses);
        } catch (error) {
            console.error('Error fetching courses:', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    console.log(courses)

    const handleNavigate = (videoId, videoUrl) => {
        navigate(`/videos/${videoId}`, {
            state: { videoUrl } 
        });
    };
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

    
        

    const handleFileChangeImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Read file as base64
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setFormData({
                    ...formData,
                    thumbnailFile: reader.result,
                });
            }
        } else {
            setFormData({
                ...formData,
                videoFile: "",
                thumbnailFile: "",
            });
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const api = "https://api.cloudinary.com/v1_1/dmiof8ebc/video/upload";
        let formData1 = new FormData();
        formData1.append("file", file);
        formData1.append("upload_preset", "yqlojx24");
        axios.post(api, formData1).then((res) => {
           setFormData({...formData, videoFile : res?.data.url})
        }).catch((error) => {
            console.error("Error uploading file:", error);
        });
}

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        try {
            setUploading(true);
            const formDataToSend = new FormData();
            formDataToSend.append('userId', 1);
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('video', formData.videoFile); // Append video file
            formDataToSend.append('thumbnail', formData.thumbnailFile); // Append thumbnail file

            // Fetch endpoint for uploading data
            const response = await fetch('http://localhost:8000/v1/add-courses', {
                method: 'POST',
                body: formDataToSend,
            });

            const responseData = await response.json();
            fetchData();

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
                                            onChange={handleFileChangeImage}
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
            <div>
      {isLoading ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={{ xs: 2, sm: 3, md: 4, lg: 6 }} className='video-container'>
          {courses?.map((video) => (
            <Grid item key={video.id} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={video.thumbnail}
                  alt={video.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {video.title}
                  </Typography>
                  <Button variant="contained" color="primary" onClick={() => handleNavigate(video._id, video.video)}>
                    Watch Video
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
        </>
    );
}

export default Videos;
