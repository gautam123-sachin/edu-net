import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Card, CardContent, Grid, Box, Divider, Typography } from '@mui/material';

const Preview = ({ course }) => {
    const [expanded, setExpanded] = useState(false);

    if (!course) {
        return (
            <Card style={{ backgroundColor: '#f5f5f5', width: '500px' }} className="w-full max-w-lg">
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Preview
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    const { title, teacherName, description, category, video, thumbnailUrl } = course;
    console.log("course", course);
    console.log("thumbnailUrl", thumbnailUrl);


    // Function to toggle expansion of description
    const toggleDescription = () => {
        setExpanded(!expanded);
    };

    // Truncate the description to 400 characters
    const truncatedDescription = description.slice(0, 400);

    return (
        <Card style={{ backgroundColor: '#f5f5f5', width: '500px' }} className="w-full max-w-lg">
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Preview
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Card className="w-full max-w-lg">
                            <CardContent>
                            <Typography gutterBottom variant="body1">Course Title: {title} </Typography>
                                <Divider style={{ fontWeight: 'bold', borderColor: '#030404' }} />
                                <Box mt={2} mb={2}>
                                    {video && thumbnailUrl && (
                                        <ReactPlayer
                                            url={video}
                                            light={thumbnailUrl}
                                            controls
                                            width="100%"
                                            height="200px"
                                            onError={(e) => console.error('Error loading video:', e)}
                                            onReady={() => console.log('Video player ready')}
                                            onStart={() => console.log('Video playback started')}
                                        />
                                    )}
                                </Box>
                                <Box mb={2}>
                                    <Typography gutterBottom variant="subtitle1">Teacher: {teacherName} </Typography>
                                    <Typography gutterBottom variant="subtitle1">Category: {category} </Typography>
                                </Box>
                                <Divider style={{ fontWeight: 'bold', borderColor: '#030404' }} />
                                <Box mt={2}>
                                    <Typography variant="body2" color="textSecondary">
                                        {expanded ? description : truncatedDescription}
                                        {description.length > 400 && (
                                            <span style={{ cursor: 'pointer', color: 'blue' }} onClick={toggleDescription}>
                                                {expanded ? ' See Less' : ' See More'}
                                            </span>
                                        )}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default Preview;
