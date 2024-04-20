import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

import './style.css';

const Video = () => {
    const navigate = useNavigate();

    const videos = [
        {
            id: 1,
            title: "Video 1",
            thumbnail: "https://images.unsplash.com/photo-1713283699002-ac9462cedf0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8",
            videoUrl: "https://www.youtube.com/watch?v=pgrTSTdVjBs"
        },
        {
            id: 1,
            title: "Video 1",
            thumbnail: "https://images.unsplash.com/photo-1713283699002-ac9462cedf0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8",
            videoUrl: "https://www.youtube.com/watch?v=pgrTSTdVjBs"
        },
        {
            id: 1,
            title: "Video 1",
            thumbnail: "https://images.unsplash.com/photo-1713283699002-ac9462cedf0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8",
            videoUrl: "https://www.youtube.com/watch?v=pgrTSTdVjBs"
        },
        {
            id: 1,
            title: "Video 1",
            thumbnail: "https://images.unsplash.com/photo-1713283699002-ac9462cedf0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8",
            videoUrl: "https://www.youtube.com/watch?v=pgrTSTdVjBs"
        },
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

    return (
        <>
            <Grid container spacing={2}>
                <Grid xs={12} className='upload-btn'>
                    <Button variant="contained" color="primary" onClick={handleNavigate}>Upload Video</Button>
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

export default Video;
