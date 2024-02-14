import React, { useState } from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    IconButton,
    TextField,
    Avatar,
    Divider,
    CardMedia,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { ThumbUp, Comment, Share } from '@mui/icons-material';

const fakeVideoData = [
    {
        videoUrl: 'https://www.example.com/video1.mp4',
        title: 'Sample Video Title 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce hendrerit felis non nisi bibendum, ut fermentum eros viverra. Nulla facilisi. Donec ut volutpat justo. Suspendisse potenti. Integer tristique enim sed luctus ullamcorper. Cras at rhoncus ligula. Proin id sapien id arcu hendrerit accumsan. Mauris non ante vel turpis finibus ultrices eget non mauris. Nulla ac eros lacus.',
        likes: 15,
        comments: [
            { id: 1, text: 'Amazing video!' },
            { id: 2, text: 'Great content!' },
            { id: 3, text: 'I enjoyed watching this.' }
        ],
        poster: {
            name: 'Jane Smith',
            avatarUrl: 'https://www.example.com/avatar1.jpg'
        }
    },
    {
        videoUrl: 'https://www.example.com/video2.mp4',
        title: 'Sample Video Title 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce hendrerit felis non nisi bibendum, ut fermentum eros viverra. Nulla facilisi. Donec ut volutpat justo. Suspendisse potenti. Integer tristique enim sed luctus ullamcorper. Cras at rhoncus ligula. Proin id sapien id arcu hendrerit accumsan. Mauris non ante vel turpis finibus ultrices eget non mauris. Nulla ac eros lacus.',
        likes: 10,
        comments: [
            { id: 1, text: 'Nice video!' },
            { id: 2, text: 'Interesting content!' },
            { id: 3, text: 'I enjoyed watching this.' }
        ],
        poster: {
            name: 'Mike Johnson',
            avatarUrl: 'https://www.example.com/avatar2.jpg'
        }
    }
];

const VideoPost = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [showMoreDescription, setShowMoreDescription] = useState(false);
    const [showMoreComments, setShowMoreComments] = useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikes(isLiked ? likes - 1 : likes + 1);
    };

    const handleCommentSubmit = () => {
        if (comment.trim() !== '') {
            const newComment = { id: comments.length + 1, text: comment };
            setComments([...comments, newComment]);
            setComment('');
        }
    };

    const handleViewMoreDescription = () => {
        setShowMoreDescription(true);
    };

    const handleSeeMoreComments = () => {
        setShowMoreComments(true);
    };

    return (
        <>
            {fakeVideoData.map((video, index) => (
                <Card key={index} elevation={3} style={!isMobile ? { marginRight: '30px', marginTop: '20px' } : { marginTop: '20px' }}>
                    <CardMedia
                        component="video"
                        src={video.videoUrl}
                        controls
                        title={video.title}
                    />
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            {video.title}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {showMoreDescription ? video.description : (video.description.length > 200 ? `${video.description.slice(0, 200)}...` : video.description)}
                            {video.description.length > 200 && !showMoreDescription && (
                                <Button color="primary" onClick={handleViewMoreDescription}>View More</Button>
                            )}
                        </Typography>
                        <Divider />
                        <Grid container alignItems="center" justifyContent="space-between" style={{ marginTop: '10px' }}>
                            <Grid item>
                                <IconButton onClick={handleLike}>
                                    <ThumbUp color={isLiked ? 'primary' : 'action'} />
                                </IconButton>
                                <span>{video.likes} Likes</span>
                                <IconButton>
                                    <Comment />
                                </IconButton>
                                <span>{video.comments.length} Comments</span>
                            </Grid>
                            <Grid item>
                                <IconButton>
                                    <Share />
                                </IconButton>
                                <span>Share</span>
                            </Grid>
                        </Grid>
                        <Divider style={{ marginTop: '10px' }} />
                        <TextField
                            label="Write a comment..."
                            fullWidth
                            multiline
                            size="small"
                            rows={2}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            margin="normal"
                            variant="outlined"
                            style={{ marginTop: '10px' }}
                        />
                        <Button variant="contained" color="primary" onClick={handleCommentSubmit}>
                            Comment
                        </Button>
                        <Divider style={{ marginTop: '10px' }} />
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                            <Avatar />
                            <Typography variant="body2" style={{ marginLeft: '10px' }}>{video.comments[0].text}</Typography>
                            {video.comments.length > 1 && !showMoreComments && (
                                <Button color="primary" onClick={handleSeeMoreComments}>See More</Button>
                            )}
                            {showMoreComments && (
                                <Button color="primary" onClick={() => setShowMoreComments(false)}>See Less</Button>
                            )}
                        </div>
                        {showMoreComments && video.comments.slice(1).map(comment => (
                            <div key={comment.id} style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                <Avatar />
                                <Typography variant="body2" style={{ marginLeft: '10px' }}>{comment.text}</Typography>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            ))}
        </>
    );
};

export default VideoPost;
