import React from 'react';
import { Box, Typography, Button, Grid, TextField, Card, CardMedia } from '@mui/material'; // Import Card from Material-UI
import Comment from './Comment';
import ReactWebMediaPlayer from 'react-web-media-player';
import { useLocation } from 'react-router-dom';
import './WatchVideo.css';
import axios from 'axios';

const RelatedVideo = ({ thumbnail, title }) => {
    return (
        <Grid item xs={12} sm={6} md={3}>
            <Card>
                <CardMedia
                    component="img"
                    height="200"
                    image={thumbnail}
                    alt={title}
                />
                <Box p={2}>
                    <Typography variant="subtitle1" gutterBottom>
                        {title}
                    </Typography>
                </Box>
            </Card>
        </Grid>
    );
}

const WatchVideo = () => {
    // State for managing comment input and existing comments
    const [comment, setComment] = React.useState("");
    const [comments, setComments] = React.useState([]);
    const location = useLocation();
    const { videoUrl } = location.state || {};

    const handleAddComment = () => {
        if (comment.trim() !== "") {
            setComments(prevComments => [...prevComments, comment]);
            setComment("");
        }
    }


    const relatedVideos = [
        {
            title: "Related Video 1",
            thumbnail: "https://images.unsplash.com/photo-1713283699002-ac9462cedf0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8",
        },
        {
            title: "Related Video 2",
            thumbnail: "https://images.unsplash.com/photo-1713283699002-ac9462cedf0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8",
        },
        {
            title: "Related Video 3",
            thumbnail: "https://images.unsplash.com/photo-1713283699002-ac9462cedf0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8",
        },
        {
            title: "Related Video 4",
            thumbnail: "https://images.unsplash.com/photo-1713283699002-ac9462cedf0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8",
        },
    ];

    return (
        <Box className="watch-container-box">
            <iframe
                title="Video Player"
                src={videoUrl}
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            ></iframe>
            <Box mt={2}>
                <Typography variant="h5" gutterBottom>
                    Video Title
                </Typography>
                <Typography variant="body1">
                    Video Description Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
                <Box mt={2}>
                    <Typography variant="h6" gutterBottom>
                        Comments
                    </Typography>
                    <Box mt={2}>
                        <TextField
                            type="text"
                            name="comment"
                            id="comment"
                            label="Add a comment"
                            fullWidth
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </Box>
                    <Box mt={2}>
                        <Grid items xs={12}>
                            {comments.map((comment, index) => (
                                <Comment key={index} text={comment} />
                            ))}
                        </Grid>
                    </Box>
                    <Box mt={2}>
                        <Button variant="contained" color="primary" onClick={handleAddComment}>
                            Add Comment
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                    Related Videos
                </Typography>
                <Grid container spacing={2}>
                    {relatedVideos.map((video, index) => (
                        <RelatedVideo key={index} title={video.title} thumbnail={video.thumbnail} />
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

export default WatchVideo;
