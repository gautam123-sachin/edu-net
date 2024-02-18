import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { Videocam } from '@mui/icons-material';
import VideoPost from './VideoPost';
import VideoCreate from './VideoCreate';

const VideoUpload = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = useState(false);

    const handleUploadVideo = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid container spacing={2} justifyContent="center" sx={isMobile ? {} : { paddingRight: '104px !important' }}>
            <Grid item xs={12}>
                <Card style={!isMobile ? { marginRight: '30px' } : { marginTop: '20px' }} elevation={3}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Upload Video
                        </Typography>
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
            </Grid>
        </Grid>
    );
};

export default VideoUpload;
