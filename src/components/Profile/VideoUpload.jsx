import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { Videocam, LiveTv } from '@mui/icons-material';

// import GoLive from './GoLive.jsx';
import VideoPost from './VideoPost.jsx';
import VideoCreate from './VideoCreate.jsx';

const VideoUpload = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = React.useState(false);

    const handleUploadVideo = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleGoLive = () => {
        console.log('Go Live...');
        setOpen(true);
    };

    return (
        <>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <Card style={!isMobile ? { marginRight: '30px' } : { marginTop: '20px' }} elevation={3}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Go Live / Upload Video
                            </Typography>
                            <Button variant="contained" onClick={handleGoLive} startIcon={<LiveTv />} color="primary" component={Link} to={'/dashboard/profile/go-live'}  >
                                Go Live
                            </Button>
                            <Button variant="contained" onClick={handleUploadVideo} startIcon={<Videocam />} color="primary" sx={{ marginLeft: '10px' }}>
                                Upload Video
                            </Button>
                        </CardContent>
                    </Card>
                    <VideoPost />
                    <VideoCreate
                        open={open}
                        onClose={handleClose}
                    />
                    {/* <GoLive
                        open={open}
                        onClose={handleClose}
                    /> */}
                </Grid>
            </Grid>
        </>
    );
};

export default VideoUpload;
