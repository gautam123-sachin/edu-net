import { Typography, Grid } from '@mui/material';
import React from 'react';

const Upload = () => {
    return(
        <>
        <Grid container spacing={2} className="upload">
            <Grid item xs={12} lg={6}>
                <Typography variant="h4" className="mb-4" sx={{ fontWeight: 'bold' }} color="primary">
                    Upload Video
                </Typography>
            </Grid>
        </Grid>
        </>
    )
}

export default Upload;